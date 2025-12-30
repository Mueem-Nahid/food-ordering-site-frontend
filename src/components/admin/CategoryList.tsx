import React from "react";
import { List, Datagrid, TextField, EditButton, ShowButton, CreateButton, TopToolbar } from "react-admin";

const ListActions = (props: any) => (
  <TopToolbar>
    <CreateButton />
  </TopToolbar>
);

const CategoryList = (props: any) => (
  <List {...props} actions={<ListActions />}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="categoryImage" label="Category Image" />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
);

export default CategoryList;
