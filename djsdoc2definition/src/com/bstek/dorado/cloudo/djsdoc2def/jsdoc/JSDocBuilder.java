package com.bstek.dorado.cloudo.djsdoc2def.jsdoc;

import java.io.File;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.Set;

import org.apache.commons.io.FileUtils;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.node.ArrayNode;

import com.bstek.dorado.cloudo.djsdoc2def.exception.ExtractJsonException;

public class JSDocBuilder {

	private final BuildConfiguration configuration;
	private BuildContext context;
	private ClsFiller clsFiller;
	private ObjFiller objFiller;
	
	public JSDocBuilder(BuildConfiguration configuration) {
		this.configuration = configuration;
		this.context = new BuildContext(configuration);
		this.clsFiller = new ClsFiller(context);
		this.objFiller = new ObjFiller(context);
	}
	
	public BuildResult build() throws Exception {
		this.scan1();
		this.scan2();
		this.scan3();
		
		Library library = context.getLibrary();
		this.build(library, context);
		BuildResult result = new BuildResult(library, context.getError());
		return result;
	}
	
	private void build(Library def, BuildContext context) {
		Set<String> ready = new HashSet<String>(context.byName.size());
		for (String name: new LinkedHashSet<String>(context.byName.keySet())) {
			Obj obj = context.byName.get(name);
			this.fill(def, name, obj, ready);
		}
	}
	
	private void fill(Library def, String name, Obj obj, Set<String> ready) {
		if (ready.contains(name))
			return;
		
		if (Protocol.Name_Global.equals(name)) {
			for (String key: obj.keys()) {
				Obj value = obj.get(key);
				def.set(key, value);
			}
		} else {
			int last = name.lastIndexOf('.');
			//不具有parent，例如Date,Array
			if (last < 0) {
				if (def.get(name) == null) {
					def.set(name, obj);
				}
			} else {
				//具有parent
				String parentName = name.substring(0, last);
				if (!ready.contains(parentName)) {
					Obj parent = context.byName.get(parentName);
					if (parent == null) {
						parent = new Obj();
						context.byName.put(parentName, parent);
					}
					this.fill(def, parentName, parent, ready);
				}
				
				Obj parent = context.byName.get(parentName);
				String childName = name.substring(last+1);
				parent.set(childName, obj);
			}
		}
		ready.add(name);
	}

	/*
	 * 扫描data/symbol-dictionary.js文件：
	 * 1.寻找所有objet和class的路径和名称
	 * 2.初步构建object和class
	 */
	private void scan1() throws Exception {
		File file = FileUtils.getFile(configuration.getDocRoot(), Protocol.Symbol_Dictionary);
		String text = FileUtils.readFileToString(file, Protocol.Default_Encoding);
		JsonNode jn = context.extractJsonNode(text);
		
		Iterator<String> nameItr = jn.getFieldNames();
		while (nameItr.hasNext()) {
			String objName = nameItr.next();
			ArrayNode arrayNode = (ArrayNode)jn.get(objName);
			String fileName = objName;
			if (arrayNode.size() == 6) {
				fileName = arrayNode.get(5).asText();
			}
			String type = arrayNode.get(0).asText();
			Obj obj = null;
			if (Protocol.Type_Object.equals(type)) {
				obj = new Obj();
			} else if (Protocol.Type_Class.equals(type)) {
				obj = new Cls();
			}
			if (obj != null) {
				context.byPath.put(fileName, obj);
				context.byName.put(objName, obj);
			}
		}
	}
	
	private void scan2() throws Exception {
		for (String filePath: context.byPath.keySet()) {
			Obj obj = context.byPath.get(filePath);
			File file = FileUtils.getFile(configuration.getDocRoot(), Protocol.symbol(filePath));
			String text = FileUtils.readFileToString(file, Protocol.Default_Encoding);
			if (text == null) {
				context.getError().unknownRes.put(filePath, file.getAbsolutePath());
				continue;
			}
			
			JsonNode jn = null;
			try {
				jn = context.extractJsonNode(text);
			} catch (Exception e) {
				throw new ExtractJsonException(file, e);
			}
			
			context.byObj.put(obj, jn);
		}
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private void scan3() {
		Set<String> names = context.byName.keySet();
		for (String name: names) {
			Obj obj = context.byName.get(name);
			JsonNode node = context.byObj.get(obj);
			IDefFiller filler = this.create(obj);
			filler.fill(obj, node);
			
			if (!obj.isValidated(context)) {
				context.getError().unsuitableAtoms.put(name, obj);
			}
		}
	}

	private IDefFiller<? extends Obj> create(Obj obj) {
		if (obj instanceof Cls) {
			return clsFiller;
		} else {
			return objFiller;
		}
	}

}
