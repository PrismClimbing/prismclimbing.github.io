let checkHash = (hash) => {
  if (typeof hash == 'undefined') return;
  if (hash.charAt(0) != '#') return;
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

  if (e.currentTarget.id !== 'logOut') {
    window.location.hash = $('.active.nav-link').attr('href');
  }
  if (e.currentTarget.id == 'logOut') {
    logOut();
  }
}

let stopAnimation = (e) => {
  e.preventDefault();
  e.stopPropagation();
}

$('.nav-link').click(e => {
  checkClick(e);
});

$('.navbar-brand').click(e => {
  checkClick(e);
});

$('.collapse.no-transition').on('shown.bs.collapse', (e) => {
  if (e.currentTarget !== $('.active')[0]) {
    $('.active').removeClass('active');
    $('#' + $('#' + e.currentTarget.id).attr('aria-labelledby')).addClass('active');
  }
});

window.onload = checkHash(window.location.hash);
