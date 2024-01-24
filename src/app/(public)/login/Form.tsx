import { Button } from "@/components/ui/button";
import { getSession, login, logout } from "./action";
import { LoginForm } from "./LoginForm";

export async function Form() {
  const session = await getSession();

  if (session.isLoggedIn) {
    return (
      <>
        <p className="text-lg">
          Logged in user: <strong>{session.email}</strong>
        </p>
        <LogoutButton />
      </>
    );
  }

  return <LoginForm login={login} />;
}

export async function LogoutButton() {
  return (
    <form action={logout}>
      <Button type="submit" value="logout">
        Logout
      </Button>
    </form>
  );
}
