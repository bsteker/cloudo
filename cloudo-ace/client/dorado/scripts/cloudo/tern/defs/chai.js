var ternDefsChai = {
	"!name": "chai",
	"chai": {
		"should": {
			"Language": {
				"!doc": "Language Chains\n\n\n\nThe following are provided as chainable getters to\nimprove the readability of your assertions. They\ndo not provide an testing capability unless they\nhave been overwritten by a plugin.Chains\n\n",
				"!url": "http://chaijs.com/api/bdd/#Language",
				"!type": "fn() -> bool"
			},
			"not": {
				"!doc": ".not\n\n\n\nNegates any of assertions following in the chain.\n\nexpect(foo).to.not.equal('bar');\nexpect(goodFn).to.not.throw(Error);\nexpect({ foo: 'baz' }).to.have.property('foo')\n  .and.not.equal('bar');",
				"!url": "http://chaijs.com/api/bdd/#not",
				"!type": "fn() -> bool"
			},
			"deep": {
				"!doc": ".deep\n\n\n\nSets the deep flag, later used by the equal and\nproperty assertions.\n\nexpect(foo).to.deep.equal({ bar: 'baz' });\nexpect({ foo: { bar: { baz: 'quux' } } })\n  .to.have.deep.property('foo.bar.baz', 'quux');",
				"!url": "http://chaijs.com/api/bdd/#deep",
				"!type": "fn() -> bool"
			},
			"a": {
				"!doc": ".a(type)\n\n  * @param { String } type\n  * @param { String } message_optional_\n\nThe a and an assertions are aliases that can be\nused either as language chains or to assert a value's\ntype.\n\n// typeof\nexpect('test').to.be.a('string');\nexpect({ foo: 'bar' }).to.be.an('object');\nexpect(null).to.be.a('null');\nexpect(undefined).to.be.an('undefined');\n\n// language chain\nexpect(foo).to.be.an.instanceof(Foo);",
				"!url": "http://chaijs.com/api/bdd/#a",
				"!type": "fn(type: string, message: string) -> bool"
			},
			"include": {
				"!doc": ".include(value)\n\n  * @param { Object | String | Number } obj\n  * @param { String } message_optional_\n\nThe include and contain assertions can be used as either property\nbased language chains or as methods to assert the inclusion of an object\nin an array or a substring in a string. When used as language chains,\nthey toggle the contain flag for the keys assertion.\n\nexpect([1,2,3]).to.include(2);\nexpect('foobar').to.contain('foo');\nexpect({ foo: 'bar', hello: 'universe' }).to.include.keys('foo');",
				"!url": "http://chaijs.com/api/bdd/#include",
				"!type": "fn(obj: object, message: string) -> bool"
			},
			"ok": {
				"!doc": ".ok\n\n\n\nAsserts that the target is truthy.\n\nexpect('everthing').to.be.ok;\nexpect(1).to.be.ok;\nexpect(false).to.not.be.ok;\nexpect(undefined).to.not.be.ok;\nexpect(null).to.not.be.ok;",
				"!url": "http://chaijs.com/api/bdd/#ok",
				"!type": "fn() -> bool"
			},
			"true": {
				"!doc": ".true\n\n\n\nAsserts that the target is true.\n\nexpect(true).to.be.true;\nexpect(1).to.not.be.true;",
				"!url": "http://chaijs.com/api/bdd/#true",
				"!type": "fn() -> bool"
			},
			"false": {
				"!doc": ".false\n\n\n\nAsserts that the target is false.\n\nexpect(false).to.be.false;\nexpect(0).to.not.be.false;",
				"!url": "http://chaijs.com/api/bdd/#false",
				"!type": "fn() -> bool"
			},
			"null": {
				"!doc": ".null\n\n\n\nAsserts that the target is null.\n\nexpect(null).to.be.null;\nexpect(undefined).not.to.be.null;",
				"!url": "http://chaijs.com/api/bdd/#null",
				"!type": "fn() -> bool"
			},
			"undefined": {
				"!doc": ".undefined\n\n\n\nAsserts that the target is undefined.\n\nexpect(undefined).to.be.undefined;\nexpect(null).to.not.be.undefined;",
				"!url": "http://chaijs.com/api/bdd/#undefined",
				"!type": "fn() -> bool"
			},
			"exist": {
				"!doc": ".exist\n\n\n\nAsserts that the target is neither null nor undefined.\n\nvar foo = 'hi'\n  , bar = null\n  , baz;\n\nexpect(foo).to.exist;\nexpect(bar).to.not.exist;\nexpect(baz).to.not.exist;",
				"!url": "http://chaijs.com/api/bdd/#exist",
				"!type": "fn() -> bool"
			},
			"empty": {
				"!doc": ".empty\n\n\n\nAsserts that the target's length is 0. For arrays, it checks\nthe length property. For objects, it gets the count of\nenumerable keys.\n\nexpect([]).to.be.empty;\nexpect('').to.be.empty;\nexpect({}).to.be.empty;",
				"!url": "http://chaijs.com/api/bdd/#empty",
				"!type": "fn() -> bool"
			},
			"arguments": {
				"!doc": ".arguments\n\n\n\nAsserts that the target is an arguments object.\n\nfunction test () {\n  expect(arguments).to.be.arguments;\n}",
				"!url": "http://chaijs.com/api/bdd/#arguments",
				"!type": "fn() -> bool"
			},
			"equal": {
				"!doc": ".equal(value)\n\n  * @param { Mixed } value\n  * @param { String } message_optional_\n\nAsserts that the target is strictly equal (===) to value.\nAlternately, if the deep flag is set, asserts that\nthe target is deeply equal to value.\n\nexpect('hello').to.equal('hello');\nexpect(42).to.equal(42);\nexpect(1).to.not.equal(true);\nexpect({ foo: 'bar' }).to.not.equal({ foo: 'bar' });\nexpect({ foo: 'bar' }).to.deep.equal({ foo: 'bar' });",
				"!url": "http://chaijs.com/api/bdd/#equal",
				"!type": "fn(value: mixed, message: string) -> bool"
			},
			"eql": {
				"!doc": ".eql(value)\n\n  * @param { Mixed } value\n  * @param { String } message_optional_\n\nAsserts that the target is deeply equal to value.\n\nexpect({ foo: 'bar' }).to.eql({ foo: 'bar' });\nexpect([ 1, 2, 3 ]).to.eql([ 1, 2, 3 ]);",
				"!url": "http://chaijs.com/api/bdd/#eql",
				"!type": "fn(value: mixed, message: string) -> bool"
			},
			"above": {
				"!doc": ".above(value)\n\n  * @param { Number } value\n  * @param { String } message_optional_\n\nAsserts that the target is greater than value.Can also be used in conjunction with length to\nassert a minimum length. The benefit being a\nmore informative error message than if the length\nwas supplied directly.\n\nexpect(10).to.be.above(5);expect('foo').to.have.length.above(2);\nexpect([ 1, 2, 3 ]).to.have.length.above(2);",
				"!url": "http://chaijs.com/api/bdd/#above",
				"!type": "fn(value: number, message: string) -> bool"
			},
			"least": {
				"!doc": ".least(value)\n\n  * @param { Number } value\n  * @param { String } message_optional_\n\nAsserts that the target is greater than or equal to value.Can also be used in conjunction with length to\nassert a minimum length. The benefit being a\nmore informative error message than if the length\nwas supplied directly.\n\nexpect(10).to.be.at.least(10);expect('foo').to.have.length.of.at.least(2);\nexpect([ 1, 2, 3 ]).to.have.length.of.at.least(3);",
				"!url": "http://chaijs.com/api/bdd/#least",
				"!type": "fn(value: number, message: string) -> bool"
			},
			"below": {
				"!doc": ".below(value)\n\n  * @param { Number } value\n  * @param { String } message_optional_\n\nAsserts that the target is less than value.Can also be used in conjunction with length to\nassert a maximum length. The benefit being a\nmore informative error message than if the length\nwas supplied directly.\n\nexpect(5).to.be.below(10);expect('foo').to.have.length.below(4);\nexpect([ 1, 2, 3 ]).to.have.length.below(4);",
				"!url": "http://chaijs.com/api/bdd/#below",
				"!type": "fn(value: number, message: string) -> bool"
			},
			"most": {
				"!doc": ".most(value)\n\n  * @param { Number } value\n  * @param { String } message_optional_\n\nAsserts that the target is less than or equal to value.Can also be used in conjunction with length to\nassert a maximum length. The benefit being a\nmore informative error message than if the length\nwas supplied directly.\n\nexpect(5).to.be.at.most(5);expect('foo').to.have.length.of.at.most(4);\nexpect([ 1, 2, 3 ]).to.have.length.of.at.most(3);",
				"!url": "http://chaijs.com/api/bdd/#most",
				"!type": "fn(value: number, message: string) -> bool"
			},
			"within": {
				"!doc": ".within(start, finish)\n\n  * @param { Number } startlowerbound inclusive\n  * @param { Number } finishupperbound inclusive\n  * @param { String } message_optional_\n\nAsserts that the target is within a range.Can also be used in conjunction with length to\nassert a length range. The benefit being a\nmore informative error message than if the length\nwas supplied directly.\n\nexpect(7).to.be.within(5,10);expect('foo').to.have.length.within(2,4);\nexpect([ 1, 2, 3 ]).to.have.length.within(2,4);",
				"!url": "http://chaijs.com/api/bdd/#within",
				"!type": "fn(start: number, finish: number, message: string) -> bool"
			},
			"instanceof": {
				"!doc": ".instanceof(constructor)\n\n  * @param { Constructor } constructor\n  * @param { String } message_optional_\n\nAsserts that the target is an instance of constructor.\n\nvar Tea = function (name) { this.name = name; }\n  , Chai = new Tea('chai');\n\nexpect(Chai).to.be.an.instanceof(Tea);\nexpect([ 1, 2, 3 ]).to.be.instanceof(Array);",
				"!url": "http://chaijs.com/api/bdd/#instanceof",
				"!type": "fn(constructor: constructor, message: string) -> bool"
			},
			"property": {
				"!doc": ".property(name, [value])\n\n  * @param { String } name\n  * @param { Mixed } value(optional)\n  * @param { String } message_optional_\n\nAsserts that the target has a property name, optionally asserting that\nthe value of that property is strictly equal to  value.\nIf the deep flag is set, you can use dot- and bracket-notation for deep\nreferences into objects and arrays.You can also use an array as the starting point of a deep.property\nassertion, or traverse nested arrays.Furthermore, property changes the subject of the assertion\nto be the value of that property from the original object. This\npermits for further chainable assertions on that property.\n\n// simple referencing\nvar obj = { foo: 'bar' };\nexpect(obj).to.have.property('foo');\nexpect(obj).to.have.property('foo', 'bar');\n\n// deep referencing\nvar deepObj = {\n    green: { tea: 'matcha' }\n  , teas: [ 'chai', 'matcha', { tea: 'konacha' } ]\n};\n\nexpect(deepObj).to.have.deep.property('green.tea', 'matcha');\nexpect(deepObj).to.have.deep.property('teas[1]', 'matcha');\nexpect(deepObj).to.have.deep.property('teas[2].tea', 'konacha');var arr = [\n    [ 'chai', 'matcha', 'konacha' ]\n  , [ { tea: 'chai' }\n    , { tea: 'matcha' }\n    , { tea: 'konacha' } ]\n];\n\nexpect(arr).to.have.deep.property('[0][1]', 'matcha');\nexpect(arr).to.have.deep.property('[1][2].tea', 'konacha');expect(obj).to.have.property('foo')\n  .that.is.a('string');\nexpect(deepObj).to.have.property('green')\n  .that.is.an('object')\n  .that.deep.equals({ tea: 'matcha' });\nexpect(deepObj).to.have.property('teas')\n  .that.is.an('array')\n  .with.deep.property('[2]')\n    .that.deep.equals({ tea: 'konacha' });",
				"!url": "http://chaijs.com/api/bdd/#property",
				"!type": "fn(name: string, value: [mixed], message: string) -> bool"
			},
			"ownProperty": {
				"!doc": ".ownProperty(name)\n\n  * @param { String } name\n  * @param { String } message_optional_\n\nAsserts that the target has an own property name.\n\nexpect('test').to.have.ownProperty('length');",
				"!url": "http://chaijs.com/api/bdd/#ownProperty",
				"!type": "fn(name: string, message: string) -> bool"
			},
			"length": {
				"!doc": ".length(value)\n\n  * @param { Number } length\n  * @param { String } message_optional_\n\nAsserts that the target's length property has\nthe expected value.Can also be used as a chain precursor to a value\ncomparison for the length property.\n\nexpect([ 1, 2, 3]).to.have.length(3);\nexpect('foobar').to.have.length(6);expect('foo').to.have.length.above(2);\nexpect([ 1, 2, 3 ]).to.have.length.above(2);\nexpect('foo').to.have.length.below(4);\nexpect([ 1, 2, 3 ]).to.have.length.below(4);\nexpect('foo').to.have.length.within(2,4);\nexpect([ 1, 2, 3 ]).to.have.length.within(2,4);",
				"!url": "http://chaijs.com/api/bdd/#length",
				"!type": "fn(length: number, message: string) -> bool"
			},
			"match": {
				"!doc": ".match(regexp)\n\n  * @param { RegExp } RegularExpression\n  * @param { String } message_optional_\n\nAsserts that the target matches a regular expression.\n\nexpect('foobar').to.match(/^foo/);",
				"!url": "http://chaijs.com/api/bdd/#match",
				"!type": "fn(RegularExpression: regexp, message: string) -> bool"
			},
			"string": {
				"!doc": ".string(string)\n\n  * @param { String } string\n  * @param { String } message_optional_\n\nAsserts that the string target contains another string.\n\nexpect('foobar').to.have.string('bar');",
				"!url": "http://chaijs.com/api/bdd/#string",
				"!type": "fn(string: string, message: string) -> bool"
			},
			"keys": {
				"!doc": ".keys(key1, [key2], [...])\n\n  * @param { String... | Array } keys\n\nAsserts that the target has exactly the given keys, or\nasserts the inclusion of some keys when using the\ninclude or contain modifiers.\n\nexpect({ foo: 1, bar: 2 }).to.have.keys(['foo', 'bar']);\nexpect({ foo: 1, bar: 2, baz: 3 }).to.contain.keys('foo', 'bar');",
				"!url": "http://chaijs.com/api/bdd/#keys",
				"!type": "fn(keys: string) -> bool"
			},
			"throw": {
				"!doc": ".throw(constructor)\n\n  * @param { ErrorConstructor } constructor\n  * @param { String | RegExp } expectederror message\n  * @param { String } message_optional_\n  * @seehttps://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types  \n\nAsserts that the function target will throw a specific error, or specific type of error\n(as determined using instanceof), optionally with a RegExp or string inclusion test\nfor the error's message.Please note that when a throw expectation is negated, it will check each\nparameter independently, starting with error constructor type. The appropriate way\nto check for the existence of a type of error but for a message that does not match\nis to use and.\n\nvar err = new ReferenceError('This is a bad function.');\nvar fn = function () { throw err; }\nexpect(fn).to.throw(ReferenceError);\nexpect(fn).to.throw(Error);\nexpect(fn).to.throw(/bad function/);\nexpect(fn).to.not.throw('good function');\nexpect(fn).to.throw(ReferenceError, /bad function/);\nexpect(fn).to.throw(err);\nexpect(fn).to.not.throw(new RangeError('Out of range.'));expect(fn).to.throw(ReferenceError)\n   .and.not.throw(/good function/);",
				"!url": "http://chaijs.com/api/bdd/#throw",
				"!type": "fn(constructor: errorconstructor, expected: string, message: string) -> bool"
			},
			"respondTo": {
				"!doc": ".respondTo(method)\n\n  * @param { String } method\n  * @param { String } message_optional_\n\nAsserts that the object or class target will respond to a method.To check if a constructor will respond to a static function,\nset the itself flag.\n\nKlass.prototype.bar = function(){};\nexpect(Klass).to.respondTo('bar');\nexpect(obj).to.respondTo('bar');Klass.baz = function(){};\nexpect(Klass).itself.to.respondTo('baz');",
				"!url": "http://chaijs.com/api/bdd/#respondTo",
				"!type": "fn(method: string, message: string) -> bool"
			},
			"itself": {
				"!doc": ".itself\n\n\n\nSets the itself flag, later used by the respondTo assertion.\n\nfunction Foo() {}\nFoo.bar = function() {}\nFoo.prototype.baz = function() {}\n\nexpect(Foo).itself.to.respondTo('bar');\nexpect(Foo).itself.not.to.respondTo('baz');",
				"!url": "http://chaijs.com/api/bdd/#itself",
				"!type": "fn() -> bool"
			},
			"satisfy": {
				"!doc": ".satisfy(method)\n\n  * @param { Function } matcher\n  * @param { String } message_optional_\n\nAsserts that the target passes a given truth test.\n\nexpect(1).to.satisfy(function(num) { return num > 0; });",
				"!url": "http://chaijs.com/api/bdd/#satisfy",
				"!type": "fn(matcher: function, message: string) -> bool"
			},
			"closeTo": {
				"!doc": ".closeTo(expected, delta)\n\n  * @param { Number } expected\n  * @param { Number } delta\n  * @param { String } message_optional_\n\nAsserts that the target is equal expected, to within a +/- delta range.\n\nexpect(1.5).to.be.closeTo(1, 0.5);",
				"!url": "http://chaijs.com/api/bdd/#closeTo",
				"!type": "fn(expected: number, delta: number, message: string) -> bool"
			},
			"members": {
				"!doc": ".members(set)\n\n  * @param { Array } set\n  * @param { String } message_optional_\n\nAsserts that the target is a superset of set,\nor that the target and set have the same members.\n\nexpect([1, 2, 3]).to.include.members([3, 2]);\nexpect([1, 2, 3]).to.not.include.members([3, 2, 8]);\n\nexpect([4, 2]).to.have.members([2, 4]);\nexpect([5, 2]).to.not.have.members([5, 2, 1]);",
				"!url": "http://chaijs.com/api/bdd/#members",
				"!type": "fn(set: array, message: string) -> bool"
			}
		},
		"assert": {
			"assert": {
				"!doc": "assert(expression, message)\n\n  * @param { Mixed } expressionto test for truthiness\n  * @param { String } messageto display on error\n\nWrite your own test expressions.\n\nassert('foo' !== 'bar', 'foo is not bar');\nassert(Array.isArray([]), 'empty arrays are arrays');",
				"!url": "http://chaijs.com/api/assert/#assert",
				"!type": "fn(expression: mixed, message: string) -> bool"
			},
			"fail": {
				"!doc": ".fail(actual, expected, [message], [operator])\n\n  * @param { Mixed } actual\n  * @param { Mixed } expected\n  * @param { String } message\n  * @param { String } operator\n\nThrow a failure. Node.js assert module-compatible.\n\n",
				"!url": "http://chaijs.com/api/assert/#fail",
				"!type": "fn(actual: mixed, expected: mixed, message: [string], operator: [string]) -> bool"
			},
			"ok": {
				"!doc": ".ok(object, [message])\n\n  * @param { Mixed } objectto test\n  * @param { String } message\n\nAsserts that object is truthy.\n\nassert.ok('everything', 'everything is ok');\nassert.ok(false, 'this will fail');",
				"!url": "http://chaijs.com/api/assert/#ok",
				"!type": "fn(object: mixed, message: [string]) -> bool"
			},
			"notOk": {
				"!doc": ".notOk(object, [message])\n\n  * @param { Mixed } objectto test\n  * @param { String } message\n\nAsserts that object is falsy.\n\nassert.notOk('everything', 'this will fail');\nassert.notOk(false, 'this will pass');",
				"!url": "http://chaijs.com/api/assert/#notOk",
				"!type": "fn(object: mixed, message: [string]) -> bool"
			},
			"equal": {
				"!doc": ".equal(actual, expected, [message])\n\n  * @param { Mixed } actual\n  * @param { Mixed } expected\n  * @param { String } message\n\nAsserts non-strict equality (==) of actual and expected.\n\nassert.equal(3, '3', '== coerces values to strings');",
				"!url": "http://chaijs.com/api/assert/#equal",
				"!type": "fn(actual: mixed, expected: mixed, message: [string]) -> bool"
			},
			"notEqual": {
				"!doc": ".notEqual(actual, expected, [message])\n\n  * @param { Mixed } actual\n  * @param { Mixed } expected\n  * @param { String } message\n\nAsserts non-strict inequality (!=) of actual and expected.\n\nassert.notEqual(3, 4, 'these numbers are not equal');",
				"!url": "http://chaijs.com/api/assert/#notEqual",
				"!type": "fn(actual: mixed, expected: mixed, message: [string]) -> bool"
			},
			"strictEqual": {
				"!doc": ".strictEqual(actual, expected, [message])\n\n  * @param { Mixed } actual\n  * @param { Mixed } expected\n  * @param { String } message\n\nAsserts strict equality (===) of actual and expected.\n\nassert.strictEqual(true, true, 'these booleans are strictly equal');",
				"!url": "http://chaijs.com/api/assert/#strictEqual",
				"!type": "fn(actual: mixed, expected: mixed, message: [string]) -> bool"
			},
			"notStrictEqual": {
				"!doc": ".notStrictEqual(actual, expected, [message])\n\n  * @param { Mixed } actual\n  * @param { Mixed } expected\n  * @param { String } message\n\nAsserts strict inequality (!==) of actual and expected.\n\nassert.notStrictEqual(3, '3', 'no coercion for strict equality');",
				"!url": "http://chaijs.com/api/assert/#notStrictEqual",
				"!type": "fn(actual: mixed, expected: mixed, message: [string]) -> bool"
			},
			"deepEqual": {
				"!doc": ".deepEqual(actual, expected, [message])\n\n  * @param { Mixed } actual\n  * @param { Mixed } expected\n  * @param { String } message\n\nAsserts that actual is deeply equal to expected.\n\nassert.deepEqual({ tea: 'green' }, { tea: 'green' });",
				"!url": "http://chaijs.com/api/assert/#deepEqual",
				"!type": "fn(actual: mixed, expected: mixed, message: [string]) -> bool"
			},
			"notDeepEqual": {
				"!doc": ".notDeepEqual(actual, expected, [message])\n\n  * @param { Mixed } actual\n  * @param { Mixed } expected\n  * @param { String } message\n\nAssert that actual is not deeply equal to expected.\n\nassert.notDeepEqual({ tea: 'green' }, { tea: 'jasmine' });",
				"!url": "http://chaijs.com/api/assert/#notDeepEqual",
				"!type": "fn(actual: mixed, expected: mixed, message: [string]) -> bool"
			},
			"isTrue": {
				"!doc": ".isTrue(value, [message])\n\n  * @param { Mixed } value\n  * @param { String } message\n\nAsserts that value is true.\n\nvar teaServed = true;\nassert.isTrue(teaServed, 'the tea has been served');",
				"!url": "http://chaijs.com/api/assert/#isTrue",
				"!type": "fn(value: mixed, message: [string]) -> bool"
			},
			"isFalse": {
				"!doc": ".isFalse(value, [message])\n\n  * @param { Mixed } value\n  * @param { String } message\n\nAsserts that value is false.\n\nvar teaServed = false;\nassert.isFalse(teaServed, 'no tea yet? hmm...');",
				"!url": "http://chaijs.com/api/assert/#isFalse",
				"!type": "fn(value: mixed, message: [string]) -> bool"
			},
			"isNull": {
				"!doc": ".isNull(value, [message])\n\n  * @param { Mixed } value\n  * @param { String } message\n\nAsserts that value is null.\n\nassert.isNull(err, 'there was no error');",
				"!url": "http://chaijs.com/api/assert/#isNull",
				"!type": "fn(value: mixed, message: [string]) -> bool"
			},
			"isNotNull": {
				"!doc": ".isNotNull(value, [message])\n\n  * @param { Mixed } value\n  * @param { String } message\n\nAsserts that value is not null.\n\nvar tea = 'tasty chai';\nassert.isNotNull(tea, 'great, time for tea!');",
				"!url": "http://chaijs.com/api/assert/#isNotNull",
				"!type": "fn(value: mixed, message: [string]) -> bool"
			},
			"isUndefined": {
				"!doc": ".isUndefined(value, [message])\n\n  * @param { Mixed } value\n  * @param { String } message\n\nAsserts that value is undefined.\n\nvar tea;\nassert.isUndefined(tea, 'no tea defined');",
				"!url": "http://chaijs.com/api/assert/#isUndefined",
				"!type": "fn(value: mixed, message: [string]) -> bool"
			},
			"isDefined": {
				"!doc": ".isDefined(value, [message])\n\n  * @param { Mixed } value\n  * @param { String } message\n\nAsserts that value is not undefined.\n\nvar tea = 'cup of chai';\nassert.isDefined(tea, 'tea has been defined');",
				"!url": "http://chaijs.com/api/assert/#isDefined",
				"!type": "fn(value: mixed, message: [string]) -> bool"
			},
			"isFunction": {
				"!doc": ".isFunction(value, [message])\n\n  * @param { Mixed } value\n  * @param { String } message\n\nAsserts that value is a function.\n\nfunction serveTea() { return 'cup of tea'; };\nassert.isFunction(serveTea, 'great, we can have tea now');",
				"!url": "http://chaijs.com/api/assert/#isFunction",
				"!type": "fn(value: mixed, message: [string]) -> bool"
			},
			"isNotFunction": {
				"!doc": ".isNotFunction(value, [message])\n\n  * @param { Mixed } value\n  * @param { String } message\n\nAsserts that value is not a function.\n\nvar serveTea = [ 'heat', 'pour', 'sip' ];\nassert.isNotFunction(serveTea, 'great, we have listed the steps');",
				"!url": "http://chaijs.com/api/assert/#isNotFunction",
				"!type": "fn(value: mixed, message: [string]) -> bool"
			},
			"isObject": {
				"!doc": ".isObject(value, [message])\n\n  * @param { Mixed } value\n  * @param { String } message\n\nAsserts that value is an object (as revealed by\nObject.prototype.toString).\n\nvar selection = { name: 'Chai', serve: 'with spices' };\nassert.isObject(selection, 'tea selection is an object');",
				"!url": "http://chaijs.com/api/assert/#isObject",
				"!type": "fn(value: mixed, message: [string]) -> bool"
			},
			"isNotObject": {
				"!doc": ".isNotObject(value, [message])\n\n  * @param { Mixed } value\n  * @param { String } message\n\nAsserts that value is not an object.\n\nvar selection = 'chai'\nassert.isObject(selection, 'tea selection is not an object');\nassert.isObject(null, 'null is not an object');",
				"!url": "http://chaijs.com/api/assert/#isNotObject",
				"!type": "fn(value: mixed, message: [string]) -> bool"
			},
			"isArray": {
				"!doc": ".isArray(value, [message])\n\n  * @param { Mixed } value\n  * @param { String } message\n\nAsserts that value is an array.\n\nvar menu = [ 'green', 'chai', 'oolong' ];\nassert.isArray(menu, 'what kind of tea do we want?');",
				"!url": "http://chaijs.com/api/assert/#isArray",
				"!type": "fn(value: mixed, message: [string]) -> bool"
			},
			"isNotArray": {
				"!doc": ".isNotArray(value, [message])\n\n  * @param { Mixed } value\n  * @param { String } message\n\nAsserts that value is not an array.\n\nvar menu = 'green|chai|oolong';\nassert.isNotArray(menu, 'what kind of tea do we want?');",
				"!url": "http://chaijs.com/api/assert/#isNotArray",
				"!type": "fn(value: mixed, message: [string]) -> bool"
			},
			"isString": {
				"!doc": ".isString(value, [message])\n\n  * @param { Mixed } value\n  * @param { String } message\n\nAsserts that value is a string.\n\nvar teaOrder = 'chai';\nassert.isString(teaOrder, 'order placed');",
				"!url": "http://chaijs.com/api/assert/#isString",
				"!type": "fn(value: mixed, message: [string]) -> bool"
			},
			"isNotString": {
				"!doc": ".isNotString(value, [message])\n\n  * @param { Mixed } value\n  * @param { String } message\n\nAsserts that value is not a string.\n\nvar teaOrder = 4;\nassert.isNotString(teaOrder, 'order placed');",
				"!url": "http://chaijs.com/api/assert/#isNotString",
				"!type": "fn(value: mixed, message: [string]) -> bool"
			},
			"isNumber": {
				"!doc": ".isNumber(value, [message])\n\n  * @param { Number } value\n  * @param { String } message\n\nAsserts that value is a number.\n\nvar cups = 2;\nassert.isNumber(cups, 'how many cups');",
				"!url": "http://chaijs.com/api/assert/#isNumber",
				"!type": "fn(value: number, message: [string]) -> bool"
			},
			"isNotNumber": {
				"!doc": ".isNotNumber(value, [message])\n\n  * @param { Mixed } value\n  * @param { String } message\n\nAsserts that value is not a number.\n\nvar cups = '2 cups please';\nassert.isNotNumber(cups, 'how many cups');",
				"!url": "http://chaijs.com/api/assert/#isNotNumber",
				"!type": "fn(value: mixed, message: [string]) -> bool"
			},
			"isBoolean": {
				"!doc": ".isBoolean(value, [message])\n\n  * @param { Mixed } value\n  * @param { String } message\n\nAsserts that value is a boolean.\n\nvar teaReady = true\n  , teaServed = false;\n\nassert.isBoolean(teaReady, 'is the tea ready');\nassert.isBoolean(teaServed, 'has tea been served');",
				"!url": "http://chaijs.com/api/assert/#isBoolean",
				"!type": "fn(value: mixed, message: [string]) -> bool"
			},
			"isNotBoolean": {
				"!doc": ".isNotBoolean(value, [message])\n\n  * @param { Mixed } value\n  * @param { String } message\n\nAsserts that value is not a boolean.\n\nvar teaReady = 'yep'\n  , teaServed = 'nope';\n\nassert.isNotBoolean(teaReady, 'is the tea ready');\nassert.isNotBoolean(teaServed, 'has tea been served');",
				"!url": "http://chaijs.com/api/assert/#isNotBoolean",
				"!type": "fn(value: mixed, message: [string]) -> bool"
			},
			"typeOf": {
				"!doc": ".typeOf(value, name, [message])\n\n  * @param { Mixed } value\n  * @param { String } name\n  * @param { String } message\n\nAsserts that value's type is name, as determined by\nObject.prototype.toString.\n\nassert.typeOf({ tea: 'chai' }, 'object', 'we have an object');\nassert.typeOf(['chai', 'jasmine'], 'array', 'we have an array');\nassert.typeOf('tea', 'string', 'we have a string');\nassert.typeOf(/tea/, 'regexp', 'we have a regular expression');\nassert.typeOf(null, 'null', 'we have a null');\nassert.typeOf(undefined, 'undefined', 'we have an undefined');",
				"!url": "http://chaijs.com/api/assert/#typeOf",
				"!type": "fn(value: mixed, name: string, message: [string]) -> bool"
			},
			"notTypeOf": {
				"!doc": ".notTypeOf(value, name, [message])\n\n  * @param { Mixed } value\n  * @param { String } typeofname\n  * @param { String } message\n\nAsserts that value's type is not name, as determined by\nObject.prototype.toString.\n\nassert.notTypeOf('tea', 'number', 'strings are not numbers');",
				"!url": "http://chaijs.com/api/assert/#notTypeOf",
				"!type": "fn(value: mixed, typeof: string, message: [string]) -> bool"
			},
			"instanceOf": {
				"!doc": ".instanceOf(object, constructor, [message])\n\n  * @param { Object } object\n  * @param { Constructor } constructor\n  * @param { String } message\n\nAsserts that value is an instance of constructor.\n\nvar Tea = function (name) { this.name = name; }\n  , chai = new Tea('chai');\n\nassert.instanceOf(chai, Tea, 'chai is an instance of tea');",
				"!url": "http://chaijs.com/api/assert/#instanceOf",
				"!type": "fn(object: object, constructor: constructor, message: [string]) -> bool"
			},
			"notInstanceOf": {
				"!doc": ".notInstanceOf(object, constructor, [message])\n\n  * @param { Object } object\n  * @param { Constructor } constructor\n  * @param { String } message\n\nAsserts value is not an instance of constructor.\n\nvar Tea = function (name) { this.name = name; }\n  , chai = new String('chai');\n\nassert.notInstanceOf(chai, Tea, 'chai is not an instance of tea');",
				"!url": "http://chaijs.com/api/assert/#notInstanceOf",
				"!type": "fn(object: object, constructor: constructor, message: [string]) -> bool"
			},
			"include": {
				"!doc": ".include(haystack, needle, [message])\n\n  * @param { Array | String } haystack\n  * @param { Mixed } needle\n  * @param { String } message\n\nAsserts that haystack includes needle. Works\nfor strings and arrays.\n\nassert.include('foobar', 'bar', 'foobar contains string \"bar\"');\nassert.include([ 1, 2, 3 ], 3, 'array contains value');",
				"!url": "http://chaijs.com/api/assert/#include",
				"!type": "fn(haystack: array, needle: mixed, message: [string]) -> bool"
			},
			"notInclude": {
				"!doc": ".notInclude(haystack, needle, [message])\n\n  * @param { Array | String } haystack\n  * @param { Mixed } needle\n  * @param { String } message\n\nAsserts that haystack does not include needle. Works\nfor strings and arrays.\ni\n    assert.notInclude('foobar', 'baz', 'string not include substring');\n    assert.notInclude([ 1, 2, 3 ], 4, 'array not include contain value');\n\n",
				"!url": "http://chaijs.com/api/assert/#notInclude",
				"!type": "fn(haystack: array, needle: mixed, message: [string]) -> bool"
			},
			"match": {
				"!doc": ".match(value, regexp, [message])\n\n  * @param { Mixed } value\n  * @param { RegExp } regexp\n  * @param { String } message\n\nAsserts that value matches the regular expression regexp.\n\nassert.match('foobar', /^foo/, 'regexp matches');",
				"!url": "http://chaijs.com/api/assert/#match",
				"!type": "fn(value: mixed, regexp: regexp, message: [string]) -> bool"
			},
			"notMatch": {
				"!doc": ".notMatch(value, regexp, [message])\n\n  * @param { Mixed } value\n  * @param { RegExp } regexp\n  * @param { String } message\n\nAsserts that value does not match the regular expression regexp.\n\nassert.notMatch('foobar', /^foo/, 'regexp does not match');",
				"!url": "http://chaijs.com/api/assert/#notMatch",
				"!type": "fn(value: mixed, regexp: regexp, message: [string]) -> bool"
			},
			"property": {
				"!doc": ".property(object, property, [message])\n\n  * @param { Object } object\n  * @param { String } property\n  * @param { String } message\n\nAsserts that object has a property named by property.\n\nassert.property({ tea: { green: 'matcha' }}, 'tea');",
				"!url": "http://chaijs.com/api/assert/#property",
				"!type": "fn(object: object, property: string, message: [string]) -> bool"
			},
			"notProperty": {
				"!doc": ".notProperty(object, property, [message])\n\n  * @param { Object } object\n  * @param { String } property\n  * @param { String } message\n\nAsserts that object does not have a property named by property.\n\nassert.notProperty({ tea: { green: 'matcha' }}, 'coffee');",
				"!url": "http://chaijs.com/api/assert/#notProperty",
				"!type": "fn(object: object, property: string, message: [string]) -> bool"
			},
			"deepProperty": {
				"!doc": ".deepProperty(object, property, [message])\n\n  * @param { Object } object\n  * @param { String } property\n  * @param { String } message\n\nAsserts that object has a property named by property, which can be a\nstring using dot- and bracket-notation for deep reference.\n\nassert.deepProperty({ tea: { green: 'matcha' }}, 'tea.green');",
				"!url": "http://chaijs.com/api/assert/#deepProperty",
				"!type": "fn(object: object, property: string, message: [string]) -> bool"
			},
			"notDeepProperty": {
				"!doc": ".notDeepProperty(object, property, [message])\n\n  * @param { Object } object\n  * @param { String } property\n  * @param { String } message\n\nAsserts that object does not have a property named by property, which\ncan be a string using dot- and bracket-notation for deep reference.\n\nassert.notDeepProperty({ tea: { green: 'matcha' }}, 'tea.oolong');",
				"!url": "http://chaijs.com/api/assert/#notDeepProperty",
				"!type": "fn(object: object, property: string, message: [string]) -> bool"
			},
			"propertyVal": {
				"!doc": ".propertyVal(object, property, value, [message])\n\n  * @param { Object } object\n  * @param { String } property\n  * @param { Mixed } value\n  * @param { String } message\n\nAsserts that object has a property named by property with value given\nby value.\n\nassert.propertyVal({ tea: 'is good' }, 'tea', 'is good');",
				"!url": "http://chaijs.com/api/assert/#propertyVal",
				"!type": "fn(object: object, property: string, value: mixed, message: [string]) -> bool"
			},
			"propertyNotVal": {
				"!doc": ".propertyNotVal(object, property, value, [message])\n\n  * @param { Object } object\n  * @param { String } property\n  * @param { Mixed } value\n  * @param { String } message\n\nAsserts that object has a property named by property, but with a value\ndifferent from that given by value.\n\nassert.propertyNotVal({ tea: 'is good' }, 'tea', 'is bad');",
				"!url": "http://chaijs.com/api/assert/#propertyNotVal",
				"!type": "fn(object: object, property: string, value: mixed, message: [string]) -> bool"
			},
			"deepPropertyVal": {
				"!doc": ".deepPropertyVal(object, property, value, [message])\n\n  * @param { Object } object\n  * @param { String } property\n  * @param { Mixed } value\n  * @param { String } message\n\nAsserts that object has a property named by property with value given\nby value. property can use dot- and bracket-notation for deep\nreference.\n\nassert.deepPropertyVal({ tea: { green: 'matcha' }}, 'tea.green', 'matcha');",
				"!url": "http://chaijs.com/api/assert/#deepPropertyVal",
				"!type": "fn(object: object, property: string, value: mixed, message: [string]) -> bool"
			},
			"deepPropertyNotVal": {
				"!doc": ".deepPropertyNotVal(object, property, value, [message])\n\n  * @param { Object } object\n  * @param { String } property\n  * @param { Mixed } value\n  * @param { String } message\n\nAsserts that object has a property named by property, but with a value\ndifferent from that given by value. property can use dot- and\nbracket-notation for deep reference.\n\nassert.deepPropertyNotVal({ tea: { green: 'matcha' }}, 'tea.green', 'konacha');",
				"!url": "http://chaijs.com/api/assert/#deepPropertyNotVal",
				"!type": "fn(object: object, property: string, value: mixed, message: [string]) -> bool"
			},
			"lengthOf": {
				"!doc": ".lengthOf(object, length, [message])\n\n  * @param { Mixed } object\n  * @param { Number } length\n  * @param { String } message\n\nAsserts that object has a length property with the expected value.\n\nassert.lengthOf([1,2,3], 3, 'array has length of 3');\nassert.lengthOf('foobar', 5, 'string has length of 6');",
				"!url": "http://chaijs.com/api/assert/#lengthOf",
				"!type": "fn(object: mixed, length: number, message: [string]) -> bool"
			},
			"throws": {
				"!doc": ".throws(function, [constructor/string/regexp], [string/regexp], [message])\n\n  * @param { Function } function\n  * @param { ErrorConstructor } constructor\n  * @param { RegExp } regexp\n  * @param { String } message\n  * @seehttps://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types  \n\nAsserts that function will throw an error that is an instance of\nconstructor, or alternately that it will throw an error with message\nmatching regexp.\n\nassert.throw(fn, 'function throws a reference error');\nassert.throw(fn, /function throws a reference error/);\nassert.throw(fn, ReferenceError);\nassert.throw(fn, ReferenceError, 'function throws a reference error');\nassert.throw(fn, ReferenceError, /function throws a reference error/);",
				"!url": "http://chaijs.com/api/assert/#throws",
				"!type": "fn(function: function, constructor: [errorconstructor], regexp: [regexp], message: [string]) -> bool"
			},
			"doesNotThrow": {
				"!doc": ".doesNotThrow(function, [constructor/regexp], [message])\n\n  * @param { Function } function\n  * @param { ErrorConstructor } constructor\n  * @param { RegExp } regexp\n  * @param { String } message\n  * @seehttps://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types  \n\nAsserts that function will not throw an error that is an instance of\nconstructor, or alternately that it will not throw an error with message\nmatching regexp.\n\nassert.doesNotThrow(fn, Error, 'function does not throw');",
				"!url": "http://chaijs.com/api/assert/#doesNotThrow",
				"!type": "fn(function: function, constructor: [errorconstructor], regexp: [regexp], message: string) -> bool"
			},
			"operator": {
				"!doc": ".operator(val1, operator, val2, [message])\n\n  * @param { Mixed } val1\n  * @param { String } operator\n  * @param { Mixed } val2\n  * @param { String } message\n\nCompares two values using operator.\n\nassert.operator(1, '<', 2, 'everything is ok');\nassert.operator(1, '>', 2, 'this will fail');",
				"!url": "http://chaijs.com/api/assert/#operator",
				"!type": "fn(val1: mixed, operator: string, val2: mixed, message: [string]) -> bool"
			},
			"closeTo": {
				"!doc": ".closeTo(actual, expected, delta, [message])\n\n  * @param { Number } actual\n  * @param { Number } expected\n  * @param { Number } delta\n  * @param { String } message\n\nAsserts that the target is equal expected, to within a +/- delta range.\n\nassert.closeTo(1.5, 1, 0.5, 'numbers are close');",
				"!url": "http://chaijs.com/api/assert/#closeTo",
				"!type": "fn(actual: number, expected: number, delta: number, message: [string]) -> bool"
			},
			"sameMembers": {
				"!doc": ".sameMembers(set1, set2, [message])\n\n  * @param { Array } superset\n  * @param { Array } subset\n  * @param { String } message\n\nAsserts that set1 and set2 have the same members.\nOrder is not taken into account.\n\nassert.sameMembers([ 1, 2, 3 ], [ 2, 1, 3 ], 'same members');",
				"!url": "http://chaijs.com/api/assert/#sameMembers",
				"!type": "fn(superset: array, subset: array, message: [string]) -> bool"
			},
			"includeMembers": {
				"!doc": ".includeMembers(superset, subset, [message])\n\n  * @param { Array } superset\n  * @param { Array } subset\n  * @param { String } message\n\nAsserts that subset is included in superset.\nOrder is not taken into account.\n\nassert.includeMembers([ 1, 2, 3 ], [ 2, 1 ], 'include members');",
				"!url": "http://chaijs.com/api/assert/#includeMembers",
				"!type": "fn(superset: array, subset: array, message: [string]) -> bool"
			}
		},
		"expect": {
			"Language": {
				"!doc": "Language Chains\n\n\n\nThe following are provided as chainable getters to\nimprove the readability of your assertions. They\ndo not provide an testing capability unless they\nhave been overwritten by a plugin.Chains\n\n",
				"!url": "http://chaijs.com/api/bdd/#Language",
				"!type": "fn() -> bool"
			},
			"not": {
				"!doc": ".not\n\n\n\nNegates any of assertions following in the chain.\n\nexpect(foo).to.not.equal('bar');\nexpect(goodFn).to.not.throw(Error);\nexpect({ foo: 'baz' }).to.have.property('foo')\n  .and.not.equal('bar');",
				"!url": "http://chaijs.com/api/bdd/#not",
				"!type": "fn() -> bool"
			},
			"deep": {
				"!doc": ".deep\n\n\n\nSets the deep flag, later used by the equal and\nproperty assertions.\n\nexpect(foo).to.deep.equal({ bar: 'baz' });\nexpect({ foo: { bar: { baz: 'quux' } } })\n  .to.have.deep.property('foo.bar.baz', 'quux');",
				"!url": "http://chaijs.com/api/bdd/#deep",
				"!type": "fn() -> bool"
			},
			"a": {
				"!doc": ".a(type)\n\n  * @param { String } type\n  * @param { String } message_optional_\n\nThe a and an assertions are aliases that can be\nused either as language chains or to assert a value's\ntype.\n\n// typeof\nexpect('test').to.be.a('string');\nexpect({ foo: 'bar' }).to.be.an('object');\nexpect(null).to.be.a('null');\nexpect(undefined).to.be.an('undefined');\n\n// language chain\nexpect(foo).to.be.an.instanceof(Foo);",
				"!url": "http://chaijs.com/api/bdd/#a",
				"!type": "fn(type: string, message: string) -> bool"
			},
			"include": {
				"!doc": ".include(value)\n\n  * @param { Object | String | Number } obj\n  * @param { String } message_optional_\n\nThe include and contain assertions can be used as either property\nbased language chains or as methods to assert the inclusion of an object\nin an array or a substring in a string. When used as language chains,\nthey toggle the contain flag for the keys assertion.\n\nexpect([1,2,3]).to.include(2);\nexpect('foobar').to.contain('foo');\nexpect({ foo: 'bar', hello: 'universe' }).to.include.keys('foo');",
				"!url": "http://chaijs.com/api/bdd/#include",
				"!type": "fn(obj: object, message: string) -> bool"
			},
			"ok": {
				"!doc": ".ok\n\n\n\nAsserts that the target is truthy.\n\nexpect('everthing').to.be.ok;\nexpect(1).to.be.ok;\nexpect(false).to.not.be.ok;\nexpect(undefined).to.not.be.ok;\nexpect(null).to.not.be.ok;",
				"!url": "http://chaijs.com/api/bdd/#ok",
				"!type": "fn() -> bool"
			},
			"true": {
				"!doc": ".true\n\n\n\nAsserts that the target is true.\n\nexpect(true).to.be.true;\nexpect(1).to.not.be.true;",
				"!url": "http://chaijs.com/api/bdd/#true",
				"!type": "fn() -> bool"
			},
			"false": {
				"!doc": ".false\n\n\n\nAsserts that the target is false.\n\nexpect(false).to.be.false;\nexpect(0).to.not.be.false;",
				"!url": "http://chaijs.com/api/bdd/#false",
				"!type": "fn() -> bool"
			},
			"null": {
				"!doc": ".null\n\n\n\nAsserts that the target is null.\n\nexpect(null).to.be.null;\nexpect(undefined).not.to.be.null;",
				"!url": "http://chaijs.com/api/bdd/#null",
				"!type": "fn() -> bool"
			},
			"undefined": {
				"!doc": ".undefined\n\n\n\nAsserts that the target is undefined.\n\nexpect(undefined).to.be.undefined;\nexpect(null).to.not.be.undefined;",
				"!url": "http://chaijs.com/api/bdd/#undefined",
				"!type": "fn() -> bool"
			},
			"exist": {
				"!doc": ".exist\n\n\n\nAsserts that the target is neither null nor undefined.\n\nvar foo = 'hi'\n  , bar = null\n  , baz;\n\nexpect(foo).to.exist;\nexpect(bar).to.not.exist;\nexpect(baz).to.not.exist;",
				"!url": "http://chaijs.com/api/bdd/#exist",
				"!type": "fn() -> bool"
			},
			"empty": {
				"!doc": ".empty\n\n\n\nAsserts that the target's length is 0. For arrays, it checks\nthe length property. For objects, it gets the count of\nenumerable keys.\n\nexpect([]).to.be.empty;\nexpect('').to.be.empty;\nexpect({}).to.be.empty;",
				"!url": "http://chaijs.com/api/bdd/#empty",
				"!type": "fn() -> bool"
			},
			"arguments": {
				"!doc": ".arguments\n\n\n\nAsserts that the target is an arguments object.\n\nfunction test () {\n  expect(arguments).to.be.arguments;\n}",
				"!url": "http://chaijs.com/api/bdd/#arguments",
				"!type": "fn() -> bool"
			},
			"equal": {
				"!doc": ".equal(value)\n\n  * @param { Mixed } value\n  * @param { String } message_optional_\n\nAsserts that the target is strictly equal (===) to value.\nAlternately, if the deep flag is set, asserts that\nthe target is deeply equal to value.\n\nexpect('hello').to.equal('hello');\nexpect(42).to.equal(42);\nexpect(1).to.not.equal(true);\nexpect({ foo: 'bar' }).to.not.equal({ foo: 'bar' });\nexpect({ foo: 'bar' }).to.deep.equal({ foo: 'bar' });",
				"!url": "http://chaijs.com/api/bdd/#equal",
				"!type": "fn(value: mixed, message: string) -> bool"
			},
			"eql": {
				"!doc": ".eql(value)\n\n  * @param { Mixed } value\n  * @param { String } message_optional_\n\nAsserts that the target is deeply equal to value.\n\nexpect({ foo: 'bar' }).to.eql({ foo: 'bar' });\nexpect([ 1, 2, 3 ]).to.eql([ 1, 2, 3 ]);",
				"!url": "http://chaijs.com/api/bdd/#eql",
				"!type": "fn(value: mixed, message: string) -> bool"
			},
			"above": {
				"!doc": ".above(value)\n\n  * @param { Number } value\n  * @param { String } message_optional_\n\nAsserts that the target is greater than value.Can also be used in conjunction with length to\nassert a minimum length. The benefit being a\nmore informative error message than if the length\nwas supplied directly.\n\nexpect(10).to.be.above(5);expect('foo').to.have.length.above(2);\nexpect([ 1, 2, 3 ]).to.have.length.above(2);",
				"!url": "http://chaijs.com/api/bdd/#above",
				"!type": "fn(value: number, message: string) -> bool"
			},
			"least": {
				"!doc": ".least(value)\n\n  * @param { Number } value\n  * @param { String } message_optional_\n\nAsserts that the target is greater than or equal to value.Can also be used in conjunction with length to\nassert a minimum length. The benefit being a\nmore informative error message than if the length\nwas supplied directly.\n\nexpect(10).to.be.at.least(10);expect('foo').to.have.length.of.at.least(2);\nexpect([ 1, 2, 3 ]).to.have.length.of.at.least(3);",
				"!url": "http://chaijs.com/api/bdd/#least",
				"!type": "fn(value: number, message: string) -> bool"
			},
			"below": {
				"!doc": ".below(value)\n\n  * @param { Number } value\n  * @param { String } message_optional_\n\nAsserts that the target is less than value.Can also be used in conjunction with length to\nassert a maximum length. The benefit being a\nmore informative error message than if the length\nwas supplied directly.\n\nexpect(5).to.be.below(10);expect('foo').to.have.length.below(4);\nexpect([ 1, 2, 3 ]).to.have.length.below(4);",
				"!url": "http://chaijs.com/api/bdd/#below",
				"!type": "fn(value: number, message: string) -> bool"
			},
			"most": {
				"!doc": ".most(value)\n\n  * @param { Number } value\n  * @param { String } message_optional_\n\nAsserts that the target is less than or equal to value.Can also be used in conjunction with length to\nassert a maximum length. The benefit being a\nmore informative error message than if the length\nwas supplied directly.\n\nexpect(5).to.be.at.most(5);expect('foo').to.have.length.of.at.most(4);\nexpect([ 1, 2, 3 ]).to.have.length.of.at.most(3);",
				"!url": "http://chaijs.com/api/bdd/#most",
				"!type": "fn(value: number, message: string) -> bool"
			},
			"within": {
				"!doc": ".within(start, finish)\n\n  * @param { Number } startlowerbound inclusive\n  * @param { Number } finishupperbound inclusive\n  * @param { String } message_optional_\n\nAsserts that the target is within a range.Can also be used in conjunction with length to\nassert a length range. The benefit being a\nmore informative error message than if the length\nwas supplied directly.\n\nexpect(7).to.be.within(5,10);expect('foo').to.have.length.within(2,4);\nexpect([ 1, 2, 3 ]).to.have.length.within(2,4);",
				"!url": "http://chaijs.com/api/bdd/#within",
				"!type": "fn(start: number, finish: number, message: string) -> bool"
			},
			"instanceof": {
				"!doc": ".instanceof(constructor)\n\n  * @param { Constructor } constructor\n  * @param { String } message_optional_\n\nAsserts that the target is an instance of constructor.\n\nvar Tea = function (name) { this.name = name; }\n  , Chai = new Tea('chai');\n\nexpect(Chai).to.be.an.instanceof(Tea);\nexpect([ 1, 2, 3 ]).to.be.instanceof(Array);",
				"!url": "http://chaijs.com/api/bdd/#instanceof",
				"!type": "fn(constructor: constructor, message: string) -> bool"
			},
			"property": {
				"!doc": ".property(name, [value])\n\n  * @param { String } name\n  * @param { Mixed } value(optional)\n  * @param { String } message_optional_\n\nAsserts that the target has a property name, optionally asserting that\nthe value of that property is strictly equal to  value.\nIf the deep flag is set, you can use dot- and bracket-notation for deep\nreferences into objects and arrays.You can also use an array as the starting point of a deep.property\nassertion, or traverse nested arrays.Furthermore, property changes the subject of the assertion\nto be the value of that property from the original object. This\npermits for further chainable assertions on that property.\n\n// simple referencing\nvar obj = { foo: 'bar' };\nexpect(obj).to.have.property('foo');\nexpect(obj).to.have.property('foo', 'bar');\n\n// deep referencing\nvar deepObj = {\n    green: { tea: 'matcha' }\n  , teas: [ 'chai', 'matcha', { tea: 'konacha' } ]\n};\n\nexpect(deepObj).to.have.deep.property('green.tea', 'matcha');\nexpect(deepObj).to.have.deep.property('teas[1]', 'matcha');\nexpect(deepObj).to.have.deep.property('teas[2].tea', 'konacha');var arr = [\n    [ 'chai', 'matcha', 'konacha' ]\n  , [ { tea: 'chai' }\n    , { tea: 'matcha' }\n    , { tea: 'konacha' } ]\n];\n\nexpect(arr).to.have.deep.property('[0][1]', 'matcha');\nexpect(arr).to.have.deep.property('[1][2].tea', 'konacha');expect(obj).to.have.property('foo')\n  .that.is.a('string');\nexpect(deepObj).to.have.property('green')\n  .that.is.an('object')\n  .that.deep.equals({ tea: 'matcha' });\nexpect(deepObj).to.have.property('teas')\n  .that.is.an('array')\n  .with.deep.property('[2]')\n    .that.deep.equals({ tea: 'konacha' });",
				"!url": "http://chaijs.com/api/bdd/#property",
				"!type": "fn(name: string, value: [mixed], message: string) -> bool"
			},
			"ownProperty": {
				"!doc": ".ownProperty(name)\n\n  * @param { String } name\n  * @param { String } message_optional_\n\nAsserts that the target has an own property name.\n\nexpect('test').to.have.ownProperty('length');",
				"!url": "http://chaijs.com/api/bdd/#ownProperty",
				"!type": "fn(name: string, message: string) -> bool"
			},
			"length": {
				"!doc": ".length(value)\n\n  * @param { Number } length\n  * @param { String } message_optional_\n\nAsserts that the target's length property has\nthe expected value.Can also be used as a chain precursor to a value\ncomparison for the length property.\n\nexpect([ 1, 2, 3]).to.have.length(3);\nexpect('foobar').to.have.length(6);expect('foo').to.have.length.above(2);\nexpect([ 1, 2, 3 ]).to.have.length.above(2);\nexpect('foo').to.have.length.below(4);\nexpect([ 1, 2, 3 ]).to.have.length.below(4);\nexpect('foo').to.have.length.within(2,4);\nexpect([ 1, 2, 3 ]).to.have.length.within(2,4);",
				"!url": "http://chaijs.com/api/bdd/#length",
				"!type": "fn(length: number, message: string) -> bool"
			},
			"match": {
				"!doc": ".match(regexp)\n\n  * @param { RegExp } RegularExpression\n  * @param { String } message_optional_\n\nAsserts that the target matches a regular expression.\n\nexpect('foobar').to.match(/^foo/);",
				"!url": "http://chaijs.com/api/bdd/#match",
				"!type": "fn(RegularExpression: regexp, message: string) -> bool"
			},
			"string": {
				"!doc": ".string(string)\n\n  * @param { String } string\n  * @param { String } message_optional_\n\nAsserts that the string target contains another string.\n\nexpect('foobar').to.have.string('bar');",
				"!url": "http://chaijs.com/api/bdd/#string",
				"!type": "fn(string: string, message: string) -> bool"
			},
			"keys": {
				"!doc": ".keys(key1, [key2], [...])\n\n  * @param { String... | Array } keys\n\nAsserts that the target has exactly the given keys, or\nasserts the inclusion of some keys when using the\ninclude or contain modifiers.\n\nexpect({ foo: 1, bar: 2 }).to.have.keys(['foo', 'bar']);\nexpect({ foo: 1, bar: 2, baz: 3 }).to.contain.keys('foo', 'bar');",
				"!url": "http://chaijs.com/api/bdd/#keys",
				"!type": "fn(keys: string) -> bool"
			},
			"throw": {
				"!doc": ".throw(constructor)\n\n  * @param { ErrorConstructor } constructor\n  * @param { String | RegExp } expectederror message\n  * @param { String } message_optional_\n  * @seehttps://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types  \n\nAsserts that the function target will throw a specific error, or specific type of error\n(as determined using instanceof), optionally with a RegExp or string inclusion test\nfor the error's message.Please note that when a throw expectation is negated, it will check each\nparameter independently, starting with error constructor type. The appropriate way\nto check for the existence of a type of error but for a message that does not match\nis to use and.\n\nvar err = new ReferenceError('This is a bad function.');\nvar fn = function () { throw err; }\nexpect(fn).to.throw(ReferenceError);\nexpect(fn).to.throw(Error);\nexpect(fn).to.throw(/bad function/);\nexpect(fn).to.not.throw('good function');\nexpect(fn).to.throw(ReferenceError, /bad function/);\nexpect(fn).to.throw(err);\nexpect(fn).to.not.throw(new RangeError('Out of range.'));expect(fn).to.throw(ReferenceError)\n   .and.not.throw(/good function/);",
				"!url": "http://chaijs.com/api/bdd/#throw",
				"!type": "fn(constructor: errorconstructor, expected: string, message: string) -> bool"
			},
			"respondTo": {
				"!doc": ".respondTo(method)\n\n  * @param { String } method\n  * @param { String } message_optional_\n\nAsserts that the object or class target will respond to a method.To check if a constructor will respond to a static function,\nset the itself flag.\n\nKlass.prototype.bar = function(){};\nexpect(Klass).to.respondTo('bar');\nexpect(obj).to.respondTo('bar');Klass.baz = function(){};\nexpect(Klass).itself.to.respondTo('baz');",
				"!url": "http://chaijs.com/api/bdd/#respondTo",
				"!type": "fn(method: string, message: string) -> bool"
			},
			"itself": {
				"!doc": ".itself\n\n\n\nSets the itself flag, later used by the respondTo assertion.\n\nfunction Foo() {}\nFoo.bar = function() {}\nFoo.prototype.baz = function() {}\n\nexpect(Foo).itself.to.respondTo('bar');\nexpect(Foo).itself.not.to.respondTo('baz');",
				"!url": "http://chaijs.com/api/bdd/#itself",
				"!type": "fn() -> bool"
			},
			"satisfy": {
				"!doc": ".satisfy(method)\n\n  * @param { Function } matcher\n  * @param { String } message_optional_\n\nAsserts that the target passes a given truth test.\n\nexpect(1).to.satisfy(function(num) { return num > 0; });",
				"!url": "http://chaijs.com/api/bdd/#satisfy",
				"!type": "fn(matcher: function, message: string) -> bool"
			},
			"closeTo": {
				"!doc": ".closeTo(expected, delta)\n\n  * @param { Number } expected\n  * @param { Number } delta\n  * @param { String } message_optional_\n\nAsserts that the target is equal expected, to within a +/- delta range.\n\nexpect(1.5).to.be.closeTo(1, 0.5);",
				"!url": "http://chaijs.com/api/bdd/#closeTo",
				"!type": "fn(expected: number, delta: number, message: string) -> bool"
			},
			"members": {
				"!doc": ".members(set)\n\n  * @param { Array } set\n  * @param { String } message_optional_\n\nAsserts that the target is a superset of set,\nor that the target and set have the same members.\n\nexpect([1, 2, 3]).to.include.members([3, 2]);\nexpect([1, 2, 3]).to.not.include.members([3, 2, 8]);\n\nexpect([4, 2]).to.have.members([2, 4]);\nexpect([5, 2]).to.not.have.members([5, 2, 1]);",
				"!url": "http://chaijs.com/api/bdd/#members",
				"!type": "fn(set: array, message: string) -> bool"
			}
		}
	}
};
