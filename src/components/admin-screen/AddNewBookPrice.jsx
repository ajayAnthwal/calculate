"use client";
import axios from "axios";
import React, { useState } from "react";

const AddNewBookPrice = ({ bookPrice, token, getBookPrice }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [msp, setMsp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const addNewBookService = async () => {
    if (!name || !price || !msp) return;
    const isValidPrice = /^\d+(\.\d{1,2})?$/.test(price);
    const isValidMsp = /^\d+(\.\d{1,2})?$/.test(msp);
    if (!isValidPrice || !isValidMsp) {
      alert("Please enter only numbers in price field!");
      return;
    }

    try {
      setIsLoading(true);
      const payload = { bookPrice: [...bookPrice, { bookType: name, price, msp }] };
      const res = await axios.post("/api/price/updatePrice", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoading(false);
      setName("");
      setPrice("");
      setMsp("");
      if (res.status == 200) {
        getBookPrice();
      }
    } catch (error) {
      setIsLoading(false);
      setName("");
      setPrice("");
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto">
      <div className="my-4">
        <input
          className="p-3 border border-gray-300 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter book type"
        />
        <input
          className="p-3 border border-gray-300 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter Production cost"
        />
        <input
          className="p-3 border border-gray-300 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          value={msp}
          onChange={(e) => setMsp(e.target.value)}
          placeholder="Enter Minimum selling price"
        />
      </div>
      <div className="text-center">
        <button
          disabled={isLoading}
          onClick={(e) => addNewBookService()}
          className={`bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-lg text-white font-semibold transition duration-300 ${
            isLoading && "opacity-50 cursor-not-allowed"
          }`}
        >
          {isLoading ? "Loading..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default AddNewBookPrice;
