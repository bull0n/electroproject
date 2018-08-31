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
        to = this.tasks[i].to;
      }
    }

    return to;
  }

  getTasksSortedByMember()
  {
    let tasks = [];
    let iCurrentMember = undefined;

    while(tasks.length < this.tasks.length)
    {
      for(let i = 0; i < this.tasks.length; i++)
      {
        if(this.tasks[i].inCharge === this.team[iCurrentMember] || iCurrentMember === undefined && this.tasks[i].inCharge === undefined)
        {
          tasks.push(this.tasks[i]);
        }
      }

      if(iCurrentMember === undefined)
      {
        iCurrentMember = 0;
      }
      else
      {
        iCurrentMember++;
      }
    }

    return tasks;
  }

  getTasksOfMember(member)
  {
    let tasks = [];

    for(let i = 0; i < this.tasks.length; i++)
    {
      if(this.tasks[i].inCharge === member)
      {
        tasks.push(this.tasks[i]);
      }
    }

    return tasks;
  }

  findTask(key)
  {
    for(let i = 0; i < this.tasks.length; i++)
    {
      if(this.tasks[i].key == key)
      {
        return this.tasks[i];
      }
    }

    return undefined;
  }
}

module.exports.Project = Project;
module.exports.Task = Task;
module.exports.Member = Member;
