
Efficiency
==========
Here is a plugins suite for efficient work in Sketch.App. The purpose is to work faster and less apish.

![](https://raw.githubusercontent.com/x-raizor/Efficiency/master/demo/efficiency-logo.png)


# Bitmap To Pattern Fill
![Bitmap to pattern fill](https://raw.githubusercontent.com/x-raizor/Efficiency/master/demo/bitmap-to-fill.gif)
Convert selected images into rectangles with images as pattern fill.

Plugin by Aby Nimbalkar


# Soft-hyphens (Cyrillic only for the moment)
![Bitmap to pattern fill](https://raw.githubusercontent.com/x-raizor/Efficiency/master/demo/hyphen.gif)

Provides selected text with soft-hyphens in order to obtain soft right edge of left align.

[Algorithm](http://quittance.ru/hyphenator.php) by [Sergey Kurakin](http://quittance.ru/blog/index.php?category=7)
Web service by [Edele Gizatullin](https://github.com/edele)

**Shortcut:** Cmd Ctrl Shift T


# Muravjev’s Typograph (Cyrillic only for the moment)
![Bitmap to pattern fill](https://raw.githubusercontent.com/x-raizor/Efficiency/master/demo/typograph.gif)

Typographics enhancer with set of rules for Russian typographics. Powered by [mdash.ru](http://mdash.ru) typograph web service which is lovely made by Evgeny Muravjev and Alexander Drutsa.

**Default options set**
* OptAlign.all = off
* Text.breakline = off
* Text.paragraphs = off
* Etc.unicode_convert = on
 
**Shortcut:** Cmd Ctrl Shift T


# Text leading, line spacing and tracking
![Text manipulations](https://raw.githubusercontent.com/x-raizor/Efficiency/master/demo/text_manipulation.gif)

Let you manipulate with text block leading (paragraph indent), line spacing and tracking via keyboard. With native hotkeys for font size (cmd alt =/-) and text block size changing (cmd shift ←/→) it transforms Sketch into typographics tool with immediate connection.

## Keyboard shortcuts
* Line Height +: Cmd Alt Shift =
* Line Height -: Cmd Alt Shift -
* Paragraph Gap +: Cmd Alt Shift Ctrl =
* Paragraph Gap -: Cmd Alt Shift Ctrl -
* Tracking-: Alt ← 
* Tracking+: Alt →

# Text tracking
Press Alt ← or Alt → to decrease or increase symbols spacing (tracking). It works only then text frame selected not in edit mode.


# Keep only text layers in selection
It removes any layers except text from your current selection. Sometimes you will want to choose all text layers in the document, page or artboard. So select all layers of scope you want and apply this plugin.


# Random shift
Shifts layers in selection in random direction. It’ll ask you for maximum shift size.

**Shortcut:** Cmd Alt R

![Random shift example](https://raw.githubusercontent.com/x-raizor/Efficiency/master/demo/random_shift.gif)


# Random size
Gives to layers in selection random size based on Perlin noise. It’ll ask you for scale factor.

**Shortcut:** Cmd Alt Shift R

![Random size example](https://raw.githubusercontent.com/x-raizor/Efficiency/master/demo/random_size.gif)


# Toggle ‘Constrain Proportions’
Toggle state of ‘Constrain Proportions’ layer property. 

**Shortcut**: Cmd Shift K (mnemonically: Keep aspect ratio)

![Toggle Constrain Proportions](https://raw.githubusercontent.com/x-raizor/Efficiency/master/demo/toggle-constrain-proportions.gif)


# Credits
## Plugin authors
* Aby Nimbalkar
* Andrew Shapiro

## Third parties
* Perlin Noise by John Haggerty [Slime](http://www.slimeland.com)
* [Mdash.ru](http://mdash.ru) typograph web service by Evgeny Muravjev and Alexander Drutsa
*  Hyphenation using Liang-Knuth algorithm by [Sergey Kurakin](http://quittance.ru/blog/index.php?category=7)
* Web service for hyphenation by [Edele Gizatullin](https://github.com/edele)
