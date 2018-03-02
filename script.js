$('.nav-link').on('click',function(e) {
    if($("collapse container").hasClass('in')) {
        e.stopPropagation();
    }
    // You can also add preventDefault to remove the anchor behavior that makes
    // the page jump
    // e.preventDefault();
});
