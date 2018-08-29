
const {dialog} = require('electron').remote;
let SerializerTool = require('../../tools/serializertool.js');
let Project = require("../../data/project.js");

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
    let path = dialog.showOpenDialog(parentWindow, {title:"Open", defaultPath:directory});
    let project = null;

    if(path)
    {
      project = SerializerTool.unserializeFromFile(path);
    }
    else
    {
        throw "The user canceled the loading...";
    }

    return project;
  }
}

module.exports = FileDialog;
