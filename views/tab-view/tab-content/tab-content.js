function createTabContent(prefix, divIdTarget)
{
  var {displayView, addView, addAction, createBasicStructure, views} = require('./create-tab.js');

  views[prefix] = [];

  createBasicStructure(prefix, divIdTarget);

  addView(prefix, 'Diagram', '<i class="fas fa-equals"></i>', '');
  addView(prefix, 'Tasks', '<i class="fas fa-tasks"></i>', '');
  addView(prefix, 'Team', '<i class="fas fa-users"></i>', '');

  addAction(prefix, 'Save', '<i class="fas fa-save"></i>', function() { console.log('hello world'); });

  $('#'+ views[prefix][0].getIdButton()).click();
}

module.exports = createTabContent
