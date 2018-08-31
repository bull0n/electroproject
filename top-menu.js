const {Menu} = require('electron')
const electron = require('electron')
const app = electron.app

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
              console.log("NEW");
            }
          },
          {
            label: 'Open',
            accelerator: 'Ctrl+o',
            click (item, focusedWindow)
            {
              console.log("OPEN");
            }
          },
          {
            label: 'Quit',
            role: 'quit'
          }
        ]
      }];

      let menu = Menu.buildFromTemplate(template)
      Menu.setApplicationMenu(menu)
  }
}

module.exports = TopMenu;
