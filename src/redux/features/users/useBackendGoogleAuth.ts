import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/redux/hook";
import { setCredentials } from "./userSlice";

export function useBackendGoogleAuth() {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const hasSynced = useRef(false);

  useEffect(() => {
    if (status === "authenticated" && session?.user && !hasSynced.current) {
      hasSynced.current = true;
      const accessToken = session.user.accessToken;
      const role = session.user.role;
      const backendUserId = session.user.backendUserId;
      if (accessToken && backendUserId) {
        const userInfo = {
          _id: backendUserId,
          id: backendUserId,
          email: session.user.email || "",
          name: session.user.name || "",
          role: role || "user",
        };
        dispatch(setCredentials({ userInfo, accessToken }));
        localStorage.setItem(
          "user",
          JSON.stringify({ userInfo, accessToken })
        );
      }
    }
  }, [session, status, dispatch]);
}
