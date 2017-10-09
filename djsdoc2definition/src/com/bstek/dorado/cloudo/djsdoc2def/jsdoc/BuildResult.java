package com.bstek.dorado.cloudo.djsdoc2def.jsdoc;


public class BuildResult {

	private BuildError error;
	private Library library;
	
	public BuildResult(Library library, BuildError error) {
		this.library = library;
		this.error = error;
	}
	
	public BuildError getError() {
		return error;
	}
	
	public Library getLibrary() {
		return library;
	}
}
