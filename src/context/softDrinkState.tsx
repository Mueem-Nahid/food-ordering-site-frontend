"use client";
import React, { useState, ReactNode } from "react";
import softDrinkContext from "./softDrinkContext";

interface SoftDrinkStateProps {
  children: ReactNode;
}

interface SoftDrink {
  [key: string]: unknown;
}

const SoftDrinkState: React.FC<SoftDrinkStateProps> = ({ children }) => {
  const [softDrinks, setSoftDrinks] = useState<SoftDrink[]>([]);
  const [softDrinksQuantity, setSoftDrinksQuantity] = useState<unknown[]>([]);
  const getAllSoftDrinks = async () => {
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
