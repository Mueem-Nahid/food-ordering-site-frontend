import React from "react";
import { Create, SimpleForm, TextInput } from "react-admin";

const GenericCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm>
      {/* Add common fields here, or customize per resource as needed */}
      <TextInput source="name" />
      <TextInput source="description" />
      <TextInput source="price" />
      <TextInput source="category" />
      {/* Add more fields as needed */}
    </SimpleForm>
  </Create>
);

export default GenericCreate;
