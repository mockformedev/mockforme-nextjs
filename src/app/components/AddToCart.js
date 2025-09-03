import { useState } from "react";
import { Button } from "./Button";

export const AddToCart = ({ product, quantity }) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  if (!product) {
    throw new Error("Product is required");
  }

  const addItem = async (productId, quantity) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/cart", {
        method: "POST",
        body: JSON.stringify({
          productId,
          quantity,
        }),
      });

      const data = await res.json();

      if (data?.success) {
        setSuccess(data?.message);
      } else {
        setError(data?.message);
      }

      
    } catch (err) {
      setError("Unable to add item to cart");
    } finally {
      setLoading(false);
    }
  }


  return (
    <div>
      <div className={`message ${success && "success"} ${error && "error"}`}>{success || error}</div>
      <Button
        onClick={() => {
          const productId = product?.id;
          if (productId) {
            addItem(productId, quantity);
          }
        }}
        disabled={loading}
      >
        {loading ? "Adding to cart..." : "Add to Cart"}
      </Button>
    </div>
  );
}