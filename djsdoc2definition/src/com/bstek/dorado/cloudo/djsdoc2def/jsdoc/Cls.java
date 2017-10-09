package com.bstek.dorado.cloudo.djsdoc2def.jsdoc;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.codehaus.jackson.JsonGenerator;

import com.bstek.dorado.cloudo.djsdoc2def.output.AbstractField;
import com.bstek.dorado.cloudo.djsdoc2def.output.OutputContext;
import com.bstek.dorado.cloudo.djsdoc2def.output.StringArrayField;

/**
 * 在jsdoc中对应于一个Class的定义。具有prototype。
 * 
 * @author TD
 *
 */
public class Cls extends Obj {

	private static final String DEFAULT_TYPE = Protocol.Fn;
	private Map<String,Event> events = new LinkedHashMap<String,Event>();
	private StringArrayField _extends_ = new StringArrayField(Protocol.Reserved_Extends);
	private Prototype prototype = new Prototype();
	
	public Cls() {
		super();
		this.setType(DEFAULT_TYPE);
	}
	
	@Override
	public AbstractField<?>[] getOutputFilelds() {
		AbstractField<?>[] superFields = super.getOutputFilelds();
		AbstractField<?>[] fields = this.appendFields(superFields, _extends_);
		return fields;
	}
	
	public Prototype setPrototype(String super_) {
		prototype.setSuper(super_);
		return prototype;
	}
	public Prototype getPrototype() {
		return prototype;
	}
	
	public String[] getExtends() {
		return _extends_.getValue();
	}
	public void setExtends(String...strings) {
		_extends_.setValue(strings);
	}
	
	public Map<String, Event> getEvents() {
		return events;
	}
	public void setEvents(Map<String, Event> events) {
		this.events = events;
	}
	public void addEvent(String name, Event event) {
		this.events.put(name, event);
	}
	
	@Override
	protected void doOutput(OutputContext context) throws Exception {
		super.doOutput(context);
		this.outputEvents(context);
		this.outputPrototype(context);
	}
	
	private void outputEvents(OutputContext context) throws Exception {
		if (events.isEmpty()) return;
		
		Obj events = new Obj();
		for (String name: this.events.keySet()) {
			Event event = this.events.get(name);
			Obj arg = new Obj();
			List<EventParameter> parameters = event.getParameters();
			for (EventParameter parameter: parameters) {
				String ptype = parameter.getType();
				String pname = parameter.getName();
				if (pname.startsWith("arg.")) {
					Obj p = new Obj();
					p.setType(ptype);
					arg.set(pname.substring(4), p);
				}
			}
			event.set("!arg", arg);
			events.set(name, event);
		}
		
		JsonGenerator jsonGenerator = context.getJsonGenerator();
		jsonGenerator.writeFieldName(Protocol.Reserved_Events);
		events.output(context);
	}
	
	private void outputPrototype(OutputContext context) throws Exception {
		if (prototype != null && !prototype.isEmpty()) {
			JsonGenerator jsonGenerator = context.getJsonGenerator();
			jsonGenerator.writeFieldName(Protocol.Fn_Prototype);
			prototype.output(context);
		}
	}

	@Override
	public boolean isValidated(BuildContext context) {
		if (!super.isValidated(context)) return false;
		
		String[] ex = this.getExtends();
		if (ex != null && ex.length > 0) {
			for (String x: ex) {
				if (!context.isType(x)) {
					context.toType(x);
					return false;
				}
			}
		}
		return true;
	}
	
	@Override
	public String validateMessage(BuildContext context) {
		List<String> messages = new ArrayList<String>();
		String[] ex = this.getExtends();
		if (ex != null && ex.length > 0) {
			for (String x: ex) {
				if (!context.isType(x)) {
					messages.add(x);
				}
			}
		}
		
		if (!messages.isEmpty()) {
			return StringUtils.join(messages, ';');
		} else {
			return null;
		}
	}
}
