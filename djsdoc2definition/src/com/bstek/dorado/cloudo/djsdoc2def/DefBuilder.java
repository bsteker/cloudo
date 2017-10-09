package com.bstek.dorado.cloudo.djsdoc2def;

import java.io.File;

import com.bstek.dorado.cloudo.djsdoc2def.jsdoc.BuildConfiguration;
import com.bstek.dorado.cloudo.djsdoc2def.jsdoc.BuildResult;
import com.bstek.dorado.cloudo.djsdoc2def.jsdoc.IAtom;
import com.bstek.dorado.cloudo.djsdoc2def.jsdoc.Identity;
import com.bstek.dorado.cloudo.djsdoc2def.jsdoc.JSDocBuilder;
import com.bstek.dorado.cloudo.djsdoc2def.output.OutputContext;

public class DefBuilder {

	public static BuildResult build(File root, Identity libraryID) throws Exception {
		BuildConfiguration configuration = new BuildConfiguration(root, libraryID);
		BuildResult result = build(configuration);
		return result;
	}
	
	public static BuildResult build(BuildConfiguration configuration) throws Exception {
		JSDocBuilder builder = new JSDocBuilder(configuration);
		BuildResult result = builder.build();
		return result;
	}
	
	public static String toString(IAtom atom) {
		OutputContext outputContext = new OutputContext();
		atom.output(outputContext);
		String json =  outputContext.getOutputString();
		return json;
	}
}
