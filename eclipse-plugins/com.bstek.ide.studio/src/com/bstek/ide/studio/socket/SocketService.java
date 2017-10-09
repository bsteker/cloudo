package com.bstek.ide.studio.socket;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.net.ServerSocket;
import java.net.Socket;

import com.bstek.ide.studio.LogUtil;
import com.bstek.ide.studio.protocol.MessageReceiver;

/**
 * @author matt.yao@bstek.com
 * @since 1.0.0
 */
public class SocketService {

	public static final int DEFALUT_SOCKET_PORT = 5100;
	public static final String MESSAGE_END_FLAG = "#?!end!?#";
	public static final String MESSAGE_CHARSET_NAME = "UTF-8";

	private ServerSocket server = null;
	private Socket socket = null;
	private Writer writer = null;
	private InputStream reader = null;
	private boolean destroyed;
	private MessageHandler messageHandler;
	private int port = DEFALUT_SOCKET_PORT;

	private SocketService() {

	}

	private static class SocketServiceHolder {
		private static final SocketService instance = new SocketService();
	}

	public static SocketService getInstance() {
		return SocketServiceHolder.instance;
	}

	public static void main(String[] args) {
		SocketService service = SocketService.getInstance();
		service.setMessageHandler(new MessageReceiver()).startService();
	}

	public SocketService setMessageHandler(MessageHandler messageHandler) {
		this.messageHandler = messageHandler;
		return this;
	}

	public SocketService setPort(int port) {
		this.port = port;
		return this;
	}

	public int getPort() {
		return this.port;
	}

	public boolean writeMessage(MessageCommand command) {
		if (writer != null && socket != null && command != null) {
			try {
				command.execute(new MessageContext() {
					@Override
					public Writer getMessageWriter() {
						return writer;
					}
				});
				return true;
			} catch (IOException e) {
				writer = null;
				return false;
			}
		}
		return false;
	}

	public void startService() {
		try {
			destroyed = false;
			server = new ServerSocket(getPort());
			LogUtil.println("***Initialize Dorado Cloduo Plugins Socket Server On Port "
					+ server.getLocalPort() + "***");
		} catch (IOException e) {
			e.printStackTrace();
			LogUtil.error(e.getMessage());
		}
		if (server != null) {
			this.innerExecuteSocket(server);
		}
		LogUtil.println("***Close Dorado Cloduo Plugins Socket Server***");
	}

	public void closeServer() {
		destroyed = true;
		try {
			if (socket != null) {
				socket.close();
				socket = null;
			}
			if (server != null) {
				server.close();
				server = null;
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private void innerExecuteSocket(ServerSocket server) {
		try {
			LogUtil.println("--waiting client come in....");
			socket = server.accept();
			LogUtil.println("--new client coming in..." + socket);
			writer = new OutputStreamWriter(socket.getOutputStream(),
					SocketService.MESSAGE_CHARSET_NAME);
			reader = socket.getInputStream();
			byte[] tempBytes;
			while (!destroyed) {
				tempBytes = new byte[2048];
				int endFlag = reader.read(tempBytes);
				String value = new String(tempBytes,
						SocketService.MESSAGE_CHARSET_NAME);
				int index = value.indexOf(SocketService.MESSAGE_END_FLAG);
				if (index != -1) {
					value = value.substring(0, index);
					if (messageHandler != null) {
						messageHandler.messageReceived(writer, reader, value);
					}
				}
				if (endFlag == -1) {
					break;
				}
			}
		} catch (IOException e1) {
			LogUtil.println("--server received exception:" + e1.getMessage());
		} finally {
			LogUtil.println("--client is dead...");
			this.attemptResetSocket();
		}

	}

	private void attemptResetSocket() {
		try {
			if (writer != null) {
				writer.close();
				writer = null;
			}
			if (reader != null) {
				reader.close();
				reader = null;
			}
			if (socket != null) {
				socket.close();
				socket = null;
			}
			if (destroyed) {
				if (server != null) {
					server.close();
					server = null;
				}
			} else {
				this.innerExecuteSocket(server);
			}
		} catch (IOException e) {
			if (!destroyed) {
				this.innerExecuteSocket(server);
			}
		}
	}

}
