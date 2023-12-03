import wretch from "wretch";

const env = process.env.VERCEL_URL;

const api = wretch(env, { mode: "cors" })
  .errorType("json")
  .resolve((r) => r.json());

export default api;
