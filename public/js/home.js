$(document).ready(function() {

// postContainer will hold the posts for all users
var postContainer = $("#all-posts");

$(document).on("click", "#top-today", getPosts);
//$(document).on("click", "#all-time", getAllPosts);
//$(document).on("click", "#new", getNewPosts);
$(document).on("click", ".post-link", handlePostView)

getPosts();

function getPosts(){

  $.get("/api/posts", function(data){
    console.log("Posts", data);
    posts = data; 
    if(!posts || !posts.length) {
      //display message
      postContainer.append("<h2>No Posts Yet!<h2>");
    } else {  
      initializePosts();
    }
  });
}

function getCommentsNumber(postID, cb){
  $.ajax({
    method: "GET",
    url: "/api/comments/" + postID
  }).done(function(data){
    if (data.length>0){
      //console.log(data.length);
      cb(data.length);
    } else {
        cb(0);
    }
  });
}

function initializePosts() {
  postContainer.empty();
  var postsToAdd = [];
  for (var i = 0; i < posts.length; i++){
    postsToAdd.push(createPostItem(posts[i]));
  }
  postContainer.append(postsToAdd);
} 

function createPostItem(post){
  console.log(post);
  var newPost = $("<div>");
  newPost.addClass("col-md-3 col-sm-4 col-xs-6");
  newPost.addClass("post-link");
  newPost.attr("id", post.id);

  var newPostImg = $('<img>');
  var imgSrc = post.image; //should point to post model image column **

  newPostImg.addClass("img-responsive");
  newPostImg.attr("src", imgSrc);

  var newPostOverlay = $("<div>");
  newPostOverlay.addClass("image-overlay");

  var overlayText = $('<div>');
  overlayText.addClass("overlay-text");

  var thumbIcon = $("<i/>").addClass("icon fa-thumbs-up");
  var likesNum = post.likes;
  var bubbleIcon = $("<i/>").addClass("icon fa-comment");

  var commentsNum = getCommentsNumber(post.id, function(res){ //problem child. 
    return res;
  });

  console.log(commentsNum);

  overlayText.append(thumbIcon);
  overlayText.append(likesNum+" ");
  overlayText.append(bubbleIcon);
  overlayText.append("0");
  overlayText.append(commentsNum);

  //newPostOverlay-ex
  newPost.append(overlayText);


  newPost.append(newPostImg);
  newPost.append(newPostOverlay);

  return newPost;

}

//define mouseover behavior 
// $('.wrap').mouseover(function() {
//   $('.image-overlay').css("display", "block");
// }).mouseout(function() {
//   $('.image-overlay').css("display", "none");
// });

function handlePostView(){
  //console.log(this);
  var clickPost = $(this).attr("id");
  console.log(clickPost);
  window.location.href = "/postview/" + clickPost;
}

});
