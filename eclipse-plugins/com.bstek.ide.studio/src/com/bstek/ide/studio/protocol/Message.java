package com.bstek.ide.studio.protocol;

import com.alibaba.fastjson.JSON;
import com.bstek.ide.studio.LogUtil;
import com.bstek.ide.studio.socket.SocketService;

/**
 * @author matt.yao@bstek.com
 * @since 1.0.0
 */
public class Message implements java.io.Serializable {

	private static final long serialVersionUID = 1L;
	public static final String VERSION = "0.0.1";
	private MessageType type;
	private String body;
	private MessageSource from;
	private String version = VERSION;

	public Message() {

	}

	public Message(MessageType type) {
		this.type = type;
		this.body = "";
		this.from = MessageSource.eclipse;
	}

	public Message(MessageType type, String body) {
		this.type = type;
		this.body = body;
		this.from = MessageSource.eclipse;
	}

	public Message(MessageType type, String body, MessageSource from) {
		this.type = type;
		this.body = body;
		this.from = from;
	}

	public Message(MessageType type, String body, MessageSource from,
			String version) {
		this.type = type;
		this.body = body;
		this.from = from;
		this.version = version;
	}

	public String toJSON() {
		return JSON.toJSONString(this);
	}

	public static Message buildFromJSON(String jsonValue) {
		return JSON.parseObject(jsonValue, Message.class);
	}

	public boolean send() {
		boolean flag = SocketService.getInstance().writeMessage(
				new MessageWriter(this));
		LogUtil.println("----Send message is successfull ? " + flag);
		return flag;
	}

	public MessageType getType() {
		return type;
	}

	public void setType(MessageType type) {
		this.type = type;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public MessageSource getFrom() {
		return from;
	}

	public void setFrom(MessageSource from) {
		this.from = from;
	}

	@Override
	public String toString() {
		return "Message [type=" + type + ", body=" + body + ", from=" + from
				+ ", version=" + version + "]";
	}

	

}
