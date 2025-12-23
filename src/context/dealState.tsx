"use client";
import React, { useState, ReactNode } from "react";
import dealContext from "./dealContext";
// import axios from "axios";

interface DealStateProps {
  children: ReactNode;
}

interface Cat {
  [key: string]: any;
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
    // try {
    //   await axios
    //     .get(process.env.NEXT_PUBLIC_BACKEND + "/api/cat/getCat")
    //     .then((res) => {
    //       setCats(res.data.getCategories);
    //       setLoading(false);
    //     });
    // } catch (error) {
    //   console.error(error);
    // }
    // For UI only: set dummy categories
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
