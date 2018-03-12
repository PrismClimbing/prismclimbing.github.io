$('.collapse.container').on('hidden.bs.collapse', function(e) {
  if ($('.collapse.container').length !== 2) {
    $("#" + e.currentTarget.id.toString()).collapse('show');
  }
});

$('.nav-link').click(function(e) {
  $('.active.nav-link').removeClass('active');
  $('#' + e.currentTarget.id).addClass('active');
});
