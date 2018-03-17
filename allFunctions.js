let functionRedirector = () => {
  checkHash(window.location.hash);
  firebaseLoadData();
}
let firebaseLoadData = () => {
  firebase.database().ref('/').once('value', (snap) => {
    databaseData = snap.val();
    $('#loader').fadeOut('fast');
    initProblemInfo(databaseData)
  });
}
let toArray = (obj) => {
  return Object.keys(obj);
}
let makeElem = (elem) => {
  return document.createElement(elem);
}
let setText = (elem, text) => {
  elem.innerText = text;
}
let checkHash = (hash) => {
  if (typeof hash == 'undefined') return;
  if (hash.charAt(0) !== '#') return;
  $('.nav-link').each(() => {
    if ($(this).id == 'logOut') return;
    if (hash == $(this).attr('href')) {
      $('#' + $(this).attr('aria-controls')).collapse('show');
      $('.active.nav-link').removeClass('active');
      $(this).addClass('active');
    }
  })
}
let likeButtonClicked = (self) => {
  self = self.target;
  let problemKey = self.id.split(' ')[0];
  let gymKey = self.id.split(' ')[1];
  if (firebase.auth().currentUser !== null) {
    if (self.src == window.location.origin + '/thumbsup-not-like.jpg') {
      self.src = 'thumbsup-like.jpg';
      firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/likes/' + problemKey).set('true');
      databaseData.users[firebase.auth().currentUser.uid].likes[problemKey] = 'true';
      firebase.database().ref('gyms/' + gymKey + '/problems/' + problemKey + '/likes').set(databaseData.gyms[gymKey].problems[problemKey].likes + 1);
      databaseData.gyms[gymKey].problems[problemKey].likes += 1;
      self.nextElementSibling.innerHTML = databaseData.gyms[gymKey].problems[problemKey].likes;
    } else {
      firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/likes/' + problemKey).set('false');
      databaseData.users[firebase.auth().currentUser.uid].likes[problemKey] = 'false';
      firebase.database().ref('gyms/' + gymKey + '/problems/' + problemKey + '/likes').set(databaseData.gyms[gymKey].problems[problemKey].likes - 1);
      databaseData.gyms[gymKey].problems[problemKey].likes -= 1;
      self.nextElementSibling.innerHTML = databaseData.gyms[gymKey].problems[problemKey].likes;
      self.src = 'thumbsup-not-like.jpg';
    }
  } else {
    alert('You are not logged in!');
  }
}
let checkClick = (e) => {
  if (e.currentTarget.id !== 'logOut') {
    if ($('[aria-labelledby="' + e.currentTarget.id + '"]').hasClass('show')) {
      stopAnimation(e);
    } else if (e.currentTarget.id == 'openHome' && $('[aria-labelledby="openHome2"]').hasClass('show')) {
      stopAnimation(e);
    } else if (e.currentTarget.id == 'openHome2' && $('[aria-labelledby="openHome"]').hasClass('show')) {
      stopAnimation(e);
    }
  }
  if (e.currentTarget.id == 'logOut') {
    logOut();
  }
}

let stopAnimation = (e) => {
  e.preventDefault();
  e.stopPropagation();
}

let signUp = () => {
  const auth = firebase.auth();
  var pass = signUpPass.value;
  var email = signUpEmail.value;

  auth.createUserWithEmailAndPassword(email, pass);
}

let signIn = () => {
  const auth = firebase.auth();
  var pass = signInPass.value;
  var email = signInEmail.value;

  auth.signInWithEmailAndPassword(email, pass);
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
  if (firebaseUser.metadata.creationTime == firebaseUser.metadata.lastSignInTime) {
    firebase.database().ref('users/' + firebaseUser.uid).set({
      email: firebaseUser.email,
      problems: [''],
      photoUrl: 'https://dfzcfb18p6v47.cloudfront.net/images/my_profile_icon_black.png?20180313032014',
      desc: '',
      gender: ''
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
let commentBtnClicked = (e) => {
  let self = e.target;
  let problemBox = self.parentElement;


}
