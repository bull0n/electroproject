const ACTIVE_TAB_CLASS = ' active-tab';
const ACTIVE_CONTENT_CLASS = ' active-content';
const TAB_CLASS = ' tab';
const CONTENT_CLASS = ' tab-content';
const ID_TAB_PREFIX = 'tab-';
const ID_CONTENT_PREFIX = 'content-';

//add tab for testing
let tabView = new TabView();
tabView.addFile('salut');
// tabView.addFile('Bonjour');

//adapt the height of the div to the full width
$(window).resize(function()
{
  $('#tab-content').height($('#tab-content').parent().height() - $('#tabs').height());
});

$(document).ready(function()
{
  $(window).trigger('resize');
})
