const FileDialog = require("./views/file-dialog/file-dialog.js");
const FilesHistory = require('./files-history.js');

class TopMenu
{
  constructor()
  {
    this.prepareFilesHistory();
    this.update();
  }

  prepareFilesHistory()
  {
    let filesHistory = new FilesHistory();
    let fileSystem = require('fs');

    try
    {
      filesHistory.load();
    }
    catch (exception)
    {
      console.log("No history !");
    }
    finally
    {
      // nothing
    }

    this.filesHistory = filesHistory;
  }

  update()
  {
    let template = [{
        label: 'File',
        submenu: [
          {
            label: 'New',
            accelerator: 'Ctrl+n',
            click (item, focusedWindow)
            {
              TopMenu.getInstance().newProject();
            }
          },
          {
            label: 'Open',
            accelerator: 'Ctrl+o',
            click (item, focusedWindow)
            {
              TopMenu.getInstance().openProject();
            }
          },
          {
            label: 'Recent files...',
            submenu: []
          },
          {
            label: 'Quit',
            role: 'Ctrl+q',
            click (item, focusedWindow)
            {
              TopMenu.getInstance().quitApp();
            }
          }
        ]
      },
      {
        label: 'Dev',
        submenu: [
          {
            role: 'reload'
          },
          {
            role: 'toggledevtools'
          }
        ]
      }
      ];

      let openProjectClickEvent = function(item, focusedWindow) { TopMenu.getInstance().openProject(item.label);};
      let recentsFilesSubMenu = [];

      for(let i = this.filesHistory.getLength()-1;i >= 0; i--)
      {
        let filePath = this.filesHistory.getFile(i);
        let filePathMenuItem = {label:filePath, click: openProjectClickEvent};
        recentsFilesSubMenu.push(filePathMenuItem);
      }

      template[0].submenu[2].submenu = recentsFilesSubMenu;

      let menu = Menu.buildFromTemplate(template);
      Menu.setApplicationMenu(menu);
  }

  newProject()
  {
    let currentInstance = TopMenu.instance;
    let tabViewExists = TabView.instance !== null;
    let tabView = TabView.getInstance();
    let project = new Project();

    Modal.show('New project', currentInstance.getHTMLProjectNameForm(), function()
    {
      project.name = $('#txt_project_name').val();

      if(!tabViewExists)
      {
        tabView.display();
      }
      tabView.createTab(project);
    });
  }

  openProject(filePath = null)
  {
    let tabViewExists = TabView.instance !== null;
    let tabView = TabView.getInstance();
    let project = null;

    if(typeof filePath != 'string')
    {
      let directory = app.getPath('documents');
      project = FileDialog.open(directory, BrowserWindow.getFocusedWindow());
    }
    else
    {
      let SerializerTool = require('./tools/serializertool.js');
      project = SerializerTool.unserializeFromFile(filePath, Project.revive);
    }

    if(project !== undefined)
    {
      let tabViewExists = TabView.instance !== null;
      let tabView = TabView.getInstance();

      if(!tabViewExists)
      {
        tabView.display();
      }

      $(document).ready(function(){
        tabView.createTab(project);
      });
    }
  }

  quitApp()
  {
    app.quit();
  }

  getHTMLProjectNameForm()
  {
    let htmlText = `
    <div class="form-group">
      <label for="txt_name">Name</label>
      <input type="text" id="txt_project_name" name="name" value="${name}" class="form-control" placeholder="name">
    </div>
    `;

    return htmlText;
  }

  addToHistory(path)
  {
    this.filesHistory.addFile(path);
  }

  save(project)
  {
    FileDialog.save(project);
  }

  static getInstance()
  {
    if(TopMenu.instance == null)
    {
      TopMenu.instance = new TopMenu();
    }

    return TopMenu.instance;
  }
}

TopMenu.instance = null;

module.exports = TopMenu;
