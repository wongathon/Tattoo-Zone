//will contain code that works to display posted picture with details on screen. 
$(document).ready(function () {

  $.get('/api/users', function(data){
    console.log(data);
    $("p#uGroup").each(function(){
      var itemId = $(this).find('#uID').html().trim(); 
      var user = data.filter(function(user){
        return user.id === parseInt(itemId);
      })[0];
      $(this).find('#uName').html(user.username);
    });
  });

  //new comment
  $("#new-comment").submit(function(e){
    var comment = $("#comment").val().trim();

    var url = window.location.href;
    console.log()
    var postId = url.slice(31);

    $.post('/api/comments', {
      text: comment,
      PostId: postId
    }, function(data){
      console.log(data);
      $("#comment").val("");
      $("#comments-none").val("");
      $(".comments").append("<p><span id=\"uName\"></span><span id="+data.UserId+" hidden></span> said: "+data.text+"</p>")
    });
    //maybe necessary to reload page with data and update usernames
    e.preventDefault();
  });

});