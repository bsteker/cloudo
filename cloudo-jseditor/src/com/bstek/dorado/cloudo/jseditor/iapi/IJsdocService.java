package com.bstek.dorado.cloudo.jseditor.iapi;

import org.codehaus.jackson.JsonNode;

public interface IJsdocService {

	Archive lookupArchive(Identity identity);
	
	JsonNode lookupDefinition(Alias alias);

	IJsdocArchiveService getJsdocArchiveService();
}
