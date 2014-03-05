function createNode(label) {
    var $node = $('<div>').text(label).addClass("node");
    return $node;
}

function createNodes(labels) {
    var nodes = [];
    for (var i = 0; i < labels.length; i++) {
	var node = createNode(labels[i]);
	nodes.push(node);
    }
    return nodes;
}

function spread($nodes, r) {
    for (var i = 0; i < $nodes.length; i++) {
	var $node = $nodes[i];
	var centerX = $node.offset().left;
	var centerY = $node.offset().top;

	var rad = 2*Math.PI * (i/$nodes.length);
	var x = r * Math.cos(rad) + centerX;
	var y = r * Math.sin(rad) + centerY;

	$nodes[i].animate({
	    left: x,
	    top: y
	}, 'slow');
    }
}

function nodeClicked($clickedNode, clickedNodeClass, dictFile, nextNodesClass) {
    var $interface = $('#interface');
    var centerX = $interface.width()  / 2;
    var centerY = $interface.height() / 2;

    var $centerNode = $('.'+nextNodesClass);
    var $others = $('.node').not($clickedNode);

    // fade out and remove center node
    $('.'+nextNodesClass).fadeOut('normal', function() {
    	$(this).remove();

	// move clicked node to the center
	$clickedNode.animate({
    	    left: centerX - $clickedNode.width()/2,
    	    top: centerY - $clickedNode.height()/2
	}, 'normal', function() {
    	    // fade out and remove other nodes
    	    var $others = $('.node').not($clickedNode);
    	    $others.fadeOut('slow', function() {
    		$(this).remove();
    	    });

    	    // create related nodes to the center
    	    $.getJSON(dictFile, function(data){
    		var labels = data[$clickedNode.text()];

    		var $relatedNodes = createNodes(labels);
    		for (var i = 0; i < $relatedNodes.length; i++) {
    		    var $node = $relatedNodes[i];
    		    $node.addClass(nextNodesClass);
    		    $interface.append($node);
    		    $node.css({
    			left: centerX - $node.width()/2,
    			top: centerY - $node.height()/2
    		    });
    		}

    		// spread them
    		var r = 192;
    		spread($relatedNodes, r);
    	    });
	});
    });
}


$(document).on('click', '.rakuten', function() {
    if ($(this).attr('id') == 'center') return;
    $(this).attr({id: 'center'});    
    nodeClicked($(this), 'rakuten', 'data/data1.json', 'tsunagari');

    // append item images
    var $node = $(this);
    $.getJSON('data/bongazou.json', function(data) {
    	var labels = data[$node.text()];

        for (var i = 0 ; i < labels.length; i++){
    	    var $item = $('<img>').attr({
    		'class': 'item',
    		'src': 'img/' + labels[i]
    	    });
    	    $('#items').append($item);
    	}
    });
});

$(document).on('click', '.tsunagari', function() {
    if ($(this).attr('id') == 'center') return;
    $(this).attr({id: 'center'});        
    nodeClicked($(this), 'tsunagari', 'data/data2.json', 'rakuten');

    // remove item images
    $('.item').remove();
});


$(document).on('click', '.item', function() {
    var $clone = $(this).clone(true).removeClass('item').addClass('stock');
    $('#stocks').append($clone);
});

$(document).on('click', '.stock', function() {
    $(this).remove();
});


$(function() {
    // initialize rakuten nodes
    $.getJSON('data/data1.json', function(data) {
	var labels = [];
	for (var key in data) labels.push(key);

	var $interface = $('#interface');
	var centerX = $interface.width()  / 2;
	var centerY = $interface.height() / 2;

	var $nodes = createNodes(labels);
	for (var i = 0; i < $nodes.length; i++) {
	    var $node = $nodes[i];
	    $node.addClass('rakuten');
	    $interface.append($node);
	    $node.css({
		left: centerX - $node.width()/2,
		top: centerY - $node.height()/2
	    });
	}
	var $center = createNode('');
	$center.addClass('tsunagari');
	$center.attr({id: 'center'});
	$interface.append($center);
	$center.css({
	    left: centerX - $center.width()/2,
	    top: centerY - $center.height()/2
	});

	var r = 256;
	spread($nodes, r);
    });
});
