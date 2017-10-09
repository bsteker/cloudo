package com.bstek.ide.studio.actions;

import org.eclipse.core.resources.IResource;
import org.eclipse.jface.action.IAction;
import org.eclipse.jface.dialogs.MessageDialog;
import org.eclipse.jface.viewers.ISelection;
import org.eclipse.jface.viewers.StructuredSelection;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.ui.IObjectActionDelegate;
import org.eclipse.ui.IWorkbenchPart;

import com.bstek.ide.studio.protocol.Message;
import com.bstek.ide.studio.protocol.MessageType;

/**
 * @author matt.yao@bstek.com
 * @since 1.0.0
 */
public class OpenFileAction implements IObjectActionDelegate {

	private Shell shell;
	private ISelection selection;
	private IResource resource;

	public OpenFileAction() {
		super();
	}

	public void setActivePart(IAction action, IWorkbenchPart targetPart) {
		shell = targetPart.getSite().getShell();
	}

	public void run(IAction action) {
		Object object = ((StructuredSelection) this.selection)
				.getFirstElement();
		this.resource = ((IResource) object);
		if (this.resource == null) {
			return;
		}
		String location = this.resource.getLocation().toOSString();
		Message message = new Message(MessageType.openFile, location);
		boolean flag = message.send();
		if (!flag) {
			MessageDialog.openWarning(shell, "Message",
					"打开失败，请确认Studio是否已经正确启动。");
		}
	}

	public void selectionChanged(IAction action, ISelection selection) {
		this.selection = selection;
	}

}
