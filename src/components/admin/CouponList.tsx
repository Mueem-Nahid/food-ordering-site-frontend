import React from "react";
import { List, Datagrid, TextField, BooleanField, NumberField, DateField, EditButton } from "react-admin";

const CouponList = (props: any) => (
  <List {...props} title="Coupons">
    <Datagrid>
      <TextField source="id" />
      <TextField source="code" />
      <BooleanField source="isActive" />
      <TextField source="discountType" />
      <NumberField source="discountValue" />
      <DateField source="expiresAt" />
      <NumberField source="usageLimit" />
      <NumberField source="usedCount" />
      <NumberField source="minOrderValue" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <EditButton />
    </Datagrid>
  </List>
);

export default CouponList;
