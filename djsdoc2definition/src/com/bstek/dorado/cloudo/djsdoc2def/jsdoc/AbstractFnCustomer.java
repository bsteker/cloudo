package com.bstek.dorado.cloudo.djsdoc2def.jsdoc;

import org.codehaus.jackson.JsonNode;

public abstract class AbstractFnCustomer implements IFnCustomer {

	protected final BuildContext context;
	
	public AbstractFnCustomer(BuildContext context){
		this.context = context;
	}
	
	@Override
	public Fn custom(Fn fn, JsonNode node, JsonNode self) {
		return null;
	}

}
