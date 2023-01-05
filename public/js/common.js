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

$("#submitPostButton").click(() => {
  var button = $(event.target);
  var textbox = $("#postTextArea");

  var data = {
    content: textbox.val(),
  };

  $.post("/api/posts", data, (postData) => {
    var html = createPostHtml(postData);
    $(".postsContainer").prepend(html);
    textbox.val("");
    button.prop("disabled", true);
  });
});

function createPostHtml(postData) {
  var postedBy = postData.postedBy;

  if (postedBy == undefined) {
    return console.log("User not found");
  }

  var displayName = postedBy.firstName + " " + postedBy.lastName;
  var timestamp = timeDifference(new Date(), new Date(postData.createdAt));

  return `<div class="post">
              <div class="mainContentContainer">
                <div class="userImageContainer">
                  <img src="${postedBy.profilePic}" alt=""/>
                </div>
                <div class="postContentContainer">
                  <div class="header">
                    <a href="/profile/${postedBy.username}">${displayName}</a>
                    <span class="username">${postedBy.username}</span>
                    <span class="date">${timestamp}</span>
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

function timeDifference(current, previous) {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    if(elapsed/1000 < 30) return 'Just now';
    return Math.round(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    return  Math.round(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    return  Math.round(elapsed / msPerMonth) + " months ago";
  } else {
    return Math.round(elapsed / msPerYear) + " years ago";
  }
}
