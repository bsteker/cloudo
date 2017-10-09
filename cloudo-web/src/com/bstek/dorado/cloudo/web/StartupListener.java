package com.bstek.dorado.cloudo.web;

import com.bstek.dorado.cloudo.web.service.DefaultViewBooker;
import com.bstek.dorado.cloudo.web.service.IViewBooker;
import com.bstek.dorado.core.Context;
import com.bstek.dorado.core.EngineStartupListener;
import com.bstek.dorado.vidorsupport.iapi.IViewReader;
import com.bstek.dorado.vidorsupport.iapi.IViewWriter;

public class StartupListener extends EngineStartupListener {

	public void onStartup() throws Exception {
		Context doradoContext = Context.getCurrent();
		IViewBooker viewBooker;
		try {
			viewBooker = (IViewBooker) doradoContext
					.getServiceBean("cloudo.ViewBooker");
		} catch (Exception e) {
			DefaultViewBooker defaultViewBooker = new DefaultViewBooker();
			defaultViewBooker.setViewReader((IViewReader) doradoContext
					.getServiceBean("vidor.viewReader"));
			defaultViewBooker.setViewWriter((IViewWriter) doradoContext
					.getServiceBean("vidor.viewWriter"));
			viewBooker = defaultViewBooker;
		}
		CloudoContext.setViewBooker(viewBooker);
	}

}
