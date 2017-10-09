package com.bstek.dorado.cloudo.jseditor.iapi;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.StringReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.springframework.util.FileCopyUtils;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.xml.sax.InputSource;

import com.bstek.dorado.util.xml.DomUtils;

public abstract class AbstractJsdocArchiveService implements IJsdocArchiveService {

	private File baseDir;
	private String urlRoot = "http://nexus.bsdn.org/content/groups/public/";
	
	public AbstractJsdocArchiveService(File baseDir){
		super();
		this.baseDir = baseDir;
	}
	
	@Override
	public File getBaseDir() {
		return baseDir;
	}

	@Override
	public String getDownloadRootUrl() {
		return urlRoot;
	}
	
	public void setDownloadRootUrl(String urlRoot) {
		this.urlRoot = urlRoot;
	}

	@Override
	public URL url(Identity identity) {
		String group = identity.getGroup();
		String name = identity.getName();
		String version = identity.getVersion();
		String urlRoot = this.urlRoot;
		if (!urlRoot.endsWith("/")) {
			urlRoot += "/";
		}
		if (version.indexOf("SNAPSHOT") < 0) {
			String url = urlRoot + (group.replace('.', '/') + "/") + 
					    (name + "/") +
						(version + "/") + 
						(name + "-" + version + "-jsdoc.zip");
			try {
				return new URL(url);
			} catch (MalformedURLException e) {
				throw new IllegalArgumentException(url, e);
			}
		} else {
			String url = urlRoot + (group.replace('.', '/') + "/") + 
				    (name + "/") +
					(version + "/") + "maven-metadata.xml";
			try {
				URL URL = new URL(url);
				String meta = this.httpString(URL);
				if (meta != null) {
					DocumentBuilder documentBuilder = DocumentBuilderFactory.newInstance().newDocumentBuilder();
					StringReader reader = new StringReader(meta);
					InputSource inputSource = new InputSource(reader);
					Document document = documentBuilder.parse(inputSource);
					Element documentElement = document.getDocumentElement();
					Element versioning = DomUtils.getChildByTagName(documentElement, "versioning");
					Element snapshot = DomUtils.getChildByTagName(versioning, "snapshot");
					Element timestamp = DomUtils.getChildByTagName(snapshot, "timestamp");
					Element buildNumber = DomUtils.getChildByTagName(snapshot, "buildNumber");
					
					String x  = DomUtils.getTextContent(timestamp) + "-" + DomUtils.getTextContent(buildNumber);
					String newVersion = version.replace("SNAPSHOT", x);
					url = urlRoot + (group.replace('.', '/') + "/") + 
						    (name + "/") +
							(version + "/") + 
							(name + "-" + newVersion + "-jsdoc.zip");
					try {
						return new URL(url);
					} catch (MalformedURLException e) {
						throw new IllegalArgumentException(url, e);
					}
				}
			} catch (Exception e) {
				throw new RuntimeException(e);
			} 
			return null;
		}
	}

	@Override
	public Archive load(Identity identity) throws Exception {
		URL url = this.url(identity);
		if (url != null) {
			File tmpFile = this.tmpFile(identity, url);
			if (this.download(url, tmpFile)) {
				File file = realFile(tmpFile);
				if (file != null) {
					return new Archive(file);
				}
			}
		}
		
		return null;
	}

	protected String httpString(URL url) throws IOException {
		HttpURLConnection conn = (HttpURLConnection)url.openConnection();
		try {
			if (conn.getResponseCode() == HttpURLConnection.HTTP_OK) {
				InputStream input = conn.getInputStream();
				ByteArrayOutputStream output = new ByteArrayOutputStream();
		        FileCopyUtils.copy(input, output);
		        output.close();
		        return new String(output.toByteArray(), "UTF-8");
			}
			
			return null;
		} finally {
			conn.disconnect();
		}
	}
	
	protected boolean download(URL url, File file) throws IOException {
		HttpURLConnection conn = (HttpURLConnection)url.openConnection();
		try {
			if (conn.getResponseCode() == HttpURLConnection.HTTP_OK) {
				InputStream input = conn.getInputStream();
				OutputStream output = new FileOutputStream(file);
		        FileCopyUtils.copy(input, output);
		        output.close();
		        return true;
			}
			
			return false;
		} finally {
			conn.disconnect();
		}
	}
	
	protected abstract File tmpFile(Identity identity, URL url);
	protected abstract File realFile(File tmpFile);
}
