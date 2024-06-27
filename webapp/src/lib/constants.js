export const prod = process.env.NODE_ENV === "production";
export const apiUrl = !prod
  ? "http://localhost:4000"
  : "https://api.server.com";
