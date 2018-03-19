function Interest (
  live,
  title,
  startDate,
  system
) {
  this.live = live;
  this.title = title;
  this.startDate = startDate;
  this.system = system;
}

Interest.prototype.printInterest = function () {
  console.log(this.system + ", " + 
              this.title + " " + 
              this.startDate + " " + 
              this.businessSystem + " " + 
              this.systemRef);
};

function createInterest() {
  return new Interest();
}

module.exports.createInterest = createInterest;