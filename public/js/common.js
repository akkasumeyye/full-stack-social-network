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
})

$("#submitPostButton").click(() => {
  var button = $(event.target);
  var textbox = $("#postTextArea");

  var data = {
    content: textbox.val()
  }

  $.post("/api/posts", data, postData => {
    var html = createPostHtml(postData);
    $(".postsContainer").prepend(html);
    textbox.val("");
    button.prop("disabled", true);
  });
})

function createPostHtml(postData) {

  
  var postedBy = postData.postedBy;
  
  if(postedBy == undefined) {
    return console.log("User not found");
  }

  var displayName = postedBy.firstName + " " + postedBy.lastName;

  return `<div class="post">
              <div class="mainContentContainer">
                <div class="userImageContainer">
                  <img src="${postedBy.profilePic}" alt=""/>
                </div>
                <div class="postContentContainer">
                  <div class="header">
                    <a href="/profile/${postedBy.username}">${displayName}</a>
                    <span class="username">${postedBy.username}</span>
                  </div>
                  <div class="postBody">
                    <span>${postData.content}</span>
                  </div>
                  <div class="postFooter">
                  </div>
                </div>
              </div>
          </div>`;

}
