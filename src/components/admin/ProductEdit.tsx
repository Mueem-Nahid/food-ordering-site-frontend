import React from "react";
import { Edit, SimpleForm, TextInput, NumberInput, ReferenceInput, SelectInput, ImageInput, ImageField, SelectArrayInput } from "react-admin";
import { daysOfWeek } from "@/constants/constants";

// Map daysOfWeek to SelectArrayInput format
const dayChoices = daysOfWeek.map(day => ({
  id: day,
  name: day
}));

const ProductEdit = (props: any) => (
  <Edit {...props}>
    <SimpleForm>
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
      <SelectArrayInput
        source="availability"
        label="Availability"
        choices={dayChoices}
        optionText="name"
        optionValue="id"
      />
    </SimpleForm>
  </Edit>
);

export default ProductEdit;
