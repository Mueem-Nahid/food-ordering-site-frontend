import React from "react";
import {Accordion, AccordionDetails, AccordionSummary,} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import locationContext from "../../context/locationContext";
import {useTranslation} from "react-i18next";
import {useGetUserQuery, useUpdateUserMutation} from "@/redux/features/users/userApi";
import {useSelector} from "react-redux";
import EditableField from "@/components/MyKFC/EditableField";

interface AccordinProps {
  userEmail?: string | null;
}

const SimpleAccordion: React.FC<AccordinProps> = ({userEmail}) => {
  const context = React.useContext(locationContext);
  // Try to get userId from Redux, fallback to localStorage
  const reduxUser = useSelector((state: any) => state.user?.userInfo);
  const userId =
    reduxUser?._id ||
    (typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")?._id
      : undefined);

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
        {t("User not found. Please log in.")}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div style={{marginTop: "2rem"}}>
        {t("Loading user information...")}
      </div>
    );
  }

  if (isError || !userInfo.data) {
    return (
      <div style={{marginTop: "2rem", color: "red"}}>
        {t("Failed to load user information.")}
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
          padding: "1rem 0.4rem",
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

export default SimpleAccordion;
