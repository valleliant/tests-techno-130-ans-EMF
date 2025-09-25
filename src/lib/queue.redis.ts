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

if redis.call("EXISTS", lockkey) == 1 then
  return {err="locked"}
end

local head = redis.call("LINDEX", qkey, 0)
if head ~= ticket then
  return {err="not-first"}
end

redis.call("LPOP", qkey)
redis.call("SET", lockkey, ticket, "NX", "EX", ttl)

return {ok="1"}
`;

let START_SHA: string | null = null;
export async function startSession(ticketId: string) {
  await connectRedis();
  START_SHA ||= await redis.scriptLoad(START_LUA);
  const res = await redis.evalSha(START_SHA!, {
    keys: [QKEY, LOCK_KEY],
    arguments: [ticketId, String(LOCK_TTL)],
  }) as { ok?: string; err?: string } | null;
  if (res && res.ok === "1") return { ok: true };
  const reason = res && res.err ? String(res.err) : "unknown";
  return { ok: false, reason };
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
