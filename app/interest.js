function Interest (
  live,
  title,
  startDate,
  businessSystem,
  systemRef, //which systems can this be in 0 = clerical, 1 = system, 2 = CRL, 3 = both sys and crl
  canBeSystem,
    systemOwning,
    systemBroadcast, 
  canBeCrl,
    crlMaintained, 
    crlNon, 
  canBeClerical,
  clericalOwning,
  clericalBroadcast,
  system, //which system type is this? 'crl', 'sys', 'clerical'
  codes
) {
  this.live = live;
  this.title = title;
  this.startDate = startDate;
  this.businessSystem = businessSystem;
  this.systemRef = systemRef;
  this.canBeSystem = canBeSystem;
  this.systemOwning = systemOwning;
  this.systemBroadcast = systemBroadcast;
  this.canBeCrl = canBeCrl;
  this.crlMaintained = crlMaintained;
  this.crlNon = crlNon;
  this.canBeClerical = canBeClerical;
  this.clericalOwning = clericalOwning;
  this.clericalBroadcast = clericalBroadcast;
  this.system = system;
  this.codes = codes;

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