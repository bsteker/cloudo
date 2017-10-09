/** @Controller */
var offsetLeft = 40;

var logoHeight = 50;
// @Bind view.onCreate
!function(self, arg) {
	var isApple=/(Mac)/.test(navigator.platform);
	var groups = [
			{
				name : '节点操作',
				doms : '<div class="shortcut-group"><span class="shortcut"><span class="shortcut-key esc" title="Esc">Esc</span></span><span class="description">导航到父节点</span></div><div class="shortcut-group"><span class="shortcut"><span class="shortcut-key delete" title="Delete">Delete</span></span><span class="description">删除节点</span></div><div class="shortcut-group"><span class="shortcut"><span class="shortcut-key ctrl" title="Ctrl">Ctrl</span> + <span class="shortcut-key up" title="Up">Up</span>, <span class="shortcut-key down" title="Down">Down</span></span><span class="description">向上/向下调整顺序</span></div><div class="shortcut-group"><span class="shortcut"><span class="shortcut-key enter" title="Enter">Enter</span></span><span class="description">展开/收起节点</span></div><div class="shortcut-group"><span class="shortcut"><span class="shortcut-key ctrl" title="Ctrl">Ctrl</span> + <span class="shortcut-key c" title="C">C</span></span><span class="description">复制节点</span></div><div class="shortcut-group"><span class="shortcut"><span class="shortcut-key ctrl" title="Ctrl">Ctrl</span> + <span class="shortcut-key x" title="X">X</span></span><span class="description">剪切节点</span></div><div class="shortcut-group"><span class="shortcut"><span class="shortcut-key ctrl" title="Ctrl">Ctrl</span> + <span class="shortcut-key v" title="V">V</span></span><span class="description">粘贴节点</span></div><div class="shortcut-group"><span class="shortcut"><span class="shortcut-key ctrl" title="Ctrl">Ctrl</span> + <span class="shortcut-key f" title="F">F</span></span><span class="description">查找节点</span></div><div class="shortcut-group"><span class="shortcut"><span class="shortcut-key ctrl" title="Ctrl">Ctrl</span> + <span class="shortcut-key 左键" title="左键">左键</span></span><span class="description">多选节点</span></div><div class="shortcut-group"><span class="shortcut"><span class="shortcut-key shift" title="Shift">Shift</span> + <span class="shortcut-key 左键" title="左键">左键</span></span><span class="description">多选连续节点</span></div>'
			},
			{
				name : '文件操作',
				doms : '<div class="shortcut-group"><span class="shortcut"><span class="shortcut-key ctrl" title="Ctrl">Ctrl</span> + <span class="shortcut-key alt" title="Alt">Alt</span> + <span class="shortcut-key n" title="N">N</span></span><span class="description">新建</span></div><div class="shortcut-group"><span class="shortcut"><span class="shortcut-key ctrl" title="Ctrl">Ctrl</span> + <span class="shortcut-key s" title="S">S</span></span><span class="description">保存</span></div>'
			},
			{
				name : '通用',
				doms : '<div class="shortcut-group"><span class="shortcut"><span class="shortcut-key ctrl" title="Ctrl">Ctrl</span> + <span class="shortcut-key z" title="Z">Z</span></span><span class="description">撤销</span></div><div class="shortcut-group"><span class="shortcut"><span class="shortcut-key ctrl" title="Ctrl">Ctrl</span> + <span class="shortcut-key y" title="Y">Y</span></span><span class="description">重做</span></div><div class="shortcut-group"><span class="shortcut"><span class="shortcut-key ctrl" title="Ctrl">Ctrl</span> + <span class="shortcut-key +" title="+">+</span>, <span class="shortcut-key -" title="-">-</span></span><span class="description">放大/缩小字体</span></div><div class="shortcut-group"><span class="shortcut"><span class="shortcut-key ctrl" title="Ctrl">Ctrl</span> + <span class="shortcut-key f" title="F">F</span></span><span class="description">查找</span></div><div class="shortcut-group"><span class="shortcut"><span class="shortcut-key ctrl" title="Ctrl">Ctrl</span> + <span class="shortcut-key r" title="R">R</span></span><span class="description">替换</span></div><div class="shortcut-group"><span class="shortcut"><span class="shortcut-key ctrl" title="Ctrl">Ctrl</span> + <span class="shortcut-key shift" title="Shift">Shift</span> + <span class="shortcut-key f" title="F">F</span></span><span class="description">格式化</span></div>'
			} ];

	self.addChild(new dorado.widget.Container({
		layout : {
			regionPadding : 10
		},
		width : 300,
		children : [ buildGroupBox(_.findWhere(groups, {
			name : '节点操作'
		})) ]
	}));
	var children = [];
	

	_.each(groups, function(group) {
		group.name !== '节点操作' && children.push(buildGroupBox(group));
	});
	self.addChild(new dorado.widget.Container({
		width : 300,
		layout : {
			regionPadding : 10
		},
		children : children
	}));

	
	function buildGroupBox(group) {
		return new dorado.widget.GroupBox({
			collapseable : false,
			caption : group.name,
			children : [ {
				$type : "HtmlContainer",
				contentOverflowX : "hidden",
				content : isApple ? group.doms.replace(
						/shortcut-group/g, "shortcut-group mac") : group.doms
			} ]
		});
	}
}