// Move layers slightly in random direction (cmd alt r)
@import 'js/utilities.js'


var onRun = function(context) {

  function randomShift(layer) {
    var xShift = randInt(randInt(-MAX_SHIFT, 0), randInt(0, MAX_SHIFT));
    var yShift = randInt(randInt(-MAX_SHIFT, 0), randInt(0, MAX_SHIFT));
    var x = layer.frame().x();
    var y = layer.frame().y();
    layer.frame().setX(x + xShift);
    layer.frame().setY(y + yShift);
  }

  var doc = context.document;
  var MAX_SHIFT = [doc askForUserInput:"Мaximum shift for objects?" initialValue:""]
	var selection = context.selection;

	for (var i=0; i < [selection count]; i++){
	  randomShift(selection[i]);
	}
}
