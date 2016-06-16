// If there is an error summary, set focus to the summary
if ($(".error-summary").length) {
  $(".error-summary").focus();
  $(".error-summary a").click(function(e) {
    e.preventDefault();
    var targetId = $(this).attr("href");
    //find first input lement in group and apply focus
    $(targetId).find('input:first, select').focus();
  });
}
// Otherwise, set focus to the field with the error
else {
  $(".error input:first").focus();
}
