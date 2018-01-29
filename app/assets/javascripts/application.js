/* global $ */
/* global GOVUK */

// Warn about using the kit in production
if (
  window.sessionStorage && window.sessionStorage.getItem('prototypeWarning') !== 'false' &&
  window.console && window.console.info
) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
  window.sessionStorage.setItem('prototypeWarning', true)
}

$(document).ready(function () {
  // Use GOV.UK shim-links-with-button-role.js to trigger a link styled to look like a button,
  // with role="button" when the space key is pressed.
  GOVUK.shimLinksWithButtonRole.init()

  // Show and hide toggled content
  // Where .multiple-choice uses the data-target attribute
  // to toggle hidden content
  var showHideContent = new GOVUK.ShowHideContent()
  showHideContent.init()
})

if ( document.getElementById('hidden') ){
  var myFunc = function () {
    document.getElementById('hidden').className="show";
  }
}

if (document.getElementById('tochange')){
  var toChange = document.getElementById('tochange');
  var menuSelected = function () {
    console.log( toChange.options[toChange.selectedIndex].text );
  }
}

if (document.getElementById('internationalID')) {
  var showInternationalAddress = function () {
    document.getElementById('international').className="show";
    document.getElementById('uk').className="visually-hidden";
  }
  var hideInternationalAddress = function () {
    document.getElementById('international').className="visually-hidden";
    document.getElementById('uk').className="show";
  }
}

