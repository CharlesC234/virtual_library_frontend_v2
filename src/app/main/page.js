"use sever";
import "../globals.css";
import Main from "./main";

export default async function MainPage({}) {
  
  let newHomeData, newBooksData = null;

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

  newHomeData = await getStrapiData("home-page");
  newBooksData = await getStrapiData("books/1");

  return (

    <div>
      <Main 
      homeData={newHomeData}
      booksData={newBooksData}
      />
    </div>
  );
}