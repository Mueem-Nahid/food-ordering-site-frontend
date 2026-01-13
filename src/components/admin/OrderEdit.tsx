import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  ArrayInput,
  SimpleFormIterator
} from "react-admin";
import {orderStatusChoices} from "@/constants/constants";

const paymentStatusChoices = [
  { id: "pending", name: "Pending" },
  { id: "paid", name: "Paid" },
  { id: "failed", name: "Failed" }
];

const OrderEdit = (props: any) => (
  <Edit {...props} title="Edit Order">
    <SimpleForm>
      <TextInput source="id" label="Order ID" disabled />
      <SelectInput source="order_status" label="Order Status" choices={orderStatusChoices} />
      <SelectInput source="payment_status" label="Payment Status" choices={paymentStatusChoices} />
      <TextInput source="payment_method" label="Payment Method" />
      <TextInput source="delivery_address" label="Delivery Address" />
      <TextInput source="amount" label="Total" />
      <TextInput source="email" label="Email" />
      <TextInput source="phone_no" label="Phone" />
      <ArrayInput source="product" label="Products">
        <SimpleFormIterator disableAdd disableRemove>
          <TextInput source="product.title" label="Product" disabled />
          <TextInput source="quantity" label="Qty" disabled />
          <TextInput source="product.price" label="Price" disabled />
          <TextInput source="product.deliveryDay" label="Delivery Day" disabled />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
);

export default OrderEdit;
