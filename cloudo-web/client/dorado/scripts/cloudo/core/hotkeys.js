(function () {
	var hotkeys = {
		specialKeys: {
			8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
			20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
			37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del",
			96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
			104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111: "/",
			112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8",
			120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 188: ",", 190: ".",
			191: "/", 224: "meta"
		},
		shiftNums: {
			"`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&",
			"8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ": ", "'": "\"", ",": "<",
			".": ">", "/": "?", "\\": "|"
		}
	};


	$(window.document).keydown(function (event) {
		var processDefault = true, keyCode = event.keyCode;

		if (processDefault && (event.ctrlKey || event.metaKey)) {
			switch (keyCode) {
				case 83:  // Ctrl+S
					var winEditor = window.editor;
					if (winEditor && winEditor.save) {
						winEditor.save()
					} else {
						cloudo.portal.save();
					}
					processDefault = false;
					break;
				case 90:    // Ctrl+Z
					cloudo.commandExecutor.undo();
					processDefault = false;
					break;
				case 89:     // Ctrl+Y
					cloudo.commandExecutor.redo();
					processDefault = false;
					break;
				default :
					processDefault = true;
					break;
			}
		}

		return processDefault;
	});


})();