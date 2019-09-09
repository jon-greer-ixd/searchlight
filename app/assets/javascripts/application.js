/* global $ */
/* global GOVUK */

//dates.js
var today = new Date();
var dayOfTheWeek = today.getDay();
var dayOfTheMonth = today.getDate();
var thisMonth = today.getMonth();
var year = today.getFullYear();


// Warn about using the kit in production
if (
  window.sessionStorage && window.sessionStorage.getItem('prototypeWarning') !== 'false' &&
  window.console && window.console.info
) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
  window.sessionStorage.setItem('prototypeWarning', true)
}

//DAP
var dapResults = false;
var showDapResults = function() {
   dapResults = true;
   console.log(dapResults);
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
  
//bereavement support preview
if (document.getElementById("maincontent") ) {
var bsCustomers = {
"SX170201" : { title : "",
               firstName : "Alex",
               lastName : "Campbell",
               dob : "14 May 1963",
               prevAddress : true,
               addressLineOne : "25 Lambton St",
               addressLineTwo : "Chester le Street",
               postCode : "DH3 3NH",
               mobile : "07761 111 111",
               home : "0191 111 111",
               email : "email@address.com",
               ucInt : false,
               esaInt : false,
               ucAward : true,
               esaAward : false
              },

"SX170202" : { title : "",
               firstName : "Sam",
               lastName : "Driscoll",
               dob : "08 Aug 1956",
               prevAddress : false,
               addressLineOne : "98 Hammerfield Ave",
               addressLineTwo : "Aberdeen",
               postCode : "AB10 7FE",
               mobile : "07761 111 111",
               home : "0191 111 111",
               email : "email@address.com",
               ucInt : false,
               esaInt : false,
               ucAward : false,
               esaAward : true
},	

"SX170203" : { title : "",
               firstName : "Chris",
               lastName : "Ballard",
               dob : "10 Dec 1998",
               prevAddress : true,
               addressLineOne : "3 Rosebery St",
               addressLineTwo : "Pudsey",
               postCode : "LS28 7JZ",
               mobile : "07700 900229",
               home : "0113 395 5250",
               email : "frankie98@sky.com",
               ucInt : false,
               esaInt : false,
               ucAward : true,
               esaAward : false
},

"SX170204" : { title : "",
               firstName : "Lee",
               lastName : "Harris",
               dob : "15 Jul 1984",
               prevAddress : true,
               addressLineOne : "81 Wilberforce Rd",
               addressLineTwo : "Finsbury Park, London",
               postCode : "N4 2SP",
               mobile : "07700 900141",
               home : "020 7609 8754",
               email : "harris@btinternet.com",
               ucInt : true,
               esaInt : false,
               ucAward : false,
               esaAward : true
},	

"SX170205" : { title : "",
               firstName : "Robin",
               lastName : "Clarke",
               dob : "21 Jul 1957",
               prevAddress : false,
               addressLineOne : "5 Budock Pl",
               addressLineTwo : "Falmouth",
               postCode : "TR11 3NA",
               mobile : "07761 111 111",
               home : "0191 111 111",
               email : "email@address.com",
               ucInt : false,
               esaInt : false,
               ucAward : false,
               esaAward : true
},
 
"SX170206" : { title : "",
               firstName : "Chris",
               lastName : "Kingcombe",
               dob : "14 Feb 1976",
               prevAddress : false,
               addressLineOne : "Flat 9, 39 Brewery St",
               addressLineTwo : "Pembroke Dock",
               postCode : "SA72 6JS",
               mobile : "07761 111 111",
               home : "0191 111 111",
               email : "email@address.com",
               ucInt : false,
               esaInt : false,
               ucAward : true,
               esaAward : false

},

"SX170207" : { title : "Mrs",
               firstName : "Mary",
               lastName : "Naylor",
               dob : "08 Mar 1963",
               prevAddress : true,
               addressLineOne : "Flat 5, 21 Stanger St",
               addressLineTwo : "Keswick",
               postCode : "CA12 5JX",
               mobile : "07700 900870",
               home : "01768 892960",
               email : "naylor83@googlemail.com",
               ucInt : true,
               esaInt : false,
               ucAward : false,
               esaAward : true
},

"SX170208" : { title : "Mr",
               firstName : "James",
               lastName : "Beck",
               dob : "13 Nov 1976",
               prevAddress : false,
               addressLineOne : "Flat 3, 55 Longreins Rd",
               addressLineTwo : "Barrow-in-Furness",
               postCode : "LA14 5AL",
               mobile : "07761 111 111",
               home : "0191 111 111",
               email : "email@address.com",
               ucInt : true,
               esaInt : false,
               ucAward : false,
               esaAward : true
},	


"SX170209" : { title : "Mrs",
               firstName : "Patricia",
               lastName : "Benedetti",
               dob : "08 Aug 1960",
               prevAddress : true,
               addressLineOne : "10 Dale Way",
               addressLineTwo : "Leyburn",
               postCode : "DL8 5LE",
               mobile : "07700 900229",
               home : "01969 623565",
               email : "pat-pat@netscape.com",
               ucInt : false,
               esaInt : false,
               ucAward : true,
               esaAward : true
},


"SX170210" : { title : "Mr",
               firstName : "Robert",
               lastName : "Chapman",
               dob : "16 Jul 1973",
               prevAddress : false,
               addressLineOne : "13 Constance Ave",
               addressLineTwo : "West Bromwich",
               postCode : "B70 6ED",
               mobile : "07761 111 111",
               home : "0191 111 111",
               email : "email@address.com",
               ucInt : false,
               esaInt : false,
               ucAward : true,
               esaAward : false

},
	
"SX170211" : { title : "Mr",
               firstName : "Michael",
               lastName : "Woodgate",
               dob : "08 Jul 1967",
               prevAddress : false,
               addressLineOne : "47 Bamford Rd",
               addressLineTwo : "Wolverhampton",
               postCode : "WV3 0AT",
               mobile : "07761 111 111",
               home : "0191 111 111",
               email : "email@address.com",
               ucInt : false,
               esaInt : false,
               ucAward : false,
               esaAward : false
},		

"SX170212" : { title : "Mr",
               firstName : "William",
               lastName : "Henderson",
               dob : "08 Nov 1970",
               prevAddress : true,
               addressLineOne : "Flat 7, 51 Lappmark Rd",
               addressLineTwo : "Canvey Island",
               postCode : "SS8 7SZ",
               mobile : "07700 900618",
               home : "0207 562 1234",
               email : "henders@virgin.com",
               ucInt : false,
               esaInt : false,
               ucAward : true,
               esaAward : true
},

"SX170213" : { title : "Miss",
               firstName : "Linda",
               lastName : "Fitzgerald",
               dob : "13 Apr 1987",
               prevAddress : false,
               addressLineOne : "3 Comelypark St",
               addressLineTwo : "Glasgow",
               postCode : "G31 1TA",
               mobile : "07761 111 111",
               home : "0191 111 111",
               email : "email@address.com",
               ucInt : true,
               esaInt : false,
               ucAward : false,
               esaAward : false
},			

"SX170214" : { title : "Mrs",
               firstName : "Elizabeth",
               lastName : "Earnshaw",
               dob : "18 May 1976",
               prevAddress : true,
               addressLineOne : "41 Lochiel Rd",
               addressLineTwo : "Inverlochy, Fort William",
               postCode : "PH33 6NS",
               mobile : "07700 900141",
               home : "01397 708881",
               email : "dizzy-liz@blueyonder.com",
               ucInt : false,
               esaInt : false,
               ucAward : false,
               esaAward : true
},	

"SX170215" : { title : "Mr",
               firstName : "Raymond",
               lastName : "Cromarty",
               dob : "04 Jun 1997",
               prevAddress : true,
               addressLineOne : "17 King Harald Kloss",
               addressLineTwo : "Kirkwall, Orkney",
               postCode : "KW15 1FT",
               mobile : "07761 111 111",
               home : "0191 111 111",
               email : "email@address.com",
               ucInt : false,
               esaInt : false,
               ucAward : true,
               esaAward : true
},

"SX170216" : { title : "Miss",
               firstName : "Donna",
               lastName : "Rustage",
               dob : "04 Jun 1993",
               prevAddress : false,
               addressLineOne : "83 Normanby Rd",
               addressLineTwo : "South Bank, Middlesbrough",
               postCode : "TS6 6SA",
               mobile : "07761 111 111",
               home : "0191 111 111",
               email : "email@address.com",
               ucInt : false,
               esaInt : false,
               ucAward : true,
               esaAward : false
},

"SX170217" : { title : "",
               firstName : "Alex",
               lastName : "Driscoll",
               dob : "26 Feb 1984",
               prevAddress : false,
               addressLineOne : "18 Robinson Ave",
               addressLineTwo : "Carlisle",
               postCode : "CA2 4EU",
               mobile : "07761 111 111",
               home : "0191 111 111",
               email : "email@address.com",
               ucInt : false,
               esaInt : false,
               ucAward : false,
               esaAward : true
},

"SX170218" : { title : "",
               firstName : "Jamie",
               lastName : "Brasher",
               dob : "18 Oct 1971",
               prevAddress : false,
               addressLineOne : "38 High St",
               addressLineTwo : "Llanberis, Caernarfon",
               postCode : "LL55 4EU",
               mobile : "07761 111 111",
               home : "0191 111 111",
               email : "email@address.com",
               ucInt : true,
               esaInt : false,
               ucAward : false,
               esaAward : true
},

"SX170219" : { title : "Mr",
               firstName : "Noah",
               lastName : "Comiskey",
               dob : "13 Sep 1962",
               prevAddress : true,
               addressLineOne : "3 Anderson Dr",
               addressLineTwo : "Castle Douglas",
               postCode : "DG7 1UQ",
               mobile : "07700 900229",
               home : "01576 202910",
               email : "noah1962@1and1.com",
               ucInt : false,
               esaInt : false,
               ucAward : true,
               esaAward : false
},

"SX170220" : { title : "Mr",
               firstName : "Reece",
               lastName : "Housden",
               dob : "28 Jan 1974",
               prevAddress : false,
               addressLineOne : "40 Gertrude Rd",
               addressLineTwo : "Liverpool",
               postCode : "L4 0SU",
               mobile : "07761 111 111",
               home : "0191 111 111",
               email : "email@address.com",
               ucInt : false,
               esaInt : false,
               ucAward : false,
               esaAward : true
},

"SX170221" : { title : "Ms",
               firstName : "Sharmila",
               lastName : "Kulkarni",
               dob : "23 Feb 1968",
               prevAddress : true,
               addressLineOne : "10 Bangor Rd",
               addressLineTwo : "Southampton",
               postCode : "SO15 3GD",
               mobile : "07700 900300",
               home : "023 8033 4545",
               ucInt : false,
               esaInt : false,
               ucAward : true,
               esaAward : true
},

"SX170222" : { title : "Miss",
               firstName : "Victoria",
               lastName : "Tingley",
               dob : "13 Nov 1978",
               prevAddress : false,
               addressLineOne : "19 Alma Park",
               addressLineTwo : "Brodick, Isle of Arran",
		postCode : "KA27 8AT",
               mobile : "07761 111 111",
               home : "0191 111 111",
               email : "email@address.com",
               ucInt : false,
               esaInt : false,
               ucAward : true,
               esaAward : false
},

"SX170223" : { title : "Ms",
               firstName : "Evelyn",
               lastName : "Kriewaldt",
               dob : "01 May 1973",
               prevAddress : false,
               addressLineOne : "49 Lyndhurst Rd",
               addressLineTwo : "Sheffield",
		postCode : "S11 9BJ",
               mobile : "07761 111 111",
               home : "0191 111 111",
               email : "email@address.com",
               ucInt : false,
               esaInt : false,
               ucAward : false,
               esaAward : true
},

"SX170224" : { title : "Miss",
               firstName : "Yufan",
               lastName : "Li",
               dob : "18 Jun 1969",
               prevAddress : false,
               addressLineOne : "6 Smedley Ave",
               addressLineTwo : "Bolton",
               postCode : "BL3 2DP",
               mobile : "07700 900300",
               home : "023 8033 4545",
               ucInt : false,
               esaInt : false,
               ucAward : true,
               esaAward : true
},

"SX170225" : { title : "Mr",
               firstName : "Francesco",
               lastName : "Vickery",
               dob : "07 Jul 1997",
               prevAddress : false,
               addressLineOne : "2 Ainsworth Rd",
               addressLineTwo : "London",
               postCode : "E9 7LP",
               mobile : "07700 900300",
               home : "023 8033 4545",
               ucInt : false,
               esaInt : false,
               ucAward : true,
               esaAward : false
}}

    var bsInput = document.getElementById("maincontent");
    var preview = document.getElementById("preview");
    var counter;
    var inputvalue;
  
  
    
  }
  
})

