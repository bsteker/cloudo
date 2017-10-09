package com.bstek.ide.studio.preferences;

import org.eclipse.jface.dialogs.MessageDialog;
import org.eclipse.jface.preference.FieldEditorPreferencePage;
import org.eclipse.jface.preference.IPreferenceStore;
import org.eclipse.jface.preference.StringFieldEditor;
import org.eclipse.ui.IWorkbench;
import org.eclipse.ui.IWorkbenchPreferencePage;

import com.bstek.ide.studio.Activator;

/**
 * @author matt.yao@bstek.com
 * @since 1.0.0
 */
public class PreferencePage extends FieldEditorPreferencePage implements
		IWorkbenchPreferencePage {
	private StringFieldEditor socketPortFieldEditor;
	private String title = "Message";

	public PreferencePage() {
		super(GRID);
		noDefaultAndApplyButton();
		setPreferenceStore(Activator.getDefault().getPreferenceStore());
	}

	public void createFieldEditors() {
		socketPortFieldEditor = new StringFieldEditor(
				PreferenceConstants.SOCKET_NAME, "Socket端口号:",
				getFieldEditorParent());
		addField(socketPortFieldEditor);
	}

	@Override
	public boolean performOk() {
		int value = -1;
		try {
			value = Integer.valueOf(socketPortFieldEditor.getStringValue());
			if (value < 1 || value > 65535) {
				throw new Exception("error port");
			}
		} catch (Exception e) {
			MessageDialog.openWarning(this.getShell(), title, "Socket端口号不正确。");
			return false;
		}
		IPreferenceStore store = getPreferenceStore();
		store.setValue(PreferenceConstants.SOCKET_NAME, value);
		MessageDialog
				.openInformation(this.getShell(), title, "Eclipse重启后才能生效。");
		return true;
	}

	public void init(IWorkbench workbench) {

	}

}