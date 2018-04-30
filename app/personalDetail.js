function PersonalDetail(
  name,
  value,
  show
) { 
  this.name = name,
  this.value = value,
  this.show = show
}

PersonalDetail.prototype.print = function () {
  console.log( "Name " + this.name + ". Value " + this.value + ". Show " + this.show );
}

function createPersonalDetail() {
  return new PersonalDetail();
}

module.exports.createPersonalDetail = createPersonalDetail;
