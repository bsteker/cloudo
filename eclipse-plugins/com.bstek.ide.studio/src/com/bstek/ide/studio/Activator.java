package com.bstek.ide.studio;

import org.eclipse.core.resources.IResourceChangeEvent;
import org.eclipse.core.resources.IWorkspace;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.jface.resource.ImageDescriptor;
import org.eclipse.ui.plugin.AbstractUIPlugin;
import org.osgi.framework.BundleContext;

import com.bstek.ide.studio.resource.ResourceChangeListener;
import com.bstek.ide.studio.socket.SocketService;

/**
 * @author matt.yao@bstek.com
 * @since 1.0.0
 */
public class Activator extends AbstractUIPlugin {

	public static final String PLUGIN_ID = "com.bstek.ide.studio";

	private static Activator plugin;

	private ResourceChangeListener resourceChangeListener;

	public Activator() {
	}

	public void start(BundleContext context) throws Exception {
		super.start(context);
		plugin = this;
		resourceChangeListener = new ResourceChangeListener();
		IWorkspace workspace = getWorkspace();
		workspace.addResourceChangeListener(resourceChangeListener,
				IResourceChangeEvent.PRE_DELETE
						| IResourceChangeEvent.POST_CHANGE);
	}

	public void stop(BundleContext context) throws Exception {
		plugin = null;
		super.stop(context);
		IWorkspace workspace = getWorkspace();
		workspace.removeResourceChangeListener(resourceChangeListener);
		SocketService.getInstance().closeServer();
	}

	public static Activator getDefault() {
		return plugin;
	}

	public IWorkspace getWorkspace() {
		return ResourcesPlugin.getWorkspace();
	}

	public static ImageDescriptor getImageDescriptor(String path) {
		return imageDescriptorFromPlugin(PLUGIN_ID, path);
	}
}
