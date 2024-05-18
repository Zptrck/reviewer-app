//upload
const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('fileInput');

dropArea.addEventListener('dragover', (event) => {
event.preventDefault();
dropArea.classList.add('hover');
});

dropArea.addEventListener('dragleave', () => {
dropArea.classList.remove('hover');
});

dropArea.addEventListener('drop', (event) => {
event.preventDefault();
dropArea.classList.remove('hover');
const files = event.dataTransfer.files;
handleFiles(files);
});

fileInput.addEventListener('change', (event) => {
const files = event.target.files;
handleFiles(files);
});

function handleFiles(files) {
// Handle file upload logic here
console.log(files);
}
// menu
document.addEventListener("DOMContentLoaded", function () {
    const burgerBtn = document.getElementById("burger-btn");
    const sideMenu = document.getElementById("side-menu");
    const closeBtn = document.getElementById("close-btn");
    const logoutBtn = document.getElementById("logout");
  
    burgerBtn.addEventListener("click", function () {
      sideMenu.style.right = "0";
    });
  
    closeBtn.addEventListener("click", function () {
      sideMenu.style.right = "-250px";
    });
  
    logoutBtn.addEventListener("click", function () {
      // Add your logout functionality here
      console.log("Logout clicked");
    });
  });
  