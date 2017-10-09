package com.bstek.dorado.cloudo.djsdoc2def.jsdoc;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Collection;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;

import com.bstek.dorado.cloudo.djsdoc2def.exception.IllegalValueException;

public class BuildContext {
	
	Map<String, Obj> byPath = new LinkedHashMap<String, Obj>();
	Map<String, Obj> byName = new LinkedHashMap<String, Obj>();
	Map<String, Obj> envTypes = new LinkedHashMap<String, Obj>();
	Map<Obj, JsonNode> byObj = new HashMap<Obj, JsonNode>();
	
	private final BuildConfiguration configuration;
	private final BuildError error;
	private final Library library;
	
	public BuildContext(BuildConfiguration configuration) {
		this.configuration = configuration;
		this.error = new BuildError(this);
		this.library = this.configuration.createLibrary();
		this.loadDefaultDefs();
	}
	
	public BuildError getError() {
		return error;
	}
	public Library getLibrary() {
		return library;
	}
	
	public Obj getByName(String name) {
		return (Obj)byName.get(name);
	}
	public void putByName(String name, Obj obj) {
		byName.put(name, obj);
	}
	public String findName(Obj obj) {
		Set<String> keys = byName.keySet();
		for (String key: keys) {
			Obj value = byName.get(key);
			if (value == obj)
				return key;
		}
		throw new IllegalArgumentException();
	}

	public void putByPath(String path, Obj obj) {
		byPath.put(path, obj);
	}
	
	public JsonNode getByObj(Obj obj) {
		return (JsonNode)byObj.get(obj);
	}

	public Type toType(String type) {
		if (type == null) {
			return Types.Object;
		} else {
			type = type.trim();
			if (type.length() == 0) {
				return Types.Object;
			} else if (type.charAt(0) == '!') {
				return Types.create(type);
			}
		}
		
		int a = type.indexOf('|');
		if (a > 0) {
			String[] strs = StringUtils.split(type, '|');
			for (int i=0; i<strs.length;i++) {
				String str = strs[i].trim();
				if (str.startsWith("dorado.")) {
					return this.toType(str);
				}
			}
			return this.toType(strs[0].trim());
		} else
		if (type.endsWith("..")) {
			return this.toType(type.substring(0, type.length() - 2));
		} 
		
		boolean isArray = type.endsWith("[]"); 
		if (isArray)
			type = type.substring(0, type.length()-2);
		if (!isArray) {
			isArray = type.startsWith("[") && type.endsWith("]");
			if (isArray) {
				type = type.substring(1, type.length()-1);
			}
		}
		if (isArray) {
			Type t = this.toType(type);
			t = Types.create(t);
			t.setArray(true);
			return t;
		}
		
		Type resultType = Types.find(type);
		
		if (resultType == null) {
			resultType = this.createType(type);
		}
		
		return resultType;
	}
	
	public boolean isIdentifier(String identifier) {
		if (identifier == null || identifier.isEmpty()) return false;
		char[] chars = identifier.toCharArray();
		if (!Character.isJavaIdentifierStart(chars[0])) {
			return false;
		}
		for (int i=1; i<chars.length; i++) {
			char c = chars[i];
			if (!Character.isJavaIdentifierPart(c)) return false;
		}
		return true;
	}
	
	public JsonNode extractJsonNode(String script) throws Exception {
		String jsonScript = extractJsonScript(script);
		if (jsonScript != null) {
			JsonNode jn = jsonNode(jsonScript);
			return jn;
		}
		
		return null;
	}
	
	public boolean isType(String type) {
		if (type != null && type.length() > 0) {
			if (byName.containsKey(type)) return true;
			if (envTypes.containsKey(type)) return true;
			if (type.startsWith(Protocol.Fn_ProtocolPrefix)) return true;
		}
		return false;
	}
	
	//-----------------------------------------------------------------------------
	//---------------------------------- Private Methods --------------------------
	//-----------------------------------------------------------------------------
	
	private Type createType(String type) {
		Type resultType;
		Obj obj = byName.get(type);
		if (obj == null) obj = envTypes.get(type);
		
		if (obj != null) {
			resultType = Types.create(type);
			if (obj instanceof Cls) {
				resultType.setInstance(true);
			}
		} else {
			if (error.unknownTypes.containsKey(type)) {
				resultType = error.unknownTypes.get(type);
			} else {
				resultType = Types.create(type);
				error.unknownTypes.put(type, resultType);
			}
		}
		return resultType;
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
		ObjectMapper om = new ObjectMapper();
		return om.readTree(json);
	}
	
	private void loadDefaultDefs() {
		Collection<String> typePaths = configuration.getTypePaths();
		for (String path: typePaths) {
			InputStream input = this.open(path);
			Properties p = this.properties(input);
			this.loadDefs(p);
		}
	}
	
	private InputStream open(String path) {
		InputStream input;
		
		File file = new File(path);
		if (file.exists() && file.isFile()) {
			try {
				input = new FileInputStream(file);
				return input;
			} catch (FileNotFoundException e) {
				throw new RuntimeException(e);
			}
		}
		
		input = this.getClass().getResourceAsStream(path);
		if (input != null) return input; 
		
		throw new IllegalValueException("path", path);
	}
	
	private Properties properties(InputStream input) {
		Properties p = new Properties();
		try {
			p.load(input);
		} catch (IOException e) {
			throw new RuntimeException(e);
		} finally {
			IOUtils.closeQuietly(input);
		}
		
		return p;
	}
	
	private void loadDefs(Properties p) {
		Enumeration<?> keys = p.propertyNames();
		while (keys.hasMoreElements()) {
			String key = (String)keys.nextElement();
			String value = p.getProperty(key);
			if (value != null) value = value.trim();
			if (Protocol.Value_Obj.equals(value)) {
				envTypes.put(key, new Obj());
			} else if (Protocol.Value_Cls.equals(value)) {
				envTypes.put(key, new Cls());
			} else {
				throw new IllegalValueException(key, value);
			}
		}
	}
}

