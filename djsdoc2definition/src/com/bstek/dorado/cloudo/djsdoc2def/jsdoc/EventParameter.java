package com.bstek.dorado.cloudo.djsdoc2def.jsdoc;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;

public class EventParameter extends AbstractFnParameter {

	public EventParameter(String name) {
		super(name);
	}

	@Override
	public boolean isValidated(BuildContext context) {
		String name = this.getName();
		String type = this.type.getType();
		
		if (!context.isType(type)) return false;
		
		if ("self".equals(name) || "arg".equals(name)) {
			return true;
		}
		
		String[] names = StringUtils.split(name, '.');
		if ("arg".equals(names[0])) {
			for (int i=1; i<names.length-1; i++) {
				String n = names[i];
				if (!context.isIdentifier(n))
					return false;
			}
			return true;
		} else {
			return false;
		}
	}
	
	@Override
	public String validateMessage(BuildContext context) {
		List<String> messages = new ArrayList<String>(2);
		
		String type = this.type.getType();
		if (!context.isType(type)) {
			messages.add(type);
		}
		
		String name = this.getName();
		if (!"self".equals(name) && !"arg".equals(name)) {
			String[] names = StringUtils.split(name, '.');
			if ("arg".equals(names[0])) {
				for (int i=1; i<names.length-1; i++) {
					String n = names[i];
					if (!context.isIdentifier(n)) {
						messages.add(name);
						break;
					}
				}
			} else {
				messages.add(name);
			}
		}
		
		if (messages.size() > 0) {
			String m = StringUtils.join(messages, ',');
			return m;
		} else {
			return null;
		}
	}
}
