// Sketch Plugin: Swap Fill and Border (command shift x)
// Source: github.com/NathanRutzky/Swap-Fill-Border
// Version: 1.1
// Corrected by Andrew Shapiro for Sketch 4+


var onRun = function(context) {

    var selection = context.selection;

    for (var i=0; i<[selection count]; i++) {
        
        var layer = [[selection objectAtIndex:i] style]
        var fills = [[layer fills] count]
        var borders = [[layer borders] count]
        
        if (fills && !borders) {
        
            var fillType = [[layer fill] fillType]
            var fillColor = [[layer fill] color]
            var fillGradient = [[layer fill] gradient]
            
            [[layer fill] setIsEnabled:0]
            [[layer borders] addNewStylePart]
            [[layer border] setThickness:2]
            [[layer border] setPosition:1]
            [[layer border] setFillType:fillType]
            [[layer border] setGradient:fillGradient]
            [[layer border] setColor:fillColor]
        }				
        
        if (!fills && borders) {
        
            var borderType = [[layer border] fillType]
            var borderColor = [[layer border] color]
            var borderGradient = [[layer border] gradient]
            
            [[layer border] setIsEnabled:0]
            [[layer fills] addNewStylePart]
            [[layer fill] setFillType:borderType]
            [[layer fill] setColor:borderColor]
            [[layer fill] setGradient:borderGradient]
        }
        
        if (fills && borders) {
        
            var borderEnabled = [[layer border] isEnabled]
            var borderSize = [[layer border] thickness]
            var	borderType = [[layer border] fillType]
            var	borderColor = [[layer border] color]
            var	borderGradient = [[layer border] gradient]
            var fillEnabled = [[layer fill] isEnabled]
            var fillType = [[layer fill] fillType]
            var	fillColor = [[layer fill] color]
            var	fillGradient = [[layer fill] gradient]
            
            if (fillEnabled && borderEnabled) {
        
                [[layer border] setThickness:borderSize]
                [[layer border] setFillType:fillType]
                [[layer border] setColor:fillColor]
                [[layer border] setGradient:fillGradient]
                [[layer fill] setFillType:borderType]
                [[layer fill] setColor:borderColor]
                [[layer fill] setGradient:borderGradient]   
            }
            
            if (!fillEnabled && borderEnabled) {
            
                [[layer border] setIsEnabled:0]	
                [[layer fill] setIsEnabled:1]
                [[layer fill] setColor:borderColor]
                [[layer fill] setGradient:borderGradient]
            }
            
            if (fillEnabled && !borderEnabled) {
            
                [[layer fill] setIsEnabled:0]
                [[layer border] setIsEnabled:1]
                [[layer border] setColor:fillColor]
                [[layer border] setGradient:fillGradient]   
            }
        }        
    }

}