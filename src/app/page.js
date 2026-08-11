import { ProductList } from "@/app/components/ProductList";

export const dynamic = "force-dynamic";

export default async function Product() {
  try {
    const res = await fetch("https://www.myexample.com/products", {
      cache: "no-store",
    });

    const res1 = await fetch("https://jsonplaceholder.typicode.com/users", {
      cache: "no-store",
    });
    const data = await res.json();
    return (
      <div>
        <div className="center py-4">
          <img
            src="https://www.mockforme.com/assets/images/logo.png"
            alt="MockForMe logo"
            width={180}
            height={38}
            className="center"
          />
          <div className="tag-line">Simplest way to mock your apis.</div>
        </div>
        <ProductList initialData={data} />
      </div>
    );
  } catch (err) {
    console.log("<err>", err);
    return <ProductList initialData={[]} />;
  }
}
