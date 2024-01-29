import { LogoutButton } from "@/app/LogoutButton";
import { client } from "@/lib/dotnetApi";
import { User } from "@/types/entities";

export default async function ProfilePage() {
  const userInfo = (await client.getUserInfo()) as User;

  return (
    <main className="flex flex-col w-full items-center justify-center">
      <div className="flex flex-col space-y-2">
        <h1>Welcome, {userInfo.email}</h1>
        <p>First Name - {userInfo.firstName ?? "Not set"}</p>
        <p>Last Name - {userInfo.lastName ?? "Not set"}</p>
        <p>Account - Free Tier</p>
        <p>Email - {userInfo.email}</p>
        <p>Confirmed - {userInfo.emailConfirmed ? "true" : "false"}</p>
        <LogoutButton />
      </div>
    </main>
  );
}
