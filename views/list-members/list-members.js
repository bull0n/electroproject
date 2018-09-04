/**
 * @author : Malik Fleury, Bulloni Lucas
 * @description : Class to display a list of member with some actions (add/edit/delete)
 */
// Imports
let AbstractTabContentView = require('../../abstract-tab-content-view.js');
let {Project, Task, Member} = require('../../data/project.js');
let Modal = require('../modal/modal.js');
let SerializerTool = require('../../tools/serializertool.js');

class ListMembers extends AbstractTabContentView
{
  constructor(element, project, prefix, icon)
  {
    super(element, project, prefix, icon);
  }

  display()
  {
    let htmlText = `
    <link rel="stylesheet" type="text/css" href="./views/list-members/list-members.css">

    <h3>Team</h3>

    <table id="tbl_members" class="table table-hover">
      <col id="tbl_column_color">
      <col id="tbl_column_name">
      <col id="tbl_column_Controls">
      <thead>
        <tr>
          <th scope="col">Color</th>
          <th scope="col">Name</th>
          <th scope="col">Controls</th>
        </tr>
      </thead>
      <tbody>
        ${this.getHTMLList()}
      </tbody>
    </table>

    <div class="btn-team-edition" class="btn-group" role="group">
      <button type="button" id="${this.prefix}-add-member" class="btn btn-primary"><i class="fas fa-plus"></i> Add a member</button>
    </div>
    `;

    $('#'+this.getIdContentDiv()).html(htmlText);
    this.addEvent();
  }

  addHTMLRowMember(member)
  {
    let htmlText = `
    <tr>
      <td bgcolor="` + member.color + `"></td>
      <td>` + member.name + `</td>
      <td>
        <button class="btn btn-link btn-modify-member" data-task-id=""><i class="fas fa-edit" data-task=""></i></button>
        <button class="btn btn-link btn-remove-member" data-task-id=""><i class="fas fa-trash" data-task=""></i></button>
      </td>
    </tr>`;

    return htmlText;
  }

  getHTMLList()
  {
    let htmlText = ``;

    for(let i = 0;i < this.project.team.length; i++)
    {
      let member = this.project.team[i];
      htmlText += this.addHTMLRowMember(member);
    }

    return htmlText;
  }

  addEvent()
  {
    let project = this.project;
    let listMembers = this;

    let addMemberClickEvent = function(event)
    {
      let Modal = require('../modal/modal.js');

      Modal.show('Add member', listMembers.getHTMLFormFunc(), function() { listMembers.addMemberConfirm(); });
    };

    $(`#${this.prefix}-add-member`).click(addMemberClickEvent);

    let modifyMemberClickEvent = function(event)
    {
      let Modal = require('../modal/modal.js');
      let index = $(this).closest("tr").index();
      let member = project.team[index];

      Modal.show('Modify member', listMembers.getHTMLFormFunc(member.color, member.name), function() { listMembers.modifyMemberConfirm(member); });
    };

    $(`.btn-modify-member`).click(modifyMemberClickEvent);

    let removeMemberClickEvent = function(event)
    {
      let Modal = require('../modal/modal.js');
      let index = $(this).closest("tr").index();

      Modal.show('Modify member', listMembers.getHTMLRemoveMemberWarningMessage(), function() { listMembers.removeMemberConfirm(index); });
    };

    $(`.btn-remove-member`).click(removeMemberClickEvent);
  }

  addMemberConfirm()
  {
    let color = $('#cp_member_color').val();
    let name = $('#txt_member_name').val();

    let member = new Member();
    member.color = color;
    member.name = name;
    this.project.team.push(member);

    refreshTabContent(this.prefix);
  }

  modifyMemberConfirm(member)
  {
    let color = $('#cp_member_color').val();
    let name = $('#txt_member_name').val();

    member.color = color;
    member.name = name;

    refreshTabContent(this.prefix);
  }

  removeMemberConfirm(index)
  {
    let member = this.project.team[index];

    this.project.team.splice(index, 1);

    for(let i = 0; i < this.project.tasks.length; i++)
    {
      let task = this.project.tasks[i];

      if(member.equals(task.inCharge))
      {
        task.inCharge = undefined;
      }

      for(let j = 0; j < task.workingOn.length; j++)
      {
        if(task.workingOn[j].equals(member))
        {
          task.workingOn.splice(j, 1);
        }
      }
    }

    refreshTabContent(this.prefix);
  }

  getHTMLFormFunc(color = '', name = '')
  {
    let htmlText = `
    <div class="form-group">
      <label for="color_picker">Color</label>
      <input type="color" id="cp_member_color" value="${color}" name="textcolor" class="form-control">
    </div>
    <div class="form-group">
      <label for="txt_name">Name</label>
      <input type="text" id="txt_member_name" name="name" value="${name}" class="form-control" placeholder="name">
    </div>
    `;

    return htmlText;
  }

  getHTMLRemoveMemberWarningMessage()
  {
    return 'Are you sure to remove this member ?';
  }
}

module.exports = ListMembers;
