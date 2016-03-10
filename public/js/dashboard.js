$(document).ready(function(){
  $(".addForm").hide();
  var flag = true;
  $("#addArticle").bind('click',function(){
    if(flag){
      $(".addForm").show();
      flag = false;
    }else{
      $(".addForm").hide();
      flag = true;
    }

  })

})