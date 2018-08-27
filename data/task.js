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
  }
}

module.exports = Task;
