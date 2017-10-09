package com.bstek.dorado.cloudo.djsdoc2def.jsdoc;

import java.util.HashSet;
import java.util.Set;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.node.ArrayNode;

public class ClsFnCustomers {
	
	public static IFnCustomer create(BuildContext context) {
		FnCustomerCollections c = new FnCustomerCollections(context);
		c.add(new Setter(context), new Getter(context), new EntityListFnCustomer(context));
		return c;
	}

	private static class Setter extends AbstractFnCustomer {
		public Setter(BuildContext context) {
			super(context);
		}

		@Override
		public Fn custom(Fn fn, JsonNode fnNode, JsonNode selfNode) {
			String name = fnNode.get(Protocol.Name).asText();
			String memberOf = fnNode.get(Protocol.Name_MemberOf).asText();
			
			if ("set".equals(name)) {
				String attributeSupport = Protocol.Class_AttributeSupport;
				Type _this = Types.create(Protocol.Fn_This);
				if (attributeSupport.equals(memberOf)) {
					fn.setReturnValue(_this);
				} else {
					Set<String> parents = allParents(context, selfNode);
					if (parents.contains(attributeSupport)) {
						fn.setReturnValue(_this);
					} else {
						context.getError().unFnMethodReturn.add("[" + memberOf + "#" + name + "] is not " + _this.toDefinitionExprission());
					}
				}
				return fn;
			}
			return null;
		}
		
	}
	
	private static class Getter extends AbstractFnCustomer {

		public Getter(BuildContext context) {
			super(context);
		}
		
		@Override
		public Fn custom(Fn fn, JsonNode fnNode, JsonNode selfNode) {
			String name = fnNode.get(Protocol.Name).asText();
			String memberOf = fnNode.get(Protocol.Name_MemberOf).asText();
			if ("get".equals(name)) {
				String attributeSupport = Protocol.Class_AttributeSupport;
				Type doradoGet = Types.create(Protocol.Fn_DoradoGet);
				if (attributeSupport.equals(memberOf)) {
					fn.setReturnValue(doradoGet);
				} else {
					Set<String> parents = allParents(context, selfNode);
					if (parents.contains(attributeSupport)) {
						fn.setReturnValue(doradoGet);
					} else {
						context.getError().unFnMethodReturn.add("[" + memberOf + "#" + name + "] is not " + doradoGet.toDefinitionExprission());
					}
				}
				
				return fn;
			}
			return null;
		}
	}
	
	private static class EntityListFnCustomer extends AbstractFnCustomer {

		public EntityListFnCustomer(BuildContext context) {
			super(context);
		}
		
		@Override
		public Fn custom(Fn fn, JsonNode fnNode, JsonNode selfNode) {
			String name = fnNode.get(Protocol.Name).asText();
			String memberOf = fnNode.get(Protocol.Name_MemberOf).asText();
			
			if (Protocol.Class_EntityList.equals(memberOf)) {
				String[] nameArray = new String[] {
						"getFirst","getLast",
						"first","previous","next","last",
						"createChild","getById"
					};
				for (String n: nameArray) {
					if (n.equals(name)) {
						fn.setEffects("custom doradoEntity");
						return fn;
					}
				}
			}
			return null;
		}
	}
	
	private static Set<String> allParents(BuildContext context, JsonNode self) {
		Set<String> parents = new HashSet<String>();
		allParents(context, self, parents);
		return parents;
	}
	
	private static void allParents(BuildContext context, JsonNode self, Set<String> parents) {
		ArrayNode inheritsFrom = (ArrayNode)self.get(Protocol.Name_InheritsFrom);
		if (inheritsFrom != null && inheritsFrom.size() > 0) {
			for (int i=0; i < inheritsFrom.size(); i++) {
				String parent = inheritsFrom.get(i).asText().trim();
				parents.add(parent);
				context.toType(parent);
				
				Obj fromObj = context.byName.get(parent);
				if (fromObj != null) {
					JsonNode fromNode = context.byObj.get(fromObj);
					if (fromNode != null)
						allParents(context, fromNode, parents);
				}
			}
		}
	}
}
