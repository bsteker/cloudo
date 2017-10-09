package com.bstek.dorado.cloudo.djsdoc2def.jsdoc;

import java.util.List;

import com.bstek.dorado.cloudo.djsdoc2def.output.AbstractField;
import com.bstek.dorado.cloudo.djsdoc2def.output.OutputContext;
import com.bstek.dorado.cloudo.djsdoc2def.output.StringArrayField;

/**
 * 在jsdoc中对应于一个Function的定义。
 * 
 * @author TD
 *
 */
public class Fn extends AbstractFn<FnParameter> {

	private StringArrayField effects = new StringArrayField("!effects");
	
	public void setEffects(String...effects) {
		this.effects.setValue(effects);
	}
	public String[] getEffects() {
		return this.effects.getValue();
	}
	
	@Override
	public AbstractField<?>[] getOutputFilelds() {
		AbstractField<?>[] superFields = super.getOutputFilelds();
		AbstractField<?>[] fields = this.appendFields(superFields, effects);
		return fields;
	}
	
	@Override
	public FnParameter addParameter(String name) {
		FnParameter p = new FnParameter(name);
		this.addParameter(p);
		return p;
	}
	
	@Override
	protected void doOutput(OutputContext context) throws Exception {
		String type = this.getType();
		if (type == null || type.length() == 0) {
			type = this.toType();
			this.setType(type);
		}
		
		this.outputSelf(context);
	}
	
	private String toType() {
		String type = "fn(";
		List<FnParameter> parameters = this.getParameters();
		for (int i=0; i<parameters.size(); i++) {
			FnParameter parameter = parameters.get(i);
			if (i > 0) {
				type += ", ";
			}
			type += parameter.toDefinitionExprission();
		}
		type += ")";
		ReturnValue returnValue = this.getReturnValue();
		if (returnValue != null) {
			type += " -> ";
			type += returnValue.getTypeDefinitionExprission();
		}
		return type;
	}
}
