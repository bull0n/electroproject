// Imports
var Modal = require('./views/modal/modal-class.js');

function generateMembersTable(membersArray)
{
  let membersTableBody = document.getElementById("tbl_members").getElementsByTagName("tbody")[0];

  for(i = 0;i < membersArray.length; i++)
  {
    let member = membersArray[i];
    let row = membersTableBody.insertRow(-1);
    let colorCell = row.insertCell(0);
    let nameCell = row.insertCell(1);

    colorCell.style.backgroundColor = member.color;
    nameCell.innerHTML = member.name;

    row.onclick = function()
    {
      console.log(member.name);
    };
  }
}

function generateMembersData()
{
  let member1 = new Member();
  member1.name = "Jean";
  member1.color = "#ffe200";

  let member2 = new Member();
  member2.name = "Jeanne";
  member2.color = "#000200";

  let members = [member1, member2];

  let path = "./team.epd";
  SerializerTool.serializeToFile(members, path);
}

// Logic ...
//generateMembersData();
let membersArray = SerializerTool.unserializeFromFile("./team.epd");
generateMembersTable(membersArray);

// Actions on the page
$(document).ready(function()
{
  $("#btn-add-member").click(function(){
      Modal.load('modal-new-member', 'New member', './views/team-manager/members-table.html');
  });

  $("#btn-modify-member").click(function(){
      Modal.load('modal-modify-member', 'Modify member', './views/team-manager/members-table.html');
  });
});
