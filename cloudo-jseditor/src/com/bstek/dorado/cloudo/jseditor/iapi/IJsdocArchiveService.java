package com.bstek.dorado.cloudo.jseditor.iapi;

import java.io.File;
import java.net.URL;

public interface IJsdocArchiveService {
	File getBaseDir();
	String getDownloadRootUrl();
	URL url(Identity identity);
	
	Archive[] readyArchives();
	Archive lookup(Identity identity);
	Archive load(Identity identity) throws Exception;
	void asyncLoad(Identity identity);
	
	boolean shouldDownload(Identity identity);
}
