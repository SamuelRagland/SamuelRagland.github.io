console.clear();

const $ = (e) => {
  return document.getElementById(e);
};

const firebaseConfig = {
  apiKey: "AIzaSyA1AMJbBSmjzXuT1cT4Jh0AZ40YVTJAnjc",
  authDomain: "web239-first-project.firebaseapp.com",
  projectId: "web239-first-project",
  storageBucket: "web239-first-project.appspot.com",
  messagingSenderId: "946557733000",
  appId: "1:946557733000:web:ea913243c81a81bdbd373d",
  measurementId: "G-HKJGF34XFF"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
let dbRef = db.collection("chatapp");

let userEmail = "";

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log(user.email);
    userEmail = user.email;
    $('wrapper').classList.add('hidden');
    $("email").classList.add("hidden");
    $("password").classList.add("hidden");
    $("submitpass").classList.add("hidden");
    $("sendbox").classList.remove("hidden");
    $("logout").classList.remove("hidden");
  } else {
    $('wrapper').classList.remove('hidden');
    $("email").classList.remove("hidden");
    $("password").classList.remove("hidden");
    $("submitpass").classList.remove("hidden");
    $("sendbox").classList.add("hidden");
    $("logout").classList.add("hidden");
  }
});

$("submitpass").addEventListener("click", function () {
  const account = $("email").value;
  const passwd = $("password").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(account, passwd)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log("signed in");
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === "auth/user-not-found") {
        firebase
          .auth()
          .createUserWithEmailAndPassword($("email").value, $("password").value)
          .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // ...
          })
          .catch((error) => {
            errorCode = error.code;
            errorMessage = error.message;
            // ..
          });
      } else if (errorCode === "auth/wrong-password") {
        alert("wrong password, try again");
      }
      console.log(errorMessage, errorCode);
    });
});

function signOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      console.log("signed out");
    });
  // .catch((error) => {
  //   // An error happened.
  // });
}

$("submitmessage").addEventListener("click", () => {
  let message = $("message").value;
  $("message").value = "";
  dbRef
    .add({
      name: userEmail,
      message: message,
      timestamp: Date.now()
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
});

dbRef
  .orderBy("timestamp", "desc")
  .limit(20)
  .onSnapshot((snap) => {
    const html = snap.docs
      .map((message) => {
        return `<div class='flex'><h3>${message.data().name}</h3>: <p>${
          message.data().message
        }</p></div>`;
      })
      .join(`<hr>`);
    $("messages").innerHTML = html;
    //  + `<div id='spacer'></div>` to add some extra space at the bottom
  console.log(html);
  });

$("submitmessage");