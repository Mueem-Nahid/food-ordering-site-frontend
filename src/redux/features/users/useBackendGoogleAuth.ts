import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useGoogleAuthUpsertMutation } from "./userApi";
import { useAppDispatch } from "@/redux/hook";
import { setCredentials } from "./userSlice";

// Call this hook in your _app.tsx, Providers, or a top-level layout/component
export function useBackendGoogleAuth() {
  const { data: session, status } = useSession();
  const [googleAuthUpsert] = useGoogleAuthUpsertMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const upsert = async () => {
      if (session?.user?.email && session?.user?.name) {
        const res = await googleAuthUpsert({
          email: session.user.email,
          name: session.user.name,
          address: '',
        }).unwrap();
        if (res?.data?.accessToken && res?.data?.user) {
          dispatch(setCredentials({
            userInfo: res.data.user,
            accessToken: res.data.accessToken,
          }));
          localStorage.setItem("user", JSON.stringify({
            userInfo: res.data.user,
            accessToken: res.data.accessToken,
          }));
        }
      }
    };
    if (status === "authenticated") {
      upsert();
    }
  }, [session, status, googleAuthUpsert, dispatch]);
}
