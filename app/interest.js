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
              this.systemRef);
};

Interest.prototype.reset = function () {
  this.system = null; 
  this.title = null;
  this.startDate = null; 
  this.systemRef = null;
};

function createInterest() {
  return new Interest();
}

module.exports.createInterest = createInterest;