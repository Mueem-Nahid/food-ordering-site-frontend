import React from "react";
import {List, Datagrid, TextField, NumberField, BooleanField, DateField, EditButton, ShowButton, CreateButton, TopToolbar} from "react-admin";

const ListActions = (props: any) => (
  <TopToolbar>
    <CreateButton />
  </TopToolbar>
);

const CouponList = (props: any) => (
  <List {...props} actions={<ListActions />}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="code" />
      <TextField source="discountType" />
      <NumberField source="discountValue" />
      <NumberField source="maxDiscountAmount" />
      <NumberField source="minOrderValue" />
      <NumberField source="usedCount" />
      <NumberField source="usageLimit" />
      <BooleanField source="isActive" />
      <DateField source="expiresAt" showTime />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
);

export default CouponList;
