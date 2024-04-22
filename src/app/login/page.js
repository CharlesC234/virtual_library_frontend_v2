// components/PasswordPromptDialog.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

export default function Login({children}) {
  // const [approved, setApproved] = useState(false);
  // const [password, setPassword] = useState("");
  // const [username, setUsername] = useState("");
  // const searchParams = useSearchParams()
  // const router = useRouter();
 
  // const path = searchParams.get('path')

  // const check = async () => {
  //   console.log("checking");
  //   const request = await fetch(`/api`, {
  //     body: JSON.stringify({ password, username }),
  //     headers: { "Content-Type": "application/json" },
  //     method: "POST",
  //   });
  //   console.log(request.status);
  
  //   if (request.status !== 200){
  //     setApproved(false);
  //   }else {
  //     if(localStorage.getItem("username") == null || localStorage.getItem("password") == null || localStorage.getItem("password") == "null" || localStorage.getItem("username") == "null"){
  //     localStorage.setItem("username", username);
  //     localStorage.setItem("password", password);
  //     window.location.reload();
  //     }else{
  //     setApproved(true);
  //     }
  //   }
  // };

  // console.log("approved " + approved);

  // if(!approved){
  //   console.log(localStorage.getItem("username"));
  //   if(localStorage.getItem("username") == null || localStorage.getItem("password") == null || localStorage.getItem("password") == "null" || localStorage.getItem("username") == "null"){
  //     return (
  //       <div className="password-prompt-dialog">
  //         <h2 className="font-4xl text-bold mt-4 mb-3">Login</h2>
  //           <label htmlFor="password">Username:</label>
  //           <input
  //             className="border-2 ms-2 me-3 rounded bg-black text-white border-blue"
  //             type="username"
  //             id="username"
  //             onChange={(e) => setUsername(e.target.value)}
  //             //   value={password}
  //             //   onChange={(e) => setPassword(e.target.value)}
  //           />
  //           <label htmlFor="password">Password:</label>
  //           <input
  //             className="border-2 ms-2 me-2 rounded bg-black text-white border-blue"
  //             type="password"
  //             id="password"
  //             value={password}
  //             onChange={(e) => setPassword(e.target.value)}
  //           />
  //           <button
  //             type="submit"
  //             className="me-4 bg-gray-500 rounded p-1 px-2 text-white ms-2"
  //             onClick={() => {
  //               check();}
  //             }
  //           >
  //             {" "}
  //             Submit{" "}
  //           </button>
  //       </div>
  //     );
  //   }else{
  //     if(username == ""){setUsername(localStorage.getItem("username"))};
  //     if(password == ""){setPassword(localStorage.getItem("password"))};
  //     check();
  //   }

  // }else{
  //   //encode username and password:
  //   console.log("Hereeeee");
  //   let encodedUsername = btoa(localStorage.getItem("username"));
  //   let encodedPassword = btoa(localStorage.getItem("password"));
  //   console.log(`${path}?u=${encodedUsername}&p=${encodedPassword}`);
  //   router.push(`${path}?u=${encodedUsername}&p=${encodedPassword}`);
  // }
  const [approved, setApproved] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  async function check(){
    console.log("checking");
    const request = await fetch(`/api`, {
      body: JSON.stringify({ password, username }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
    console.log(request.status);
  
    if (request.status !== 200){
      setApproved(false);
    }else {
      if(localStorage.getItem("username") == "null" || localStorage.getItem("password") == "null"){
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      window.location.reload();
      }else{
      setApproved(true);
      }
    }
  };


  if(!approved){

    if(localStorage.getItem("username") == "null" || localStorage.getItem("password") == "null" || localStorage.getItem("username") == null || localStorage.getItem("password") == null || !localStorage.getItem("password") || !localStorage.getItem("username")){
      return (


        // <div className="password-prompt-dialog">
        //   <h2 className="font-4xl text-bold mt-4 mb-3">Login</h2>
        //     <label htmlFor="password">Username:</label>
        //     <input
        //       className="border-2 border-black ms-2 me-3 rounded"
        //       type="username"
        //       id="username"
        //       onChange={(e) => setUsername(e.target.value)}
        //       //   value={password}
        //       //   onChange={(e) => setPassword(e.target.value)}
        //     />
        //     <label htmlFor="password">Password:</label>
        //     <input
        //       className="border-2 border-black ms-2 me-2 rounded"
        //       type="password"
        //       id="password"
        //       value={password}
        //       onChange={(e) => setPassword(e.target.value)}
        //     />
        //     <button
        //       type="submit"
        //       className="me-4 bg-gray-500 rounded p-1 px-2 text-white ms-2"
        //       onClick={() => {
        //         check();}
        //       }
        //     >
        //       {" "}
        //       Submit{" "}
        //     </button>
        // </div>



<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img class="mx-auto h-20 w-auto" src="https://www.svgrepo.com/show/475352/book.svg" alt="Your Company"/>
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-300">Sign in to your virtual library</h2>
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
          <label for="password" class="block text-sm font-medium leading-6 text-gray-300">Password</label>
          <div class="text-sm">
            <a href="/" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>
        </div>
        <div class="mt-2">
          <input onChange={(e) => setPassword(e.target.value)} value={password} id="password" name="password" type="password" autocomplete="current-password" required class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        </div>
      </div>

      <div>
     <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => {
                check();}
              }
            >
              {" "}
              Submit{" "}
            </button>
      </div>
    </div>

    <p class="mt-10 text-center text-sm text-gray-500">
      Don't have an account?
      <a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Create One Here</a>
    </p>
  </div>
</div>
      );
    }else{
      if(username == ""){setUsername(localStorage.getItem("username"))};
      if(password == ""){setPassword(localStorage.getItem("password"))};
      check();
    }

  }else{
    return <div>{children}</div>
  }
}