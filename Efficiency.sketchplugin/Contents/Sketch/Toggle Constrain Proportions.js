// Toggle 'Constrain proportions' property (cmd shift k)

var onRun = function(context) {
	
	var selection = context.selection;
	var loop = [selection objectEnumerator]
	while (layer = [loop nextObject]) {
		layer.constrainProportions = !layer.constrainProportions();
	}
}