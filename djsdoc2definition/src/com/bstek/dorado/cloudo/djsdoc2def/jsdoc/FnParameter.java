package com.bstek.dorado.cloudo.djsdoc2def.jsdoc;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;

public class FnParameter extends AbstractFnParameter {
	private boolean optional = false;
	
	public FnParameter(String name) {
		super(name);
	}

	//是否是可选的
	public boolean isOptional() {
		return optional;
	}
	public void setOptional(boolean optional) {
		this.optional = optional;
	}
	
	public String toDefinitionExprission() {
		StringBuilder b = new StringBuilder();
		b.append(this.getName());
		if (this.isOptional()) {
			b.append("?");
		}
		b.append(": ");
		b.append(type.toDefinitionExprission());
		
		return b.toString();
	}
	
	@Override
	public boolean isValidated(BuildContext context) {
		String name = this.getName();
		String type = this.type.getType();
		
		return context.isIdentifier(name) && context.isType(type);
	}
	
	@Override
	public String validateMessage(BuildContext context) {
		String name = this.getName();
		String type = this.type.getType();
		
		List<String> messages = new ArrayList<String>(2);
		if (!context.isIdentifier(name)) {
			messages.add(name);
		}
		if (!context.isType(type)) {
			messages.add(type);
		}
		
		if (messages.size() > 0) {
			String m = StringUtils.join(messages, ';');
			return m;
		} else {
			return null;
		}
	}
}
