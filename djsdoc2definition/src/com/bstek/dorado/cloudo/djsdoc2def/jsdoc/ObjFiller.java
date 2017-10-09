package com.bstek.dorado.cloudo.djsdoc2def.jsdoc;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.node.ArrayNode;

public class ObjFiller extends AbstractFiller<Obj> {

	public ObjFiller(BuildContext context) {
		super(context);
	}

	@Override
	public void fill(Obj t, JsonNode jn) {
		this.fillProperties(t, jn);
		this.fillMethods(t, jn);
	}

	private void fillProperties(Obj obj, JsonNode jn) {
		ArrayNode properties = (ArrayNode)jn.get(Protocol.Node_Properties);
		if (properties == null || properties.size() == 0)
			return;
		
		for (int i=0; i<properties.size(); i++) {
			JsonNode prop = properties.get(i);
			String name = prop.get(Protocol.Name).asText();
			Obj property = this.newProperty(prop);
			
			obj.set(name, property);
		}
	}
	
	private void fillMethods(Obj obj, JsonNode jn) {
		ArrayNode properties = (ArrayNode)jn.get(Protocol.Node_Methods);
		if (properties == null || properties.size() == 0)
			return;
		
		for (int i=0; i<properties.size(); i++) {
			JsonNode method = properties.get(i);
			//visibility
			boolean isPublic = method.get(Protocol.Name_Visibility) == null? true: 
				Protocol.Value_Public.equals(method.get(Protocol.Name_Visibility).asText());
			if (!isPublic) continue;
			//deprecated
			boolean isDeprecated = method.get(Protocol.Name_Deprecated) == null? false:
				method.get(Protocol.Name_Deprecated).asBoolean();
			if (isDeprecated) continue;

			Fn property = this.newFn(obj, method, jn);
			String name = method.get(Protocol.Name).asText();
			
			obj.set(name, property);
		}
	}
}
