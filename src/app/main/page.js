"use sever";
import "../globals.css";
import Main from "./main";

export default async function MainPage({}) {
  
  let newBooksData = null;

  async function getStrapiData(path){
    const baseUrl = "https://virtuallibrarybackendstrapi-production.up.railway.app/api/";
    try{
        const response = await fetch(baseUrl + path);
        const data = await response.json();
        return data;
    }
    catch(error){
        console.error(error);
    }
  }

  newBooksData = await getStrapiData("books?populate[cover][populate]=*");

  return (

    <div>
      <Main 
      
      booksData={newBooksData}



      />
    </div>
  );
}