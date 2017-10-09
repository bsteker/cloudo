package com.bstek.dorado.cloudo.workbench.controller;

import java.util.List;

import com.bstek.dorado.annotation.DataProvider;
import com.bstek.dorado.annotation.Expose;
import com.bstek.dorado.cloudo.workbench.IDEContext;
import com.bstek.dorado.cloudo.workbench.IFileExplorer;
import com.bstek.dorado.cloudo.workbench.entity.FileEntity;

public class FileController {

	private IFileExplorer getFileExplorer() {
		return IDEContext.getFileExplorer();
	}

	@DataProvider
	public List<FileEntity> getChildren(String path) throws Exception {
		return getFileExplorer().getChildren(path);
	}

	@Expose
	public FileEntity newFile(String path, String name, String mode)
			throws Exception {
		return getFileExplorer().newFile(path, name, mode);
	}

	@Expose
	public FileEntity mkdir(String path, String name) throws Exception {
		return getFileExplorer().mkdir(path, name);
	}

	@Expose
	public void remove(String path) throws Exception {
		getFileExplorer().remove(path);
	}

	@Expose
	public boolean exists(String path, String name) throws Exception {
		return getFileExplorer().exists(path, name);
	}

	@Expose
	public void writeFile(String data, String path) throws Exception {
		getFileExplorer().writeFile(data, path);
	}

	@Expose
	public String readFile(String path) throws Exception {
		return getFileExplorer().readFile(path);
	}

}
