//////applicant.js
////function Applicant (
////  firstName,
////  lastName,
////  fullName,
////  dobDay,
////  dobMonth,
////  dobYear,
////  hasNhsno,
////  nhsno,
////  postCode,
////  hasMobile,
////  hasEmail,
////  mobile,
////  contactPref,
////  contactValue,
////  email,
////  address,
////  age,
////  renewing
////  ) {
////    this.firstName = firstName;
////    this.lastName = lastName;
////    this.fullName = fullName;
////    this.dobDay = dobDay;
////    this.dobMonth = dobMonth;
////    this.dobYear = dobYear;
////    this.hasNhsno = hasNhsno;
////    this.nhsno = nhsno;
////    this.postCode = postCode;
////    this.hasMobile = hasMobile;
////    this.hasEmail = hasEmail;
////    this.mobile = mobile;
////    this.contactPref = contactPref;
////    this.contactValue = contactValue;
////    this.email = email;
////    this.address = address;
////    this.age = age;
////    this.renewing = renewing;
////};
////
////Applicant.prototype.setFullName = function () {
////  this.fullName = this.firstName + " " + this.lastName;
////};
////
////Applicant.prototype.checkAge = function () {
//// if (this.age < 60) {
////   return true;
//// }
////};
////
////Applicant.prototype.check = function () {
////  if (this.firstname === 'Bill' && this.lastname === 'Smith' && this.postcode === 'NE1 234') {
////    return true;
////  }
////};
////
////function createApplicant() {
////  return new Applicant();
////};
////
////module.exports.createApplicant = createApplicant;
//
//
//function Address (
//  lineOne,
//  lineTwo,
//  lineThree,
//  postCode
//) {
//    this.lineOne = lineOne; 
//    this.lineTwo = lineTwo; 
//    this.lineThree = lineThree; 
//    this.postCode = postCode; 
//};
//
//Address.prototype.printAddress = function () {
//  console.log(this.lineOne + ", " + this.lineTwo + " " + this.postCode);
//};
//
//function createAddress() {
//  return new Address();
//};
//
//module.exports.createAddress = createAddress;

function Interest (
  live,
  system,
  title,
  startDate,
  businessSystem,
  systemRef, //which systems can this be in 1 = system, 2 = CRL, 3 = both
  partyRef //which parties can this have 0 = none, 1 = owning, 2 = BC, 3 = both
) {
  this.live = live;
  this.system = system;
  this.title = title;
  this.startDate = startDate;
  this.businessSystem = businessSystem;
  this.type = partyRef;
  this.systemRef = systemRef;
};

Interest.prototype.printInterest = function () {
  console.log(this.system + ", " + this.title + " " + this.startDate + " " + this.businessSystem + " " + this.partyRef + " " + this.systemRef);
};

function createInterest() {
  return new Interest();
};

module.exports.createInterest = createInterest;



