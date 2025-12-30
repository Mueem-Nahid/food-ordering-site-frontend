import React from "react";
import { Create, SimpleForm, TextInput, ImageInput, ImageField } from "react-admin";

const CategoryCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm>
      {/* Hide id field if react-admin tries to infer it */}
      <TextInput source="id" style={{ display: 'none' }} />
      <TextInput source="name" required />
      <ImageInput
        source="categoryImage"
        label="Category Image"
        accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] }}
      >
        <ImageField source="src" title="Category Image" />
      </ImageInput>
    </SimpleForm>
  </Create>
);

export default CategoryCreate;
