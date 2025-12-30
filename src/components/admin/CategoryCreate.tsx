import React from "react";
import { Create, SimpleForm, TextInput } from "react-admin";

const CategoryCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" required />
      <TextInput source="categoryImage" label="Category Image URL" />
    </SimpleForm>
  </Create>
);

export default CategoryCreate;
