// If there is an error summary, set focus to the summary
if ($(".error-summary").length) {
  $(".error-summary").focus();
  $(".error-summary a").click(function(e) {
    e.preventDefault();
    var href = $(this).attr("href");
    $(href).focus();
  });
}
// Otherwise, set focus to the field with the error
else {
  $(".error input:first").focus();
}
