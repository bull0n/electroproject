let SerializerTool = require('./tools/serializertool.js');
const electron = require('electron');

class FilesHistory
{
  constructor()
  {
    let path = (electron.app || electron.remote.app).getPath('userData');

    this.filenameHistory = path + '/' + 'files-history-data';
    this.history = {fileHistory : [], tabHistory : []};
    this.maxFiles = 5;
  }

  addFile(filePath)
  {
     if(this.history.fileHistory.length >= this.maxFiles)
     {
       this.history.fileHistory.shift();
     }

     this.history.fileHistory.push(filePath);
     this.save();
   }

   addTab(filePath)
   {
     this.history.tabHistory.push(filePath);
     this.save();
   }

   resetTabHistory()
   {
     this.history.tabHistory = [];
   }

   getTabHistory()
   {
     return this.history.tabHistory;
   }

   getFile(index)
   {
     return this.history.fileHistory[index];
   }

   getLength()
   {
     return this.history.fileHistory.length;
   }

   load()
   {
     let revive = function(arrayObject) { return arrayObject};
     this.history = SerializerTool.unserializeFromFile(this.filenameHistory, revive);
   }

   save()
   {
     SerializerTool.serializeToFile(this.history, this.filenameHistory);
   }

   static getInstance()
   {
     if(FilesHistory.instance === undefined)
     {
       FilesHistory.instance = new FilesHistory();
     }

     return FilesHistory.instance;
   }
}

FilesHistory.instance = undefined;

module.exports = FilesHistory;
