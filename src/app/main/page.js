"use sever";
import "../globals.css";
import Main from "./main";

export default async function MainPage({}) {
  
  let dataNew = null;

  async function getStrapiData(){
    const baseUrl = "https://virtuallibrarybackendstrapi-production.up.railway.app/api/home-page";
    try{
        const response = await fetch(baseUrl);
        const data = await response.json();
        return data;
    }
    catch(error){
        console.error(error);
    }
  }

  dataNew = await getStrapiData();

  return (

    <div>
      <Main data={dataNew}/>
    </div>
  );
}