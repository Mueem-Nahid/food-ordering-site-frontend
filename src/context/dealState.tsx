"use client";
import React, { useState, ReactNode } from "react";
import dealContext from "./dealContext";

interface DealStateProps {
  children: ReactNode;
}

interface Cat {
  [key: string]: unknown;
}

interface DealContextValue {
  loading: boolean;
  cats: Cat[];
  getCats: () => Promise<void>;
}

const DealState: React.FC<DealStateProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [cats, setCats] = useState<Cat[]>([]);
  const getCats = async () => {
    setCats([]);
    setLoading(false);
  };
  return (
    <dealContext.Provider value={{ loading, cats, getCats }}>
      {children}
    </dealContext.Provider>
  );
};

export default DealState;
