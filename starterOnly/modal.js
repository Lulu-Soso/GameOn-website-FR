function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalClose = document.querySelector(".close"); // element close modal
const form = document.getElementById("reserve");
const result = document.getElementById("result");
const nameChecker = document.querySelectorAll("input[type='text']");
const emailChecker = document.getElementById("email");
const birthdateChecker = document.getElementById("birthdate");
const quantityChecker = document.getElementById("quantity");
const locationChecker = document.querySelectorAll("input[name='location']");
const termChecker = document.querySelectorAll("input[name='term']");
const resultCheckbox = document.getElementById("resultCheckbox");
const formData = document.querySelectorAll(".formData");
const inputs = document.querySelectorAll("input");
const conditionChecked = document.getElementById("checkbox1");
const spanChecked = document.getElementById("spanChecked");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

////////// close modal event //////////
modalClose.addEventListener("click", closeModal);

// close modal form
function closeModal() {
  modalbg.style.display = "none";
  form.reset();
  submitForm();
}
////////// close modal //////////

function validate() {
  document.querySelector("#validForm").style.display = "block";
  form.style.display = "none";
}

function submitForm() {
  form.submit();
}

////////// errorDisplay -  errorRemove //////////
const errorDisplay = (tag, message) => {
  const parentInput = document.getElementById(tag).parentNode;
  parentInput.setAttribute("data-error-visible", "true");
  parentInput.setAttribute("data-error", message);
};

const errorRemove = (tag) => {
  const parentInput = document.getElementById(tag).parentNode;
  parentInput.removeAttribute("data-error-visible");
};

let firstname,
  lastname,
  email,
  birthdate,
  quantityTournament,
  locationTournament,
  terms = [];

nameChecker.forEach((nameCheck) => {
  nameCheck.addEventListener("input", (e) => {
    let regexName = /^[A-Z a-z]{2,20}$/;
    let inputName = e.target.value;
    let inputId = e.target.id;
    if (
      inputName == "" ||
      null ||
      (inputName.length > 0 && (inputName.length < 2 || inputName.length > 20))
    ) {
      `${
        inputId == "first"
          ? (firstname = null) +
            errorDisplay(
              "first",
              "Le prénom doit faire entre 2 et 20 caractères"
            )
          : (lastname = null) +
            errorDisplay(
              "last",
              "Le nom doit doit faire entre 2 et 20 caractères"
            )
      }`;
    } else if (!regexName.test(inputName)) {
      `${
        inputId == "first"
          ? (firstname = null) +
            errorDisplay(
              "first",
              "Le prénom ne doit pas contenir de caractères spéciaux"
            )
          : (lastname = null) +
            errorDisplay(
              "last",
              "Le nom ne doit pas contenir de caractères spéciaux"
            )
      }`;
    } else {
      `${
        inputId == "first"
          ? (firstname = inputName) == true
          : (lastname = inputName) == true
      }`;
      errorRemove(inputId);
    }
  });
});

emailChecker.addEventListener("input", (e) => {
  let inputEmail = e.target.value;
  let regexEmail = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/i;
  if (inputEmail == "" || null) {
    errorRemove("email");
  } else if (!regexEmail.test(inputEmail)) {
    errorDisplay("email", "Le mail n'est pas valide");
    email = null;
  } else {
    errorRemove("email");
    (email = inputEmail) == true;
  }
});

birthdateChecker.addEventListener("input", (e) => {
  const todayDate = Date.now();
  let selectedDate = new Date(e.target.value)
  if (!(selectedDate < todayDate)) {
    errorDisplay("birthdate", "Le mail n'est pas valide");
    birthdate = null;
  } else {
    errorRemove("birthdate");
    (birthdate = selectedDate) == true;
  }
});

quantityChecker.addEventListener("input", (e) => {
  let selectedNumber = e.target.value;
  if (!selectedNumber) {
    errorDisplay("quantity", "Veuillez entrez un nombre");
    selectedNumber = null;
  } else {
    errorRemove("quantity");
    (quantityTournament = selectedNumber) == true;
  }
});

locationChecker.forEach((radioBtn) => {
  radioBtn.addEventListener("change", (e) => {
    let inputLocation = e.target.value;
    if (radioBtn.checked == true) {
      errorRemove("location1");
      (locationTournament = inputLocation) == true;
    } else {
      locationTournament = null;
    }
  });
});

conditionChecked.addEventListener("click", () => {
  if (checkbox1.checked) {
    errorRemove("checkbox1");
    spanChecked.style.border = null;
  } else {
    errorDisplay(
      "checkbox1",
      "Vous devez vérifier que vous acceptez les termes et conditions d'utilisation."
    );
    spanChecked.style.border = "2px solid #fe142f";
  }
});

termChecker.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      terms.push(checkbox.value);
    } else {
      terms = terms.filter((e) => e !== checkbox.value);
      (terms = []) == null;
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (
    checkbox1.checked &&
    firstname &&
    lastname &&
    email &&
    birthdate &&
    email &&
    quantityTournament &&
    locationTournament &&
    terms
  ) {
    const data = {
      firstname,
      lastname,
      email,
      birthdate,
      email,
      quantityTournament,
      locationTournament,
      terms,
    };
    console.log(data);
    validate();
  } else {
    if (!firstname) {
      errorDisplay(
        "first",
        "Vous devez entrer votre prénom avec le nombre et caractères appropriés."
      );
    }
    if (!lastname) {
      errorDisplay(
        "last",
        "Vous devez entrer votre nom avec le nombre et caractères appropriés."
      );
    }
    if (!email) {
      errorDisplay("email", "Vous devez entrer votre email.");
    }
    if (!birthdate) {
      errorDisplay("birthdate", "Vous devez entrer votre date de naissance.");
    }
    if (!quantityTournament) {
      errorDisplay("quantity", "Vous devez préciser une quantité.");
    }
    if (!locationTournament) {
      errorDisplay("location1", "Vous devez choisir une option.");
    }
    if (!checkbox1.checked) {
      errorDisplay(
        "checkbox1",
        "Vous devez vérifier que vous acceptez les termes et conditions d'utilisation."
      );
      spanChecked.style.border = "2px solid #fe142f";
    }
  }
});

