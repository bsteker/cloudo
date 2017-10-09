package com.bstek.dorado.cloudo.djsdoc2def.jsdoc;

import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.node.ArrayNode;

public class ClsFiller extends AbstractFiller<Cls>{

	private final IFnCustomer fnCustomer;
	
	public ClsFiller(BuildContext context) {
		super(context);
		fnCustomer = ClsFnCustomers.create(context);
	}

	@Override
	public void fill(Cls cls, JsonNode selfNode) {
		String prototype = null;
		ArrayNode inheritsFrom = (ArrayNode)selfNode.get(Protocol.Name_InheritsFrom);
		if (inheritsFrom != null) {
			String[] froms = new String[inheritsFrom.size()];
			for (int i=0; i<froms.length; i++) {
				String f = inheritsFrom.get(i).asText();
				froms[i] = f;
			}
			if (froms.length == 1) {
				prototype = froms[0];
			}
			cls.setExtends(froms);
		}
		if (prototype != null) {
			cls.getPrototype().setSuper(prototype);
		}
		
		this.fillProperties(cls, selfNode);
		this.fillMethods(cls, selfNode);
		this.fillEvents(cls, selfNode);
	}

	@Override
	protected Fn customFn(Fn fn, JsonNode node, JsonNode self) {
		Fn nfn = fnCustomer.custom(fn, node, self);
		if (nfn != null) return nfn;
		return fn;
	}
	
	private void fillProperties(Cls cls, JsonNode selfNode) {
		ArrayNode properties = (ArrayNode)selfNode.get(Protocol.Node_Properties);
		if (properties == null || properties.size() == 0)
			return;
		
		String prototype = cls.getPrototype().getSuper();
		String selfName = selfNode.get(Protocol.Name_Alias).asText();
		for (int i=0; i<properties.size(); i++) {
			JsonNode prop = properties.get(i);
			String memberOf = null;
			
			if (prototype != null) {
				JsonNode memberOfNode = prop.get(Protocol.Name_MemberOf);
				memberOf = memberOfNode != null? 
						memberOfNode.asText(): null;
				if (!selfName.equals(memberOf)) {
					continue;
				}
			}
			
			String name = prop.get(Protocol.Name).asText();
			Obj property = this.newProperty(prop);
			JsonNode isStaticNode = prop.get(Protocol.Name_IsStatic);
			boolean isStatic = isStaticNode == null? false: isStaticNode.asBoolean();
			if (!isStatic) {
				cls.getPrototype().set(name, property);
			} else {
				cls.set(name, property);
			}
		}
	}
	
	private void fillMethods(Cls cls, JsonNode selfNode) {
		ArrayNode methods = (ArrayNode)selfNode.get(Protocol.Node_Methods);
		if (methods == null || methods.size() == 0)
			return;
		
		String prototype = cls.getPrototype().getSuper();
		String selfName = selfNode.get(Protocol.Name_Alias).asText();
		for (int i=0; i<methods.size(); i++) {
			JsonNode method = methods.get(i);
			String memberOf = null;
			if (prototype != null) {
				JsonNode memberOfNode = method.get(Protocol.Name_MemberOf);
				memberOf = memberOfNode != null? 
						memberOfNode.asText(): null;
				if (!selfName.equals(memberOf)) {
					continue;
				}
			}
			
			//visibility
			boolean isPublic = method.get(Protocol.Name_Visibility) == null? true: 
				Protocol.Value_Public.equals(method.get(Protocol.Name_Visibility).asText());
			if (!isPublic) continue;
			//deprecated
			boolean isDeprecated = method.get(Protocol.Name_Deprecated) == null? false:
				method.get(Protocol.Name_Deprecated).asBoolean();
			if (isDeprecated) continue;

			Fn fn = this.newFn(cls, method,selfNode);
			String name = method.get(Protocol.Name).asText();
			//isStatic
			boolean isStatic = method.get(Protocol.Name_IsStatic) == null? false:
				method.get(Protocol.Name_IsStatic).asBoolean();
			
			if (!isStatic) {
				cls.getPrototype().set(name, fn);
			} else {
				cls.set(name, fn);
			}
		}
	}
	
	private void fillEvents(Cls cls, JsonNode selfNode) {
		ArrayNode events = (ArrayNode)selfNode.get(Protocol.Node_Events);
		if (events == null || events.size() == 0)
			return;
		
		String selfName = selfNode.get(Protocol.Name_Alias).asText();
		for (int i=0; i<events.size(); i++) {
			JsonNode eventNode = events.get(i);
			//visibility
			boolean isPublic = eventNode.get(Protocol.Name_Visibility) == null? true: 
				Protocol.Value_Public.equals(eventNode.get(Protocol.Name_Visibility).asText());
			if (!isPublic) continue;
			
			Alias alias = Alias.parse(eventNode.get(Protocol.Name_Alias).asText());
			if (selfName.equals(alias.getOwner())) {
				Event event = this.newEvent(cls, alias, eventNode, selfNode);
				String name = alias.getName();
				if (event != null) {
					cls.addEvent(name, event);
				}
			}
		}
	}

	private Event newEvent(Cls cls, Alias alias, JsonNode eventNode, JsonNode selfNode) {
		Event event = new Event();
		event.setAlias(alias);
		ArrayNode params = (ArrayNode)eventNode.get(Protocol.Node_Params);
		if (params != null && params.size() > 0) {
			List<JsonNode> paramNodes = new ArrayList<JsonNode>(params.size());
			for (int pi=0; pi<params.size(); pi++) {
				JsonNode pn = params.get(pi);
				paramNodes.add(pn);
			}
			
			for (int pi=0; pi<paramNodes.size(); pi++) {
				JsonNode pn = paramNodes.get(pi);
				String pname = pn.get(Protocol.Name).asText();
				EventParameter p = event.addParameter(pname);
				String ptype = pn.get(Protocol.Name_Type) == null ? null: pn.get(Protocol.Name_Type).asText();
				Type type = context.toType(ptype);
				p.setType(type);
			}
		}
		
		JsonNode returnNode = eventNode.get(Protocol.Name_Returns);
		if (returnNode != null) {
			JsonNode rtNode = returnNode.get(Protocol.Name_Type);
			String returnType = rtNode == null? null: rtNode.asText();
			Type type = context.toType(returnType);
			event.setReturnValue(type);
		}
		
		if (!event.isValidated(context)) {
			context.getError().unsuitableAtoms.put(alias.toString(), event);
		}
		return event;
	}
}
