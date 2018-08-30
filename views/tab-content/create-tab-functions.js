let ButtonAction = require('./btn-action-class.js');

let views = {};

function displayView(event)
{
  let prefix = $(event.currentTarget).attr('data-prefix');

  for(let i = 0; i < views[prefix].length; i++)
  {
    $('#'+views[prefix][i].getIdButton()).removeClass('active-btn-view');
    $('#'+views[prefix][i].getIdContentDiv()).removeClass('active-view');
  }

  let element = event.currentTarget;

  element.className += ' active-btn-view';

  let viewId = element.id.replace('-btn', '-view');
  document.getElementById(viewId).className += ' active-view';
}

function addView(prefix, name, icon, ClassView, project)
{
  let idDiv = `${prefix}-content`;

  let view = new ClassView(undefined, project, prefix, icon);

  $(`#${prefix}-left-button`).append(view.getButtonDisplay());
  $('#'+idDiv).append(view.getContentDiv());
  $('#' + view.getIdButton()).click(displayView);

  view.display();

  views[prefix].push(view);
}

function addAction(prefix, name, icon, actionFunction)
{
  let btnAction = new ButtonAction(prefix+'-'+name, prefix, icon);

  $(`#${prefix}-left-button`).append(btnAction.getButtonDisplay());

  $('#' + btnAction.getIdButton()).click(actionFunction);
}

function refreshTabContent(prefix)
{
  for(let i = 0; i < views[prefix].length; i++)
  {
    views[prefix][i].display();
  }
}

module.exports.displayView = displayView;
module.exports.addView = addView;
module.exports.addAction = addAction;
module.exports.views = views;
module.exports.refreshTabContent = refreshTabContent;
