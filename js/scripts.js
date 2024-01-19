/*!
 * Start Bootstrap - Blog Post v5.0.9 (https://startbootstrap.com/template/blog-post)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-blog-post/blob/master/LICENSE)
 */
// This file is intentionally blank
// Use this file to add JavaScript to your project

function handleNavLinkClick(clickedElement) {
    // Remove "active" class from all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));

    // Add "active" class to the clicked nav link
    clickedElement.classList.add('active');
}

const searchInput = document.getElementById("searchInput");
const body = document.body;

searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value;

  // Display the search term
  //   body.textContent = `You are searching for: ${searchTerm}`;

  // Apply highlight effect to the input field
  if (searchTerm.trim() !== "") {
    searchInput.classList.add("highlight");
  } else {
    searchInput.classList.remove("highlight");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const commentForm = document.getElementById("commentForm");
  const commentInput = document.getElementById("commentInput");
  const commentsContainer = document.getElementById("commentsContainer");

  loadCommentsFromStorage();

  commentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const newComment = commentInput.value;

    const newCommentElement = document.createElement("div");
    newCommentElement.classList.add("d-flex");

    newCommentElement.innerHTML = `
          <div class="d-flex align-items-center justify-content-between w-100"> <!-- Updated this line -->
            <div class="flex-shrink-0">
              <img
                class="rounded-circle"
                src="https://dummyimage.com/50x50/ced4da/6c757d.jpg"
                alt="..."
              />
            </div>
            <div class="ms-3" style="margin-right: auto;">
              <div class="fw-bold">New Commenter</div>
              <p class="comment-text">${newComment}</p>
            </div>
            <button class="btn btn-danger delete-btn">Delete</button>
          </div>
        `;

    commentsContainer.appendChild(newCommentElement);

    saveCommentToStorage(newComment);

    commentInput.value = "";
  });

  commentsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-btn")) {
      const shouldDelete = confirm(
        "Apakah anda yakin ingin menghapus komen ini?"
      );

      if (shouldDelete) {
        const commentElement = event.target.closest(".d-flex");
        commentElement.remove();

        removeCommentFromStorage(
          commentElement.querySelector(".comment-text").textContent
        );
      }
    }
  });

  function loadCommentsFromStorage() {
    const storedComments = JSON.parse(localStorage.getItem("comments")) || [];

    storedComments.forEach((comment) => {
      const commentElement = document.createElement("div");
      commentElement.classList.add("d-flex");

      commentElement.innerHTML = `
            <div class="d-flex align-items-center justify-content-between w-100"> <!-- Updated this line -->
              <div class="flex-shrink-0">
                <img
                  class="rounded-circle"
                  src="https://dummyimage.com/50x50/ced4da/6c757d.jpg"
                  alt="..."
                />
              </div>
              <div class="ms-3" style="margin-right: auto;">
                <div class="fw-bold">New Commenter</div>
                <p class="comment-text">${comment}</p>
              </div>
              <button class="btn btn-danger delete-btn">Delete</button>
            </div>
          `;
      commentsContainer.appendChild(commentElement);
    });
  }

  function saveCommentToStorage(comment) {
    const storedComments = JSON.parse(localStorage.getItem("comments")) || [];

    storedComments.push(comment);

    localStorage.setItem("comments", JSON.stringify(storedComments));
  }

  function removeCommentFromStorage(comment) {
    const storedComments = JSON.parse(localStorage.getItem("comments")) || [];

    const updatedComments = storedComments.filter((c) => c !== comment);

    localStorage.setItem("comments", JSON.stringify(updatedComments));
  }
});
