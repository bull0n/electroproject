// Imports
let AbstractView = require('../../abstract-view-class.js');
let {Project, Task, Member} = require('../../data/project.js');
let SerializerTool = require('../../tools/serializertool.js');
let Modal = require('../modal/modal-class.js')

class ListMembers extends AbstractView
{
  constructor(element, project)
  {
    super(element);
    this.project = project;
    this.listMembers = this.project.team;
    this.listMembers = SerializerTool.unserializeFromFile("./team.epd");  // Tests
  }

  display()
  {
    let htmlText = `
    <link rel="stylesheet" type="text/css" href="./views/list-members/list-members.css">

    <table id="tbl_members" class="table table-hover">
      <col id="tbl_column_color">
      <col id="tbl_column_name">
      <thead>
        <tr>
          <th scope="col">Color</th>
          <th scope="col">Name</th>
        </tr>
      </thead>
      <tbody>
      `
       + this.getHTMLList() +
      `
      </tbody>
    </table>

    <div id="div-team-edition" class="btn-group" role="group">
      <button type="button" class="btn btn-primary btn-team-edition" id="btn-add-member">Add</button>
      <button type="button" class="btn btn-primary btn-team-edition" id="btn-modify-member">Modify</button>
      <button type="button" class="btn btn-primary btn-team-edition" id="btn-remove-diagram">Remove</button>
    </div>
    `;

    $(this.element).html(htmlText);
    this.addEvent();
  }

  addMember(member)
  {
    let htmlText = `<tr><td bgcolor="` + member.color + `"></td>`;
    htmlText += `<td>` + member.name + `</td></tr>`;
    return htmlText;
  }

  getHTMLList()
  {
    let htmlText = ``;

    for(let i = 0;i < this.listMembers.length; i++)
    {
      let member = this.listMembers[i];
      htmlText += this.addMember(member);
    }

    return htmlText;
  }

  addEvent()
  {
    // Insert the modal
    Modal.load('member-edit-modal');

    // Actions on the page
    $(document).ready(function()
    {
      $("#btn-add-member").click(function()
      {
          Modal.prepare('New Member', './views/team-manager/member_form.html');

          $(document).ready(function()
          {
            $('#member-edit-modal').modal('show');
          });
      });

      $("#btn-modify-member").click(function()
      {
          Modal.prepare('Modify Member', './views/team-manager/member_form.html');

          $(document).ready(function()
          {
            let elementsMap = new Map();
            elementsMap.set("#cp_member_color");
            elementsMap.set("#txt_member_name", "George");

            Modal.setValues(elementsMap);
            $('#member-edit-modal').modal('show');
          });
      });
    });
  }
}

module.exports = ListMembers;
