import { getSession, login } from "./action";
import { LoginForm } from "./LoginForm";
import { LogoutButton } from "./LogoutButton";

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
