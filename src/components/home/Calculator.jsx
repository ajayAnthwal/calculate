"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Calculator = () => {
  // input states
  const [noOfPages, setNoOfPages] = useState("");
  const [noOfPages2, setNoOfPages2] = useState("");
  const [mrp, setMrp] = useState("");
  const [mrp2, setMrp2] = useState("");
  const [selectedBookType, setSelectedBookType] = useState("");
  const [selectedBookType2, setSelectedBookType2] = useState("");

  const [booksData, setBooksData] = useState([]);
  // result states
  const [card1, setCard1] = useState({ pc: "", msp: "" });
  const [card2, setCard2] = useState({ odc: "", vbdStore: "" });
  const [card3, setCard3] = useState({ paperbackMrp: "", suggestedMrp: "" });
  const [card4, setCard4] = useState({ kindle: "", gPlaystore: "" });

  // error states
  const [error, setError] = useState({
    card1Error: "",
    card2Error: "",
    card3Error: "",
    card4Error: "",
  });

  const handleOnChange = (e) => {
    const inputValue = e.target.value;
    const name = e.target.name;
    const numberRegex = /^[0-9]*$/;

    // Check if the input matches the regex
    if (!numberRegex.test(inputValue)) {
      return;
    }
    if (name == "mrp") {
      setMrp(inputValue);
    } else if (name == "noOfPages") {
      setNoOfPages(inputValue);
    } else if (name == "mrp2") {
      setMrp2(inputValue);
    } else if (name == "noOfPages2") {
      setNoOfPages2(inputValue);
    }
  };

  // CALCULATIONS
  const calculateProductionCost = () => {
    setError({ ...error, card1Error: "" });
    if (
      !noOfPages ||
      !selectedBookType ||
      selectedBookType.includes("Select Book Size") ||
      parseInt(noOfPages2) < 35 ||
      parseInt(noOfPages2) > 1200
    ) {
      setError({
        ...error,
        card1Error: "Please enter page number between 35 - 1200",
      });
      return;
    }

    const selectedItem = booksData.find(
      (item) => item.bookType == selectedBookType
    );
    if (!selectedItem) {
      return;
    }

    const productionCost = parseInt(noOfPages) * selectedItem?.price;
    const minimumSellingPrice = Number(parseInt(noOfPages) * 1.55);
    setCard1({
      pc: Number(productionCost.toFixed(0)),
      msp: Number(minimumSellingPrice.toFixed(0)),
    });
  };

  const calculatePaperBackEarning = () => {
    setError({ ...error, card2Error: "" });
    if (!mrp || !card1.msp || parseInt(mrp) < parseInt(card1.msp)) {
      setError({
        ...error,
        card2Error: "MRP (selling price) should be greater than SSP !",
      });
      return;
    }
    const x = parseInt(card1.msp) * 0.6;
    const otherDistChannel = x - card1.pc;
    const vbdStore = parseInt(card1.msp) - parseInt(card1.pc);
    setCard2({ odc: otherDistChannel, vbdStore });
  };

  const calcuateSuggestedPrice = () => {
    setError({ ...error, card3Error: "" });
    if (
      !noOfPages2 ||
      !selectedBookType2 ||
      selectedBookType2.includes("Select Book Size") ||
      parseInt(noOfPages2) < 35 ||
      parseInt(noOfPages2) > 1200
    ) {
      setError({
        ...error,
        card3Error: "Please enter page number between 35 - 1200",
      });
      return;
    }

    const selectedItem = booksData.find(
      (item) => item.bookType == selectedBookType2
    );
    if (!selectedItem) {
      return;
    }
    const minimumPaperbackMrp = parseInt(noOfPages2) * 1.55;
    const suggestedEbookMrp = Math.round(minimumPaperbackMrp / 2);

    setCard3({
      paperbackMrp: Number(minimumPaperbackMrp).toFixed(0),
      suggestedMrp: Number(suggestedEbookMrp).toFixed(0),
    });
  };

  const calculateEbookEarning = () => {
    setError({ ...error, card4Error: "" });
    if (!mrp2 || parseInt(mrp2) < 49) {
      setError({
        ...error,
        card4Error: "Ebook MRP (selling price) should be greater than Rs.49 !",
      });
      return;
    }

    const amazonKindle = (parseInt(mrp2) * 30) / 100;
    const googlePlayStore = (parseInt(mrp2) * 52) / 100;

    setCard4({
      kindle: Number(amazonKindle).toFixed(0),
      gPlaystore: Number(googlePlayStore).toFixed(0),
    });
  };

  useEffect(() => {
    async function getCall() {
      const res = await axios.get("/api/price/getPrice");
      if (res?.data[0]?.bookPrice) {
        const prices = res?.data[0]?.bookPrice;
        setBooksData(prices);
      }
    }
    getCall();
  }, []);
  return (
    <div className=" bg-gray-50 ">
      <div className="flex flex-col items-center justify-center bg-gray-50 p-6">
        <div className="mb-4">
          <Link
            href="https://www.vbdpublications.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/logo.jpg"
              alt="Logo"
              width={100}
              height={100}
              className="md:w-full md:h-full"
            />
          </Link>
        </div>
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
          <div className="bg-white shadow-lg rounded-xl w-[370px] md:w-[460px] mx-auto md:mx-0">
            <div className="bg-[#F8303D] p-4 py-5">
              <h2 className="text-[1.5rem] font-semibold text-[#fff] mb-2 text-center leading-[1.5]">
                1. Production Cost
              </h2>
              <p className="text-white text-center text-xs">
                Use the tool below to estimate the production cost of your book
                with a Black & White interior.
              </p>
            </div>
            <form className="space-y-4 p-4">
              <div className="flex items-center">
                <label className="text-[#555] w-[200px] text-sm font-medium">
                  Book Size:
                </label>
                <select
                  value={selectedBookType}
                  onChange={(e) => setSelectedBookType(e.target.value)}
                  className="w-[245px] border border-gray-300  p-2 mt-1 h-9 rounded-[7px] text-xs text-gray-500"
                >
                  <option value="Select Book Size" className="text-xs">
                    Select Book Size
                  </option>
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
                  value={noOfPages}
                  name="noOfPages"
                  onChange={handleOnChange}
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
              <div className="error m-0 p-0">
                {error.card1Error ? (
                  <p className="text-rose-500 text-sm text-center m-0 p-0">
                    {error.card1Error}
                  </p>
                ) : (
                  <p className="invisible">error</p>
                )}
              </div>
              <div className="m-auto w-[141px] ">
                <button
                  onClick={calculateProductionCost}
                  type="button"
                  className="w-full bg-[#F8303D] text-white font-semibold py-2 rounded-lg hover:bg-[#d52932] transition"
                >
                  Calculate
                </button>
              </div>
            </form>
            <div className="mt-6 p-4 bg-gray-100  shadow-inner">
              <p className="text-gray-700 text-sm">
                Production Cost: {card1.pc}
              </p>
              <p className="text-gray-700 mt-5 text-sm">
                Minimum Selling Price (MSP): {card1.msp}
              </p>
            </div>
          </div>

          {/* Calculator 2 */}
          <div className="bg-white shadow-lg rounded-xl w-[370px] md:w-[460px] mx-auto md:mx-0">
            <div className="bg-[#F8303D] p-4 py-5">
              <h2 className="text-[1.5rem] font-semibold text-[#fff] mb-2 text-center leading-[1.5]">
                2. Paperback Earnings
              </h2>
              <p className="text-white text-center text-xs">
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
                    value={mrp}
                    name="mrp"
                    onChange={handleOnChange}
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

              <div className="error m-0 pt-2">
                {error.card2Error ? (
                  <p className="text-rose-500 text-sm text-center m-0 p-0">
                    {error.card2Error}
                  </p>
                ) : (
                  <p className="invisible">error</p>
                )}
              </div>
              <div className="m-auto w-[141px]">
                <button
                  type="button"
                  onClick={calculatePaperBackEarning}
                  className="w-full bg-[#F8303D] text-white font-semibold py-2 rounded-lg hover:bg-[#d52932] transition"
                >
                  Calculate
                </button>
              </div>
            </form>
            <div className="mt-6 p-4 bg-gray-100 shadow-inner">
              <p className="text-gray-700 text-sm">
                Other Distribution Channels: {card2.odc}
              </p>
              <p className="text-gray-700 mt-5 text-sm">
                VBD Store: {card2.vbdStore}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-start gap-12 mt-12 ">
          {/* Suggested Price Card */}
          <div className="bg-white shadow-lg rounded-xl w-[370px] md:w-[460px] mx-auto md:mx-0">
            <div className="bg-[#F8303D] p-4 py-5">
              <h2 className="text-[1.5rem] font-semibold text-[#fff] mb-2 text-center leading-[1.5]">
                3. Suggested Price
              </h2>
              <p className="text-white text-center text-xs">
                Use the tool below to get the most suitable price by
                VBD.
              </p>
            </div>
            <form className="space-y-4 p-4">
              <div className="flex items-center">
                <label className="text-[#555] w-[200px] text-sm font-medium">
                  Book Size:
                </label>
                <select
                  value={selectedBookType2}
                  onChange={(e) => setSelectedBookType2(e.target.value)}
                  className="w-[245px] border border-gray-300 p-2 mt-1 h-9 rounded-[7px] text-xs text-gray-500"
                >
                  <option value="Select Book Size" className="text-xs">
                    Select Book Size
                  </option>
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
                  value={noOfPages2}
                  name="noOfPages2"
                  onChange={handleOnChange}
                  placeholder="Enter Total Pages"
                  className="w-[245px] border border-gray-300 h-9 rounded-[7px] p-2 mt-1 text-xs text-gray-500"
                />
              </div>
              <div className="error m-0 p-0">
                {error.card3Error ? (
                  <p className="text-rose-500 text-sm text-center m-0 p-0">
                    {error.card3Error}
                  </p>
                ) : (
                  <p className="invisible">error</p>
                )}
              </div>
              <div className="m-auto w-[141px]">
                <button
                  onClick={calcuateSuggestedPrice}
                  type="button"
                  className="w-full bg-[#F8303D] text-white font-semibold py-2 rounded-lg hover:bg-[#d52932] transition"
                >
                  Calculate
                </button>
              </div>
            </form>
            <div className="mt-6 p-4 bg-gray-100 shadow-inner">
              <p className="text-gray-700 text-sm">
                Minimum Paperback MRP: {card3.paperbackMrp}
              </p>
              <p className="text-gray-700 mt-5 text-sm">
                Suggested Ebook MRP: {card3.suggestedMrp}
              </p>
            </div>
          </div>

          {/* Ebook Earnings Card */}
          <div className="bg-white shadow-lg rounded-xl w-[370px] md:w-[460px] mx-auto md:mx-0">
            <div className="bg-[#F8303D] p-4 py-5">
              <h2 className="text-[1.5rem] font-semibold text-[#fff] mb-2 text-center leading-[1.5]">
                4. Ebook Earnings
              </h2>
              <p className="text-white text-center text-xs">
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
                    value={mrp2}
                    name="mrp2"
                    onChange={handleOnChange}
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
              <div className="error m-0 p-0">
                {error.card4Error ? (
                  <p className="text-rose-500 text-sm text-center m-0 p-0">
                    {error.card4Error}
                  </p>
                ) : (
                  <p className="invisible">error</p>
                )}
              </div>
              <div className=" flex justify-center">
                <button
                  type="button"
                  onClick={calculateEbookEarning}
                  className=" w-[141px] bg-[#F8303D] text-white font-semibold py-2 rounded-lg hover:bg-[#d52932] transition"
                >
                  Calculate
                </button>
              </div>
            </form>
            <div className="mt-6 p-4 bg-gray-100 shadow-inner">
              <p className="text-gray-700 text-sm">
                Amazon Kindle: {card4.kindle}
              </p>
              <p className="text-gray-700 mt-5 text-sm">
                Google Playstore:{card4.gPlaystore}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
