// sideBar slide

// slide oup
$(".fa-bars").click(function () {
  $(".left-side").animate({ width: "250px" }, 500);
  $(".left-side ul li").css("display", "block");
  $(".social-icons,.copyRight ").css("display", "block");
  $(".fa-xmark").css("display", "block");
  $(".fa-bars").css("display", "none");
});
//  slide into
$(".fa-xmark").click(function () {
  $(".left-side").animate({ width: "0px" }, 500);
  $(".left-side ul li").css("display", "none");
  $(".social-icons,.copyRight").css("display", "none");

  $(".fa-xmark").css("display", "none");
  $(".fa-bars").css("display", "block");
});

// wow js
new WOW().init();

// validation of contact information----------//

let nameInput = document.getElementById("nameInput");
let emailInput = document.getElementById("emailInput");
let phoneInput = document.getElementById("phoneInput");
let ageInput = document.getElementById("ageInput");
let passwordInput = document.getElementById("passwordInput");
let rePasswordInput = document.getElementById("rePasswordInput");
let submitBtn = document.getElementById("submitBtn");

// username vaildation//
nameInput.addEventListener("keyup", function () {
  let nameAlert = document.getElementById("nameAlert");
  let nameRejex = /^[A-Z ][ A-za-z]{10,30}$/;
  if (nameRejex.test(nameInput.value) == true) {
    // submitBtn.removeAttribute("disabled");
    nameInput.classList.replace("is-invalid", "is-valid");
    nameAlert.classList.replace("d-block", "d-none");
    return true;
  } else {
    submitBtn.disabled = "true";
    nameInput.classList.add("is-invalid");
    nameAlert.classList.replace("d-none", "d-block");
    return false;
  }
});
// email vaildation//
emailInput.addEventListener("keyup", function () {
  let emailAlert = document.getElementById("emailAlert");
  let emailRejex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailRejex.test(emailInput.value) == true) {
    // submitBtn.removeAttribute("disabled");
    emailInput.classList.replace("is-invalid", "is-valid");
    emailAlert.classList.replace("d-block", "d-none");
    return true;
  } else {
    submitBtn.disabled = "true";
    emailInput.classList.add("is-invalid");
    emailAlert.classList.replace("d-none", "d-block");
    return false;
  }
});
// mobile phone vaildation//
phoneInput.addEventListener("keyup", function () {
  let phoneAlert = document.getElementById("phoneAlert");
  let phoneRejex = /^(002)?01[0125][0-9]{8}$/;
  if (phoneRejex.test(phoneInput.value) == true) {
    // submitBtn.removeAttribute("disabled");
    phoneInput.classList.replace("is-invalid", "is-valid");
    phoneAlert.classList.replace("d-block", "d-none");
    return true;
  } else {
    submitBtn.disabled = "true";
    phoneInput.classList.add("is-invalid");
    phoneAlert.classList.replace("d-none", "d-block");
    return false;
  }
});
// age vaildation//
ageInput.addEventListener("keyup", function () {
  let ageAlert = document.getElementById("ageAlert");
  if (ageInput.value > 16) {
    // submitBtn.removeAttribute("disabled");
    ageInput.classList.replace("is-invalid", "is-valid");
    ageAlert.classList.replace("d-block", "d-none");
    return true;
  } else {
    submitBtn.disabled = "true";
    ageInput.classList.add("is-invalid");
    ageAlert.classList.replace("d-none", "d-block");
    return false;
  }
});

// password vaildation//
passwordInput.addEventListener("keyup", function () {
  let passwordAlert = document.getElementById("passwordAlert");
  let passwordRejex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (passwordRejex.test(passwordInput.value) == true) {
    // submitBtn.removeAttribute("disabled");
    passwordInput.classList.replace("is-invalid", "is-valid");
    passwordAlert.classList.replace("d-block", "d-none");
    return true;
  } else {
    submitBtn.disabled = "true";
    passwordInput.classList.add("is-invalid");
    passwordAlert.classList.replace("d-none", "d-block");
    return false;
  }
});

