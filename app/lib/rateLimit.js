const rateLimitMap = new Map();

// Clear map every 1 hour to prevent memory leaks in long-running processes
setInterval(() => {
  rateLimitMap.clear();
}, 60 * 60 * 1000);

export function applyRateLimit(request, limit = 5, windowMs = 15 * 60 * 1000) {
  // Extract client IP address
  let ip = request.ip ?? request.headers.get('x-forwarded-for') ?? 'unknown-ip';
  
  // Clean up comma-separated IPs (x-forwarded-for can contain multiple IPs)
  if (ip.includes(',')) {
    ip = ip.split(',')[0].trim();
  }

  const currentTime = Date.now();
  
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, [{ timestamp: currentTime }]);
    return { success: true };
  }
  
  const timestamps = rateLimitMap.get(ip);
  
  // Keep only timestamps within the given window
  const validTimestamps = timestamps.filter(t => currentTime - t.timestamp < windowMs);
  
  if (validTimestamps.length >= limit) {
    // Rate limit exceeded
    return { success: false };
  }
  
  validTimestamps.push({ timestamp: currentTime });
  rateLimitMap.set(ip, validTimestamps);
  
  return { success: true };
}
