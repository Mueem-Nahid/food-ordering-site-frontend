import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  DateTimeInput,
  SelectInput,
  required,
} from "react-admin";

const discountTypeChoices = [
  { id: "percent", name: "Percent" },
  { id: "flat", name: "Flat" },
];

const CouponCreate = (props: any) => (
  <Create {...props} title="Create Coupon">
    <SimpleForm>
      <TextInput source="code" label="Code" validate={required()} />
      <BooleanInput source="isActive" label="Active" defaultValue={true} />
      <SelectInput
        source="discountType"
        label="Discount Type"
        choices={discountTypeChoices}
        validate={required()}
      />
      <NumberInput source="discountValue" label="Discount Value" validate={required()} min={0} />
      <DateTimeInput source="expiresAt" label="Expires At" validate={required()} />
      <NumberInput source="usageLimit" label="Usage Limit" />
      <NumberInput source="minOrderValue" label="Min Order Value" min={0} />
    </SimpleForm>
  </Create>
);

export default CouponCreate;
