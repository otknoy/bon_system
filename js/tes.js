$(document).ready(function(){

    $('#interface').width(1200);
    $('#interface').height(1200);
    $('#interface2').width(600);
    $('#interface2').height(1200);
    $('#interface3').width(1200);
    $('#interface3').height(300);


    $.getJSON("data/data1.json",function(result){
        var n = 0;
        for (var key in result){
            n++;
        }

        var i = 0;
        for (key in result) {
            var r = 500;
            var rad = 2*Math.PI * i/n;
            var p = $('#interface').width()/2;
            var q = $('#interface').height()/2;

            var x = r * Math.cos(rad) + p;
            var y = r * Math.sin(rad) + q;
            
            var rakuten = $("<div>").text(key).attr({"class": "rakuten"});
            rakuten.css({position: "absolute",  top: x, left: y});
            
            $(document).on("click",".rakuten",function (){
		$(this).addClass("clicked");
		$(".rakuten").not(".clicked").remove();
		$(this).removeClass("clicked");
		$(this).addClass("rakuten");
		
		$(this).animate({
		    left: p,
		    top : q
		}, "slow");
		$(this).show();
            });
            
            $('#interface').append(rakuten);

            i++;
        };
    });

    $(document).on("click",".rakuten",function (){
        $(".tunagari").remove(".tunagari");

        var a = ($(this).text());
	
        $.getJSON("data/data1.json",function(result){
	    var n = result[a].length;

            for (var i = 0 ; i < result[a].length; i++ ){
		var r = 500;
		var rad = 2*Math.PI * i/n;
		var p = $('#interface').width()/2;
		var q = $('#interface').height()/2;

		var x = r * Math.cos(rad) + p;
		var y = r * Math.sin(rad) + q;
		
		var tunagari = $("<div>").text(result[a][i]).attr({"class": "tunagari"});
		tunagari.css({position: "absolute",  top: x, left: y});

		$('#interface').append(tunagari);
            };
        });


    });

    $(document).on("click",".rakuten",function (){
	var a = ($(this).text());
	
	$.getJSON("data/bongazou.json",function(result){
            for (var i = 0 ; i < result[a].length; i++){
		$('#interface3').append('<img src =' + 'img/' + result[a][i] + ' class ="gazou" >');
            }
        });
    });

    $(document).on("click",".gazou",function (){
	var a = ($(this).text());
	$(this).clone(true).insertAfter(this);
	$(this).addClass("clicked2");
	$(this).removeClass("gazou");
	$('#interface2').append(this);
    });

    $(document).on("click",".tunagari",function (){
        $('.gazou').hide();
        $(this).addClass("clicked");
        $(".rakuten").not(".clicked").remove();
        $(this).addClass("clicked");
        $(".tunagari").not(".clicked").remove();
        $(this).removeClass("clicked");
        $(this).addClass("tunagari");

        var p = $('#interface').width()/2;
        var q = $('#interface').height()/2;
        $(this).animate({
            left: p,
            top : q
        }, "slow");
        $(this).show();

        var a = ($(this).text());
	
        $.getJSON("data/data2.json",function(result){
	    var n = result[a].length;

            for (var i = 0 ; i < result[a].length; i++ ){
		var r = 500;
		var rad = 2*Math.PI * i/n;

		var x = r * Math.cos(rad) + p;
		var y = r * Math.sin(rad) + q;
		
		var rakuten = $("<div>").text(result[a][i]).attr({class: "rakuten"});
		rakuten.css({position: "absolute",  top: x, left: y});

		$('#interface').append(rakuten);
            };
        });
    });
});