//Management checks
if (document.getElementById("mcheck") ) {
  var close = document.getElementById("mclose");
  var managementCheck = document.getElementById("mcheck");
  
  close.addEventListener("click", function(){
    console.log('close');
    managementCheck.classList.remove('visible');
  });
}

if ( document.getElementById('contact-feilds') ){
   var contactFeilds = document.getElementById('contact-feilds');
   var exDecField = document.getElementById('exdec-field')
   var showContactFeilds = function () {
   var contactType = document.getElementById('select-box').value;
   var contactLabel = document.getElementById('contact-label').innerHTML;
   console.log(contactType);
   if(contactType == 'ht') {
     exDecField.className="form-group show";
   } else {
      exDecField.className="form-group hidden";
   }
   if(contactType == 'contact') {
      contactFeilds.className="hidden";
   } else {
      contactFeilds.className="show";
   }
   if(contactType == 'pm') {
      document.getElementById('contact-label').innerHTML = "Personal mobile number";
   } else if (contactType == 'ht') {
      document.getElementById('contact-label').innerHTML = "Home telephone number";
   } else if (contactType == 'dt') {
      document.getElementById('contact-label').innerHTML = "Daytime telephone number";
   } else if (contactType == 'et') {
      document.getElementById('contact-label').innerHTML = "Evening telephone number";
   } else if (contactType == 'bm') {
      document.getElementById('contact-label').innerHTML = "Business mobile number";
   } else if (contactType == 'bt') {
      document.getElementById('contact-label').innerHTML = "Business mobile number";
   } else if (contactType == 'tp') {
      document.getElementById('contact-label').innerHTML = "Third party telephone number";
   } else if (contactType == 'he') {
      document.getElementById('contact-label').innerHTML = "Home email address";
   } else if (contactType == 'be') {
      document.getElementById('contact-label').innerHTML = "Business email address";
   } else if (contactType == 'tn') {
      document.getElementById('contact-label').innerHTML = "Textphone number";
   } else if (contactType == 'tpn') {
      document.getElementById('contact-label').innerHTML = "Textphone number";
   } else if (contactType == 'ttn') {
      document.getElementById('contact-label').innerHTML = "Typetalk number";
   } else if (contactType == 'hf') {
      document.getElementById('contact-label').innerHTML = "Home fax";
   } else if (contactType == 'bf') {
      document.getElementById('contact-label').innerHTML = "Business fax";
   } else if (contactType == 'oc') {
      document.getElementById('contact-label').innerHTML = "Other contact method";
   }
  }
}

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

