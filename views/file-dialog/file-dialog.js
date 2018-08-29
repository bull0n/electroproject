
const {dialog} = require('electron').remote;
let SerializerTool = require('../../tools/serializertool.js');

class FileDialog
{
  static saveAs(project, directory)
  {
    let path = dialog.showSaveDialog(window.win, {title:"Save as", defaultPath:directory});

    if(path)
    {
      SerializerTool.serializeToFile(project, path);
    }
  }
}

module.exports = FileDialog;
