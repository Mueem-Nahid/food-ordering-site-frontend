import React from "react";
import {Accordion, AccordionDetails, AccordionSummary,} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import locationContext from "../../context/locationContext";
import {useTranslation} from "react-i18next";
import {useGetUserQuery, useUpdateUserMutation} from "@/redux/features/users/userApi";
import {useAppSelector} from "@/redux/hook";
import EditableField from "@/components/MyKFC/EditableField";

const ProfileDetails: React.FC = () => {
  const context = React.useContext(locationContext);
  const reduxUser = useAppSelector((state) => state.user?.userInfo);
  const [userId, setUserId] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    let id = reduxUser?._id;
    if (!id && typeof window !== "undefined") {
      try {
        id = JSON.parse(localStorage.getItem("user") || "{}")?.userInfo?._id;
      } catch {
        id = undefined;
      }
    }
    setUserId(id);
  }, [reduxUser]);

  const {data: userInfo, isLoading, isError, refetch} = useGetUserQuery(userId, {skip: !userId});
  const [updateUser] = useUpdateUserMutation();
  const {
    setValue,
    setDisplaySections,
    displaySections,
  } = context;

  const clickSelecDifLoc = () => {
    setDisplaySections({first: "flex", second: "none"});
    setValue("");
  };

  const {t} = useTranslation();

  if (!userId) {
    return (
      <div style={{marginTop: "2rem", color: "red"}}>
        {t("userNotFound")}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div style={{marginTop: "2rem"}}>
        {t("loadingUserInfo")}
      </div>
    );
  }

  if (isError || !userInfo.data) {
    return (
      <div style={{marginTop: "2rem", color: "red"}}>
        {t("failedToLoadUser")}
      </div>
    );
  }

  return (
    <div style={{marginTop: "2rem"}}>
      <Accordion
        sx={{
          marginBottom: ".7rem",
          backgroundColor: "#1c1816",
          color: "white",
          borderRadius: "12px !important",
          padding: "1rem 1rem",
          fontFamily: "Poppins",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore sx={{color: "red"}}/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h3>{t("personalInfo")}</h3>
        </AccordionSummary>
        <AccordionDetails>
          <h3>{t("email")}</h3>
          <span style={{fontFamily: "Poppins"}}>{userInfo?.data?.email}</span>
          <div style={{marginTop: "1rem"}}>
            <h3>{t("name")}</h3>
            <span style={{fontFamily: "Poppins"}}>{userInfo?.data?.name}</span>
          </div>
          <EditableField
            label={t("address")}
            value={userInfo?.data?.address}
            onSave={async (val) => {
              if (userInfo?.data?._id) {
                await updateUser({id: userInfo.data._id, address: val});
                refetch();
              }
            }}
          />
          <EditableField
            label={t("phoneNumber")}
            value={userInfo?.data?.phoneNumber}
            onSave={async (val) => {
              if (userInfo?.data?._id) {
                await updateUser({id: userInfo?.data?._id, phoneNumber: val});
                refetch();
              }
            }}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ProfileDetails;
