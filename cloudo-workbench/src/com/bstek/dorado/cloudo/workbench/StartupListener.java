package com.bstek.dorado.cloudo.workbench;

import com.bstek.dorado.core.Context;
import com.bstek.dorado.core.EngineStartupListener;

public class StartupListener extends EngineStartupListener {

	public void onStartup() throws Exception {
		Context doradoContext = Context.getCurrent();

		IFileExplorer fileController;
	
		try {
			fileController = (IFileExplorer) doradoContext
					.getServiceBean("cloudo.FileExplorer");
		} catch (Exception e) {
			fileController = new DefaultFileExplorer();
		}

		IDEContext.setFileExplorer(fileController);
	}

}
