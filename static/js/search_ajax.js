$(document).ready(function() {
   //On pressing a key on "Search box" in "index.html" file. This function will be called.
   $("#search").keyup(function(e) {
     //checks if keyup is enter
     if(e.which == 13) {
       $.ajax({
           type: "POST",
           url: "/retrieve",
           data: {
               entered_text:$("#search").val()
           },
           success: function(response) {
               if (response.frequency_count=="Not in DataBase"){
                 $("#display_search").hide();
                 $("#freq_show").html("Frequency count for '"+response.entered_text+"' : "+response.frequency_count).show();
               }else{
                 $("#display_search").hide();
                 $("#freq_show").html("Frequency count for '"+response.entered_text+"' : "+response.frequency_count).show();
                }
           }
       });
     }else{
         //Assigning search box value to javascript variable named as "name".
         $("#freq_show").hide()
         var name = $('#search').val();
         //Validating, if "name" is empty.
         if (name == "") {
             $("#display_search").html("");
         }
         else {
             $.ajax({
                 type: "POST",
                 url: "/search",
                 data: {
                     search: name
                 },
                 success: function(response) {
                    var tags=""
                    $.each(response.words, function( index, value ) {
                      tags+="<li>"+value+"</li>"
                    });

                     $("#display_search").html(tags).show();
                 }
             });
           }
        }
 });
});
