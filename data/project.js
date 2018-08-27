let Task = require('./task.js');
let Member = require('./member.js');

class Project
{
  constructor()
  {
    this.name = '';
    this.filename = '';
    this.team = [];
    this.tasks = [];
  }
}

module.exports.Project = Project;
module.exports.Task = Task;
module.exports.Member = Member;
