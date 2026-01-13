import React, {useContext, useEffect} from "react";
import {Button, Skeleton} from "@mui/material";
import {MyLocation} from "@mui/icons-material";
import locationContext from "../../context/locationContext";
import Drawer from "./Drawer";
import Link from "next/link";
import SignOutBtn from "./SignOutBtn";
import userContext from "../../context/userContext";
import {useTranslation} from "react-i18next";
import cookies from "js-cookie";
import Image from "next/image";
import {useSession} from "next-auth/react";

const Header: React.FC = () => {
  const {t} = useTranslation();
  const {status} = useSession();
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
            <Image className="logo-img" src="/images/deshi-q-logo.jpeg" height={70} width={70} alt="DeshiQ" style={{borderRadius: "50%"}}/>
          </Link>
        </div>
        <Link href="/order-history" className="btn-header">
          <Button variant="contained" disableElevation>
            <img src="/images/1.png" alt="Rider"/>
            <strong style={{marginLeft: "10px"}}> {t("myOrders")}</strong>
          </Button>
        </Link>
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
        {status === 'loading' ? (
          <Skeleton variant="text" sx={{fontSize: '1rem'}}/>
        ) : status === 'authenticated' ? (
          <SignOutBtn />
        ) : (
          <Link href="/auth/login" style={{textDecoration: "none"}}>
            <Button variant="contained" className="regLogBtn">
              <strong>{t("registerBtn")} </strong>
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
