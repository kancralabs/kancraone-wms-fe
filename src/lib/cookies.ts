/**
 * Cookie utility functions for token management
 */

interface CookieOptions {
  days?: number;
  path?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

/**
 * Set a cookie
 */
export function setCookie(name: string, value: string, options: CookieOptions = {}): void {
  const {
    days = 7,
    path = '/',
    secure = window.location.protocol === 'https:',
    sameSite = 'lax',
  } = options;

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    cookieString += `; expires=${date.toUTCString()}`;
  }

  cookieString += `; path=${path}`;

  if (secure) {
    cookieString += '; secure';
  }

  cookieString += `; samesite=${sameSite}`;

  document.cookie = cookieString;
}

/**
 * Get a cookie value by name
 */
export function getCookie(name: string): string | null {
  const nameEQ = encodeURIComponent(name) + '=';
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
    }
  }

  return null;
}

/**
 * Delete a cookie
 */
export function deleteCookie(name: string, path: string = '/'): void {
  document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}`;
}

/**
 * Token-specific helpers
 */
export const tokenCookies = {
  setAccessToken: (token: string) => {
    setCookie('access_token', token, {
      days: 1, // 1 day (access token expires in 60 min, but we keep cookie longer)
      secure: window.location.protocol === 'https:',
      sameSite: 'lax',
    });
  },

  getAccessToken: (): string | null => {
    return getCookie('access_token');
  },

  setRefreshToken: (token: string) => {
    setCookie('refresh_token', token, {
      days: 7, // 7 days (matches backend refresh token lifetime)
      secure: window.location.protocol === 'https:',
      sameSite: 'lax',
    });
  },

  getRefreshToken: (): string | null => {
    return getCookie('refresh_token');
  },

  clearTokens: () => {
    deleteCookie('access_token');
    deleteCookie('refresh_token');
  },
};
