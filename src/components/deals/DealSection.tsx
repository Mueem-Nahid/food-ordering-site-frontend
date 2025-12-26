import React, { useContext, useEffect, useState } from "react";
import dealContext from "../../context/dealContext";
import DealsCard from "./DealsCard";

interface Cat {
  catPic: string;
  name: string;
  _id: string;
}

const categories =  [
  {
    "_id": "62f64a5e8383b6a625ff5799",
    "name": "Meals",
    "catPic": "/images/meals.png",
    "__v": 0
  },
  {
    "_id": "62f64a828383b6a625ff579b",
    "name": "Snacks",
    "catPic": "/images/snacks.png",
    "__v": 0
  },
  {
    "_id": "62f64aa88383b6a625ff579d",
    "name": "Sides",
    "catPic": "/images/sides.png",
    "__v": 0
  },
  {
    "_id": "62f64ac18383b6a625ff579f",
    "name": "Desserts",
    "catPic": "/images/desserts.png",
    "__v": 0
  },
  {
    "_id": "62f64acc8383b6a625ff57a1",
    "name": "Drinks",
    "catPic": "/images/drinks.png",
    "__v": 0
  }
]

const DealSection: React.FC = () => {
  const context = useContext(dealContext);
  const { cats, getCats } = context as { cats: Cat[]; getCats: () => void };
  const [active, setActive] = useState<number | "">("");

  // set a deal as active
  const handleActive = (i: number) => {
    setActive(i);
  };

  useEffect(() => {
    getCats();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="deal-container">
      {categories.map((cat, index) => {
        return (
          <div key={index} onClick={() => handleActive(index)}>
            <DealsCard
              classes={
                index === active
                  ? "active"
                  : active === ""
                  ? (handleActive(0), "")
                  : ""
              }
              src={cat.catPic}
              name={cat.name}
              id={cat._id}
            />
          </div>
        );
      })}
    </div>
  );
};

export default DealSection;
