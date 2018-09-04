let SerializerTool = require('./tools/serializertool.js');

class FilesHistory
{
  constructor(filename = 'files-history-data', maxFiles = 5)
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
     this.save();
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
}

module.exports = FilesHistory;
