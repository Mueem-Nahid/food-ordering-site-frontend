import React from "react";
import { Create, SimpleForm, TextInput, NumberInput, ReferenceInput, SelectInput, ArrayInput, SimpleFormIterator } from "react-admin";

const ProductCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" required />
      <TextInput source="desc" required label="Description" />
      <NumberInput source="price" required />
      <ReferenceInput source="categoryId" reference="categories" required>
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="productImage" required label="Product Image URL" />
      <ArrayInput source="availability" label="Availability">
        <SimpleFormIterator>
          <TextInput />
        </SimpleFormIterator>
      </ArrayInput>
      {/* comment is an array of subdocuments, skipping for now */}
    </SimpleForm>
  </Create>
);

export default ProductCreate;
