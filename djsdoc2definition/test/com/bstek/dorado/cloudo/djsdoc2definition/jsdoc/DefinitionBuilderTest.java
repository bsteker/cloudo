package com.bstek.dorado.cloudo.djsdoc2definition.jsdoc;

import java.io.File;
import java.net.URL;

import org.apache.commons.io.FileUtils;
import org.junit.Test;

import com.bstek.dorado.cloudo.djsdoc2def.DefBuilder;
import com.bstek.dorado.cloudo.djsdoc2def.jsdoc.BuildConfiguration;
import com.bstek.dorado.cloudo.djsdoc2def.jsdoc.BuildResult;
import com.bstek.dorado.cloudo.djsdoc2def.jsdoc.Identity;
import com.bstek.dorado.cloudo.djsdoc2definition.TestHelper;

/**
 * 
type = symbolInfo[0], 
name = symbolInfo[1],
isAbstract = symbolInfo[2],
deprecated = symbolInfo[3],
[opt] mainSymbolAlias = symbolInfo[4],
[opt] fileName = symbolInfo[5] || symbol
 *
 */
public class DefinitionBuilderTest {

	@Test
	public void test_core() throws Exception {
		URL rootURL = this.getClass().getResource("/dorado-core/7.3.0");
		File root = FileUtils.toFile(rootURL);
		
		Identity library = Identity.create("dorado", "core");
		BuildResult result = DefBuilder.build(root, library);
		
		System.out.println("--");
		System.out.println(TestHelper.getJson(result));
		System.out.println("--");
		System.out.println();
		
		result.getError().output();
	}
	
	@Test
	public void test_map() throws Exception {
		URL rootURL = this.getClass().getResource("/dorado-map");
		File root = FileUtils.toFile(rootURL);
		Identity library = Identity.create("dorado", "map");
		
		BuildConfiguration configuration = new BuildConfiguration(root, library);
		configuration.addTypePaths("/com/bstek/dorado/cloudo/djsdoc2definition/jsdoc/map.properties");
		
		BuildResult result = DefBuilder.build(configuration);
		
		System.out.println("--");
		System.out.println(TestHelper.getJson(result));
		System.out.println("--");
		System.out.println();
		
		result.getError().output();
	}
	
	@Test
	public void test_intro() throws Exception {
		URL rootURL = this.getClass().getResource("/dorado-intro");
		File root = FileUtils.toFile(rootURL);
		
		Identity library = Identity.create("dorado", "intro");
		BuildResult result = DefBuilder.build(root, library);
		
		System.out.println("--");
		System.out.println(TestHelper.getJson(result));
		System.out.println("--");
		System.out.println();
		
		result.getError().output();
	}
}
