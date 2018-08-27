// Imports
let AbstractView = require('./abstract-view-class.js');
let {Project, Task, Member} = require('./data/project.js');
let SerializerTool = require('./tools/serializertool.js');
let Modal = require('./views/modal/modal-class.js')

class ListMembers extends AbstractView
{
  constructor(idDiv, project)
  {
    super(iDiv, project);
    this.listMembers = this.project.team;
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
      this.getHTMLList();
      `
      </tbody>
    </table>

    <div id="div-team-edition" class="btn-group" role="group">
      <button type="button" class="btn btn-primary btn-team-edition" id="btn-add-member">Add</button>
      <button type="button" class="btn btn-primary btn-team-edition" id="btn-modify-member">Modify</button>
      <button type="button" class="btn btn-primary btn-team-edition" id="btn-remove-diagram">Remove</button>
    </div>
    `;

    $('#'+this.idDiv).html(htmlText);
  }

  addMember(member)
  {
    let htmlText = `<td><style="background-color: "` + member.color + `"></td>`;
    htmlText += `<td>` + member.name + `</td>`;
    return htmlText;
  }

  getHTMLList()
  {
    let htmlText = ``;

    for(i = 0;i < membersArray.length; i++)
    {
      let member = this.listMembers[i];
      htmlText += addMember(member);
    }

    return htmlText;
  }
}

module.exports = ListMembers;
