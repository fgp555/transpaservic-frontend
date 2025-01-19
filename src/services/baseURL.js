// const isLocalhost = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

// export let baseURL = isLocalhost ? "http://localhost:3000" : "";

const isLocalhost = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

export let baseURL = isLocalhost ? "http://localhost:3000" : window.location.hostname === "vite.fgp.one" ? "https://back.fgp.one" : "";

console.log("baseURL", baseURL);
