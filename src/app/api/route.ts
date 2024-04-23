"use server";
// api/route.ts
import { serialize } from "cookie";

async function getCredentials(user){

    async function getStrapiData(){
        const baseUrl = `https://virtuallibrarybackendstrapi-production.up.railway.app/api/library-users?populate=*&filters[username][$eq]=${user}`;
        try{
            const response = await fetch(baseUrl);
            const data = await response.json();
            return data;
        }
        catch(error){
            console.error(error);
        }
      } 


    const data = await getStrapiData();
    //console.log("hello " + JSON.stringify(data.data[0].attributes));
    return data.data[0].attributes.password;
}



export async function POST(request: Request, params: { slug: string }) {
//console.log("here");

const data: { password: string, username: string } = await request.json();
const password = data.password;
const user = data.username;

const decodedString = await getCredentials(user);
//console.log("Decoded String:", decodedString);

//console.log(data);
//console.log(password);

if (decodedString !== password) {
return new Response("incorrect password", {
status: 401,
});
}

return new Response("password correct", {
status: 200,
});
}