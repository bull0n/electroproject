const FileDialog = require("./views/file-dialog/file-dialog.js");

class TopMenu
{
  constructor()
  {
   this.create();
  }

  create()
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

      let menu = Menu.buildFromTemplate(template)
      Menu.setApplicationMenu(menu)
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

  openProject()
  {
    let directory = app.getPath('documents');
    let project = FileDialog.open(directory, BrowserWindow.getFocusedWindow());
    let tabViewExists = TabView.instance !== null;
    let tabView = TabView.getInstance();

    if(!tabViewExists)
    {
      tabView.display();
    }
    tabView.createTab(project);
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
