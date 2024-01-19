const searchInput = document.getElementById("searchInput");
const contentAll = document.getElementById("content-all");

searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const textElements = contentAll.querySelectorAll("h1, h2, p, li"); 

  textElements.forEach((element) => {
    const originalText = element.textContent;
    let updatedText = originalText; 

    if (searchTerm !== "") {
      const words = originalText.split(/\b/);

      const highlightedText = words
        .map((word) => {
          const lowerCaseWord = word.toLowerCase();
          return lowerCaseWord.includes(searchTerm)
            ? `<span class="highlight">${word}</span>`
            : word;
        })
        .join("");

      updatedText = highlightedText;
    }

    element.querySelectorAll(".highlight").forEach((span) => {
      span.outerHTML = span.innerHTML;
    });

    element.innerHTML = updatedText;
  });
});

searchInput.addEventListener("change", function () {
  if (searchInput.value.trim() === "") {
    contentAll.querySelectorAll(".highlight").forEach((span) => {
      span.outerHTML = span.innerHTML;
    });
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
              <div class="fw-bold">Anonymous</div>
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
                <div class="fw-bold">Anonymous</div>
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
