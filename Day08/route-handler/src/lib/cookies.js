export const CookieManager = {
  get: (name) => {
    const match = document.cookie.match(new RegExp(`${name}=([^;]+)`));
    return match ? match[1] : null;
  },

  set: (name, value, days = 7) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};path=/;expires=${expires.toUTCString()}`;
  },

  delete: (name) => {
    document.cookie = `${name}=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  },

  exists: (name) => {
    return document.cookie.includes(`${name}=`);
  },
};
