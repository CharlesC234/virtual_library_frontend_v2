"use client";

import { useEffect, useState } from "react";
import getBooksForUser from "../components/getBookArray";
import sortByLevenshteinDistance from "../components/sortBookArray";
import { useSearchParams } from "next/navigation";
import { getPublicBooks } from "../components/getBookArray";

export default function Main() {
    const [bookArr, setBookArr] = useState(null);
    let username = "";
    if (typeof window !== 'undefined') {
    username = localStorage.getItem("username");
    }
    const searchParams = useSearchParams();
    const query = searchParams.get('query')
    const [sortedArray, setSortedArray] = useState([]);
    const authorFilter = searchParams.get('author');
    const beforeQuery = searchParams.get('before');
    const afterQuery = searchParams.get('after');
    const categoryQuery = searchParams.get('category');

    useEffect(() => {
        if(username != null && username != "null" && bookArr == null){
        getBooksForUser(username, authorFilter, beforeQuery, afterQuery, categoryQuery).then((res) => {
            getPublicBooks(authorFilter, beforeQuery, afterQuery, categoryQuery).then((res2) => {
                const combinedArray = Array.from(new Set([...res, ...res2]));
                setBookArr(combinedArray);
                sortByLevenshteinDistance(combinedArray, query).then((res3) => {
                    const temp = [res3[0]];
                    for(let i = 1; i < res3.length; i++){
                        if(res3[i].attributes.name != res3[i - 1].attributes.name){
                            temp.push(res3[i]);
               
                        }
                    }
                    setSortedArray(temp);
                  })
            })
        })
        }
    })

    if(sortedArray[0] == undefined){
        return <div class="container flex mt-10 mx-auto justify-center"><h1 className="font-bold text-2xl justify-center">No Results</h1></div>
    }else{

    return <div class="container flex mx-auto mt-10 justify-center relative overflow-x-auto shadow-md sm:rounded-lg">
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
                <th scope="row" class="flex text-gray-900 whitespace-nowrap dark:text-white">
                <a class="flex items-center w-full" href={item.attributes.book_id}>
                    <div className="items-center px-6 py-4 flex flex-row">
                    <img class="w-10 h-10 rounded-full" src={item.attributes.cover.data.attributes.url}/>
                    <div class="ps-3">
                        <div class="text-base font-semibold">{item.attributes.name}</div>
                    </div>  
                    </div>
                    </a>
                </th>
                <td>
                <a className="p-0 w-full h-full" href={item.attributes.book_id}>
                    <div className="px-6 py-4">
                    {item.attributes.author}
                    </div>
                    </a>
                </td>
                <td>
                <a href={item.attributes.book_id}>
                    <div className="px-6 py-4">
                    <div class="flex items-center"> {item.attributes.isbn}
                    </div>
                    </div>
                    </a>
                </td>
            </tr>
        })}
        </tbody>
    </table>
</div>
    }

}