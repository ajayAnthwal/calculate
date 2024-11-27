"use client";
import axios from "axios";
import React, { useRef, useState } from "react";
import { Pencil, Trash } from "../icons/Icons";

const BookPriceItem = ({ book, setBookPrice, bookPrice, token }) => {
  const inputRef = useRef(null);
  const [name, setName] = useState(book?.bookType);
  const [price, setPrice] = useState(book?.price);
  const [msp, setMsp] = useState(book?.msp);
  const [suggestedFactorValue, setsuggestedFactorValue] = useState(
    book?.suggestedFactorValue
  );
  const [isDissabled, setIsDissabled] = useState(true);

  const saveData = () => {
    if (!name || !price || !msp || !suggestedFactorValue) return;
    const isValidPrice = /^\d+(\.\d{1,2})?$/.test(price);
    const isValidMsp = /^\d+(\.\d{1,2})?$/.test(msp);
    const isValidSuggestedFactorValue = /^\d+(\.\d{1,2})?$/.test(
      suggestedFactorValue
    );
    if (!isValidPrice || !isValidMsp || !isValidSuggestedFactorValue) {
      alert("Please enter only numbers in price field!");
      return;
    }

    let newBookPriceData = bookPrice.map((item) => {
      if (item._id == book._id) {
        let newItem = {
          _id: item._id,
          bookType: name,
          price: price,
          msp,
          suggestedFactorValue,
        };
        return newItem;
      } else {
        return item;
      }
    });

    setBookPrice(newBookPriceData);
    setIsDissabled(true);

    // update book price in DB
    const payload = { bookPrice: newBookPriceData };
    updateBookService(payload);
  };

  const updateBookService = async (params) => {
    try {
      const res = await axios.post("/api/price/updatePrice", params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {}
  };

  const deletebookService = (id) => {
    const isConfirmed = confirm("Are you sure you want to delete this row?");
    if (isConfirmed) {
      let newBookPriceData = bookPrice.filter((item) => item._id != id);
      // update book price in DB
      const payload = { bookPrice: newBookPriceData };
      updateBookService(payload);
      setBookPrice(newBookPriceData);
    }
  };

  return (
    <div>
      <div className="flex">
        <input
          ref={inputRef}
          disabled={isDissabled}
          className={`p-4 border w-[120px]`}
          placeholder={name}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          disabled={isDissabled}
          className="p-2 border w-[60px]"
          placeholder={price}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          disabled={isDissabled}
          className="p-2 border w-[60px]"
          placeholder={msp}
          value={msp}
          onChange={(e) => setMsp(e.target.value)}
        />
        <input
          disabled={isDissabled}
          className="p-2 border w-[60px]"
          placeholder={suggestedFactorValue}
          value={suggestedFactorValue}
          onChange={(e) => setsuggestedFactorValue(e.target.value)}
        />
        {isDissabled && (
          <div className="">
            <button
              onClick={(e) => {
                setIsDissabled(false);
                setTimeout(() => {
                  inputRef.current.focus();
                }, 10);
              }}
              className="p-3  hover:text-yellow-500"
            >
              <Pencil />
            </button>
            <button
              onClick={(e) => deletebookService(book._id)}
              className="p-3  hover:text-rose-500"
            >
              <Trash />
            </button>
          </div>
        )}
      </div>
      {!isDissabled && (
        <div className="mt-2 mb-4">
          <button
            onClick={(e) => setIsDissabled(true)}
            className="bg-gray-200 hover:bg-gray-300 mx-1 px-8 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={(e) => saveData()}
            className="bg-blue-500 hover:bg-blue-600 mx-1 px-8 py-2 rounded-md text-white"
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default BookPriceItem;
