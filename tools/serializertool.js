class SerializerTool
{
  /**
  * Serialize an object to file
  * @param {object} object    Object to serialize
  * @param {string} filename  Name of the file in which the data will be written
  */
  static serializeToFile(object, filename)
  {
    let filesystem = require("fs");
    let serializedObject = JSON.stringify(object);

    filesystem.writeFileSync(filename, serializedObject);
  }

  /**
  * Unseriliaze data from a file
  * @param {string} filename    Name of the file to extract data
  * @return {object}            Object unserialized
  */
  static unserializeFromFile(filename)
  {
    let filesystem = require("fs");
    let serializedObject = filesystem.readFileSync(filename)

    return JSON.parse(serializedObject);
  }
}
