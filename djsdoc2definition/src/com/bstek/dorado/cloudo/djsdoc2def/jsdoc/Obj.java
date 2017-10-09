package com.bstek.dorado.cloudo.djsdoc2def.jsdoc;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonGenerator;

import com.bstek.dorado.cloudo.djsdoc2def.output.OutputContext;

/**
 * 在jsdoc中对应于一个Object的定义。具有子对象。
 * 
 * @author TD
 *
 */
public class Obj extends Atom {

	private LinkedHashMap<String, Obj> objs = new LinkedHashMap<String, Obj>();
	
	/**
	 * 设置子对象
	 * @param name
	 * @param member
	 */
	public void set(String name, Obj member) {
		objs.put(name, member);
	}
	/**
	 * 获取子对象
	 * @param name
	 * @return
	 */
	public Obj get(String name) {
		return objs.get(name);
	}
	
	/**
	 * 获取子对象名称的集合
	 * @return
	 */
	public List<String> keys() {
		return new ArrayList<String>(objs.keySet());
	}
	
	@Override
	public boolean isEmpty() {
		if (!super.isEmpty()) {
			return false;
		}
		return objs.isEmpty();
	}
	
	@Override
	protected void doOutput(OutputContext context) throws Exception {
		this.outputSelf(context);
		this.outputObjs(context);
	}
	
	/**
	 * 输出子对象
	 * @param context
	 * @throws IOException
	 * @throws JsonGenerationException
	 */
	protected void outputObjs(OutputContext context) throws IOException,
			JsonGenerationException {
		if (!objs.isEmpty()) {
			JsonGenerator jsonGenerator = context.getJsonGenerator();
			for (String name: objs.keySet()) {
				jsonGenerator.writeFieldName(name);
				Obj obj = objs.get(name);
				obj.output(context);
			}
		}
	}
	
	@Override
	public String validateMessage(BuildContext context) {
		throw new UnsupportedOperationException();
	}
}
