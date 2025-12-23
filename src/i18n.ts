import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: "Welcome",
        hello: "Hello",
        fav: "Favourites",
        noProd: "No products found",
        addToBucket: "Add To Bucket",
        save: "Save",
        pastOrders: "Past Orders",
        viewAll: "View All",
        paymentMethod: "Payment Method",
        address: "Address",
        items: "Items",
        subTotal: "Subtotal",
        myAddresses: "My Addresses",
        personalInfo: "Personal Info",
        email: "Email",
        home: "Home",
        office: "Office",
        partner: "Partner",
        selectADifLocation: "Select a different location",
        addons: "Addons",
        softDrink: "Soft Drink",
        // ...add more keys as needed
      },
    },
    "ur-PK": {
      translation: {
        welcome: "خوش آمدید",
        hello: "ہیلو",
        fav: "پسندیدہ",
        noProd: "کوئی مصنوعات نہیں ملی",
        addToBucket: "بالٹی میں شامل کریں",
        save: "محفوظ کریں",
        pastOrders: "پچھلے آرڈرز",
        viewAll: "سب دیکھیں",
        paymentMethod: "ادائیگی کا طریقہ",
        address: "پتہ",
        items: "اشیاء",
        subTotal: "کل",
        myAddresses: "میرے پتے",
        personalInfo: "ذاتی معلومات",
        email: "ای میل",
        home: "گھر",
        office: "دفتر",
        partner: "ساتھی",
        selectADifLocation: "مختلف پتہ منتخب کریں",
        addons: "ایڈ آنز",
        softDrink: "سوفٹ ڈرنک",
        // ...add more keys as needed
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
