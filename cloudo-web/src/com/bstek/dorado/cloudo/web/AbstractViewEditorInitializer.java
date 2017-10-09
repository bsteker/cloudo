package com.bstek.dorado.cloudo.web;

import java.util.HashMap;
import java.util.Map;

import com.bstek.dorado.core.Configure;
import com.bstek.dorado.vidorsupport.service.InitSupport;
import com.bstek.dorado.view.View;

public abstract class AbstractViewEditorInitializer extends InitSupport {
	public static final String CLOUDO_INIT_DATA_KEY = "initData";
	public static final String CLOUDO_INIT_DATA_SETTINGS_KEY = "settings";
	public static final String CLOUDO_SKIN = "dorado.cloudo.skin";
	
	public static final String SAVE_VIEW_SERVICE = "dorado.cloudo.ViewEditorService#save";

	public void onViewInit(View view) throws Exception {
		Map<String, Object> userData = new HashMap<String, Object>();
		Map<String, Object> initData = this.buildInitData();
		@SuppressWarnings("unchecked")
		Map<String, Object> settings = (Map<String, Object>) initData
				.get(CLOUDO_INIT_DATA_SETTINGS_KEY);
		settings.put("saveViewService", SAVE_VIEW_SERVICE);
		initData.put(CLOUDO_INIT_DATA_SETTINGS_KEY, settings);
		userData.put(AbstractViewEditorInitializer.CLOUDO_INIT_DATA_KEY,
				initData);
		view.setUserData(userData);
		view.setSkin(Configure.getString(CLOUDO_SKIN));
	}

	protected abstract Map<String, Object> buildInitData() throws Exception;
}
