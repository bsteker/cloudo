package com.bstek.dorado.cloudo.djsdoc2def.jsdoc;

class Protocol {

	public static final String[] Symbol_Dictionary = new String[]{"data", "symbol-dictionary.js"};
	
	public static String[] symbol(String filePath) {
		return new String[]{"data", "symbols", filePath + ".js"};
	}
	
	public static final String Default_Encoding = "UTF-8";
	public static final String Default_Def_Config = "default-def.properties";
	
	public static final String Reserved_Name = "!name";
	public static final String Reserved_Group = "!group";
	public static final String Reserved_Version = "!version";
	public static final String Reserved_Proto = "!proto";
	public static final String Reserved_Effects = "!effects";
	public static final String Reserved_Events = "!events";
	public static final String Reserved_Extends = "!extends";
	
	public static final String Node_Properties = "properties";
	public static final String Node_Methods = "methods";
	public static final String Node_Params = "params";
	public static final String Node_Events = "events";
	
	public static final String Type_Object = "object";
	public static final String Type_Class = "class";
	
	public static final String Name = "name";
	public static final String Name_Global = "_global_";
	public static final String Name_Alias = "alias";
	public static final String Name_InheritsFrom = "inheritsFrom";
	public static final String Name_MemberOf = "memberOf";
	public static final String Name_IsStatic = "isStatic";
	public static final String Name_Visibility = "visibility";
	public static final String Name_Deprecated = "deprecated";
	public static final String Name_Type = "type";
	public static final String Name_IsOptional = "isOptional";
	public static final String Name_Returns = "returns";
	
	public static final String Value_Public = "public";
	public static final String Value_Obj = "obj";
	public static final String Value_Cls = "cls";
	
	public static final String Fn = "fn()";
	public static final String Fn_Prototype = "prototype";
	public static final String Fn_This = "!this";
	public static final String Fn_Ret = "!ret";
	public static final String Fn_ProtocolPrefix = "!custom:";
	public static final String Fn_DoradoGet = Fn_ProtocolPrefix + "doradoGet";
	
	public static final String Class_AttributeSupport = "dorado.AttributeSupport";
	public static final String Class_EntityList = "dorado.EntityList";
	
}
