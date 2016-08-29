if(!window.console) {
    window.console = { log: $.noop, debug: $.noop};
}

function addListeners(sectionUrl) {
    $(":input").blur(function () {
        refreshVisibility(sectionUrl)
    });
    $("input:radio").change(function() {
        refreshVisibility(sectionUrl);
    });
    $("select").change(function() {
        refreshVisibility(sectionUrl);
    });
    var $blockLabels = $(".block-label input[type='radio'], .block-label input[type='checkbox']");
    new GOVUK.SelectionButtons($blockLabels);

}

function refreshVisibility(sectionUrl) {
    console.debug("refreshing visibility for " + sectionUrl);

    $.ajax({
        url: sectionUrl,
        type: 'POST',
        data: $("form").serializeArray(),
        dataType: 'json',
        success: function (response) {
            $.each(response, function (elementId, properties) {
                var elem = $("#" + elementId);
                if (properties.hidden) {
                    console.debug("hiding element " + elem.attr("id"));
                    elem.find("input:radio, input:checkbox").removeAttr("checked");
                    elem.hide();
                } else {
                    console.debug("showing element " + elem.attr("id"));
                    elem.removeClass("hidden"); // written server-side to help(?) non-javascript viewers
                    elem.show();
                }
            })
        }
    });

}
function focusErrors() {
  // If there is an error summary, set focus to the summary
  if ($(".error-summary").length) {
    $(".error-summary").focus();
    $(".error-summary a").click(function(e) {
      e.preventDefault();
      var targetId = $(this).attr("href");
      //find first input element in group and apply focus
      $(targetId).find('input:first, select').focus();
    });
  }
  // Otherwise, set focus to the field with the error
  else {
    $(".error input:first").focus();
  }
}
