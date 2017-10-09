package com.bstek.dorado.cloudo.jseditor.iapi;

import java.io.File;
import java.net.URL;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class JsdocArchiveService extends AbstractJsdocArchiveService {
	private Set<Identity> identities = new LinkedHashSet<Identity>();
	private Map<Identity, Archive> readyArchives = new HashMap<Identity, Archive>();
	protected Set<Identity> downloadingIdentities = new LinkedHashSet<Identity>();

	private Object identitiesLock = new Object();
	
	private final Log logger = LogFactory.getLog(getClass());
	
	public JsdocArchiveService(File baseDir) {
		super(baseDir);
		this.initRespostory();
	}

	public Archive[] readyArchives() {
		return readyArchives.values().toArray(new Archive[0]);
	}
	
	@Override
	public Archive lookup(Identity identity) {
		synchronized (identitiesLock) {
			Archive archive = readyArchives.get(identity);
			return archive;
		}
	}
	
	@Override
	public boolean shouldDownload(Identity identity) {
		synchronized (identitiesLock) {
			return !identities.contains(identity) && !downloadingIdentities.contains(identity);
		}
	}
	
	protected void initRespostory() {
		File dir = this.getArchiveDir();
		dir.mkdirs();
		
		File[] files = dir.listFiles();
		for (File file: files) {
			if (!file.isFile()) continue;
			
			String fileName = file.getName();
			String[] tokens = StringUtils.split(fileName, '^');
			if (tokens.length == 4) {
				String group = tokens[0];
				String name = tokens[1];
				String version = tokens[2];
				Identity identity = Identity.create(group, name, version);
				Archive archive = new Archive(file);
				readyArchives.put(identity, archive);
			}
		}
	}
	
	@Override
	protected File tmpFile(Identity identity, URL url) {
		File dir = this.getDownloadDir();
		dir.mkdirs();
		String path = url.getPath();
		int i = path.lastIndexOf("/");
		String fileName = "~" + identity.getGroup() + "^" + 
				identity.getName() + "^" + 
				identity.getVersion() + "^" + 
				path.substring(i + 1);
		return new File(dir, fileName);
	}
	
	@Override
	protected File realFile(File tmpFile) {
		File dir = this.getArchiveDir();
		dir.mkdirs();
		File file = new File(dir, tmpFile.getName().substring(1));
		if (!tmpFile.renameTo(file)) {
			file.delete();
			tmpFile.renameTo(file);
		}
		if (!file.exists()) {
			file = tmpFile;
		}
		return file;
	}

	protected File getDownloadDir() {
		File baseDir = this.getBaseDir();
		File downloadDir = new File(baseDir, "download");
		return downloadDir;
	}
	
	protected File getArchiveDir(){
		File baseDir = this.getBaseDir();
		File dir = new File(baseDir, "archive");
		return dir;
	}
	
	@Override
	public Archive load(Identity identity) throws Exception {
		if (!this.shouldDownload(identity)) return null;
		
		synchronized (identitiesLock) {
			downloadingIdentities.add(identity);
		}
		
		try {
			Archive archive = super.load(identity);
			if (archive != null) {
				synchronized (identitiesLock) {
					readyArchives.put(identity, archive);
					identities.add(identity);
				}
			}
			return archive;
		} finally {
			synchronized (identitiesLock) {
				downloadingIdentities.remove(identity);
			}
		}
	}
	
	@Override
	public void asyncLoad(final Identity identity) {
		new Thread() {
			@Override
			public void run() {
				try {
					load(identity);
				} catch (Exception e) {
					logger.error("load [" + identity + "]", e);
				}
			}
		}.start();
	}

}
