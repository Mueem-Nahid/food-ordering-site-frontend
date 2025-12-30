import React from "react";
import { Create, SimpleForm, TextInput } from "react-admin";

const CategoryCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm>
      {/* Hide id field if react-admin tries to infer it */}
      <TextInput source="id" style={{ display: 'none' }} />
      <TextInput source="name" required />
      <TextInput source="categoryImage" label="Category Image URL" />
    </SimpleForm>
  </Create>
);

export default CategoryCreate;
