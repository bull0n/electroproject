class Member
{
  constructor(color = '', name = '')
  {
    this.color = color;
    this.name = name;
  }

  equals(member)
  {
    if(member !== undefined)
    {
      return member.name === this.name && member.color === this.color;
    }
    else
    {
        return false;
    }
  }
}

module.exports = Member;
