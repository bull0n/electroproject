function displayView(event)
{
  for(let i = 0; i < views.length; i++)
  {
    $('#'+views[i].getIdButton()).removeClass('active-btn-view');
    $('#'+views[i].getIdContentDiv()).removeClass('active-view');
  }

  let element = event.currentTarget;

  element.className += ' active-btn-view'

  let viewId = element.id.replace('-btn', '-view');

  document.getElementById(viewId).className += ' active-view';
}

function addView(name, icon, htmlFile)
{
  let view = new View(name, icon);

  $('#left-button').append(view.getButtonDisplay());
  $('#content').append(view.getContentDiv());

  //$(view.getIdContentDiv).load(htmlFile); //final function
  $('#' + view.getIdContentDiv()).append(view.name); //temp

  $('#' + view.getIdButton()).click(displayView);

  views.push(view);
}

let views = [];

addView('Diagram', '', '');
addView('Tasks', '', '');
addView('Team', '', '');
