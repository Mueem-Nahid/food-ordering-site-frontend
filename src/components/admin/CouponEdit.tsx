import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  DateTimeInput,
  SelectInput,
  required,
  useRecordContext,
} from "react-admin";

const discountTypeChoices = [
  { id: "percent", name: "Percent" },
  { id: "flat", name: "Flat" },
];

const CouponEdit = (props: any) => (
  <Edit {...props} title="Edit Coupon">
    <SimpleForm>
      <TextInput source="id" label="ID" disabled />
      <TextInput source="code" label="Code" disabled />
      <BooleanInput source="isActive" label="Active" />
      <SelectInput
        source="discountType"
        label="Discount Type"
        choices={discountTypeChoices}
        validate={required()}
      />
      <NumberInput source="discountValue" label="Discount Value" validate={required()} min={0} />
      <DateTimeInput source="expiresAt" label="Expires At" validate={required()} />
      <NumberInput source="usageLimit" label="Usage Limit" />
      <NumberInput source="usedCount" label="Used Count" disabled />
      <NumberInput source="minOrderValue" label="Min Order Value" min={0} />
    </SimpleForm>
  </Edit>
);

export default CouponEdit;
