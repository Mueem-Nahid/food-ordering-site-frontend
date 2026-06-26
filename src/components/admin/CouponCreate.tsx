import React from "react";
import { Create, SimpleForm, TextInput, NumberInput, SelectInput, BooleanInput, DateTimeInput } from "react-admin";

const CouponCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="code" required />
      <SelectInput
        source="discountType"
        required
        choices={[
          { id: "percent", name: "Percent" },
          { id: "flat", name: "Flat" },
        ]}
        defaultValue="percent"
      />
      <NumberInput source="discountValue" required min={0} />
      <NumberInput source="maxDiscountAmount" min={0} />
      <DateTimeInput source="expiresAt" required />
      <NumberInput source="usageLimit" min={1} />
      <NumberInput source="minOrderValue" min={0} defaultValue={0} />
      <BooleanInput source="isActive" defaultValue={true} />
    </SimpleForm>
  </Create>
);

export default CouponCreate;
