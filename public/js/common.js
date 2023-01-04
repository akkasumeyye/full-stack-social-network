$("#postTextArea").keyup(function (e) {
  var textbox = $(e.target);
  var value = textbox.val().trim();
  console.log(value);

  var submitButton = $("#submitPostButton");

  if(submitButton.length == 0) return alert("No submit button found");

  if (value == "") {
    submitButton.prop("disabled", true);
    return;
  }

  submitButton.prop("disabled", false);
})

$("#submitPostButton").click(function (e) {
    e.preventDefault();

    var button = $(e.target);
    var textbox = $("#postTextArea");

    var data = {
        content: textbox.val().trim(),
    }

    $.post("/api/post", data, function (postData , status , xhr) {
        
    })
})
