
const {dialog} = require('electron').remote;
let SerializerTool = require('../../tools/serializertool.js');
let {Project, Task, Member} = require("../../data/project.js");

class FileDialog
{
  static saveAs(project, directory, parentWindow = null)
  {
    let path = dialog.showSaveDialog(parentWindow, {title:"Save as", defaultPath:directory});

    if(path)
    {
      SerializerTool.serializeToFile(project, path);
    }
    else
    {
      throw "The user canceled the saving...";
    }
  }

  static open(directory, parentWindow = null)
  {
    let path = dialog.showOpenDialog(parentWindow, {title:"Open", defaultPath:directory})[0];
    let project = null;

    if(path)
    {
      // This function convert generic object to a typed object (object --> project)
      let revive = function(projectObject)
      {
        let realProject = new Project();
        console.log(projectObject.name);
        realProject.name = projectObject.name;
        realProject.filename = projectObject.filename;
        realProject.team = projectObject.team;
        realProject.tasks = projectObject.tasks;

        for(let i = 0;i < realProject.team.length; i++)
        {
          let memberObject = realProject.team[i];
          let realMember = new Member(memberObject.color, memberObject.name);
          realProject.team[i] = realMember;
        }

        for(let i = 0;i < realProject.tasks.length; i++)
        {
          let taskObject= realProject.tasks[i];
          let realTask = new Task();

          realTask.name = taskObject.name;
          realTask.from = new Date(taskObject.from);
          realTask.to = new Date(taskObject.to);
          realTask.finished = taskObject.finished;
          realTask.workingOn = taskObject.workingOn;
          realTask.inCharge = new Member(taskObject.inCharge.color, taskObject.inCharge.name);

          for(let j = 0;j < realTask.workingOn.length; j++)
          {
            let memberObject = realTask.workingOn[j];
            let realMember = new Member(memberObject.color, memberObject.name);
            realTask.workingOn[j] = realMember;
          }

          realProject.tasks[i] = realTask;
        }

        return realProject;
      };

      project = SerializerTool.unserializeFromFile(path, revive);
    }
    else
    {
        throw "The user canceled the loading...";
    }

    return project;
  }
}

module.exports = FileDialog;
