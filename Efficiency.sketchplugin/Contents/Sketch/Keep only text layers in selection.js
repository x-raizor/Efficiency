// Keep only text layers in selection
@import 'js/utilities.js'

function selectTextChildren(layers) {
  for (var x=0; x < [layers count]; x++){
    var childLayer = layers.array()[x];
    if (isText(childLayer)) selectLayer(childLayer);
  }
}

//TODO: revrite using recursion
//TODO: do with forEach

var onRun = function(context) {

  var selection = context.selection;

  for (var i=0; i < [selection count]; i++){
    var layer = selection[i];
    if (isGroup(layer)) {
      deselectLayer(layer);
      selectTextChildren([layer layers]);
    } else {
    	if (!isText(layer)) {
    		deselectLayer(layer);
    	} 
    }
  }
}