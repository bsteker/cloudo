package com.bstek.dorado.cloudo.djsdoc2def.jsdoc;

public class Event extends AbstractFn<EventParameter> {

	@Override
	public EventParameter addParameter(String name) {
		EventParameter parameter = new EventParameter(name);
		this.addParameter(parameter);
		return parameter;
	}

}
