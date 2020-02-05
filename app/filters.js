module.exports = function (env) {
  /**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */
  var filters = {}

  /* ------------------------------------------------------------------
    add your methods to the filters obj below this comment block:
    @example:

    filters.sayHi = function(name) {
        return 'Hi ' + name + '!'
    }

    Which in your templates would be used as:

    {{ 'Paul' | sayHi }} => 'Hi Paul'

    Notice the first argument of your filters method is whatever
    gets 'piped' via '|' to the filter.

    Filters can take additional arguments, for example:

    filters.sayHi = function(name,tone) {
      return (tone == 'formal' ? 'Greetings' : 'Hi') + ' ' + name + '!'
    }

    Which would be used like this:

    {{ 'Joel' | sayHi('formal') }} => 'Greetings Joel!'
    {{ 'Gemma' | sayHi }} => 'Hi Gemma!'

    For more on filters and how to write them see the Nunjucks
    documentation.
    

  ------------------------------------------------------------------ */

  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */
  
  var Dates = require('./dates.js');
  var dates = Dates.dates;
  
  filters.asString = function(x) {
    return dates.convertDayToString(x);
  }
    
  filters.lastTelephoneCheck = function(contact_types) {
    var counter = 0;
    var returnItem;
    for (var y in contact_types) {
      if (contact_types[y].type === "phone") {
        if (contact_types[y].show === false) {
          counter++;
          returnItem = y;
        }
      }
    }
    return (counter === 1 ? returnItem : 'none')
  }
  
  //should be able to pass type "all" into this function and replace the one below ±
  //have all telephone numbers been added?
  filters.allPhonesAdded = function(contact_types) {
    var counter = 0;
    for (var y in contact_types) {
      if (contact_types[y].type === "phone") {
        if (contact_types[y].state == null) {
          counter++;
        }
      }
    }
    return (counter != 0 ? false : true)
  }
  
  //have ANY contact details been added?
  filters.checkForContacts = function(items) {
    var y = false;
    for (var item in items ) {
      if (items[item].show == true) {
        y = true
      }
    }
    return y;
  }

  //have ALL contact details been added?
  filters.allContactsAdded = function(items) {
    var counter;
    for (var item in items ) {
      if (items[item].state == null || items[item].state == "removed")  {
        counter++
      }
    } if (counter == 0 || counter === items.length ) {
      return true;
    } else {
      return false;
    }
  }

  //show the correct noun
  filters.contactIs = function(contact) {
    if (contact == "phone" || contact == "other-phone"  || contact == "fax" ) {
      return "number";
    } else if (contact == "email") {
      return "address";
    } else {
      return "";
    }
  }
  
  //show the correct status
  filters.statusAsAString = function(status) {
    if (status == "dlo") {
      return "Dead letter office";
    } else if (status == "live") {
      return "Live";
    } else if (status == "pwa") {
      return "Person without address";
    } else if (status == "nfa") {
      return "No fixed abode";
    }
  }

  //check for item
  filters.checkForItem = function(list, thing) {
    var toReturn = false
    for (var item in list) {
      if (item == thing) {
        toReturn = true;
        break;
      }
      return toReturn;
    }
  }

  
  //remove whitespace
  filters.convertStatus = function(status) {
    if (status == 0) {
      return "Open";
    } else if (status == 1) {
      return "In progress";
    } else if (status == 2) {
    return "Allocated";
    }
}

  //remove whitespace
  filters.removeWhitespace = function(term) {
    term = term.replace(/\s/g, "");
    return term;
  }

    //remove whitespace
    filters.convertstatusDescription = function(statusDescription) {
      if (statusDescription == 1) {
        return "All data matched.";
      } else if (statusDescription == 2) {
        return "No right to work.";
      } else if (statusDescription == 3) {
        return "BRP mismatch.";
      } else if (statusDescription == 4) {
        return "BRP and name mismatched.";
      } else if (statusDescription == 5) {
        return "Passport mismatch.";
      } else if (statusDescription == 6) {
        return "Passport and name mismatched.";
      } else if (statusDescription == 7) {
        return "Name mismatched.";
      } else if (statusDescription == 8) {
        return "Passport and BRP mismatched.";
      } else if (statusDescription == 9) {
        return "Home office data matched but similar account exists in CIS.";
      } else {
        return "NAN";
      }
    }
  return filters
}

      // {# scenario 1 - all match4  #}
      // {# scenario 2 - no right to work  #}
      // {# scenario 3 - BRP mismatch  #}
      // {# scenario 4 - BRP mismatch and name mismatch  #}
      // {# scenario 5 - Passport mismatch #}
      // {# scenario 6 - Passport mismatch and name mismatch  #}
      // {# scenario 7 - Name mismatch  #}
      // {# scenario 8 - DOB, Nationality mismatch  #}
      // {# scenario 9 - Matched accounts in CIS  #}

// if no contacts set to show - show no contacts
// if any contact set to not show - hide the link