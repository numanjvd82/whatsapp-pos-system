import cookie, { SerializeOptions } from 'cookie';

export function getCookies(req: Request): Record<string, string | undefined> {
  const cookieHeader = req.headers.get('Cookie');
  if (!cookieHeader) return {};
  return cookie.parse(cookieHeader);
}

export function getCookie(req: Request, name: string): string | undefined {
  const cookieHeader = req.headers.get('Cookie');
  if (!cookieHeader) return;
  const cookies = cookie.parse(cookieHeader);
  return cookies[name];
}

export function clearCookie(name: string, resHeaders: Headers): void {
  resHeaders.append(
    'Set-Cookie',
    cookie.serialize(name, '', {
      maxAge: 0,
    }),
  );
}
export function setCookie(
  resHeaders: Headers,
  name: string,
  value: string,
  options?: SerializeOptions,
): void {
  resHeaders.append('Set-Cookie', cookie.serialize(name, value, options));
}
