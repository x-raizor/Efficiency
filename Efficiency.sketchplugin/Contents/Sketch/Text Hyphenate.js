// Hyphenator (cmd ctrl alt h)
@import 'js/utilities.js'

/**
 * Hyphenation using Liang-Knuth algorithm.
 * version 0.1.2 (01.09.2010)
 * Copyright (C) 2008-2010 Sergey Kurakin (sergeykurakin@gmail.com)
 *
 * Web service's written by Edele Gizatullin, me@edele.ru
 * Plugin's written by Andrei Shapiro, andrew@ashapiro.ru
 */

var onRun = function(context) {

    var selection = context.selection;

    var loop = [selection objectEnumerator]

    while (layer = [loop nextObject]) {
        if (!isText(layer)) continue;
        
        var url = "http://design-school.me/apps/hyphen/",
            body = "text=" + encodeURIComponent([layer stringValue]),
            result = getURLString(url, 'POST', body);

        [layer setStringValue: result ] // inject typographed text

        // rerender text layer
        var width = layer.absoluteRect().width();
        [layer setTextBehaviour: 0]  // Make it flexible: 1 — BCTextBehaviourFixedWidth
        [layer setTextBehaviour: 1]  // Make it fixed back: 0 — BCTextBehaviourFlexibleWidth
        layer.absoluteRect().width = width;
        [layer adjustFrameToFit]
    }

}