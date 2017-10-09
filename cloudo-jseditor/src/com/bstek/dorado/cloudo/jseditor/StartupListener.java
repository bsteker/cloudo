package com.bstek.dorado.cloudo.jseditor;

import java.util.Collection;

import org.apache.commons.lang.StringUtils;

import com.bstek.dorado.cloudo.jseditor.iapi.IJsdocService;
import com.bstek.dorado.cloudo.jseditor.iapi.Identity;
import com.bstek.dorado.core.EngineStartupListener;
import com.bstek.dorado.core.pkgs.PackageInfo;
import com.bstek.dorado.core.pkgs.PackageManager;

public class StartupListener extends EngineStartupListener {

	private IJsdocService jsdocService;
	
	public IJsdocService getJsdocService() {
		return jsdocService;
	}
	public void setJsdocService(IJsdocService jsdocService) {
		this.jsdocService = jsdocService;
	}

	@Override
	public void onStartup() throws Exception {
		Collection<PackageInfo> packageInfos = PackageManager.getPackageInfoMap().values();
		for (PackageInfo pi: packageInfos) {
			String version = pi.getVersion();
			if (pi.isEnabled() && !StringUtils.isBlank(version)) {
				String group = "com.bstek.dorado";
				String name = pi.getName();
				version = this.validateVersion(version);
				
				Identity identity = Identity.create(group, name).setVersion(version);
				jsdocService.lookupArchive(identity);
			}
		}
	}
	
	private String validateVersion(String version) {
		String[] tokens = StringUtils.split(version, '.');
		if (tokens.length > 3) {
			String [] newTokens = new String[3];
			System.arraycopy(tokens, 0, newTokens, 0, 3);
			String newVersion = StringUtils.join(newTokens, '.');
			return newVersion;
		} else {
			return version;
		}
	}
	
}
