package com.bstek.dorado.cloudo.djsdoc2def.jsdoc;

import com.bstek.dorado.cloudo.djsdoc2def.output.AbstractField;
import com.bstek.dorado.cloudo.djsdoc2def.output.StringField;

/**
 * 在jsdoc中对应于一个Prototype的定义。
 * 
 * @author TD
 *
 */
public class Prototype extends Obj {

	private StringField _super_ = new StringField(Protocol.Reserved_Proto);
	
	public String getSuper() {
		return _super_.getValue();
	}
	public void setSuper(String value) {
		String p = "." + Protocol.Fn_Prototype;
		if (value.endsWith(p)) {
			_super_.setValue(value);
		} else {
			_super_.setValue(value + p);
		}
	}

	@Override
	public AbstractField<?>[] getOutputFilelds() {
		AbstractField<?>[] superFields = super.getOutputFilelds();
		AbstractField<?>[] fields = this.appendFields(superFields, _super_);
		return fields;
	}

}
