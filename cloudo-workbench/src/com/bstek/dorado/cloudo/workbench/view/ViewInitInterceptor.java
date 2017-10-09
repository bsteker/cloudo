package com.bstek.dorado.cloudo.workbench.view;

import org.apache.commons.lang.StringUtils;

import com.bstek.dorado.core.Configure;
import com.bstek.dorado.view.View;

public class ViewInitInterceptor {
	public static final String CLOUDO_SKIN = "dorado.cloudo.skin";

	public void onViewInit(View view) throws Exception {
		String packages=view.getPackages();
		if(!StringUtils.isEmpty(packages)){
			packages+=",";
		}else{
			packages="";
		}
		packages+="font-awesome,base-widget-desktop";
		view.setPackages(packages);
		view.setSkin(Configure.getString(CLOUDO_SKIN));
	}
}
