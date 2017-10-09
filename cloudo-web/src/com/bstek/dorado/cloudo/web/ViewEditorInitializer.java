package com.bstek.dorado.cloudo.web;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.bstek.dorado.core.Configure;
import com.bstek.dorado.web.DoradoContext;

public class ViewEditorInitializer extends AbstractViewEditorInitializer {
	private static final Log logger = LogFactory
			.getLog(ViewEditorInitializer.class);

	protected Map<String, Object> buildInitData() throws Exception {
		HttpServletRequest request = DoradoContext.getAttachedRequest();
		String viewPath = Configure.getString("dorado.cloudo.viewRoot", "")
				+ request.getParameter("path");
		
		logger.debug(viewPath);
		
		viewPath = StringUtils.replace(viewPath, "file:", "");
		String viewJson = CloudoContext.getViewBooker().read(viewPath);
		String viewName = this.parseFileName(viewPath);

		return this.buildInitData(viewName, viewJson, viewPath);
	}

}
