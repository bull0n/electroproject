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

  from()
  {
    let from = undefined;

    for(let i = 0; i < this.tasks.length; i++)
    {
      if(this.tasks[i].from < from || from === undefined)
      {
        from = this.tasks[i].from;
      }
    }

    return from;
  }

  to()
  {
    let to = undefined;

    for(let i = 0; i < this.tasks.length; i++)
    {
      if(this.tasks[i].to > to || to === undefined)
      {
        to = this.tasks[i].from;
      }
    }

    return to;
  }
}

module.exports.Project = Project;
module.exports.Task = Task;
module.exports.Member = Member;
