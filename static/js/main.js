/**
 * Created by Rushi on 11/3/17.
 */
$(document).ready(function() {
     var ratio = "";

        var obj1 = "";
        var obj2 = "";
        var obj3 = "";
        var age="";
          $("#slider").slider({
              animate: true,
              value:10,
              min: 10,
              max: 70,
              step: 1,
              slide: function(event, ui) {
                  update(1,ui.value); //changed
                  obj1 =  ui.value;
                  console.log("First slider executed");

              }
          });

          $("#slider2").slider({
              animate: true,
              value:50,
              min: 50,
              max: 100,
              step: 1,
              slide: function(event, ui) {
                  update(2,ui.value); //changed
                  obj2 =  ui.value;
                  console.log("Second slider executed");
              }
          });

            $("#slider3").slider({
              animate: true,
              value:0,
              min: 0,
              max: 100,
              step: 1,
              slide: function(event, ui) {
                  update(3,ui.value); //changed
                  obj3 =  ui.value;
                  console.log("Third slider executed");
              }
          });


   // $("#shape img:last-child").remove();
   $("#shape").append("<img id='def' src='/static/img/default.png' class='sizeImg'/>");
          //Added, set initial value.
          $("#waist").val(0);
          $("#height").val(0);
          $("#age").val(0);
          // $("#age-label").val(0);
          // $("#amount-label").text(0);
          // $("#duration-label").text(0);

          update();

    $("#sliderForm").submit(function(event){
        event.preventDefault();
        var waist = obj1;
        console.log("Waist is " + waist);
        var height = obj2;
        age = obj3;
        // var dataToBeSent = $("form").serialize();
        // $.post("/mainPage", {waist:obj1},'json');

 // ajax request to send data to python server
  $.ajax({
  type: "POST",
  contentType: "application/json; charset=utf-8",
  url: "/mainPage",
  data: JSON.stringify({waist: obj1, height:obj2, age:obj3}),
  success: function (data) {
    console.log("Getting ratio from server : ");
    console.log(data);
    ratio = parseFloat(data);
    console.log(ratio);
  },
  dataType: "json",
      async: false
});


        // Calculate WHtR and classify
    // var ratio=waist/height;
    // ratio=Math.ceil(ratio * 100)/100;
    //alert(ratio);

      // var ratio= obj1/obj2;
        console.log(typeof ratio);
        // ratio=parseFloat(ratio);
        // console.log(typeof ratio);
      if (ratio != "") {
          console.log("Teh ratio here is " + ratio);
          if (ratio < 0.4) {
              console.log("Here");
              $("#shape img:last-child").remove();
              $("#shape").append("<img id='chilly' src='/static/img/chilly.PNG' class='sizeImg'/>");

          }
          if (ratio >= 0.4 && ratio <= 0.5) {
              console.log("Here");
              $("#shape img:last-child").remove();
              $("#shape").append("<img id='pear' src='/static/img/pear.PNG'  class='sizeImg'/>");

          }
          if (ratio > 0.5 && ratio <= 0.6) {
              console.log("Here");
              $("#shape img:last-child").remove();
              $("#shape").append("<img id='pearApple' src='/static/img/pearapple.PNG' class='sizeImg'/>");
          }
          if (ratio > 0.6) {
              console.log("Here");
              $("#shape img:last-child").remove();
              $("#shape").append("<img id='apple' src='/static/img/apple.PNG'  class='sizeImg'/>");
          }


      }
      $("#exercises").show();
});



        $("#exercises").click(function() {
            if (ratio > 0.6 && parseInt(age)<=50)
            {

                window.location.href='/appleExercises1';
            }
            else if(ratio > 0.6 && parseInt(age)>50)
            {
                window.location.href='/appleExercises2';
            }
            else if (ratio >= 0.4 && ratio <= 0.5 && parseInt(age)<=50)
            {
                window.location.href = '/pearExercises';
            }
             else if (ratio >= 0.4 && ratio <= 0.5 && parseInt(age)>50)
            {
                window.location.href = '/pearExercises2';
            }

    });



      });

      //changed. now with parameter
      function update(slider,val) {
        //changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
        var $waist = slider == 1 ? val:$("#slider").val();
        var $height = slider == 2 ? val:$("#slider2").val();
        var $age = slider == 3 ? val:$("#slider3").val();






        /* commented
        $amount = $( "#slider" ).slider( "value" );
        $duration = $( "#slider2" ).slider( "value" );
         */
         //
         // $total = "$" + ($amount / $duration);
         // $( "#amount" ).val($amount);
         // $( "#amount-label" ).text($amount);
         // $( "#duration" ).val($duration);
         // $( "#duration-label" ).text($duration);
         // $( "#age" ).val($age);
         // $( "#age-label" ).text($age);
         // $( "#total" ).val($total);
         // $( "#total-label" ).text($total);

         $('#slider a').html('<label><span class="glyphicon glyphicon-chevron-left"></span> '+$waist+' <span class="glyphicon glyphicon-chevron-right"></span></label>');
         $('#slider2 a').html('<label><span class="glyphicon glyphicon-chevron-left"></span> '+$height+' <span class="glyphicon glyphicon-chevron-right"></span></label>');
         $('#slider3 a').html('<label><span class="glyphicon glyphicon-chevron-left"></span> '+$age+' <span class="glyphicon glyphicon-chevron-right"></span></label>');
      }
