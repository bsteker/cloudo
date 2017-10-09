window.beautify = function (editor, detectedMode) {
	var sel = editor.selection;
	var session = editor.session;
	var range = sel.getRange();
	var options = {};
	options.space_before_conditional = true;
	options.keep_array_indentation = false;
	options.preserve_newlines = true;
	options.unescape_strings = true;
	options.jslint_happy = false;
	options.brace_style = "end-expand";

	if (session.getUseSoftTabs()) {
		options.indent_char = " ";
		options.indent_size = session.getTabSize();
	} else {
		options.indent_char = "\t";
		options.indent_size = 1;
	}

	var line = session.getLine(range.start.row);
	var indent = line.match(/^\s*/)[0];
	var trim = false;

	if (range.start.column < indent.length)
		range.start.column = 0;
	else
		trim = true;


	var value = session.getTextRange(range);

	var type = null;

	if (detectedMode == "javascript"||detectedMode=="java") {
		type = "js";
	} else if (detectedMode == "css") {
		type = "css";
	}
	if (/^\s*<!?\w/.test(value)) {
		type = "html";
	} else if (detectedMode == "xml") {
		type = "html";
	} else if (detectedMode == "html") {
		if (/[^<]+?\{[\s\-\w]+:[^}]+;/.test(value))
			type = "css";
		else if (/<\w+[ \/>]/.test(value))
			type = "html";
		else
			type = "js";
	}

	try {
		value = window[type + "_beautify"](value, options);
		if (trim)
			value = value.replace(/^/gm, indent).trim();
		if (range.end.column === 0)
			value += "\n" + indent;
	}
	catch (e) {
		var message = "编辑器尚未支持，美化" + detectedMode + "代码！";
		dorado ? dorado.widget.NotifyTipManager.notify(message) : window.alert(message);
		return;
	}
	var Range = ace.require("ace/range").Range;
	var end = session.replace(range, value);
	sel.setSelectionRange(Range.fromPoints(range.start, end));

};