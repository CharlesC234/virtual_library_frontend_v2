"use client";

import { useEffect, useState } from "react";
import getBooksForUser from "../components/getBookArray";
import sortByLevenshteinDistance from "../components/sortBookArray";
import { useRouter, useSearchParams } from "next/navigation";


export default function Main() {
    const [uploadedCover, setUploadedCover] = useState(null);
    const [uploadedBook, setUploadedBook] = useState(null);
    const [bookName, setBookName] = useState(null);
    const [author, setAuthor] = useState(null);
    const [description, setDescription] = useState(null);
    const [isbn, setIsbn] = useState(null);
    const [publisher, setPublisher] = useState(null);
    const [year, setYear] = useState(null);
    const [category, setCategory] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const router = useRouter();
    const [fieldsIncomplete, setFieldsIncomplete] = useState(false);
    const [dropdown2, setdropdown2] = useState(false);
    const [userId, setUserId] = useState("");
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
    const searchParams = useSearchParams();
    const bookId = searchParams.get("id");


    async function getStrapiData(){
        console.log("called");
        const baseUrl = `https://virtuallibrarybackendstrapi-production.up.railway.app/api/books/${bookId}?populate=*`;
       //console.log("url: " + baseUrl);
        try{
            fetch(baseUrl).then((res) => {
                res.json().then((response) => {
                    console.log(response);
                    setBookName(response.data.attributes.name);
                    setIsbn(response.data.attributes.isbn);
                    setAuthor(response.data.attributes.author);
                    setDescription(response.data.attributes.description);
                    setCategory(response.data.attributes.category);
                    setPublisher(response.data.attributes.publisher);
                    setIsPublic(response.data.attributes.isPublic)
                    setYear(response.data.attributes.publication_year);
                    setUserId(response.data.attributes.user_id)
                })
            })
        }
        catch(error){
            console.error(error);
        }
      } 


    let username = "";
    if (typeof window !== 'undefined') {
    username = localStorage.getItem("username");
    }

    function handleChangeCover(event){
        if (event.target.files && event.target.files[0]) {
            setUploadedCover({name: event.target.files[0].name, url: URL.createObjectURL(event.target.files[0]), file: event.target.files[0]});
          //console.log(uploadedCover);
        }
      };

      function handleChangeBook(event){
        if (event.target.files && event.target.files[0]) {
            setUploadedBook({name: event.target.files[0].name, url: URL.createObjectURL(event.target.files[0]), file: event.target.files[0]});
          //console.log(uploadedBook);
        }
      };


      useEffect(() => {
        getStrapiData();
      })



      function Post(username) {
        // console.log(uploadedBook);
        // console.log(uploadedCover);
        try {
          fetch(`https://virtuallibrarybackendstrapi-production.up.railway.app/api/books/${bookId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: {
                name: bookName,
                author: author,
                isbn: isbn,
                description: description,
                public: isPublic,
                publication_year: year,
                category: category,
                publisher: publisher,
                user_id: username,
              },
            }),
          }).then((res) => {
            res.json().then((response) => {
                if(uploadedCover != null){
                const formData1 = new FormData();
                // Create a FormData object to send the image data
                fetch(uploadedCover.url)
                .then(res2 => res2.blob())
                .then(blob => {
                formData1.append('files', uploadedCover.file, uploadedCover.name)
                // Upload
                formData1.append('ref', 'api::book.book');
                formData1.append('refId', response.data.id);
                formData1.append('field', 'cover');
    
                // Make a POST request using fetch
                fetch(`https://virtuallibrarybackendstrapi-production.up.railway.app/api/upload`, {
                  method: 'POST',
                  body: formData1,
              })})
            }

            if(uploadedBook != null){
               // Create a FormData object to send the image data
               const formData2 = new FormData();
               fetch(uploadedBook.url)
               .then(res3 => res3.blob())
               .then(blob => {
               formData2.append('files', uploadedBook.file, uploadedBook.name)
               // Upload
               formData2.append('ref', 'api::book.book');
               formData2.append('refId', response.data.id);
               formData2.append('field', 'pdf');
    
               // Make a POST request using fetch
               fetch(`https://virtuallibrarybackendstrapi-production.up.railway.app/api/upload`, {
                 method: 'POST',
                 body: formData2,
             })
            });
          }});
            
            
          })} catch (error) {
          console.error(error);
          return null;
        }
      }


      if(username != userId){
        return <></>
      }else{



    return <div>

<div class="max-w-md mx-auto mt-5">
<h5 className="text-3xl font-bold mb-5 mt-10">Edit Book</h5>
  <div class="relative z-0 w-full mb-5 group">
      <input onChange={(e) => {
                setBookName(e.target.value);
              }} value={bookName} type="text" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Book Name</label>
  </div>
  <div class="relative z-0 w-full mb-5 group">
      <input onChange={(e) => {
                setAuthor(e.target.value);
              }} value={author} type="text" id="floating_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Author</label>
  </div>
  <div class="relative z-0 w-full mb-5 group">
      <input onChange={(e) => {
                setDescription(e.target.value);
              }} value={description} type="text" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
  </div>
  <div class="grid md:grid-cols-2 md:gap-6">
    <div class="relative z-0 w-full mb-5 group">
        <input onChange={(e) => {
                setIsbn(e.target.value);
              }} value={isbn} type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ISBN</label>
    </div>
    <div class="relative z-0 w-full mb-5 group">
        <input onChange={(e) => {
                setPublisher(e.target.value);
              }} value={publisher} type="text" name="floating_last_name" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Publisher</label>
    </div>
  </div>
  <div class="grid md:grid-cols-2 md:gap-6">
    <div class="relative z-0 w-full mb-5 group">
        <input onChange={(e) => {
                setYear(e.target.value);
              }} value={year} type="text" name="floating_phone" id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Year Published</label>
    </div>
    <div class="relative z-0 w-full mb-5 group">
    <button onClick={() => {setdropdown2(!dropdown2)}} id="dropdownSearchButton" data-dropdown-toggle="dropdownSearch" data-dropdown-placement="bottom" class=" mt-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Select Category <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
</svg>
</button>

<div id="dropdownRadioHelper" class={`z-10 ${dropdown2 ? "visible" : "hidden"} absolute mt-7 bg-white divide-y divide-gray-100 rounded-lg shadow w-60 dark:bg-gray-700 dark:bg-gray-900`}>
    <ul class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioHelperButton">
      {categories.map((item, index) => {
        return <li key={index}> 
        <div class="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
          <input onClick={() => {setCategory(item)}} id="helper-radio-4" name="helper-radio" type="radio" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
          <label for="checkbox-item-11" class="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{item}</label>
        </div>
      </li>
      })}
    </ul>
</div>
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
        <input onChange={handleChangeCover} id="dropzone-file" type="file" class="hidden" />
    </label>
    : 
    <div class="flex items-center justify-center mt-3 aspect-square" style={{borderRadius: 20, height: 200}}>
    <img style={{borderRadius: 20}} className="aspect-square" src={uploadedCover.url}></img>
    <button className="ms-5" onClick={() => {setUploadedCover(null)}}>
     <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
<path fill="#F44336" d="M21.5 4.5H26.501V43.5H21.5z" transform="rotate(45.001 24 24)"></path><path fill="#F44336" d="M21.5 4.5H26.5V43.501H21.5z" transform="rotate(135.008 24 24)"></path>
</svg>
    </button>
    </div>}

    {uploadedBook == null ?
    <label style={{backgroundColor: 'rgba(31, 41, 55, .75)', borderRadius: 20, height: 200}} for="dropzone-file" class="flex flex-col mt-5 items-center justify-center w-full border-2 border-gray-400 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-900 hover:bg-gray-100 dark:hover:border-gray-500 dark:hover:bg-gray-600 aspect-square">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
        <p class="text-xl mb-3 font-bold text-gray-500 dark:text-gray-400">Upload Book PDF</p>
            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click</span> or drag and drop</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">PDF</p>
        </div>
        <input onChange={handleChangeBook} id="dropzone-file" type="file" class="hidden" />
    </label> :
     <div class="flex items-center justify-center mt-3 aspect-square" style={{borderRadius: 20, height: 200}}>
     <p>{uploadedBook.name}</p>
     <button className="ms-5"  onClick={() => {setUploadedBook(null)}}>
     <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
<path fill="#F44336" d="M21.5 4.5H26.501V43.5H21.5z" transform="rotate(45.001 24 24)"></path><path fill="#F44336" d="M21.5 4.5H26.5V43.501H21.5z" transform="rotate(135.008 24 24)"></path>
</svg>
    </button>
     </div>}

</div>
<div className="flex flex-col">
<label class="inline-flex items-center mb-5 cursor-pointer ms-0 mt-4">
  <input type="checkbox" onChange={() => {setIsPublic(!isPublic)}} value="" class="sr-only peer"/>
  <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  <span class="ms-3 font-bold text-gray-900 dark:text-gray-300">Make This Book Public</span>
</label>
<p className={`font-bold text-rose-600 ${fieldsIncomplete ? "visible" : "hidden"}`}>Please Fill Out All Fields!</p>
<button className="mt-5 text-white bg-blue-700 font-medium rounded-lg font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mb-20"
onClick={() => {
    //(uploadedBook);
    //console.log(uploadedCover);
    if(bookName == null || author == null || description == null || isbn == null || publisher == null || year == null){
        console.log(bookName);
        console.log(category);
            setFieldsIncomplete(true);
        }else{
Post(username);}}} >Submit</button>
    </div>
    </div>
    </div>
      }


}