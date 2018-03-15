function Interest (
  live,
  title,
  startDate,
  businessSystem,
  systemRef, //which systems can this be in 0 = clerical, 1 = system, 2 = CRL, 3 = both sys and crl
  canBeSystem,
  canBeClerical,
  canBeCrl,
  system, //which system type is this? 'crl', 'sys', 'clerical'
  owning,
  broadcasting,
  maintained
) {
  this.live = live;
  this.title = title;
  this.startDate = startDate;
  this.businessSystem = businessSystem;
  this.systemRef = systemRef;
  this.canBeSystem = canBeSystem;
  this.canBeClerical = canBeClerical;
  this.canBeCrl = canBeCrl;
  this.system = system;
  this.owning = owning;
  this.broadcasting = broadcasting;
  this.maintained = maintained;

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