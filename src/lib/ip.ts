export function getClientIpFromHeaders(h: Headers): string {
  const forwardedFor = h.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  const realIp = h.get('x-real-ip');
  if (realIp) return realIp;
  return '0.0.0.0';
}


