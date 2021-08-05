import React, { useEffect, useState } from "react";
import axios from "axios";
import firebase from "../../firebase.js";
import { db } from "../../firebase.js";
import "./Main.css";
import Header from "../header/Header.js";
import { Notyf } from "notyf";

export default function Main() {
  const [books, setBooks] = useState([]);
  const [index, setIndex] = useState();
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(false);

  const options = {
    method: "GET",
    url: "https://google-books.p.rapidapi.com/volumes",
    params: {
      key: "AIzaSyAOsteuaW5ifVvA_RkLXh0mYs6GLAD6ykc",
      maxResults: "20",
    },
    headers: {
      "x-rapidapi-key": "9da9f853dcmsh86bba916aa656c2p18fc8djsne2562db22529",
      "x-rapidapi-host": "google-books.p.rapidapi.com",
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        setBooks(response.data.items);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (favorites) {
      if (db) {
        db.collection("book").add({
          publisher: books[index].volumeInfo.publisher
            ? books[index].volumeInfo.publisher
            : null,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          author: books[index].volumeInfo.authors
            ? books[index].volumeInfo.authors[0]
            : null,
          title: books[index].volumeInfo.title
            ? books[index].volumeInfo.title
            : null,
          publishedDate: books[index].volumeInfo.publishedDate
            ? books[index].volumeInfo.publishedDate
            : null,
          description: books[index].description
            ? books[index].volumeInfo.description
            : null,
          language: books[index].volumeInfo.language
            ? books[index].volumeInfo.language
            : null,
          categories: books[index].volumeInfo.categories
            ? books[index].volumeInfo.categories[0]
            : null,
          pageCount: books[index].volumeInfo.pageCount
            ? books[index].volumeInfo.pageCount
            : null,
          img: books[index].volumeInfo.imageLinks
            ? books[index].volumeInfo.imageLinks.thumbnail
            : null,
          id: books[index].id ? books[index].id : null,
        });
      }
      notyf.success(
        "Book  " + books[index].volumeInfo.title + "  added successfully"
      );
      setFavorites(false);
    }
  }, [favorites]);

  const notyf = new Notyf({
    duration: 2000,
    position: {
      x: "left",
      y: "top",
    },
    types: [
      {
        type: "warning",
        background: "orange",
        icon: {
          className: "material-icons",
          tagName: "i",
          text: "warning",
        },
      },
      {
        type: "error",
        background: "indianred",
        duration: 2000,
        dismissible: true,
      },
    ],
  });

  return (
    <div className="body">
      <Header />
      {books.map((book, index) => (
        <div key={book.id}>
          <section class="dark pt-5">
            <div class="container py-4">
              <h1 class="h1 text-center" id="pageHeaderTitle">
                {book.volumeInfo.publisher} ,
                {book.volumeInfo ? book.volumeInfo.authors[0] : null}
              </h1>

              <article class="postcard dark blue">
                <a class="postcard__img_link">
                  <img
                    key={book.id}
                    class="postcard__img"
                    data-toggle="modal"
                    data-target="#gallerymode"
                    onClick={() => {
                      setIndex(index);
                      setLoading(true);
                    }}
                    src={
                      book.volumeInfo.imageLinks
                        ? book.volumeInfo.imageLinks.thumbnail
                        : null
                    }
                    alt=""
                  />
                </a>

                <div class="postcard__text">
                  <h1 class="postcard__title blue">
                    <a>{book.volumeInfo.title}</a>
                  </h1>
                  <div class="postcard__subtitle small">
                    <time>
                      <i class="fas fa-calendar-alt mr-2"> </i>{" "}
                      {book.volumeInfo.publishedDate}
                    </time>
                  </div>
                  <div class="postcard__bar"></div>
                  <div class="postcard__preview-txt">
                    {book.volumeInfo.description}
                  </div>

                  <ul class="postcard__tagbox">
                    <li class="tag__item">
                      <a
                        type="button"
                        onClick={() => {
                          setIndex(index);
                          setFavorites(true);
                        }}
                      >
                        <i class="fas fa-tag mr-2"> </i> Add to favorites
                      </a>
                    </li>
                    <li class="tag__item">
                      <i class="fas fa-language mr-2"> </i> language:{" "}
                      {book.volumeInfo.language}
                    </li>
                    <li class="tag__item play blue">
                      <a>
                        <i class="fas fa-list mr-2"></i> category:{" "}
                        {book.volumeInfo.categories
                          ? book.volumeInfo.categories[0]
                          : null}
                      </a>
                    </li>
                    <li class="tag__item play blue">
                      <a>
                        <i class="fas fa-book-open mr-2"></i> pages:{" "}
                        {book.volumeInfo.pageCount}
                      </a>
                    </li>
                  </ul>
                </div>
              </article>
            </div>
          </section>
        </div>
      ))}

      {loading ? (
        <div
          class="modal fade"
          id="gallerymode"
          img-thumbnail
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div
                  id="carouselExampleControls"
                  class="carousel slide"
                  data-ride="carousel"
                >
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <img
                        class="modal-img"
                        src={
                          books[index].volumeInfo.imageLinks
                            ? books[index].volumeInfo.imageLinks.thumbnail
                            : null
                        }
                        alt="none"
                      />
                    </div>
                  </div>
                  <a
                    class="carousel-control-prev"
                    href="#carouselExampleControls"
                    role="button"
                    data-slide="prev"
                    onClick={() => {
                      if (index <= 0) {
                        setIndex(19);
                      } else {
                        setIndex(index - 1);
                      }
                    }}
                  >
                    <span
                      class="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="sr-only">Previous</span>
                  </a>
                  <a
                    class="carousel-control-next"
                    href="#carouselExampleControls"
                    role="button"
                    data-slide="next"
                    onClick={() => {
                      if (index >= 19) {
                        setIndex(0);
                      } else {
                        setIndex(index + 1);
                      }
                    }}
                  >
                    <span
                      class="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="sr-only">Next</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
