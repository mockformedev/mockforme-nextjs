"use client"

import { mockforme } from "mockforme";
const TOKEN = process.env.NEXT_PUBLIC_MFM_API_TOKEN;

mockforme(TOKEN).run((apis, rules) => {
  console.log("Mocked Apis", apis);
  console.log("Mocked Rules", rules);
}, (err) => {
  console.log("MockForMe Error", err);
});