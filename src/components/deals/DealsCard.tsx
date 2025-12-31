import React from "react";
import Link from "next/link";

interface DealsCardProps {
  src: string;
  name: string;
  classes?: string;
  id?: string;
}

const DealsCard: React.FC<DealsCardProps> = ({ src, name, classes = "", id }) => {
  return (
    <div className="deals">
      <Link
        href={`/category/${name}`}
        style={{ color: "white", textDecoration: "none" }}
      >
        <div className="deals-inner">
          <div
            className={`deals-image ${classes}`}
            style={{
border: src === "/images/deal1.png" ? "2px solid white" : "",
            }}
          >
            <img src={src} width={70} alt="Deal" />
          </div>
          <strong>{name}</strong>
        </div>
      </Link>
    </div>
  );
};

export default DealsCard;
