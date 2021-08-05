import React, { useState, useEffect } from "react";
import { db } from "../../firebase.js";
import { Link, useHistory } from "react-router-dom";
import Header from "../header/Header.js";
import { Notyf } from "notyf";

export default function Book() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const history = useHistory();
  const [confirm, setConfirm] = useState(false);
  const [index, setIndex] = useState();
  const [uid, setUid] = useState("");

  useEffect(() => {
    getDoc();
  }, [db]);

  async function getDoc() {
    db.collection("book")
      .orderBy("createdAt")
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          // "..." marge the id above with all the data //
          ...doc.data(),
        }));
        setBooks(data);
        setUid(querySnapshot.docs);
        if (querySnapshot.empty === true) {
          window.alert("No books");
          history.push("/");
        }
      });
  }

  useEffect(() => {
    if (alert) {
      if (confirm) {
        db.collection("book")
          .doc(uid[index]?.id ? uid[index].id : null)
          .delete();
        setAlert(false);
        setConfirm(false);
        notyf.success(books[index]?.title + " was deleted ");
      } else {
        setAlert(false);
        setConfirm(false);
      }
    }
  }, [alert]);

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
        type: "success",
        background: "indianred",
        duration: 2000,
        dismissible: true,
      },
    ],
  });

  return (
    <>
      <div className="body">
        <Header />
        {books ? (
          <>
            {books.map((book, index) => (
              <div key={book.id} className="body">
                <section class="dark pt-5">
                  <div class="container py-4">
                    <h1 class="h1 text-center" id="pageHeaderTitle">
                      {book.publisher} ,{book.author}
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
                          src={book.img}
                          alt=""
                        />
                      </a>

                      <div class="postcard__text">
                        <h1 class="postcard__title blue">
                          <a>{book.title}</a>
                        </h1>
                        <div class="postcard__subtitle small">
                          <time>
                            <i class="fas fa-calendar-alt mr-2"> </i>{" "}
                            {book.publishedDate}
                          </time>
                        </div>
                        <div class="postcard__bar"></div>
                        <div class="postcard__preview-txt">
                          {book.description}
                        </div>

                        <ul class="postcard__tagbox">
                          <li class="tag__item">
                            <i class="fas fa-language mr-2"> </i> language:{" "}
                            {book.language}
                          </li>
                          <li class="tag__item play blue">
                            <a>
                              <i class="fas fa-list mr-2"></i> category:{" "}
                              {book.categories}
                            </a>
                          </li>
                          <li class="tag__item play blue">
                            <a>
                              <i class="fas fa-book-open mr-2"></i> pages:{" "}
                              {book.pageCount}
                            </a>
                          </li>
                          <li class="tag__item play blue">
                            <a
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#staticBackdrop"
                              onClick={() => {
                                setIndex(index);
                                setAlert(true);
                              }}
                            >
                              <i class="fas fa-trash-alt"></i> Delete
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
                              src={books[index] ? books[index].img : null}
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
                              setIndex(books.length);
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
                            if (index >= books.length) {
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

            {/* <!-- Modal --> */}
            <div
              class="modal fade"
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body" style={{ color: "black" }}>
                    <span>
                      are you sure you want to delete {books[index]?.title}?
                    </span>
                  </div>
                  <div class="modal-footer">
                    <button data-bs-dismiss="modal">Close</button>
                    <button
                      data-bs-dismiss="modal"
                      onClick={() => {
                        setAlert(true);
                        setConfirm(true);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
