$(".nav li").mouseenter(function () {
  let changeImage = $(this).attr("data-image");
  $(".photo").css({ background: `url(${changeImage})` });
});

$(".nav li").mouseleave(function () {
  $(".photo").css({ background: "" });
});
