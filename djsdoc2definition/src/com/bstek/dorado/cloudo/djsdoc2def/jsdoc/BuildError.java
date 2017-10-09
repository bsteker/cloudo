package com.bstek.dorado.cloudo.djsdoc2def.jsdoc;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class BuildError {
	private final Log logger = LogFactory.getLog(BuildContext.class);
	
	Map<String, Type> unknownTypes = new HashMap<String, Type>();
	Map<String, String> unknownRes = new HashMap<String, String>();
	Set<String> unFnMethodReturn = new LinkedHashSet<String>();
	Map<String,Atom> unsuitableAtoms = new LinkedHashMap<String,Atom>();
	
	private BuildContext context;
	
	public BuildError(BuildContext context) {
		this.context = context;
	}
	
	public void output() {
		String errorMessage = this.build();
		if (errorMessage != null) {
			logger.error("=========== Log Start ===========\n" + errorMessage);
			logger.error("=========== Log End ===========");
		}
	}
	
	public String build() {
		List<String> messages = new ArrayList<String>();
		if (!unknownTypes.isEmpty()) {
			for (String type: unknownTypes.keySet()) {
				messages.add("=~> [" + type + "] = unknown javascript type");
			}
		} 
		
		if (!unknownRes.isEmpty()) {
			for (String realFilePath: unknownRes.values()) {
				messages.add("-=> ["+realFilePath+"] resource not exists '");
			}
		}
		
		if(!unsuitableAtoms.isEmpty()) {
			Set<String> keys = unsuitableAtoms.keySet();
			for (String key: keys) {
				Atom atom = unsuitableAtoms.get(key);
				String message = atom.validateMessage(context);
				messages.add("~~> ["+key + "] = " + message);
			}
		}
		
		if (!messages.isEmpty())
			return StringUtils.join(messages, '\n');
		else 
			return null;
	}
}
