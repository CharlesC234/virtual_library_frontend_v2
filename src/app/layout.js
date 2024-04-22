"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import Login from "./login/page";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Router from "next/navigation";
const inter = Inter({ subsets: ["latin"] });
import sortByLevenshteinDistance from "./components/sortBookArray";

async function getStrapiData(user){
  const baseUrl = `https://virtuallibrarybackendstrapi-production.up.railway.app/api/library-users?populate=*&filters[username][$eq]=${user}`;
  try{
      const response = await fetch(baseUrl);
      const data = await response.json();
      return data;
  }
  catch(error){
      console.error(error);
  }
} 


async function getStrapiDataEachBook(bookName){
  const baseUrl = `https://virtuallibrarybackendstrapi-production.up.railway.app/api/books?populate=*&filters[name][$eq]=${bookName}`;
  try{
      const response = await fetch(baseUrl);
      const data = await response.json();
      return data;
  }
  catch(error){
      console.error(error);
  }
} 


export default function RootLayout({ children }) {
  const [bookArray, setBookArray] = useState(null);
  const router = useRouter();
  const [inputStr, setInputStr] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [border, setBorder] = useState(1.5);
  const [radius, setRadius] = useState(20);
  const [hidden, setHidden] = useState(true);
  const [dropdown, setdropdown] = useState(false);
  const [sortedArray, setSortedArray] = useState([]);

  const getBooksForUser= async(user) => {
    await getStrapiData(user).then((res) => {
      var tempArr = [];
      for(let i = 0; i < res.data[0].attributes.books.data.length; i++){
        getStrapiDataEachBook(res.data[0].attributes.books.data[i].attributes.name).then((res2) => {
          tempArr.push(res2.data[0]);
        })
      }
      setBookArray(tempArr);
    })
  }

  useEffect(() => {
    if(localStorage.getItem("username") != null && localStorage.getItem("username") != "null" && bookArray == null){
      const username = localStorage.getItem("username");
      getBooksForUser(username);
      }
      if(bookArray != null && bookArray.length > 0){
      sortByLevenshteinDistance(bookArray, inputStr).then((res) => {
        setSortedArray(res);
      })
    }
  },[inputStr])
  console.log("hellowrld: " + JSON.stringify(bookArray));
  if(bookArray != null){


  return (
    <html lang="en">
      <body className={inter.className}>
      <nav class="bg-white border-gray-200 dark:bg-gray-900">
  <div class="container flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Virtual Library</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" style={{width: '50%'}} id="navbar-default">
      <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li className="my-auto">
          <a href="/" class="my-auto inline-block align-middle px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
        </li>
        <li className="my-auto">
          <button style={{width: 75}} onClick={() => {
                                        localStorage.setItem("username", null);
                                        localStorage.setItem("password", null);
                                        window.location.reload();
                                      }} 
            class=" my-auto inline-block align-middle py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              Sign Out</button>
        </li>
        <li className="w-full">
<form className="flex flex-row" onSubmit={() => {router.push(`/results?query=${inputStr}`)}}>   
    <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative w-full">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <div
            className="relative w-full mt-1"
            style={{ marginBottom: ".25rem" }}
          >
        <input onChange={(e) => {
                setInputStr(e.target.value);
              }} 
              onFocus={() => {
                setShowSearch(true);
                setRadius(0);
                setBorder(0);
              }}
              style={{
                backgroundColor: 'rgba(31, 41, 55, 0)',
                borderColor: 'rgba(255,255,255, .225)',
                marginTop: 2,
                borderWidth: 2,
                fontSize: 16,
                height: 40,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderBottomRightRadius: radius,
                borderBottomLeftRadius: radius,
                width: "100%",
              }}
              type="search" id="search" class="block w-full h-5 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" />
            <button
              onClick={() => {
                setShowSearch(false);
                setRadius(20);
                setBorder(1.5);
              }}
              className={`z-4 h-full w-full left-0 top-0 ${
                showSearch ? "fixed" : "hidden"
              }`}
            />
            <div
              className={`z-50 absolute bg-gray-900 shadow-xl opacity-100 bg-black position-absolute overflow-hidden border-zinc-700 p-1 pt-3 pe-0 ${
                showSearch ? "block" : "hidden"
              }`}
              style={{
                borderLeftWidth: 2,
                borderRightWidth: 2,
                borderBottomWidth: 2,
                width: "100%",
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}
            >
              {sortedArray.slice(0, 4).map((item, index) => {
                return (
                  <a
                    key={index}
                    className="flex flex-row justify-start mb-3 px-3 pe-0"
                    style={{ width: "100%" }}
                    href={"/" + item.display_name}
                  >
                    <div style={{ width: "18%", maxWidth: 85, minWidth: 65 }}>
                      <img
                        className="my-auto"
                        style={{height: 60, width: 60, borderRadius: "100%" }}
                        src={item.attributes.cover.data.attributes.url}
                      />
                    </div>
                    <h5
                      className="my-auto font-bold align-middle text-xl text-zinc-300 pe-0 ms-4 me-3"
                      style={{
                        textAlign: "left",
                        alignSelf: "center",
                      }}
                    >
                      {item.attributes.name}
                    </h5>
                  </a>
                );
              })}
            </div>
          </div>
    </div>
    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ms-4">Search</button>
</form>
        </li>
      </ul>
    </div>
  </div>
</nav>
        {children}
      </body>
    </html>
  );}else{
    return     <html lang="en">
    <body className={inter.className}>{children}</body></html>
  }}
