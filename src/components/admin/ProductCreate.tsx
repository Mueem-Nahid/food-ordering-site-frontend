import React from "react";
import { Create, SimpleForm, TextInput, NumberInput, ReferenceInput, SelectInput, ArrayInput, SimpleFormIterator, ImageInput, ImageField } from "react-admin";

const ProductCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm>
      {/* Hide id field if react-admin tries to infer it */}
      <TextInput source="id" style={{ display: 'none' }} />
      <TextInput source="name" required />
      <TextInput source="desc" required label="Description" />
      <NumberInput source="price" required />
      <ReferenceInput source="categoryId" reference="categories" required>
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ImageInput
        source="productImage"
        label="Product Image"
        accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] }}
      >
        <ImageField source="src" title="Product Image" />
      </ImageInput>
      <ArrayInput source="availability" label="Availability">
        <SimpleFormIterator>
          <TextInput source="value" />
        </SimpleFormIterator>
      </ArrayInput>
      {/* comment is an array of subdocuments, skipping for now */}
    </SimpleForm>
  </Create>
);

export default ProductCreate;
