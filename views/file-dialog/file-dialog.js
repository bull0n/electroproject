
const {dialog} = require('electron').remote;
let SerializerTool = require('../../tools/serializertool.js');
let Project = require("../../data/project.js").Project;

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
      let revive = function(object)
      {
        let projectObject = new Project();
        console.log(object.name);
        projectObject.name = `${object.name}`;
        projectObject.filename = `${object.filename}`;
        projectObject.team = object.team;
        projectObject.tasks = object.tasks;

        for(let i = 0;i < projectObject.tasks.length; i++)
        {
          let task = projectObject.tasks[i];
          task.from = new Date(task.from);
          task.to = new Date(task.to);
        }

        return projectObject;
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
