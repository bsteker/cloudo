package com.bstek.dorado.cloudo.workbench.util;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.util.Properties;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.bstek.dorado.util.Assert;

public class CreateFileUtils {
	private static final String PROPERTIES_PATH = "com/bstek/dorado/cloudo/workbench/FileTemplateMappings.properties";
	private static final Log logger = LogFactory.getLog(CreateFileUtils.class);

	private static Properties maps;

	static {
		maps = new Properties();
		InputStream in = FileMimeUtils.class.getClassLoader()
				.getResourceAsStream(PROPERTIES_PATH);
		Assert.notNull(in, "Can not found resource \"" + PROPERTIES_PATH
				+ "\"!");
		try {
			maps.load(in);
		} catch (IOException e) {
			logger.error(e, e);
		}
	}

	public static File create(String path, String name, String mode)
			throws IOException {
		String templatePath = maps.getProperty(mode);
		String filePath = path + File.separator + name;
		File file = new File(filePath);
		if (StringUtils.isNotEmpty(templatePath)) {
			InputStream in = FileMimeUtils.class.getClassLoader()
					.getResourceAsStream(templatePath);
			String data = IOUtils.toString(in);
			FileUtils.writeStringToFile(file, data);
			in.close();
		} else {
			FileUtils.writeStringToFile(file, "");
		}

		return file;
	}

	public static void create(OutputStream outputStream, String templateKey,
			String encoding) throws IOException {
		String templatePath = maps.getProperty(templateKey);

		String data = "";
		if (StringUtils.isNotEmpty(templatePath)) {
			InputStream in = FileMimeUtils.class.getClassLoader()
					.getResourceAsStream(templatePath);
			data = IOUtils.toString(in);
		}
		OutputStreamWriter writer = new OutputStreamWriter(outputStream,
				encoding);

		try {
			writer.write(data);
		} catch (IOException e) {
			throw e;
		} finally {
			try {
				writer.close();
			} catch (IOException e) {

			}
		}

	}
}
