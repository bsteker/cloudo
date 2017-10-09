package com.bstek.dorado.cloudo.jseditor.iapi;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.node.ArrayNode;

public abstract class Alias {
	protected String owner;
	protected String type;
	protected String name;
	protected boolean outputType = false;
	
	public static final String Type_Namespace   = "namespace";
	public static final String Type_Object      = "object";
	public static final String Type_Class       = "class";
	public static final String Type_Constructor = "constructor";
	public static final String Type_Method      = "method";
	public static final String Type_Property    = "property";
	public static final String Type_Attribute   = "attribute";
	public static final String Type_Event       = "event";
	
	public static Alias namespace(String name) {
		return new Alias_Namespace(name);
	}
	public static Alias object(String name) {
		return new Alias_Object(name);
	}
	public static Alias clazz(String name) {
		Alias alias = new Alias_Class(name);
		return alias;
	}
	public static Alias constructor(String clazz) {
		return new Alias_Constructor(clazz);
	}
	public static Alias method(String owner, String name) {
		return new Alias_Method(owner, name);
	}
	public static Alias property(String clazz, String name) {
		return new Alias_Property(clazz, name);
	}
	public static Alias attribute(String clazz, String name) {
		return new Alias_Attribute(clazz, name);
	}
	public static Alias event(String clazz, String name) {
		Alias alias = new Alias_Event(clazz, name);
		return alias;
	}
	protected Alias() {}
	public String getOwner() {
		return owner;
	}
	public void setOwner(String owner) {
		this.owner = owner;
	}

	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	@Override
	public String toString() {
		StringBuilder s = new StringBuilder();
		if (owner != null)
			s.append(owner).append('#');
		
		if (outputType && type != null) {
			s.append(type).append(':');
		} 
		
		s.append(name);
		return s.toString();
	}
	
	protected JsonNode search(JsonNode objNode, String root) {
		ArrayNode eleNodes = (ArrayNode)objNode.get(root);
		if (eleNodes != null && eleNodes.size() > 0) {
			for (int i=0; i<eleNodes.size(); i++) {
				JsonNode node = eleNodes.get(i);
				JsonNode nameNode = node.get("name");
				if (nameNode != null) {
					String nameStr = nameNode.asText();
					if (name.equals(nameStr)) {
						return node;
					}
				}
			}
		}
		return null;
	}
	
	public abstract JsonNode definition(Archive archive);
	public abstract String getSymbolDictionaryKey();
	
	private static class Alias_Namespace extends Alias {
		public Alias_Namespace(String name) {
			super();
			this.type = Type_Namespace;
			this.name = name;
		}
		@Override
		public JsonNode definition(Archive archive) {
			JsonNode node = archive.getOwnerSymbol(this);
			return node;
		}
		@Override
		public String getSymbolDictionaryKey() {
			return this.name;
		}
	}
	private static class Alias_Object extends Alias {
		public Alias_Object(String name) {
			super();
			this.type = Type_Object;
			this.name = name;
		}
		@Override
		public JsonNode definition(Archive archive) {
			JsonNode node = archive.getOwnerSymbol(this);
			return node;
		}
		@Override
		public String getSymbolDictionaryKey() {
			return this.name;
		}
	}
	private static class Alias_Class extends Alias {
		public Alias_Class(String name) {
			super();
			this.type = Type_Class;
			this.name = name;
		}
		@Override
		public JsonNode definition(Archive archive) {
			JsonNode node = archive.getOwnerSymbol(this);
			return node;
		}
		@Override
		public String getSymbolDictionaryKey() {
			return this.name;
		}
	}
	private static class Alias_Constructor extends Alias {
		public Alias_Constructor(String clazz) {
			super();
			this.owner = clazz;
			this.type = Type_Constructor;
			this.name = Type_Constructor;
		}
		@Override
		public JsonNode definition(Archive archive) {
			JsonNode objNode = archive.getOwnerSymbol(this);
			if (objNode == null) return null;
			
			ArrayNode eleNodes = (ArrayNode)objNode.get(Archive.Node_Constructors);
			if (eleNodes != null && eleNodes.size() > 0) {
				return eleNodes.get(0);
			}
			return null;
		}
		@Override
		public String getSymbolDictionaryKey() {
			return this.owner;
		}
	}
	private static class Alias_Method extends Alias {
		public Alias_Method(String owner, String name) {
			super();
			this.owner = owner;
			this.type = Type_Method;
			this.name = name;
		}
		@Override
		public JsonNode definition(Archive archive) {
			JsonNode objNode = archive.getOwnerSymbol(this);
			if (objNode == null) return null;
			
			objNode = this.search(objNode, Archive.Node_Methods);
			return objNode;
		}
		@Override
		public String getSymbolDictionaryKey() {
			return this.owner;
		}
	}
	private static class Alias_Property extends Alias {
		public Alias_Property(String owner, String name) {
			super();
			this.owner = owner;
			this.type = Type_Property;
			this.name = name;
		}
		@Override
		public JsonNode definition(Archive archive) {
			JsonNode objNode = archive.getOwnerSymbol(this);
			if (objNode == null) return null;
			
			objNode = this.search(objNode, Archive.Node_Properties);
			return objNode;
		}
		@Override
		public String getSymbolDictionaryKey() {
			return this.owner;
		}
	}
	private static class Alias_Attribute extends Alias {
		public Alias_Attribute(String owner, String name) {
			super();
			this.owner = owner;
			this.type = Type_Attribute;
			this.name = name;
			this.outputType = true;
		}
		@Override
		public JsonNode definition(Archive archive) {
			JsonNode objNode = archive.getOwnerSymbol(this);
			if (objNode == null) return null;
			
			objNode = this.search(objNode, Archive.Node_Attributes);
			return objNode;
		}
		@Override
		public String getSymbolDictionaryKey() {
			return this.owner;
		}
	}
	private static class Alias_Event extends Alias {
		public Alias_Event(String owner, String name) {
			super();
			this.owner = owner;
			this.type = Type_Event;
			this.name = name;
			this.outputType = true;
		}
		@Override
		public JsonNode definition(Archive archive) {
			JsonNode objNode = archive.getOwnerSymbol(this);
			if (objNode == null) return null;
			
			objNode = this.search(objNode, Archive.Node_Events);
			return objNode;
		}
		@Override
		public String getSymbolDictionaryKey() {
			return this.owner;
		}
	}
	
