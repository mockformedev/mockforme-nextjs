# MockForMe Example with Next.js (CSR + SSR) - in only 4 lines of code.

This repository demonstrates how to integrate **MockForMe** with Next.js using both **Client-Side Rendering (CSR)** and **Server-Side Rendering (SSR)**.

With MockForMe, you can easily **simulate APIs without setting up a backend**, making it perfect for rapid frontend development, testing, and prototyping.

- No server setup required
- Works seamlessly with CSR + SSR
- Speeds up development & testing

This project is bootstrapped with **Next.js** and requires **Node.js v20**.

# Check the pull request for installation and configuration details of MockForMe (CSR + SSR):
[https://github.com/mockformedev/mockforme-nextjs/pull/1/files](https://github.com/mockformedev/mockforme-nextjs/pull/1/files)

## Getting Started

### Step 1. Install NextJs
```
npx create-next-app@latest mockforme-nextjs
```

### Step 2. Run Application
```npm
npm run dev
```

### Step 3. MockForMe Integration
#### Install the package with YARN or NPM
```
yarn add mockforme -D
```
```
npm i mockforme --save-dev
```

### Step 4. Create `.env` file and add `mockforme` Access Token
`NEXT_PUBLIC_MFM_API_TOKEN`=ADD_ACCESS_TOKEN_HERE
> **Note:** Don’t include the access token directly in your code. Instead, keep it in a .env file and ensure that file is ignored by Git.

### Step 5. Create a new file at [`src/app/components/mockformeClient.js`](https://github.com/mockformedev/mockforme-nextjs/blob/master/src/app/components/mockformeClient.js) to set up client-side initialization for the `mockforme` package.
> **Note:** Add `"use client";` at the very top of the file to ensure it runs in the client environment.
```
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
```

### Step 6. Set up SSR and CSR with `mockforme` by importing it at the top of [`src/app/layout.js`](https://github.com/mockformedev/mockforme-nextjs/blob/master/src/app/layout.js)
- Import the component that uses `mockforme` for client-side rendering (CSR).
- Set up and initialize `mockforme` for server-side rendering (SSR).

```
// For Server side rendering
import { mockforme as mockformeServer } from "mockforme/server";

// For Client side rendering
import { InitMockForMeClient } from "@/app/components/mockformeClient";

if (process.env.NODE_ENV === "development") {
  /**
   * Read the access token from process.env file
   */
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
```
In the same [`src/app/layout.js`](https://github.com/mockformedev/mockforme-nextjs/blob/master/src/app/layout.js) file, also include the `mockforme` client-side package.
```
...
...
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {
          /*
          * Added InitMockForMeClient for client side mockforme integration.
          */
        }
        <InitMockForMeClient />
        {children}
      </body>
    </html>
  );
}
```
That's it `mockforme` CSR + SSR integration is done, now lets test it, using simple ProductList component initially that will render server side and on clicking on Load more button it loads the more products client side.

- Create a file [`src/app/components/ProductList.js`](https://github.com/mockformedev/mockforme-nextjs/blob/master/src/app/components/ProductList.js) for `ProductList` component
  > -  The ProductList component receives initialData as props and renders the list of products on the page.
  > -  It also manages the "load more" functionality to fetch additional products.
  > -  Additionally, it integrates the AddToCart component, which makes an HTTP request to add a product to the cart.
- Create a file [`/src/app/components/AddToCart.js`](https://github.com/mockformedev/mockforme-nextjs/blob/master/src/app/components/AddToCart.js) for add to cart, it manage Add to cart functionaility.
- Create a file [`src/app/components/Button.js`](https://github.com/mockformedev/mockforme-nextjs/blob/master/src/app/components/Button.js) for Button component
- Create a new file at [`src/app/products/page.js`](https://github.com/mockformedev/mockforme-nextjs/blob/master/src/app/products/page.js) to handle server-side loading of the `ProductList` component. Add the following code:
  ```
  import { ProductList } from "@/app/components/ProductList";

  export default async function Products() {
    const res = await fetch("https://www.myexample.com/products", {
      cache: "no-store", // ensures fresh data each request (like getServerSideProps)
    });
    const data = await res.json();

    return <ProductList initialData={data} />;
  }
  ```

# Key Takeaways
## Integrate mockforme Client side and server side

### Installation
```npm
  npm install mockforme --save-dev
```
```yarn
  yarn add mockforme -D
```

### Import package Server side & initialisation
```
import { mockforme } from "mockforme/sever";

mockforme("ACCESS_TOKEN").run((mockedApis) => {
  console.log("mockedApis", mockedApis);
})
```

### Import package Client side & initialisation
```
import { mockforme } from "mockforme";

mockforme("ACCESS_TOKEN").run((mockedApis) => {
  console.log("mockedApis", mockedApis);
})
```