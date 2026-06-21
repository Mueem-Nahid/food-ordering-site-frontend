import React from "react";
import Link from "next/link";
import OptimizedImage from "../commons/OptimizedImage";

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
            <OptimizedImage src={src} alt="Deal" width={70} height={70} sizes="70px" />
          </div>
          <strong>{name}</strong>
        </div>
      </Link>
    </div>
  );
};

export default DealsCard;
