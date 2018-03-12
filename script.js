$('.collapse.container').on('hidden.bs.collapse', function (e) {
  if($('.collapse.container').length !== 2) {
	$("#" + e.currentTarget.id.toString()).collapse('show');
	$(".active.nav-link").removeClass("active");
        $("#" + $("." + e.currentTarget.id.toString()).aria-labelledby).addClass("active");
  }
});
