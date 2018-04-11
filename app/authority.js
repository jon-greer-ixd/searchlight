var authority = {
  housingBenefit : null,
  taxReduction : null,
  reset : function() {
    this.housingBenefit = null;
    this.taxReduction = null;
  }
};

module.exports.authority = authority;
