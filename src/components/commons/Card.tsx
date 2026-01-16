import React, {MouseEvent, useContext, useEffect, useState} from "react";
import {Button} from "@mui/material";
import {Add, Edit} from "@mui/icons-material";
import Link from "next/link";
import userContext from "../../context/userContext";
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "@/redux/cart/cartSlice";
import {useTranslation} from "react-i18next";

interface CardProps {
  src: string;
  title: string;
  desc: string;
  price: number;
  id: string;
  catName: string;
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

const Card: React.FC<CardProps> = ({src, title, desc, price, id, catName}) => {
  const hour = new Date().getHours();
  const dispatch = useDispatch();

  const [addIcon, setAddIcon] = useState<boolean | undefined>(undefined);

  const {cartItems} = useSelector((store: RootState) => store.cart);

  // use below state to make button disable to check if it is midnight deal or not
  const [btn, setBtn] = useState<boolean | null>(null);

  // use below state to make link disable to check if it is midnight deal or not
  const [link, setLink] = useState<string>("");
  const context = useContext(userContext);
  const {user} = context;
  // use below state to mark or unmark product as favourite
  const [isFav, setIsFav] = useState(false);

  // get logged in user
  const getUser = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "{}") : {};

  // translation
  const {t} = useTranslation();

  // check the time if it is midnight or not
  const checkMidnight = () => {
    if (catName === "Midnight") {
      // check if it is before or after 2 am
      hour < 2 ? setLink(`/product/${id}`) : setLink("");
      hour < 2 ? setBtn(false) : setBtn(true);
    } else {
      setLink(`/product/${id}`);
      setBtn(false);
    }
  };

  // // get all favourites of logged in user
  // const getFavs = async () => {
  //   try {
  //     const res = await axios.get(
  //       process.env.NEXT_PUBLIC_BACKEND + "/api/fav/getFavs/" + getUser.email
  //     );
  //     const checkFav = res.data.getFav.filter((fav: any) => {
  //       return fav._id === id;
  //     });
  //     checkFav.length > 0 ? setIsFav(true) : setIsFav(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // // handle when clicked on bordered heart
  // const handleAddFav = async (e: MouseEvent, id: string) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "/api/fav/addFav", {
  //       prod_id: id,
  //       email: getUser.email,
  //     });
  //     if (res.data.error === false) {
  //       setIsFav(true);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // // handle when clicked on filled heart
  // const handleRemoveFav = async (e: MouseEvent, id: string) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "/api/fav/delFav", {
  //       prod_id: id,
  //       email: getUser.email,
  //     });
  //     if (res.data.error === false) {
  //       setIsFav(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // handle When clicked on add to bucket button
  const handleAddToCart = (id: string, e: MouseEvent) => {
    e.preventDefault();

    dispatch(
      addToCart({
        product: {price, title, id, src},
        quantity: 1,
        addons: [],
        softDrinks: [],
        prod_id: id,
      })
    );
  };

  useEffect(() => {
    // if (typeof window !== "undefined" && localStorage.getItem("user")) {
    //   getFavs();
    // }
    checkMidnight();
    // check if product is already available in cart, if it is available show warning else add to cart
    const find = cartItems.find((item) => item.prod_id === id);
    if (find === undefined) {
      setAddIcon(true);
    } else {
      setAddIcon(false);
    }
    //eslint-disable-next-line
  }, [user, cartItems]);

  return (
    <div className="grid-item">
      <Link href={link} className="card-link">

        <div className="card-img">
          <img className="top-sel-img" src={src} alt="Top Selling"/>
        </div>
        <h4>
          {title.length > 20 ? title.substring(0, 20) + "..." : title}
        </h4>
        <h5>{desc.substring(0, 50)} ...</h5>
        <div className="card-footer">
          <h2>
            <strong>$ {price}</strong>
          </h2>
          <strong>
            {addIcon === true ? (
              btn === false ? (
                <Add
                  className="plus-icon"
                  onClick={(e) => handleAddToCart(id, e)}
                />
              ) : (
                ""
              )
            ) : (
              <Edit className="plus-icon" sx={{color: "#e4002b"}}/>
            )}
          </strong>

          {addIcon === true ? (
            <Button
              variant="contained"
              className="add-to-bucket"
              disabled={btn ?? undefined}
              // onClick={(e) => handleAddToCart(id, e)}
            >
              <strong>{t("addToBucket")}</strong>
            </Button>
          ) : (
            <Edit className="edit-icon" sx={{color: "#e4002b"}}/>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Card;
