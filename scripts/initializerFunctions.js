let initLikesDiv = (likes, problem, gym) => {
  let likesDiv = makeElem('div');
  let problemLikes = makeElem('h6');
  let likeImage = makeElem('img');
  let imageSource = 'images/thumbsup-not-like.jpg';

  setText(problemLikes, likes.toString());
  problemLikes.classList.add('problemLikes');

  let fireUser = firebase.auth().currentUser;
  if(!fireUser) {
    imageSource = 'images/thumbsup-not-like.jpg';
  } else {
    let allLiked = databaseData.users[fireUser.uid].likes;
    for(j in toArray(allLiked)) {
      if(problem == toArray(allLiked)[j] && allLiked[toArray(allLiked)[j]] == 'true') {
        imageSource = 'images/thumbsup-like.jpg'
      }
    }
  }

  likeImage.id = problem + ' ' + gym;
  likeImage.addEventListener('click', likeButtonClicked);
  likeImage.style = 'display:inline-block;cursor:pointer';
  likeImage.height = '15';
  likeImage.width = '15';
  likeImage.src = imageSource;

  likesDiv.append(likeImage);

  likesDiv.classList.add('problemLikes');
  likesDiv.append(problemLikes);

  return likesDiv;
}










let initTitleDiv = (title, color) => {
  /*
  Creating all the elements needed
  */
  let titleDiv = makeElem('div');
  let problemTitle = makeElem('h5');
  let problemColor = makeElem('div');
  /*
  Setting the problem title
  */
  setText(problemTitle,title);
  problemTitle.classList.add('problemTitle');
  /*
  Setting the problem color
  */
  problemColor.style.backgroundColor = color;
  problemColor.classList.add('problemColor')
  /*
  Appending them to the problem title div element
  */
  titleDiv.append(problemTitle);
  titleDiv.append(problemColor);

  return titleDiv;
}










let initCommentDiv = (comments) => {
  /*
  Creating the return element and adding a title to it
  */
  let commentDivReturn = makeElem('div');

  let commentDivTitle = makeElem('h5');
  setText(commentDivTitle, 'Comments');
  commentDivReturn.append(commentDivTitle);

  /*
  Looping through all the comments
  */
  for(f in comments) {
    /*
    Creating the neccesary elements
    */
    let commentWrapper = makeElem('div');

    let commentUser = databaseData.users[comments[f].user].username;
    let commentUserImgUrl = databaseData.users[comments[f].user].photoUrl;
    let comment = comments[f].message;
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
    commentWrapper.classList.add('media','container','commentWrapper');

    commentDivReturn.append(commentWrapper);
  }
  commentDivReturn.classList.add('problemComments', 'list-group');

  return commentDivReturn;
}










let initCommentButtonDiv = () => {
  let commentBtn = makeElem('img');

  commentBtn.src = 'images/comment-button.png';
  commentBtn.height = '15';
  commentBtn.width = '15';
  commentBtn.classList.add('commentBtn');

  commentBtn.addEventListener('click', commentBtnClicked);

  return commentBtn;
}









let initProblemInfo = (databaseData, problemsDiv) => {
  let gyms = databaseData.gyms;
  for(i in gyms) {
    let gymDiv = makeElem('div');
    let gymNameAppend = makeElem('h4');
    let problems = gyms[i].problems;
    setText(gymNameAppend, gyms[i].name);
    problemsDiv.append(gymNameAppend);
    for(k in problems) {
      let likeOrNot = 'images/thumbsup-not-like.jpg';
      let grade = problems[k].grade;
      let comments = problems[k].comments;
      let likes = problems[k].likes;
      let color = problems[k].color;
      let problemDiv = makeElem('div');
      let problemTitleDiv = initTitleDiv(grade,color);
      let problemLikesDiv = initLikesDiv(likes, k, i);
      let commentButtonDiv = initCommentButtonDiv('img');
      let problemCommentsDiv = initCommentDiv(comments);
      problemDiv.classList.add('list-group-item');
      problemDiv.append(problemTitleDiv);
      problemDiv.append(problemCommentsDiv);
      problemDiv.append(problemLikesDiv);
      problemDiv.append(commentButtonDiv);
      gymDiv.append(problemDiv);
      problemsDiv.append(gymDiv);
    }
  }
}
