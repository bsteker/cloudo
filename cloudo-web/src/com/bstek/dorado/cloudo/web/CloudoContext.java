package com.bstek.dorado.cloudo.web;

import com.bstek.dorado.cloudo.web.service.IViewBooker;

public class CloudoContext {
	private static IViewBooker viewBooker;

	public static IViewBooker getViewBooker() {
		return viewBooker;
	}

	public static void setViewBooker(IViewBooker viewBooker) {
		CloudoContext.viewBooker = viewBooker;
	}

}
