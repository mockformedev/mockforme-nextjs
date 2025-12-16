import { mockforme } from "mockforme/server";

const TOKEN = process.env.NEXT_PUBLIC_MFM_API_TOKEN;

mockforme(TOKEN).run((apiMappings, rules) => {
  console.log("<MockedApis>", apiMappings);
  console.log("<MockedRules>", rules);
}, (err) => {
  console.log("<mockforme error>", err);
});
