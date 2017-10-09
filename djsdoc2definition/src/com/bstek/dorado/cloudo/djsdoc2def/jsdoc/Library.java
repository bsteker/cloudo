package com.bstek.dorado.cloudo.djsdoc2def.jsdoc;

import com.bstek.dorado.cloudo.djsdoc2def.output.AbstractField;
import com.bstek.dorado.cloudo.djsdoc2def.output.StringField;

/**
 * 在jsdoc中对应于一个Library的定义。
 * 
 * @author TD
 *
 */
public class Library extends Obj {

	private StringField name = new StringField(Protocol.Reserved_Name);
	private StringField group = new StringField(Protocol.Reserved_Group);
	private StringField version = new StringField(Protocol.Reserved_Version);
	
	public Library(Identity identity) {
		super();
		this.group.setValue(identity.getGroup());
		this.name.setValue(identity.getName());
		this.version.setValue(identity.getVersion());
	}
	
	public String getName() {
		return name.getValue();
	}
	
	public String getGroup() {
		return group.getValue();
	}
	
	public String getVersion() {
		return version.getValue();
	}
	
	@Override
	public AbstractField<?>[] getOutputFilelds() {
		AbstractField<?>[] superFields = super.getOutputFilelds();
		AbstractField<?>[] fields = this.appendFields(superFields, group, name, version);
		return fields;
	}
}
