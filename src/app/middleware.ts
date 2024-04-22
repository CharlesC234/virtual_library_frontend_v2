// import { NextResponse } from 'next/server'
// import Login from './app/login/page'
// import { cookies } from 'next/headers'


// async function getCredentials(user){

//   async function getStrapiData(){
//       const baseUrl = `https://virtuallibrarybackendstrapi-production.up.railway.app/api/library-users?populate=*&filters[username][$eq]=${user}`;
//       try{
//           const response = await fetch(baseUrl);
//           const data = await response.json();
//           return data;
//       }
//       catch(error){
//           console.error(error);
//       }
//     } 


//   const data = await getStrapiData();
//   console.log("hello " + JSON.stringify(data.data[0].attributes));
//   return data.data[0].attributes.password;
// }



// async function Check(user, password) {
// console.log("here");

// const decodedString = await getCredentials(user);
// console.log("Decoded String:", decodedString);

// console.log(password);

// if (decodedString !== password) {
// return "INCORRECT";
// }

// return "CORRECT"
// }



// export default async function middleware(req) {
//   const path = req.nextUrl.pathname
//   console.log(req.nextUrl.searchParams.get('u'));

//   if(req.nextUrl.searchParams){
//   if(req.nextUrl.searchParams.get('u') && req.nextUrl.searchParams.get('p')){
//      const username = atob(req.nextUrl.searchParams.get('u'));
//      const password = atob(req.nextUrl.searchParams.get('p'));

//       const request = await Check(username, password);
    
//       if (request !== "CORRECT"){
//          return NextResponse.redirect(new URL(`/login?path=${path.substring(1)}`, req.nextUrl))
//       }else {
//          return NextResponse.next();
//         }
//   }}

//   if(path != "/login"){
//     return NextResponse.redirect(new URL(`/login?path=/${path.substring(1)}`, req.nextUrl))
//   }

//   return NextResponse.next();
// }
 
// // Routes Middleware should not run on
// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// }