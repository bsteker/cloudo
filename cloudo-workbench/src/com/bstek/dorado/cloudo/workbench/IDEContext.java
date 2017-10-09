package com.bstek.dorado.cloudo.workbench;


public class IDEContext {
	private static IFileExplorer fileExplorer;
	
	public static IFileExplorer getFileExplorer() {
		return fileExplorer;
	}

	public static void setFileExplorer(IFileExplorer fileController) {
		IDEContext.fileExplorer = fileController;
	}

}
