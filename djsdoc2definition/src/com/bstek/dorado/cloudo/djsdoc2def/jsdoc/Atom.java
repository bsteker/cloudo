package com.bstek.dorado.cloudo.djsdoc2def.jsdoc;

import org.codehaus.jackson.JsonGenerator;

import com.bstek.dorado.cloudo.djsdoc2def.output.AbstractField;
import com.bstek.dorado.cloudo.djsdoc2def.output.IOutputFiledsable;
import com.bstek.dorado.cloudo.djsdoc2def.output.OutputContext;
import com.bstek.dorado.cloudo.djsdoc2def.output.StringField;

/**
 * jsdoc中的最小单元，对应于一个字段或方法的定义
 * 
 * @author TD
 *
 */
public abstract class Atom implements IAtom, IOutputFiledsable {

	private StringField type = new StringField("!type", "?");
	private StringField doc = new StringField("!doc");
	
	/**
	 * 类型
	 * @return
	 */
	public String getType() {
		return type.getValue();
	}
	public void setType(String value) {
		type.setValue(value);
	}

	/**
	 * 说明
	 * @return
	 */
	public String getDoc() {
		return doc.getValue();
	}
	public void setDoc(String value) {
		doc.setValue(value);
	}
	
	@Override
	public AbstractField<?>[] getOutputFilelds() {
		return new AbstractField<?>[] {
			type, doc
		};
	}
	
	protected AbstractField<?>[] appendFields(AbstractField<?>[] superFields, AbstractField<?>...fields) {
		AbstractField<?>[] newFields = new AbstractField<?>[superFields.length + fields.length];
		System.arraycopy(superFields, 0, newFields, 0, superFields.length);
		for (int i=0; i<fields.length; i++) {
			AbstractField<?> field = fields[i];
			newFields[superFields.length + i] = field;
		}
		return newFields;
	}
	
	/**
	 * 判断是否存在定义的内容
	 * 
	 * @return
	 */
	public boolean isEmpty() {
		AbstractField<?>[] fields = getOutputFilelds();
		for (AbstractField<?> f: fields) {
			if (f.shouldOutput()) {
				return false;
			}
		}
		return true;
	}
	
	@Override
	public void output(OutputContext context) {
		JsonGenerator jsonGenerator = context.getJsonGenerator();
		try {
			jsonGenerator.writeStartObject();
			this.doOutput(context);
			jsonGenerator.writeEndObject();
			jsonGenerator.flush();
		} catch (Exception e) {
			throw new RuntimeException(e);
		} 
	}
	
	protected void doOutput(OutputContext context) throws Exception {
		this.outputSelf(context);
	}
	
	/**
	 * 输出自身的属性，不包括字对象的属性
	 * @param context
	 */
	protected void outputSelf(OutputContext context) {
		AbstractField<?>[] fields = this.getOutputFilelds();
		for (AbstractField<?> field: fields) {
			if (field.shouldOutput())
				field.output(context);
		}
	}
	
	public boolean isValidated(BuildContext context) {
		return true;
	}
	public abstract String validateMessage(BuildContext context);

}
