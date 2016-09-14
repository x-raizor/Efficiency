// Leading Down
@import 'js/utilities.js'

var onRun = function(context) {

	var doc = context.document;
	var newSelection = getTextLayers(context);
	var itemsNumber = newSelection.length;

	for (var i = 0; i < itemsNumber; i++) {
	    var layer = newSelection[i];
	    var lead = layer.leading();
	    layer.setLeading(lead - 1);
	    //layer.adjustFrameToFit();
	}

	[doc reloadInspector]

}