import React from "react";
import { List, Datagrid, TextField, EditButton, ShowButton, CreateButton, TopToolbar } from "react-admin";

const ListActions = (props: any) => (
  <TopToolbar>
    <CreateButton />
  </TopToolbar>
);

const AddonList = (props: any) => (
  <List {...props} actions={<ListActions />}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="price" />
      <TextField source="addonImage" label="Addon Image" />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
);

export default AddonList;
