package com.bstek.dorado.cloudo.web.service;

public interface IViewBooker {
	/**
	 * 以JSON格式读取一个view文件
	 * 
	 * @param viewPath
	 * @return
	 * @throws Exception
	 */
	public String read(String viewPath) throws Exception;

	/**
	 * 将json格式的view持久化成xml格式的view文件
	 * @param viewPath
	 * @throws Exception
	 */
	public void write(String viewPath, String viewJson) throws Exception;
}
