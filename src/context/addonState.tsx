"use client";
import React, { useState, ReactNode } from "react";
import addonContext from "./addonContext";
// import axios from "axios";

interface AddonStateProps {
  children: ReactNode;
}

interface Addon {
  [key: string]: any;
}

interface AddonContextValue {
  loading: boolean;
  getAllAddons: () => Promise<void>;
  addons: Addon[];
  setAddonQuantity: React.Dispatch<React.SetStateAction<any[]>>;
  addonQuantity: any[];
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddonState: React.FC<AddonStateProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [addons, setAddons] = useState<Addon[]>([]);
  const [addonQuantity, setAddonQuantity] = useState<any[]>([]);
  const getAllAddons = async () => {
    // try {
    //   await axios
    //     .get(process.env.NEXT_PUBLIC_BACKEND + "/api/addon/getAddons")
    //     .then((res) => {
    //       setAddons(res.data);
    //     });
    // } catch (error) {
    //   console.error(error);
    // }
    // For UI only: set dummy addons
    setAddons([]);
  };

  return (
    <addonContext.Provider
      value={{
        loading,
        getAllAddons,
        addons,
        setAddonQuantity,
        addonQuantity,
        setLoading,
      }}
    >
      {children}
    </addonContext.Provider>
  );
};

export default AddonState;
