import { Member } from './member.js';
import { Task } from './task.js';

export class Task
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
