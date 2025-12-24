import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Favorite, AddCircle, Edit } from "@mui/icons-material";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cart/cartSlice";
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

interface CartItem {
  prod_id: string;
  [key: string]: any;
}

interface RootState {
  cart: {
    cartItems: CartItem[];
  };
}

const FavouritesCard: React.FC<FavouritesCardProps> = ({
  src,
  title,
  desc,
  price,
  id,
  handleRemoveFav,
}) => {
  const { cartItems } = useSelector((store: RootState) => store.cart);
  const dispatch = useDispatch();
  const getUser =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {};
  const [edit, setEdit] = useState(false);
  const { t } = useTranslation();
  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();

    dispatch(
      addToCart({
        product: { price, title, id, src },
        quantity: 1,
        email: getUser.email,
        addons: [],
        softDrinks: [],
        prod_id: id,
      })
    );
    setEdit(true);
  };
  useEffect(() => {
    // check if item already available in card than show edit button instead of add
    const find = cartItems.find((item) => item.prod_id === id);

    if (find !== undefined) {
      setEdit(true);
    } else {
      setEdit(false);
    }
    //eslint-disable-next-line
  }, [cartItems]);
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
            <img src={src} width={100} alt="Favourite" />
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
