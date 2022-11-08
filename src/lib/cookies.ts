export function getCookie(name: string): string {
  name = name + "=";
  var value = "";
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    cookie = cookie.trim();
    if (cookie.includes(name)) {
      value = cookie.substring(name.length, cookie.length);
      break;
    }
  }
  return value;
}

export function getTopLevelDomain(): string {
  var hostnameParts = window.location.hostname.split('.');
  var topLevelDomain = hostnameParts.slice(hostnameParts.length - 2).join('.');
  return topLevelDomain;
}

export function setCookie(name: string, value: string, days: number): void {
  if (typeof days !== 'number') days = 365;
  var topLevelDomain = getTopLevelDomain();
  var date = new Date();
  var daysInMilliseconds = days * 24 * 60 * 60 * 1000;
  date.setTime(date.getTime() + daysInMilliseconds);
  var cookieString = name+'='+value+'; expires='+date.toUTCString()+'; path=/;';
  if (topLevelDomain !== 'localhost') {
    cookieString += 'domain=.'+topLevelDomain;
  }
  document.cookie = cookieString;
}
