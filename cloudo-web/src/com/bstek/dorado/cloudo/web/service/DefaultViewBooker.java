package com.bstek.dorado.cloudo.web.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

import org.apache.commons.lang.StringUtils;

import com.bstek.dorado.common.ClientType;
import com.bstek.dorado.core.Configure;
import com.bstek.dorado.vidorsupport.service.InitSupport;

public class DefaultViewBooker extends AbstractViewBooker {
	protected String parseFileName(String path) throws Exception {
		String[] paths = StringUtils.replace(path, "\\", "/").split("/");
		return paths[paths.length - 1];
	}


	public String parseXMLClientType(String path) throws Exception {
		String viewName = this.parseFileName(path), clientType;
		if (viewName.indexOf("touch.xml") > 0) {
			clientType = ClientType.TOUCH_NAME;
		} else {
			clientType = ClientType.DESKTOP_NAME;
		}

		return clientType;
	}
	public String read(String viewPath) throws Exception {
		String viewJson;
		FileInputStream inputStream = null;
		try {
			inputStream = new FileInputStream(new File(viewPath));
			viewJson = this.getViewReader().read(inputStream,
					Configure.getString(InitSupport.ENCODING),null,this.parseXMLClientType(viewPath));
		} finally {
			if (inputStream != null) {
				try {
					inputStream.close();
				} catch (IOException e) {
				}
			}
		}
		return viewJson;
	}

	public void write(String viewPath, String viewJson) throws Exception {
		FileOutputStream outputStream = null;
		try {
			outputStream = new FileOutputStream(new File(viewPath));
			this.getViewWriter().write(viewJson, outputStream,
					Configure.getString(InitSupport.ENCODING),null,this.parseXMLClientType(viewPath));
		} finally {
			
			if (outputStream != null) {
				try {
					outputStream.close();
				} catch (IOException e) {

				}
			}
		}
	}

}
