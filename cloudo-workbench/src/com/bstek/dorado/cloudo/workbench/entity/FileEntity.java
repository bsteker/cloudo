package com.bstek.dorado.cloudo.workbench.entity;

import java.util.List;

public class FileEntity {
	private String name;
	private boolean isDirectory;
	private String path;
	private String mode;
	private String md5;
	private List<FileEntity> children;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean getIsDirectory() {
		return isDirectory;
	}

	public void setDirectory(boolean isDirectory) {
		this.isDirectory = isDirectory;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getMode() {
		return mode;
	}

	public void setMode(String mode) {
		this.mode = mode;
	}

	public String getMd5() {
		return md5;
	}

	public void setMd5(String md5) {
		this.md5 = md5;
	}

	public List<FileEntity> getChildren() {
		return children;
	}

	public void setChildren(List<FileEntity> children) {
		this.children = children;
	}

}
