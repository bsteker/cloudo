package com.bstek.dorado.cloudo.jseditor.iapi;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.node.ArrayNode;
import org.springframework.util.FileCopyUtils;

public class Archive {
	public static final String Node_Constructors = "constructors";
	public static final String Node_Methods      = "methods";
	public static final String Node_Properties   = "properties";
	public static final String Node_Attributes   = "attributes";
	public static final String Node_Events       = "events";
	
	private final File file;
	private final ZipFile zipFile;
	private final String root = "data";
	private final String symbolDictionaryPath = root + "/symbol-dictionary.js";
	private final JsonNode symbolDictionary;
	private final ObjectMapper objectMapper = new ObjectMapper();
	private final Map<String, JsonNode> symbols = new HashMap<String, JsonNode>();
	
	public Archive(File file) {
		this.file = file;
		try {
			this.zipFile = new ZipFile(file);
		} catch (Exception e) {
			throw new IllegalArgumentException(e);
		} 
		
		this.symbolDictionary = this.entryJsonNode(symbolDictionaryPath);
	}
	
	@Override
	public String toString() {
		return String.format("Archive [file=%s]", file);
	}

	public JsonNode getOwnerSymbol(Alias alias) {
		String elementName = alias.getSymbolDictionaryKey();
		if (symbolDictionary != null && elementName != null && elementName.length() > 0) {
			ArrayNode arrayNode = (ArrayNode)this.getSymbolDictionary().get(elementName);
			if (arrayNode == null) return null;
			
			String fileName = elementName;
			if (arrayNode.size() == 6) {
				fileName = arrayNode.get(5).asText();
			} 
			JsonNode objNode = this.getSymbol(fileName);
			return objNode;
		}
		return null;
	}
	
	protected JsonNode getSymbol(String fileName) {
		if (!symbols.containsKey(fileName)) {
			JsonNode objNode = this.entryJsonNode(root + "/symbols/" + fileName + ".js");
			symbols.put(fileName, objNode);
		}
		return symbols.get(fileName);
	}
	
	protected JsonNode getSymbolDictionary() {
		return symbolDictionary;
	}
	
	private JsonNode entryJsonNode(String path) {
		ZipEntry dictionaryEntry = this.zipFile.getEntry(path);
		if (dictionaryEntry == null) {
			return null;
		}
		
		InputStream dictionaryInput = null;
		try {
			dictionaryInput = this.zipFile.getInputStream(dictionaryEntry);
			InputStreamReader reader = new InputStreamReader(dictionaryInput, "UTF-8");
			String script = FileCopyUtils.copyToString(reader);
			JsonNode jsonNode = this.extractJsonNode(script);
			return jsonNode;
		} catch (Exception e) {
			throw new IllegalArgumentException(e);
		} finally {
			if (dictionaryInput != null) {
				try {
					dictionaryInput.close();
				} catch (IOException e) {}
			}
		}
	}
	private JsonNode extractJsonNode(String script) throws Exception {
		String jsonScript = extractJsonScript(script);
		if (jsonScript != null) {
			JsonNode jn = jsonNode(jsonScript);
			return jn;
		}
		return null;
	}
	private String extractJsonScript(String script) {
		int beginIndex = script.indexOf('{');
		int endIndex = script.lastIndexOf('}') + 1;
		
		if (beginIndex > 0 && endIndex > beginIndex) {
			String json = script.substring(beginIndex, endIndex);
			return json;
		} else {
			return null;
		}
	}
	private JsonNode jsonNode(String json) throws Exception {
		return objectMapper.readTree(json);
	}
}
