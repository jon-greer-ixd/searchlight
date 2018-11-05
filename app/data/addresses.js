var addressLines = ['1 Current Crescent', '2 New Street', '7 Post Street'];

var addresses = {
  "residential" : {
    'state' : null, 
    'status' : 'live',
    'show' : true, 
    'display' : 'Residential address', 
    'startDate' : '01 Jan 1990', 
    'endDate' : null, 
    'cherish' : null, 
    'lineOne' : addressLines[0]
  }, 
  "correspondence" : {
    'state' : null, 
    'status' : 'null',
    'show' : false, 
    'display' : 'Correspondence address', 
    'startDate' : '01 Jan 1990', 
    'endDate' : null, 
    'cherish' : null, 
    'lineOne' : addressLines[2]
  }
}

module.exports.addressLines = addressLines;
module.exports.addresses = addresses;