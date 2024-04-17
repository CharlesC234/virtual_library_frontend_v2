"use client";
import {getStrapiData} from "./page.js";

/*
In order to access the variable fetched from the database if it is a collection type it will be in an array.
if it is a single type then it will be just a normal variable call appended to the end of the stored value
as seen there is data(name of variable) .data(this is where either the array is present or not)
.attributes(this is where each of the fields of the given piece of data are) .nameofattribute(this can be whatever name you want of which attribute)
*/

export default function Main({data}) {

    return <main>
        
        <h1 className="bg-red-500 text-5xl font-bold">{data.data.attributes.title}</h1>
        <p className="bg-red-500 text-xl mt-4">{data.data.attributes.description}</p>

{/*     Commenting out basic testing text     
        
        <div class="text-5xl font-extrabold ...">
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-gray-50 to-blue-500">
            Main Page
            </span>
        </div>  
        
        
        <button class="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
            Test Button
        </button>

        
        <div
            class="relative flex"
            data-twe-input-wrapper-init
            data-twe-input-group-ref>
            <input
                type="search"
                class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                placeholder="Search"
                aria-label="Search"
                id="exampleFormControlInput"
                aria-describedby="basic-addon1" />
            <label
                for="exampleFormControlInput"
                class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                >Search
            </label>
            <button
                class="relative z-[2] -ms-0.5 flex items-center rounded-e bg-primary px-5  text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                type="button"
                id="button-addon1"
                data-twe-ripple-init
                data-twe-ripple-color="light">
                <span class="[&>svg]:h-5 [&>svg]:w-5">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor">
                    <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                </span>
            </button>
        </div> 
*/}

    </main>
    
}