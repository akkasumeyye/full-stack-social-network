$(function () {
  $('a[data-bs-toggle="collapse"]').on("click", function () {
    var objectID = $(this).attr("href");
    $(objectID).collapse('toggle');
    // if ($(objectID).hasClass("in")) {
    //   $(objectID).collapse("hide");
    // } else {
    //   $(objectID).collapse("show");
    // }
  });
});

