package com.bstek.ide.studio.protocol;

import java.io.File;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.resources.IWorkspace;
import org.eclipse.core.resources.IWorkspaceRoot;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.Path;
import org.eclipse.jface.viewers.StructuredSelection;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.ui.IEditorDescriptor;
import org.eclipse.ui.IPageLayout;
import org.eclipse.ui.IViewPart;
import org.eclipse.ui.IWorkbenchPage;
import org.eclipse.ui.IWorkbenchWindow;
import org.eclipse.ui.PartInitException;
import org.eclipse.ui.PlatformUI;
import org.eclipse.ui.ide.IDE;

/**
 * @author matt.yao@bstek.com
 * @since 1.0.0
 */
public class MessageReceiver extends MessageAdapter {

	@Override
	public void processMessage(Message message) {
		if (message.getType().equals(MessageType.fileChange)) {
			this.refreshWorkSpace(message);
		} else if (message.getType().equals(MessageType.showWindow)) {
			this.activeShell(message, false);
		} else if (message.getType().equals(MessageType.openFile)) {
			this.activeShell(message, true);
		}
	}

	/**
	 * 激活
	 */
	public void activeShell(Message message, boolean openFile) {
		final boolean showFile = openFile;
		final Message curretnMessage = message;
		PlatformUI.getWorkbench().getDisplay().asyncExec(new Runnable() {
			public void run() {
				IWorkbenchWindow window = PlatformUI.getWorkbench()
						.getActiveWorkbenchWindow();
				Shell shell = window.getShell();
				shell.forceActive();
				shell.setFocus();
				if (showFile) {
					openFile(curretnMessage);
				}
			}
		});
	}

	/**
	 * 打开文件
	 * 
	 * @param message
	 */
	public void openFile(Message message) {
		IWorkbenchWindow window = PlatformUI.getWorkbench()
				.getActiveWorkbenchWindow();
		IEditorDescriptor editorDescriptor = PlatformUI.getWorkbench()
				.getEditorRegistry().getDefaultEditor(message.getBody());
		IWorkbenchPage page = window.getActivePage();
		IWorkspace workspace = ResourcesPlugin.getWorkspace();
		try {
			IPath location = Path.fromOSString(message.getBody());
			IFile file = workspace.getRoot().getFileForLocation(location);
			IViewPart projectExplorerView = page
					.findView(IPageLayout.ID_PROJECT_EXPLORER);
			if (projectExplorerView != null) {
				projectExplorerView
						.getViewSite()
						.getSelectionProvider()
						.setSelection(
								new StructuredSelection(new Object[] { file }));
			}
			IViewPart packageExplorerView = page
					.findView("org.eclipse.jdt.ui.PackageExplorer");
			if (packageExplorerView != null) {
				packageExplorerView
						.getViewSite()
						.getSelectionProvider()
						.setSelection(
								new StructuredSelection(new Object[] { file }));
			}
			IDE.openEditor(page, file, editorDescriptor.getId(), true);
		} catch (PartInitException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 刷新
	 */
	public void refreshWorkSpace(Message message) {
		IWorkspaceRoot root = ResourcesPlugin.getWorkspace().getRoot();
		try {
			String workSpacePath = root.getLocation().toOSString();
			String body = message.getBody();
			if (body != null && body.toLowerCase().contains(workSpacePath.toLowerCase())) {
				body = body.substring(workSpacePath.length() + 1);
				String[] paths = body
						.split(File.separator.equals("\\") ? "\\\\" : "\\/");
				root.getProject(paths[0]).refreshLocal(
						IResource.DEPTH_INFINITE, null);
			} else {
				root.refreshLocal(IResource.DEPTH_INFINITE, null);
			}
		} catch (Exception e) {
			e.printStackTrace();
			try {
				root.refreshLocal(IResource.DEPTH_INFINITE, null);
			} catch (CoreException e1) {
				e1.printStackTrace();
			}
		}
	}
}
