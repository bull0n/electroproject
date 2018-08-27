var ButtonAction = require('./btn-action-class.js');
var View = require('./view-class.js');

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

  element.className += ' active-btn-view'

  let viewId = element.id.replace('-btn', '-view');

  document.getElementById(viewId).className += ' active-view';
}

function addView(prefix, name, icon, content)
{
  let view = new View(prefix+'-'+name, prefix, icon, content);

  $(`#${prefix}-left-button`).append(view.getButtonDisplay());
  $(`#${prefix}-content`).append(view.getContentDiv());

  $('#' + view.getIdButton()).click(displayView);

  views[prefix].push(view);
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
