package com.bstek.dorado.cloudo.djsdoc2def.jsdoc;

import org.codehaus.jackson.JsonNode;

public interface IDefFiller<T extends Obj> {

	void fill(T t, JsonNode jn);
}
