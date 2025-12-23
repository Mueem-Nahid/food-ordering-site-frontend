"use client";
import React, { useState, ReactNode } from "react";
import softDrinkContext from "./softDrinkContext";
// import axios from "axios";

interface SoftDrinkStateProps {
  children: ReactNode;
}

interface SoftDrink {
  [key: string]: any;
}

const SoftDrinkState: React.FC<SoftDrinkStateProps> = ({ children }) => {
  const [softDrinks, setSoftDrinks] = useState<SoftDrink[]>([]);
  const [softDrinksQuantity, setSoftDrinksQuantity] = useState<any[]>([]);
  const getAllSoftDrinks = async () => {
    // try {
    //   await axios
    //     .get(process.env.NEXT_PUBLIC_BACKEND + "/api/softdrink/getSoftdrinks")
    //     .then((res) => {
    //       setSoftDrinks(res.data);
    //     });
    // } catch (error) {
    //   console.error(error);
    // }
    // For UI only: set dummy soft drinks
    setSoftDrinks([]);
  };

  return (
    <softDrinkContext.Provider
      value={{
        getAllSoftDrinks,
        softDrinks,
        setSoftDrinksQuantity,
        softDrinksQuantity,
      }}
    >
      {children}
    </softDrinkContext.Provider>
  );
};

export default SoftDrinkState;
