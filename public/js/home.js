$(document).ready(function() {
    $.get("/api/posts", results => {
            outputPosts(results, $(".postsContainer"));
    })
})

function outputPosts(results, container) {
    container.html("");
    results.forEach(result => {
        var html = createPostHtml(result);
        container.append(html);
    })

    if(results.length == 0) {
        container.append("<p>No posts found</p>");
    }
}

