"use client";
import React from "react";
import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";

const dataProvider = simpleRestProvider(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000/api");

export default function ReactAdminDashboard() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="products" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
      <Resource name="categories" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
      <Resource name="orders" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
      <Resource name="addons" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
      <Resource name="users" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
    </Admin>
  );
}
