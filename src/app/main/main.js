"use client";

import getBooksForUser from "../components/getBookArray";
import { useEffect, useState } from "react";
import { getPublicBooks } from "../components/getBookArray";
/*
In order to access the variable fetched from the database if it is a collection type it will be in an array.
if it is a single type then it will be just a normal variable call appended to the end of the stored value
as seen there is homeData(name of variable) .data(this is where either the array is present or not)
.attributes(this is where each of the fields of the given piece of data are) .nameofattribute(this can be whatever name you want of which attribute)
*/

export default function Main({}) {
    const [bookArr, setBookArr] = useState([]);
    const [publicBookArr, setPublicBookArr] = useState([]);
    let username = "";
    if (typeof window !== 'undefined') {
    username = localStorage.getItem("username");
    }

    useEffect(() => {
        //console.log(username);
        //console.log(bookArr.length);
        if( bookArr.length <= 0){
        //console.log("called");
        getBooksForUser(username).then((res) => {
            //console.log(res);
            setBookArr(res);
        })
        }
        if(publicBookArr.length <= 0){
            getPublicBooks().then((res) => {
                setPublicBookArr(res);
                //console.log(res);
            })
        }
    })

    //console.log(bookArr);

    return <main>

        <section class="text-center text-neutral-600  text-neutral-200">

            {/* Main headings */}
            <h1 class="text-5xl font-bold mb-5">BookWise</h1>
            <h4 class="text-2xl italic text-neutral-500  text-neutral-400 mb-8">The at-home Virtual Library</h4>

            {/* Divider */}
            <hr class="h-[2px] bg-gray-100  bg-gray-600 my-10 border-none" />

            {/* Section heading */}
            <h3 class="text-3xl font-bold mb-4">My books</h3>

            {/* Grid */}
            <div class="grid grid-cols-3 gap-8 mt-9">

            {/* Displaying all the books inside grid */}
            {bookArr.map((item, index) => {
                return (
                    <div key={index}>

                        {/* Whole card */}
                        <div class="block rounded-lg bg-white shadow-lg  bg-neutral-700 text-center">

                            {/* Card image */}
                            <center>
                                <a href="#!">
                                    <img class="t-lg" src={item.attributes.cover ? item.attributes.cover.data.attributes.formats.thumbnail.url : "/"} alt=""/>
                                </a>
                            </center>

                            {/* Divider line */}
                            <hr class="h-[2px] bg-gray-100 my-10000 border-none" />

                            {/* Card body */}
                            <div class="p-6">

                                {/* Book title */}
                                <h5 class="mb-2 text-xl font-bold tracking-wide text-neutral-800  text-neutral-50">
                                {item.attributes.name}
                                </h5>

                                {/* Button */}
                                <a href={item.attributes.book_id}
                                class="mt-3 inline-block rounded bg-blue-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]  shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)]  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]  focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]  active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                                View more
                                </a>

                            </div>

                        </div>
                        {/* Whole card end */}

                    </div>
                )
            })}

            </div>

            {/* Divider */}
            <hr class="h-[2px] bg-gray-100  bg-gray-600 my-10 border-none" />

            <h3 class="text-3xl font-bold mb-4 mt-10">Public books</h3>

{/* Grid */}
<div class="grid grid-cols-3 gap-8 mt-9">

{/* Displaying all the books inside grid */}
{publicBookArr.map((item, index) => {
    return (
        <div key={index}>

            {/* Whole card */}
            <div class="block rounded-lg bg-white shadow-lg  bg-neutral-700 text-center">

                {/* Card image */}
                <center>
                    <a href="#!">
                        <img class="t-lg" src={item.attributes.cover ? item.attributes.cover.data.attributes.formats.thumbnail.url : "/"} alt=""/>
                    </a>
                </center>

                {/* Divider line */}
                <hr class="h-[2px] bg-gray-100 my-10000 border-none" />

                {/* Card body */}
                <div class="p-6">

                    {/* Book title */}
                    <h5 class="mb-2 text-xl font-bold tracking-wide text-neutral-800  text-neutral-50">
                    {item.attributes.name}
                    </h5>

                    {/* Button */}
                    <a href={item.attributes.book_id}
                    class="mt-3 inline-block rounded bg-blue-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]  shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)]  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]  focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]  active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                    View more
                    </a>

                </div>

            </div>
            {/* Whole card end */}

        </div>
    )
})}

</div>
        </section>

    </main>
    
}