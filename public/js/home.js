$(document).ready(function(){
  $.ajax({
    method: "GET",
    url: "/api/articles",
    success: function(data){
      console.log(data);
      var str = "";
      for(var i = 0; i < data.length; i++){
        if(i == 0){
          str = "<div class='row'>";
        }
        if(i > 2 && (i-2)%3 == 0){
          str = str + "</div><div class='row'>";
        }
        str = str + "<div class='col-md-4'><img class='image' src='" + data[i].image + "'/><a style='display:block' href='/api/articles/" + data[i]._id + "'><p style='background-color:lightgray'>" + data[i].title + "</p></a><p>" + data[i].summary + "</p></div>";
        if(i == 2 && data.length-1 > 2){
          str = str + "</div><div class='row'>";
        }
        if(i == data.length-1){
          str = str + "</div>"
        }
      }
      $("div .jumbotron").after(str);
    }
  })

  var flag = true;
  $("#addArticle").bind('click',function(){
    if(flag){
      $(".addForm").show();
      flag = false;
    }else{
      $(".addForm").hide();
    }

  })

})