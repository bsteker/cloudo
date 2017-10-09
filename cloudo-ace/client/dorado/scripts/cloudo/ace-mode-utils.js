(function() {
	var Mode, buildMode, doradoModels, key, mime, modes, parseMode, root, supportedModes, value;

	root = this;

	supportedModes = {
		ABAP: ["abap"],
		ActionScript: ["as"],
		ADA: ["ada|adb"],
		Apache_Conf: ["^htaccess|^htgroups|^htpasswd|^conf|htaccess|htgroups|htpasswd"],
		AsciiDoc: ["asciidoc"],
		Assembly_x86: ["asm"],
		AutoHotKey: ["ahk"],
		BatchFile: ["bat|cmd"],
		C9Search: ["c9search_results"],
		C_Cpp: ["cpp|c|cc|cxx|h|hh|hpp"],
		Cirru: ["cirru|cr"],
		Clojure: ["clj|cljs"],
		Cobol: ["CBL|COB"],
		coffee: ["coffee|cf|cson|^Cakefile"],
		ColdFusion: ["cfm"],
		CSharp: ["cs"],
		CSS: ["css"],
		Curly: ["curly"],
		D: ["d|di"],
		Dart: ["dart"],
		Diff: ["diff|patch"],
		Dockerfile: ["^Dockerfile"],
		Dot: ["dot"],
		Dummy: ["dummy"],
		DummySyntax: ["dummy"],
		Eiffel: ["e"],
		EJS: ["ejs"],
		Elixir: ["ex|exs"],
		Elm: ["elm"],
		Erlang: ["erl|hrl"],
		Forth: ["frt|fs|ldr"],
		FTL: ["ftl"],
		Gcode: ["gcode"],
		Gherkin: ["feature"],
		Gitignore: ["^.gitignore"],
		Glsl: ["glsl|frag|vert"],
		golang: ["go"],
		Groovy: ["groovy"],
		HAML: ["haml"],
		Handlebars: ["hbs|handlebars|tpl|mustache"],
		Haskell: ["hs"],
		haXe: ["hx"],
		HTML: ["html|htm|xhtml"],
		HTML_Ruby: ["erb|rhtml|html.erb"],
		INI: ["ini|conf|cfg|prefs"],
		Io: ["io"],
		Jack: ["jack"],
		Jade: ["jade"],
		Java: ["java"],
		JavaScript: ["js|jsm"],
		JSON: ["json"],
		JSONiq: ["jq"],
		JSP: ["jsp"],
		JSX: ["jsx"],
		Julia: ["jl"],
		LaTeX: ["tex|latex|ltx|bib"],
		LESS: ["less"],
		Liquid: ["liquid"],
		Lisp: ["lisp"],
		LiveScript: ["ls"],
		LogiQL: ["logic|lql"],
		LSL: ["lsl"],
		Lua: ["lua"],
		LuaPage: ["lp"],
		Lucene: ["lucene"],
		Makefile: ["^Makefile|^GNUmakefile|^makefile|^OCamlMakefile|make"],
		Markdown: ["md|markdown"],
		MATLAB: ["matlab"],
		MEL: ["mel"],
		MUSHCode: ["mc|mush"],
		MySQL: ["mysql"],
		Nix: ["nix"],
		ObjectiveC: ["m|mm"],
		OCaml: ["ml|mli"],
		Pascal: ["pas|p"],
		Perl: ["pl|pm"],
		pgSQL: ["pgsql"],
		PHP: ["php|phtml"],
		Powershell: ["ps1"],
		Praat: ["praat|praatscript|psc|proc"],
		Prolog: ["plg|prolog"],
		Properties: ["properties"],
		Protobuf: ["proto"],
		Python: ["py"],
		R: ["r"],
		RDoc: ["Rd"],
		RHTML: ["Rhtml"],
		Ruby: ["rb|ru|gemspec|rake|^Guardfile|^Rakefile|^Gemfile"],
		Rust: ["rs"],
		SASS: ["sass"],
		SCAD: ["scad"],
		Scala: ["scala"],
		Scheme: ["scm|rkt"],
		SCSS: ["scss"],
		SH: ["sh|bash|^.bashrc"],
		SJS: ["sjs"],
		Smarty: ["smarty|tpl"],
		snippets: ["snippets"],
		Soy_Template: ["soy"],
		Space: ["space"],
		SQL: ["sql"],
		Stylus: ["styl|stylus"],
		SVG: ["svg"],
		Tcl: ["tcl"],
		Tex: ["tex"],
		Text: ["txt"],
		Textile: ["textile"],
		Toml: ["toml"],
		Twig: ["twig"],
		Typescript: ["ts|typescript|str"],
		Vala: ["vala"],
		VBScript: ["vbs|vb"],
		Velocity: ["vm"],
		Verilog: ["v|vh|sv|svh"],
		VHDL: ["vhd|vhdl"],
		XML: ["xml|rdf|rss|wsdl|xslt|atom|mathml|mml|xul|xbl"],
		XQuery: ["xq"],
		YAML: ["yaml|yml"],
		Dorado_View: ["view.xml"],
		Dorado_Touch: ["touch.xml"],
		Dorado_Model: ["model.xml"]
	};

	modes = [];

	doradoModels = ["dorado_view", "dorado_touch", "dorado_model"];

	Mode = (function() {
		function Mode(mode, extensions) {
			var re;
			this.extensions = extensions;
			this.name = mode.toLowerCase();
			if (/\^/.test(extensions)) {
				re = extensions.replace(/\|(\^)?/g, function(a, b) {
					return "$|" + (b ? "^" : "^.*\\.");
				}) + "$";
			} else if (/view.xml|touch.xml|model.xml/.test(extensions)) {
				re = "^.*\\.(" + extensions + ")$";
				this.isDorado = true;
			} else {
				re = "^.*\\.(" + extensions + ")$";
			}
			this.extRe = new RegExp(re, "gi");
		}

		Mode.prototype.supportsFile = function(fileName) {
			return fileName.match(this.extRe);
		};

		return Mode;

	})();

	buildMode = function(name, extensions) {
		var mode;
		mode = new Mode(name, extensions);
		if (mode.isDorado) {
			modes.unshift(mode);
		} else {
			modes.push(mode);
		}
		return mode;
	};

	for (key in supportedModes) {
		value = supportedModes[key];
		buildMode(key, value[0]);
	}

	parseMode = function(filePath) {
		var fileMode, fileName, mode, _i, _len;
		fileName = filePath.split(/[\/\\]/).pop();
		for (_i = 0, _len = modes.length; _i < _len; _i++) {
			mode = modes[_i];
			if (mode.supportsFile(fileName)) {
				fileMode = mode;
				break;
			}
		}
		if (fileMode) {
			return fileMode.name;
		}
	};

	mime = {
		parseMode: parseMode,
		doradoModels: doradoModels
	};

	if ((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) {
		module.exports = mime;
	} else {
		root.$Mime = mime;
	}

}).call(this);
