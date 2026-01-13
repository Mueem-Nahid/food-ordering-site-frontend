import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  FunctionField,
  ChipField,
  EmailField,
  ShowButton,
  EditButton
} from "react-admin";

const OrderList = (props: any) => (
  <List {...props} title="Orders">
    <Datagrid rowClick="show">
      <TextField source="id" label="Order ID" />
      <FunctionField
        label="User"
        render={record =>
          record.user && typeof record.user === "object"
            ? record.user.name
            : ""
        }
      />
      <EmailField source="email" label="Email" />
      <TextField source="payment_method" label="Payment Method" />
      <TextField source="delivery_address" label="Address" />
      <TextField source="order_status" label="Status" />
      <TextField source="amount" label="Total" />
      <DateField source="createdAt" label="Created" showTime />
      <FunctionField
        label="Products"
        render={record =>
          Array.isArray(record.product)
            ? record.product.map((p: any) => p.product?.title).join(", ")
            : ""
        }
      />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
);

export default OrderList;
