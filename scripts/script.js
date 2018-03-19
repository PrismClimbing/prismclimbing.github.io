let databaseData;

$('.nav-link').click(e => {
  checkClick(e);
});

$('.navbar-brand').click(e => {
  checkClick(e);
});

$('.collapse.no-transition').on('shown.bs.collapse', (e) => {
  if (e.currentTarget !== $('.active.nav-link')[0]) {
    if (e.currentTarget.getAttribute('aria-labelledby') == 'openHome2') {
      $('.active.nav-link').removeClass('active');
      $('#openHome').addClass('active');
      window.location.hash = 'home';
    } else {
      $('.active.nav-link').removeClass('active');
      $('#' + $('#' + e.currentTarget.id).attr('aria-labelledby')).addClass('active');
      window.location.hash = $('.active.nav-link').attr('href');
    }
  }
});

window.onload = functionRedirector();
