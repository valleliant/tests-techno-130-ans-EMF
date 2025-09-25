import { ulid } from "ulid";
import { connectRedis, redis } from "./redis";

const QKEY = "q:main";
const LOCK_KEY = "lock:session";
const LOCK_TTL = 90; // secondes

export async function enqueue() {
  await connectRedis();
  const id = ulid();
  await redis.multi()
    .rPush(QKEY, id)
    .hSet(`t:${id}`, { createdAt: Date.now().toString() })
    .exec();
  return { ticketId: id };
}

export async function position(ticketId: string) {
  await connectRedis();
  const idx = await redis.lPos(QKEY, ticketId);
  return idx === null ? 0 : idx + 1;
}

const START_LUA = `
local qkey = KEYS[1]
local lockkey = KEYS[2]
local ticket = ARGV[1]
local ttl = tonumber(ARGV[2])

-- -1 = locked, 0 = not-first, 1 = success
if redis.call('EXISTS', lockkey) == 1 then
  return -1
end

local head = redis.call('LINDEX', qkey, 0)
if head ~= ticket then
  return 0
end

redis.call('LPOP', qkey)
redis.call('SET', lockkey, ticket, 'NX', 'EX', ttl)

return 1
`;

let START_SHA: string | null = null;
export async function startSession(ticketId: string) {
  await connectRedis();
  try {
    START_SHA ||= await redis.scriptLoad(START_LUA);
    const res = (await redis.evalSha(START_SHA!, {
      keys: [QKEY, LOCK_KEY],
      arguments: [ticketId, String(LOCK_TTL)],
    })) as number | null;
    if (res === 1) return { ok: true };
    if (res === 0) return { ok: false, reason: 'not-first' };
    if (res === -1) return { ok: false, reason: 'locked' };
    return { ok: false, reason: 'internal' };
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    const isNoScript = message.includes('NOSCRIPT');
    if (!isNoScript) throw e;
    // Redis redémarré: rejouer le script via EVAL directement
    const evalRes = (await redis.eval(START_LUA, {
      keys: [QKEY, LOCK_KEY],
      arguments: [ticketId, String(LOCK_TTL)],
    })) as number | null;
    if (evalRes === 1) return { ok: true };
    if (evalRes === 0) return { ok: false, reason: 'not-first' };
    if (evalRes === -1) return { ok: false, reason: 'locked' };
    return { ok: false, reason: 'internal' };
  }
}

export async function endSession(ticketId: string) {
  await connectRedis();
  const val = await redis.get(LOCK_KEY);
  if (val === ticketId) await redis.del(LOCK_KEY);
  return { ok: true };
}

export async function getActiveTicketId(): Promise<string | null> {
  await connectRedis();
  return await redis.get(LOCK_KEY);
}

export async function cancelTicket(ticketId: string) {
  await connectRedis();
  const removed = await redis.lRem(QKEY, 0, ticketId);
  await redis.del(`t:${ticketId}`);
  return { ok: true, removed };
}
