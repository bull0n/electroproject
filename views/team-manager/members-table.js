// Imports
let SerializerTool = require('./tools/serializertool.js');
let Modal = require('./views/modal/modal-class.js');

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
let membersArray = SerializerTool.unserializeFromFile("./team.epd");
generateMembersTable(membersArray);

// Insert the modal
Modal.load('member-edit-modal');

// Actions on the page
$(document).ready(function()
{
  $("#btn-add-member").click(function()
  {
      Modal.prepare('New Member', './views/team-manager/member_form.html');

      $(document).ready(function(){
        $('#member-edit-modal').modal('show');
      });
  });

  $("#btn-modify-member").click(function()
  {
      Modal.prepare('Modify Member', './views/team-manager/member_form.html');

      $(document).ready(function(){
        let elementsMap = new Map();
        elementsMap.set("#cp_member_color");
        elementsMap.set("#txt_member_name", "George");

        Modal.setValues(elementsMap);
        $('#member-edit-modal').modal('show');
      });

      $('table tbody tr').click(function(){
        $(this).css('background-color', 'Green');
      });
  });


});
