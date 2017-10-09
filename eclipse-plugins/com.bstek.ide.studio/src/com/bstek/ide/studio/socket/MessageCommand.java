package com.bstek.ide.studio.socket;

import java.io.IOException;

/**
 * @author matt.yao@bstek.com
 * @since 1.0.0
 */
public interface MessageCommand {

	public void execute(MessageContext context) throws IOException;

}
