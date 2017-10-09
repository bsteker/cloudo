package com.bstek.dorado.cloudo.web.service;

import com.bstek.dorado.vidorsupport.iapi.IViewReader;
import com.bstek.dorado.vidorsupport.iapi.IViewWriter;

public abstract class AbstractViewBooker implements IViewBooker {
	private IViewReader viewReader;
	private IViewWriter viewWriter;
	public void setViewReader(IViewReader viewReader) {
		this.viewReader = viewReader;
	}
	public void setViewWriter(IViewWriter viewWriter) {
		this.viewWriter = viewWriter;
	}
	public IViewReader getViewReader() {
		return viewReader;
	}
	public IViewWriter getViewWriter() {
		return viewWriter;
	}
}
