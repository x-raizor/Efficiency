// Set object's widths randomly using Perlin noise (cmd alt shift r)
@import 'js/vector.js'
@import 'js/perlinnoise.js'

var onRun = function(context) {

	var selection = context.selection;
	var doc = context.document;
	var scaleFactor = [doc askForUserInput:"Scale factor [1..100]" initialValue:"5"]

	P = new PerlinNoise(0.8296815753293, 11);

	for (var i=0; i < [selection count]; i++){
	  var layer = selection[i],
	      _x = Math.abs(layer.frame().x()) + Math.random(),
	      _y = Math.abs(layer.frame().y()) + Math.random(),
	      //width = layer.frame().width(),
	      fNoise = P.evaluate({x:_x, y:_y, z:1}) * scaleFactor;
	  
	  layer.frame().setConstrainProportions(true);
	  layer.frame().setWidth(fNoise);
	 
	}

}