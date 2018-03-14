const signInEmail = document.getElementById('loginEmail');
const signInPass = document.getElementById('loginPass');
const signUpEmail = document.getElementById('signupEmail');
const signUpPass = document.getElementById('signupPass');
const signInNavBtn = document.getElementById('openSignin');
const signUpNavBtn = document.getElementById('openSignup');
const logOutNavBtn = document.getElementById('logOut');
const profileNavBtn = document.getElementById('openProfile').parentElement;

let signUp = () => {
  const auth = firebase.auth();
  var pass = signUpPass.value;
  var email = signUpEmail.value;

  auth.createUserWithEmailAndPassword(email,pass);
}

let signIn = () => {
  const auth = firebase.auth();
  var pass = signInPass.value;
  var email = signInEmail.value;

  auth.signInWithEmailAndPassword(email,pass);
}

let logOut = () => {
  const auth = firebase.auth();
  auth.signOut();
}

let configLogIn = (firebaseUser) => {
  signInNavBtn.classList.add('d-none');
  signUpNavBtn.classList.add('d-none');
  logOutNavBtn.classList.remove('d-none');
  profileNavBtn.classList.remove('d-none');

  document.getElementById('openHome').click();
  console.log(firebaseUser.uid);
  if(firebaseUser.metadata.creationTime == firebaseUser.metadata.lastSignInTime) {
    firebase.database().ref('users/' + firebaseUser.uid).set({
      email: firebaseUser.email,
      problems: [""],
      photoUrl: "https://dfzcfb18p6v47.cloudfront.net/images/my_profile_icon_black.png?20180313032014",
      desc: "",
      gender: ""
    });
  }
}

let configLogOut = () => {
  signInNavBtn.classList.remove('d-none');
  signUpNavBtn.classList.remove('d-none');
  logOutNavBtn.classList.add('d-none');
  profileNavBtn.classList.add('d-none');
  document.getElementById('openHome').click();
}

firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    configLogIn(firebaseUser);
  } else {
    configLogOut();
  }
});
