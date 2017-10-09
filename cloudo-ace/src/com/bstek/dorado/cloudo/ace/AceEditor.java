package com.bstek.dorado.cloudo.ace;

import com.bstek.dorado.annotation.ClientEvent;
import com.bstek.dorado.annotation.ClientEvents;
import com.bstek.dorado.annotation.ClientObject;
import com.bstek.dorado.annotation.ClientProperty;
import com.bstek.dorado.annotation.IdeProperty;
import com.bstek.dorado.annotation.XmlNode;
import com.bstek.dorado.common.ClientType;
import com.bstek.dorado.view.annotation.Widget;
import com.bstek.dorado.view.widget.Control;

/**
 * 源代码编辑器
 * 
 * @author AlexTong(mailto:alex.tong@bstek.com)
 * 
 */
@Widget(name = "AceEditor", category = "Advance", dependsPackage = "dorado-ace-editor")
@XmlNode(clientTypes = { ClientType.DESKTOP })
@ClientObject(prototype = "dorado.widget.AceEditor", shortTypeName = "AceEditor")
@ClientEvents({ @ClientEvent(name = "onChange") })
public class AceEditor extends Control{
	/**
	 * 编辑器内容
	 */
	private String value;
	/**
	 * 源码语言
	 */
	private String mode;

	/**
	 * 主题
	 */
	private String theme = "cloudo";

	/**
	 * Tab键缩进长度
	 */
	private int tabSize = 4;

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	@IdeProperty(enumValues = "c,cpp,csharp,java,scala,javascript,json,clojure,"
			+ "coffeescript,css,diff,ecl,erlang,groovy,go,less,markdown,mysql,"
			+ "properties,python,ruby,shell,velocity,xml,html,xquery,yaml,"
			+ "pascal,perl,plsql")
	public String getMode() {
		return mode;
	}

	public void setMode(String mode) {
		this.mode = mode;
	}

	@ClientProperty(escapeValue = "default")
	public String getTheme() {
		return theme;
	}

	public void setTheme(String theme) {
		this.theme = theme;
	}


	@ClientProperty(escapeValue = "4")
	public int getTabSize() {
		return tabSize;
	}

	public void setTabSize(int tabSize) {
		this.tabSize = tabSize;
	}

	

}
