"use client";

import { useEffect, useState } from "react";
import getBooksForUser from "../components/getBookArray";
import sortByLevenshteinDistance from "../components/sortBookArray";
import { useSearchParams } from "next/navigation";

export default function Main() {
    const [bookArr, setBookArr] = useState(null);
    let username = "";
    if (typeof window !== 'undefined') {
    username = localStorage.getItem("username");
    }
    const searchParams = useSearchParams();
    const query = searchParams.get('query')
    const [sortedArray, setSortedArray] = useState([]);

    useEffect(() => {
        if(username != null && username != "null" && bookArr == null){
        getBooksForUser(username).then((res) => {
            setBookArr(res);
            sortByLevenshteinDistance(res, query).then((res2) => {
                setSortedArray(res2);
              })
        })
        }
    })

    //console.log("username: " + username);
    //console.log("bookArr: " + bookArr);
    //console.log("query" + query);
    //console.log("sortedArr: " + sortedArray);

    return <div class="container flex mx-auto mt-5 justify-center relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
      <th scope="col" class="px-6 py-3">Name</th>
      <th scope="col" class="px-6 py-3">Author</th>
      <th scope="col" class="px-6 py-3">ISBN</th>
    </tr>
        </thead>
        <tbody>
        {sortedArray.map((item, index) => {
        return <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <img class="w-10 h-10 rounded-full" src={item.attributes.cover.data.attributes.url}/>
                    <div class="ps-3">
                        <div class="text-base font-semibold">{item.attributes.name}</div>
                    </div>  
                </th>
                <td class="px-6 py-4">
                    {item.attributes.author}
                </td>
                <td class="px-6 py-4">
                    <div class="flex items-center"> {item.attributes.isbn}
                    </div>
                </td>
            </tr>
        })}
        </tbody>
    </table>
</div>


}