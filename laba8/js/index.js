$("button").click(function(e){
    let list_numb = e.currentTarget.id.split('_')[1];
    $('#par').load(`../../group${list_numb}.txt`);
  });
  $("#groups").on('click','input',function(e){
    let list_numb = e.currentTarget.id;
    $.getJSON(`../../group${list_numb}.json`,function(result){
        $.each(result, function(i, field){
          $("#par").append('<br>' + i + " : " + field + "<br>");
        });
    });
  });