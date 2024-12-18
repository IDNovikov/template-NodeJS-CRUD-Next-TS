"use client";
import MainContainer from "../ui/MainContainer";
import React, { useState } from "react";
import axios from "axios";
import { IProduct } from "../types/types";

const $host = axios.create({ baseURL: "http://localhost:5000/" }); //.env
const $authHost = axios.create({ baseURL: "http://localhost:5000/" }); //.env

$authHost.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const updateProduct = async (product: IProduct, id: number) => {
  const { data } = await $authHost.put(`api/products/${id}`, product);
  return data;
};
const createProduct = async (product: IProduct) => {
  const { data } = await $authHost.post("api/products", product);
  return data;
};
const deleteProduct = async (id: number) => {
  const { data } = await $authHost.delete(`api/products/${id}`);
  return data;
};

const adminPage = () => {
  const [id, setId] = useState<number | null>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number | null>(null);
  const [discount, setDiscount] = useState<number | null>(null);
  const [article, setArticle] = useState<string>("");
  const [file1, setFile1] = useState<File | null>(null);
  const [refresh, setRefresh] = useState(false);

  const clearForm = () => {
    setId(null);
    setName("");
    setDescription("");
    setPrice(null);
    setDiscount(null);
    setArticle("");
    setFile1(null);
  };
  const addProduct = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (price) formData.append("price", price.toString());
    if (discount) formData.append("discount", discount.toString());
    formData.append("article", article);
    if (file1) formData.append("img1", file1);
    createProduct(formData).then((data) => clearForm());
  };

  const UpdateProduct = (id: number) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (price) formData.append("price", price.toString());
    if (discount) formData.append("discount", discount.toString());
    formData.append("article", article);
    if (file1) formData.append("img1", file1);
    updateProduct(formData, id).then((data) => clearForm());
  };

  const DeleteProduct = (id: number) => {
    deleteProduct(id).then((data) => setId(null));
  };
  const selectFile1 = (e: any) => {
    setFile1(e.target.files[0]);
  };

  return (
    <MainContainer>
      <h2>Create a product</h2>

      <hr />
      <form
        className="card"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <input
          className="search"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Write name of product"
        />
        <input
          className="search"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write description of product"
        />

        <input
          className="search"
          value={price || ""}
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="Write price of product"
          type="number"
        />
        <input
          className="search"
          value={discount || ""}
          onChange={(e) => setDiscount(Number(e.target.value))}
          placeholder="Write discount of product"
          type="number"
        />
        <input
          className="search"
          value={article}
          onChange={(e) => setArticle(e.target.value)}
          placeholder="Write article of product"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3>Add image 1</h3>
          <input onChange={selectFile1} placeholder="Add image 1" type="file" />
        </div>
        <hr />
      </form>
      <button className="button" onClick={addProduct}>
        Add
      </button>
      <p />
      <h2>Update a product</h2>
      <hr />
      <form
        className="card"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <input
          className="search"
          value={id || ""}
          onChange={(e) => setId(Number(e.target.value))}
          placeholder="Write id of product"
        />
        <input
          className="search"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Write name of product"
        />
        <input
          className="search"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write description of product"
        />

        <input
          className="search"
          value={price || ""}
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="Write price of product"
          type="number"
        />
        <input
          className="search"
          value={discount || ""}
          onChange={(e) => setDiscount(Number(e.target.value))}
          placeholder="Write discount of product"
          type="number"
        />
        <input
          className="search"
          value={article}
          onChange={(e) => setArticle(e.target.value)}
          placeholder="Write article of product"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3>Add image 1</h3>
          <input onChange={selectFile1} placeholder="Add image 1" type="file" />
        </div>
        <hr />
      </form>
      <button className="button" onClick={() => UpdateProduct(id)}>
        Update
      </button>
      <p />
      <h2>Delete a product</h2>
      <hr />
      <input
        className="search"
        value={id || ""}
        onChange={(e) => setId(Number(e.target.value))}
        placeholder="Write id of product"
      />
      <button className="button" onClick={() => DeleteProduct(id)}>
        Delete
      </button>
    </MainContainer>
  );
};

export default adminPage;
