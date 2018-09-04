/**
 * @author : Malik Fleury, Bulloni Lucas
 * @description : class to manage a file, open, save and save as
 */

const {dialog} = require('electron').remote;
let SerializerTool = require('../../tools/serializertool.js');
let {Project, Task, Member} = require("../../data/project.js");
const TabView = require('../tab-view/tab-view.js');

class FileDialog
{
  static saveAs(project, directory, parentWindow = undefined)
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

  static open(directory, parentWindow = undefined)
  {
    let path = dialog.showOpenDialog(parentWindow, {title:"Open", defaultPath:directory, filters: [
      { name: 'Electron Project File', extensions: ['epr'] },
    ]});

    let project = undefined;

    if(path !== undefined)
    {
      path = path[0];

      for(let i = 0; i < TabView.listTabs.length; i++)
      {
        if(TabView.listTabs[i].project.fileName === path)
        {
          return undefined;
        }
      }

      project = SerializerTool.unserializeFromFile(path, Project.revive);
      project.fileName = path;

      TopMenu.getInstance().addToHistory(path);
      TopMenu.getInstance().update();
    }

    return project;
  }

  static save(project, parentWindow = undefined)
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
