package com.bstek.dorado.cloudo.workbench.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.bstek.dorado.util.Assert;
import com.bstek.dorado.util.PathUtils;

public class FileMimeUtils {
	private static final String PROPERTIES_PATH = "com/bstek/dorado/cloudo/workbench/sourceEditorModeMimeMappings.properties";
	private static final Log logger = LogFactory.getLog(FileMimeUtils.class);

	private static Properties maps;

	static {
		maps = new Properties();
		InputStream in = FileMimeUtils.class.getClassLoader().getResourceAsStream(
				PROPERTIES_PATH);
		Assert.notNull(in, "Can not found resource \"" + PROPERTIES_PATH
				+ "\"!");
		try {
			maps.load(in);
		} catch (IOException e) {
			logger.error(e, e);
		}
	}

	public static String modeToMime(String mode) {
		String mime = maps.getProperty(mode);
		return mime;
	}

	public static String getMode(String fileName) {
		String mode;
		if (PathUtils.match("*.view.xml", fileName)) {
			mode = "view.xml";
		} else if (PathUtils.match("*.touch.xml", fileName)) {
			mode = "touch.xml";
		} else if (PathUtils.match("*.model.xml", fileName)) {
			mode = "model.xml";
		} else {
			mode = FilenameUtils.getExtension(fileName);
		}

		return mode;
	}
}
