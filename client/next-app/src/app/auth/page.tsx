"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import MainContainer from "../ui/MainContainer";

const Auth: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const isTokenPresent =
    typeof window !== "undefined" && localStorage.getItem("token");

  const $host = axios.create({ baseURL: "http://localhost:5000/" }); //.env
  const $authHost = axios.create({ baseURL: "http://localhost:5000/" }); //.env

  $authHost.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  const register = async (email: string, password: string) => {
    const { data } = await $host.post("api/admins/registration", {
      email,
      password,
      role: "Admin",
    });
    localStorage.setItem("token", data.token);
    return data.token;
  };

  const handleAuth = async () => {
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      const token = await register(email, password);
      if (token) {
        router.push("/admin");
      }
    } catch (err: any) {
      alert(err?.response?.data?.message || "Authentication failed.");
    }
  };

  useEffect(() => {
    if (isTokenPresent) {
      router.push("/admin");
    }
  }, [isTokenPresent, router]);

  return (
    <MainContainer>
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="card">
          <h3>Registration</h3>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              marginBottom: "15px",
            }}
            onSubmit={(e) => {
              e.preventDefault();
              handleAuth();
            }}
          >
            <input
              className="search"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              type="email"
              required
            />
            <input
              className="search"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              required
            />
            <button type="submit" className="button">
              Register
            </button>
          </form>
        </div>
      </div>
    </MainContainer>
  );
};

export default Auth;
