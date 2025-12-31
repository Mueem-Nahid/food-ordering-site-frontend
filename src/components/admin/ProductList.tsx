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
      {/*<TextField source="desc" label="Description" />*/}
      <TextField source="price" />
      <TextField source="categoryId" label="Category ID" />
      <ImageField source="productImage" label="Product Image" className="table-image"/>
      <TextField source="availability" />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
);

export default ProductList;