// checking passwoed validation//
rePasswordInput.addEventListener("keyup", function hambozo() {
  let repasswordAlert = document.getElementById("repasswordAlert");
  if (rePasswordInput.value == passwordInput.value) {
    submitBtn.removeAttribute("disabled");
    rePasswordInput.classList.replace("is-invalid", "is-valid");
    repasswordAlert.classList.replace("d-block", "d-none");
    return true;
  } else {
    submitBtn.disabled = "true";
    rePasswordInput.classList.add("is-invalid");
    rePasswordInput.classList.replace("d-none", "d-block");
    return false;
  }
});
// navBar choices//
let links = document.querySelectorAll(".link");
var currenChosse;

for (var i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function (e) {
    currenChosse = e.target.text;
    console.log(currenChosse);
    getMovies(currenChosse);
  });
}

let moviesList = [];
async function getMovies(e) {
  let request = await fetch(
    `https://api.themoviedb.org/3/movie/${e}?api_key=eba8b9a7199efdcb0ca1f96879b83c44`
  );
  details = await request.json();
  moviesList = details.results;
  console.log(moviesList);
  displayData();
}
async function getTrendingMovies() {
  let request = await fetch(
    `https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44`
  );
  details = await request.json();
  moviesList = details.results;
  console.log(moviesList);
  displayData();
}
getTrendingMovies();

document.getElementById("trending").addEventListener("click", function () {
  getTrendingMovies();
});

function displayData() {
  let container = "";
  for (let i = 0; i < moviesList.length; i++) {
    container += `
    <div class="col-md-4">
    <div class="movie text-center position-relative my-3 py-3 ">
    <img src="https://image.tmdb.org/t/p/w500${moviesList[i].poster_path}" alt="" class="poterMovie w-100">
    <div class="layer   d-flex flex-column justify-content-center align-items-center text-black p-2 my-2">
    <h4>${moviesList[i].title}</h4>
    <p>${moviesList[i].overview}</p>
    <h5> Rate:${moviesList[i].vote_average}</h5>
    <p>${moviesList[i].release_date}</p>
    </div>

</div>

</div>`;
  }
  document.getElementById("rowData").innerHTML = container;
}
// searchBar by word//
let searchBar = document.getElementById("getMovieByWord");
let resultTyping = "";
searchBar.addEventListener("keyup", function () {
  resultTyping = searchBar.value;
  console.log(resultTyping);
  getMovieBySearchBar(resultTyping);
});

// searchBar by current section//

async function getMovieBySearchBar(e) {
  let request = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${e}&api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&include_adult=false`
  );
  details = await request.json();
  moviesList = details.results;
  console.log(moviesList);
  displayData();
}

let getByWord = document.getElementById("getByWord");

getByWord.addEventListener("keyup", function (e) {
  let result = e.target.value;
  console.log(result);
  let container = "";
  for (let i = 0; i < moviesList.length; i++) {
    if (moviesList[i].title.includes(result)) {
      container += `
        <div class="col-md-4">
        <div class="movie text-center position-relative my-3 py-3 ">
        <img src="https://image.tmdb.org/t/p/w500${moviesList[i].poster_path}" alt="" class="poterMovie w-100">
        <div class="layer   d-flex flex-column justify-content-center align-items-center text-black p-2 my-2">
        <h4>${moviesList[i].title}</h4>
        <p>${moviesList[i].overview}</p>
        <h5> Rate:${moviesList[i].vote_average}</h5>
        <p>${moviesList[i].release_date}</p>
        </div>
    
    </div>
    
    </div>`;
    }
    document.getElementById("rowData").innerHTML = container;
  }
});

// scroll down contact
$("#").click(function () {
  let contact = $(this).attr("href");
  let currentOfsset = $(contact).offset().top;
  $("body,html").animate({ scrollTop: currentOfsset }, 2000);
});
