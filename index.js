// Imports for all the program
var $ = require("jquery");
require("bootstrap");


$(document).ready(function()
{
  let ConfirmModal = require('./views/confirm-modal/confirm-modal.js');
  ConfirmModal.display($('#modal-container'));

  let ListMembers = require('./views/list-members/list-members.js');
  let Project = require('./data/project.js').Project;
  console.log(Project);

  let project = new Project();
  let listMembers = new ListMembers($('body'), project);
  listMembers.display();
});
