"use client";
import React from "react";
import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser } from "react-admin";
import { customDataProvider } from "./customDataProvider";
import ProductCreate from "./ProductCreate";
import ProductEdit from "./ProductEdit";
import CategoryCreate from "./CategoryCreate";
import AddonCreate from "./AddonCreate";
import ProductList from "./ProductList";
import CategoryList from "./CategoryList";
import AddonList from "./AddonList";

const dataProvider = customDataProvider;

export default function ReactAdminDashboard() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="products" list={ProductList} edit={ProductEdit} show={ShowGuesser} create={ProductCreate} />
      <Resource name="categories" list={CategoryList} edit={EditGuesser} show={ShowGuesser} create={CategoryCreate} />
      <Resource name="orders" list={ListGuesser} edit={EditGuesser} show={EditGuesser} />
      <Resource name="addons" list={AddonList} edit={EditGuesser} show={ShowGuesser} create={AddonCreate} />
      <Resource name="users" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
    </Admin>
  );
}
