// Leading Up
@import 'js/utilities.js'

var onRun = function(context) {

	var doc = context.document;
	var newSelection = getTextLayers(context);
	var itemsNumber = newSelection.length;

	for (var i = 0; i < itemsNumber; i++) {
	    var layer = newSelection[i];
	    
	    var lineHeight = getLineHeightForLayer(layer);
	    setLineHeightForLayer(layer, lineHeight + 1, context)
	  	
	  	//var ls = layer.lineSpacing(); // version < 3.5
	    //layer.lineSpacing =  ls + 1;
	    
	    //layer.adjustFrameToFit();
	}

	[doc reloadInspector]

}