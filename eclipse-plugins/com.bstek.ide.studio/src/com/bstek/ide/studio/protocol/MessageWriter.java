package com.bstek.ide.studio.protocol;

import java.io.IOException;
import java.io.Writer;

import com.bstek.ide.studio.LogUtil;
import com.bstek.ide.studio.socket.MessageCommand;
import com.bstek.ide.studio.socket.MessageContext;
import com.bstek.ide.studio.socket.SocketService;

/**
 * @author matt.yao@bstek.com
 * @since 1.0.0
 */
public class MessageWriter implements MessageCommand {
	private Message message = null;

	public MessageWriter() {
	}

	public MessageWriter(Message message) {
		this.message = message;
	}

	@Override
	public void execute(MessageContext context) throws IOException {
		Writer writer = context.getMessageWriter();
		writer.write(message.toJSON() + SocketService.MESSAGE_END_FLAG);
		writer.flush();
		LogUtil.println("----Prepare for send client value " + message);
	}

}
