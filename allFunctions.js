let functionRedirector = () => {
  checkHash(window.location.hash);
  firebaseLoadData();
}
let firebaseLoadData = () => {
  firebase.database().ref('/').once('value', (snap) => {
    databaseData = snap.val();
    $("#loader").fadeOut("fast");
    addProblemInfo(databaseData)
  });
}
let toArray = (obj) => {
  return Object.keys(obj);
}
let makeElem = (elem) => {
  return document.createElement(elem);
}
let addCommentInfo = (comments) => {
  let commentDivReturn = makeElem('div');
  commentDivReturn.innerHTML = '<h5>Comments</h5>'
  for(i in comments) {
    let commentWrapper = makeElem('div');
    let commentUser = databaseData.users[comments[i].user].username;
    let comment = comments[i].message;
    let commentUserName = makeElem('h6');
    let commentText = makeElem('p');
    setText(commentUserName, commentUser);
    setText(commentText, comment);
    commentWrapper.append(commentUserName);
    commentWrapper.append(commentText);
    commentWrapper.classList.add('container');
    commentWrapper.classList.add('list-group-item');
    commentDivReturn.append(commentWrapper);
  }
  return commentDivReturn;
}
let setText = (elem, text) => {
  elem.innerText = text;
}
let addProblemInfo = (databaseData) => {
  let gyms = databaseData.gyms;
  for(i in gyms) {
    let gymNameAppend = makeElem('h4');
    let problems = gyms[i].problems;
    setText(gymNameAppend, gyms[i].name);
    problemsDiv.append(gymNameAppend);
    for(k in problems) {
      let grade = problems[k].grade;
      let comments = problems[k].comments;
      let likes = problems[k].likes;
      let color = problems[k].color;
      let problemDiv = makeElem('div');
      let problemTitleDiv = makeElem('div');
      let problemTitle = makeElem('h5');
      let problemColor = makeElem('div');
      let problemLikesDiv = makeElem('div');
      let problemLikesNum = makeElem('h6');
      let problemCommentsDiv = addCommentInfo(comments);
      problemCommentsDiv.classList.add('problemComments');
      problemCommentsDiv.classList.add('list-group');
      setText(problemTitle, grade);
      problemTitle.classList.add('problemTitle');
      problemColor.style.backgroundColor = color;
      problemColor.classList.add('problemColor')
      problemTitleDiv.append(problemTitle);
      problemTitleDiv.append(problemColor);
      setText(problemLikesNum, likes.toString());
      problemLikesNum.classList.add('problemLikes');
      problemLikesDiv.innerHTML = '<img src="thumbsup.jpg" style="display:inline-block" height="15" width="15"></img>';
      problemLikesDiv.append(problemLikesNum);
      problemDiv.classList.add('list-group-item');
      problemDiv.append(problemTitleDiv);
      problemDiv.append(problemCommentsDiv);
      problemDiv.append(problemLikesDiv);
      problemsDiv.append(problemDiv);
    }
  }
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
