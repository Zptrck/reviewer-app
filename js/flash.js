document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".container");
  const addQuestionCard = document.getElementById("add-question-card");
  const question = document.getElementById("question");
  const answer = document.getElementById("answer");
  const addQuestion = document.getElementById("add-flashcard");
  const closeBtn = document.getElementById("close-btn");
  const flashcardForm = document.getElementById("flashcard-form");
  let editId = null;

  addQuestion.addEventListener("click", () => {
    container.classList.add("hide");
    question.value = "";
    answer.value = "";
    addQuestionCard.classList.remove("hide");
    flashcardForm.reset();
    editId = null;
  });

  closeBtn.addEventListener("click", hideQuestion);

  function hideQuestion() {
    container.classList.remove("hide");
    addQuestionCard.classList.add("hide");
    editId = null;
  }

  flashcardForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(this);

    if (editId) {
      formData.append("id", editId); // Include the flashcard ID for editing
    }

    fetch("../php/flash.php", {
      method: "POST",
      body: formData
    })
    .then(response => response.text())
    .then(data => {
      console.log(data);
      hideQuestion();
      location.reload();
    })
    .catch(error => console.error("Error:", error));
  });

  function fetchFlashcards() {
    fetch("../php/fetch_flashcards.php")
      .then(response => response.json())
      .then(data => {
        const cardListContainer = document.querySelector(".card-list-container");
        cardListContainer.innerHTML = ""; 
        data.forEach(card => {
          const div = document.createElement("div");
          div.classList.add("card");
          div.innerHTML += `<p class="question-div">${card.question}</p>`;
          const displayAnswer = document.createElement("p");
          displayAnswer.classList.add("answer-div", "hide");
          displayAnswer.innerText = card.answer;

          const link = document.createElement("a");
          link.setAttribute("href", "#");
          link.setAttribute("class", "show-hide-btn");
          link.innerHTML = "Show/Hide";
          link.addEventListener("click", () => {
            displayAnswer.classList.toggle("hide");
          });

          div.appendChild(link);
          div.appendChild(displayAnswer);

          const buttonsCon = document.createElement("div");
          buttonsCon.classList.add("buttons-con");

          const editButton = document.createElement("button");
          editButton.setAttribute("class", "edit");
          editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
          editButton.addEventListener("click", () => {
            editId = card.id; // Set the editId to the ID of the selected flashcard
            question.value = card.question;
            answer.value = card.answer;
            container.classList.add("hide");
            addQuestionCard.classList.remove("hide");
          });
          buttonsCon.appendChild(editButton);

          const deleteButton = document.createElement("button");
          deleteButton.setAttribute("class", "delete");
          deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
          deleteButton.addEventListener("click", () => {
            deleteFlashcard(card.id);
          });
          buttonsCon.appendChild(deleteButton);

          div.appendChild(buttonsCon);
          cardListContainer.appendChild(div);
        });
      })
      .catch(error => console.error("Error fetching flashcards:", error));
  }

  function deleteFlashcard(id) {
    if (confirm("Are you sure you want to delete this flashcard?")) {
      fetch("../php/delete_flashcard.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: id })
      })
      .then(response => response.text())
      .then(data => {
        console.log(data);
        location.reload();
      })
      .catch(error => console.error("Error:", error));
    }
  }

  fetchFlashcards();
});
// menu
document.addEventListener("DOMContentLoaded", function () {
  const burgerBtn = document.getElementById("burger-btn");
  const sideMenu = document.getElementById("side-menu");
  const closeBotn = document.getElementById("close-botns");
  const logoutBtn = document.getElementById("logout");

  burgerBtn.addEventListener("click", function () {
    sideMenu.style.right = "0";
  });

  closeBotn.addEventListener("click", function () {
    sideMenu.style.right = "-250px";
  });

  logoutBtn.addEventListener("click", function () {
    // Add your logout functionality here
    console.log("Logout clicked");
  });
});
