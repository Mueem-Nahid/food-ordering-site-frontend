export const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

export const deliveryLocations = [
  { label: "Wiley Park, NSW – 2195", value: "Wiley Park, NSW – 2195", fee: 6 },
  { label: "Greenacre, NSW – 2190", value: "Greenacre, NSW – 2190", fee: 8 },
  { label: "Roselands, NSW – 2196", value: "Roselands, NSW – 2196", fee: 8 },
  { label: "Belmore, NSW – 2192", value: "Belmore, NSW – 2192", fee: 8 },
  { label: "Punchbowl, NSW – 2196", value: "Punchbowl, NSW – 2196", fee: 4 },
  { label: "Bankstown, NSW – 2200", value: "Bankstown, NSW – 2200", fee: 6 },
  { label: "Lakemba, NSW – 2195", value: "Lakemba, NSW – 2195", fee: 6 },
];

export const pickupAddresses = [
  "Lakemba, Sydney, Australia",
  "Punchbowl, Sydney, Australia"
];

export const methods = [
  {
    value: "COD",
    disabled: false,
  },
  {
    value: "Credit/Debit Card",
    disabled: true,
  },
];

export const orderStatusChoices = [
  { id: "PENDING", name: "Pending" },
  { id: "CONFIRMED", name: "Confirmed" },
  { id: "PREPARING", name: "Preparing" },
  { id: "WAITING_FOR_DELIVERY", name: "Waiting for Delivery" }
];