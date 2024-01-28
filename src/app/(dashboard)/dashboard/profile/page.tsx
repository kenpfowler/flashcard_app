import { getSession } from "@/app/action";
import { Resources, client } from "@/lib/dotnetApi";
import { User } from "@/types/entities";

export default async function ProfilePage() {
  const session = await getSession();

  const user = (await client.getResource({
    resource: Resources.User,
    options: {
      auth: client.getAuthorizationHeaderValue(
        session.tokenType,
        session.accessToken
      ),
    },
  })) as User;

  return (
    <div>
      <h1>Profile Page</h1>
      <p>{user.email}</p>
    </div>
  );
}
