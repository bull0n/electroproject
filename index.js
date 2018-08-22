window.$ = window.jQuery = require('jquery');

$(document).ready(function()
{
  $('#test').click(function()
  {
    $('body').load('views/tab-view/tab-view.html');
  });
});
