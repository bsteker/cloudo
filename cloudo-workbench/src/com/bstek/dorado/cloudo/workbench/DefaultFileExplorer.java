package com.bstek.dorado.cloudo.workbench;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;

import com.bstek.dorado.annotation.DataProvider;
import com.bstek.dorado.annotation.Expose;
import com.bstek.dorado.cloudo.workbench.entity.FileEntity;
import com.bstek.dorado.cloudo.workbench.util.CreateFileUtils;
import com.bstek.dorado.core.Configure;

public class DefaultFileExplorer implements IFileExplorer {
	private String getWorkspace() {
		String workspace = Configure.getString("dorado.cloudo.workspace");
		return workspace.replaceAll("file:", "");
	}

	private FileEntity toFileEntity(File file) {
		FileEntity entity = new FileEntity();
		entity.setDirectory(file.isDirectory());
		entity.setPath(file.getPath());
		entity.setName(file.getName());
		entity.setMd5(file.toURI().toString().replaceAll("/", "."));
		return entity;
	}

	private boolean isHidden(String fileName) {
		String reg = "^(\\.)(.*)";
		Pattern pattern = Pattern.compile(reg);
		return pattern.matcher(fileName).matches();
	}

	@DataProvider
	public List<FileEntity> getChildren(String path)
			throws MalformedURLException, IOException {

		String workspace = this.getWorkspace();
		String parentPath = StringUtils.isEmpty(path) ? workspace : path;
		List<FileEntity> files = new ArrayList<FileEntity>();
		for (File file : new File(parentPath).listFiles()) {
			String fileName = file.getName();
			if (!isHidden(fileName)) {
				files.add(toFileEntity(file));
			}
		}

		return files;
	}

	@Expose
	public FileEntity newFile(String path, String name, String mode)
			throws Exception {
		File file = CreateFileUtils.create(path, name, mode);
		return toFileEntity(file);
	}

	@Expose
	public FileEntity mkdir(String path, String name) {
		File file = new File(path + File.separator + name);
		if (!file.exists()) {
			file.mkdir();
		}

		return toFileEntity(file);
	}

	@Expose
	public void remove(String path) {
		File file = new File(path);
		if (file.isDirectory()) {
			for (File sFile : file.listFiles()) {
				remove(sFile.getPath());
			}
		}
		file.delete();
	}

	@Expose
	public boolean exists(String path, String name) {
		String filePath = path;

		if (!StringUtils.isEmpty(name)) {
			filePath += File.separator + name;
		}

		File file = new File(filePath);
		return file.exists();
	}

	@Expose
	public void writeFile(String data, String path) throws Exception {
		FileUtils.writeStringToFile(new File(path), data);
	}

	@Override
	public String readFile(String path) throws Exception {
		File file = new File(path);
		return FileUtils.readFileToString(file);
	}

}
