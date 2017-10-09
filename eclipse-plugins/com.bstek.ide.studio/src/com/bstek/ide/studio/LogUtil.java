package com.bstek.ide.studio;

import org.eclipse.core.runtime.IStatus;
import org.eclipse.core.runtime.Status;

/**
 * @author matt.yao@bstek.com
 * @since 1.0.0
 */
public class LogUtil {
	public static void error(String message) {
		Activator
				.getDefault()
				.getLog()
				.log(new Status(IStatus.ERROR, Activator.PLUGIN_ID, "Error: "
						+ message));
	}

	public static void info(String message) {
		Activator.getDefault().getLog()
				.log(new Status(IStatus.INFO, Activator.PLUGIN_ID, message));
	}

	public static void ok(String message) {
		Activator.getDefault().getLog()
				.log(new Status(IStatus.OK, Activator.PLUGIN_ID, message));
	}

	public static void warning(String message) {
		Activator
				.getDefault()
				.getLog()
				.log(new Status(IStatus.WARNING, Activator.PLUGIN_ID,
						"Warning: " + message));
	}

	public static void println(Object message) {
		System.out.println(message);
	}

	public static void print(Object message) {
		System.out.print(message);
	}
}
