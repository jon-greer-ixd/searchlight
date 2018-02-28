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
    document.getElementById('to_hide').className="hide";
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

//checkbox contact
if (document.getElementById("contact-boxes")) {
  var alternative = document.getElementById("alternative");
  var previous = document.getElementById("previous");
  var requested = document.getElementById("requested");
  var none = document.getElementById("none");
  none.addEventListener('change', cancelPrefs);
  function cancelPrefs() {
    console.log("canceled");
     alternative.checked = false;
     previous.checked = false;
     requested.checked = false;
  }
  alternative.addEventListener('change', changePrefs);
  previous.addEventListener('change', changePrefs);
  requested.addEventListener('change', changePrefs);
  function changePrefs() {
    console.log("changed");
     none.checked = false;
  }
}

if (document.getElementById("work-number")) {
  console.log('start');
  var work = document.getElementById("work-number");
  var third = document.getElementById("third");
  work.addEventListener('change', cancelPrefs);
  function cancelPrefs() {
    console.log("canceled");
     third.checked = false;
  }
  third.addEventListener('change', changePrefs);
  function changePrefs() {
    console.log("changed");
     work.checked = false;
  }
}

if (document.getElementById("day-number")) {
  var day = document.getElementById("day-number");
  var night = document.getElementById("night");
  day.addEventListener('change', cancelPrefs);
  function cancelPrefs() {
    console.log("canceled");
     night.checked = false;
  }
  night.addEventListener('change', changePrefs);
  function changePrefs() {
    console.log("changed");
     day.checked = false;
  }
}


