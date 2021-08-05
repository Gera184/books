import React from "react";


export default function Header() {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top ">
        <div class="container-fluid">
          <a class="navbar-brand" href="/home">
            <img
              style={{ width: "80px", height: "70px" }}
              src="https://seeklogo.com/images/B/book-logo-2B8BEBAFCE-seeklogo.com.png"
              alt=""
            />
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <a class="nav-link" href="/home">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/favorites">
                  Favorites
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
