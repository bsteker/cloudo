package com.bstek.dorado.cloudo.djsdoc2def.jsdoc;

import java.io.File;
import java.util.Collection;
import java.util.LinkedHashSet;
import java.util.Set;

public class BuildConfiguration {

	private File docRoot;
	private Identity identity;
	private Set<String> typePaths = new LinkedHashSet<String>();
	
	public BuildConfiguration(File docRoot, Identity identity) {
		this.docRoot = docRoot;
		this.identity = identity;
		this.typePaths.add(Protocol.Default_Def_Config);
	}

	public File getDocRoot() {
		return docRoot;
	}
	public Identity getIdentity() {
		return identity;
	}
	
	public Library createLibrary() {
		return new Library(identity);
	}
	
	public void setTypePaths(Collection<String> types) {
		this.typePaths.clear();
		for (String type: types) {
			this.typePaths.add(type);
		}
	}
	public void addTypePaths(String...types) {
		for (String type: types) {
			this.typePaths.add(type);
		}
	}
	public Collection<String> getTypePaths() {
		return this.typePaths;
	}
	
}
