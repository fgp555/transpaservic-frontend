export const isLocalhost = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

export let apiBaseURL = isLocalhost ? "http://localhost:3000" : window.location.hostname === "vite.fgp.one" ? "https://back.fgp.one" : "";

export const fgpEmail = isLocalhost ? "fgp555@gmail.com" : "";
export const fgpPassword = isLocalhost ? "SecurePass@2023" : "";
export const newfgpPassword = isLocalhost ? "SecurePass@2024" : "";

export let isDevelopment = isLocalhost || window.location.hostname === "dev.appsystered.com";

export let adminEmail = isDevelopment ? "admin@transpaservic.com.co" : "";
export let adminPassword = isDevelopment ? "*Transpa/*123" : "";

console.log("apiBaseURL", apiBaseURL);
console.log("adminEmail", adminEmail);
console.log("isDevelopment", isDevelopment);

/* 

export let adminEmail = isLocalhost ? "admin@transpaservic.com.co" : window.location.hostname === "dev.appsystered.com" ? "admin@transpaservic.com.co" : "";
export let adminPassword = isLocalhost ? "*Transpa/*123" : window.location.hostname === "dev.appsystered.com" ? "*Transpa/*123" : "";

*/
