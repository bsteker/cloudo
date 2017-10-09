package com.bstek.dorado.cloudo.djsdoc2def.jsdoc;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;

public abstract class AbstractFn<P extends AbstractFnParameter> extends Obj {
	private Alias alias;
	private List<P> parameters = new ArrayList<P>(3);
	private ReturnValue returnValue;
	
	//Function的一个返回值
	public static class ReturnValue extends Atom {
		public static final ReturnValue THIS = new ReturnValue(Types.create(Protocol.Fn_This));
		public static final ReturnValue RETURN_VALUE = new ReturnValue(Types.create(Protocol.Fn_Ret));
		
		public static final ReturnValue PARAM0 = new ReturnValue(Types.create("!0"));
		public static final ReturnValue PARAM1 = new ReturnValue(Types.create("!1"));
		public static final ReturnValue PARAM2 = new ReturnValue(Types.create("!2"));
		
		private Type type;
		
		public ReturnValue(Type type) {
			super();
			this.type = type;
			this.setType(type.toDefinitionExprission());
		}
		
		public ReturnValue create(String type) {
			String sType = this.type.getType() + "." + type;
			Type t = Types.create(sType);
			return new ReturnValue(t);
		}
		
		public ReturnValue create(ReturnValue rv) {
			return this.create(rv.getType());
		}
		
		public String getTypeDefinitionExprission() {
			return type.toDefinitionExprission();
		}
		
		@Override
		public boolean isValidated(BuildContext context) {
			String type = this.type.getType();
			return context.isType(type);
		}
		
		@Override
		public String validateMessage(BuildContext context) {
			String type = this.type.getType();
			
			List<String> messages = new ArrayList<String>(2);
			if (!context.isType(type)) {
				messages.add(type);
			}
			
			if (messages.size() > 0) {
				String m = StringUtils.join(messages, ',');
				return m;
			} else {
				return null;
			}
		}
	}
	
	public Alias getAlias() {
		return alias;
	}
	public void setAlias(Alias alias) {
		this.alias = alias;
	}
	
	/* 参数 */
	public List<P> getParameters() {
		return parameters;
	}
	public void addParameter(P parameter) {
		parameters.add(parameter);
	}
	abstract public P addParameter(String name);
	
	/* 返回值 */
	public ReturnValue getReturnValue() {
		return returnValue;
	}
	public void setReturnValue(ReturnValue returnValue) {
		this.returnValue = returnValue;
	}
	public ReturnValue setReturnValue(Type type) {
		ReturnValue rv = new ReturnValue(type);
		this.setReturnValue(rv);
		return rv;
	}
	
	@Override
	public boolean isValidated(BuildContext context) {
		for (P parameter: this.getParameters()) {
			if (!parameter.isValidated(context)) 
				return false;
		}
		ReturnValue returnValue = this.getReturnValue();
		if (returnValue != null) {
			if (!returnValue.isValidated(context)) 
				return false;
		}
		return true;
	}
	
	@Override
	public String validateMessage(BuildContext context) {
		List<String> messages = new ArrayList<String>(2);
		for (int i=0; i<this.getParameters().size(); i++) {
			P parameter = this.getParameters().get(i);
			String m = parameter.validateMessage(context);
			messages.add(m);
		}
		
		ReturnValue returnValue = this.getReturnValue();
		if (returnValue != null) {
			String m = returnValue.validateMessage(context);
			messages.add(m);
		}
		
		if (messages.size() > 0) {
			String type = this.getType();
			if (type != null) {
				return type + " >> " + StringUtils.join(messages, ';');
			} else {
				return StringUtils.join(messages, ';');
			}
		}
		return null;
	}
	
}
