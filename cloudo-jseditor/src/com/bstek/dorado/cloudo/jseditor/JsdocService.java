package com.bstek.dorado.cloudo.jseditor;

import java.io.File;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.codehaus.jackson.JsonNode;

import com.bstek.dorado.cloudo.jseditor.iapi.Alias;
import com.bstek.dorado.cloudo.jseditor.iapi.Archive;
import com.bstek.dorado.cloudo.jseditor.iapi.IJsdocArchiveService;
import com.bstek.dorado.cloudo.jseditor.iapi.IJsdocService;
import com.bstek.dorado.cloudo.jseditor.iapi.Identity;
import com.bstek.dorado.cloudo.jseditor.iapi.JsdocArchiveService;

public class JsdocService implements IJsdocService {
	private final Log logger = LogFactory.getLog(getClass());
	private IJsdocArchiveService jsdocArchiveService;
	
	public JsdocService() {
		super();
	}
	
	public IJsdocArchiveService getJsdocArchiveService(){
		return jsdocArchiveService;
	}
	public void setJsdocArchiveService(IJsdocArchiveService jsdocArchiveService) {
		this.jsdocArchiveService = jsdocArchiveService;
	}

	@Override
	public JsonNode lookupDefinition(Alias alias) {
		if (jsdocArchiveService != null) {
			Archive[] archives = jsdocArchiveService.readyArchives();
			for (Archive archive: archives) {
				JsonNode node = alias.definition(archive);
				if (node != null) return node;
			}
		}
		
		return null;
	}

	@Override
	public Archive lookupArchive(Identity identity) {
		if (jsdocArchiveService != null) {
			Archive archive = jsdocArchiveService.lookup(identity);
			if (archive == null) {
				jsdocArchiveService.asyncLoad(identity);
				return null;
			} else {
				return archive;
			}
		}
		return null;
	}
	
	public void setArchiveDir(File baseDir) {
		logger.info("JSDOC: " + baseDir.getAbsolutePath());
		if (baseDir.exists()) {
			this.jsdocArchiveService = new JsdocArchiveService(baseDir);
		}
	}
}
