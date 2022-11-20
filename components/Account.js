import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Account({ session }) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(null);
  const [interval, setInterval] = useState(null);
  const [subscriptionTier, setSubscriptionTier] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profile")
        .select(`isSubscribed, interval, subscriptionTier`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setIsSubscribed(data.isSubscribed);
        setInterval(data.interval);
        setSubscriptionTier(data.subscriptionTier);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true);

      const updates = {
        id: user.id,
        isSubscribed,
        interval,
        subscriptionTier,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from("profile").upsert(updates);
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="isSubscribed">isSubscribed</label>
        <input
          id="isSubscribed"
          type="checkbox"
          value={isSubscribed || ""}
          onChange={(e) => setIsSubscribed(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="interval">interval</label>
        <input
          id="interval"
          type="text"
          value={interval || ""}
          onChange={(e) => setInterval(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button primary block"
          onClick={() =>
            updateProfile({ isSubscribed, interval, subscriptionTier })
          }
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>

      <div>
        <button
          className="button block"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
