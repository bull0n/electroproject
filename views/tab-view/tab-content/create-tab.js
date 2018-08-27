var ButtonAction = require('./btn-action-class.js');
var TabDiv = require('./tab-div-class.js');

var views = {};

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
  let tabDiv = new TabDiv(prefix+'-'+name, prefix, icon);
  let idDiv = `${prefix}-content`;

  $(`#${prefix}-left-button`).append(tabDiv.getButtonDisplay());
  $('#'+idDiv).append(tabDiv.getContentDiv());
  $('#' + tabDiv.getIdButton()).click(displayView);

  let view = new ClassView(project, tabDiv.getIdContentDiv());
  view.display();

  views[prefix].push(tabDiv);
}

function addAction(prefix, name, icon, actionFunction)
{
  let btnAction = new ButtonAction(prefix+'-'+name, prefix, icon);

  $(`#${prefix}-left-button`).append(btnAction.getButtonDisplay());

  $('#' + btnAction.getIdButton()).click(actionFunction);
}

function createBasicStructure(prefix, divIdTarget)
{
  $('#'+divIdTarget).html(`
    <div class="content-view">
      <div id="${prefix}-left-button" class="left-button"></div>
      <div id="${prefix}-content" class="content"></div>
    </div>
  `);
}

module.exports.displayView = displayView;
module.exports.addView = addView;
module.exports.addAction = addAction;
module.exports.createBasicStructure = createBasicStructure;
module.exports.views = views;
