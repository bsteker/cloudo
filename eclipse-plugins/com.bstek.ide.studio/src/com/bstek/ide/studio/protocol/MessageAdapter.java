package com.bstek.ide.studio.protocol;

import java.io.InputStream;
import java.io.Writer;

import com.bstek.ide.studio.LogUtil;
import com.bstek.ide.studio.socket.MessageHandler;

/**
 * @author matt.yao@bstek.com
 * @since 1.0.0
 */
public abstract class MessageAdapter implements MessageHandler {

	@Override
	public void messageReceived(Writer writer, InputStream reader, Object obj) {
		String value = (String) obj;
		LogUtil.println("----Server received json is:" + value);
		Message message = null;
		try {
			message = Message.buildFromJSON(value);
		} catch (Exception e) {
			e.printStackTrace();
			LogUtil.warning("Received error message from client : " + value);
		}
		if (message != null) {
			this.processMessage(message);
		}
	}

	public abstract void processMessage(Message message);

}
