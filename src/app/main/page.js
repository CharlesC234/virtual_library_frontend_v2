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

  async function navigateToPage(){
    try{

    }
    catch(error){
      console.error(error);
    }
  }

  //newHomeData = await getStrapiData("home-page");
  newBooksData = await getStrapiData("books?populate[cover][populate]=*");

  return (

    <div>
      <Main 
      
      booksData={newBooksData}



      />
    </div>
  );
}