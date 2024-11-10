"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Calculator = () => {
  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    async function getCall() {
      const res = await axios.get("/api/price/getPrice");
      if (res.data[0].bookPrice) {
        setBooksData(res?.data[0]?.bookPrice);
      }
    }
    getCall();
  }, []);
  return (
    <div className=" bg-gray-50 ">
      <div className="flex flex-col items-center justify-center bg-gray-50 p-6">
        <button className="border border-gray-300 rounded py-1 px-4 text-gray-600 text-sm mb-4">
          Custom Royalty Calculator
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-[#F8303D] text-center mb-4">
          Earn 100% Royalties on Your Book Sales
        </h1>
        <p className="text-center text-gray-600 max-w-lg mb-6">
          We make publishing easy by guiding you every step of the way.
          Understand the costs and pricing for your book, with full
          transparency. Publish your book and earn 100% royalty on every sale.
        </p>
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 text-center mb-2">
          Calculate Your Paperback Profits
        </h2>
        <p className="text-center text-gray-500">
          (For Black & White Interiors Only)
        </p>
      </div>

      <div className="container m-auto  bg-gray-50 pb-8 ">
        <div className="flex flex-col md:flex-row justify-center items-start gap-12 ">
          {/* Calculator 1 */}
          <div className="bg-white shadow-lg rounded-xl w-[460px]">
            <div className="bg-[#FDEFE0] p-4">
              <h2 className="text-[1.5rem] font-semibold text-[#ED6926] mb-2 text-center leading-[1.5]">
                1. Production Cost
              </h2>
              <p className="text-gray-600 text-center text-xs">
                Use the tool below to estimate the production cost of your book
                with a Black & White interior.
              </p>
            </div>
            <form className="space-y-4 p-4">
              <div className="flex items-center">
                <label className="text-[#555] w-[200px] text-sm font-medium">
                  Book Size:
                </label>
                <select className="w-[245px] border border-gray-300  p-2 mt-1 h-9 rounded-[7px] text-xs text-gray-500">
                  {booksData &&
                    booksData.map((item) => (
                      <option
                        key={item._id}
                        value={item.bookType}
                        className="text-xs"
                      >
                        {item.bookType}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex items-center">
                <label className="text-[#555] w-[200px] text-sm font-medium">
                  Number of Pages:
                </label>
                <input
                  type="text"
                  placeholder="Enter Total Pages"
                  className="w-[245px] border border-gray-300 h-9 rounded-[7px] p-2 mt-1 text-xs text-gray-500"
                />
              </div>
              <div className="flex items-center">
                <label className="text-[#555] w-[200px] text-sm font-medium">
                  Book Format:
                </label>
                <select className="w-[245px] border border-gray-300 h-9 rounded-[7px] p-2 mt-1 text-xs text-gray-500">
                  <option className="text-xs">Paperback</option>
                </select>
              </div>
              <div className="m-auto w-[141px] pt-9">
                <button
                  type="button"
                  className="w-full bg-[#F8303D] text-white font-semibold py-2 rounded-lg hover:bg-[#d52932] transition"
                >
                  Calculate
                </button>
              </div>
            </form>
            <div className="mt-6 p-4 bg-gray-100  shadow-inner">
              <p className="text-gray-700 text-sm">Production Cost:</p>
              <p className="text-gray-700 mt-5 text-sm">
                Minimum Selling Price (MSP):
              </p>
            </div>
          </div>

          {/* Calculator 2 */}
          <div className="bg-white shadow-lg rounded-xl w-[460px]">
            <div className="bg-[#FDEFE0] p-4">
              <h2 className="text-[1.5rem] font-semibold text-[#ED6926] mb-2 text-center leading-[1.5]">
                2. Paperback Earnings
              </h2>
              <p className="text-gray-600 text-center text-xs">
                Use the tool below to estimate the paperback royalty of your
                book with a Black & White interior.
              </p>
            </div>
            <form className="space-y-4 p-4">
              <div className="flex items-center">
                <label className="text-[#555] w-[200px] text-sm font-medium">
                  Quote MRP:
                </label>
                <div className="flex items-center w-[245px] border border-gray-300 h-9 rounded-[7px] p-2 mt-1">
                  <span className="text-gray-500 text-xs">₹</span>
                  <input
                    type="text"
                    placeholder="Set Selling Price"
                    className="w-full text-xs text-gray-500 border-none focus:outline-none"
                  />
                </div>
              </div>
              <p className="text-justify text-gray-600 text-xs p-3">
                Note: Cost is calcuated for black and white book on white pages.
                Price may increase for cream pages. Standard 5×8in size books
                are best suited for non-academic and fiction genre. Contact us
                for colour printing or size variants.
              </p>

              <div className="m-auto w-[141px] pt-9">
                <button
                  type="button"
                  className="w-full bg-[#F8303D] text-white font-semibold py-2 rounded-lg hover:bg-[#d52932] transition"
                >
                  Calculate
                </button>
              </div>
            </form>
            <div className="mt-6 p-4 bg-gray-100 shadow-inner">
              <p className="text-gray-700 text-sm">
                Other Distribution Channels:
              </p>
              <p className="text-gray-700 mt-5 text-sm">OrangeBooks Store:</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-start gap-12 mt-12 ">
          {/* Suggested Price Card */}
          <div className="bg-white shadow-lg rounded-xl w-[460px]">
            <div className="bg-[#FDEFE0] p-4">
              <h2 className="text-[1.5rem] font-semibold text-[#ED6926] mb-2 text-center leading-[1.5]">
                3. Suggested Price
              </h2>
              <p className="text-gray-600 text-center text-xs">
                Use the tool below to get the most suitable price by
                orangebooks.
              </p>
            </div>
            <form className="space-y-4 p-4">
              <div className="flex items-center">
                <label className="text-[#555] w-[200px] text-sm font-medium">
                  Book Size:
                </label>
                <select className="w-[245px] border border-gray-300 p-2 mt-1 h-9 rounded-[7px] text-xs text-gray-500">
                  <option className="text-xs">Select Book Size</option>
                </select>
              </div>
              <div className="flex items-center">
                <label className="text-[#555] w-[200px] text-sm font-medium">
                  Number of Pages:
                </label>
                <input
                  type="text"
                  placeholder="Enter Total Pages"
                  className="w-[245px] border border-gray-300 h-9 rounded-[7px] p-2 mt-1 text-xs text-gray-500"
                />
              </div>
              <div className="m-auto w-[141px] pt-6">
                <button
                  type="button"
                  className="w-full bg-[#F8303D] text-white font-semibold py-2 rounded-lg hover:bg-[#d52932] transition"
                >
                  Calculate
                </button>
              </div>
            </form>
            <div className="mt-6 p-4 bg-gray-100 shadow-inner">
              <p className="text-gray-700 text-sm">Minimum Paperback MRP:</p>
              <p className="text-gray-700 mt-5 text-sm">Suggested Ebook MRP:</p>
            </div>
            <p className="text-gray-600 text-center text-xs px-4 pt-4">
              Suggested Price is exclusive of taxes and handling charges. It is
              subject to change as per the current market conditions.
            </p>
          </div>

          {/* Ebook Earnings Card */}
          <div className="bg-white shadow-lg rounded-xl w-[460px]">
            <div className="bg-[#FDEFE0] p-4">
              <h2 className="text-[1.5rem] font-semibold text-[#ED6926] mb-2 text-center leading-[1.5]">
                4. Ebook Earnings
              </h2>
              <p className="text-gray-600 text-center text-xs">
                Use the tool below to estimate the ebook royalty of your book.
              </p>
            </div>
            <form className="space-y-4 p-4">
              <div className="flex items-center">
                <label className="text-[#555] w-[200px] text-sm font-medium">
                  Quote Ebook MRP:
                </label>
                <div className="flex items-center w-[245px] border border-gray-300 h-9 rounded-[7px] p-2 mt-1">
                  <span className="text-gray-500 text-xs">₹</span>
                  <input
                    type="text"
                    placeholder="Set Ebook Selling Price"
                    className="w-full text-xs text-gray-500 border-none focus:outline-none"
                  />
                </div>
              </div>
              <p className="text-justify text-gray-600 text-xs p-3">
                Note: Please ensure that the selling price for your ebook should
                be less than the price of paperback book. Ebook price cannot be
                less than Rs.49.
              </p>
              <div className="m-auto w-[141px] pt-6">
                <button
                  type="button"
                  className="w-full bg-[#F8303D] text-white font-semibold py-2 rounded-lg hover:bg-[#d52932] transition"
                >
                  Calculate
                </button>
              </div>
            </form>
            <div className="mt-6 p-4 bg-gray-100 shadow-inner">
              <p className="text-gray-700 text-sm">Amazon Kindle:</p>
              <p className="text-gray-700 mt-5 text-sm">Google Playstore:</p>
            </div>
            <p className="text-gray-600 text-center text-xs px-4 pt-4">
              Author Earnings shown above are exclusive of taxes. It is subject
              to change as per the respective marketplace.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
