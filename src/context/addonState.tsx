"use client";
import React, { useState, ReactNode } from "react";
import addonContext from "./addonContext";

interface AddonStateProps {
  children: ReactNode;
}

interface Addon {
  [key: string]: unknown;
}

interface AddonContextValue {
  loading: boolean;
  getAllAddons: () => Promise<void>;
  addons: Addon[];
  setAddonQuantity: React.Dispatch<React.SetStateAction<unknown[]>>;
  addonQuantity: unknown[];
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddonState: React.FC<AddonStateProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [addons, setAddons] = useState<Addon[]>([]);
  const [addonQuantity, setAddonQuantity] = useState<unknown[]>([]);
  const getAllAddons = async () => {
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
