// Bitmap To Pattern Fill (ctrl shift y)

function getSketchVersionNumber() {
	const version = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleShortVersionString"]
	var versionNumber = version.stringByReplacingOccurrencesOfString_withString(".", "") + ""
	while(versionNumber.length != 3) {
		versionNumber += "0"
	}
	return parseInt(versionNumber)
}
var sketchVersion = getSketchVersionNumber()

var onRun = function(context) {

	console.log(getSketchVersionNumber());

	var selection = context.selection;
	var doc = context.document;

	if ([selection count] == 0) {
		showDialog("Select an image layer")
		return
	}

	var loop = [selection objectEnumerator],
		notBitmapCount = 0,
		newLayers = [NSMutableArray new],
		rawImage, parent, newLayer, rect, newLayer;
		
	while (layer = [loop nextObject]) {
		if ([layer class] === MSBitmapLayer) {
			rawImage = (sketchVersion >= 340) ? [layer NSImage] : [[layer image] image]
			parent = [layer parentGroup]
			rect = [layer absoluteRect]

			if (sketchVersion >= 390) {
				var path = NSBezierPath.bezierPathWithRect(layer.absoluteRect().rect());
				newLayer = MSShapeGroup.shapeWithBezierPath(path);
				parent.addLayers([newLayer]);
			} else {
				if (sketchVersion >= 380) {
					//newLayer = parent.addLayers_([MSRect.alloc()]);
					// TODO: versions debt
					newLayer = [parent addLayerOfType: 'rectangle']
				} else if (sketchVersion >= 330) {
					newLayer = [parent addLayerOfType: 'rectangle']
				} else {
					newLayer = [[parent addLayerOfType: 'rectangle'] embedInShapeGroup]	
				}
				
				[[newLayer absoluteRect] setWidth: [rect width]];
			    [[newLayer absoluteRect] setHeight: [rect height]];
			}
			
			[[newLayer absoluteRect] setX: [rect x]];
		    [[newLayer absoluteRect] setY: [rect y]];
			[newLayer setName:[layer name]];

			setBitmapFill(newLayer, rawImage)
			[parent removeLayer: layer]
			[newLayers addObject:newLayer]
		} else {
			notBitmapCount++
		}
	}
	
	if (sketchVersion >= 480) {
		//[[doc selectedPage] deselectAllLayers]	
	} else {
		[[doc currentPage] deselectAllLayers]	
	}
	
	loop = [newLayers objectEnumerator]
	while (layer = [loop nextObject]) {
		[layer select:true byExpandingSelection:true]
	}
	
	if (notBitmapCount == 1) {
		showDialog(notBitmapCount+" selected layer is not an image layer")
	} else if (notBitmapCount > 1) {
		showDialog(notBitmapCount+" selected layers are not image layers")
	}

	[doc reloadInspector]
}


function showDialog (message, OKHandler) {
  var alert = [COSAlertWindow new];
  [alert setMessageText: "Bitmap to Pattern"]
  [alert setInformativeText: message]
  var responseCode = [alert runModal];	
  if(OKHandler != nil && responseCode == 0) OKHandler()
}

function setBitmapFill(layer, imageData) {

	if( [layer class] === MSShapeGroup ) {
		var fills = [[layer style] fills];
			// disable existing fills
			var loop = sketchVersion >= 390 ? fills.objectEnumerator() : fills.array().objectEnumerator();
			while (existingFill = [loop nextObject]) {
				[existingFill setIsEnabled:false]
			}

			if (sketchVersion >= 380) {
				layer.style().addStylePartOfType(0);
			} else {
				[fills addNewStylePart];
			}
			
		var bmpFill = sketchVersion >= 390 ? layer.style().fills().lastObject() : [fills lastObject];
			[bmpFill setFillType:4]
			if (sketchVersion >= 480) {
				bmpFill.setImage(MSImageData.alloc().initWithImage(imageData));
			} 
			else if (sketchVersion >= 390) {
				bmpFill.setImage(MSImageData.alloc().initWithImage_convertColorSpace(imageData, false));
			} 
			else if (sketchVersion >= 380) 
			{
				// TODO: versions debt
				//[bmpFill [MSImageData NSImage: imageData]]
				[bmpFill setPatternImage:imageData]
			} else if (sketchVersion < 350) 
			{
				[bmpFill setPatternImage:imageData collection:[[bmpFill documentData] images]]
			} else 
			{
				[bmpFill setPatternImage:imageData]
			}
			[bmpFill setPatternFillType:1]
	}

}
