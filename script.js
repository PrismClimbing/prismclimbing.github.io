$('.collapse.container').on('hidden.bs.collapse', function (e) {
  if($('.collapse.container').length !== 2) {
	$("#" + e.currentTarget.id.toString()).collapse('show');
  }
});
$(".nav-link").on("click", function(){
  $(".nav-link").find(".active").removeClass("active");
  $(this).addClass("active");
});
