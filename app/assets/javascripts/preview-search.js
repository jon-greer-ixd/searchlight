if (document.getElementById("maincontent")) {
  $.getJSON("../public/javascripts/cis.json", function(json) {
    var bsCustomers = json;
    var bsInput = document.getElementById("maincontent");
    var preview = document.getElementById("preview");
    var counter;
    var inputvalue;

    function setData(citizen) {
      if (citizen != null) {
        var title = citizen.nameOneTitle;
        var firstName = citizen.nameOneFirst;
        var lastName = citizen.nameOneLast;
        var dateOfBirth = citizen.dobValue;
        var postCode =  citizen.postCode;
        document.getElementById("bsfirstname").innerHTML = firstName.toUpperCase();
        document.getElementById("bslastname").innerHTML = lastName.toUpperCase();
        document.getElementById("bsDob").innerHTML = dateOfBirth;
        document.getElementById("bsPostcode").innerHTML = postCode;
        document.getElementById("nino").innerHTML = citizen.nino;
        if(bsCustomers[person].title != "") {
          document.getElementById("bstitle").innerHTML = title.toUpperCase();
        } else {
          document.getElementById("bstitle").innerHTML = "";
        }
      } else {
        document.getElementById("bstitle").innerHTML = "No record found";
        document.getElementById("bsfirstname").innerHTML = "";
        document.getElementById("bslastname").innerHTML = "";
        document.getElementById("postcode").innerHTML = "";
        document.getElementById("bsDob").innerHTML = "";
        document.getElementById("nino").innerHTML = "";
      }
    }

    function searchError() {
      console.log("No match");
    }

    function getPerson(nino) {
      var citizen;
      for (person in bsCustomers) {
        if (nino == bsCustomers[person].nino) {
          citizen = bsCustomers[person];
          console.log("Found");
        }
      }
      setData(citizen);
    }

    bsInput.oninput = function(){
      counter = bsInput.value.length;
      if (counter == 8 || counter == 9) {
        getPerson( bsInput.value.toUpperCase() );
        preview.classList.add("visible");
      } else {
        preview.classList.remove("visible");
      }
    };

});
}