package com.bstek.dorado.cloudo.djsdoc2def.jsdoc;

import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.node.ArrayNode;

public abstract class AbstractFiller<T extends Obj> implements IDefFiller<T> {

	protected final BuildContext context;
	
	public AbstractFiller(BuildContext context) {
		this.context = context;
	}
	
	protected Obj newProperty(JsonNode prop) {
		Obj property = new Obj();

		String type = prop.get(Protocol.Name_Type).asText();
		Type t = context.toType(type);
		property.setType(t.toDefinitionExprission());
		
		return property;
	}
	
	protected Fn newFn(T owner, JsonNode methodNode, JsonNode selfNode) {
		Fn fn = new Fn();
		Alias alias = Alias.parse(methodNode.get(Protocol.Name_Alias).asText());
		fn.setAlias(alias);
		ArrayNode params = (ArrayNode)methodNode.get(Protocol.Node_Params);
		if (params != null && params.size() > 0) {
			List<JsonNode> paramNodes = new ArrayList<JsonNode>(params.size());
			for (int pi=0; pi<params.size(); pi++) {
				JsonNode pn = params.get(pi);
				String pname = pn.get(Protocol.Name).asText();
				if (pname.indexOf('.') < 0) {
					paramNodes.add(pn);
				}
			}
			
			for (int pi=0; pi<paramNodes.size(); pi++) {
				JsonNode pn = paramNodes.get(pi);
				String pname = pn.get(Protocol.Name).asText();
				FnParameter p = fn.addParameter(pname);
				boolean isOptional = pn.get(Protocol.Name_IsOptional) == null ? false: pn.get(Protocol.Name_IsOptional).asBoolean();
				p.setOptional(isOptional);
				String ptype = pn.get(Protocol.Name_Type) == null ? null: pn.get(Protocol.Name_Type).asText();
				Type type = context.toType(ptype);
				p.setType(type);
			}
		}
		JsonNode returnNode = methodNode.get(Protocol.Name_Returns);
		if (returnNode != null) {
			JsonNode rtNode = returnNode.get(Protocol.Name_Type);
			String returnType = rtNode == null? null: rtNode.asText();
			Type type = context.toType(returnType);
			fn.setReturnValue(type);
		}
		
		fn = this.customFn(fn, methodNode, selfNode);
		
		if (fn != null && !fn.isValidated(context)) {
			context.getError().unsuitableAtoms.put(alias.toString(), fn);
		}
		return fn;
	}
	
	protected Fn customFn(Fn fn, JsonNode node, JsonNode self) {
		return fn;
	}

}
