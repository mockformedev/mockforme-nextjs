import { ProductList } from "@/app/components/ProductList";

export default async function Products() {
  try {
    const res = await fetch("https://www.myexample.com/products", {
      cache: "no-store", // ensures fresh data each request (like getServerSideProps)
    });
    const data = await res.json();
    return <ProductList initialData={data} />;
  } catch (err) {
    console.log("<err>", err);
    return <ProductList initialData={[]} />;
  }

  
}
