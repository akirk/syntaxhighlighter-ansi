/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * @version
 * 3.0.83 (Wed, 16 Apr 2014 03:56:09 GMT)
 *
 * @copyright
 * Copyright (C) 2004-2013 Alex Gorbatchev.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */
;(function()
{
	// CommonJS
	SyntaxHighlighter = SyntaxHighlighter || (typeof require !== 'undefined'? require('shCore').SyntaxHighlighter : null);

	function Brush()
	{
		this.regexList = [
			// ANSI reset code
			{ regex: /\x1b\[0m/g, css: 'ansi-reset' },

			// ANSI color codes (foreground)
			{ regex: /\x1b\[30m/g, css: 'ansi-fg-black' },
			{ regex: /\x1b\[31m/g, css: 'ansi-fg-red' },
			{ regex: /\x1b\[32m/g, css: 'ansi-fg-green' },
			{ regex: /\x1b\[33m/g, css: 'ansi-fg-yellow' },
			{ regex: /\x1b\[34m/g, css: 'ansi-fg-blue' },
			{ regex: /\x1b\[35m/g, css: 'ansi-fg-magenta' },
			{ regex: /\x1b\[36m/g, css: 'ansi-fg-cyan' },
			{ regex: /\x1b\[37m/g, css: 'ansi-fg-white' },

			// ANSI bright color codes (foreground)
			{ regex: /\x1b\[90m/g, css: 'ansi-fg-bright-black' },
			{ regex: /\x1b\[91m/g, css: 'ansi-fg-bright-red' },
			{ regex: /\x1b\[92m/g, css: 'ansi-fg-bright-green' },
			{ regex: /\x1b\[93m/g, css: 'ansi-fg-bright-yellow' },
			{ regex: /\x1b\[94m/g, css: 'ansi-fg-bright-blue' },
			{ regex: /\x1b\[95m/g, css: 'ansi-fg-bright-magenta' },
			{ regex: /\x1b\[96m/g, css: 'ansi-fg-bright-cyan' },
			{ regex: /\x1b\[97m/g, css: 'ansi-fg-bright-white' },

			// ANSI background color codes
			{ regex: /\x1b\[40m/g, css: 'ansi-bg-black' },
			{ regex: /\x1b\[41m/g, css: 'ansi-bg-red' },
			{ regex: /\x1b\[42m/g, css: 'ansi-bg-green' },
			{ regex: /\x1b\[43m/g, css: 'ansi-bg-yellow' },
			{ regex: /\x1b\[44m/g, css: 'ansi-bg-blue' },
			{ regex: /\x1b\[45m/g, css: 'ansi-bg-magenta' },
			{ regex: /\x1b\[46m/g, css: 'ansi-bg-cyan' },
			{ regex: /\x1b\[47m/g, css: 'ansi-bg-white' },

			// ANSI bright background color codes
			{ regex: /\x1b\[100m/g, css: 'ansi-bg-bright-black' },
			{ regex: /\x1b\[101m/g, css: 'ansi-bg-bright-red' },
			{ regex: /\x1b\[102m/g, css: 'ansi-bg-bright-green' },
			{ regex: /\x1b\[103m/g, css: 'ansi-bg-bright-yellow' },
			{ regex: /\x1b\[104m/g, css: 'ansi-bg-bright-blue' },
			{ regex: /\x1b\[105m/g, css: 'ansi-bg-bright-magenta' },
			{ regex: /\x1b\[106m/g, css: 'ansi-bg-bright-cyan' },
			{ regex: /\x1b\[107m/g, css: 'ansi-bg-bright-white' },

			// ANSI text formatting
			{ regex: /\x1b\[1m/g, css: 'ansi-bold' },
			{ regex: /\x1b\[2m/g, css: 'ansi-dim' },
			{ regex: /\x1b\[3m/g, css: 'ansi-italic' },
			{ regex: /\x1b\[4m/g, css: 'ansi-underline' },
			{ regex: /\x1b\[5m/g, css: 'ansi-blink' },
			{ regex: /\x1b\[7m/g, css: 'ansi-reverse' },
			{ regex: /\x1b\[8m/g, css: 'ansi-hidden' },
			{ regex: /\x1b\[9m/g, css: 'ansi-strikethrough' },

			// General ANSI escape sequences
			{ regex: /\x1b\[[0-9;]*m/g, css: 'ansi-code' }
		];
	}

	Brush.prototype = new SyntaxHighlighter.Highlighter();
	Brush.aliases = ['ansi', 'ansicodes', 'ansi-codes'];

	SyntaxHighlighter.brushes.Ansi = Brush;

	// CommonJS
	typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();