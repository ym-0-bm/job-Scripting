// const formOpenBtn = document.querySelector("#form-open"),
//   home = document.querySelector(".home"),
//   formContainer = document.querySelector(".form_container"),
//   formCloseBtn = document.querySelector(".form_close"),
//   signupBtn = document.querySelector("#signup"),
//   loginBtn = document.querySelector("#login"),
//   pwShowHide = document.querySelectorAll(".pw_hide");

// // Ouvrir le formulaire
// formOpenBtn.addEventListener("click", () => home.classList.add("show"));

// // Fermer le formulaire
// formCloseBtn.addEventListener("click", () => home.classList.remove("show"));

// // Afficher/Masquer le mot de passe
// pwShowHide.forEach((icon) => {
//   icon.addEventListener("click", () => {
//     let getPwInput = icon.parentElement.querySelector("input");
//     if (getPwInput.type === "password") {
//       getPwInput.type = "text";
//       icon.classList.replace("uil-eye-slash", "uil-eye");
//     } else {
//       getPwInput.type = "password";
//       icon.classList.replace("uil-eye", "uil-eye-slash");
//     }
//   });
// });

// // Afficher le formulaire d'inscription
// signupBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   formContainer.classList.add("active");
// });

// // Afficher le formulaire de connexion
// loginBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   formContainer.classList.remove("active");
// });

// // Vérifier si l'inscription a été réussie
// function checkSignupSuccess() {
//   const urlParams = new URLSearchParams(window.location.search);
//   if (urlParams.has('signup') && urlParams.get('signup') === 'success') {
//     formContainer.classList.remove("active"); // Afficher le formulaire de connexion
//     home.classList.add("show"); // Assurer que le popup est affiché
//   }
// }

// // Appeler la fonction pour vérifier l'état de l'inscription
// checkSignupSuccess();

// // Vérifier si laconnexion a été réussie
// function loginfail() {
//   const urlParams = new URLSearchParams(window.location.search);
//   if (urlParams.has('lo') && urlParams.get('login') === 'fail') {
//     formContainer.classList.remove("active"); // Afficher le formulaire de connexion
//     home.classList.add("show"); // Assurer que le popup est affiché
//   }
// }

// // Appeler la fonction pour vérifier l'état de l'inscription
// loginfail();


// _____________________________________________________________________________________________________________________________________________

const formOpenBtn = document.querySelector("#form-open"),
    home = document.querySelector(".home"),
    formContainer = document.querySelector(".form_container"),
    formCloseBtn = document.querySelector(".form_close"),
    signupBtn = document.querySelector("#signup"),
    loginBtn = document.querySelector("#login"),
    pwShowHide = document.querySelectorAll(".pw_hide");

// Ouvrir le formulaire
formOpenBtn.addEventListener("click", () => home.classList.add("show"));

// Fermer le formulaire
formCloseBtn.addEventListener("click", () => home.classList.remove("show"));

// Afficher/Masquer le mot de passe
pwShowHide.forEach((icon) => {
    icon.addEventListener("click", () => {
        let getPwInput = icon.parentElement.querySelector("input");
        if (getPwInput.type === "password") {
            getPwInput.type = "text";
            icon.classList.replace("uil-eye-slash", "uil-eye");
        } else {
            getPwInput.type = "password";
            icon.classList.replace("uil-eye", "uil-eye-slash");
        }
    });
});

// Afficher le formulaire d'inscription
signupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formContainer.classList.add("active");
});

// Afficher le formulaire de connexion
loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formContainer.classList.remove("active");
});

// Vérifier si l'inscription a été réussie
function checkSignupSuccess() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('signup') && urlParams.get('signup') === 'success') {
        formContainer.classList.remove("active"); // Afficher le formulaire de connexion
        home.classList.add("show"); // Assurer que le popup est affiché
    }
    else if (urlParams.has('signup') && urlParams.get('signup') === 'fail') {
        formContainer.classList.add("active"); // Afficher le formulaire d'inscription
        home.classList.add("show"); // Assurer que le popup est affiché
    }
}

// Appeler la fonction pour vérifier l'état de l'inscription
checkSignupSuccess();

// Vérifier si la connexion a été réussie
function loginfail() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('login') && urlParams.get('login') === 'fail') {
      formContainer.classList.remove("active"); // Afficher le formulaire de connexion
      home.classList.add("show"); // Assurer que le popup est affiché
  }
}

// Appeler la fonction pour vérifier l'état de la connexion
loginfail();