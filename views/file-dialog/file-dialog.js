
const {dialog} = require('electron').remote;
let SerializerTool = require('../../tools/serializertool.js');
let {Project, Task, Member} = require("../../data/project.js");

class FileDialog
{
  static saveAs(project, directory, parentWindow = null)
  {
    let path = dialog.showSaveDialog(parentWindow, {title:"Save as", defaultPath:directory, filters: [
      { name: 'Electron Project File', extensions: ['epr'] },
    ]});

    if(path)
    {
      if(project.fileName !== undefined)
      {
        delete project.fileName;
      }
      SerializerTool.serializeToFile(project, path);
      project.fileName = path;
    }
  }

  static open(directory, parentWindow = null)
  {
    let path = dialog.showOpenDialog(parentWindow, {title:"Open", defaultPath:directory, filters: [
      { name: 'Electron Project File', extensions: ['epr'] },
    ]});

    let project = undefined;

    if(path !== undefined)
    {
      path = path[0];
      project = SerializerTool.unserializeFromFile(path, Project.revive);
      project.fileName = path;
    }

    return project;
  }

  static save(project, parentWindow = null)
  {
    let fileName = project.fileName;
    delete project.fileName;

    let fs = require("fs");

    if(fs.existsSync(fileName))
    {
      SerializerTool.serializeToFile(project, fileName);

      let Modal = require('../modal/modal.js');
      Modal.show('', 'File saved !', function() {});
    }
    else
    {
      const {app} = require('electron').remote;
      FileDialog.saveAs(project, app.getPath('documents'), parentWindow);
    }

    project.fileName = fileName;
  }
}

module.exports = FileDialog;
