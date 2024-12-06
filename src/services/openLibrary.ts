export interface OpenLibraryBook {
  title: string;
  authors: { name: string }[];
  number_of_pages: number;
  publish_date: string;
  subjects?: string[];
}

export async function searchByISBN(isbn: string): Promise<OpenLibraryBook | null> {
  try {
    const response = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`);
    const data = await response.json();
    const book = data[`ISBN:${isbn}`];
    return book || null;
  } catch (error) {
    console.error('Error fetching book data:', error);
    return null;
  }
}