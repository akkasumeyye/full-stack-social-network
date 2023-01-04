$("#postTextArea").keyup((event) => {
  var textbox = $(event.target);
  var value = textbox.val().trim();
  // console.log(value);

  var submitButton = $("#submitPostButton");

  if (submitButton.length == 0) return alert("No submit button found");

  if (value == "") {
    submitButton.prop("disabled", true);
    return;
  }
  submitButton.prop("disabled", false);
});

$("#submitPostButton").click((event) => {
  var button = $(event.target);
  var textbox = $("#postTextArea");

  var data = {
    content: textbox.val(),
  };

  $.post("/api/posts", data, postData => {
    var html = createPostHtml(postData);
    $(".postsContainer").prepend(html);
    textbox.val("");
    button.prop("disabled", true);
  });
});

function createPostHtml(postData) {
 
  var postedBy = postData.postedBy;

  return ` <div class="post">
                
      <div class="mainContentContainer">
          <div class="userImageContainer">
            <img src='${postedBy.profilePic}'>
          </div>
          <div class="postContentContainer">
              <div class="header>
              </div>
              <div class="postBody>
                  <span>${postData.content}</span>
              </div>
              <div class="postFooter>
              </div>
          </div>
      </div>

  </div>`;
}