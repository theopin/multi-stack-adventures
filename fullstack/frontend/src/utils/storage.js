export function saveStorage(key, value) {
  if (typeof value === "object") value = JSON.stringify(value);

  localStorage.setItem(key, value);
}

export function getStorage(key) {
  if (typeof window !== "undefined") {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (err) {
      return localStorage.getItem(key);
    }
  }
}

export function clearStorage(key) {
  localStorage.removeItem(key);
}
