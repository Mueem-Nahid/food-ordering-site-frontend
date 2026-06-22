import React, { useContext, useEffect, useState, useRef } from "react";
import { Add, DeleteOutline, Remove } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import addonContext from "../../context/addonContext";
import { useAppSelector } from "@/redux/hook";
import { useTranslation } from "react-i18next";
import OptimizedImage from "./OptimizedImage";

interface Addon {
  _id: string;
  name: string;
  price: number;
  pic: string;
  [key: string]: any;
}

interface AddonItemProps {
  addon: Addon;
  index: number;
  prod_id: string;
}

const AddonItem: React.FC<AddonItemProps> = ({ addon, index, prod_id }) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const { cartItems } = useAppSelector((store) => store.cart);
  const context = useContext(addonContext);
  const [del, setDel] = useState(false);

  const { addonQuantity, setAddonQuantity } = context;
  const [quantity, setQuantity] = useState<{ addon: Addon | string; quantity: number | string }>({
    addon: "",
    quantity: "",
  });
  const { t } = useTranslation();
  const handleAdd = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, addon: Addon) => {
    if (e.target instanceof HTMLElement) {
      const parent = e.target.parentElement;
      if (parent) {
        parent.style.display = "none";
        if (parent.nextSibling instanceof HTMLElement) {
          parent.nextSibling.style.display = "flex";
        }
      }
    }
    setQuantity({
      addon: addon,
      quantity: 1,
    });
    setAddonQuantity(addonQuantity.concat({ addon: addon, quantity: 1 }));
    setDel(false);
  };

  const handleQuantity = (operator: "+" | "-", addon: Addon) => {
    const filteredAddon = addonQuantity.filter((addonCheck: any) => {
      return addonCheck.addon._id !== addon._id;
    });
    if (operator === "+") {
      setDel(false);
      const newQuantity = Number(quantity.quantity) + 1;
      setQuantity({
        addon: addon,
        quantity: newQuantity,
      });
      setAddonQuantity(
        filteredAddon.concat({ addon: addon, quantity: newQuantity })
      );
    } else {
      if (Number(quantity.quantity) < 2) {
        setDel(true);
        return;
      }
      const newQuantity = Number(quantity.quantity) - 1;
      setQuantity({
        addon: addon,
        quantity: newQuantity,
      });
      setAddonQuantity(
        filteredAddon.concat({ addon: addon, quantity: newQuantity })
      );
    }
  };

  const checkAddon = (prod_id: string) => {
    const checkFilter = cartItems.find((item) => item.prod_id === prod_id);

    if (checkFilter === undefined) {
      return;
    }
    const checkAddonInner = checkFilter.addons.find(
      (item) => item.addon._id === addon._id
    );
    if (checkAddonInner === undefined) {
      return;
    } else {
      const filteredAddon = addonQuantity.filter((addonCheck: any) => {
        return addonCheck.addon._id !== addon._id;
      });
      setAddonQuantity(filteredAddon);
      if (ref.current) {
        const parent = ref.current.parentElement;
        if (parent) {
          parent.style.display = "none";
          if (parent.nextSibling instanceof HTMLElement) {
            parent.nextSibling.style.display = "flex";
          }
        }
      }

      setQuantity({ addon, quantity: checkAddonInner.quantity });

      setAddonQuantity((addonQuantity: any) => [
        ...addonQuantity,
        {
          addon: checkAddonInner.addon,
          quantity: checkAddonInner.quantity,
        },
      ]);
    }
  };

  const removeAddon = (addon: Addon) => {
    const newAddons = addonQuantity.filter((item: any) => {
      return item.addon._id !== addon._id;
    });
    setAddonQuantity(newAddons);
    if (ref.current) {
      const parent = ref.current.parentElement;
      if (parent) {
        parent.style.display = "flex";
        if (parent.nextSibling instanceof HTMLElement) {
          parent.nextSibling.style.display = "none";
        }
      }
    }
  };

  useEffect(() => {
    checkAddon(prod_id);
    //eslint-disable-next-line
  }, [prod_id]);

  return (
    <>
      <div className="img">
        <OptimizedImage src={addon.pic} alt="Addon" width={40} height={40} sizes="40px" />
      </div>
      <div className="addon-name">
        <span>{addon.name}</span>
        <span className="addon-price">Rs {addon.price}</span>
      </div>
      <div
        className="addon-add"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <span onClick={(e) => handleAdd(e, addon)} ref={ref}>
          + {t("add")}
        </span>
      </div>
      <div
        className="addon-quantity"
        style={{ display: "none", justifyContent: "center" }}
      >
        {del ? (
          <IconButton onClick={() => removeAddon(addon)} size="small" sx={{ color: "#ff741f" }}>
            <DeleteOutline />
          </IconButton>
        ) : (
          <IconButton onClick={() => handleQuantity("-", addon)} size="small" sx={{ color: "#ff741f" }}>
            <Remove />
          </IconButton>
        )}

        <span>{quantity.quantity}</span>
        <IconButton onClick={() => handleQuantity("+", addon)} size="small" sx={{ color: "#ff741f" }}>
          <Add />
        </IconButton>
      </div>
    </>
  );
};

export default AddonItem;
