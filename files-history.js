/**
 * @author : Malik Fleury, Bulloni Lucas
 * @description : File to manage the history of the last files opened
 */

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
     let iFilePath = this.history.fileHistory.indexOf(filePath);

     if(iFilePath != -1)
     {
       this.history.fileHistory.splice(iFilePath, 1);
     }

     this.history.fileHistory.unshift(filePath);
     this.save();
   }

   addTab(filePath)
   {
     if(this.history.tabHistory.indexOf(filePath) === -1)
     {
       this.history.tabHistory.push(filePath);
       this.save();
     }
   }

   removeTab(filePath)
   {
     let iFilePath = this.history.tabHistory.indexOf(filePath);

     if(iFilePath >= 0)
     {
       this.history.tabHistory.splice(iFilePath, 1);
     }

     this.save();
   }

   resetTabHistory()
   {
     this.history.tabHistory = [];
     this.save();
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
