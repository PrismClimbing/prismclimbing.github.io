let functionRedirector = () => {
  addIncludes();
}
let firebaseLoadData = (problemsDiv) => {
  firebase.database().ref('/').once('value', (snap) => {
    databaseData = snap.val();
    $('#loader').fadeOut('fast');
    initProblemInfo(databaseData, problemsDiv)
  });
}
let addIncludes = () => {
  let allIncludes = document.getElementsByTagName('include');
  let realIncludes = Array.prototype.slice.call(allIncludes);
  for (i in realIncludes) {
    let file = realIncludes[i].id;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          document.getElementById(file).outerHTML = this.responseText;
          if(i == realIncludes.length-1) {
            let problemsDiv = document.getElementById('problemsDiv');
            checkHash(window.location.hash);
            firebaseLoadData(problemsDiv);
          }
        }
      }
    }
    xhttp.open("GET", file, false);
    xhttp.send();
  }
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
    if (self.src == window.location.origin + '/images/thumbsup-not-like.jpg') {
      self.src = 'images/thumbsup-like.jpg';
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
      self.src = 'images/thumbsup-not-like.jpg';
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
      gender: '',
      username: ''
    });
  }
}

let configLogOut = () => {
  signInNavBtn.classList.remove('d-none');
  signUpNavBtn.classList.remove('d-none');
  logOutNavBtn.classList.add('d-none');
  profileNavBtn.classList.add('d-none');
  $('[src="images/thumbsup-like.jpg"]').attr('src', 'images/thumbsup-not-like.jpg');
  document.getElementById('openHome').click();
}
let commentBtnClicked = (e) => {
  if ($('.commentBox').length == 0) {
    let self = e.target;
    let problemBox = self.parentElement;
    let commentBoxContainer = makeElem('div');
    let commentBox = makeElem('textarea');
    let commentButtonBox = makeElem('div');
    let commentButton = makeElem('button');
    let commentCancelButton = makeElem('button');

    commentBoxContainer.classList.add('form-group', 'commentBox');

    commentBox.classList.add('form-control');
    commentBox.id = 'comment';

    commentButton.classList.add('btn', 'btn-primary', 'commentButton');
    commentButton.innerText = 'Comment';
    commentButton.addEventListener('click', commentClicked);

    commentCancelButton.classList.add('btn', 'btn-secondary', 'commentButton');
    commentCancelButton.innerText = 'Cancel';
    commentCancelButton.addEventListener('click', commentCancelClicked);

    commentButtonBox.style.textAlign = 'right';
    commentButtonBox.append(commentCancelButton);
    commentButtonBox.append(commentButton);

    commentBoxContainer.append(commentBox);
    commentBoxContainer.append(commentButtonBox);

    problemBox.append(commentBoxContainer);
  } else {
    alert('You are already commenting.');
  }
}
let commentCancelClicked = (e) => {
  $('.commentBox').remove();
}
let commentClicked = (e) => {
  let comment = $('#comment')[0].value;
  let problemDiv = $('#comment')[0].parentElement.parentElement;
  let gymId = problemDiv.children.item(2).firstChild.id.split(' ')[1];
  let problemId = problemDiv.children.item(2).firstChild.id.split(' ')[0];
  if (firebase.auth().currentUser !== null) {
    let currentUser = firebase.auth().currentUser.uid;
    if (comment.length <= 280 && comment.length !== 0) {
      let commentRef = firebase.database().ref('gyms/' + gymId + '/problems/' + problemId + '/comments').push();
      commentRef.set({
        message: comment,
        user: currentUser
      })
      $('.commentBox').remove();
      addCommentRealTime(problemDiv.children.item(1), firebase.auth().currentUser.uid, comment);
    } else {
      alert('You can only comment between 1 to 280 letters: ' + comment.length);
    }
  }
}
let addCommentRealTime = (commentDiv, userId, message) => {
  let commentWrapper = makeElem('div');
  let commentUser = databaseData.users[userId].username;
  let commentUserImgUrl = databaseData.users[userId].photoUrl;
  let comment = message;
  let commentUserName = makeElem('h6');
  let commentImg = makeElem('img');
  let commentBody = makeElem('div');
  let commentText = document.createTextNode(comment);

  setText(commentUserName, commentUser);
  setText(commentText, comment);
  /*
  Setting classes and adding other properties
  */
  commentBody.classList.add('media-body');

  commentUserName.classList.add('mt-0');

  commentImg.src = commentUserImgUrl;
  commentImg.alt = 'Profile Image';
  commentImg.height = '40';
  commentImg.width = '40';
  commentImg.classList.add('commentImg', 'mr-3');

  commentBody.append(commentUserName);
  commentBody.append(commentText);

  commentWrapper.append(commentImg);
  commentWrapper.append(commentBody);
  commentWrapper.classList.add('media', 'container', 'commentWrapper');

  commentDiv.append(commentWrapper);
}
