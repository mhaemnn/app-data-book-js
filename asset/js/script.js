document.addEventListener("DOMContentLoaded", function () {
  loadBooks();
});

function loadBooks() {
  const belumSelesaiShelf = document.getElementById("shelf-belum");
  const selesaiShelf = document.getElementById("shelf-selesai");

  const books = JSON.parse(localStorage.getItem("books")) || [];

  belumSelesaiShelf.innerHTML = "";
  selesaiShelf.innerHTML = "";

  books.forEach((book) => {
    const bookCard = createBookCard(book);
    if (book.isComplete) {
      selesaiShelf.appendChild(bookCard);
    } else {
      belumSelesaiShelf.appendChild(bookCard);
    }
  });
}

function addBook() {
  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const yearInput = document.getElementById("year");
  const statusInput = document.getElementById("status");

  const title = titleInput.value;
  const author = authorInput.value;
  const year = parseInt(yearInput.value);
  const isComplete = statusInput.value === "selesai";

  if (title && author && !isNaN(year) && year > 0) {
    const newBook = {
      id: generateId(),
      title,
      author,
      year,
      isComplete,
    };

    const books = JSON.parse(localStorage.getItem("books")) || [];

    books.push(newBook);

    localStorage.setItem("books", JSON.stringify(books));

    titleInput.value = "";
    authorInput.value = "";
    yearInput.value = "";
    loadBooks();
  } else {
    alert("Harap isi semua informasi buku dengan benar!");
  }
}

function generateId() {
  return new Date().getTime();
}

function createBookCard(book) {
  const card = document.createElement("div");
  card.className = "book-card";
  card.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Penulis:</strong> ${book.author}</p>
        <p><strong>Tahun:</strong> ${book.year}</p>
        <p><strong>Status:</strong> ${
          book.isComplete ? "Selesai Dibaca" : "Belum Selesai"
        }</p>
        <button onclick="moveBook(${book.id})">Pindahkan</button>
        <button onclick="deleteBook(${book.id})">Hapus</button>
    `;
  return card;
}

function moveBook(id) {
  const books = JSON.parse(localStorage.getItem("books")) || [];

  const updatedBooks = books.map((book) => {
    if (book.id === id) {
      book.isComplete = !book.isComplete;
    }
    return book;
  });

  localStorage.setItem("books", JSON.stringify(updatedBooks));

  loadBooks();
}

function deleteBook(id) {
  let books = JSON.parse(localStorage.getItem("books")) || [];

  books = books.filter((book) => book.id !== id);

  localStorage.setItem("books", JSON.stringify(books));

  loadBooks();
}
