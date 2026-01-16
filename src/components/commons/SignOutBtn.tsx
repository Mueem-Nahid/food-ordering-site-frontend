import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import {ExitToApp, PersonOutline, AdminPanelSettingsOutlined, RestaurantOutlined} from "@mui/icons-material";
import Link from "next/link";
import {useTranslation} from "react-i18next";
import {signOut, useSession} from "next-auth/react";
import {useSelector, useDispatch} from "react-redux";
import {logOutUser} from "@/redux/features/users/userSlice";

const AccountMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const {data: session} = useSession();
  const userInfo = useSelector((state: any) => state.user?.userInfo);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignout = () => {
    dispatch(logOutUser());
    signOut({callbackUrl: "/auth/login"});
  };

  const {t} = useTranslation();

  return (
    <React.Fragment>
      <Box sx={{display: "flex", alignItems: "center", textAlign: "center"}}>
        <Tooltip title="My Profile">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ml: 2}}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {
              session?.user?.image ?
                <Avatar sx={{width: {xs: 50, sm: 62}, height: {xs: 50, sm: 62}}} className="signout-btn"
                        alt="Profile Image" src={session?.user?.image}/> :
                <Avatar
                  sx={{width: {xs: 40, sm: 62}, height: {xs: 40, sm: 62}}}
                  className="signout-btn"
                >
                  {session?.user?.name?.substring(0, 1)}
                </Avatar>
            }
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            bgcolor: "#1c1816",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 30,
              width: 10,
              height: 10,
              bgcolor: "#1c1816",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{horizontal: "right", vertical: "top"}}
        anchorOrigin={{horizontal: "right", vertical: "bottom"}}
      >
        <Link href="/my-profile" style={{textDecoration: "none", color: "white"}}>
          <MenuItem
            className="menu-item"
            sx={{fontFamily: "Poppins !important"}}
          >
            <PersonOutline/> <span>{t("profile")}</span>
          </MenuItem>
        </Link>
        <Link href="/order-history" className="my-orders-menu-item" style={{textDecoration: "none", color: "white"}}>
          <MenuItem
            className="menu-item"
            sx={{fontFamily: "Poppins !important"}}
          >
            <RestaurantOutlined/> <span>{t("myOrders")}</span>
          </MenuItem>
        </Link>
        {
          userInfo?.role === 'admin' &&
          <Link href="/admin" style={{textDecoration: "none", color: "white"}}>
            <MenuItem
              className="menu-item"
              sx={{fontFamily: "Poppins !important"}}
            >
              <AdminPanelSettingsOutlined /> <span>{t("admin")}</span>
            </MenuItem>
          </Link>
        }
        <div onClick={handleSignout}>
          <MenuItem
            className="menu-item"
            sx={{fontFamily: "Poppins !important", color: "white"}}
          >
            <ExitToApp/> <span>{t("logout")}</span>
          </MenuItem>
        </div>
      </Menu>
    </React.Fragment>
  );
};

export default AccountMenu;
