// Decrease Tracking for text layer or Duplicate and Nudge Left (alt ←)
@import 'js/utilities.js'

var onRun = function(context) {

  var doc = context.document;
  var selection = context.selection;

  for(var i=0; i < [selection count]; i++){
    if (isText(selection[i])) { // tracking part
      var layer = selection[i];
      var tracking = layer.characterSpacing();
      layer.characterSpacing =  tracking - 1;
      layer.adjustFrameToFit();
    } 
    else { // nudge part

      var s = selection[i]
      var copy = [s duplicate]
      var frame = [copy frame]

      [frame setX:([frame x] - 1)]

      if (i==0) {
        [copy select:true byExpandingSelection:false]
      } else {
        [copy select:true byExpandingSelection:true]
      }
    }
  }

  [doc reloadInspector]
  
}