if ( document.getElementById("maincontent") ) {
  $.getJSON("../public/javascripts/cis.json", function(json) {
    var bsCustomers = json;
    var bsInput = document.getElementById("maincontent");
    var preview = document.getElementById("preview");
    var counter;
    var inputvalue;

    function setData() {
      var title, firstName, lastName, dateOfBirth, postCode;
      title = bsCustomers[person].nameOneTitle;
      firstName = bsCustomers[person].nameOneFirst;
      lastName = bsCustomers[person].nameOneLast;
      dateOfBirth = bsCustomers[person].dateOfBirth;
      postCode = bsCustomers[person].postCode;
      document.getElementById("bsfirstname").innerHTML = firstName.toUpperCase();
      document.getElementById("bslastname").innerHTML = lastName.toUpperCase();
      document.getElementById("bsDob").innerHTML = bsCustomers[person].dob;
      if(bsCustomers[person].title != "") {
        document.getElementById("bstitle").innerHTML = title.toUpperCase();
      } else {
        document.getElementById("bstitle").innerHTML = "";
      }
    }

    function getPerson() {
      for (person in bsCustomers) {
        console.log("person" + bsCustomers[person].nino);
        if (inputvalue == bsCustomers[person].nino) {
         console.log("TEST found");
         setData();
        }
      }
    }

    bsInput.oninput = function(){
      counter = bsInput.value.length;
      if (counter == 8 || counter == 9) {
        inputvalue = bsInput.value.toUpperCase();
        getPerson()
        preview.classList.add("visible");
      } else {
        preview.classList.remove("visible");
      }
    };

});


}