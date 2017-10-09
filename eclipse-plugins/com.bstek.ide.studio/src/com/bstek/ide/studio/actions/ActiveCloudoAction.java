package com.bstek.ide.studio.actions;

import org.eclipse.jface.action.IAction;
import org.eclipse.jface.dialogs.MessageDialog;
import org.eclipse.jface.viewers.ISelection;
import org.eclipse.ui.IWorkbenchWindow;
import org.eclipse.ui.IWorkbenchWindowActionDelegate;

import com.bstek.ide.studio.protocol.Message;
import com.bstek.ide.studio.protocol.MessageType;

/**
 * @author matt.yao@bstek.com
 * @since 1.0.0
 */
public class ActiveCloudoAction implements IWorkbenchWindowActionDelegate {

	private IWorkbenchWindow window;

	@Override
	public void run(IAction action) {
		Message message = new Message(MessageType.showWindow);
		boolean flag = message.send();
		if (!flag) {
			MessageDialog.openWarning(window.getShell(), "Message",
					"请求失败，请确认Studio是否已经正确启动。");
		}
	}

	@Override
	public void selectionChanged(IAction action, ISelection selection) {

	}

	@Override
	public void dispose() {

	}

	@Override
	public void init(IWorkbenchWindow window) {
		this.window = window;
	}

}
