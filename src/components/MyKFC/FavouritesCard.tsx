import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Favorite, AddCircle, Edit } from "@mui/icons-material";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { addToCart } from "../../redux/cart/cartSlice";
import OptimizedImage from "../commons/OptimizedImage";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface FavouritesCardProps {
  src: string;
  title: string;
  desc: string;
  price: number;
  id: string;
  handleRemoveFav: (e: React.MouseEvent, id: string) => void;
}

const FavouritesCard: React.FC<FavouritesCardProps> = ({
  src,
  title,
  desc,
  price,
  id,
  handleRemoveFav,
}) => {
  const { cartItems } = useAppSelector((store) => store.cart);
  const dispatch = useAppDispatch();
  const [userEmail, setUserEmail] = useState<string | undefined>(undefined);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const u = JSON.parse(localStorage.getItem("user") || "{}");
        setUserEmail(u?.userInfo?.email);
      } catch {
        setUserEmail(undefined);
      }
    }
  }, []);

  const [edit, setEdit] = useState(false);
  const { t } = useTranslation();
  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();

    dispatch(
      addToCart({
        product: { price, title, id, src },
        quantity: 1,
        email: userEmail,
        addons: [],
        softDrinks: [],
        prod_id: id,
      })
    );
    setEdit(true);
  };
  useEffect(() => {
    const find = cartItems.find((item) => item.prod_id === id);

    if (find !== undefined) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  }, [cartItems, id]);
  return (
    <Link href={`/product/${id}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{ minWidth: 350, backgroundColor: "#1c1816", borderRadius: "10px" }}
      >
        <CardContent className="fav-card">
          <div className="fav-icon" onClick={(e) => handleRemoveFav(e, id)}>
            <Favorite
              sx={{ color: "#e4002b", "&:hover": { cursor: "pointer" } }}
            />
          </div>

          <div className="fav-img">
            <OptimizedImage src={src} alt="Favourite" fill width={100} sizes="100px" />
          </div>
          <Typography
            variant="h6"
            sx={{ mb: 1.5, fontWeight: "700" }}
            color="white"
          >
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "white" }}>
            {desc.substring(0, 20)} ...
          </Typography>
          <div className="fav-price">
            <span>Rs {price}</span>
            {edit === false ? (
              <div className="add-fav-to-bucket" onClick={handleAdd}>
                <AddCircle sx={{ color: "#e4002b" }} />
                <span className="add-fav">{t("add")}</span>
              </div>
            ) : (
              <div className="add-fav-to-bucket">
                <Edit sx={{ color: "#e4002b" }} />
                <span className="add-fav">{t("edit")}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default FavouritesCard;
