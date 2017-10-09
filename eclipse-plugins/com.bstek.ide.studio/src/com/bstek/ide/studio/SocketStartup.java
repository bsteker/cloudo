package com.bstek.ide.studio;

import org.eclipse.jface.preference.IPreferenceStore;
import org.eclipse.ui.IStartup;

import com.bstek.ide.studio.preferences.PreferenceConstants;
import com.bstek.ide.studio.protocol.MessageReceiver;
import com.bstek.ide.studio.socket.SocketService;


/**
 * @author matt.yao@bstek.com
 * @since 1.0.0
 */
public class SocketStartup implements IStartup {
	@Override
	public void earlyStartup() {
		IPreferenceStore store = Activator.getDefault().getPreferenceStore();
		int port = store.getInt(PreferenceConstants.SOCKET_NAME);
		SocketService service = SocketService.getInstance();
		service.setPort(port).setMessageHandler(new MessageReceiver())
				.startService();
	}

}
