function getCookie() {
  const value = `; ${document.cookie}`;
  const segments = value.split(`; AccessToken=`);
  if (segments.length === 2) return segments.pop().split(";").shift();
}

export function getToken() {
  var jsonToken = JSON.stringify(getCookie());
  return jsonToken ? jsonToken.substring(1, jsonToken.length - 1) : "";
}

export function clearCookies() {
  document.cookie.split(";").forEach((c) => {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
}
