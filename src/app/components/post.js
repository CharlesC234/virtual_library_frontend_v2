"use server";
export async function Post(username, bookName, author, description, isbn, publisher, year, category, uploadedCover, uploadedBook, isPublic) {
    //console.log(uploadedBook);
    //console.log(uploadedCover);
    try {
      const formData = new FormData();
      fetch(`https://virtuallibrarybackendstrapi-production.up.railway.app/api/books/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            name: bookName,
            author: author,
            isbn: isbn,
            description: description,
            public: isPublic,
            publication_year: year,
            category: category,
            publisher: publisher,
            user_id: username,
          },
        }),
      }).then((res) => {
        res.json().then((response) => {
            // Create a FormData object to send the image data
            fetch(uploadedCover.url)
            .then(res2 => res2.blob())
            .then(blob => {
            formData.append('files', coverFile, uploadedCover.name)
            // Upload
            formData.append('ref', 'api::book.book');
            formData.append('refId', response.data.id);
            formData.append('field', 'cover');

            // Make a POST request using fetch
            fetch(`https://virtuallibrarybackendstrapi-production.up.railway.app/api/upload`, {
              method: 'POST',
              body: formData,
          })

           // Create a FormData object to send the image data
           fetch(uploadedBook.url)
           .then(res3 => res3.blob())
           .then(blob => {
           formData.append('files', bookFile, uploadedBook.name)
           // Upload
           formData.append('ref', 'api::book.book');
           formData.append('refId', response.data.id);
           formData.append('field', 'pdf');

           // Make a POST request using fetch
           fetch(`https://virtuallibrarybackendstrapi-production.up.railway.app/api/upload`, {
             method: 'POST',
             body: formData,
         })
        });
      });
        
      })})} catch (error) {
      console.error(error);
      return null;
    }
  }