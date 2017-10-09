package com.bstek.ide.studio.socket;

import java.io.InputStream;
import java.io.Writer;

/**
 * @author matt.yao@bstek.com
 * @since 1.0.0
 */
public interface MessageHandler {

	public void messageReceived(Writer writer, InputStream reader,
			Object message);

}
