package com.bstek.ide.studio.preferences;

import org.eclipse.core.runtime.preferences.AbstractPreferenceInitializer;
import org.eclipse.jface.preference.IPreferenceStore;

import com.bstek.ide.studio.Activator;
import com.bstek.ide.studio.socket.SocketService;

/**
 * @author matt.yao@bstek.com
 * @since 1.0.0
 */
public class PreferenceInitializer extends AbstractPreferenceInitializer {

	public void initializeDefaultPreferences() {
		IPreferenceStore store = Activator.getDefault().getPreferenceStore();
		store.setDefault(PreferenceConstants.SOCKET_NAME,
				SocketService.DEFALUT_SOCKET_PORT);
	}

}
