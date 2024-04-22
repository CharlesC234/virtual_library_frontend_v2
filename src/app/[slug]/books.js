"use client";
import { usePathname } from 'next/navigation'


// export default function ExampleClientComponent() {
//     const pathname = usePathname()
//     return <p>Current pathname: {pathname}</p>
// }

export default function Books() {

    return <main>


        <div class="container my-24 mx-auto md:px-6">
            
            {/* Book info block */}
            <section class="mb-32">
                <div
                    class="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                    <div class="flex flex-wrap items-center">
                        {/* Book cover */}
                        <div class="hidden shrink-0 grow-0 basis-auto lg:flex lg:w-6/12 xl:w-4/12">
                            <img src="https://strapi-aws-s3-books-bucket.s3.us-east-1.amazonaws.com/thumbnail_The_Two_Towers_cover_ac11f0bc59.gif" alt="Trendy Pants and Shoes"
                                class="w-full rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg" />
                        </div>
                        {/* Book text info container */}
                        <div class="w-full shrink-0 grow-0 basis-auto lg:w-6/12 xl:w-8/12">
                            <div class="px-6 py-12 md:px-12">
                                <h2 class="mb-4 text-2xl font-bold">
                                Book Title
                                </h2>
                                
                                <p class="mb-6 text-neutral-500 dark:text-neutral-300">
                                Book description: xxxxxxxx xxx xxx xxx xxxxxxxxxx xxx xxx xx xxxxx xxx xxxxxx xx xxx xxxx 
                                xxx xxxxxxxx xxx xxx xxx xxxxxxxxxx xxx xxx xx xxxxx xxx xxxxxx xx xxx xxxx xxx
                                xxxxxxxx xxx xxx xxx xxxxxxxxxx xxx xxx xx xxxxx xxx xxxxxx xx xxx xxxx xxx
                                xxxxxxxx xxx xxx xxx xxxxxxxxxx xxx xxx xx xxxxx xxx xxxxxx xx xxx xxxx xxx
                                xxxxxxxx xxx xxx xxx xxxxxxxxxx xxx xxx xx xxxxx xxx xxxxxx xx xxx xxxx xxx
                                </p>
                                
                                {/* Button row */}
                                <div
                                    class="inline-flex bg-blue-500 rounded-md shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-1 dark:focus:shadow-dark-1 dark:active:shadow-dark-1"
                                    role="group">
                                    
                                    {/* Link for functionality */}
                                    <a href="">
                                        <button
                                            type="button"
                                            class="inline-block rounded-s bg-primary-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-blue-600 focus:bg-primary-accent-300 focus:outline-none focus:ring-0 active:bg-primary-600 motion-reduce:transition-none"
                                            data-twe-ripple-init
                                            data-twe-ripple-color="light">
                                            Read
                                        </button>
                                    </a>

                                    {/* Extra button that fits in middle */}
                                    {/* <button
                                        type="button"
                                        class="inline-block bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-blue-600 focus:bg-primary-accent-300 focus:outline-none focus:ring-0 active:bg-primary-600 motion-reduce:transition-none"
                                        data-twe-ripple-init
                                        data-twe-ripple-color="light">
                                        Middle
                                    </button> */}

                                    {/* Link for functionality */}
                                    <a href="">
                                        <button
                                            type="button"
                                            class="inline-block rounded-e bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-blue-600 focus:bg-primary-accent-300 focus:outline-none focus:ring-0 active:bg-primary-600 motion-reduce:transition-none"
                                            data-twe-ripple-init
                                            data-twe-ripple-color="light">
                                            Edit
                                        </button>
                                    </a>
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