//checkbox contact
//if (document.getElementById("cancel-boxes")) {
//  var boxOne = document.getElementById("person");
//  var boxTwo = document.getElementById("partner");
//  var boxThree = document.getElementById("member");
//  var clearBox = document.getElementById("none");
//  function cancelPrefs() {
//    boxOne.checked = false;
//    boxTwo.checked = false;
//    boxThree.checked = false;
//    console.log("here");
//  }
//  function changePrefs() {
//    clearBox.checked = false;
//    console.log("here");
//  }
//  clearBox.addEventListener('change', cancelPrefs);
//  boxOne.addEventListener('change', changePrefs);
//  boxTwo.addEventListener('change', changePrefs);
//  boxThree.addEventListener('change', changePrefs);
//}


//if (document.getElementById("country-selector")) {
//  console.log("here");
//  var nationalityField = document.getElementById("country-selector")
//  var statelessRadio = document.getElementById("stateless")
//  var unknownRadio = document.getElementById("unknown")
//  //If checkbox is clicked clear field
//  statelessRadio.addEventListener('change', clearNationality);
//  unknownRadio.addEventListener('change', clearNationality);
//  function clearNationality() {
//    console.log("changed");
//    document.getElementById("country-selector").value = "Afghan";
//  }  
//  //if feild is clicked clear checkbox
//}


