/**
 * SyntaxHighlighter ANSI Brush with ANSI-to-HTML conversion
 * Converts ANSI escape codes to HTML spans for proper styling
 */
;(function()
{
	// CommonJS
	SyntaxHighlighter = SyntaxHighlighter || (typeof require !== 'undefined'? require('shCore').SyntaxHighlighter : null);

	// ANSI code to CSS class mapping
	var ansiMap = {
		// Reset
		'0': 'ansi-reset',

		// Text formatting
		'1': 'ansi-bold',
		'2': 'ansi-dim',
		'3': 'ansi-italic',
		'4': 'ansi-underline',
		'5': 'ansi-blink',
		'7': 'ansi-reverse',
		'8': 'ansi-hidden',
		'9': 'ansi-strikethrough',

		// Foreground colors
		'30': 'ansi-fg-black',
		'31': 'ansi-fg-red',
		'32': 'ansi-fg-green',
		'33': 'ansi-fg-yellow',
		'34': 'ansi-fg-blue',
		'35': 'ansi-fg-magenta',
		'36': 'ansi-fg-cyan',
		'37': 'ansi-fg-white',

		// Bright foreground colors
		'90': 'ansi-fg-bright-black',
		'91': 'ansi-fg-bright-red',
		'92': 'ansi-fg-bright-green',
		'93': 'ansi-fg-bright-yellow',
		'94': 'ansi-fg-bright-blue',
		'95': 'ansi-fg-bright-magenta',
		'96': 'ansi-fg-bright-cyan',
		'97': 'ansi-fg-bright-white',

		// Background colors
		'40': 'ansi-bg-black',
		'41': 'ansi-bg-red',
		'42': 'ansi-bg-green',
		'43': 'ansi-bg-yellow',
		'44': 'ansi-bg-blue',
		'45': 'ansi-bg-magenta',
		'46': 'ansi-bg-cyan',
		'47': 'ansi-bg-white',

		// Bright background colors
		'100': 'ansi-bg-bright-black',
		'101': 'ansi-bg-bright-red',
		'102': 'ansi-bg-bright-green',
		'103': 'ansi-bg-bright-yellow',
		'104': 'ansi-bg-bright-blue',
		'105': 'ansi-bg-bright-magenta',
		'106': 'ansi-bg-bright-cyan',
		'107': 'ansi-bg-bright-white'
	};

	function convertAnsiToHtml(code) {
		// Regex to match both \e[ and \x1b[ escape sequences
		var ansiRegex = /(\\e\[|\\x1b\[|\x1b\[)([0-9;]*)m/g;
		var result = '';
		var lastIndex = 0;
		var openSpan = false;
		var match;

		while ((match = ansiRegex.exec(code)) !== null) {
			// Add text before the ANSI code
			result += code.substring(lastIndex, match.index);

			var ansiCode = match[2];

			// Handle reset or close existing span
			if (ansiCode === '0' || ansiCode === '') {
				if (openSpan) {
					result += '</span>';
					openSpan = false;
				}
			} else {
				// Close existing span if open
				if (openSpan) {
					result += '</span>';
				}

				// Get CSS class for this ANSI code
				var cssClass = ansiMap[ansiCode];
				if (cssClass) {
					result += '<span class="' + cssClass + '">';
					openSpan = true;
				}
			}

			lastIndex = ansiRegex.lastIndex;
		}

		// Add remaining text
		result += code.substring(lastIndex);

		// Close any remaining open span
		if (openSpan) {
			result += '</span>';
		}

		return result;
	}

	function Brush()
	{
		// Override the default highlighting function
		this.htmlScript = function(code) {
			// Convert ANSI codes to HTML spans
			var convertedCode = convertAnsiToHtml(code);

			// Return the converted HTML
			return convertedCode;
		};

		// Empty regex list since we're handling everything in htmlScript
		this.regexList = [];
	}

	Brush.prototype = new SyntaxHighlighter.Highlighter();
	Brush.aliases = ['ansi', 'ansicodes', 'ansi-codes'];

	SyntaxHighlighter.brushes.Ansi = Brush;

	// CommonJS
	typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();