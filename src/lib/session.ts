import { SessionOptions } from "iron-session";

export interface SessionData {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  email: string;
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  tokenType: "Bearer",
  accessToken: "",
  refreshToken: "",
  expiresIn: 0,
  email: "",
  isLoggedIn: false,
};

// FIXME: how should we handle the refresh token and getting a new token?
// if your token expires and you have a refresh token maybe you should be prompted to reauthenticate?
// otherwise your token would just expire
export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_PRIVATE_KEY ?? "",
  cookieName: "session-cookie",
  ttl: 3600,
  cookieOptions: {
    // secure only works in `https` environments
    // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
    secure: process.env.NODE_ENV === "production",
  },
};
