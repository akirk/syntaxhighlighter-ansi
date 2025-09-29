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
		// Empty regex list - let JavaScript handle all ANSI processing
		this.regexList = [];
	}

	Brush.prototype = new SyntaxHighlighter.Highlighter();
	Brush.aliases = ['ansi', 'ansicodes', 'ansi-codes'];

	SyntaxHighlighter.brushes.Ansi = Brush;

	// Post-process ANSI codes after SyntaxHighlighter is done
	if (typeof window !== 'undefined') {
		window.addEventListener('DOMContentLoaded', function() {
			// Process only ANSI syntax highlighter containers
			setTimeout(function() {
				var ansiContainers = document.querySelectorAll('.syntaxhighlighter.ansi, .syntaxhighlighter.ansicodes, .syntaxhighlighter.ansi-codes');
				for (var i = 0; i < ansiContainers.length; i++) {
					processAnsiInContainer(ansiContainers[i]);
				}
			}, 100);
		});
	}

	function processAnsiInContainer(container) {
		// Process each line div separately
		var lines = container.querySelectorAll('.line');
		for (var i = 0; i < lines.length; i++) {
			processLineDiv(lines[i]);
		}
	}

	function processLineDiv(lineDiv) {
		// Get all code elements in this line and concatenate their text
		var codeElements = lineDiv.querySelectorAll('code');
		var fullText = '';
		var textMap = [];

		for (var i = 0; i < codeElements.length; i++) {
			var elem = codeElements[i];
			var text = elem.textContent || elem.innerText || '';
			textMap.push({
				element: elem,
				startIndex: fullText.length,
				endIndex: fullText.length + text.length,
				text: text
			});
			fullText += text;
		}

		// Check if line contains ANSI codes
		if (fullText.indexOf('\\e[') === -1 && fullText.indexOf('\x1b[') === -1) {
			return;
		}

		// Process ANSI codes in the full text (including 256-color codes)
		var ansiRegex = /(\\e\[|\\x1b\[|\x1b\[)([0-9;]*)m/g;
		var result = '';
		var lastIndex = 0;
		var currentStyle = '';
		var match;

		while ((match = ansiRegex.exec(fullText)) !== null) {
			// Add text before the ANSI code
			if (match.index > lastIndex) {
				var beforeText = fullText.substring(lastIndex, match.index);
				if (currentStyle) {
					result += '<span style="' + currentStyle + '">' + escapeHtml(beforeText) + '</span>';
				} else {
					result += escapeHtml(beforeText);
				}
			}

			var ansiCode = match[2];

			// Handle reset or set new style
			if (ansiCode === '0' || ansiCode === '') {
				currentStyle = '';
			} else {
				currentStyle = getAnsiStyle(ansiCode) || '';
			}

			lastIndex = ansiRegex.lastIndex;
		}

		// Add remaining text
		if (lastIndex < fullText.length) {
			var remainingText = fullText.substring(lastIndex);
			if (currentStyle) {
				result += '<span style="' + currentStyle + '">' + escapeHtml(remainingText) + '</span>';
			} else {
				result += escapeHtml(remainingText);
			}
		}

		// Replace the line content if it changed
		if (result !== fullText) {
			// Clear existing code elements and replace with processed HTML
			lineDiv.innerHTML = lineDiv.innerHTML.replace(/<code[^>]*>.*?<\/code>/g, '');
			var codeWrapper = document.createElement('code');
			codeWrapper.className = 'ansi plain';
			codeWrapper.innerHTML = result;
			lineDiv.appendChild(codeWrapper);
		}
	}


	function getAnsiStyle(codes) {
		var parts = codes.split(';');
		var styles = [];

		for (var i = 0; i < parts.length; i++) {
			var code = parts[i];

			// Text formatting
			if (code === '1') styles.push('font-weight: bold');
			else if (code === '2') styles.push('opacity: 0.5');
			else if (code === '3') styles.push('font-style: italic');
			else if (code === '4') styles.push('text-decoration: underline');
			else if (code === '7') styles.push('filter: invert(1)');
			else if (code === '8') styles.push('visibility: hidden');
			else if (code === '9') styles.push('text-decoration: line-through');

			// Basic 8 colors (30-37, 90-97) - using light-dark() for grays
			else if (code === '30') styles.push('color: light-dark(#000000, #ffffff)');
			else if (code === '31') styles.push('color: #CC0000');
			else if (code === '32') styles.push('color: #4E9A06');
			else if (code === '33') styles.push('color: #C4A000');
			else if (code === '34') styles.push('color: #3465A4');
			else if (code === '35') styles.push('color: #75507B');
			else if (code === '36') styles.push('color: #06989A');
			else if (code === '37') styles.push('color: light-dark(#D3D7CF, #404040)');

			// Bright colors (90-97) - using light-dark() for grays
			else if (code === '90') styles.push('color: light-dark(#555753, #888888)');
			else if (code === '91') styles.push('color: #EF2929');
			else if (code === '92') styles.push('color: #8AE234');
			else if (code === '93') styles.push('color: #FCE94F');
			else if (code === '94') styles.push('color: #729FCF');
			else if (code === '95') styles.push('color: #AD7FA8');
			else if (code === '96') styles.push('color: #34E2E2');
			else if (code === '97') styles.push('color: light-dark(#EEEEEC, #202020)');

			// 256-color foreground: 38;5;n
			else if (code === '38' && i + 2 < parts.length && parts[i + 1] === '5') {
				var colorNum = parseInt(parts[i + 2]);
				styles.push('color: ' + ansi256ToHex(colorNum));
				i += 2; // Skip the next two parts
			}

			// 256-color background: 48;5;n
			else if (code === '48' && i + 2 < parts.length && parts[i + 1] === '5') {
				var colorNum = parseInt(parts[i + 2]);
				styles.push('background-color: ' + ansi256ToHex(colorNum));
				i += 2; // Skip the next two parts
			}
		}

		return styles.join('; ');
	}

	function escapeHtml(text) {
		var div = document.createElement('div');
		div.textContent = text;
		return div.innerHTML;
	}

	function ansi256ToHex(n) {
		// Standard 16 colors (0-15) - using light-dark() for grays
		if (n < 16) {
			var colors16 = [
				'light-dark(#000000, #ffffff)',  // 0: black/white
				'#800000', '#008000', '#808000', '#000080', '#800080', '#008080',
				'light-dark(#c0c0c0, #404040)', // 7: light gray
				'light-dark(#808080, #888888)', // 8: dark gray
				'#ff0000', '#00ff00', '#ffff00', '#0000ff', '#ff00ff', '#00ffff',
				'light-dark(#ffffff, #000000)'  // 15: white/black
			];
			return colors16[n];
		}

		// 216 color cube (16-231)
		if (n < 232) {
			n -= 16;
			var r = Math.floor(n / 36);
			var g = Math.floor((n % 36) / 6);
			var b = n % 6;

			var values = [0, 95, 135, 175, 215, 255];
			return 'rgb(' + values[r] + ',' + values[g] + ',' + values[b] + ')';
		}

		// Grayscale (232-255)
		var gray = 8 + (n - 232) * 10;
		return 'rgb(' + gray + ',' + gray + ',' + gray + ')';
	}

	// CommonJS
	typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();