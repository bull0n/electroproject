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
        if(this.tasks[i].inCharge.equals(this.team[iCurrentMember]) || iCurrentMember === undefined && this.tasks[i].inCharge === undefined)
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
      if(this.tasks[i].inCharge.equals(member))
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

  // This function convert generic object to a typed object (generic object --> project object)
  static revive(projectObject)
  {
    let realProject = new Project();
    realProject.name = projectObject.name;
    realProject.filename = projectObject.filename;
    realProject.team = projectObject.team;
    realProject.tasks = projectObject.tasks;

    for(let i = 0;i < realProject.team.length; i++)
    {
      let memberObject = realProject.team[i];
      let realMember = new Member(memberObject.color, memberObject.name);
      realProject.team[i] = realMember;
    }

    for(let i = 0;i < realProject.tasks.length; i++)
    {
      let taskObject= realProject.tasks[i];
      let realTask = new Task();

      realTask.name = taskObject.name;
      realTask.from = new Date(taskObject.from);
      realTask.to = new Date(taskObject.to);
      realTask.finished = taskObject.finished;
      realTask.workingOn = taskObject.workingOn;
      realTask.inCharge = new Member(taskObject.inCharge.color, taskObject.inCharge.name);

      for(let j = 0;j < realTask.workingOn.length; j++)
      {
        let memberObject = realTask.workingOn[j];
        let realMember = new Member(memberObject.color, memberObject.name);
        realTask.workingOn[j] = realMember;
      }

      realProject.tasks[i] = realTask;
    }

    return realProject;
  }
}

module.exports.Project = Project;
module.exports.Task = Task;
module.exports.Member = Member;
