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
    "name": "Everyday Value",
    "catPic": "https://res.cloudinary.com/digaxe3sc/image/upload/v1660500830/kfc-clone/zuiwg7m02tnixi5o84bj.jpg",
    "__v": 0
  },
  {
    "_id": "62f64a828383b6a625ff579b",
    "name": "Ala-carte & Combos",
    "catPic": "https://res.cloudinary.com/digaxe3sc/image/upload/v1660501151/kfc-clone/pyptployrgfpbdoxuayd.jpg",
    "__v": 0
  },
  {
    "_id": "62f64aa88383b6a625ff579d",
    "name": "Signature Boxes",
    "catPic": "https://res.cloudinary.com/digaxe3sc/image/upload/v1660501211/kfc-clone/qqi8ekypfqykdsps3al1.jpg",
    "__v": 0
  },
  {
    "_id": "62f64ac18383b6a625ff579f",
    "name": "Sharing",
    "catPic": "https://res.cloudinary.com/digaxe3sc/image/upload/v1660501259/kfc-clone/mdmeki1x0nl0ocb4zuhb.jpg",
    "__v": 0
  },
  {
    "_id": "62f64acc8383b6a625ff57a1",
    "name": "Snacks & Beverages",
    "catPic": "https://res.cloudinary.com/digaxe3sc/image/upload/v1660501328/kfc-clone/mxvczfezyuxnznjyc7tf.jpg",
    "__v": 0
  },
  {
    "_id": "62f64adb8383b6a625ff57a3",
    "name": "Midnight",
    "catPic": "https://res.cloudinary.com/digaxe3sc/image/upload/v1660501379/kfc-clone/xve59lsgumjpql2ohkyy.jpg",
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
