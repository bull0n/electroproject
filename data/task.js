const MS_IN_DAYS = 86400000;

class Task
{
  constructor()
  {
    this.name = '';
    this.from = new Date();
    this.to = new Date();
    this.inCharge = undefined; // type member
    this.workingOn = []; //type member
    this.finished = false;
    this.key = crypto.getRandomValues(new Uint32Array(4)).join('-');
  }

  isWorkingOn(member)
  {
    for(let i = 0; i < this.workingOn.length; i++)
    {
      if(member.equals(this.workingOn[i]))
      {
        return true;
      }
    }
    return false;
  }

  getLengthInDays()
  {
    return Math.floor((this.to - this.from) / MS_IN_DAYS);
  }
}

module.exports = Task;
