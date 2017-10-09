package com.bstek.dorado.cloudo.workbench;

import java.util.List;

import com.bstek.dorado.cloudo.workbench.entity.FileEntity;

public interface IFileExplorer {
	/**
	 * 
	 * 获得子文件列表
	 * 
	 * @param path
	 * @return
	 * @throws Exception
	 */
	public List<FileEntity> getChildren(String path) throws Exception;

	/**
	 * 新建文件
	 * 
	 * @param parentPath 父文件夹路径
	 * @param name 文件名
	 * @param templateName 文件mode主要用于新建文件时的文件模板
	 * 		{
	 * 		.view.xml:dorado_view	
	 *		.touch.xml:dorado_touch
	 *		.model.xml:doradi_model
	 *		}
	 * @return
	 * @throws Exception
	 */
	public FileEntity newFile(String parentPath, String name, String templateName)
			throws Exception;

	/**
	 * 创建文件夹
	 * 
	 * @param parentPath
	 * @param name
	 * @return
	 * @throws Exception
	 */
	public FileEntity mkdir(String parentPath, String name) throws Exception;

	/**
	 * 删除文件
	 * 
	 * @param path
	 * @throws Exception
	 */
	public void remove(String path) throws Exception;

	/**
	 * 判断文件是否存在
	 * 
	 * @param parentPath
	 * @param name
	 * @return
	 * @throws Exception
	 */
	public boolean exists(String parentPath, String name) throws Exception;

	/**
	 * 读取文件内容
	 * 
	 * @param data
	 * @param path
	 * @throws Exception
	 */
	public String readFile(String path) throws Exception;

	/**
	 * 写文件
	 * 
	 * @param data
	 * @param path
	 * @throws Exception
	 */
	public void writeFile(String data, String path) throws Exception;

}
