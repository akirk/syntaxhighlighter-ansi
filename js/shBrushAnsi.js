/**
 * SyntaxHighlighter ANSI Brush
 * Simple approach: just mark ANSI codes as invisible and let CSS handle the rest
 */
;(function()
{
	// CommonJS
	SyntaxHighlighter = SyntaxHighlighter || (typeof require !== 'undefined'? require('shCore').SyntaxHighlighter : null);

	function Brush()
	{
		this.regexList = [
			// Mark all ANSI escape sequences for hiding
			{ regex: /(\\e\[|\\x1b\[|\x1b\[)([0-9;]*)m/g, css: 'ansi-hide' }
		];
	}

	Brush.prototype = new SyntaxHighlighter.Highlighter();
	Brush.aliases = ['ansi', 'ansicodes', 'ansi-codes'];

	SyntaxHighlighter.brushes.Ansi = Brush;

	// Post-process ANSI codes after SyntaxHighlighter is done
	if (typeof window !== 'undefined') {
		window.addEventListener('DOMContentLoaded', function() {
			// Process all syntax highlighter containers
			setTimeout(function() {
				var containers = document.querySelectorAll('.syntaxhighlighter');
				for (var i = 0; i < containers.length; i++) {
					processAnsiInContainer(containers[i]);
				}
			}, 100);
		});
	}

	function processAnsiInContainer(container) {
		// Find all text nodes and process ANSI codes
		var walker = document.createTreeWalker(
			container,
			NodeFilter.SHOW_TEXT,
			null,
			false
		);

		var textNodes = [];
		var node;
		while (node = walker.nextNode()) {
			if (node.nodeValue && (node.nodeValue.indexOf('\\e[') !== -1 || node.nodeValue.indexOf('\x1b[') !== -1)) {
				textNodes.push(node);
			}
		}

		// Process each text node
		for (var i = 0; i < textNodes.length; i++) {
			processTextNode(textNodes[i]);
		}
	}

	function processTextNode(textNode) {
		var text = textNode.nodeValue;
		var ansiRegex = /(\\e\[|\\x1b\[|\x1b\[)([0-9;]*)m/g;
		var parent = textNode.parentNode;
		var fragment = document.createDocumentFragment();
		var lastIndex = 0;
		var currentSpan = null;
		var match;

		while ((match = ansiRegex.exec(text)) !== null) {
			// Add text before the ANSI code
			if (match.index > lastIndex) {
				var beforeText = text.substring(lastIndex, match.index);
				if (currentSpan) {
					currentSpan.appendChild(document.createTextNode(beforeText));
				} else {
					fragment.appendChild(document.createTextNode(beforeText));
				}
			}

			var ansiCode = match[2];

			// Handle reset or close existing span
			if (ansiCode === '0' || ansiCode === '') {
				if (currentSpan) {
					fragment.appendChild(currentSpan);
					currentSpan = null;
				}
			} else {
				// Close existing span if open
				if (currentSpan) {
					fragment.appendChild(currentSpan);
				}

				// Create new span with appropriate class
				var cssClass = getAnsiClass(ansiCode);
				if (cssClass) {
					currentSpan = document.createElement('span');
					currentSpan.className = cssClass;
				} else {
					currentSpan = null;
				}
			}

			lastIndex = ansiRegex.lastIndex;
		}

		// Add remaining text
		if (lastIndex < text.length) {
			var remainingText = text.substring(lastIndex);
			if (currentSpan) {
				currentSpan.appendChild(document.createTextNode(remainingText));
			} else {
				fragment.appendChild(document.createTextNode(remainingText));
			}
		}

		// Close any remaining open span
		if (currentSpan) {
			fragment.appendChild(currentSpan);
		}

		// Replace the text node with the fragment
		parent.replaceChild(fragment, textNode);
	}

	function getAnsiClass(code) {
		var ansiMap = {
			'1': 'ansi-bold',
			'2': 'ansi-dim',
			'3': 'ansi-italic',
			'4': 'ansi-underline',
			'5': 'ansi-blink',
			'7': 'ansi-reverse',
			'8': 'ansi-hidden',
			'9': 'ansi-strikethrough',
			'30': 'ansi-fg-black',
			'31': 'ansi-fg-red',
			'32': 'ansi-fg-green',
			'33': 'ansi-fg-yellow',
			'34': 'ansi-fg-blue',
			'35': 'ansi-fg-magenta',
			'36': 'ansi-fg-cyan',
			'37': 'ansi-fg-white',
			'90': 'ansi-fg-bright-black',
			'91': 'ansi-fg-bright-red',
			'92': 'ansi-fg-bright-green',
			'93': 'ansi-fg-bright-yellow',
			'94': 'ansi-fg-bright-blue',
			'95': 'ansi-fg-bright-magenta',
			'96': 'ansi-fg-bright-cyan',
			'97': 'ansi-fg-bright-white',
			'40': 'ansi-bg-black',
			'41': 'ansi-bg-red',
			'42': 'ansi-bg-green',
			'43': 'ansi-bg-yellow',
			'44': 'ansi-bg-blue',
			'45': 'ansi-bg-magenta',
			'46': 'ansi-bg-cyan',
			'47': 'ansi-bg-white',
			'100': 'ansi-bg-bright-black',
			'101': 'ansi-bg-bright-red',
			'102': 'ansi-bg-bright-green',
			'103': 'ansi-bg-bright-yellow',
			'104': 'ansi-bg-bright-blue',
			'105': 'ansi-bg-bright-magenta',
			'106': 'ansi-bg-bright-cyan',
			'107': 'ansi-bg-bright-white'
		};

		return ansiMap[code] || null;
	}

	// CommonJS
	typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();