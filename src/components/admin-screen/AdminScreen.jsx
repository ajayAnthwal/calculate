"use client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useLayoutEffect, useState } from "react";
import BookPriceItem from "./PriceBookItem";
import AddNewBookPrice from "./AddNewBookPrice";

const AdminScreen = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useLayoutEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, []);

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
    <main
      className="relative bg-cover bg-center min-h-screen text-gray-700 py-10 flex justify-center items-center flex-col"
      style={{ backgroundImage: "url('/book-bg.jpeg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 max-w-5xl w-full px-4 flex justify-center items-center flex-col">
        <h1 className="text-4xl font-semibold text-center text-white mb-8">
          Manage Book Prices
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* Update Book Price Card */}
          <div className="bg-white shadow-2xl rounded-lg p-6 transition-shadow duration-300 hover:shadow-3xl">
            <h2 className="text-2xl font-semibold mb-4">Update Book Price</h2>
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <h1 className="text-lg">Loading...</h1>
              </div>
            ) : (
              <div className="my-4">
                {bookPrice && bookPrice.length > 0 ? (
                  bookPrice.map((item) => (
                    <BookPriceItem
                      book={item}
                      key={item._id}
                      setBookPrice={setBookPrice}
                      bookPrice={bookPrice}
                      token={token}
                    />
                  ))
                ) : (
                  <p className="text-gray-500">No books available.</p>
                )}
              </div>
            )}
          </div>

          {/* Add New Book Price Card */}
          <div className="bg-white shadow-2xl rounded-lg p-6 transition-shadow duration-300 hover:shadow-3xl">
            <h2 className="text-2xl font-semibold mb-4">Add New Book Price</h2>
            <AddNewBookPrice
              bookPrice={bookPrice || []}
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
