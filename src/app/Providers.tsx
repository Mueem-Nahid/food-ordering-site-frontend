"use client";
import "../i18n";
import React from "react";
import {Provider} from "react-redux";
import DealState from "../context/dealState";
import AddonState from "../context/addonState";
import SoftDrinkState from "../context/softDrinkState";
import PaymentState from "../context/paymentState";
import LocationState from "../context/locationState";
import UserState from "../context/userState";
import {SessionProvider} from "next-auth/react";
import store from "@/redux/store";

import AuthSync from "./AuthSync";

export default function Providers({children}: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <DealState>
          <AddonState>
            <SoftDrinkState>
              <PaymentState>
                <LocationState>
                  <UserState>
                    <AuthSync />
                    {children}
                  </UserState>
                </LocationState>
              </PaymentState>
            </SoftDrinkState>
          </AddonState>
        </DealState>
      </Provider>
    </SessionProvider>
  );
}
