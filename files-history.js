let SerializerTool = require('./tools/serializertool.js');

class FilesHistory
{
  constructor(filename = 'files-history-data', maxFiles = 3)
  {
    this.filenameHistory = filename;
    this.filePaths = [];
    this.maxFiles = maxFiles;
  }

  addFile(filePath)
  {
     if(this.filePaths.length >= this.maxFiles)
     {
       this.filePaths.shift();
     }

     this.filePaths.push(filePath);
   }

   getFile(index)
   {
     return this.filePaths[index];
   }

   getLength()
   {
     return this.filePaths.length;
   }

   load()
   {
     let revive = function(arrayObject) { return arrayObject};
     this.filePaths = SerializerTool.unserializeFromFile(this.filenameHistory, revive);
   }

   save()
   {
     SerializerTool.serializeToFile(this.filePaths, this.filenameHistory);
   }

   getMenuItem()
   {
     return null;
   }
/*
   static loadFileFromHistory(filePath)
   {
     let project = Home.loadFile(filePath);
     let tabView = TabView.getInstance();

     if(TabView.instance !== null)
     {
       tabView.display();
     }

     tabView.createTab(project);
   }

   getHTMLFilesHistory()
   {
     let path = require('path');
     let htmlText = '';

     if(1) // check existence
     {
       this.load();

       for(let i = this.filePaths.length-1;i >= 0; i--)
       {
         let filePath = this.filePaths[i];
         htmlText += `<a onclick="let Home = require('./views/home/home.js');Home.loadFileFromHistory('${filePath}'); return false;">${filePath}</a><br>`;
       }
     }
     console.log(this.filePaths);
     return htmlText;
   }
   */
}

module.exports = FilesHistory;
