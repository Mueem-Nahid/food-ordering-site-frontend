import React from "react";
import { Create, SimpleForm, TextInput, NumberInput, ImageInput, ImageField } from "react-admin";

const AddonCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm>
      {/* Hide id field if react-admin tries to infer it */}
      <TextInput source="id" style={{ display: 'none' }} />
      <TextInput source="name" required />
      <NumberInput source="price" required />
      <ImageInput
        source="addonImage"
        label="Addon Image"
        accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] }}
      >
        <ImageField source="src" title="Addon Image" />
      </ImageInput>
    </SimpleForm>
  </Create>
);

export default AddonCreate;
