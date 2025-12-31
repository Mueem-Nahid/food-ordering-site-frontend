import React, { useState } from "react";
import DealsCard from "./DealsCard";

interface Cat {
  categoryImage: string;
  name: string;
  _id: string;
}

interface DealSectionProps {
  categories: Cat[];
}

const DealSection: React.FC<DealSectionProps> = ({ categories }) => {
  const [active, setActive] = useState<number | "">("");

  // set a deal as active
  const handleActive = (i: number) => {
    setActive(i);
  };

  return (
    <div className="deal-container">
      {categories.map((cat, index) => (
        <div key={cat._id} onClick={() => handleActive(index)}>
          <DealsCard
            classes={
              index === active
                ? "active"
                : active === ""
                ? (handleActive(0), "")
                : ""
            }
            src={cat?.categoryImage}
            name={cat.name}
            id={cat._id}
          />
        </div>
      ))}
    </div>
  );
};

export default DealSection;
