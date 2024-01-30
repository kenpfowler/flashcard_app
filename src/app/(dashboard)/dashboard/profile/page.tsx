import { LogoutButton } from "@/app/LogoutButton";
import { client } from "@/lib/dotnetApi";
import { User } from "@/types/entities";
import { UpdateProfileForm } from "./UpdateProfileForm";
import { Button } from "@/components/ui/button";

export default async function ProfilePage() {
  const result = await client.getUserInfo();

  if (!result.ok) {
    return (
      <main className="flex flex-col w-full items-center justify-center">
        <div className="flex flex-col space-y-2">
          <h1>{result.message}</h1>
        </div>
      </main>
    );
  }

  console.log(result.value);

  return (
    <main className="flex flex-col w-full items-center justify-center">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl">Welcome, {result.value.email}</h1>
        {result.value.emailConfirmed ? (
          <p>Your email address is confirmed</p>
        ) : (
          <a href="#">Click here to send confirmation email</a>
        )}

        <div className="flex justify-between items-center">
          <p>Account - Free Tier</p>
          <Button>Upgrade</Button>
        </div>
        <UpdateProfileForm
          firstName={result.value.firstName}
          lastName={result.value.lastName}
          email={result.value.email}
        />

        <LogoutButton />
      </div>
    </main>
  );
}
