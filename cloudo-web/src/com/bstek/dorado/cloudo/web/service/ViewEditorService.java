package com.bstek.dorado.cloudo.web.service;

import com.bstek.dorado.annotation.Expose;
import com.bstek.dorado.cloudo.web.CloudoContext;

public class ViewEditorService {

	@Expose
	public void save(String json, String url) throws Exception {
		CloudoContext.getViewBooker().write(url, json);
	}
}
