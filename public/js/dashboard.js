var posts = [];
var mWidth = "";
var url = window.location.search;
  var userId;
  if (url.indexOf("?user_id=") !== -1) {
    userId = url.split("=")[1];
    getPosts(userId);
  }
  // If there's no authorId we just get all posts as usual
  else {
    getPosts();
  }

function getPosts(user) {
    userId = user || "";
    if (userId) {
      userId = "/?user_id=" + userId;
    }
    $.get("/api/posts" + userId, function(data) {
      console.log("posts", data);
      posts = data;
      if (!posts || !posts.length) {
        console.log("nothing found");
      }
      else {
        for (var i = 0; i < posts.length; i++) {
          var item = $('#dash');
          var image = document.createElement('img');
          image.id = "postimage";
          image.src = posts[i].image;
          item.append(image);
      }
    }
  });
}
