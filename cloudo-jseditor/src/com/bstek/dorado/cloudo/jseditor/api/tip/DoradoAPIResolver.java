package com.bstek.dorado.cloudo.jseditor.api.tip;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.node.JsonNodeFactory;
import org.codehaus.jackson.node.ObjectNode;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.util.FileCopyUtils;

import com.bstek.dorado.cloudo.jseditor.iapi.Alias;
import com.bstek.dorado.cloudo.jseditor.iapi.IJsdocService;
import com.bstek.dorado.web.resolver.AbstractTextualResolver;
import com.bstek.dorado.web.resolver.HttpConstants;
public class DoradoAPIResolver extends AbstractTextualResolver {
	private IJsdocService jsdocService;
	private final String packagePath;
	
	public IJsdocService getJsdocService() {
		return jsdocService;
	}

	public void setJsdocService(IJsdocService jsdocService) {
		this.jsdocService = jsdocService;
	}

	public DoradoAPIResolver() {
		setContentType(HttpConstants.CONTENT_TYPE_HTML);
		
		Package packagePathObj = this.getClass().getPackage();
		this.packagePath = packagePathObj.getName().replace('.', '/');
	}

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		request.setCharacterEncoding( "UTF-8" );
		StringBuffer buffer = this.readTemplate();
		ObjectNode errorJson = this.validateRequestParams(request);
		ObjectNode resultJson = null;
		if (errorJson.toString().equals("{}")) {
			Map<String, Object> parameter = this.createParameter(request);
			
			JsonNode doradoElementAPIMetaInfo = null;
			Alias alias = Alias.valueOf(parameter);
			doradoElementAPIMetaInfo = jsdocService.lookupDefinition(alias);
			if (doradoElementAPIMetaInfo == null) {
				alias = Alias.smart(parameter);
				doradoElementAPIMetaInfo = jsdocService.lookupDefinition(alias);
			}
			
			ObjectNode doradoElementAPIInfo = new ObjectNode(JsonNodeFactory.instance);
			doradoElementAPIInfo.put("type", StringUtils.defaultIfEmpty(alias.getType(), (String) parameter.get("type")));
			doradoElementAPIInfo.put("owner", StringUtils.defaultIfEmpty(alias.getOwner(), (String) parameter.get("owner")));
			doradoElementAPIInfo.put("name", StringUtils.defaultIfEmpty(alias.getName(), (String) parameter.get("name")));
			doradoElementAPIInfo.put("metaInfo", (doradoElementAPIMetaInfo == null) ? null: doradoElementAPIMetaInfo.toString());
			resultJson = doradoElementAPIInfo;
		} else {
			resultJson = errorJson;
		}
		
		String doradoElementAPIMetaInfoStr = "var doradoElementAPIMetaInfo = " + resultJson.toString() + ";";
		String filePath = packagePath + "/onload.js";
		StringBuffer fileBuffer = new StringBuffer(doradoElementAPIMetaInfoStr);
		fileBuffer.append(fileBuffer.append(this.classpathResourceToString(filePath)));
		fileBuffer.insert(0, "<script charset=\"UTF-8\">\n");
		fileBuffer.append("</script>\n");
		buffer.insert(buffer.indexOf("</head>"), fileBuffer.toString());
		
		PrintWriter writer = this.getWriter(request, response);
		try {
			writer.print( buffer.toString() );
		} finally {
			writer.flush();
			writer.close();
		}
	}

	private StringBuffer readTemplate() throws IOException {
		StringBuffer buffer = this.classpathResourceToString( packagePath + "/doradoElementAPI.html" );
		List< String > files = new ArrayList< String >();
		files.add( packagePath + "/syntaxhighlighter/v3.0.83/scripts/shCore.js" );
		files.add( packagePath + "/syntaxhighlighter/v3.0.83/scripts/shBrushJScript.js" );
		files.add( packagePath + "/syntaxhighlighter/v3.0.83/styles/shCore.css" );
		files.add( packagePath + "/syntaxhighlighter/v3.0.83/styles/shThemeDefault.css" );
		files.add( packagePath + "/dorado-api-tip.css" );
		files.add( packagePath + "/dorado-api-tip.js" );
		for ( String filePath: files ) {
			StringBuffer fileBuffer = this.classpathResourceToString(filePath);
			
			if ( filePath.indexOf(".js") != -1) {
				fileBuffer.insert(0, "<script charset=\"UTF-8\">\n");
				fileBuffer.append("</script>\n");
			} else if ( filePath.indexOf(".css") != -1) {
				fileBuffer.insert(0, "<style charset=\"UTF-8\">\n");
				fileBuffer.append("</style>\n");
			}
			buffer.insert(buffer.indexOf("</head>"), fileBuffer.toString());
		}
		return buffer;
	}
	
	private Map<String, Object> createParameter(HttpServletRequest request) {
		Map<String, Object> parameter = new HashMap<String, Object>(5);
		parameter.put("type", request.getParameter("type"));
		parameter.put("owner", request.getParameter("owner"));
		parameter.put("name", request.getParameter("name"));
		return parameter;
	}
	
	private ObjectNode validateRequestParams( HttpServletRequest request ) {
		String type = (String) request.getParameter("type");
		ObjectNode errorJson = new ObjectNode(JsonNodeFactory.instance);
		if (type.isEmpty()) {
			errorJson.put("error", "type parameter is null !");
		}
		String owner = (String) request.getParameter("owner");
		if (owner.isEmpty()){
			errorJson.put("error", "the owner are not illegal !");
		}
		return errorJson;
	}
	
	private StringBuffer classpathResourceToString(String path) throws IOException {
		Resource classPathResource = new ClassPathResource( path );
		InputStream inputStream = classPathResource.getInputStream();
		InputStreamReader reader = new InputStreamReader(inputStream, "UTF-8");
		String fileContext = FileCopyUtils.copyToString(reader);
		StringBuffer buffer = new StringBuffer(new String(fileContext));
		return buffer;
	}
}
