"use server";
import { SessionData } from "./lib";
import { defaultSession, sessionOptions } from "./lib";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { loginFormSchema } from "./LoginForm";
import { client } from "@/lib/dotnetApi";

/**
 * Attempts to create a session for the user
 * @returns Session
 */
export async function getSession(body?: { email: string; password: string }) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  // if the user is not currently logged in then we default the sessions values
  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
    session.email = defaultSession.email;
    session.accessToken = defaultSession.accessToken;
    session.refreshToken = defaultSession.refreshToken;
    session.tokenType = defaultSession.tokenType;
    session.expiresIn = defaultSession.expiresIn;
  }

  // now, we attempt to log the user in and create a new session
  if (body) {
    try {
      const res = await client.loginAccount(body);
      client.setAuthorizationHeader(res.tokenType, res.accessToken);
      session.isLoggedIn = true;
      session.email = body.email;
      session.accessToken = res.accessToken;
      session.refreshToken = res.refreshToken;
      session.tokenType = res.tokenType;
      session.expiresIn = res.expiresIn;
    } catch (error) {
      // FIXME: how should we deal with errors?
      console.log(error);
    }
  }

  return session;
}

export async function logout() {
  const session = await getSession();
  session.destroy();
  revalidatePath("/login");
}

export async function login(values: z.infer<typeof loginFormSchema>) {
  const session = await getSession(values);
  session.email = values.email ?? "No username";
  await session.save();
  revalidatePath("/login");
}
