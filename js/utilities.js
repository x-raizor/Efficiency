/**
 * Helpers 
 */

function selectLayer(layer) {
    [layer select:true byExpandingSelection:true]
}

function deselectLayer(layer) {
    [layer select:false byExpandingSelection:true]
}
    


/* gather all choldren for banch of 'layers' into array 'sel' */
function collectChildren(layers, sel) {
  for (var x = 0; x < [layers count]; x++){
    var childLayer = layers.array()[x];
    if (isText(childLayer)) sel.push(childLayer); // process only text layers
  }
}

/* select all children of the group */
function selectChildren(layers) {
  for (var x=0; x < [layers count]; x++){
    var childLayer = layers.array()[x];
    [childLayer select:true byExpandingSelection:true]
  }
}

/* untested, doesn't work properly at the moment */
function forEach(items, action) {
    for (var x=0; x < [items count]; x++) { 
        action(items[x]);
    }
}


/**
 * Generators
 */

function randInt(from, to) {
/** 
 * Return random value between 'from' and 'to'
 */
  return from + Math.random()*(to-from);
}


/**
 * TESTER functions 
 */

function isText(layer) {
  return [layer isMemberOfClass:[MSTextLayer class]]
}

function isGroup(layer) {
  return [layer isMemberOfClass:[MSLayerGroup class]] || [layer isMemberOfClass:[MSArtboardGroup class]]
}


function getTextLayers() {
	var newSelection = []

	// look through selection to lookup inside groups and gather layers
	var loop = [selection objectEnumerator]
	while (layer = [loop nextObject]) {
	  if (isGroup(layer)) {
	      collectChildren([layer layers], newSelection);
	  } else {
	      if (isText(layer)) newSelection.push(layer);  // process only text layers
	  }
	}
	return newSelection;
}


/**
 * Clipboard text handling with a get and set function
 * clipboard.get() // get text from the clipboard
 * clipboard.set( 'text' ) // set the clipboard to the given text
 * 
 * @type {Object}
 */
var clipboard = {
    // store the pasetboard object
    pasteBoard : null,
 
    // save the pasteboard object
    init : function()
    {
        this.pasteBoard = NSPasteboard.generalPasteboard();
    },
    // set the clipboard to the given text
    set : function( text )
    {
        if( typeof text === 'undefined' ) return null;
 
        if( !this.pasteBoard )
            this.init();
 
        this.pasteBoard.declareTypes_owner( [ NSPasteboardTypeString ], null );
        this.pasteBoard.setString_forType( text, NSPasteboardTypeString );
 
        return true;
    },
    // get text from the clipbaoard
    get : function()
    {
        if( !this.pasteBoard )
            this.init();
 
        var text = this.pasteBoard.stringForType( NSPasteboardTypeString );
        
        return text.toString();
    }
};