import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import {
  useSession,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import Link from "next/link";
import Account from "../components/Account";

export default function Home() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const user = useUser();

  return (
    <div style={{}}>
      {!user ? (
        <Link href={`login`}>
          <button>Login</button>
        </Link>
      ) : (
        <Account session={session}></Account>
      )}
    </div>
  );
}
