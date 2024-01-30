"use server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { client } from "@/lib/dotnetApi";
import { z } from "zod";
import { redirect } from "next/navigation";
import { SessionData, defaultSession, sessionOptions } from "@/lib/session";
import { loginFormSchema } from "./(public)/login/LoginForm";

/**
 * Attempts to create a session for the user
 * @returns SessionData
 */
export async function getSession() {
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

  return session;
}

export async function logout() {
  const session = await getSession();
  session.destroy();
  revalidatePath("/login");
}

export async function login(values: z.infer<typeof loginFormSchema>) {
  const session = await getSession();
  // return the current session.  Since the user is not logged in this will be the default session

  // attempt to login the user via the login api
  try {
    // retrieve and validate form input
    const email = values.email;
    const password = values.password;

    if (!email || !password) {
      throw Error("Could not retrieve credentials");
    }

    const res = await client.loginUser({ email, password });

    session.isLoggedIn = true;
    session.accessToken = res.accessToken;
    session.email = email;
    session.expiresIn = res.expiresIn;
    session.refreshToken = res.refreshToken;
    session.tokenType = res.tokenType;

    await session.save();
    revalidatePath("/login");
  } catch (error) {
    revalidatePath("/login");
  }
}
