const signInEmail = document.getElementById('loginEmail');
const signInPass = document.getElementById('loginPass');
const signUpEmail = document.getElementById('signupEmail');
const signUpPass = document.getElementById('signupPass');
const signInNavBtn = document.getElementById('openSignin');
const signUpNavBtn = document.getElementById('openSignup');
const logOutNavBtn = document.getElementById('logOut');
const profileNavBtn = document.getElementById('openProfile').parentElement;

firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    configLogIn(firebaseUser);
  } else {
    configLogOut();
  }
});
