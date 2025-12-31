import React, { useState, useEffect } from "react";
import DealsCard from "./DealsCard";
import {useParams} from "next/navigation";

interface Cat {
  categoryImage: string;
  name: string;
  _id: string;
}

interface DealSectionProps {
  categories: Cat[];
}

const DealSection: React.FC<DealSectionProps> = ({ categories }) => {
  const params = useParams();
  const name = params?.name as string;
  const [active, setActive] = useState<string>(name || "");

  useEffect(() => {
    if (name && categories.some(cat => cat.name === name)) {
      setActive(name);
    }
  }, [name, categories]);

  // set a deal as active
  const handleActive = (i: string) => {
    setActive(i);
  };

  return (
    <div className="deal-container">
      {categories.map((cat, index) => (
        <div key={cat._id} onClick={() => handleActive(cat?.name)}>
          <DealsCard
            classes={cat?.name === active ? "active" : ""}
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
