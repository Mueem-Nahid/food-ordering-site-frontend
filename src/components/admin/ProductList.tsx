import React from "react";
import { List, Datagrid, TextField, EditButton, ShowButton, CreateButton, TopToolbar, ImageField } from "react-admin";

const ListActions = (props: any) => (
  <TopToolbar>
    <CreateButton />
  </TopToolbar>
);

const ProductList = (props: any) => (
  <List {...props} actions={<ListActions />}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="desc" label="Description" />
      <TextField source="price" />
      <TextField source="categoryId" label="Category ID" />
      {/* TEMP DEBUG: Log categoryId value */}
      {/* eslint-disable-next-line no-console */}
      {props && props.record && console.log("ProductList categoryId:", props.record.categoryId)}
      <ImageField source="productImage" label="Product Image" className="table-image"/>
      <TextField source="availability" />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
);

export default ProductList;
