package com.bstek.ide.studio.resource;

import org.eclipse.core.resources.IResourceChangeEvent;
import org.eclipse.core.resources.IResourceChangeListener;

/**
 * @author matt.yao@bstek.com
 * @since 1.0.0
 */
public class ResourceChangeListener implements IResourceChangeListener {

	@Override
	public void resourceChanged(IResourceChangeEvent arg0) {
		
	}
	
	/*
	public void resourceChanged(IResourceChangeEvent event) {
		if (event.getType() != IResourceChangeEvent.POST_CHANGE) {
			return;
		}
		IResourceDelta rootDelta = event.getDelta();
		if (rootDelta == null) {
			return;
		}
		new Message(MessageType.fileChange).send();
	}*/
	
	
}
