import React from "react";
import { Edit, SimpleForm, TextInput, NumberInput, SelectInput, BooleanInput, DateTimeInput } from "react-admin";

const CouponEdit = (props: any) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="code" />
      <SelectInput
        source="discountType"
        choices={[
          { id: "percent", name: "Percent" },
          { id: "flat", name: "Flat" },
        ]}
      />
      <NumberInput source="discountValue" min={0} />
      <NumberInput source="maxDiscountAmount" min={0} />
      <DateTimeInput source="expiresAt" />
      <NumberInput source="usageLimit" min={1} />
      <NumberInput source="minOrderValue" min={0} />
      <NumberInput source="usedCount" disabled />
      <BooleanInput source="isActive" />
    </SimpleForm>
  </Edit>
);

export default CouponEdit;
