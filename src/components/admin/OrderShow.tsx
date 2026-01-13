import React from "react";
import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  EmailField,
  FunctionField,
  ArrayField,
  SingleFieldList,
  ChipField, Datagrid
} from "react-admin";

const Orde$how = (props: any) => (
  <Show {...props} title="Order Details">
    <SimpleShowLayout>
      <TextField source="id" label="Order ID" />
      <TextField source="order_status" label="Status" />
      <DateField source="createdAt" label="Created" showTime />
      <TextField source="payment_method" label="Payment Method" />
      <TextField source="delivery_address" label="Delivery Address" />
      <TextField source="amount" label="Total" />
      <EmailField source="email" label="Email" />
      <FunctionField
        label="User"
        render={record =>
          record.user && typeof record.user === "object"
            ? record.user.name
            : ""
        }
      />
      <TextField source="phone_no" label="Phone" />
      <ArrayField source="product" label="Products">
        <Datagrid>
          <FunctionField
            label="Product"
            render={record =>
              record.product && typeof record.product === "object"
                ? record.product.title
                : ""
            }
          />
          <TextField source="quantity" label="Qty" />
          <FunctionField
            label="Price"
            render={record =>
              record.product && typeof record.product === "object"
                ? `$ ${record.product.price}`
                : ""
            }
          />
          <FunctionField
            label="Delivery Day"
            render={record =>
              record.product && typeof record.product === "object"
                ? record.product.deliveryDay
                : ""
            }
          />
        </Datagrid>
      </ArrayField>
      <FunctionField
        label="User Address"
        render={record =>
          record.user && typeof record.user === "object"
            ? record.user.address
            : ""
        }
      />
      <FunctionField
        label="User Phone"
        render={record =>
          record.user && typeof record.user === "object"
            ? record.user.phoneNumber
            : ""
        }
      />
    </SimpleShowLayout>
  </Show>
);

export default Orde$how;
