/**
 * Checkers
 */

function isText(layer) {
  return [layer isMemberOfClass:[MSTextLayer class]]
}

function isGroup(layer) {
  return [layer isMemberOfClass:[MSLayerGroup class]] || [layer isMemberOfClass:[MSArtboardGroup class]]
}


function isTextEditingInProgress() {
    for(var i=0; i<selection.count(); i++) {
        var layer = selection.objectAtIndex(i);
        if(layer.className() == "MSTextLayer") {
            if(layer.isEditingText()) {
                return true;
            }
        }
    }
    return false;
}


function simulateKeyStroke(keyCode,modFlags) {
  // simulateKeyStroke(0x35,0); escape
  // simulateKeyStroke(0x24,0); ?
    var event = [NSEvent keyEventWithType:NSKeyDown
    location:NSMakePoint(0,0)
    modifierFlags:modFlags
    timestamp:[NSDate timeIntervalSinceReferenceDate]
    windowNumber:0
    context:[NSGraphicsContext currentContext]
    characters:""
    charactersIgnoringModifiers:""
    isARepeat:false
    keyCode:keyCode];

    [NSApp postEvent:event atStart:true];
}


/**
 * Helpers 
 */

function selectLayer(layer) {
    [layer select:true byExpandingSelection:true]
}


function deselectLayer(layer) {
    [layer select:false byExpandingSelection:true]
}
    

/**
 * Gather all children for banch of 'layers' into array 'sel' 
 */
function collectChildren(layers, sel) {
  for (var x = 0; x < [layers count]; x++){
    var childLayer = layers.array()[x];
    if (isText(childLayer)) sel.push(childLayer); // process only text layers
  }
}


/**
 * Select all children of the group (keeping group selected!)
 */
function selectChildren(layers) {
  for (var x=0; x < [layers count]; x++){
    var childLayer = layers.array()[x];
    [childLayer select:true byExpandingSelection:true]
  }
}


/**
 * Return array of selected layers keeping only text ones
 */
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
 * Generators
 */

/** 
 * Return random value between 'from' and 'to'
 */
function randInt(from, to) {
  return from + Math.random()*(to-from);
}


/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}


/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * But Math.round() has a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * Return random string with length equals to charNumber
 */
function randomString(charNumber) {
    if (charNumber == undefined) charNumber = 140;
    var rstr = "";
    for (i = 0; i < charNumber; i++) {
        var cChar = String.fromCharCode(getRandomInt(48, 122));
        rstr += cChar;
    }
    return rstr;
}



/** HTTP getters */

/**
* Load response from url by SynchronousRequest
*/
function get(url) {
    var request = NSURLRequest.requestWithURL(NSURL.URLWithString(url));
    var response = NSURLConnection.sendSynchronousRequest_returningResponse_error(request, null, null);
    return response;
}

/**
 *  Sychronous request with GET of POST method
 *  with contribution of @tylergaw on github
 */
function getJSON (url, method, body) {

  if (method == undefined || method == 'GET' || body == undefined) {
    // GET request
    var request = NSURLRequest.requestWithURL(NSURL.URLWithString(url));
  } 
  else { // POST request

    var postString = [NSString stringWithUTF8String: body];
    var request = NSMutableURLRequest.requestWithURL(NSURL.URLWithString(url));
    [request setHTTPMethod: "POST"];
    [request setHTTPBody:[postString dataUsingEncoding:NSUTF8StringEncoding]];    
  }

  var response = NSURLConnection.sendSynchronousRequest_returningResponse_error(request, null, null);
  return JSON.parse(NSString.alloc().initWithData_encoding(response, NSUTF8StringEncoding));
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


/* 
 * Content Generator Utils
 */
var tools = {
  versionComponents : function() {
    var info = [[NSBundle mainBundle] infoDictionary];
    var items = [[(info["CFBundleShortVersionString"]) componentsSeparatedByString:"."] mutableCopy];

    while([items count] < 3)
      [items addObject:"0"];

    return items;
  },
  majorVersion : function() {
    var items = tools.versionComponents();

    return items[0];
  },
  minorVersion : function() {
    var items = tools.versionComponents();

    return items[1];
  },
  convertToString : function(objectString){
    var i = 0;
    normalString = "";
    while(objectString[i] !== null) normalString += objectString[i];
    return normalString;
  },

  saveFile : function(path,data){   
    var someContent = NSString.stringWithString_(data)
    var path = path
    someContent.dataUsingEncoding_(NSUTF8StringEncoding).writeToFile_atomically_(path, true)
  },
  pluginPath : function(){
    if(tools.majorVersion() == 3){
      var pluginFolder = scriptPath.match(/Plugins\/([\w -])*/)[0] + "/";
      var sketchPluginsPath = scriptPath.replace(/Plugins([\w \/ -])*.sketchplugin$/, "");
      return pluginFolder;
    }   
  }
};
