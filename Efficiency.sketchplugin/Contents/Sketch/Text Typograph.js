// Muravjev's typograph (cmd ctrl shift t)
@import 'js/utilities.js'

/**
 * Typographics enhancer with Russian typographics set of rules.
 * Powered by mdash.ru by Evgeny Muravjev and Alexander Drutsa
 * Plugin's written by Andrei Shapiro, andrew@ashapiro.ru
 */


function processNobr(text) {
    /**
     * Returns text with not breaking
     */
    var nbsp = String.fromCharCode(160);
    //nbsp = '*';
    newText = text.replace(/<nobr>(.*?)( ?)(.*?)<\/nobr>/g, "$1"+nbsp+"$3");
    // nice approach: str.split(search).join(replacement)
    //log(newText);
    return newText;
}

var onRun = function(context) {

  var selection = context.selection;

    var loop = [selection objectEnumerator]

    while (layer = [loop nextObject]) {
        if (!isText(layer)) continue;
        var options = "OptAlign.all=off&" +
            "Text.breakline=off&" +
            "Text.paragraphs=off&" +
            // "Nobr.super_nbsp=off&" +
            // "Nobr.nbsp_in_the_end=off&" +
            // "Nobr.phone_builder=off&" +
            // "Nobr.ip_address=off&" +
            // "Nobr.spaces_nobr_in_surname_abbr=off&" +
            // "Nobr.nbsp_celcius=off&" +
            // "Nobr.hyphen_nowrap_in_small_words=off&" +
            // "Nobr.hyphen_nowrap=off&" +
            // "Nobr.nowrap=off&" +
            "Etc.unicode_convert=on&";

        var url = "http://mdash.ru/api.v1.php",
            body = options + "text=" + encodeURIComponent([layer stringValue]),
            typo = getJSON(url, 'POST', body);

        layer.setStringValue( typo.result );  // inject typographed text

        //processNobr(typo.result);

        // rerender text layer
        var width = layer.absoluteRect().width();
        [layer setTextBehaviour: 0]  // Make it flexible: 1 — BCTextBehaviourFixedWidth
        [layer setTextBehaviour: 1]  // Make it fixed back: 0 — BCTextBehaviourFlexibleWidth
        layer.absoluteRect().width = width;
        [layer adjustFrameToFit]
    }

}