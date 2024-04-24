
"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import PasswordChecklist from "react-password-checklist"

export default function CreateAccount() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(null);
  const [fieldsIncomplete, setFieldsIncomplete] = useState(false);
  const router = useRouter();


  function send() {
    // console.log(uploadedBook);
    // console.log(uploadedCover);
    try {
      fetch(`https://virtuallibrarybackendstrapi-production.up.railway.app/api/library-users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            username: username,
            password: password,
            email: email,
          },
        }),
      }).then((res) => {console.log(res);
        router.push("/")})}catch(error){
        console.log(error);
      };
    }

  return  <div class="flex my-auto min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-20 w-auto" src="https://www.svgrepo.com/show/475352/book.svg" alt="Your Company"/>
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-300">Create Account</h2>
    </div>
  
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-300">Username</label>
          <div class="mt-2">
            <input onChange={(e) => setUsername(e.target.value)} id="username" name="username" type="username" autocomplete="username" required class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-300">Email</label>
          </div>
          <div class="mt-2">
            <input onChange={(e) => setEmail(e.target.value)} id="password" name="password" type="email" autocomplete="current-password" required class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
          </div>
        </div>

  
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-300">Password</label>
          </div>
          <div class="mt-2">
            <input onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="text" autocomplete="current-password" required class="bg-gray-50 mb-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            <PasswordChecklist
               rules={["minLength","number"]}
               minLength={10}
               value={password}
           />
          </div>
        </div>

  
        <div>
        <p className={`font-bold text-rose-600 mb-2 ${fieldsIncomplete ? "visible" : "hidden"}`}>Please Fill Out All Fields!</p>
       <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => {
                  if(username == null || password == "" || email == null || password.length < 10 || !(/\d/.test(password))){
                    setFieldsIncomplete(true);
                  }else{
                    send();
                  }}
                }
              >
                {" "}
                Submit{" "}
              </button>
        </div>
      </div>
  
      <p class="mt-10 text-center text-sm text-gray-500">
        Back to login
        <a href="/" class="ms-3 font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Click Here</a>
      </p>
    </div>
  </div>
}