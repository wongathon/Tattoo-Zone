//will contain code that works to display posted picture with details on screen. 
$(document).ready(function () {

  //new comment
  $("#commentSumbit").submit(function(e){
    var comment = $("#comment").val();

    var url = window.location.href;
    console.log()
    var postId = url.slice(24);

    $.post('/api/comments', {
      text: comment,
      UserId: req.user.id,
      PostId: postId
    }, function(data){

      $(".comments").append("<p><span id=\"uName\"></span><span id="+data.UserId+" hidden></span> said: "+data.text+"</p>")
    });

    //maybe necessary to reload page with data and update usernames
    //e.preventDefault();
  })

  //poplulate comment with usernames
  // $.get('/api/comments/:postid', function(data){

  // });


})