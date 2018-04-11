var authority = {
  housingBenefit : null,
  //on, off, null
  taxReduction : null,
  editHousing : false,
  editTax : false,
  added : false,
  removed : false,
  reset : function() {
    this.housingBenefit = null;
    this.taxReduction = null;
    this.editHousing = false,
    this.editTax = false,
    this.added = false;
    this.removed = false;
  }
};

module.exports.authority = authority;
