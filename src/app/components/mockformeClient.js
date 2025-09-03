"use client";

import { mockforme } from "mockforme";
import { useEffect } from "react";


export const InitMockForMeClient = () => {
  if (process.env.NODE_ENV === "development") {
    /**
     * Read the access token from process.env file
     */
    const TOKEN = process.env.NEXT_PUBLIC_MFM_API_TOKEN;

    if (!TOKEN) {
      console.error("MockForMe token is missing in .env file");
      return;
    }
    useEffect(() => {
      try {
        mockforme(TOKEN).run((apis => {
          console.log(apis);
        }));
      } catch (err) {
        console.log("<err>", err);
      }
    }, [])
  }
}