package com.bstek.dorado.cloudo.djsdoc2definition.jsdoc;

import junit.framework.Assert;

import org.codehaus.jackson.map.ObjectMapper;
import org.junit.Test;

import com.bstek.dorado.cloudo.djsdoc2def.DefBuilder;
import com.bstek.dorado.cloudo.djsdoc2def.jsdoc.Cls;
import com.bstek.dorado.cloudo.djsdoc2def.jsdoc.Fn;
import com.bstek.dorado.cloudo.djsdoc2def.jsdoc.Identity;
import com.bstek.dorado.cloudo.djsdoc2def.jsdoc.Library;
import com.bstek.dorado.cloudo.djsdoc2def.jsdoc.Types;
import com.bstek.dorado.cloudo.djsdoc2definition.TestHelper;

public class DefinitionTest {
	protected void assertJsonEquals(String actual, String expected) throws Exception {
		ObjectMapper objectMapper = new ObjectMapper();
		String actualJson = objectMapper.readTree(actual).toString();
		String expectedJson = objectMapper.readTree(expected).toString();
		
		Assert.assertEquals(expectedJson, actualJson);
	}
	
	@Test
	public void test01() throws Exception {
		Identity identity = Identity.create("dorado", "core");
		Library def = new Library(identity);
		def.setDoc("这是注释，也是文档");
		String actual = DefBuilder.toString(def);
		String expected = TestHelper.json("01", this.getClass());
		this.assertJsonEquals(actual, expected);
	}
	
	@Test
	public void test02() throws Exception {
		Identity identity = Identity.create("dorado", "core");
		Library def = new Library(identity);
		def.set("m1", new Fn());
		String actual = DefBuilder.toString(def);
		String expected = TestHelper.json("02", this.getClass());
		this.assertJsonEquals(actual, expected);
	}

	@Test
	public void test03() throws Exception {
		Identity identity = Identity.create("dorado", "core");
		Library def = new Library(identity);
		Cls m1 = new Cls();
		m1.setPrototype("Node.prototype");
		def.set("m1", m1);
		
		String actual = DefBuilder.toString(def);
		String expected = TestHelper.json("03", this.getClass());
		this.assertJsonEquals(actual, expected);
	}

	@Test
	public void test04() throws Exception {
		Fn fn = new Fn();
		fn.setReturnValue(Types.Node);
		
		String actual = DefBuilder.toString(fn);
		String expected = TestHelper.json("04", this.getClass());
		this.assertJsonEquals(actual, expected);
	}
	
	@Test
	public void test05() throws Exception {
		Fn fn = new Fn();
		fn.setReturnValue(Types.Node);
		fn.addParameter("p1").setType(Types.String);
		
		String actual = DefBuilder.toString(fn);
		String expected = TestHelper.json("05", this.getClass());
		this.assertJsonEquals(actual, expected);
	}
	
	@Test
	public void test06() throws Exception {
		Fn fn = new Fn();
		fn.setReturnValue(Types.Node);
		fn.addParameter("p1").setType(Types.String);
		fn.addParameter("p2").setOptional(true);
		
		String actual = DefBuilder.toString(fn);
		String expected = TestHelper.json("06", this.getClass());
		this.assertJsonEquals(actual, expected);
	}
}
