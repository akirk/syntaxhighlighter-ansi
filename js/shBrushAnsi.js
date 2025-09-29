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
			// ANSI reset codes
			{ regex: /\\e\[0m/g, css: 'ansi-reset' },
			{ regex: /\x1b\[0m/g, css: 'ansi-reset' },

			// ANSI color codes (foreground) - \e syntax
			{ regex: /\\e\[30m/g, css: 'ansi-fg-black' },
			{ regex: /\\e\[31m/g, css: 'ansi-fg-red' },
			{ regex: /\\e\[32m/g, css: 'ansi-fg-green' },
			{ regex: /\\e\[33m/g, css: 'ansi-fg-yellow' },
			{ regex: /\\e\[34m/g, css: 'ansi-fg-blue' },
			{ regex: /\\e\[35m/g, css: 'ansi-fg-magenta' },
			{ regex: /\\e\[36m/g, css: 'ansi-fg-cyan' },
			{ regex: /\\e\[37m/g, css: 'ansi-fg-white' },

			// ANSI color codes (foreground) - \x1b syntax
			{ regex: /\x1b\[30m/g, css: 'ansi-fg-black' },
			{ regex: /\x1b\[31m/g, css: 'ansi-fg-red' },
			{ regex: /\x1b\[32m/g, css: 'ansi-fg-green' },
			{ regex: /\x1b\[33m/g, css: 'ansi-fg-yellow' },
			{ regex: /\x1b\[34m/g, css: 'ansi-fg-blue' },
			{ regex: /\x1b\[35m/g, css: 'ansi-fg-magenta' },
			{ regex: /\x1b\[36m/g, css: 'ansi-fg-cyan' },
			{ regex: /\x1b\[37m/g, css: 'ansi-fg-white' },

			// ANSI bright color codes (foreground) - \e syntax
			{ regex: /\\e\[90m/g, css: 'ansi-fg-bright-black' },
			{ regex: /\\e\[91m/g, css: 'ansi-fg-bright-red' },
			{ regex: /\\e\[92m/g, css: 'ansi-fg-bright-green' },
			{ regex: /\\e\[93m/g, css: 'ansi-fg-bright-yellow' },
			{ regex: /\\e\[94m/g, css: 'ansi-fg-bright-blue' },
			{ regex: /\\e\[95m/g, css: 'ansi-fg-bright-magenta' },
			{ regex: /\\e\[96m/g, css: 'ansi-fg-bright-cyan' },
			{ regex: /\\e\[97m/g, css: 'ansi-fg-bright-white' },

			// ANSI bright color codes (foreground) - \x1b syntax
			{ regex: /\x1b\[90m/g, css: 'ansi-fg-bright-black' },
			{ regex: /\x1b\[91m/g, css: 'ansi-fg-bright-red' },
			{ regex: /\x1b\[92m/g, css: 'ansi-fg-bright-green' },
			{ regex: /\x1b\[93m/g, css: 'ansi-fg-bright-yellow' },
			{ regex: /\x1b\[94m/g, css: 'ansi-fg-bright-blue' },
			{ regex: /\x1b\[95m/g, css: 'ansi-fg-bright-magenta' },
			{ regex: /\x1b\[96m/g, css: 'ansi-fg-bright-cyan' },
			{ regex: /\x1b\[97m/g, css: 'ansi-fg-bright-white' },

			// ANSI background color codes - \e syntax
			{ regex: /\\e\[40m/g, css: 'ansi-bg-black' },
			{ regex: /\\e\[41m/g, css: 'ansi-bg-red' },
			{ regex: /\\e\[42m/g, css: 'ansi-bg-green' },
			{ regex: /\\e\[43m/g, css: 'ansi-bg-yellow' },
			{ regex: /\\e\[44m/g, css: 'ansi-bg-blue' },
			{ regex: /\\e\[45m/g, css: 'ansi-bg-magenta' },
			{ regex: /\\e\[46m/g, css: 'ansi-bg-cyan' },
			{ regex: /\\e\[47m/g, css: 'ansi-bg-white' },

			// ANSI background color codes - \x1b syntax
			{ regex: /\x1b\[40m/g, css: 'ansi-bg-black' },
			{ regex: /\x1b\[41m/g, css: 'ansi-bg-red' },
			{ regex: /\x1b\[42m/g, css: 'ansi-bg-green' },
			{ regex: /\x1b\[43m/g, css: 'ansi-bg-yellow' },
			{ regex: /\x1b\[44m/g, css: 'ansi-bg-blue' },
			{ regex: /\x1b\[45m/g, css: 'ansi-bg-magenta' },
			{ regex: /\x1b\[46m/g, css: 'ansi-bg-cyan' },
			{ regex: /\x1b\[47m/g, css: 'ansi-bg-white' },

			// ANSI bright background color codes - \e syntax
			{ regex: /\\e\[100m/g, css: 'ansi-bg-bright-black' },
			{ regex: /\\e\[101m/g, css: 'ansi-bg-bright-red' },
			{ regex: /\\e\[102m/g, css: 'ansi-bg-bright-green' },
			{ regex: /\\e\[103m/g, css: 'ansi-bg-bright-yellow' },
			{ regex: /\\e\[104m/g, css: 'ansi-bg-bright-blue' },
			{ regex: /\\e\[105m/g, css: 'ansi-bg-bright-magenta' },
			{ regex: /\\e\[106m/g, css: 'ansi-bg-bright-cyan' },
			{ regex: /\\e\[107m/g, css: 'ansi-bg-bright-white' },

			// ANSI bright background color codes - \x1b syntax
			{ regex: /\x1b\[100m/g, css: 'ansi-bg-bright-black' },
			{ regex: /\x1b\[101m/g, css: 'ansi-bg-bright-red' },
			{ regex: /\x1b\[102m/g, css: 'ansi-bg-bright-green' },
			{ regex: /\x1b\[103m/g, css: 'ansi-bg-bright-yellow' },
			{ regex: /\x1b\[104m/g, css: 'ansi-bg-bright-blue' },
			{ regex: /\x1b\[105m/g, css: 'ansi-bg-bright-magenta' },
			{ regex: /\x1b\[106m/g, css: 'ansi-bg-bright-cyan' },
			{ regex: /\x1b\[107m/g, css: 'ansi-bg-bright-white' },

			// ANSI text formatting - \e syntax
			{ regex: /\\e\[1m/g, css: 'ansi-bold' },
			{ regex: /\\e\[2m/g, css: 'ansi-dim' },
			{ regex: /\\e\[3m/g, css: 'ansi-italic' },
			{ regex: /\\e\[4m/g, css: 'ansi-underline' },
			{ regex: /\\e\[5m/g, css: 'ansi-blink' },
			{ regex: /\\e\[7m/g, css: 'ansi-reverse' },
			{ regex: /\\e\[8m/g, css: 'ansi-hidden' },
			{ regex: /\\e\[9m/g, css: 'ansi-strikethrough' },

			// ANSI text formatting - \x1b syntax
			{ regex: /\x1b\[1m/g, css: 'ansi-bold' },
			{ regex: /\x1b\[2m/g, css: 'ansi-dim' },
			{ regex: /\x1b\[3m/g, css: 'ansi-italic' },
			{ regex: /\x1b\[4m/g, css: 'ansi-underline' },
			{ regex: /\x1b\[5m/g, css: 'ansi-blink' },
			{ regex: /\x1b\[7m/g, css: 'ansi-reverse' },
			{ regex: /\x1b\[8m/g, css: 'ansi-hidden' },
			{ regex: /\x1b\[9m/g, css: 'ansi-strikethrough' },

			// General ANSI escape sequences - \e syntax
			{ regex: /\\e\[[0-9;]*m/g, css: 'ansi-code' },
			// General ANSI escape sequences - \x1b syntax
			{ regex: /\x1b\[[0-9;]*m/g, css: 'ansi-code' }
		];
	}

	Brush.prototype = new SyntaxHighlighter.Highlighter();
	Brush.aliases = ['ansi', 'ansicodes', 'ansi-codes'];

	SyntaxHighlighter.brushes.Ansi = Brush;

	// CommonJS
	typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();