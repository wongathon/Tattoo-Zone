$(document).ready(function() {

// postContainer will hold the posts for all users
var postContainer = $(".post-container");
var postSortSelector = $() //needs to return api? 


$(document).on("click", "#top-today", getPosts);
$(document).on("click", "#all-time", getAllPosts);
$(document).on("click", "#new", getNewPosts);

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
} 

function createPostItem(post){
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

  var thumbIcon = $("i").addClass("fa fa-thumbs-up");
  var likesNum = post.likes;
  var bubbleIcon = $("i").addClass("fa fa-comment");
  //** how would this work?
  var commentsNum = post.Comments.length; 


}

//define mouseover behavior 
$('.wrap').mouseover(function() {
  $('.image-overlay').show();
}).mouseout(function() {
  $('.image-overlay').hide();
});


});
