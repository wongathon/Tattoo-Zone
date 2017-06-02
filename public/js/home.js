$(document).ready(function() {

// postContainer will hold the posts for all users
var postContainer = $("#all-posts");
var postSortSelector = $() //needs to return api? 


$(document).on("click", "#top-today", getPosts);
//$(document).on("click", "#all-time", getAllPosts);
//$(document).on("click", "#new", getNewPosts);

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

function initializePosts() {
  postContainer.empty();
  var postsToAdd = [];
  for (var i = 0; i < posts.length; i++){
    postsToAdd.push(createPostItem(posts[i]));
  }
  postContainer.append(postsToAdd);
  console.log(postContainer);

} 

function createPostItem(post){
  console.log(post);
  var newPost = $("<div>");
  newPost.addClass("col-md-3 col-sm-4 col-xs-6");
  newPost.addClass("wrap");

  var newPostImg = $('<img>');
  var imgSrc = post.image; //should point to post model image column **
  newPostImg.addClass("img-responsive post-image");
  newPostImg.attr("src", imgSrc);

  var newPostOverlay = $("<div>");
  newPostOverlay.addClass("image-overlay");

  var overlayText = $('<div>');
  overlayText.addClass("overlay-text");

  var thumbIcon = $("<i/>").addClass("icon fa-thumbs-up");
  var likesNum = post.likes;
  
  var bubbleIcon = $("<i/>").addClass("icon fa-comment");
  overlayText.append(thumbIcon);
  overlayText.append(likesNum);
  overlayText.append(bubbleIcon);

  newPostOverlay.append(overlayText);


  newPost.append(newPostImg);
  newPost.append(newPostOverlay);
  //** how would this work?
  //var commentsNum = post.Comments.length; 
  return newPost;

}

//define mouseover behavior 
$('.wrap').mouseover(function() {
  $('.image-overlay').css("display", "block");
}).mouseout(function() {
  $('.image-overlay').css("display", "none");
});


});
