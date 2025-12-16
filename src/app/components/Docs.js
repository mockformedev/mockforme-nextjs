"use client";

import React from "react";

export default function Docs() {
  return (
    <div className="gap-[15px] flex flex-col">
      <h1 className="heading">
        MockForMe + Next.js (CSR + SSR) Integration
      </h1>
      <a
        href="https://github.com/mockformedev/mockforme-nextjs/pull/1/files"
        target="_blank"
      >
        Checkout code from github
      </a>
      {/* <p>
        <span className="highlight bg-primary">install mockforme</span>
        <span className="highlight bg-secondary ms-2">import mockforme</span>
        <span className="highlight bg-tertiary ms-2">Add Token</span>
        <span className="highlight bg-success ms-2">Done</span>
      </p> */}

      <div className="steps">
        <h3>Step 1. Install NextJs</h3>
        <div className="sub-steps">
          <pre>
            <code>npx create-next-app@latest mockforme-nextjs</code>
          </pre>
        </div>
      </div>

      <div className="steps">
        <h3>Step 2. Run Application</h3>
        <div className="sub-steps">
          <pre>
            <code>npm run dev</code>
          </pre>
          <br />
          Access page: <a href="http://localhost:3000">http://localhost:3000</a>
        </div>
      </div>

      <div className="steps">
        <h3>Step 3. Install `mockforme` NPM package</h3>
        <div className="sub-steps">
          <div className="mt-5">
            With <code className="highlight">Yarn</code>
            <div className="highlight mb-3">yarn add mockforme -D</div>
          </div>
          <div className="mt-5">
            Or With <code className="highlight">NPM</code>
          </div>
          <div className="highlight">npm i mockforme --save-dev</div>
        </div>
      </div>
      <div className="steps">
        <h3>
          Step 4. Create <code className="inline-highlight">.env</code> file and
          add <code className="inline-highlight">mockforme</code> Access Token
        </h3>
        <div className="sub-steps">
          <div className="highlight">
            <strong>NEXT_PUBLIC_MFM_API_TOKEN</strong>
            =MOCKFORME_ACCESS_TOKEN_HERE
          </div>
          <p className="bg-yellow-100 p-2 rounded-md shadow-md mt-2">
            <b>Note:</b> Don’t include the access token directly in your code.
            Instead, keep it in a <code>.env</code> file and ensure that file is
            ignored by Git.
          </p>
        </div>
      </div>
      <div className="steps">
        <h3>Step 5. Client Setup</h3>
        <div className="sub-steps">
          <p>
            Create{" "}
            <code className="highlight">
              <a href="https://github.com/mockformedev/mockforme-nextjs/blob/master/src/app/mockforme-client.js" target="_blank">src/app/mockforme-client.js</a>
            </code>{" "}
            and add:
          </p>
          <div className="highlight">
            <pre>
              <strong>
                <code>
                  {`
"use client"

import { mockforme } from "mockforme";
`}
                </code>
              </strong>
              <code>
                {`
const TOKEN = process.env.NEXT_PUBLIC_MFM_API_TOKEN;

mockforme(TOKEN).run((apis, rules) => {
  console.log("Mocked Apis", apis);
  console.log("Mocked Rules", rules);
}, (err) => {
  console.log("MockForMe Error", err);
});
`}
              </code>
            </pre>
          </div>
        </div>
      </div>

      <div className="steps">
        <h3>Step 6. SSR Setup</h3>
        <div className="sub-steps">
          <p>
            Create{" "}
            <code className="highlight">
              <a href="https://github.com/mockformedev/mockforme-nextjs/blob/master/src/app/mockforme-server.js" target="_blank">src/app/mockforme-server.js</a>
            </code>{" "}
            and add:
          </p>
          <div className="highlight">
            <pre>
              <strong>
                <code>
                  {`
import { mockforme } from "mockforme/server";
`}
                </code>
              </strong>
              <code>
                {`
const TOKEN = process.env.NEXT_PUBLIC_MFM_API_TOKEN;

mockforme(TOKEN).run((apiMappings, rules) => {
  console.log("<MockedApis>", apiMappings);
  console.log("<MockedRules>", rules);
}, (err) => {
  console.log("<mockforme error>", err);
});
`}
              </code>
            </pre>
          </div>
        </div>
      </div>

      <div className="steps">
        <h3>Step 7. Import `mockforme-client` and `mockforme-server` in layout.js</h3>
        <div className="sub-steps">
          <p>
            In <code className="highlight">
              <a href="https://github.com/mockformedev/mockforme-nextjs/blob/master/src/app/layout.js" target="_blank">src/app/layout.js</a>
            </code>
          </p>
          <div className="highlight">
            <pre>
              <strong>
                <code>{`
import "./mockforme-client";
import "./mockforme-server";
                `}</code>
              </strong>
              <code>{`
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

              `}</code>
            </pre>
          </div>
        </div>
      </div>
      <div className="steps">
        <h3>Step 8. Inside src/app/page.js get product data and pass to ProductList component</h3>
        <div className="sub-steps">
          <p>
            <code className="highlight">
              <a href="https://github.com/mockformedev/mockforme-nextjs/blob/master/src/app/page.js" target="_blank">src/app/page.js</a>
            </code>{" "}
            Example Server side rendering ProductList component
          </p>
          <div className="highlight">
            <pre>
              <code>{`
import { ProductList } from "@/app/components/ProductList";

export default async function Product() {
  try {
    const res = await fetch("https://www.myexample.com/products", {
      cache: "no-store",
    });
    const data = await res.json();
    return (
      <div>
        <ProductList initialData={data} />
      </div>
    );
  } catch (err) {
    console.log("<err>", err);
    return <ProductList initialData={[]} />;
  }
}
              `}</code>
            </pre>
          </div>
        </div>
      </div>

      <div>
        <div className="steps">
          <h3>Run the project</h3>
          <div className="sub-steps">
            <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
              <li>Add `mockforme` Access Token in `.env` file</li>
              <li>Run command in terminal `yarn install` OR `npm install` inside the project</li>
              <li>Run the project using `yarn dev` OR `npm run dev`</li>
              <li>And visit http://localhost:3000</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="steps">
        <h3>Key takeaways</h3>
        <div className="sub-steps">
          <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
            <li className="tracking-[-.01em]">No server setup required</li>
            <li className="tracking-[-.01em]">Works seamlessly with CSR + SSR</li>
            <li>Speeds up development &amp; testing</li>
          </ol>

          <br />
          <hr />
          <p>
            This project is bootstrapped with <b>Next.js</b> and requires{" "}
            <b>NodeJs v20</b>.
          </p>
        </div>
      </div>
    </div>
  );
}
