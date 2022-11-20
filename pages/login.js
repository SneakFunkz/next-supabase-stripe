import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import {
  useSession,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import styles from "../styles/login.module.css";

export default function Login() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const user = useUser();

  return (
    <>
      <div className={styles.wrapper}>
        {!user ? (
          <div className={styles.container}>
            <Auth
              supabaseClient={supabase}
              theme="default"
              providers={[`github`, `google`]}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    radii: {
                      borderRadiusButton: "20px",
                      buttonBorderRadius: "20px",
                      inputBorderRadius: "20px",
                    },
                    colors: {
                      inputText: "white",
                    },
                  },
                },
              }}
            />
          </div>
        ) : (
          <>
            <p>Logged in as {user.email}</p>
            <button onClick={() => supabase.auth.signOut()}>Log out</button>
          </>
        )}
      </div>
    </>
  );
}
