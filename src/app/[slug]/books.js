"use client";
import { usePathname } from 'next/navigation'
import { useEffect, useState } from "react";
import { getStrapiDataEachBookwID } from "../components/getBookArray";
import { deleteBook } from "../components/getBookArray";
import { useRouter } from "next/navigation";

export default function Books() {
    const [bookArr, setBookArr] = useState(null); // Initialize with null
    const pathname = usePathname().slice(1);
    const router = useRouter();
    let username = "";
    if (typeof window !== 'undefined') {
    username = localStorage.getItem("username");
    }

    useEffect(() => {
        if(!bookArr){ // Check if bookArr is falsy
            getStrapiDataEachBookwID(pathname).then((res) => {
                setBookArr(res);
            });
        }
    }, [bookArr]); // Add bookArr to dependency array

    //console.log(bookArr.data[0].attributes);

    if(!bookArr){
        return <main></main>
    }
    else{
        // console.log(username)
    return <main>
        <div class="container my-24 mx-auto md:px-6">
            
            {/* Book info block */}
            <section class="mb-32">
                <div
                    class="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                    <div class="flex flex-wrap items-center">
                        {/* Book cover */}
                        <div class="hidden shrink-0 grow-0 basis-auto lg:flex lg:w-6/12 xl:w-4/12">
                            <img src={bookArr.data[0].attributes.cover.data.attributes.url} alt=""
                                class="w-full rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg" />
                        </div>
                        {/* Book text info container */}
                        <div class="w-full shrink-0 grow-0 basis-auto lg:w-6/12 xl:w-8/12">
                            <div class="px-6 py-12 md:px-12">
                                <h2 class="mb-4 text-2xl font-bold">
                                {bookArr.data[0].attributes.name}
                                </h2>
                                
                                <p class="mb-6 text-neutral-500 dark:text-neutral-300">
                                {bookArr.data[0].attributes.description}
                                </p>
                                
                                <p class="mb-6 text-neutral-500 dark:text-neutral-300">
                                Written by: {bookArr.data[0].attributes.author}
                                </p>

                                <p class="mb-6 text-neutral-500 dark:text-neutral-300">
                                Published by: {bookArr.data[0].attributes.publisher}, {bookArr.data[0].attributes.publication_year}
                                </p>

                                <p class="mb-6 text-neutral-500 dark:text-neutral-300">
                                <em>
                                    Genre: {bookArr.data[0].attributes.category}
                                </em>
                                </p>
                                
                                {/* Button row */}
                                <div
                                    class="inline-flex bg-blue-500 rounded-md shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-1 dark:focus:shadow-dark-1 dark:active:shadow-dark-1"
                                    role="group">
                                    
                                    {/* Read book button */}
                                    <a target="_blank" href={bookArr.data[0].attributes.pdf.data.attributes.url} rel="noopener noreferrer">
                                        <button
                                            type="button"
                                            class="inline-block rounded-s bg-primary-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-blue-600 focus:bg-primary-accent-300 focus:outline-none focus:ring-0 active:bg-primary-600 motion-reduce:transition-none"
                                            data-twe-ripple-init
                                            data-twe-ripple-color="light">
                                            Read
                                        </button>
                                    </a>

                                    {/* Edit book button */}
                                    <button
                                        onClick={() => {router.push(`/edit?id=${bookArr.data[0].id}`)}}
                                        type="button"
                                        class="inline-block bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-blue-600 focus:bg-primary-accent-300 focus:outline-none focus:ring-0 active:bg-primary-600 motion-reduce:transition-none"
                                        data-twe-ripple-init
                                        data-twe-ripple-color="light">
                                        Edit
                                    </button>

                                    {/* Delete book button */}
                                    <button
                                        type="button"
                                        class="inline-block rounded-e bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-blue-600 focus:bg-primary-accent-300 focus:outline-none focus:ring-0 active:bg-primary-600 motion-reduce:transition-none"
                                        data-twe-ripple-init
                                        data-twe-ripple-color="light"
                                        onClick={() => bookArr.data[0].attributes.user_id == username ? window.confirm("Are you sure you would like to delete this book?") ? deleteBook(bookArr.data[0].id) ? router.push("/") : console.log("Failed to delete book") : console.log("User decided not to delete book") : window.alert("You do not own this book.")}
                                        >
                                        Delete
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Book info block */}
        </div>
    </main>
    }
}