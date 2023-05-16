import React from "react";
import { authServices } from "../src/services/auth/authService";
function useSession() {
  const [session, setSession] = React.useState(null);
  const [loading, setLoadgin] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    authServices
      .getSession()
      .then((userSession) => {
        setSession(userSession)
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoadgin(false);
      });
  }, []);

  return {
    data: session,
    error,
    loading,
  };
}

function AuthPageStatic(props) {
  const session = useSession();

  return (
    <div>
      <h1>Auth Page Static</h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
}

export default AuthPageStatic;
