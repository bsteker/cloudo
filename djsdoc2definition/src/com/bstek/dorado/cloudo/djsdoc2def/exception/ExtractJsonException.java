package com.bstek.dorado.cloudo.djsdoc2def.exception;

import java.io.File;

public class ExtractJsonException extends IllegalArgumentException implements IJsdoc2defException {

	private static final long serialVersionUID = 1244139241076798751L;

	public ExtractJsonException(File file, Throwable cause) {
		super("error when extract json [" + file.getAbsolutePath() + "]", cause);
	}

}
