import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useCart } from "../globalContext/cartContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Products"));
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="p-4">Loading products...</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-6 justify-between flex items-center">
        <h2 className="text-2xl font-semibold mb-2">Products</h2>
        <button
          onClick={() => (window.location = "/addproduct")}
          className="bg-red-400 p-3 rounded-lg text-white hover:bg-red-500"
        >
          Add products
        </button>
      </div>
      <div>
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg p-4 shadow-sm bg-white"
              >
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.productName}
                    className="w-full h-48 object-cover rounded mb-3"
                  />
                )}
                <h3 className="text-lg font-semibold">{product.productName}</h3>
                <p className="text-gray-600">{product.productDescription}</p>
                <p className="text-blue-600 font-bold mt-2">
                  ${product.productPrice}
                </p>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
