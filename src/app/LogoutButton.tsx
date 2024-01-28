import { Button } from "@/components/ui/button";
import { logout } from "./action";

export async function LogoutButton() {
  return (
    <form action={logout}>
      <Button type="submit" value="logout">
        Logout
      </Button>
    </form>
  );
}