//checkbox contact
if (document.getElementById("multi-box-form")) {
  var boxes = document.getElementsByClassName("multi-boxes");
  var clearBox = document.getElementById("unknown");
  clearBox.addEventListener('change', cancelPrefs);
  function cancelPrefs() {
    for (var box in boxes) {
     boxes[box].checked = false;
    }
  function changePrefs() {
     clearBox.checked = false;
  }
  for (var box in boxes) {
     boxes[box].addEventListener('change', changePrefs);
    }
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

if (document.getElementById("stateless")) {
  var stateless = document.getElementById("stateless");
  var unknown = document.getElementById("unknown");
  var nationalityFields = document.getElementsByClassName("ui-autocomplete-input");
  function natPrefs() {
    console.log("canceled");
    stateless.checked = false;
    unknown.checked = false;
  }
  function miricle() {
    for (var x in nationalityFields) {
      nationalityFields[x].value = "";
    }
  }
  nationalityField.addEventListener('click', natPrefs);
  stateless.addEventListener('click', miricle);
  unknown.addEventListener('click', miricle);
}

if (document.getElementById("clearForm")) {
  var radios = document.getElementsByClassName("clearRadio");
  var inputBox = document.getElementById("imref");
  var clearBox = document.getElementById("unknown");
  function clearAll() {
    for (var x in radios) {
      radios[x].checked = null;
    }
    inputBox.value="";
  }
  function clearTheBox() {
    clearBox.checked = null;
  }
  
  radios[0].addEventListener('click', clearTheBox);
  radios[1].addEventListener('click', clearTheBox);
  radios[2].addEventListener('click', clearTheBox);
  inputBox.addEventListener('click', clearTheBox);
  clearBox.addEventListener('click', clearAll);
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

if ( document.getElementById("alerts") || document.getElementById("notifications") ) {
    var processButton = document.getElementById("processButton");
    var unprocessButton = document.getElementById("unprocessButton");
    var processBoxes = document.getElementsByClassName("process-boxes");
    var selectLink = document.getElementById("select_link");
    var unLink = document.getElementById("un_link");  
    var checkAll = function() {
      for (var x in processBoxes) {
       processBoxes[x].checked = true;
      }
      //make buttons live
      processButton.disabled = false;
      unprocessButton.disabled = false;
    };
    var unCheckAll = function() {
      for (var x in processBoxes) {
       processBoxes[x].checked = false;
      }
      processButton.disabled = true;
      unprocessButton.disabled = true;
    };
    var checkButtons = function() {
      console.log("here");
      var flag = false;
      for (var x in processBoxes) {
        if(processBoxes[x].checked == true) {
          flag = true;
        }
      }
      if (flag == false) {
        processButton.disabled = true;
        unprocessButton.disabled = true;
      } else {
        processButton.disabled = false;
        unprocessButton.disabled = false;
      }
    };
      
    selectLink.addEventListener('click', checkAll);
    unLink.addEventListener('click', unCheckAll);
  
    for (var x in processBoxes) {
      processBoxes[x].addEventListener('change', checkButtons);
    }
}

// Navigation
var navigationHighlight = function() {
   this.classList.add("active");
   for (var x in navigationLinkContainers) {
      if (navigationLinkContainers[x] !== this) {
         navigationLinkContainers[x].classList.remove("active");
      }
   }
}

var navigationLinkContainers = document.getElementsByClassName("sl-local-nav-item");
for (var x in navigationLinkContainers) {
   navigationLinkContainers[x].addEventListener('click', navigationHighlight);
}

// when one is clicked
// get all sl-local-nav-anchor items
// remove the active class from them all
// add it to the one clicked



/*

  checkLink
  unLink
  button
  checkboxes 

  checkLink.onclick(function)
  unLink.onclick(function)

  checkboxes.addeventlistener() {
    if any box checked remove class for button
    if all boxes unchecked add class
  }

  function (action) {
  if (action == "checked") {
      when unLink clicked all boxes not checked
      when checkLink clicked all boxes checked
    }
  }
  */





