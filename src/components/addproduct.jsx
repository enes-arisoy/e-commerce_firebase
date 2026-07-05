import React, { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDescription, setProductDescription] = useState("");
  const [image, setImage] = useState(null);

  const imageTypes = ["image/png", "image/jpeg", "image/jpg"];

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage && imageTypes.includes(selectedImage.type)) {
      setImage(selectedImage);
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    let imageUrl = "";

    if (image) {
      const imageRef = ref(storage, `product-images/${Date.now()}_${image.name}`);
      await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(imageRef);
    }

    await addDoc(collection(db, "Products"), {
      productName,
      productPrice: Number(productPrice),
      productDescription,
      image: imageUrl,
      createdAt: serverTimestamp(),
    });

    setProductName("");
    setProductPrice(0);
    setProductDescription("");
    setImage(null);
  } catch (error) {
    console.log("Error:", error.message);
  }
};

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center bg-gray-100  p-8 w-3/4 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Add Product</h1>

        <form
          className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="name"
            >
              Product Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter product name"
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              type="number"
              placeholder="Enter price"
              onChange={(e) => setProductPrice(e.target.value)}
              value={productPrice}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              placeholder="Enter product description"
              onChange={(e) => setProductDescription(e.target.value)}
              value={productDescription}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="image"
            >
              Image
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="image"
              type="file"
              placeholder="Enter image URL"
              onChange={handleImageChange}
              
            />
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
