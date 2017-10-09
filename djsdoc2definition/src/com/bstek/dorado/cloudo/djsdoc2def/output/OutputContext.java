package com.bstek.dorado.cloudo.djsdoc2def.output;

import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonGenerator.Feature;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.util.DefaultPrettyPrinter;

public class OutputContext {

	private Writer writer;
	private boolean usePrettyJson;
	private ObjectMapper objectMapper;
	private JsonGenerator jsonGenerator;

	public OutputContext() {
		this(new StringWriter());
	}
	
	private OutputContext(Writer writer) {
		this.writer = writer;
		this.objectMapper = new ObjectMapper();
		this.setUsePrettyJson(true);
	}

	public boolean isUsePrettyJson() {
		return usePrettyJson;
	}
	public void setUsePrettyJson(boolean usePrettyJson) {
		this.usePrettyJson = usePrettyJson;
	}
	
	public JsonGenerator getJsonGenerator() {
		if (jsonGenerator == null) {
			try {
				jsonGenerator = objectMapper.getJsonFactory().createJsonGenerator(writer);
				jsonGenerator.configure(Feature.ESCAPE_NON_ASCII, false);
				if (this.isUsePrettyJson()) {
					jsonGenerator.setPrettyPrinter(new DefaultPrettyPrinter());
				}
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		}
		return jsonGenerator;
	}

	public String getOutputString(){
		return writer.toString();
	}
}
