'use client';
import axios from 'axios';
import React, { useState } from 'react'

const AddNewBookPrice = ({ bookPrice, token, getBookPrice }) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [isLoading, setIsLoading] = useState(false);
  
    const addNewBookService = async () => {
      if (!name || !price) return;
      const isValidPrice = /^\d+(\.\d{1,2})?$/.test(price);
      if (!isValidPrice) {
        alert("Please enter only numbers in price field!");
        return;
      }
  
      try {
        setIsLoading(true);
        const payload = { bookPrice: [...bookPrice, { bookType: name, price }] };
        const res = await axios.post("/api/price/updatePrice", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsLoading(false);
        setName("");
        setPrice("");
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
      <div>
        <div className="my-3">
          <input
            className="p-2 border w-[350px] rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter book type"
          />
          <br />
          <input
            className="p-2 border w-[350px] my-2 rounded-md"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
          />
        </div>
        <div>
          <button
            disabled={isLoading}
            onClick={(e) => addNewBookService()}
            className="bg-blue-500 hover:bg-blue-600 mx-1 px-8 py-2 rounded-md text-white"
          >
            {isLoading ? "Loading..." : "Save"}
          </button>
        </div>
      </div>
    );
  };

export default AddNewBookPrice