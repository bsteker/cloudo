package com.bstek.dorado.cloudo.djsdoc2def.jsdoc;

import org.apache.commons.lang.StringUtils;

import com.bstek.dorado.cloudo.djsdoc2def.exception.IllegalValueException;

public class Identity {
	private String name;
	private String group;
	private String version;
	
	public static Identity create(String group, String name) {
		if (StringUtils.isEmpty(group)) {
			throw new IllegalValueException("group", group);
		}
		if (StringUtils.isEmpty(name)) {
			throw new IllegalValueException("name", name);
		}
		return new Identity(group, name);
	}
	
	private Identity(String group, String name) {
		this.group = group;
		this.name = name;
	}
	
	public String getName() {
		return name;
	}

	public String getGroup() {
		return group;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}
}