	private static class SmartAlias extends Alias {
		private Alias[] aliases;
		private Alias real;
		
		public SmartAlias(String owner, String name) {
			List<Alias> aliasList = new ArrayList<Alias>();
			aliasList.add(Alias.method(owner,name));
			aliasList.add(Alias.property(owner, name));
			aliasList.add(Alias.attribute(owner, name));
			aliasList.add(Alias.event(owner, name));
			
			String ns = (name == null || name.length()==0)? owner: owner + "." + name;
			
			aliasList.add(Alias.object(ns));
			aliasList.add(Alias.clazz(ns));
			aliasList.add(Alias.namespace(ns));
			aliasList.add(Alias.constructor(ns));
			aliases = aliasList.toArray(new Alias[0]);
		}
		
		@Override
		public JsonNode definition(Archive archive) {
			for (Alias a: aliases) {
				JsonNode n = a.definition(archive);
				if (n != null) {
					real = a;
					return n;
				}
			}
			return null;
		}

		@Override
		public String getSymbolDictionaryKey() {
			throw new UnsupportedOperationException();
		}

		@Override
		public String getOwner() {
			if (real != null) return real.getOwner();
			return null;
		}

		@Override
		public String getType() {
			if (real != null) return real.getType();
			return null;
		}

		@Override
		public String getName() {
			if (real != null) return real.getName();
			return null;
		}
		
	}
	
	public static Alias valueOf(Map< String, Object > parameter) {
		Alias alias = null;
		String owner = (String) parameter.get( "owner" );
		String name = (String) parameter.get( "name" );
		String type = (String) parameter.get( "type" );
		if ( type.equals( Alias.Type_Namespace ) ) {
			alias = Alias.namespace( owner );
		} else if ( type.equals( Alias.Type_Object ) ) {
			alias = Alias.object( owner );
		} else if ( type.equals( Alias.Type_Class ) ) {
			alias = Alias.clazz( owner );
		} else if ( type.equals( Alias.Type_Constructor ) ) {
			alias = Alias.constructor( owner );
		} else if ( type.equals( Alias.Type_Method ) ) {
			alias = Alias.method( owner, name );
		} else if ( type.equals( Alias.Type_Property ) ) {
			alias = Alias.property( owner, name );
		} else if ( type.equals( Alias.Type_Attribute ) ) {
			alias = Alias.attribute( owner, name );
		} else if ( type.equals( Alias.Type_Event ) ) {
			alias = Alias.event( owner, name );
		}
		
		return alias;
	}
	
	public static Alias smart(Map< String, Object > parameter) {
		String owner = (String) parameter.get( "owner" );
		String name = (String) parameter.get( "name" );
		return new SmartAlias(owner, name);
	}
	
}

