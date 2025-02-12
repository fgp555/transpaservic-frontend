export const isLocalhost = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");
export let isDevelopment = isLocalhost || window.location.hostname === "dev.appsystered.com";

export let apiBaseURL = isLocalhost ? "http://localhost:3000" : window.location.hostname === "vite.fgp.one" ? "https://back.fgp.one" : "";

export let adminEmail = isLocalhost ? atob("YWRtaW5AdHJhbnNwYXNlcnZpYy5jb20uY28=") : "";
export let adminPassword = isLocalhost ? atob("KlRyYW5zcGEvKjEyMw==") : "";

console.log("apiBaseURL", apiBaseURL);
console.log("adminEmail", adminEmail);
console.log("isDevelopment", isDevelopment);
