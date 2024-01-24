import { Suspense } from "react";
import { Form } from "./Form";

export default async function LoginPage() {
  // TODO: repeat this pattern in the protected parts of the application.

  // wrap protected pages in suspense while we wait for the framework to get a session

  // if a user attempts to access content that requires authorization we get the session

  // if the session shows the user is not logged in we redirect them to the login page.

  // if the user is logged in we simply show them the content
  return (
    <div className="flex flex-col max-w-lg mx-auto">
      <Suspense fallback={<p className="text-lg">Loading...</p>}>
        <Form />
      </Suspense>
    </div>
  );
}
