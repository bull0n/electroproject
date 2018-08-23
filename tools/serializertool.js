class SerializerTool
{
  /**
  * Serialize an object to file
  * @param {object} object    Object to serialize
  * @param {string} filename  Name of the file in which the data will be written
  */
  static serializeToFile(object, filename)
  {
    let fileSystem = require("fs");
    let serializedObject = JSON.stringify(object);

    fileSystem.writeFileSync(filename, serializedObject);
  }

  /**
  * Unseriliaze data from a file
  * @param {string} filename    Name of the file to extract data
  * @return {object}            Object unserialized
  */
  static unserializeFromFile(filename)
  {
    let fileSystem = require("fs");
    let serializedObject = null;

    if(filename === "")
    {
      throw "ERROR: The filename is null or the name is empty";
    }

    if(!fileSystem.existsSync(filename))
    {
      throw "ERROR: The file is not loadable or does not exist";
    }

    serializedObject = fileSystem.readFileSync(filename)

    return JSON.parse(serializedObject);
  }
}
