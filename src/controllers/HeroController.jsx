// src/controllers/HeroController.js
import React from "react";
import useCoinData from "../models/useCoinData";
import HeroView from "./../components/Hero";

export function HeroController() {
  const { data, loading } = useCoinData();

  return <HeroView data={data} loading={loading} />;
}
