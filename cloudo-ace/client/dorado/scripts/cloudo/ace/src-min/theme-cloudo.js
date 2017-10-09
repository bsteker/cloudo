define("ace/theme/cloudo",["require","exports","module","ace/lib/dom"],function(e,t,n){t.isDark=!0,t.cssClass="ace-cloudo",t.cssText=".ace-cloudo .ace_gutter {background-color: #3f4454;border-right: 1px solid #4d4d4d;text-shadow: 0px 1px 1px #4d4d4d;color: #eae4d9;}.ace-cloudo .ace_gutter-layer {background: repeat left top;}.ace-cloudo .ace_gutter-active-line {background-color: #3F3F3F;}.ace-cloudo .ace_fold-widget {text-align: center;}.ace-cloudo .ace_fold-widget:hover {color: #777;}.ace-cloudo .ace_fold-widget.ace_start,.ace-cloudo .ace_fold-widget.ace_end,.ace-cloudo .ace_fold-widget.ace_closed {background: none;border: none;box-shadow: none;}.ace-cloudo .ace_fold-widget.ace_start:after {content: '\u25be'}.ace-cloudo .ace_fold-widget.ace_end:after {content: '\u25b4'}.ace-cloudo .ace_fold-widget.ace_closed:after {content: '\u2023'}.ace-cloudo .ace_print-margin {right: 0;}.ace-cloudo .ace_scroller {}.ace-cloudo {color: #E6E1DC;background-color: #313341;}.ace-cloudo .ace_cursor {border-left: 1px solid #7991E8;}.ace-cloudo .ace_overwrite-cursors .ace_cursor {border: 1px solid #FFE300;background: #766B13;}.ace-cloudo.normal-mode .ace_cursor-layer {z-index: 0;}.ace-cloudo .ace_marker-layer .ace_selection {background: rgba(221, 240, 255, 0.20);}.ace-cloudo .ace_marker-layer .ace_selected-word {border-radius: 4px;border: 8px solid #3f475d;box-shadow: 0 0 4px #5e0f18;}.ace-cloudo .ace_marker-layer .ace_step {background: rgb(198, 219, 174);}.ace-cloudo .ace_marker-layer .ace_bracket {margin: -1px 0 0 -1px;border: 1px solid rgba(255, 255, 255, 0.25);}.ace-cloudo .ace_marker-layer .ace_active-line {background: rgba(255, 255, 255, 0.031);}.ace-cloudo .ace_invisible {color: #333;}.ace-cloudo .ace_paren {color: #24C2C7;}.ace-cloudo .ace_keyword {color: #cda869;}.ace-cloudo .ace_keyword.ace_operator {color: #fa8d6a;}.ace-cloudo .ace_punctuation.ace_operator {color: #fa8d6a;}.ace-cloudo .ace_identifier {}.ace-cloudo .ace-statement {color: #cda869;}.ace-cloudo .ace_constant {color: #CF7EA9;}.ace-cloudo .ace_constant.ace_language {color: #CF7EA9;}.ace-cloudo .ace_constant.ace_library {}.ace-cloudo .ace_constant.ace_numeric {color: #78CF8A;}.ace-cloudo .ace_invalid {text-decoration: underline;}.ace-cloudo .ace_invalid.ace_illegal {color: #F8F8F8;background-color: rgba(86, 45, 86, 0.75);}.ace-cloudo .ace_invalid,.ace-cloudo .ace_deprecated {text-decoration: underline;font-style: italic;color: #D2A8A1;}.ace-cloudo .ace_support {color: #9B859D;}.ace-cloudo .ace_support.ace_function {color: #DAD085;}.ace-cloudo .ace_function.ace_buildin {color: #9b859d;}.ace-cloudo .ace_string {color: #8f9d6a;}.ace-cloudo .ace_string.ace_regexp {color: #DAD085;}.ace-cloudo .ace_comment {font-style: italic;color: #555;}.ace-cloudo .ace_comment.ace_doc {}.ace-cloudo .ace_comment.ace_doc.ace_tag {color: #666;font-style: normal;}.ace-cloudo .ace_definition,.ace-cloudo .ace_type {color: #aac6e3;}.ace-cloudo .ace_variable {color: #9999cc;}.ace-cloudo .ace_variable.ace_language {color: #9b859d;}.ace-cloudo .ace_xml-pe {color: #494949;}.ace-cloudo .ace_gutter-layer,.ace-cloudo .ace_text-layer {}.ace-cloudo .ace_indent-guide {}";var r=e("../lib/dom");r.importCssString(t.cssText,t.cssClass)})