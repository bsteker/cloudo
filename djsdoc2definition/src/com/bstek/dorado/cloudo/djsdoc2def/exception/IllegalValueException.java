package com.bstek.dorado.cloudo.djsdoc2def.exception;

public class IllegalValueException extends IllegalArgumentException implements IJsdoc2defException {

	private static final long serialVersionUID = 2013865312708906499L;

	private String name;
	private Object value;
	
	public IllegalValueException(String name, Object value) {
		super();
		this.name = name;
		this.value = value;
	}

	@Override
	public String getMessage() {
		return "illegal value of [" + name + "], it is [" + value + "]";
	}
}
