"use client";

/*
In order to access the variable fetched from the database if it is a collection type it will be in an array.
if it is a single type then it will be just a normal variable call appended to the end of the stored value
as seen there is homeData(name of variable) .data(this is where either the array is present or not)
.attributes(this is where each of the fields of the given piece of data are) .nameofattribute(this can be whatever name you want of which attribute)
*/

export default function Main({homeData, booksData}) {

    //console.log(booksData.data);

    return <main>

        <section class="text-center text-neutral-600 dark:text-neutral-200">

            {/* Main headings */}
            <h1 class="text-5xl font-bold mb-5">Home Page</h1>
            <h4 class="text-2xl italic text-neutral-500 dark:text-neutral-400 mb-8">The at-home Virtual Library</h4>

            {/* Additional Options Dividers */}
            <hr class="h-[2px] bg-gray-100 dark:bg-gray-600 my-10 border-none" />

            {/* Section heading */}
            {/* <h3 class="text-3xl font-bold mb-6">Where to?</h3> */}

            <div class="container my-120 mx-auto md:px-6">
                {/* Section: navigation buttons block */}
                <section class="mb-320 text-center">
                    <div class="grid gap-x-6 md:grid-cols-3 lg:gap-x-12">
                        
                        {/* Function 1 */}
                        <div class="mb-12 md:mb-0">
                            <div class="mb-6 inline-block rounded-md bg-primary-100 p-4 text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 512 512" stroke-width="2"
                                stroke="currentColor" class="w-[50px] h-[50px] fill-[#ffffff]">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                            </svg>
                            </div>
                            <h5 class="mb-4 text-lg font-bold">Add book</h5>
                        </div>

                        {/* Function 2 */}
                        <div class="mb-12 md:mb-0">
                            <div class="mb-6 inline-block rounded-md bg-primary-100 p-4 text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24" stroke-width="2"
                                stroke="currentColor" class="h-6 w-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                            </svg>
                            </div>
                            <h5 class="mb-4 text-lg font-bold">function2</h5>
                        </div>

                        {/* Function 3 */}
                        <div class="mb-12 md:mb-0">
                            <div class="mb-6 inline-block rounded-md bg-primary-100 p-4 text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                stroke="currentColor" class="h-6 w-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                            </svg>
                            </div>
                            <h5 class="mb-4 text-lg font-bold">function3</h5>
                        </div>
                    </div>
                </section>
                {/* Section: Design Block */}
            </div>

            {/* Divider */}
            <hr class="h-[2px] bg-gray-100 dark:bg-gray-600 my-10 border-none" />

            {/* Section heading */}
            <h3 class="text-3xl font-bold mb-4">My books</h3>

            {/* Grid */}
            <div class="grid grid-cols-3 gap-8 mt-9">

            {/* Displaying all the books inside grid */}
            {booksData.data.map((item) => {
                return (
                    <div>

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

                                {/* Description */}
                                {/* <p class="mb-2 text-base text-neutral-500 dark:text-neutral-300">
                                {item.attributes.description}
                                </p> */}

                                {/* Button */}
                                <a href="http://localhost:3000/books"
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