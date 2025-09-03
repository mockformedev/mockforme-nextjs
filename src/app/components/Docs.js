"use client";

import React from "react";

export default function Docs() {
  return (
    <div className="gap-[15px] flex flex-col">
      <h1 className="heading">
        MockForMe Example with Next.js (CSR + SSR) - in only 4 lines of code.
      </h1>
      {/* <p>
        <span className="highlight bg-primary">install mockforme</span>
        <span className="highlight bg-secondary ms-2">import mockforme</span>
        <span className="highlight bg-tertiary ms-2">Add Token</span>
        <span className="highlight bg-success ms-2">Done</span>
      </p> */}

      <div>
        <h3>
          Check the pull request for installation and configuration details of
          MockForMe (CSR + SSR):
        </h3>
        <a
          href="https://github.com/mockformedev/mockforme-nextjs/pull/1/files"
          target="_blank"
        >
          https://github.com/mockformedev/mockforme-nextjs/pull/1/files
        </a>
      </div>

      <p>
        With MockForMe, you can easily{" "}
        <b>simulate APIs without setting up a backend</b>, making it perfect for
        rapid frontend development, testing, and prototyping.
      </p>

      <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
        <li className="tracking-[-.01em]">No server setup required</li>
        <li className="tracking-[-.01em]">Works seamlessly with CSR + SSR</li>
        <li>Speeds up development &amp; testing</li>
      </ol>

      <p>
        This project is bootstrapped with <b>Next.js</b> and requires{" "}
        <b>Node.js v20</b>.
      </p>

      <div>
        <div className="steps">
          <h3>Run the project</h3>
          <div className="sub-steps">
            <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
              <li>Add `mockforme` Access Token in `.env` file</li>
              <li>Run command in terminal `yarn install` OR `npm install` inside the project</li>
              <li>Run the project using `yarn dev` OR `npm run dev`</li>
              <li>And visit http://localhost:3000/products</li>
            </ol>
          </div>
        </div>
      </div>

      <h2>Step-by-Step Instructions to Setup the Project</h2>
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
        </div>
      </div>

      <div className="steps">
        <h3>Step 3. MockForMe Integration</h3>
        <div className="sub-steps">
          <p>Install the package</p>
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
              <a href="https://github.com/mockformedev/mockforme-nextjs/blob/master/src/app/components/mockformeClient.js" target="_blank">src/app/components/mockformeClient.js</a>
            </code>{" "}
            and add:
          </p>
          <div className="highlight">
            <pre>
              <code>
                {`
  "use client";

  import { mockforme } from "mockforme";
  import { useEffect } from "react";

  export const InitMockForMeClient = () => {
    if (process.env.NODE_ENV === "development") {
      const TOKEN = process.env.NEXT_PUBLIC_MFM_API_TOKEN;
      if (!TOKEN) {
        console.error("MockForMe token is missing in .env file");
        return;
      }
      useEffect(() => {
        try {
          mockforme(TOKEN).run((apis) => {
            console.log(apis);
          });
        } catch (err) {
          console.log("<err>", err);
        }
      }, []);
    }
  };
`}
              </code>
            </pre>
          </div>
        </div>
      </div>

      <div className="steps">
        <h3>Step 6. Setup SSR + CSR</h3>
        <div className="sub-steps">
          <p>
            In <code className="highlight">
              <a href="https://github.com/mockformedev/mockforme-nextjs/blob/master/src/app/layout.js" target="_blank">src/app/layout.js</a>
            </code>
          </p>
          <div className="highlight">
            <pre>
              <code>{`// For SSR
import { mockforme as mockformeServer } from "mockforme/server";

// For CSR
import { InitMockForMeClient } from "@/app/components/mockformeClient";

if (process.env.NODE_ENV === "development") {
  const TOKEN = process.env.NEXT_PUBLIC_MFM_API_TOKEN;
  if (TOKEN) {
    try {
      mockformeServer(TOKEN).run((apiMappings) => {
        console.log("<mockforme apiMappings>", apiMappings);
      }, (err) => {
        console.log("<mockforme error>", err);
      });
    } catch (err) {
      console.log("Error in mockforme server initialisation", err);
    }
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <InitMockForMeClient />
        {children}
      </body>
    </html>
  );
}`}</code>
            </pre>
          </div>
        </div>
      </div>
      <div className="steps">
        <h3>Step 7. ProductList Example</h3>
        <div className="sub-steps">
          <p>
            <code className="highlight">
              <a href="https://github.com/mockformedev/mockforme-nextjs/blob/master/src/app/components/ProductList.js" target="_blank">src/app/components/ProductList.js</a>
            </code>{" "}
            Example Server side rendering ProductList component
          </p>
          <div className="highlight">
            <pre>
              <code>{`import { ProductList } from "@/app/components/ProductList";

export default async function Products() {
  const res = await fetch("https://www.myexample.com/products", {
    cache: "no-store", // like getServerSideProps
  });
  const data = await res.json();

  return <ProductList initialData={data} />;
}`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
