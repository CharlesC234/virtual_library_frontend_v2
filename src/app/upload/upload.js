"use client";

import { useEffect, useState } from "react";
import getBooksForUser from "../components/getBookArray";
import sortByLevenshteinDistance from "../components/sortBookArray";
import { useSearchParams } from "next/navigation";
import { Post } from "../components/post";

export default function Main() {
    const [uploadedCover, setUploadedCover] = useState(null);
    const [uploadedBook, setUploadedBook] = useState(null);
    const [bookName, setBookName] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [isbn, setIsbn] = useState("");
    const [publisher, setPublisher] = useState("");
    const [year, setYear] = useState("");
    const [category, setCategory] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const username = localStorage.getItem("username");

    function handleChangeCover(event){
        if (event.target.files && event.target.files[0]) {
            setUploadedCover({name: event.target.files[0].name, url: URL.createObjectURL(event.target.files[0]), file: event.target.files[0]});
          console.log(uploadedCover);
        }
      };

      function handleChangeBook(event){
        if (event.target.files && event.target.files[0]) {
            setUploadedBook({name: event.target.files[0].name, url: URL.createObjectURL(event.target.files[0]), file: event.target.files[0]});
          console.log(uploadedBook);
        }
      };


    return <div>


<div class="max-w-md mx-auto mt-5">
  <div class="relative z-0 w-full mb-5 group">
      <input onChange={(e) => {
                setBookName(e.target.value);
              }}  type="text" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Book Name</label>
  </div>
  <div class="relative z-0 w-full mb-5 group">
      <input onChange={(e) => {
                setAuthor(e.target.value);
              }}  type="text" id="floating_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Author</label>
  </div>
  <div class="relative z-0 w-full mb-5 group">
      <input onChange={(e) => {
                setDescription(e.target.value);
              }}  type="text" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
  </div>
  <div class="grid md:grid-cols-2 md:gap-6">
    <div class="relative z-0 w-full mb-5 group">
        <input onChange={(e) => {
                setIsbn(e.target.value);
              }} type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ISBN</label>
    </div>
    <div class="relative z-0 w-full mb-5 group">
        <input onChange={(e) => {
                setPublisher(e.target.value);
              }}  type="text" name="floating_last_name" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Publisher</label>
    </div>
  </div>
  <div class="grid md:grid-cols-2 md:gap-6">
    <div class="relative z-0 w-full mb-5 group">
        <input onChange={(e) => {
                setYear(e.target.value);
              }}  type="text" name="floating_phone" id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Year Published</label>
    </div>
    <div class="relative z-0 w-full mb-5 group">
        <input onChange={(e) => {
                setCategory(e.target.value);
              }} type="text" name="floating_company" id="floating_company" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Category</label>
    </div>
  </div>


            <div class="flex flex-col items-center justify-center max-w-md mx-auto mt-3 aspect-square" style={{borderRadius: 20}}>
                {uploadedCover == null ?
    <label style={{backgroundColor: 'rgba(31, 41, 55, .75)', borderRadius: 20, height: 200}} for="dropzone-file" class="flex flex-col items-center justify-center w-full border-2 border-gray-400 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-900 hover:bg-gray-100 dark:hover:border-gray-500 dark:hover:bg-gray-600 aspect-square">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
        <p class="text-xl mb-3 font-bold text-gray-500 dark:text-gray-400">Upload A Cover Image</p>
            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click</span> or drag and drop</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input onChange={handleChangeCover} id="dropzone-file" type="file" multiple class="hidden" />
    </label>
    : 
    <div class="flex items-center justify-center mt-3 aspect-square" style={{borderRadius: 20, height: 200}}>
    <img style={{borderRadius: 20}} className="aspect-square" src={uploadedCover.url}></img>
    </div>}

    <label style={{backgroundColor: 'rgba(31, 41, 55, .75)', borderRadius: 20, height: 200}} for="dropzone-file" class="flex flex-col mt-5 items-center justify-center w-full border-2 border-gray-400 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-900 hover:bg-gray-100 dark:hover:border-gray-500 dark:hover:bg-gray-600 aspect-square">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
        <p class="text-xl mb-3 font-bold text-gray-500 dark:text-gray-400">Upload Book PDF</p>
            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click</span> or drag and drop</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">PDF</p>
        </div>
        <input onChange={handleChangeBook} id="dropzone-file" type="file" multiple class="hidden" />
    </label>
</div>
<div className="flex flex-col">
<label class="inline-flex items-center mb-5 cursor-pointer ms-0 mt-4">
  <input type="checkbox" onChange={() => {setIsPublic(!isPublic)}} value="" class="sr-only peer"/>
  <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  <span class="ms-3 font-bold text-gray-900 dark:text-gray-300">Make This Book Public</span>
</label>
<button className="text-white bg-blue-700 font-medium rounded-lg font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
onClick={() => {
    console.log(uploadedBook);
    console.log(uploadedCover);
Post(username, bookName, author, description, isbn, publisher, year, category, uploadedCover.name, uploadedCover.url.substring(5), uploadedBook.name, uploadedBook.url.substring(5), isPublic);}} >Submit</button>
    </div>
    </div>
    </div>


}