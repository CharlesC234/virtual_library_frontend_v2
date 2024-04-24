"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import Login from "./login/login";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Router from "next/navigation";
const inter = Inter({ subsets: ["latin"] });
import sortByLevenshteinDistance from "./components/sortBookArray";
import { getPublicBooks } from "./components/getBookArray";

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
  const [inputStr, setInputStr] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [border, setBorder] = useState(1.5);
  const [radius, setRadius] = useState(20);
  const [dropdown, setdropdown] = useState(false);
  const [dropdown2, setdropdown2] = useState(false);
  const [sortedArray, setSortedArray] = useState([]);
  const [author, setAuthor] = useState(null);
  const [before, setBefore] = useState(null);
  const [after, setAfter] = useState(null);
  const [category, setCategory] = useState(null);
  const categories = [
    "fantasy",
    "science fiction",
    "mystery",
    "thriller",
    "romance",
    "historical fiction",
    "horror",
    "young adult",
    "non-fiction",
    "biography/memoir"
  ];

  function query(){
    let path = `/results?query=${inputStr}`;
    if(author != null){
      path = path + `&author=${author}`;
    }
    if(before != null){
      path = path + `&before=${before}`;
    }
    if(after != null){
      path = path + `&after=${after}`;
    }
    if(category != null){
      path = path + `&category=${category}`;
    }
    router.push(path);
  }

  const getBooksForUser= async(user) => {
    await getStrapiData(user).then((res) => {
      var tempArr = [];
      for(let i = 0; i < res.data[0].attributes.books.data.length; i++){
        getStrapiDataEachBook(res.data[0].attributes.books.data[i].attributes.name).then((res2) => {
          tempArr.push(res2.data[0]);
        })
      }
      getPublicBooks().then((res2) => {
        const combinedArray = Array.from(new Set([...tempArr, ...res2]));
        setBookArray(combinedArray);
        sortByLevenshteinDistance(combinedArray, "A").then((res) => {
          const temp = [res[0]];
          for(let i = 1; i < res.length; i++){
              if(res[i].attributes.name != res[i - 1].attributes.name){
                  temp.push(res[i]);
     
              }
          }
          setSortedArray(temp);
        })
    })
    })
  }

  useEffect(() => {
    if(localStorage.getItem("username") != null && localStorage.getItem("username") != "null" && bookArray == null){
      const username = localStorage.getItem("username");
      getBooksForUser(username);
      }
      if(bookArray != null && bookArray.length > 0){
      sortByLevenshteinDistance(bookArray, inputStr).then((res) => {
        const temp = [res[0]];
        for(let i = 1; i < res.length; i++){
            if(res[i].attributes.name != res[i - 1].attributes.name){
                temp.push(res[i]);
   
            }
        }
        setSortedArray(temp);
      })
    }
  },[inputStr])



  
  //console.log("hellowrld: " + JSON.stringify(bookArray));
  
  if(bookArray != null){
    if(sortedArray.length == 0 && bookArray.length != 0){
      setSortedArray(bookArray);
    }

  return (
    <html lang="en">
      <body className={inter.className}>
      <nav class="bg-white border-gray-200 dark:bg-gray-900">
  <div class="container flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
    <img class="mx-auto h-10 w-auto" src="https://www.svgrepo.com/show/475352/book.svg" alt="Your Company"/>
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">BookWise</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" style={{width: '65%'}} id="navbar-default">
      <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li className="my-auto">
          <a href="/" class="my-auto inline-block align-middle px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
        </li>
        <li className="my-auto">
          <a href="/upload" class="my-auto inline-block align-middle px-3 text-gray-900 bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Upload</a>
        </li>
        <li className="my-auto">
          <button style={{width: 75}} onClick={() => {
            if (typeof window !== 'undefined') {
                                        localStorage.setItem("username", null);
                                        localStorage.setItem("password", null);
                                        window.location.reload();
            }
                                      }} 
            class=" my-auto inline-block align-middle py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              Sign Out</button>
        </li>
        <li className="w-full">
<div className="flex flex-row">   
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
              type="search" id="search" class="block w-full h-5 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by title" />
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
                //console.log(item);
                return (
                  <a
                    key={index}
                    className="flex flex-row justify-start mb-3 px-3 pe-0"
                    style={{ width: "100%" }}
                    href={"/" + item.attributes.book_id}
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
    <button onClick={() => {setdropdown(!dropdown)}} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="ms-4 my-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 rounded-3xl" type="button">
<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24" style={{fill: "#FFFFFF"}}>
<path d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z"></path>
</svg>
</button>
    <button onClick={() => {query()}} type="button" class="ms-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-sm px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 py-0">Search</button>
</div>
<div id="dropdown" style={{width: '40%', right: '10%'}}class={`z-10 mt-7 absolute ${dropdown ? "visible" : "hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-900`}>
    <ul class="py-2 flex flex-row text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
      <li>
        <div class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Author</div>
        <div class="p-3">
      <label for="input-group-search" class="sr-only">Search</label>
      <div class="relative">
        <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
        </div>
        <input onChange={(e) => {
                setAuthor(e.target.value);
              }}  id="input-group-search" class="block w-full p-2 ps-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Author"/>
      </div>
      </div>
      </li>
      <li>
        <div class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Before Year</div>
        <div class="p-3">
      <label for="input-group-search" class="sr-only">Search</label>
      <div class="relative">
      <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
        </div>
        <input onChange={(e) => {
                setBefore(e.target.value);
              }}  maxLength="4" minLength="3" type="text" id="input-group-search" class="block w-full p-2 ps-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="xxxx"/>
      </div>
      </div>
      </li>
      <li>
        <div class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">After Year</div>
        <div class="p-3">
      <label for="input-group-search" class="sr-only">Search</label>
      <div class="relative">
      <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
        </div>
        <input onChange={(e) => {
                setAfter(e.target.value);
              }}  maxLength="4" minLength="3" type="text" id="input-group-search" class="block w-full p-2 ps-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="xxxx"/>
      </div>
      </div>
      </li>
      <li>
        <div class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Category</div>
        <div class="p-3">


<button onClick={() => {setdropdown2(!dropdown2)}} id="dropdownSearchButton" data-dropdown-toggle="dropdownSearch" data-dropdown-placement="bottom" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Select <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
</svg>
</button>

<div id="dropdownRadioHelper" class={`z-10 ${dropdown2 ? "visible" : "hidden"} absolute mt-7 bg-white divide-y divide-gray-100 rounded-lg shadow w-60 dark:bg-gray-700 dark:bg-gray-900`}>
    <ul class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioHelperButton">
      {categories.map((item, index) => {
        return <li key={index}> 
        <div class="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
          <input onChange={() => {setCategory(item)}} id="helper-radio-4" name="helper-radio" type="radio" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
          <label for="checkbox-item-11" class="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{item}</label>
        </div>
      </li>
      })}
    </ul>
</div>


      </div>
      </li>
    </ul>
</div>
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
