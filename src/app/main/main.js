"use client";

import getBooksForUser from "../components/getBookArray";
import { useEffect, useState } from "react";

/*
In order to access the variable fetched from the database if it is a collection type it will be in an array.
if it is a single type then it will be just a normal variable call appended to the end of the stored value
as seen there is homeData(name of variable) .data(this is where either the array is present or not)
.attributes(this is where each of the fields of the given piece of data are) .nameofattribute(this can be whatever name you want of which attribute)
*/

export default function Main({}) {
    const [bookArr, setBookArr] = useState([]);
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
    })

    //console.log(booksData.data[2]);

    return <main>

        <section class="text-center text-neutral-600 dark:text-neutral-200">

            {/* Main headings */}
            <h1 class="text-5xl font-bold mb-5">Home Page</h1>
            <h4 class="text-2xl italic text-neutral-500 dark:text-neutral-400 mb-8">The at-home Virtual Library</h4>

            {/* Additional Options Dividers */}
            <hr class="h-[2px] bg-gray-100 dark:bg-gray-600 my-10 border-none" />

            <div class="container my-120 mx-auto md:px-6">
                {/* Section: navigation buttons block */}
                <section class="mb-320 text-center">
                    <div class="grid gap-x-6 md:grid-cols-3 lg:gap-x-12">
                        
                        {/* Function 1 */}
                        <div class="mb-12 md:mb-0">
                            <div class="mb-6 inline-block rounded-md bg-primary-100 p-4 text-primary">
                            {/* Link to specific feature */}
                            <a href="">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 512 512" stroke-width="2"
                                    stroke="currentColor" class="w-[50px] h-[50px] fill-[#ffffff]">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                                </svg>
                            </a>
                            </div>
                            <h5 class="mb-4 text-lg font-bold">Add book</h5>
                        </div>

                        {/* Function 2 */}
                        <div class="mb-12 md:mb-0">
                            <div class="mb-6 inline-block rounded-md bg-primary-100 p-4 text-primary">
                            {/* Link to specific feature */}
                            <a href="">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 448 512" stroke-width="2"
                                    stroke="currentColor" class="w-[50px] h-[50px] fill-[#ffffff]">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M448 80v48c0 44.2-100.3 80-224 80S0 172.2 0 128V80C0 35.8 100.3 0 224 0S448 35.8 448 80zM393.2 214.7c20.8-7.4 39.9-16.9 54.8-28.6V288c0 44.2-100.3 80-224 80S0 332.2 0 288V186.1c14.9 11.8 34 21.2 54.8 28.6C99.7 230.7 159.5 240 224 240s124.3-9.3 169.2-25.3zM0 346.1c14.9 11.8 34 21.2 54.8 28.6C99.7 390.7 159.5 400 224 400s124.3-9.3 169.2-25.3c20.8-7.4 39.9-16.9 54.8-28.6V432c0 44.2-100.3 80-224 80S0 476.2 0 432V346.1z" />
                                </svg>
                            </a>
                            </div>
                            <h5 class="mb-4 text-lg font-bold">function2</h5>
                        </div>

                        {/* Function 3 */}
                        <div class="mb-12 md:mb-0">
                            <div class="mb-6 inline-block rounded-md bg-primary-100 p-4 text-primary">
                            {/* Link to specific feature */}
                            <a href="">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 512 512" stroke-width="2"
                                    stroke="currentColor" class="w-[50px] h-[50px] fill-[#ffffff]">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M96 0C60.7 0 32 28.7 32 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H96zM208 288h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H144c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V80zM496 192c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm16 144c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V336z" />
                                </svg>
                            </a>
                            </div>
                            <h5 class="mb-4 text-lg font-bold">function3</h5>
                        </div>
                    </div>
                </section>
                {/* Section: Design Block end */}

            </div>

            {/* Divider */}
            <hr class="h-[2px] bg-gray-100 dark:bg-gray-600 my-10 border-none" />

            {/* Section heading */}
            <h3 class="text-3xl font-bold mb-4">My books</h3>

            {/* Grid */}
            <div class="grid grid-cols-3 gap-8 mt-9">

            {/* Displaying all the books inside grid */}
            {bookArr.map((item, index) => {
                return (
                    <div key={index}>

                        {/* Whole card */}
                        <div class="block rounded-lg bg-white shadow-lg dark:bg-neutral-700 text-center">

                            {/* Card image */}
                            <center>
                                <a href="#!">
                                    <img class="t-lg" src={item.attributes.cover.data.attributes.formats.thumbnail.url} alt=""/>
                                </a>
                            </center>

                            {/* Divider line */}
                            <hr class="h-[2px] bg-gray-100 my-10000 border-none" />

                            {/* Card body */}
                            <div class="p-6">

                                {/* Book title */}
                                <h5 class="mb-2 text-xl font-bold tracking-wide text-neutral-800 dark:text-neutral-50">
                                {item.attributes.name}
                                </h5>

                                {/* Button */}
                                <a href={item.attributes.book_id}
                                class="mt-3 inline-block rounded bg-blue-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
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