class Member
{
  constructor()
  {
    this.name = '';
    this.color = '';
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
