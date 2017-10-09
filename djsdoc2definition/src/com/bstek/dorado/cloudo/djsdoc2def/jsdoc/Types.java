package com.bstek.dorado.cloudo.djsdoc2def.jsdoc;

import java.util.HashSet;
import java.util.Set;

public class Types {
	public static final Type Object = new ObjectType();
	public static final Type String = new StringType();
	public static final Type Number = new NumberType();
	public static final Type Bool = new BoolType();
	public static final Type Function = new FunctionType();
	public static final Type Array = new ArrayType();
	public static final Type Node = new NodeType();
	public static final Type Window = new WindowType();
	public static final Type JQuery_FN = new JQueryFnType();
	public static final Type JQuery_Event = new JQueryEventType();
	
	public static Type find(String type) {
		Type[] types = new Type[]{
			Object, String, Number, Bool, Function, Array,
			Node, Window, 
			JQuery_FN, JQuery_Event
		};
		for (Type t: types) {
			if (t.accept(type))
				return t;
		}
		return null;
	}
	
	public static Type create(Type type) {
		Type t = new Type(type);
		return t;
	}
	
	public static Type create(String type) {
		Type t = new Type(type);
		return t;
	}
	
	private static 
	class SynonymsType extends Type {
		private Set<String> synonms = new HashSet<String>();
		private Set<String> synonmsIgnoreCase = new HashSet<String>();
		
		SynonymsType(String type) {
			super(type);
		}

		SynonymsType(Type type) {
			super(type);
		}
		
		public SynonymsType addSynonms(String... syns) {
			for (String syn: syns) {
				synonms.add(syn);
			}
			return this;
		}
		
		public SynonymsType addSynonmsIgnoreCase(String... syns) {
			for (String syn: syns) {
				synonmsIgnoreCase.add(syn);
			}
			return this;
		}

		@Override
		public boolean accept(String type) {
			if (super.accept(type)) return true;
			
			for (String syn: synonms) {
				if (syn.equals(type))
					return true;
			}
			
			for (String syn: synonmsIgnoreCase) {
				if (syn.equalsIgnoreCase(type))
					return true;
			}
			return false;
		}
	}
	
	private static 
	class ObjectType extends SynonymsType {
		public ObjectType() {
			super("?");
			this.addSynonmsIgnoreCase("object", "prototype");
			this.addSynonms("property", "attribute", "event", "?", "*");
		}
	}
	
	//String -> string
	private static 
	class StringType extends Type {
		public StringType() {
			super("string");
		}
	}
	
	//int -> number
	private static 
	class NumberType extends SynonymsType {
		public NumberType() {
			super("number");
			this.addSynonmsIgnoreCase("int", "integer", "long", "float");
		}
	}
	
	//boolean -> bool
	private static 
	class BoolType extends SynonymsType {
		public BoolType() {
			super("bool");
			this.addSynonmsIgnoreCase("Boolean");
		}
	}
	
	//Function -> fn()
	private static
	class FunctionType extends SynonymsType {
		public FunctionType() {
			super("fn()");
			this.addSynonms("Function");
		}
	}
	
	//Array -> [?]
	private static
	class ArrayType extends SynonymsType {
		public ArrayType() {
			super(Object);
			this.setArray(true);
			this.addSynonms("Array");
		}
	}
	
	//HTMLElement -> Node
	private static
	class NodeType extends SynonymsType {
		public NodeType() {
			super("Node");
			this.setInstance(true);
			this.addSynonms("HTMLElement");
		}
	}
	
	//Window -> window
	private static
	class WindowType extends Type {
		public WindowType() {
			super("window");
		}
	}
	
	//jQuery -> jQuery.fn
	private static
	class JQueryFnType extends SynonymsType {
		public JQueryFnType() {
			super("jQuery.fn");
			this.addSynonms("jQuery");
		}
	}
	
	//Event -> jQuery.Event
	private static
	class JQueryEventType extends SynonymsType {
		public JQueryEventType() {
			super("jQuery.Event");
			this.setInstance(true);
			this.addSynonms("Event");
		}
	}
}
