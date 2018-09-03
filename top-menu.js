const FileDialog = require("./views/file-dialog/file-dialog.js");

class TopMenu
{
  static create()
  {
    let template = [{
        label: 'File',
        submenu: [
          {
            label: 'New',
            accelerator: 'Ctrl+n',
            click (item, focusedWindow)
            {
              TopMenu.newProject();
            }
          },
          {
            label: 'Open',
            accelerator: 'Ctrl+o',
            click (item, focusedWindow)
            {
              TopMenu.openProject();
            }
          },
          {
            label: 'Quit',
            role: 'Ctrl+q',
            click (item, focusedWindow)
            {
              TopMenu.quitApp();
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


  static newProject()
  {
    let tabView = TabView.getInstance();
    let project = new Project();

    Modal.show('New project', TopMenu.getHTMLProjectNameForm(), function()
    {
      project.name = $('#txt_project_name').val();

      tabView.display();
      tabView.createTab(project);
    });
  }

  static openProject()
  {
    let directory = app.getPath('documents');
    let project = FileDialog.open(directory, BrowserWindow.getFocusedWindow());
    let tabView = TabView.getInstance();

    tabView.display();
    tabView.createTab(project);
  }

  static quitApp()
  {
    app.quit();
  }

  static getHTMLProjectNameForm()
  {
    let htmlText = `
    <div class="form-group">
      <label for="txt_name">Name</label>
      <input type="text" id="txt_project_name" name="name" value="${name}" class="form-control" placeholder="name">
    </div>
    `;

    return htmlText;
  }
}

module.exports = TopMenu;
