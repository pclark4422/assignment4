// The anonymous function below will fire on page load

(function() {
  // Magic!
  var $url= $('.flexsearch-input') || '';

  $('#mainForm').on('submit', function(e) {
    e.preventDefault();

    $url= $('.flexsearch-input').val();
    $('#data').html("<tr></tr>")

    $.ajax({
      url: $url,
      method: 'GET'
    }).success(function(data) {
      dataWrite(data);
    }).fail(function(data) {
      $('#data').html("<p>Faile to Retrieve Data</p>")
    });
  });
})();

function dataWrite(data){
  var testType = typeof data.data[0];
  if(testType != "string"){
    all(data);
  }
  else{
    some(data);
  }
}

function all(data){
  var interests = data.data.interests;
  var programming = data.data.programming;

  var maxLength = interests.length;

  if(maxLength < programming.length){
    maxLength = programming.length;
  }

  $('#data tr:last').after("<tr><th>Interests: </th> <th> Programming: </th></tr>");

  for(i=0;i<maxLength;i++){
    if(typeof interests[i] != "undefined"){
      var interest = interests[i];
    }
    else{
      var interest = ""
    }

    if(typeof programming[i] != "undefined"){
      var program = programming[i];
    }
    else{
      var program = ""
    }

      $('#data tr:last').after("<tr><td>"+ interest + "</td> <td>" + program + "</td></tr>");

  }
}

function some(data){
  var list = data.data;

  for(i=0;i<list.length;i++){
    $('#data tr:last').after("<tr><td>"+ list[i] + "</td> </tr>");
  }
}
