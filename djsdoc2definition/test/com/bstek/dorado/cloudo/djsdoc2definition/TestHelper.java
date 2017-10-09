package com.bstek.dorado.cloudo.djsdoc2definition;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.URL;

import com.bstek.dorado.cloudo.djsdoc2def.DefBuilder;
import com.bstek.dorado.cloudo.djsdoc2def.jsdoc.BuildResult;
import com.bstek.dorado.cloudo.djsdoc2def.jsdoc.Library;

public final class TestHelper {
	
	public static String json(String name, Class<?> clazz) throws Exception {
		URL url = jsonUrl(name, clazz);
		if (url == null) {
			url = jsonUrl(name + ".view", clazz);
		}
		return toString(url);
	}
	
	public static String getJson(BuildResult result) {
		Library library = result.getLibrary();
		String json = DefBuilder.toString(library);
		return json;
	}
	
	private static URL jsonUrl(String name, Class<?> clazz) {
		if (!name.endsWith(".json")) {
			name += ".json";
		}
		URL url = clazz.getResource(name);
		return url;
	}
	
	private static String toString(URL url) throws Exception {
		InputStream input = url.openStream();
		ByteArrayOutputStream output = new ByteArrayOutputStream();
		try {
			byte[] buffer = new byte[1024];
	        int n = 0;
	        while (-1 != (n = input.read(buffer))) {
	            output.write(buffer, 0, n);
	        }
		} finally {
			input.close();
		}
		
		return new String(output.toByteArray(), "UTF-8");
	}
	
}
