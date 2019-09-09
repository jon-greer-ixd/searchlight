$(document).ready(function () {
  // Use GOV.UK shim-links-with-button-role.js to trigger a link styled to look like a button,
  // with role="button" when the space key is pressed.
  GOVUK.shimLinksWithButtonRole.init()

  // Show and hide toggled content
  // Where .multiple-choice uses the data-target attribute
  // to toggle hidden content
  var showHideContent = new GOVUK.ShowHideContent()
  showHideContent.init()
  
  //prepopulate date
  var btnOne = $('.populate-link-one');
  var boxOne = $('.box-one');
  $(btnOne).click(function() {
    boxOne.val(dayOfTheMonth + "/" + (thisMonth + 1) + "/" + year);
  });
  
  var btnTwo = $('.populate-link-two');
  var boxTwo = $('.box-two');
  $(btnTwo).click(function() {
    boxTwo.val(dayOfTheMonth + "/" + (thisMonth + 1) + "/" + year);
  });
  
  var btnThree = $('.populate-link-three');
  var boxThree = $('.box-three');
  $(btnThree).click(function() {
    boxThree.val( (dayOfTheMonth -1 ) + "/" + (thisMonth + 1) + "/" + year);
  });
});