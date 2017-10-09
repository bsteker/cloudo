package com.bstek.dorado.cloudo;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public final class Logs {

	private static final String rootName = "dorado.cloudo";
	
	public static final Log ROOT = LogFactory.getLog(rootName);
	
	public static final Log SERVICE = LogFactory.getLog(rootName + ".service");
}
