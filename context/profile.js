import { useUser } from "@supabase/auth-helpers-react";
import { createContext, useState, useEffect, useContext } from "react";
import supabase from "../utils/supabase";

const Context = createContext();

const Provider = ({ children }) => {
  const [profile, setProfile] = useState(useUser());

  useEffect(() => {
    supabase.auth.onAuthStateChange(() => {
      SpeechSynthesisUtterance(supabase.auth.user());
    });
  }, []);

  const exposed = {
    user,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useProfile = () => useContext(Context);

export default Provider;
