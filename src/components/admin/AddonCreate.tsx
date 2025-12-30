import React from "react";
import { Create, SimpleForm, TextInput, NumberInput } from "react-admin";

const AddonCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm>
      {/* Hide id field if react-admin tries to infer it */}
      <TextInput source="id" style={{ display: 'none' }} />
      <TextInput source="name" required />
      <NumberInput source="price" required />
      <TextInput source="addonImage" label="Addon Image URL" />
    </SimpleForm>
  </Create>
);

export default AddonCreate;
