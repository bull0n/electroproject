class Member
{
  constructor()
  {
    this.name = '';
    this.color = '';
  }

  equals(member)
  {
    return member.name === this.name && member.color === this.color;
  }
}

module.exports = Member;
