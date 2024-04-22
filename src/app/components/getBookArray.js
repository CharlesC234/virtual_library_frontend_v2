"use server";

async function getStrapiData(user){
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


  async function getStrapiDataEachBook(bookName){
    const baseUrl = `https://virtuallibrarybackendstrapi-production.up.railway.app/api/books?populate=*&filters[name][$eq]=${bookName}`;
    try{
        const response = await fetch(baseUrl);
        const data = await response.json();
        return data;
    }
    catch(error){
        console.error(error);
    }
  } 


  export default async function getBooksForUser(user) {
    const res = await getStrapiData(user);
  
    const tempArr = await Promise.all(
      res.data[0].attributes.books.data.map(async (book) => {
        const bookRes = await getStrapiDataEachBook(book.attributes.name);
        return bookRes.data[0];
      })
    );
  
    return tempArr;
  }