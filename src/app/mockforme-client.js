"use client"
import { useEffect } from "react";

import { mockforme } from "mockforme";

export default function MockForMeClient() {
  useEffect(() => {
    mockforme().run();
  }, []);

  return null;
}