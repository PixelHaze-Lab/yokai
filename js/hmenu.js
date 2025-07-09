$(function(){
  $('#hamburger').on('click', function(){
    $(this).toggleClass("open");
    $('header').toggleClass('expanded');
    $('nav').toggleClass('active');
  });
});