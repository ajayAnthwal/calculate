"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import BookPriceItem from "./PriceBookItem";
import AddNewBookPrice from "./AddNewBookPrice";

const AdminScreen = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [bookPrice, setBookPrice] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getBookPrice() {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/price/getPrice");
      setBookPrice(res?.data[0]?.bookPrice);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getBookPrice();
  }, []);

  return (
    <main className="bg-white min-h-screen text-gray-700">
      <div className="max-w-[1000px] mx-auto px-2">
        <h1 className="text-3xl py-2">Update the book price</h1>
        {isLoading ? (
          <div>
            <h1 className="text-lg">Loading...</h1>
          </div>
        ) : (
          <div className="my-10">
            <div className="">
              {bookPrice &&
                bookPrice.length > 0 &&
                bookPrice.map((item) => (
                  <BookPriceItem
                    book={item}
                    key={item._id}
                    setBookPrice={setBookPrice}
                    bookPrice={bookPrice}
                    token={token}
                  />
                ))}
            </div>
          </div>
        )}

        <div className="mt-20">
          <h1 className="text-3xl text-gray-600">Add new book price</h1>

          <div>
            <AddNewBookPrice
              bookPrice={bookPrice}
              setBookPrice={setBookPrice}
              token={token}
              getBookPrice={getBookPrice}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminScreen;
