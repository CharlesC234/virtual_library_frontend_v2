"use server";

async function getStrapiData(user, author, before, after, category){
    const baseUrl = `https://virtuallibrarybackendstrapi-production.up.railway.app/api/library-users?populate=*&filters[username][$eq]=${user}`;
   //console.log("url: " + baseUrl);
    try{
        const response = await fetch(baseUrl);
        const data = await response.json();
        return data;
    }
    catch(error){
        console.error(error);
    }
  } 


  async function getStrapiDataEachBook(bookName, author, before, after, category){

    let filters = `&filters[name][$eq]=${bookName}`;
    if(author != null && author != "null" && author != ""){
        filters = filters + `&filters[author][$eq]=${author}`
    }
    if(before != null && before != "null" && before != ""){
        filters = filters + `&filters[publication_year][$lt]=${before}`
    }
    if(after != null && after != "null" && after != ""){
        filters = filters + `&filters[publication_year][$gt]=${after}`
    }
    if(category != null && category != "null" && category != ""){
        filters = filters + `&filters[category][$eq]=${category}`
    }
    
    const baseUrl = `https://virtuallibrarybackendstrapi-production.up.railway.app/api/books?populate=*` + filters;

    //console.log("url: " + baseUrl);
    try{
        const response = await fetch(baseUrl);
        const data = await response.json();
        return data;
    }
    catch(error){
        console.error(error);
    }
  }
  
  export async function getStrapiDataEachBookwID(bookID){
    const baseUrl = `https://virtuallibrarybackendstrapi-production.up.railway.app/api/books?populate=*&filters[book_id][$eq]=${bookID}`;
    try{
        const response = await fetch(baseUrl);
        const data = await response.json();
        return data;
    }
    catch(error){
        console.error(error);
    }
  } 

  export const deleteBook = async (bookID) => {
      try {
        const response = await fetch(`https://virtuallibrarybackendstrapi-production.up.railway.app/api/books/${bookID}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } 
      catch (error) {
        console.error(error);
      } 
  };
  
  export default async function getBooksForUser(user, author, before, after, category) {
    const res = await getStrapiData(user, author, before, after, category);
  
    const tempArr = await Promise.all(
      res.data[0].attributes.books.data.map(async (book) => {
        const bookRes = await getStrapiDataEachBook(book.attributes.name, author, before, after, category);
        return bookRes.data[0];
      })
    );
  
    return tempArr;
  }

  
  export async function getPublicBooks(author, before, after, category){
    let filters2 = `&filters[public][$eq]=true`;
    if(author != null && author != "null" && author != ""){
        filters2 = filters2 + `&filters[author][$eq]=${author}`
    }
    if(before != null && before != "null" && before != ""){
        filters2 = filters2 + `&filters[publication_year][$lt]=${before}`
    }
    if(after != null && after != "null" && after != ""){
        filters2 = filters2 + `&filters[publication_year][$gt]=${after}`
    }
    if(category != null && category != "null" && category != ""){
        filters2 = filters2 + `&filters[category][$eq]=${category}`
    }
    const baseUrl = `https://virtuallibrarybackendstrapi-production.up.railway.app/api/books?populate=*${filters2}`;
    //console.log("url: " + baseUrl);
     try{
         const response = await fetch(baseUrl);
         const data = await response.json();
         return data.data;
     }
     catch(error){
         console.error(error);
     }
  }