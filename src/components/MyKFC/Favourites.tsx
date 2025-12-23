import React from "react";
import { Grid } from "@mui/material";
import FavouritesCard from "./FavouritesCard";
// import axios from "axios";
import { useTranslation } from "react-i18next";

interface ProdId {
  _id: string;
  name: string;
  prodImg: string;
  desc: string;
  price: number;
}

interface Fav {
  prod_id: ProdId;
}

interface FavouritesProps {
  favs: Fav[];
  setFavs: (favs: Fav[]) => void;
}

const Favourites: React.FC<FavouritesProps> = ({ favs, setFavs }) => {
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {};

  // handle when clicked on filled heart
  const handleRemoveFav = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    // try {
    //   // removing the product from favourites of logged in user
    //   await axios
    //     .post(process.env.NEXT_PUBLIC_BACKEND + "/api/fav/delFav", {
    //       prod_id: id,
    //       email: user.email,
    //     })
    //     .then((res) => {
    //       if (res.data.error === false) {
    //         const newFavs = favs.filter((fav) => {
    //           return fav.prod_id._id !== id;
    //         });
    //         setFavs(newFavs);
    //       }
    //     });
    // } catch (error) {
    //   console.log(error);
    // }
    // For UI only: remove from favs
    const newFavs = favs.filter((fav) => fav.prod_id._id !== id);
    setFavs(newFavs);
  };

  const { t } = useTranslation();

  return (
    <div className="favourites">
      <h1>{t("fav")}</h1>
      <Grid
        container
        columnSpacing={{ md: 0, xs: 0, sm: 2 }}
        gap={1.5}
        marginTop="2rem"
      >
        {favs.length < 1 ? (
          <Grid sx={{ marginBottom: "1rem" }}>
            <h4>{t("noProd")}</h4>
          </Grid>
        ) : (
          ""
        )}
        {favs.map((fav, index) => {
          return (
            <div key={index}>
              <Grid sx={{ marginBottom: "1rem" }}>
                <FavouritesCard
                  title={fav.prod_id.name}
                  src={fav.prod_id.prodImg}
                  desc={fav.prod_id.desc}
                  price={fav.prod_id.price}
                  id={fav.prod_id._id}
                  handleRemoveFav={handleRemoveFav}
                />
              </Grid>
            </div>
          );
        })}
      </Grid>
    </div>
  );
};

export default Favourites;
