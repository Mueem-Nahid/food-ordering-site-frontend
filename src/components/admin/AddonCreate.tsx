import React from "react";
import { Create, SimpleForm, TextInput, NumberInput } from "react-admin";

const AddonCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" required />
      <NumberInput source="price" required />
      <TextInput source="addonImage" label="Addon Image URL" />
    </SimpleForm>
  </Create>
);

export default AddonCreate;
