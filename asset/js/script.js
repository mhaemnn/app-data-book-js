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
    if (book.status === "belum") {
      belumSelesaiShelf.appendChild(bookCard);
    } else {
      selesaiShelf.appendChild(bookCard);
    }
  });
}

function addBook() {
  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const statusInput = document.getElementById("status");

  const title = titleInput.value;
  const author = authorInput.value;
  const status = statusInput.value;

  if (title && author) {
    const newBook = {
      title,
      author,
      status,
    };

    const books = JSON.parse(localStorage.getItem("books")) || [];

    books.push(newBook);

    localStorage.setItem("books", JSON.stringify(books));

    titleInput.value = "";
    authorInput.value = "";

    loadBooks();
  } else {
    alert("Harap isi judul dan penulis buku!");
  }
}

function createBookCard(book) {
  const card = document.createElement("div");
  card.className = "book-card";
  card.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Penulis:</strong> ${book.author}</p>
        <p><strong>Status:</strong> ${
          book.status === "belum" ? "Belum Selesai" : "Selesai Dibaca"
        }</p>
        <button onclick="moveBook('${book.title}', '${book.author}', '${
    book.status
  }')">Pindahkan</button>
        <button onclick="deleteBook('${book.title}', '${book.author}', '${
    book.status
  }')">Hapus</button>
    `;
  return card;
}

function moveBook(title, author, status) {
  const books = JSON.parse(localStorage.getItem("books")) || [];

  const index = books.findIndex(
    (book) =>
      book.title === title && book.author === author && book.status === status
  );

  if (index !== -1) {
    books[index].status = status === "belum" ? "selesai" : "belum";

    localStorage.setItem("books", JSON.stringify(books));

    loadBooks();
  }
}

function deleteBook(title, author, status) {
  let books = JSON.parse(localStorage.getItem("books")) || [];

  books = books.filter(
    (book) =>
      !(
        book.title === title &&
        book.author === author &&
        book.status === status
      )
  );

  localStorage.setItem("books", JSON.stringify(books));

  loadBooks();
}
