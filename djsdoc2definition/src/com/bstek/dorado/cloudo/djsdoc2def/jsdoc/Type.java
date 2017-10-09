package com.bstek.dorado.cloudo.djsdoc2def.jsdoc;

public class Type {
	private boolean array = false;
	private boolean instance = false;
	private String type;
	
	protected Type(Type type) {
		this(type.getType());
		
		this.array = type.array;
		this.instance = type.instance;
	}
	
	protected Type(String type) {
		super();
		this.setType(type);
	}
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}

	public boolean isArray() {
		return array;
	}
	public Type setArray(boolean array) {
		this.array = array;
		return this;
	}
	
	public boolean isInstance() {
		return instance;
	}
	public Type setInstance(boolean instance) {
		this.instance = instance;
		return this;
	}
	
	public String toDefinitionExprission() {
		StringBuilder b = new StringBuilder();
		if (array)
			b.append('[');
		if (instance)
			b.append('+');
		b.append(getType());
		if (array)
			b.append(']');
		return b.toString();
	}
	
	public boolean accept(String type) {
		return this.getType().equalsIgnoreCase(type);
	}
}
