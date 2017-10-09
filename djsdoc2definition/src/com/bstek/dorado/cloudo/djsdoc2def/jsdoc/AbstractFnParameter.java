package com.bstek.dorado.cloudo.djsdoc2def.jsdoc;

import org.apache.commons.lang.StringUtils;

public abstract class AbstractFnParameter extends Atom {
	private String name;
	private String defaultValue;
	protected Type type;
	
	public AbstractFnParameter(String name) {
		super();
		String[] tokens = StringUtils.split(name, '=');
		if (tokens.length == 2) {
			this.name = tokens[0].trim();
			this.defaultValue = tokens[1].trim();
		} else {
			this.name = name;
		}
		this.setType(Types.Object);
	}
	
	//参数名称
	public String getName() {
		return name;
	}
	
	public String getDefaultValue() {
		return defaultValue;
	}
	public void setDefaultValue(String defaultValue) {
		this.defaultValue = defaultValue;
	}

	public void setType(Type type) {
		this.type = type;
		String t = type.toDefinitionExprission();
		this.setType(t);
	}

}
