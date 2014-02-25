$(document).ready(function(){

    $('#interface').width(1200);
    $('#interface').height(1200);
    $('#interface2').width(600);
    $('#interface2').height(1200);
    $('#interface3').width(1200);
    $('#interface3').height(300);



    $.getJSON("data1.json",function(result){
        var n = 0;
        for (var key in result){
            n++;
        }

        var i = 0;
        for (var key in result) {
            var r = 500;  // 半径
            var rad = 2*Math.PI * i/n;  // 角度（radian
            var p = $('#interface').width()/2; //xの中心座標
            var q = $('#interface').height()/2; //yの中心座標

            var x = r * Math.cos(rad) + p;  // X座標
            var y = r * Math.sin(rad) + q;  // Y座標
        
            var rakuten = $("<div>").text(key).attr({class: "rakuten"});
            rakuten.css({position: "absolute",  top: x, left: y});
            
            $(document).on("click",".rakuten",function (){

                //var a = $(this).attr("value");

                //alert(result[key]);


            $(this).addClass("clicked");
            $(".rakuten").not(".clicked").remove();
            $(this).removeClass("clicked");
            $(this).addClass("rakuten");
                //alert($(this).text());


            
            $(this).animate({
            left: p,
            top : q, 
            }, "slow");
            $(this).show();

            //var a = $(this).attr("value");
                //alert(result[key]).length);



        }); //押したやつが真ん中に来る
            
            $('#interface').append(rakuten);


            i++;
        };

    });

$(document).on("click",".rakuten",function (){

        $(".tunagari").remove(".tunagari");


        var a = ($(this).text());
    
        $.getJSON("data1.json",function(result){

            

        for (var n = 0 ; n < result[a].length; n++ ){

            }

            //alert(result[a][0]);

        for (var i = 0 ; i < result[a].length; i++ ){
            r = 500;  // 半径
            rad = 2*Math.PI * i/n;  // 角度（radian
            p = $('#interface').width()/2; //xの中心座標
            q = $('#interface').height()/2; //yの中心座標

            x = r * Math.cos(rad) + p;  // X座標
            y = r * Math.sin(rad) + q;  // Y座標
        
            var tunagari = $("<div>").text(result[a][i]).attr({class: "tunagari"});
            tunagari.css({position: "absolute",  top: x, left: y});
            //console.log(item2);

            $('#interface').append(tunagari);
        

            };
            //$('#interface').append(item2);
        });




    });

$(document).on("click",".rakuten",function (){
    
    var a = ($(this).text());
    //alert(a);
     
    $.getJSON("bongazou.json",function(result){
            //console.log(a);
            
            //console.log(result[a].length);
        for (var i = 0 ; i < result[a].length; i++){
                //alert(result[a].length);

            $('#interface3').append('<img src =' + result[a][i] + ' class ="gazou" >');
                //$('.gazou').draggable();
                console.log(result[a][i]);

            }
            //$('.gazou').draggable();
            //alert(a);
        });
    });

$(document).on("click",".gazou",function (){
    
    var a = ($(this).text());
    $(this).clone(true).insertAfter(this);
    $(this).addClass("clicked2");
    $(this).removeClass("gazou");
    //clicked2.css({position: "absolute",  top: 1500, left: 1500});
    //$(".gazou").not(".clicked2").remove();
    $('#interface2').append(this);
});



$(document).on("click",".tunagari",function (){

        //$(".item").remove(".item");
        //$(".item2").remove(".item2");
                $('.gazou').hide();
                $(this).addClass("clicked");
                $(".rakuten").not(".clicked").remove();
                $(this).addClass("clicked");
                $(".tunagari").not(".clicked").remove();
                $(this).removeClass("clicked");
                $(this).addClass("tunagari");

            $(this).animate({
            left: p,
            top : q, 
            }, "slow");
            $(this).show();


        var a = ($(this).text());

    
        $.getJSON("data2.json",function(result){


            

        for (var n = 0 ; n < result[a].length; n++ ){

            }

            //alert(result[a]);

        for (var i = 0 ; i < result[a].length; i++ ){
            r = 500;  // 半径
            rad = 2*Math.PI * i/n;  // 角度（radian
            p = $('#interface').width()/2; //xの中心座標
            q = $('#interface').height()/2; //yの中心座標

            x = r * Math.cos(rad) + p;  // X座標
            y = r * Math.sin(rad) + q;  // Y座標
        
            var rakuten = $("<div>").text(result[a][i]).attr({class: "rakuten"});
            rakuten.css({position: "absolute",  top: x, left: y});
            //item2.css({position: "absolute",  top: p, left: q});
            //console.log(item2);

            $('#interface').append(rakuten);
        

            };
            //$('#interface').append(item2);
        });

    });


});