package com.bstek.dorado.cloudo.djsdoc2def.jsdoc;


public class Alias {

	private String owner;
	private String type;
	private String name;
	
	public static Alias parse(String expr) {
		Alias alias = new Alias();
		
		int i = expr.indexOf('#');
		if (i > 0) {
			alias.owner = expr.substring(0, i);
			expr = expr.substring(i+1);
			
			i = expr.indexOf(':');
			if (i > 0) {
				alias.type = expr.substring(0, i);
				alias.name = expr.substring(i + 1);
			} else {
				alias.name = expr;
			}
		} else {
			alias.name = expr;
		}
		
		return alias;
	}
	
	public Alias(){}

	public String getOwner() {
		return owner;
	}
	public void setOwner(String owner) {
		this.owner = owner;
	}

	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	@Override
	public String toString(){
		StringBuilder s = new StringBuilder();
		s.append(owner).append('#');
		
		if (type != null) {
			s.append(type).append(':');
		} 
		
		s.append(name);
		return s.toString();
	}
}
