import React, {useContext, useEffect} from "react";
/* image import removed, use public path */
import {Button, Stack, Typography} from "@mui/material";
/* image import removed, use public path */
import {MyLocation} from "@mui/icons-material";
import Modal from "./Modal";
import locationContext from "../../context/locationContext";
import Drawer from "./Drawer";
import Link from "next/link";
import SignOutBtn from "./SignOutBtn";
import userContext from "../../context/userContext";
import {useTranslation} from "react-i18next";
import cookies from "js-cookie";
import Image from "next/image";

const Header: React.FC = () => {
  const {t} = useTranslation();
  const context = useContext(locationContext);
  const {getLocation} = context;
  const context2 = useContext(userContext);
  const {user} = context2;
  const currentLangCode = cookies.get("i18next") || "en";
  useEffect(() => {
    getLocation();
    // getCartInfo();
    //eslint-disable-next-line
  }, [user, typeof window !== "undefined" ? localStorage.getItem("user") : null, currentLangCode]);

  return (
    <div className="header">
      <div className="header-inner">
        <div className="logo">
          <Link href="/">
            <Image src="/images/deshi-q.png" height={70} width={70} alt="DeshiQ"/>
          </Link>
        </div>
        <div className="btn-header">
          <Button variant="contained" disableElevation>
            <img src="/images/1.png" alt="Rider"/>
            <strong style={{marginLeft: "10px"}}> {t("deliveryBtn")}</strong>
          </Button>
        </div>
        <div className="select-location-header">
          <Button variant="contained" disableElevation>
            <MyLocation/>
            {/* TODO: change later*/}
            {/*<Modal/>*/}
          </Button>
        </div>
      </div>
      <div className="header-inner">
        <Drawer/>
        {typeof window !== "undefined" && localStorage.getItem("user") === null ? (
          <Link href="/login" style={{textDecoration: "none"}}>
            <Button variant="contained" className="regLogBtn">
              <strong>{t("registerBtn")} </strong>
              {/* <strong>Register </strong> */}
            </Button>
          </Link>
        ) : (
          <>
            <SignOutBtn/>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
