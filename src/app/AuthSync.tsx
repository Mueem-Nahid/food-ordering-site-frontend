import React from "react";
import { useBackendGoogleAuth } from "@/redux/features/users/useBackendGoogleAuth";

export default function AuthSync() {
  useBackendGoogleAuth();
  return null;
}
