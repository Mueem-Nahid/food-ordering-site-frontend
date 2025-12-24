import React, { useContext, useEffect, useState, useRef } from "react";
import { Add, DeleteOutline, Remove } from "@mui/icons-material";
import addonContext from "../../context/addonContext";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

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

interface CartItem {
  prod_id: string;
  addons: { addon: Addon; quantity: number }[];
  [key: string]: any;
}

interface RootState {
  cart: {
    cartItems: CartItem[];
  };
}

const AddonItem: React.FC<AddonItemProps> = ({ addon, index, prod_id }) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const { cartItems } = useSelector((store: RootState) => store.cart);
  const context = useContext(addonContext);
  // delete icon trigger
  const [del, setDel] = useState(false);

  const { addonQuantity, setAddonQuantity } = context;
  const [quantity, setQuantity] = useState<{ addon: Addon | string; quantity: number | string }>({
    addon: "",
    quantity: "",
  });
  const { t } = useTranslation();
  // handle when clicked on add icon
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

  // handle when clicked on either + or -
  const handleQuantity = (operator: "+" | "-", e: React.MouseEvent<SVGSVGElement, MouseEvent>, addon: Addon) => {
    // removing incoming addon from addon quantity
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
      // adding addon again with new value to addon quantity
      setAddonQuantity(
        filteredAddon.concat({ addon: addon, quantity: newQuantity })
      );
    } else {
      if (Number(quantity.quantity) < 2) {
        // if quantity equals to one show delete button
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
    // check if product not exist in cart items then return it else set the addon value available already in cart

    if (checkFilter === undefined) {
      return;
    }
    const checkAddonInner = checkFilter.addons.find(
      (item) => item.addon._id === addon._id
    );
    if (checkAddonInner === undefined) {
      return;
    } else {
      // removing incoming addon from addon quantity and adding it again. Purpose:When someone use browser navigation button it will not be added again and again
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

  // handle when clicked on delete icon
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
    //check if addon is with product or not
    checkAddon(prod_id);
    //eslint-disable-next-line
  }, [prod_id]);

  return (
    <>
      <div className="img">
        <img src={addon.pic} alt="Addon" width={30} />
      </div>
      <div className="addon-name">
        <span>{addon.name}</span>
        <span className="addon-price">Rs {addon.price}</span>
      </div>
      <div
        className="addon-add"
        style={{ display: "flex", width: "15vw", justifyContent: "center" }}
      >
        <span onClick={(e) => handleAdd(e, addon)} ref={ref}>
          + {t("add")}
        </span>
      </div>
      <div
        className="addon-quantity"
        style={{ display: "none", width: "15vw", justifyContent: "center" }}
      >
        {del ? (
          <DeleteOutline onClick={() => removeAddon(addon)} />
        ) : (
          <Remove onClick={(e) => handleQuantity("-", e, addon)} />
        )}

        <span>{quantity.quantity}</span>
        <Add onClick={(e) => handleQuantity("+", e, addon)} />
      </div>
    </>
  );
};

export default AddonItem;
