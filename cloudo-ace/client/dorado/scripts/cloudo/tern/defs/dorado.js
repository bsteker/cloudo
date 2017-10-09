var ternDefsDorado = {
	"!name": "dorado-core",
	"!group": "dorado",
	"$packagesConfig": { },
	"$setting": {
		"!type": "dorado.Setting"
	},

	"$ajax": { },
	"$DomUtils": {"xCreate": {
		"!type": "fn()"} },
	"finalTop": { },
	"$import": {
		"!type": "fn(pkgs: string, options?: fn())"
	},
	"$load": {
		"!type": "fn(urls: string, options?: string)"
	},
	"$fly": {
		"!type": "fn(elems: +Node) -> jQuery.fn"
	},
	"$create": {
		"!type": "fn(tagName: string) -> +Node"
	},
	"$scopify": {
		"!type": "fn(scope: ?, fn: fn()) -> fn()"
	},
	"$setTimeout": {
		"!type": "fn(scope: ?, fn: fn(), timeMillis: number) -> number"
	},
	"$setInterval": {
		"!type": "fn(scope: ?, fn: fn(), timeMillis: number) -> number"
	},
	"$namespace": {
		"!type": "fn()"
	},
	"$class": {
		"!type": "fn()"
	},
	"$extend": {
		"!type": "fn()"
	},
	"$getSuperClass": {
		"!type": "fn() -> fn()"
	},
	"$getSuperClasses": {
		"!type": "fn() -> [?]"
	},
	"$invokeSuper": {
		"!type": "fn(scope: ?, args?: [?])"
	},
	"$callback": {
		"!type": "fn()"
	},
	"$group": {
		"!type": "fn(objects: ?) -> +dorado.ObjectGroup"
	},
	"$tag": {
		"!type": "fn(tags: string) -> +dorado.ObjectGroup"
	},
	"$url": {
		"!type": "fn()"
	},
	"$singleton": {
		"!type": "fn(factory: string) -> ?"
	},
	"$resource": {
		"!type": "fn(path: string) -> string"
	},
	"$map": {
		"!type": "fn(obj: ?) -> +dorado.util.Map"
	},
	"$id": {
		"!type": "fn(id: string) -> +dorado.ObjectGroup"
	},
	"$waitFor": {
		"!type": "fn()"
	},
	"Array": {
		"!type": "fn()",
		"prototype": {
			"push": {
				"!type": "fn(element: ?)"
			},
			"indexOf": {
				"!type": "fn(element: ?) -> number"
			},
			"remove": {
				"!type": "fn(element: ?) -> number"
			},
			"removeAt": {
				"!type": "fn(i: number)"
			},
			"insert": {
				"!type": "fn(element: ?, i?: ?)"
			},
			"peek": {
				"!type": "fn() -> ?"
			},
			"each": {
				"!type": "fn(fn: fn())"
			}
		}
	},
	"Date": {
		"!type": "fn()",
		"parseDate": {
			"!type": "fn(input: string, format: string) -> +Date"
		},
		"prototype": {
			"formatDate": {
				"!type": "fn(format: string) -> string"
			}
		}
	},
	"dorado": {
		"AbortException": {
			"!type": "fn()",
			"!extends": [ "dorado.Exception" ],
			"prototype": {
				"!proto": "dorado.Exception.prototype"
			}
		},
		"AbstractException": {
			"!type": "fn()"
		},
		"AggregationDataType": {
			"!type": "fn()",
			"!extends": [ "dorado.DataType" ],
			"prototype": {
				"!proto": "dorado.DataType.prototype",
				"parse": {
					"!type": "fn(data: ?) -> +dorado.EntityList"
				}
			}
		},
		"AjaxDataProvider": {
			"!type": "fn()",
			"!extends": [ "dorado.DataProvider" ],
			"prototype": {
				"!proto": "dorado.DataProvider.prototype"
			}
		},
		"AttributeSupport": {
			"!type": "fn()",
			"!events": {
				"onAttributeChange": {
					"!arg": {
						"attribute": {
							"!type": "string"
						},
						"value": { }
					}
				}
			},
			"prototype": {
				"ATTRIBUTES": { },
				"objects": {
					"!type": "[+dorado.AttributeSupport]"
				},
				"getAttributeWatcher": {
					"!type": "fn() -> +dorado.AttributeWatcher"
				},
				"get": {
					"!type": "fn(attr: string) -> !custom:doradoGet"
				},
				"set": {
					"!type": "fn(attr: string, value?: ?, options?: ?) -> !this"
				},
				"hasTag": {
					"!type": "fn(tag: string) -> bool"
				}
			}
		},
		"AttributeWatcher": {
			"!type": "fn()",
			"prototype": {
				"getWritingTimes": {
					"!type": "fn(attr: string) -> number"
				}
			}
		},
		"BasePropertyDef": {
			"!type": "fn()",
			"!extends": [ "dorado.PropertyDef" ],
			"prototype": {
				"!proto": "dorado.PropertyDef.prototype"
			}
		},
		"Browser": {
			"version": {
				"!type": "number"
			},
			"safari": {
				"!type": "bool"
			},
			"chrome": {
				"!type": "bool"
			},
			"opera": {
				"!type": "bool"
			},
			"msie": {
				"!type": "bool"
			},
			"mozilla": {
				"!type": "bool"
			},
			"webkit": {
				"!type": "bool"
			},
			"isTouch": {
				"!type": "bool"
			}
		},
		"Callback": {
			"callback": {
				"!type": "fn(success?: bool, obj?: ?)"
			},
			"success": {
				"!type": "fn(obj?: ?)"
			},
			"failure": {
				"!type": "fn(e?: ?)"
			},
			"invokeCallback": {
				"!type": "fn(callback: ?, success?: ?, arg?: ?, options?: ?)"
			}
		},
		"Core": {
			"VERSION": {
				"!type": "string"
			},
			"newId": {
				"!type": "fn() -> string"
			},
			"getTimestamp": {
				"!type": "fn() -> number"
			},
			"scopify": {
				"!type": "fn(scope: ?, fn: fn()) -> fn()"
			},
			"setTimeout": {
				"!type": "fn(scope: ?, fn: fn(), timeMillis: number) -> number"
			},
			"setInterval": {
				"!type": "fn(scope: ?, fn: fn(), timeMillis: number) -> number"
			},
			"clone": {
				"!type": "fn(obj: ?, deep?: bool) -> ?"
			}
		},
		"DataPath": {
			"!type": "fn()",
			"create": {
				"!type": "fn(path: string) -> +dorado.DataPath"
			},
			"evaluate": {
				"!type": "fn(data: ?, path: string, options?: bool) -> +dorado.Entity"
			},
			"registerInterceptor": {
				"!type": "fn(section: string, dataIntercetor: fn(), dataTypeIntercetor?: fn())"
			},
			"prototype": {
				"compile": {
					"!type": "fn()"
				},
				"evaluate": {
					"!type": "fn(data: ?, options?: bool) -> +dorado.Entity"
				},
				"getDataType": {
					"!type": "fn(dataType: +dorado.DataType, options?: bool) -> +dorado.DataType"
				}
			}
		},
		"DataPipe": {
			"!type": "fn()",
			"prototype": {
				"dataTypeRepository": {
					"!type": "+dorado.DataTypeRepository"
				},
				"dataType": {
					"!type": "+dorado.LazyLoadDataType"
				},
				"runningProcNum": {
					"!type": "number"
				},
				"get": {
					"!type": "fn() -> +dorado.Entity"
				},
				"getAsync": {
					"!type": "fn(callback: dorado.Callback)"
				}
			}
		},
		"DataProvider": {
			"!type": "fn()",
			"create": {
				"!type": "fn(id: string) -> +dorado.DataProvider"
			},
			"prototype": {
				"dataTypeRepository": {
					"!type": "+dorado.DataTypeRepository"
				},
				"dataType": {
					"!type": "+dorado.LazyLoadDataType"
				},
				"message": {
					"!type": "string"
				},
				"supportsEntity": {
					"!type": "bool"
				},
				"id": {
					"!type": "string"
				},
				"name": {
					"!type": "string"
				},
				"getResult": {
					"!type": "fn(arg?: ?) -> +dorado.Entity"
				},
				"getResultAsync": {
					"!type": "fn(arg: ?, callback: dorado.Callback)"
				}
			}
		},
		"DataResolver": {
			"!type": "fn()",
			"create": {
				"!type": "fn(id: string) -> +dorado.DataProvider"
			},
			"prototype": {
				"name": {
					"!type": "string"
				},
				"dataTypeRepository": {
					"!type": "+dorado.DataTypeRepository"
				},
				"message": {
					"!type": "string"
				},
				"getAjaxOptions": {
					"!type": "fn(arg: ?) -> ?"
				},
				"resolve": {
					"!type": "fn(arg?: ?) -> ?"
				},
				"resolveAsync": {
					"!type": "fn(arg: ?, callback: dorado.Callback)"
				}
			}
		},
		"DataType": {
			"!type": "fn()",
			"!extends": [ "dorado.AttributeSupport" ],
			"prototype": {
				"!proto": "dorado.AttributeSupport.prototype",
				"parse": {
					"!type": "fn(data: ?, argument?: ?) -> ?"
				},
				"toText": {
					"!type": "fn(data: ?, argument?: ?) -> string"
				}
			}
		},
		"datatype": {
			"BooleanDataType": {
				"!type": "fn()",
				"!extends": [ "dorado.DataType" ],
				"prototype": {
					"!proto": "dorado.DataType.prototype",
					"parse": {
						"!type": "fn(data: string, argument?: string) -> bool"
					}
				}
			},
			"CharacterDataType": {
				"!type": "fn()",
				"!extends": [ "dorado.DataType" ],
				"prototype": {
					"!proto": "dorado.DataType.prototype"
				}
			},
			"DateDataType": {
				"!type": "fn()",
				"!extends": [ "dorado.DataType" ],
				"prototype": {
					"!proto": "dorado.DataType.prototype",
					"parse": {
						"!type": "fn(data: string, argument?: string) -> +Date"
					},
					"doToText": {
						"!type": "fn(data: +Date, argument?: string) -> string"
					}
				}
			},
			"FloatDataType": {
				"!type": "fn()",
				"!extends": [ "dorado.DataType" ],
				"prototype": {
					"!proto": "dorado.DataType.prototype",
					"doToText": {
						"!type": "string"
					}
				}
			},
			"IntegerDataType": {
				"!type": "fn()",
				"!extends": [ "dorado.DataType" ],
				"prototype": {
					"!proto": "dorado.DataType.prototype",
					"doToText": {
						"!type": "string"
					}
				}
			},
			"PrimitiveBooleanDataType": {
				"!type": "fn()",
				"!extends": [ "dorado.DataType" ],
				"prototype": {
					"!proto": "dorado.DataType.prototype",
					"parse": {
						"!type": "bool"
					}
				}
			},
			"PrimitiveCharDataType": {
				"!type": "fn()",
				"!extends": [ "dorado.DataType" ],
				"prototype": {
					"!proto": "dorado.DataType.prototype"
				}
			},
			"PrimitiveFloatDataType": {
				"!type": "fn()",
				"!extends": [ "dorado.DataType" ],
				"prototype": {
					"!proto": "dorado.DataType.prototype",
					"doToText": {
						"!type": "string"
					}
				}
			},
			"PrimitiveIntDataType": {
				"!type": "fn()",
				"!extends": [ "dorado.DataType" ],
				"prototype": {
					"!proto": "dorado.DataType.prototype",
					"doToText": {
						"!type": "string"
					}
				}
			},
			"StringDataType": {
				"!type": "fn()",
				"!extends": [ "dorado.DataType" ],
				"prototype": {
					"!proto": "dorado.DataType.prototype"
				}
			}
		},
		"DataTypeRepository": {
			"!type": "fn()",
			"ROOT": { },
			"!events": {
				"onDataTypeRegister": {
					"!arg": {
						"dataType": {
							"!type": "+dorado.DataType"
						}
					}
				}
			},
			"prototype": {
				"parent": {
					"!type": "+dorado.DataTypeRepository"
				},
				"children": {
					"!type": "[+dorado.DataTypeRepository]"
				},
				"loadOptions": { },
				"register": {
					"!type": "fn(name: +dorado.DataType, dataType?: +dorado.DataType)"
				},
				"unregister": {
					"!type": "fn(name: ?)"
				},
				"get": {
					"!type": "fn(name: string, loadMode?: string) -> +dorado.DataType"
				},
				"getAsync": {
					"!type": "fn(name: string, callback: dorado.Callback, loadMode?: string)"
				}
			}
		},
		"DataUtil": {
			"convertIfNecessary": {
				"!type": "fn(data: ?, dataTypeRepository?: dorado.DataRepository, dataType?: +dorado.DataType) -> ?"
			},
			"convert": {
				"!type": "fn(data: ?, dataTypeRepository?: dorado.DataRepository, dataType?: +dorado.DataType) -> ?"
			},
			"isOwnerOf": {
				"!type": "fn(data: +dorado.Entity, owner: +dorado.Entity) -> bool"
			},
			"sort": {
				"!type": "fn(array: [?], sortParams: ?, comparator?: fn())"
			}
		},
		"debug": {
			"AjaxGrid": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Grid" ],
				"prototype": {
					"!proto": "dorado.widget.Grid.prototype"
				}
			},
			"AttrGrid": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.TreeGrid" ],
				"prototype": {
					"!proto": "dorado.widget.TreeGrid.prototype"
				}
			},
			"ConsolePanel": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Container" ],
				"prototype": {
					"!proto": "dorado.widget.Container.prototype",
					"setLogLevel": {
						"!type": "fn(level: string)"
					},
					"log": {
						"!type": "fn(msg: string, level?: string)"
					},
					"dir": {
						"!type": "fn(target: ?, level?: string)"
					}
				}
			},
			"ControlsPanel": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Panel" ],
				"!events": {
					"onTreeCurrentChange": {
						"!arg": { }
					}
				},
				"prototype": {
					"!proto": "dorado.widget.Panel.prototype",
					"reload": {
						"!type": "fn()"
					}
				}
			},
			"EventsPanel": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Panel" ],
				"prototype": {
					"!proto": "dorado.widget.Panel.prototype"
				}
			},
			"HotkeysPanel": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.SplitPanel" ],
				"prototype": {
					"!proto": "dorado.widget.SplitPanel.prototype",
					"reload": {
						"!type": "fn()"
					}
				}
			},
			"Logger": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Control" ],
				"prototype": {
					"!proto": "dorado.widget.Control.prototype",
					"clear": {
						"!type": "fn()"
					},
					"log": {
						"!type": "fn(msg: string, level?: string)"
					},
					"dir": {
						"!type": "fn(target: ?, level?: string)"
					}
				}
			},
			"ViewPanel": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.SplitPanel" ],
				"prototype": {
					"!proto": "dorado.widget.SplitPanel.prototype"
				}
			}
		},
		"Debugger": {
			"format2HTML": {
				"!type": "fn(text: string)"
			},
			"extend": {
				"!type": "fn(source: ?)"
			},
			"registerModule": {
				"!type": "fn(config: ?)"
			},
			"show": {
				"!type": "fn()"
			},
			"log": {
				"!type": "fn(msg: string, level?: string)"
			},
			"dir": {
				"!type": "fn(target: ?, level?: string)"
			}
		},
		"Draggable": {
			"!type": "fn()",
			"!events": {
				"onGetDraggingIndicator": {
					"!arg": {
						"indicator": {
							"!type": "+dorado.DraggingIndicator"
						},
						"event": {
							"!type": "+jQuery.Event"
						},
						"draggableElement": {
							"!type": "+Node"
						}
					}
				},
				"onDragStart": {
					"!arg": {
						"draggingInfo": {
							"!type": "+dorado.DraggingInfo"
						},
						"event": {
							"!type": "+jQuery.Event"
						},
						"processDefault": {
							"!type": "bool"
						}
					}
				},
				"onDragStop": {
					"!arg": {
						"draggingInfo": {
							"!type": "+dorado.DraggingInfo"
						},
						"event": {
							"!type": "+jQuery.Event"
						}
					}
				},
				"onDragMove": {
					"!arg": {
						"draggingInfo": {
							"!type": "+dorado.DraggingInfo"
						},
						"event": {
							"!type": "+jQuery.Event"
						}
					}
				}
			}
		},
		"DraggingIndicator": {
			"!type": "fn()",
			"!extends": [ "dorado.RenderableElement" ],
			"prototype": {
				"!proto": "dorado.RenderableElement.prototype"
			}
		},
		"DraggingInfo": {
			"!type": "fn()",
			"!extends": [ "dorado.AttributeSupport" ],
			"prototype": {
				"!proto": "dorado.AttributeSupport.prototype",
				"isDropAcceptable": {
					"!type": "fn(droppableTags: [string]) -> bool"
				}
			}
		},
		"Droppable": {
			"!type": "fn()",
			"!events": {
				"onDraggingSourceOver": {
					"!arg": {
						"draggingInfo": {
							"!type": "+dorado.DraggingInfo"
						},
						"event": {
							"!type": "+jQuery.Event"
						},
						"accept": {
							"!type": "bool"
						}
					}
				},
				"onDraggingSourceOut": {
					"!arg": {
						"draggingInfo": {
							"!type": "+dorado.DraggingInfo"
						},
						"event": {
							"!type": "+jQuery.Event"
						}
					}
				},
				"onDraggingSourceMove": {
					"!arg": {
						"draggingInfo": {
							"!type": "+dorado.DraggingInfo"
						},
						"event": {
							"!type": "+jQuery.Event"
						}
					}
				},
				"beforeDraggingSourceDrop": {
					"!arg": {
						"draggingInfo": {
							"!type": "+dorado.DraggingInfo"
						},
						"event": {
							"!type": "+jQuery.Event"
						},
						"processDefault": {
							"!type": "bool"
						}
					}
				},
				"onDraggingSourceDrop": {
					"!arg": {
						"draggingInfo": {
							"!type": "+dorado.DraggingInfo"
						},
						"event": {
							"!type": "+jQuery.Event"
						}
					}
				}
			}
		},
		"Entity": {
			"!type": "fn()",
			"STATE_NONE": {
				"!type": "number"
			},
			"STATE_NEW": {
				"!type": "number"
			},
			"STATE_MODIFIED": {
				"!type": "number"
			},
			"STATE_DELETED": {
				"!type": "number"
			},
			"STATE_MOVED": {
				"!type": "number"
			},
			"prototype": {
				"entityId": {
					"!type": "number"
				},
				"timestamp": {
					"!type": "number"
				},
				"dataTypeRepository": {
					"!type": "dorad.DataRepository"
				},
				"dataType": {
					"!type": "+dorado.EntityDataType"
				},
				"dataProvider": {
					"!type": "+dorado.DataProvider"
				},
				"parameter": { },
				"state": {
					"!type": "number"
				},
				"disableObservers": {
					"!type": "fn()"
				},
				"enableObservers": {
					"!type": "fn()"
				},
				"notifyObservers": {
					"!type": "fn()"
				},
				"setState": {
					"!type": "fn(state: number)"
				},
				"getPropertyDef": {
					"!type": "fn(property: string) -> +dorado.PropertyDef"
				},
				"get": {
					"!type": "fn(property: string, loadMode?: string) -> ?"
				},
				"getAsync": {
					"!type": "fn(property: string, callback: dorado.Callback, loadMode?: string)"
				},
				"getText": {
					"!type": "fn(property: string, loadMode?: string) -> string"
				},
				"getTextAsync": {
					"!type": "fn(property: string, callback: dorado.Callback, loadMode?: string)"
				},
				"set": {
					"!type": "fn(property: string, value: ?) -> ?"
				},
				"setText": {
					"!type": "fn(property: string, text: string)"
				},
				"cancel": {
					"!type": "fn(deep: bool)"
				},
				"reset": {
					"!type": "fn(property?: string)"
				},
				"createBrother": {
					"!type": "fn(data?: +dorado.Entity, detached?: bool) -> +dorado.Entity"
				},
				"createChild": {
					"!type": "fn(property: string, data?: +dorado.Entity, detached?: bool) -> +dorado.Entity"
				},
				"getPrevious": {
					"!type": "fn() -> +dorado.Entity"
				},
				"getNext": {
					"!type": "fn() -> +dorado.Entity"
				},
				"setCurrent": {
					"!type": "fn(cascade?: bool)"
				},
				"clearData": {
					"!type": "fn()"
				},
				"fromJSON": {
					"!type": "fn(json: ?)"
				},
				"toJSON": {
					"!type": "fn(options?: ?) -> ?"
				},
				"getWrapper": {
					"!type": "fn(options?: ?) -> ?"
				},
				"getOldData": {
					"!type": "fn() -> ?"
				},
				"getMessages": {
					"!type": "fn(property?: string) -> ?"
				},
				"setMessages": {
					"!type": "fn(property?: string, messages?: string)"
				},
				"getMessageState": {
					"!type": "fn(property?: string) -> string"
				},
				"getValidateState": {
					"!type": "fn(property: ?) -> string"
				},
				"validate": {
					"!type": "fn(options?: string) -> string"
				},
				"isDirty": {
					"!type": "fn(property?: string) -> bool"
				},
				"flush": {
					"!type": "fn(callback: ?)"
				},
				"flushAsync": {
					"!type": "fn(callback: dorado.Callback)"
				},
				"remove": {
					"!type": "fn(detach?: bool)"
				}
			}
		},
		"EntityDataType": {
			"!type": "fn()",
			"!extends": [ "dorado.DataType", "dorado.EventSupport" ],
			"!events": {
				"beforeCurrentChange": {
					"!arg": {
						"entityList": {
							"!type": "+dorado.EntityList"
						},
						"oldCurrent": {
							"!type": "+dorado.Entity"
						},
						"newCurrent": {
							"!type": "+dorado.Entity"
						},
						"processDefault": {
							"!type": "bool"
						}
					}
				},
				"onCurrentChange": {
					"!arg": {
						"entityList": {
							"!type": "+dorado.EntityList"
						},
						"oldCurrent": {
							"!type": "+dorado.Entity"
						},
						"newCurrent": {
							"!type": "+dorado.Entity"
						}
					}
				},
				"beforeInsert": {
					"!arg": {
						"entityList": {
							"!type": "+dorado.EntityList"
						},
						"entity": {
							"!type": "+dorado.Entity"
						},
						"insertMode": {
							"!type": "string"
						},
						"refEntity": {
							"!type": "+dorado.Entity"
						},
						"processDefault": {
							"!type": "bool"
						}
					}
				},
				"onInsert": {
					"!arg": {
						"entityList": {
							"!type": "+dorado.EntityList"
						},
						"entity": {
							"!type": "+dorado.Entity"
						},
						"insertMode": {
							"!type": "string"
						},
						"refEntity": {
							"!type": "+dorado.Entity"
						}
					}
				},
				"beforeRemove": {
					"!arg": {
						"entityList": {
							"!type": "+dorado.EntityList"
						},
						"entity": {
							"!type": "+dorado.Entity"
						},
						"processDefault": {
							"!type": "bool"
						}
					}
				},
				"onRemove": {
					"!arg": {
						"entityList": {
							"!type": "+dorado.EntityList"
						},
						"entity": {
							"!type": "+dorado.Entity"
						}
					}
				},
				"beforeDataChange": {
					"!arg": {
						"entity": {
							"!type": "+dorado.Entity"
						},
						"property": {
							"!type": "string"
						},
						"oldValue": { },
						"newValue": { },
						"processDefault": {
							"!type": "bool"
						}
					}
				},
				"onDataChange": {
					"!arg": {
						"entity": {
							"!type": "+dorado.Entity"
						},
						"property": {
							"!type": "string"
						},
						"oldValue": { },
						"newValue": { }
					}
				},
				"beforeStateChange": {
					"!arg": {
						"entity": {
							"!type": "+dorado.Entity"
						},
						"oldState": {
							"!type": "number"
						},
						"newState": {
							"!type": "number"
						},
						"processDefault": {
							"!type": "bool"
						}
					}
				},
				"onStateChange": {
					"!arg": {
						"entity": {
							"!type": "+dorado.Entity"
						},
						"oldState": {
							"!type": "number"
						},
						"newState": {
							"!type": "number"
						}
					}
				},
				"onEntityLoad": {
					"!arg": {
						"entity": {
							"!type": "+dorado.Entity"
						}
					}
				},
				"onMessageChange": {
					"!arg": {
						"entity": {
							"!type": "+dorado.Entity"
						}
					}
				},
				"onEntityToText": {
					"!arg": {
						"entity": {
							"!type": "+dorado.Entity"
						},
						"text": {
							"!type": "string"
						},
						"processDefault": {
							"!type": "bool"
						}
					}
				}
			},
			"prototype": {
				"ATTRIBUTES": { },
				"objects": {
					"!type": "[+dorado.AttributeSupport]"
				},
				"EVENTS": { },
				"addPropertyDef": {
					"!type": "fn(propertyDef: +dorado.PropertyDef) -> ?"
				},
				"getPropertyDef": {
					"!type": "fn(name: string) -> +dorado.PropertyDef"
				},
				"parse": {
					"!type": "fn(data: ?) -> +dorado.Entity"
				},
				"extend": {
					"!type": "fn(config: string) -> +dorado.EntityDataType"
				},
				"toText": {
					"!type": "fn(data: ?, argument?: ?) -> string"
				},
				"getAttributeWatcher": {
					"!type": "fn() -> +dorado.AttributeWatcher"
				},
				"get": {
					"!type": "fn(attr: string) -> !custom:doradoGet"
				},
				"set": {
					"!type": "fn(attr: string, value?: ?, options?: ?) -> !this"
				},
				"hasTag": {
					"!type": "fn(tag: string) -> bool"
				},
				"addListener": {
					"!type": "fn(name: string, listener: fn(), options?: ?) -> ?"
				},
				"removeListener": {
					"!type": "fn(name: string, listener?: fn())"
				},
				"clearListeners": {
					"!type": "fn(name: string)"
				},
				"disableListeners": {
					"!type": "fn()"
				},
				"enableListeners": {
					"!type": "fn()"
				},
				"fireEvent": {
					"!type": "fn(name: string) -> bool"
				},
				"getListenerCount": {
					"!type": "fn(name: string) -> number"
				}
			}
		},
		"EntityList": {
			"!type": "fn()",
			"prototype": {
				"current": {
					"!type": "+dorado.Entity"
				},
				"timestamp": {
					"!type": "number"
				},
				"dataTypeRepository": {
					"!type": "dorad.DataRepository"
				},
				"dataType": {
					"!type": "+dorado.AggregationDataType"
				},
				"elementDataType": {
					"!type": "+dorado.EntityDataType"
				},
				"pageSize": {
					"!type": "number"
				},
				"pageNo": {
					"!type": "number"
				},
				"pageCount": {
					"!type": "number"
				},
				"entityCount": {
					"!type": "number"
				},
				"dataProvider": {
					"!type": "+dorado.DataProvider"
				},
				"parameter": { },
				"disableObservers": {
					"!type": "fn()"
				},
				"enableObservers": {
					"!type": "fn()"
				},
				"notifyObservers": {
					"!type": "fn()"
				},
				"isPageLoaded": {
					"!type": "fn(pageNo: number) -> bool"
				},
				"setCurrent": {
					"!type": "fn(current: +dorado.Entity)"
				},
				"hasPrevious": {
					"!type": "fn() -> bool"
				},
				"hasNext": {
					"!type": "fn() -> bool"
				},
				"getFirst": {
					"!type": "fn() -> +dorado.Entity",
					"!effects": [ "custom doradoEntity" ]
				},
				"getLast": {
					"!type": "fn() -> +dorado.Entity",
					"!effects": [ "custom doradoEntity" ]
				},
				"first": {
					"!type": "fn(loadPage?: ?) -> +dorado.Entity",
					"!effects": [ "custom doradoEntity" ]
				},
				"previous": {
					"!type": "fn(loadPage?: ?) -> +dorado.Entity",
					"!effects": [ "custom doradoEntity" ]
				},
				"next": {
					"!type": "fn(loadPage?: ?) -> +dorado.Entity",
					"!effects": [ "custom doradoEntity" ]
				},
				"last": {
					"!type": "fn(loadPage?: ?) -> +dorado.Entity",
					"!effects": [ "custom doradoEntity" ]
				},
				"move": {
					"!type": "fn(offset: number)"
				},
				"gotoPage": {
					"!type": "fn(pageNo: number, callback?: dorado.Callback) -> +dorado.Entity"
				},
				"firstPage": {
					"!type": "fn(callback?: dorado.Callback)"
				},
				"previousPage": {
					"!type": "fn(callback?: dorado.Callback)"
				},
				"nextPage": {
					"!type": "fn(callback?: dorado.Callback)"
				},
				"lastPage": {
					"!type": "fn(callback?: dorado.Callback)"
				},
				"isEmpty": {
					"!type": "fn() -> bool"
				},
				"insert": {
					"!type": "fn(entity: +dorado.Entity, insertMode?: string, refEntity?: +dorado.Entity) -> ?"
				},
				"remove": {
					"!type": "fn(entity?: +dorado.Entity, detach?: bool)"
				},
				"createChild": {
					"!type": "fn(data?: ?, detached?: bool) -> +dorado.Entity",
					"!effects": [ "custom doradoEntity" ]
				},
				"getById": {
					"!type": "fn(id: ?) -> +dorado.Entity",
					"!effects": [ "custom doradoEntity" ]
				},
				"cancel": {
					"!type": "fn(deep: bool)"
				},
				"clear": {
					"!type": "fn()"
				},
				"flush": {
					"!type": "fn(callback: ?)"
				},
				"flushAsync": {
					"!type": "fn(callback: dorado.Callback)"
				},
				"fromJSON": {
					"!type": "fn(json: [?])"
				},
				"toJSON": {
					"!type": "fn(options?: ?) -> [?]"
				},
				"toArray": {
					"!type": "fn() -> [?]"
				},
				"getWrapper": {
					"!type": "fn(options?: ?) -> ?"
				},
				"each": {
					"!type": "fn(fn: fn(), scope?: ?)"
				},
				"iterator": {
					"!type": "fn(options?: ?) -> +dorado.util.Iterator"
				}
			}
		},
		"EventSupport": {
			"!type": "fn()",
			"prototype": {
				"EVENTS": { },
				"addListener": {
					"!type": "fn(name: string, listener: fn(), options?: ?) -> ?"
				},
				"removeListener": {
					"!type": "fn(name: string, listener?: fn())"
				},
				"clearListeners": {
					"!type": "fn(name: string)"
				},
				"disableListeners": {
					"!type": "fn()"
				},
				"enableListeners": {
					"!type": "fn()"
				},
				"fireEvent": {
					"!type": "fn(name: string) -> bool"
				},
				"getListenerCount": {
					"!type": "fn(name: string) -> number"
				}
			}
		},
		"Exception": {
			"!type": "fn()",
			"!extends": [ "dorado.AbstractException" ],
			"formatStack": {
				"!type": "fn(stack: [string]) -> string"
			},
			"processException": {
				"!type": "fn(e: +dorado.Exception)"
			},
			"removeException": {
				"!type": "fn(e: +dorado.Exception)"
			},
			"prototype": {
				"!proto": "dorado.AbstractException.prototype",
				"stack": {
					"!type": "[string]"
				},
				"systemStack": {
					"!type": "[string]"
				},
				"remoteStack": {
					"!type": "[string]"
				},
				"formatStack": {
					"!type": "fn(stack: [string]) -> string"
				}
			}
		},
		"JSON": {
			"parse": {
				"!type": "fn(text: ?, untrusty?: bool) -> ?"
			},
			"stringify": {
				"!type": "fn(value: ?, options?: ?) -> string"
			},
			"evaluate": {
				"!type": "fn(template: ?) -> ?"
			}
		},
		"LazyLoadDataType": {
			"!type": "fn()",
			"prototype": {
				"dataTypeRepository": {
					"!type": "+dorado.DataTypeRepository"
				},
				"id": {
					"!type": "string"
				},
				"get": {
					"!type": "fn(loadMode?: string) -> +dorado.DataType"
				},
				"getAsync": {
					"!type": "fn(loadMode?: string, callback: dorado.Callback)"
				}
			}
		},
		"MessageBox": {
			"defaultTitle": { },
			"minWidth": { },
			"maxWidth": { },
			"alert": {
				"!type": "fn(msg: string, options: ?)"
			},
			"confirm": {
				"!type": "fn(msg: string, options: ?)"
			},
			"prompt": {
				"!type": "fn(msg: string, options: ?)"
			},
			"promptMultiLines": {
				"!type": "fn(msg: string, options: ?)"
			},
			"show": {
				"!type": "fn(options: ?)"
			}
		},
		"ModalManager": {
			"show": {
				"!type": "fn(dom: +Node, maskClass?: string)"
			},
			"hide": {
				"!type": "fn(dom: +Node)"
			}
		},
		"Object": {
			"createNamespace": {
				"!type": "fn(name: string)"
			},
			"createClass": {
				"!type": "fn(p: ?) -> ?"
			},
			"override": {
				"!type": "fn(subClass: ?, overrides: ?, overwrite?: bool)"
			},
			"extend": {
				"!type": "fn(superClass: ?, overrides?: ?) -> ?"
			},
			"eachProperty": {
				"!type": "fn(object: ?, fn: fn())"
			},
			"apply": {
				"!type": "fn(target: ?, source: ?, options?: bool) -> ?"
			},
			"isInstanceOf": {
				"!type": "fn(object: ?, type: fn()) -> bool"
			},
			"clone": {
				"!type": "fn(object: ?, options?: ?) -> ?"
			}
		},
		"ObjectGroup": {
			"!type": "fn()",
			"prototype": {
				"set": {
					"!type": "fn(attr: string, value?: ?) -> +dorado.AttributeSupport"
				},
				"get": {
					"!type": "fn(attr: string) -> +dorado.ObjectGroup"
				},
				"addListener": {
					"!type": "fn(name: string, listener: fn(), options?: ?) -> +dorado.AttributeSupport"
				},
				"removeListener": {
					"!type": "fn(name: string, listener?: fn()) -> +dorado.AttributeSupport"
				},
				"invoke": {
					"!type": "fn(methodName: string, arg?: ?)"
				},
				"each": {
					"!type": "fn(fn: fn())"
				}
			}
		},
		"PropertyDef": {
			"!type": "fn()",
			"!extends": [ "dorado.AttributeSupport", "dorado.EventSupport" ],
			"!events": {
				"onGet": {
					"!arg": {
						"entity": {
							"!type": "+dorado.Entity"
						},
						"value": { }
					}
				},
				"onGetText": {
					"!arg": {
						"entity": {
							"!type": "+dorado.Entity"
						},
						"text": {
							"!type": "string"
						}
					}
				},
				"onSet": {
					"!arg": {
						"entity": {
							"!type": "+dorado.Entity"
						},
						"value": { }
					}
				}
			},
			"prototype": {
				"ATTRIBUTES": { },
				"objects": {
					"!type": "[+dorado.AttributeSupport]"
				},
				"EVENTS": { },
				"getMappedValue": {
					"!type": "fn(key: string) -> ?"
				},
				"getMappedKey": {
					"!type": "fn(value: ?) -> string"
				},
				"getAttributeWatcher": {
					"!type": "fn() -> +dorado.AttributeWatcher"
				},
				"get": {
					"!type": "fn(attr: string) -> !custom:doradoGet"
				},
				"set": {
					"!type": "fn(attr: string, value?: ?, options?: ?) -> !this"
				},
				"hasTag": {
					"!type": "fn(tag: string) -> bool"
				},
				"addListener": {
					"!type": "fn(name: string, listener: fn(), options?: ?) -> ?"
				},
				"removeListener": {
					"!type": "fn(name: string, listener?: fn())"
				},
				"clearListeners": {
					"!type": "fn(name: string)"
				},
				"disableListeners": {
					"!type": "fn()"
				},
				"enableListeners": {
					"!type": "fn()"
				},
				"fireEvent": {
					"!type": "fn(name: string) -> bool"
				},
				"getListenerCount": {
					"!type": "fn(name: string) -> number"
				}
			}
		},
		"Reference": {
			"!type": "fn()",
			"!extends": [ "dorado.PropertyDef" ],
			"!events": {
				"beforeLoadData": {
					"!arg": {
						"entity": {
							"!type": "+dorado.Entity"
						},
						"pageNo": {
							"!type": "number"
						},
						"data": { }
					}
				},
				"onLoadData": {
					"!arg": {
						"entity": {
							"!type": "+dorado.Entity"
						},
						"pageNo": {
							"!type": "number"
						}
					}
				}
			},
			"prototype": {
				"!proto": "dorado.PropertyDef.prototype",
				"getDataPipe": {
					"!type": "fn(entity: ?) -> +dorado.DataPipe"
				}
			}
		},
		"RemoteException": {
			"!type": "fn()",
			"!extends": [ "dorado.Exception" ],
			"prototype": {
				"!proto": "dorado.Exception.prototype",
				"exceptionType": {
					"!type": "string"
				}
			}
		},
		"RenderableElement": {
			"!type": "fn()",
			"!extends": [ "dorado.AttributeSupport" ],
			"prototype": {
				"!proto": "dorado.AttributeSupport.prototype",
				"createDom": {
					"!type": "fn() -> +Node"
				},
				"refreshDom": {
					"!type": "fn(dom: +Node)"
				},
				"getRealWidth": {
					"!type": "fn() -> number"
				},
				"getRealHeight": {
					"!type": "fn() -> number"
				},
				"getDom": {
					"!type": "fn() -> +Node"
				},
				"render": {
					"!type": "fn(containerElement: +Node, nextChildElement?: +Node)"
				},
				"replace": {
					"!type": "fn(elmenent: +Node)"
				},
				"unrender": {
					"!type": "fn()"
				},
				"refresh": {
					"!type": "fn(delay: bool)"
				}
			}
		},
		"Renderer": {
			"!type": "fn()",
			"NONE_RENDERER": { },
			"prototype": {
				"render": {
					"!type": "fn(dom: +Node, arg: ?)"
				}
			}
		},
		"ResourceException": {
			"!type": "fn()",
			"!extends": [ "dorado.Exception" ],
			"prototype": {
				"!proto": "dorado.Exception.prototype"
			}
		},
		"RunnableException": {
			"!type": "fn()",
			"!extends": [ "dorado.AbstractException" ],
			"prototype": {
				"!proto": "dorado.AbstractException.prototype",
				"script": {
					"!type": "string"
				}
			}
		},
		"Setting": { },
		"SummaryCalculators": {
			"count": { },
			"sum": { },
			"average": { },
			"max": { },
			"min": { }
		},
		"TagManager": {
			"register": {
				"!type": "fn(object: +dorado.AttributeSupport)"
			},
			"unregister": {
				"!type": "fn(object: +dorado.AttributeSupport)"
			},
			"find": {
				"!type": "fn(tags: string) -> +dorado.ObjectGroup"
			}
		},
		"TipManager": {
			"hasTip": {
				"!type": "fn(element: +dorado.RenderableElement) -> bool"
			},
			"getTip": {
				"!type": "fn(element: +dorado.RenderableElement) -> +dorado.widget.ToolTip"
			},
			"initTip": {
				"!type": "fn(element: +dorado.RenderableElement, options: ?)"
			},
			"updateTip": {
				"!type": "fn(element: +dorado.RenderableElement, options: ?)"
			},
			"deleteTip": {
				"!type": "fn(element: +dorado.RenderableElement)"
			},
			"showTip": {
				"!type": "fn(element: +Node, delay: number, event: +jQuery.Event)"
			},
			"hideTip": {
				"!type": "fn(tip: +dorado.widget.ToolTip, delay: number)"
			}
		},
		"Toolkits": {
			"URL_VARS": { },
			"registerPrototype": {
				"!type": "fn(namespace: string, name: string, constr: ?)"
			},
			"getPrototype": {
				"!type": "fn(namespace: string, name: string) -> ?"
			},
			"createInstance": {
				"!type": "fn(namespace: string, config: ?, typeTranslator?: fn()) -> ?"
			},
			"translateURL": {
				"!type": "fn(url: string) -> string"
			}
		},
		"util": {
			"AjaxEngine": {
				"!type": "fn()",
				"!extends": [ "dorado.EventSupport" ],
				"!events": {
					"beforeRequest": {
						"!arg": {
							"async": {
								"!type": "bool"
							},
							"options": { }
						}
					},
					"onRequest": {
						"!arg": {
							"async": {
								"!type": "bool"
							},
							"options": { }
						}
					},
					"beforeConnect": {
						"!arg": {
							"async": {
								"!type": "bool"
							},
							"options": { }
						}
					},
					"onConnect": {
						"!arg": {
							"async": {
								"!type": "bool"
							},
							"options": { }
						}
					}
				},
				"prototype": {
					"!proto": "dorado.EventSupport.prototype",
					"request": {
						"!type": "fn(options?: string, callback?: dorado.Callback)"
					},
					"requestSync": {
						"!type": "fn(options?: string, alwaysReturn?: bool) -> +dorado.util.AjaxResult"
					}
				}
			},
			"AjaxException": {
				"!type": "fn()",
				"!extends": [ "dorado.Exception" ],
				"prototype": {
					"!proto": "dorado.Exception.prototype",
					"message": {
						"!type": "string"
					},
					"description": {
						"!type": "string"
					},
					"url": {
						"!type": "string"
					},
					"method": {
						"!type": "string"
					},
					"status": {
						"!type": "number"
					},
					"statusText": {
						"!type": "string"
					}
				}
			},
			"AjaxResult": {
				"!type": "fn()",
				"prototype": {
					"options": { },
					"success": {
						"!type": "bool"
					},
					"url": {
						"!type": "string"
					},
					"method": {
						"!type": "string"
					},
					"status": {
						"!type": "number"
					},
					"statusText": {
						"!type": "string"
					},
					"allResponseHeaders": {
						"!type": "string"
					},
					"text": {
						"!type": "string"
					},
					"exception": {
						"!type": "+Error"
					},
					"getResponseHeaders": {
						"!type": "fn() -> ?"
					},
					"getXmlDocument": {
						"!type": "fn() -> +XMLDocument"
					},
					"getJsonData": {
						"!type": "fn(untrusty?: bool) -> ?"
					}
				}
			},
			"AjaxTimeoutException": {
				"!type": "fn()",
				"!extends": [ "dorado.util.AjaxException" ],
				"prototype": {
					"!proto": "dorado.util.AjaxException.prototype"
				}
			},
			"ArrayIterator": {
				"!type": "fn()",
				"!extends": [ "dorado.util.Iterator" ],
				"prototype": {
					"!proto": "dorado.util.Iterator.prototype",
					"setNextIndex": {
						"!type": "fn(nextIndex: ?)"
					}
				}
			},
			"Common": {
				"formatFloat": {
					"!type": "fn(n: number, format: string) -> string"
				},
				"parseFloat": {
					"!type": "fn(s: string) -> number"
				},
				"getClassType": {
					"!type": "fn(type: string, silence?: bool) -> fn()"
				},
				"getSingletonInstance": {
					"!type": "fn(factory: string) -> ?"
				}
			},
			"Dom": {
				"getInvisibleContainer": {
					"!type": "fn() -> +Node"
				},
				"getOwnerWindow": {
					"!type": "fn(node: +Node) -> window"
				},
				"isOwnerOf": {
					"!type": "fn(node: +Node, owner: +Node) -> bool"
				},
				"findParent": {
					"!type": "fn(node: +Node, fn: fn(), includeSelf?: bool) -> +Node"
				},
				"xCreate": {
					"!type": "fn(template: ?, arg?: ?, context?: ?) -> +Node"
				},
				"getCellPosition": {
					"!type": "fn(event: +jQuery.Event) -> ?"
				},
				"dockAround": {
					"!type": "fn(element: +Node, fixedElement: +Node, options: ?) -> ?"
				},
				"locateIn": {
					"!type": "fn(element: +Node, options: ?) -> ?"
				},
				"disableUserSelection": {
					"!type": "fn(element: +Node)"
				},
				"enableUserSelection": {
					"!type": "fn(element: +Node)"
				},
				"bringToFront": {
					"!type": "fn(element: +Node) -> number"
				},
				"modernScroll": {
					"!type": "fn(container: ?, options?: ?)"
				}
			},
			"Iterator": {
				"!type": "fn()",
				"prototype": {
					"first": {
						"!type": "fn()"
					},
					"last": {
						"!type": "fn()"
					},
					"hasPrevious": {
						"!type": "fn() -> bool"
					},
					"hasNext": {
						"!type": "fn() -> bool"
					},
					"previous": {
						"!type": "fn() -> ?"
					},
					"next": {
						"!type": "fn() -> ?"
					},
					"current": {
						"!type": "fn() -> ?"
					},
					"createBookmark": {
						"!type": "fn() -> ?"
					},
					"restoreBookmark": {
						"!type": "fn(bookmark: ?)"
					}
				}
			},
			"KeyedArray": {
				"!type": "fn()",
				"prototype": {
					"items": {
						"!type": "[?]"
					},
					"size": {
						"!type": "number"
					},
					"insert": {
						"!type": "fn(data: ?, insertMode?: number, refData?: ?)"
					},
					"append": {
						"!type": "fn(data: ?)"
					},
					"remove": {
						"!type": "fn(data: ?) -> number"
					},
					"removeAt": {
						"!type": "fn(i: number) -> ?"
					},
					"indexOf": {
						"!type": "fn(data: ?) -> number"
					},
					"replace": {
						"!type": "fn(oldData: ?, newData: ?) -> number"
					},
					"get": {
						"!type": "fn(k: number) -> ?"
					},
					"clear": {
						"!type": "fn()"
					},
					"iterator": {
						"!type": "fn(from?: ?) -> +dorado.util.Iterator"
					},
					"each": {
						"!type": "fn(fn: fn(), scope?: ?)"
					},
					"toArray": {
						"!type": "fn() -> [?]"
					},
					"clone": {
						"!type": "fn() -> +dorado.util.KeyedArray"
					},
					"deepClone": {
						"!type": "fn() -> +dorado.util.KeyedArray"
					}
				}
			},
			"KeyedList": {
				"!type": "fn()",
				"prototype": {
					"first": { },
					"last": { },
					"size": {
						"!type": "number"
					},
					"insert": {
						"!type": "fn(data: ?, insertMode?: string, refData?: ?)"
					},
					"append": {
						"!type": "fn(data: ?)"
					},
					"remove": {
						"!type": "fn(data: ?) -> bool"
					},
					"removeKey": {
						"!type": "fn(key: string) -> ?"
					},
					"get": {
						"!type": "fn(key: string) -> ?"
					},
					"clear": {
						"!type": "fn()"
					},
					"iterator": {
						"!type": "fn(from?: ?) -> +dorado.util.KeyedListIterator"
					},
					"each": {
						"!type": "fn(fn: fn(), scope?: ?)"
					},
					"toArray": {
						"!type": "fn() -> [?]"
					},
					"getFirst": {
						"!type": "fn() -> ?"
					},
					"getLast": {
						"!type": "fn() -> ?"
					},
					"clone": {
						"!type": "fn() -> +dorado.util.KeyedList"
					},
					"deepClone": {
						"!type": "fn() -> +dorado.util.KeyedArray"
					}
				}
			},
			"KeyedListIterator": {
				"!type": "fn()",
				"!extends": [ "dorado.util.Iterator" ],
				"prototype": {
					"!proto": "dorado.util.Iterator.prototype"
				}
			},
			"Map": {
				"!type": "fn()",
				"prototype": {
					"put": {
						"!type": "fn(key: +dorado.util.Map, value?: ?)"
					},
					"set": {
						"!type": "fn()"
					},
					"get": {
						"!type": "fn(key: string) -> ?"
					},
					"isEmpty": {
						"!type": "fn() -> bool"
					},
					"remove": {
						"!type": "fn(key: string)"
					},
					"clear": {
						"!type": "fn()"
					},
					"toJSON": {
						"!type": "fn() -> ?"
					},
					"keys": {
						"!type": "fn() -> [string]"
					},
					"eachKey": {
						"!type": "fn(fn: fn())"
					}
				}
			},
			"ObjectPool": {
				"!type": "fn()",
				"prototype": {
					"borrowObject": {
						"!type": "fn() -> ?"
					},
					"returnObject": {
						"!type": "fn(object: ?)"
					},
					"getNumActive": {
						"!type": "fn() -> number"
					},
					"getNumIdle": {
						"!type": "fn() -> number"
					},
					"destroy": {
						"!type": "fn()"
					}
				}
			},
			"Resource": {
				"append": {
					"!type": "fn(namespace: string, items: ?)"
				},
				"get": {
					"!type": "fn(path: string) -> string"
				}
			},
			"TaskGroupPanel": {
				"!type": "fn()",
				"prototype": {
					"addTask": {
						"!type": "fn(taskInfo: string, taskId: number)"
					},
					"removeTask": {
						"!type": "fn(taskId: number)"
					},
					"show": {
						"!type": "fn(options: ?)"
					},
					"hide": {
						"!type": "fn()"
					},
					"render": {
						"!type": "fn(dom: +Node, dom: +Node, node: +dorado.widget.tree.Node)"
					}
				}
			},
			"TaskIndicator": {
				"registerTaskGroup": {
					"!type": "fn(groupName: string, options?: ?)"
				},
				"showTaskIndicator": {
					"!type": "fn(taskInfo?: string, groupName?: string) -> string"
				},
				"hideTaskIndicator": {
					"!type": "fn(taskId: string)"
				}
			}
		},
		"validator": {
			"AjaxValidator": {
				"!type": "fn()",
				"!extends": [ "dorado.validator.RemoteValidator" ],
				"!events": {
					"beforeExecute": {
						"!arg": {
							"data": { },
							"property": {
								"!type": "string"
							},
							"entity": {
								"!type": "+dorado.Entity"
							},
							"parameter": { }
						}
					}
				},
				"prototype": {
					"!proto": "dorado.validator.RemoteValidator.prototype"
				}
			},
			"BaseValidator": {
				"!type": "fn()",
				"!extends": [ "dorado.validator.Validator" ],
				"prototype": {
					"!proto": "dorado.validator.Validator.prototype"
				}
			},
			"CharLengthValidator": {
				"!type": "fn()",
				"!extends": [ "dorado.validator.BaseValidator" ],
				"prototype": {
					"!proto": "dorado.validator.BaseValidator.prototype"
				}
			},
			"CustomValidator": {
				"!type": "fn()",
				"!extends": [ "dorado.validator.Validator" ],
				"!events": {
					"onValidate": {
						"!arg": {
							"data": { },
							"property": {
								"!type": "string"
							},
							"entity": {
								"!type": "+dorado.Entity"
							},
							"result": {
								"!type": "string"
							}
						}
					}
				},
				"prototype": {
					"!proto": "dorado.validator.Validator.prototype"
				}
			},
			"EnumValidator": {
				"!type": "fn()",
				"!extends": [ "dorado.validator.BaseValidator" ],
				"prototype": {
					"!proto": "dorado.validator.BaseValidator.prototype"
				}
			},
			"LengthValidator": {
				"!type": "fn()",
				"!extends": [ "dorado.validator.BaseValidator" ],
				"prototype": {
					"!proto": "dorado.validator.BaseValidator.prototype"
				}
			},
			"RangeValidator": {
				"!type": "fn()",
				"!extends": [ "dorado.validator.BaseValidator" ],
				"prototype": {
					"!proto": "dorado.validator.BaseValidator.prototype"
				}
			},
			"RegExpValidator": {
				"!type": "fn()",
				"!extends": [ "dorado.validator.BaseValidator" ],
				"prototype": {
					"!proto": "dorado.validator.BaseValidator.prototype"
				}
			},
			"RemoteValidator": {
				"!type": "fn()",
				"!extends": [ "dorado.validator.Validator" ],
				"prototype": {
					"!proto": "dorado.validator.Validator.prototype"
				}
			},
			"RequiredValidator": {
				"!type": "fn()",
				"!extends": [ "dorado.validator.BaseValidator" ],
				"prototype": {
					"!proto": "dorado.validator.BaseValidator.prototype"
				}
			},
			"Validator": {
				"!type": "fn()",
				"!extends": [ "dorado.AttributeSupport", "dorado.EventSupport" ],
				"prototype": {
					"ATTRIBUTES": { },
					"objects": {
						"!type": "[+dorado.AttributeSupport]"
					},
					"EVENTS": { },
					"validate": {
						"!type": "fn(data: ?, arg?: ?) -> [?]"
					},
					"getAttributeWatcher": {
						"!type": "fn() -> +dorado.AttributeWatcher"
					},
					"get": {
						"!type": "fn(attr: string) -> !custom:doradoGet"
					},
					"set": {
						"!type": "fn(attr: string, value?: ?, options?: ?) -> !this"
					},
					"hasTag": {
						"!type": "fn(tag: string) -> bool"
					},
					"addListener": {
						"!type": "fn(name: string, listener: fn(), options?: ?) -> ?"
					},
					"removeListener": {
						"!type": "fn(name: string, listener?: fn())"
					},
					"clearListeners": {
						"!type": "fn(name: string)"
					},
					"disableListeners": {
						"!type": "fn()"
					},
					"enableListeners": {
						"!type": "fn()"
					},
					"fireEvent": {
						"!type": "fn(name: string) -> bool"
					},
					"getListenerCount": {
						"!type": "fn(name: string) -> number"
					}
				}
			}
		},
		"widget": {
			"AbstractBlockView": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.ViewPortList" ],
				"!events": {
					"onRenderBlock": {
						"!arg": {
							"dom": {
								"!type": "+Node"
							},
							"data": {
								"!type": "+dorado.Entity"
							},
							"processDefault": {
								"!type": "bool"
							}
						}
					},
					"onBlockMouseDown": {
						"!arg": {
							"data": {
								"!type": "+dorado.Entity"
							}
						}
					},
					"onBlockMouseUp": {
						"!arg": {
							"data": {
								"!type": "+dorado.Entity"
							}
						}
					},
					"onBlockClick": {
						"!arg": {
							"data": {
								"!type": "+dorado.Entity"
							}
						}
					},
					"onBlockDoubleClick": {
						"!arg": {
							"data": {
								"!type": "+dorado.Entity"
							}
						}
					}
				},
				"prototype": {
					"!proto": "dorado.widget.ViewPortList.prototype"
				}
			},
			"AbstractButton": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Control" ],
				"!events": {
					"onToggle": {
						"!arg": { }
					}
				},
				"prototype": {
					"!proto": "dorado.widget.Control.prototype",
					"click": {
						"!type": "fn()"
					}
				}
			},
			"AbstractDataEditor": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.AbstractEditor", "dorado.widget.PropertyDataControl" ],
				"prototype": {
					"renderUtilAttached": {
						"!type": "bool"
					},
					"focusable": {
						"!type": "bool"
					},
					"selectable": {
						"!type": "bool"
					},
					"getFocusableSubControls": {
						"!type": "[+dorado.widget.Control]"
					},
					"ATTRIBUTES": { },
					"objects": {
						"!type": "[+dorado.AttributeSupport]"
					},
					"EVENTS": { },
					"getBindingInfo": {
						"!type": "fn() -> ?"
					},
					"post": {
						"!type": "fn() -> bool"
					},
					"refreshData": {
						"!type": "fn()"
					},
					"refreshDom": {
						"!type": "fn(dom: +Node)"
					},
					"getDom": {
						"!type": "fn() -> +Node"
					},
					"findParent": {
						"!type": "fn(type: ?) -> +dorado.widget.Container"
					},
					"isFocusable": {
						"!type": "fn(deep?: bool) -> bool"
					},
					"setFocus": {
						"!type": "fn()"
					},
					"destroy": {
						"!type": "fn()"
					},
					"getAttributeWatcher": {
						"!type": "fn() -> +dorado.AttributeWatcher"
					},
					"get": {
						"!type": "fn(attr: string) -> !custom:doradoGet"
					},
					"set": {
						"!type": "fn(attr: string, value?: ?, options?: ?) -> !this"
					},
					"hasTag": {
						"!type": "fn(tag: string) -> bool"
					},
					"addListener": {
						"!type": "fn(name: string, listener: fn(), options?: ?) -> ?"
					},
					"removeListener": {
						"!type": "fn(name: string, listener?: fn())"
					},
					"clearListeners": {
						"!type": "fn(name: string)"
					},
					"disableListeners": {
						"!type": "fn()"
					},
					"enableListeners": {
						"!type": "fn()"
					},
					"fireEvent": {
						"!type": "fn(name: string) -> bool"
					},
					"getListenerCount": {
						"!type": "fn(name: string) -> number"
					},
					"createDom": {
						"!type": "fn() -> +Node"
					},
					"getRealWidth": {
						"!type": "fn() -> number"
					},
					"getRealHeight": {
						"!type": "fn() -> number"
					},
					"render": {
						"!type": "fn(containerElement: +Node, nextChildElement?: +Node)"
					},
					"replace": {
						"!type": "fn(elmenent: +Node)"
					},
					"unrender": {
						"!type": "fn()"
					},
					"refresh": {
						"!type": "fn(delay: bool)"
					},
					"disableBinding": {
						"!type": "fn()"
					},
					"enableBinding": {
						"!type": "fn()"
					},
					"getBindingData": {
						"!type": "fn(options?: ?) -> +dorado.EntityList"
					},
					"getBindingDataType": {
						"!type": "fn(options?: ?) -> +dorado.DataType"
					},
					"dataSetMessageReceived": {
						"!type": "fn(messageCode: ?, arg: ?)"
					}
				}
			},
			"AbstractEditor": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Control" ],
				"!events": {
					"beforePost": {
						"!arg": {
							"processDefault": {
								"!type": "bool"
							}
						}
					},
					"onPost": {
						"!arg": { }
					},
					"onPostFailed": {
						"!arg": {
							"exception": {
								"!type": "+dorado.Exception"
							},
							"processDefault": {
								"!type": "bool"
							}
						}
					}
				},
				"prototype": {
					"!proto": "dorado.widget.Control.prototype",
					"post": {
						"!type": "fn() -> bool"
					},
					"refreshData": {
						"!type": "fn()"
					}
				}
			},
			"AbstractFormElement": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Control", "dorado.widget.PropertyDataControl", "dorado.widget.FormProfileSupport" ],
				"prototype": {
					"renderUtilAttached": {
						"!type": "bool"
					},
					"focusable": {
						"!type": "bool"
					},
					"selectable": {
						"!type": "bool"
					},
					"getFocusableSubControls": {
						"!type": "[+dorado.widget.Control]"
					},
					"ATTRIBUTES": { },
					"objects": {
						"!type": "[+dorado.AttributeSupport]"
					},
					"EVENTS": { },
					"refreshDom": {
						"!type": "fn(dom: +Node)"
					},
					"getDom": {
						"!type": "fn() -> +Node"
					},
					"findParent": {
						"!type": "fn(type: ?) -> +dorado.widget.Container"
					},
					"isFocusable": {
						"!type": "fn(deep?: bool) -> bool"
					},
					"setFocus": {
						"!type": "fn()"
					},
					"destroy": {
						"!type": "fn()"
					},
					"getAttributeWatcher": {
						"!type": "fn() -> +dorado.AttributeWatcher"
					},
					"get": {
						"!type": "fn(attr: string) -> !custom:doradoGet"
					},
					"set": {
						"!type": "fn(attr: string, value?: ?, options?: ?) -> !this"
					},
					"hasTag": {
						"!type": "fn(tag: string) -> bool"
					},
					"addListener": {
						"!type": "fn(name: string, listener: fn(), options?: ?) -> ?"
					},
					"removeListener": {
						"!type": "fn(name: string, listener?: fn())"
					},
					"clearListeners": {
						"!type": "fn(name: string)"
					},
					"disableListeners": {
						"!type": "fn()"
					},
					"enableListeners": {
						"!type": "fn()"
					},
					"fireEvent": {
						"!type": "fn(name: string) -> bool"
					},
					"getListenerCount": {
						"!type": "fn(name: string) -> number"
					},
					"createDom": {
						"!type": "fn() -> +Node"
					},
					"getRealWidth": {
						"!type": "fn() -> number"
					},
					"getRealHeight": {
						"!type": "fn() -> number"
					},
					"render": {
						"!type": "fn(containerElement: +Node, nextChildElement?: +Node)"
					},
					"replace": {
						"!type": "fn(elmenent: +Node)"
					},
					"unrender": {
						"!type": "fn()"
					},
					"refresh": {
						"!type": "fn(delay: bool)"
					},
					"disableBinding": {
						"!type": "fn()"
					},
					"enableBinding": {
						"!type": "fn()"
					},
					"getBindingData": {
						"!type": "fn(options?: ?) -> +dorado.EntityList"
					},
					"getBindingDataType": {
						"!type": "fn(options?: ?) -> +dorado.DataType"
					},
					"dataSetMessageReceived": {
						"!type": "fn(messageCode: ?, arg: ?)"
					}
				}
			},
			"AbstractGrid": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.AbstractList", "dorado.widget.grid.ColumnModel" ],
				"!events": {
					"onGetCellEditor": {
						"!arg": {
							"data": {
								"!type": "+dorado.Entity"
							},
							"column": {
								"!type": "+dorado.widget.grid.Column"
							},
							"cellEditor": {
								"!type": "+dorado.widget.grid.CellEditor"
							}
						}
					},
					"onDataRowClick": {
						"!arg": {
							"column": {
								"!type": "+dorado.widget.grid.Column"
							},
							"event": {
								"!type": "+jQuery.Event"
							}
						}
					},
					"onDataRowDoubleClick": {
						"!arg": {
							"event": {
								"!type": "+jQuery.Event"
							}
						}
					},
					"onRenderRow": {
						"!arg": {
							"dom": {
								"!type": "+Node"
							},
							"data": {
								"!type": "+dorado.Entity"
							},
							"rowType": {
								"!type": "string"
							},
							"processDefault": {
								"!type": "bool"
							}
						}
					},
					"onRenderCell": {
						"!arg": {
							"dom": {
								"!type": "+Node"
							},
							"data": {
								"!type": "+dorado.Entity"
							},
							"column": {
								"!type": "+dorado.widget.grid.Column"
							},
							"rowType": {
								"!type": "string"
							},
							"processDefault": {
								"!type": "bool"
							}
						}
					},
					"onRenderHeaderCell": {
						"!arg": {
							"dom": {
								"!type": "+Node"
							},
							"data": {
								"!type": "+dorado.Entity"
							},
							"column": {
								"!type": "+dorado.widget.grid.Column"
							},
							"processDefault": {
								"!type": "bool"
							}
						}
					},
					"onRenderFooterCell": {
						"!arg": {
							"dom": {
								"!type": "+Node"
							},
							"column": {
								"!type": "+dorado.widget.grid.Column"
							},
							"processDefault": {
								"!type": "bool"
							}
						}
					},
					"onHeaderClick": {
						"!arg": {
							"column": {
								"!type": "+dorado.widget.grid.Column"
							},
							"processDefault": {
								"!type": "bool"
							}
						}
					},
					"beforeCellValueEdit": {
						"!arg": {
							"entity": {
								"!type": "+dorado.Entity"
							},
							"column": {
								"!type": "+dorado.widget.grid.DataColumn"
							},
							"value": { },
							"processDefault": {
								"!type": "bool"
							}
						}
					},
					"onCellValueEdit": {
						"!arg": {
							"entity": {
								"!type": "+dorado.Entity"
							},
							"column": {
								"!type": "+dorado.widget.grid.DataColumn"
							}
						}
					}
				},
				"prototype": {
					"groupProperty": {
						"!type": "string"
					},
					"renderUtilAttached": {
						"!type": "bool"
					},
					"focusable": {
						"!type": "bool"
					},
					"selectable": {
						"!type": "bool"
					},
					"getFocusableSubControls": {
						"!type": "[+dorado.widget.Control]"
					},
					"ATTRIBUTES": { },
					"objects": {
						"!type": "[+dorado.AttributeSupport]"
					},
					"EVENTS": { },
					"getCurrentItem": {
						"!type": "fn() -> +dorado.Entity"
					},
					"getEntityByEvent": {
						"!type": "fn(event: +jQuery.Event) -> +dorado.Entity"
					},
					"getColumnByEvent": {
						"!type": "fn(event: +jQuery.Event) -> +dorado.widget.grid.DataColumn"
					},
					"sort": {
						"!type": "fn(column: +dorado.widget.grid.DataColumn, desc?: bool)"
					},
					"highlightItem": {
						"!type": "fn(entity?: +dorado.Entity, options?: ?, speed?: ?)"
					},
					"selectAll": {
						"!type": "fn()"
					},
					"unselectAll": {
						"!type": "fn()"
					},
					"selectInvert": {
						"!type": "fn()"
					},
					"refreshSummary": {
						"!type": "fn()"
					},
					"refreshDom": {
						"!type": "fn(dom: +Node)"
					},
					"getDom": {
						"!type": "fn() -> +Node"
					},
					"findParent": {
						"!type": "fn(type: ?) -> +dorado.widget.Container"
					},
					"isFocusable": {
						"!type": "fn(deep?: bool) -> bool"
					},
					"setFocus": {
						"!type": "fn()"
					},
					"destroy": {
						"!type": "fn()"
					},
					"getAttributeWatcher": {
						"!type": "fn() -> +dorado.AttributeWatcher"
					},
					"get": {
						"!type": "fn(attr: string) -> !custom:doradoGet"
					},
					"set": {
						"!type": "fn(attr: string, value?: ?, options?: ?) -> !this"
					},
					"hasTag": {
						"!type": "fn(tag: string) -> bool"
					},
					"addListener": {
						"!type": "fn(name: string, listener: fn(), options?: ?) -> ?"
					},
					"removeListener": {
						"!type": "fn(name: string, listener?: fn())"
					},
					"clearListeners": {
						"!type": "fn(name: string)"
					},
					"disableListeners": {
						"!type": "fn()"
					},
					"enableListeners": {
						"!type": "fn()"
					},
					"fireEvent": {
						"!type": "fn(name: string) -> bool"
					},
					"getListenerCount": {
						"!type": "fn(name: string) -> number"
					},
					"createDom": {
						"!type": "fn() -> +Node"
					},
					"getRealWidth": {
						"!type": "fn() -> number"
					},
					"getRealHeight": {
						"!type": "fn() -> number"
					},
					"render": {
						"!type": "fn(containerElement: +Node, nextChildElement?: +Node)"
					},
					"replace": {
						"!type": "fn(elmenent: +Node)"
					},
					"unrender": {
						"!type": "fn()"
					},
					"refresh": {
						"!type": "fn(delay: bool)"
					},
					"addColumn": {
						"!type": "fn(columnConfig: +dorado.widget.grid.Column, insertMode?: string, refColumn?: +dorado.widget.grid.Column) -> +dorado.widget.grid.Column"
					},
					"addColumns": {
						"!type": "fn(columnConfigs: [?])"
					},
					"getColumn": {
						"!type": "fn(name: string) -> +dorado.widget.grid.Column"
					},
					"findColumns": {
						"!type": "fn(name: ?) -> [+dorado.widget.grid.Column]"
					}
				}
			},
			"AbstractList": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Control" ],
				"!events": {
					"onCurrentChange": {
						"!arg": { }
					},
					"beforeSelectionChange": {
						"!arg": {
							"added": {
								"!type": "[?]"
							},
							"removed": {
								"!type": "[?]"
							}
						}
					},
					"onSelectionChange": {
						"!arg": {
							"added": {
								"!type": "[?]"
							},
							"removed": {
								"!type": "[?]"
							}
						}
					},
					"onCompareItems": {
						"!arg": {
							"item1": { },
							"item2": { },
							"sortParams": {
								"!type": "[?]"
							},
							"result": {
								"!type": "number"
							}
						}
					},
					"onFilterItem": {
						"!arg": {
							"item": { },
							"criterions": {
								"!type": "[?]"
							},
							"accept": {
								"!type": "bool"
							}
						}
					}
				},
				"prototype": {
					"!proto": "dorado.widget.Control.prototype",
					"sort": {
						"!type": "fn(sortParams: ?)"
					}
				}
			},
			"AbstractListBox": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.RowList" ],
				"!events": {
					"onRenderRow": {
						"!arg": {
							"dom": {
								"!type": "+Node"
							},
							"data": { },
							"processDefault": {
								"!type": "bool"
							}
						}
					}
				},
				"prototype": {
					"!proto": "dorado.widget.RowList.prototype",
					"getItemByEvent": {
						"!type": "fn(event: +jQuery.Event) -> ?"
					}
				}
			},
			"AbstractMenu": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Control", "dorado.widget.FloatControl" ],
				"prototype": {
					"renderUtilAttached": {
						"!type": "bool"
					},
					"focusable": {
						"!type": "bool"
					},
					"selectable": {
						"!type": "bool"
					},
					"getFocusableSubControls": {
						"!type": "[+dorado.widget.Control]"
					},
					"ATTRIBUTES": { },
					"objects": {
						"!type": "[+dorado.AttributeSupport]"
					},
					"EVENTS": { },
					"addItem": {
						"!type": "fn(item: +dorado.widget.menu.AbstractMenuItem, index?: number) -> +dorado.widget.menu.AbstractMenuItem"
					},
					"getItem": {
						"!type": "fn(name: string) -> +dorado.widget.menu.AbstractMenuItem"
					},
					"findItem": {
						"!type": "fn(path: string) -> +dorado.widget.menu.AbstractMenuItem"
					},
					"removeItem": {
						"!type": "fn(item: +dorado.widget.menu.AbstractMenuItem) -> +dorado.widget.menu.AbstractMenuItem"
					},
					"clearItems": {
						"!type": "fn(deep: ?)"
					},
					"refreshDom": {
						"!type": "fn(dom: +Node)"
					},
					"getDom": {
						"!type": "fn() -> +Node"
					},
					"findParent": {
						"!type": "fn(type: ?) -> +dorado.widget.Container"
					},
					"isFocusable": {
						"!type": "fn(deep?: bool) -> bool"
					},
					"setFocus": {
						"!type": "fn()"
					},
					"destroy": {
						"!type": "fn()"
					},
					"getAttributeWatcher": {
						"!type": "fn() -> +dorado.AttributeWatcher"
					},
					"get": {
						"!type": "fn(attr: string) -> !custom:doradoGet"
					},
					"set": {
						"!type": "fn(attr: string, value?: ?, options?: ?) -> !this"
					},
					"hasTag": {
						"!type": "fn(tag: string) -> bool"
					},
					"addListener": {
						"!type": "fn(name: string, listener: fn(), options?: ?) -> ?"
					},
					"removeListener": {
						"!type": "fn(name: string, listener?: fn())"
					},
					"clearListeners": {
						"!type": "fn(name: string)"
					},
					"disableListeners": {
						"!type": "fn()"
					},
					"enableListeners": {
						"!type": "fn()"
					},
					"fireEvent": {
						"!type": "fn(name: string) -> bool"
					},
					"getListenerCount": {
						"!type": "fn(name: string) -> number"
					},
					"createDom": {
						"!type": "fn() -> +Node"
					},
					"getRealWidth": {
						"!type": "fn() -> number"
					},
					"getRealHeight": {
						"!type": "fn() -> number"
					},
					"render": {
						"!type": "fn(containerElement: +Node, nextChildElement?: +Node)"
					},
					"replace": {
						"!type": "fn(elmenent: +Node)"
					},
					"unrender": {
						"!type": "fn()"
					},
					"refresh": {
						"!type": "fn(delay: bool)"
					},
					"show": {
						"!type": "fn(options?: ?)"
					},
					"hide": {
						"!type": "fn(options: ?)"
					}
				}
			},
			"AbstractPanel": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Container" ],
				"!events": {
					"beforeCollapsedChange": {
						"!arg": { }
					},
					"onCollapsedChange": {
						"!arg": { }
					}
				},
				"prototype": {
					"!proto": "dorado.widget.Container.prototype"
				}
			},
			"AbstractTextBox": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.AbstractDataEditor" ],
				"!events": {
					"onTextEdit": {
						"!arg": { }
					},
					"onTriggerClick": {
						"!arg": {
							"processDefault": {
								"!type": "bool"
							}
						}
					},
					"onValidationStateChange": {
						"!arg": { }
					}
				},
				"prototype": {
					"!proto": "dorado.widget.AbstractDataEditor.prototype",
					"onTriggerClick": {
						"!type": "fn(trigger: +dorado.widget.Trigger)"
					},
					"textEdited": {
						"!type": "fn()"
					},
					"post": {
						"!type": "fn(force?: bool, silent?: bool) -> ?"
					}
				}
			},
			"AbstractTextEditor": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.AbstractTextBox" ],
				"prototype": {
					"!proto": "dorado.widget.AbstractTextBox.prototype"
				}
			},
			"AbstractTree": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.RowList" ],
				"!events": {
					"beforeExpand": {
						"!arg": {
							"async": {
								"!type": "bool"
							},
							"node": {
								"!type": "+dorado.widget.tree.Node"
							},
							"callDefault": {
								"!type": "fn()"
							},
							"callDefault.success": {
								"!type": "bool"
							},
							"callDefault.exception": {
								"!type": "+dorado.Exception"
							},
							"processDefault": {
								"!type": "bool"
							}
						}
					},
					"onExpand": {
						"!arg": {
							"node": {
								"!type": "+dorado.widget.tree.Node"
							}
						}
					},
					"beforeCollapse": {
						"!arg": {
							"node": {
								"!type": "+dorado.widget.tree.Node"
							},
							"processDefault": {
								"!type": "bool"
							}
						}
					},
					"onCollapse": {
						"!arg": {
							"node": {
								"!type": "+dorado.widget.tree.Node"
							}
						}
					},
					"onNodeAttached": {
						"!arg": {
							"node": {
								"!type": "+dorado.widget.tree.Node"
							}
						}
					},
					"onNodeDetached": {
						"!arg": {
							"node": {
								"!type": "+dorado.widget.tree.Node"
							}
						}
					},
					"beforeCurrentChange": {
						"!arg": {
							"oldCurrent": {
								"!type": "+dorado.widget.tree.Node"
							},
							"newCurrent": {
								"!type": "+dorado.widget.tree.Node"
							},
							"processDefault": {
								"!type": "bool"
							}
						}
					},
					"onCurrentChange": {
						"!arg": {
							"oldCurrent": {
								"!type": "+dorado.widget.tree.Node"
							},
							"newCurrent": {
								"!type": "+dorado.widget.tree.Node"
							}
						}
					},
					"onRenderNode": {
						"!arg": {
							"dom": {
								"!type": "+Node"
							},
							"label": {
								"!type": "string"
							},
							"node": {
								"!type": "+dorado.widget.tree.Node"
							},
							"processDefault": {
								"!type": "bool"
							}
						}
					},
					"beforeNodeCheckedChange": {
						"!arg": {
							"node": {
								"!type": "+dorado.widget.tree.Node"
							}
						}
					},
					"onNodeCheckedChange": {
						"!arg": {
							"node": {
								"!type": "+dorado.widget.tree.Node"
							}
						}
					}
				},
				"prototype": {
					"!proto": "dorado.widget.RowList.prototype",
					"clearNodes": {
						"!type": "fn()"
					},
					"refreshNode": {
						"!type": "fn(node: +dorado.widget.tree.Node)"
					},
					"disableAutoRefresh": {
						"!type": "fn()"
					},
					"enableAutoRefresh": {
						"!type": "fn()"
					},
					"getNodeByEvent": {
						"!type": "fn(event: +jQuery.Event) -> +dorado.widget.tree.Node"
					},
					"getCheckedNodes": {
						"!type": "fn(includeHalfChecked?: bool) -> [+dorado.widget.tree.Node]"
					},
					"highlightItem": {
						"!type": "fn(node?: +dorado.widget.tree.Node, options?: ?, speed?: ?)"
					}
				}
			},
			"Accordion": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Control" ],
				"!events": {
					"beforeCurrentSectionChange": {
						"!arg": {
							"newSection": {
								"!type": "+dorado.widget.Section"
							},
							"oldSection": {
								"!type": "+dorado.widget.Section"
							},
							"processDefault": {
								"!type": "bool"
							}
						}
					},
					"onCurrentSectionChange": {
						"!arg": {
							"newSection": {
								"!type": "+dorado.widget.Section"
							},
							"oldSection": {
								"!type": "+dorado.widget.Section"
							}
						}
					}
				},
				"prototype": {
					"!proto": "dorado.widget.Control.prototype",
					"getSection": {
						"!type": "fn(name: number) -> +dorado.widget.Section"
					},
					"addSection": {
						"!type": "fn(section: +dorado.widget.Section, index?: number)"
					},
					"removeSection": {
						"!type": "fn(section: +dorado.widget.Section)"
					},
					"clearSections": {
						"!type": "fn()"
					}
				}
			},
			"Action": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Component" ],
				"!events": {
					"beforeExecute": {
						"!arg": {
							"processDefault": {
								"!type": "bool"
							}
						}
					},
					"onExecute": {
						"!arg": {
							"success": {
								"!type": "bool"
							},
							"result": {
								"!type": "+dorado.Exception"
							}
						}
					},
					"onSuccess": {
						"!arg": {
							"result": { },
							"processDefault": {
								"!type": "bool"
							}
						}
					},
					"onFailure": {
						"!arg": {
							"error": {
								"!type": "+dorado.Exception"
							},
							"processDefault": {
								"!type": "bool"
							}
						}
					}
				},
				"prototype": {
					"!proto": "dorado.widget.Component.prototype",
					"execute": {
						"!type": "fn(callback: dorado.Callback) -> bool"
					}
				}
			},
			"ActionSupport": {
				"!type": "fn()"
			},
			"AjaxAction": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Action" ],
				"prototype": {
					"!proto": "dorado.widget.Action.prototype"
				}
			},
			"AutoForm": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Control", "dorado.widget.FormProfile", "dorado.widget.FormProfileSupport" ],
				"prototype": {
					"renderUtilAttached": {
						"!type": "bool"
					},
					"focusable": {
						"!type": "bool"
					},
					"selectable": {
						"!type": "bool"
					},
					"getFocusableSubControls": {
						"!type": "[+dorado.widget.Control]"
					},
					"ATTRIBUTES": { },
					"objects": {
						"!type": "[+dorado.AttributeSupport]"
					},
					"EVENTS": { },
					"addElement": {
						"!type": "fn(element: +dorado.widget.Control) -> +dorado.widget.Control"
					},
					"removeElement": {
						"!type": "fn(element: +dorado.widget.Control)"
					},
					"getElement": {
						"!type": "fn(name: string) -> +dorado.widget.Control"
					},
					"validate": {
						"!type": "fn(silent?: bool) -> bool"
					},
					"refreshData": {
						"!type": "fn()"
					},
					"refreshDom": {
						"!type": "fn(dom: +Node)"
					},
					"getDom": {
						"!type": "fn() -> +Node"
					},
					"findParent": {
						"!type": "fn(type: ?) -> +dorado.widget.Container"
					},
					"isFocusable": {
						"!type": "fn(deep?: bool) -> bool"
					},
					"setFocus": {
						"!type": "fn()"
					},
					"destroy": {
						"!type": "fn()"
					},
					"getAttributeWatcher": {
						"!type": "fn() -> +dorado.AttributeWatcher"
					},
					"get": {
						"!type": "fn(attr: string) -> !custom:doradoGet"
					},
					"set": {
						"!type": "fn(attr: string, value?: ?, options?: ?) -> !this"
					},
					"hasTag": {
						"!type": "fn(tag: string) -> bool"
					},
					"addListener": {
						"!type": "fn(name: string, listener: fn(), options?: ?) -> ?"
					},
					"removeListener": {
						"!type": "fn(name: string, listener?: fn())"
					},
					"clearListeners": {
						"!type": "fn(name: string)"
					},
					"disableListeners": {
						"!type": "fn()"
					},
					"enableListeners": {
						"!type": "fn()"
					},
					"fireEvent": {
						"!type": "fn(name: string) -> bool"
					},
					"getListenerCount": {
						"!type": "fn(name: string) -> number"
					},
					"createDom": {
						"!type": "fn() -> +Node"
					},
					"getRealWidth": {
						"!type": "fn() -> number"
					},
					"getRealHeight": {
						"!type": "fn() -> number"
					},
					"render": {
						"!type": "fn(containerElement: +Node, nextChildElement?: +Node)"
					},
					"replace": {
						"!type": "fn(elmenent: +Node)"
					},
					"unrender": {
						"!type": "fn()"
					},
					"refresh": {
						"!type": "fn(delay: bool)"
					}
				}
			},
			"autoform": {
				"AutoFormElement": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.FormElement" ],
					"prototype": {
						"!proto": "dorado.widget.FormElement.prototype"
					}
				}
			},
			"AutoMappingDropDown": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.RowListDropDown" ],
				"prototype": {
					"!proto": "dorado.widget.RowListDropDown.prototype"
				}
			},
			"BlockView": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.AbstractBlockView" ],
				"prototype": {
					"!proto": "dorado.widget.AbstractBlockView.prototype",
					"getCurrentItem": {
						"!type": "fn() -> +dorado.Entity"
					},
					"highlightItem": {
						"!type": "fn(index?: number, options?: ?, speed?: ?)"
					}
				}
			},
			"blockview": {
				"BlockItemModel": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.list.ItemModel" ],
					"prototype": {
						"!proto": "dorado.widget.list.ItemModel.prototype",
						"setLineSize": {
							"!type": "fn(lineSize: ?)"
						},
						"getLineCount": {
							"!type": "fn()"
						}
					}
				},
				"DefaultBlockRenderer": {
					"!type": "fn()",
					"!extends": [ "dorado.Renderer" ],
					"prototype": {
						"!proto": "dorado.Renderer.prototype",
						"render": {
							"!type": "fn(dom: +Node, arg: ?)"
						}
					}
				},
				"ImageBlockRenderer": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.blockview.DefaultBlockRenderer" ],
					"prototype": {
						"!proto": "dorado.widget.blockview.DefaultBlockRenderer.prototype",
						"captionProperty": {
							"!type": "string"
						},
						"imageProperty": {
							"!type": "string"
						},
						"tipProperty": {
							"!type": "string"
						},
						"blankImage": {
							"!type": "string"
						},
						"padding": {
							"!type": "number"
						},
						"spacing": {
							"!type": "number"
						},
						"labelHeight": {
							"!type": "number"
						},
						"stretchImage": {
							"!type": "bool"
						},
						"template": {
							"!type": "string"
						}
					}
				},
				"TemplateBlockRenderer": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.blockview.DefaultBlockRenderer" ],
					"prototype": {
						"!proto": "dorado.widget.blockview.DefaultBlockRenderer.prototype"
					}
				}
			},
			"Button": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.AbstractButton" ],
				"!events": {
					"onTriggerClick": {
						"!arg": { }
					}
				},
				"prototype": {
					"!proto": "dorado.widget.AbstractButton.prototype",
					"needSplit": {
						"!type": "fn()"
					}
				}
			},
			"CaptionBar": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Control" ],
				"prototype": {
					"!proto": "dorado.widget.Control.prototype",
					"addButton": {
						"!type": "fn(button: +dorado.widget.SimpleButton, index?: ?)"
					},
					"getButton": {
						"!type": "fn(button: +dorado.widget.SimpleButton)"
					},
					"removeButton": {
						"!type": "fn(button: +dorado.widget.SimpleButton)"
					},
					"clearButtons": {
						"!type": "fn()"
					}
				}
			},
			"CardBook": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Control" ],
				"!events": {
					"beforeCurrentChange": {
						"!arg": {
							"newControl": {
								"!type": "+dorado.widget.Control"
							},
							"oldControl": {
								"!type": "+dorado.widget.Control"
							}
						}
					},
					"onCurrentChange": {
						"!arg": {
							"newControl": {
								"!type": "+dorado.widget.Control"
							},
							"oldControl": {
								"!type": "+dorado.widget.Control"
							}
						}
					}
				},
				"prototype": {
					"!proto": "dorado.widget.Control.prototype",
					"addControl": {
						"!type": "fn(control: +dorado.widget.Control, index?: number, current?: bool) -> +dorado.widget.Control"
					},
					"removeControl": {
						"!type": "fn(control: +dorado.widget.Control) -> +dorado.widget.Control"
					},
					"removeAllControls": {
						"!type": "fn()"
					},
					"getControl": {
						"!type": "fn(id: +dorado.widget.Control) -> +dorado.widget.Control"
					},
					"getCurrentControlIndex": {
						"!type": "fn() -> number"
					}
				}
			},
			"CheckBox": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.AbstractDataEditor" ],
				"!events": {
					"onValueChange": {
						"!arg": { }
					}
				},
				"prototype": {
					"!proto": "dorado.widget.AbstractDataEditor.prototype"
				}
			},
			"Component": {
				"!type": "fn()",
				"!extends": [ "dorado.AttributeSupport", "dorado.EventSupport" ],
				"!events": {
					"onCreate": {
						"!arg": { }
					},
					"onDestroy": {
						"!arg": { }
					},
					"onReady": {
						"!arg": { }
					}
				},
				"prototype": {
					"ATTRIBUTES": { },
					"objects": {
						"!type": "[+dorado.AttributeSupport]"
					},
					"EVENTS": { },
					"destroy": {
						"!type": "fn()"
					},
					"getAttributeWatcher": {
						"!type": "fn() -> +dorado.AttributeWatcher"
					},
					"get": {
						"!type": "fn(attr: string) -> !custom:doradoGet"
					},
					"set": {
						"!type": "fn(attr: string, value?: ?, options?: ?) -> !this"
					},
					"hasTag": {
						"!type": "fn(tag: string) -> bool"
					},
					"addListener": {
						"!type": "fn(name: string, listener: fn(), options?: ?) -> ?"
					},
					"removeListener": {
						"!type": "fn(name: string, listener?: fn())"
					},
					"clearListeners": {
						"!type": "fn(name: string)"
					},
					"disableListeners": {
						"!type": "fn()"
					},
					"enableListeners": {
						"!type": "fn()"
					},
					"fireEvent": {
						"!type": "fn(name: string) -> bool"
					},
					"getListenerCount": {
						"!type": "fn(name: string) -> number"
					}
				}
			},
			"Container": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Control" ],
				"prototype": {
					"!proto": "dorado.widget.Control.prototype",
					"addChild": {
						"!type": "fn(component: +dorado.widget.Component)"
					},
					"removeChild": {
						"!type": "fn(component: Component)"
					},
					"removeAllChildren": {
						"!type": "fn()"
					},
					"getContentContainer": {
						"!type": "fn() -> +Node"
					}
				}
			},
			"Control": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Component", "dorado.RenderableElement", "dorado.Draggable", "dorado.Droppable" ],
				"findParentControl": {
					"!type": "fn(element: +Node, type?: ?) -> +dorado.widget.Control"
				},
				"!events": {
					"onCreateDom": {
						"!arg": {
							"dom": {
								"!type": "+Node"
							}
						}
					},
					"beforeRefreshDom": {
						"!arg": {
							"dom": {
								"!type": "+Node"
							},
							"processDefault": {
								"!type": "bool"
							}
						}
					},
					"onRefreshDom": {
						"!arg": {
							"dom": {
								"!type": "+Node"
							}
						}
					},
					"onClick": {
						"!arg": {
							"button": {
								"!type": "number"
							},
							"event": {
								"!type": "+jQuery.Event"
							},
							"returnValue": {
								"!type": "bool"
							}
						}
					},
					"onDoubleClick": {
						"!arg": {
							"button": {
								"!type": "number"
							},
							"event": {
								"!type": "+jQuery.Event"
							},
							"returnValue": {
								"!type": "bool"
							}
						}
					},
					"onMouseDown": {
						"!arg": {
							"button": {
								"!type": "number"
							},
							"event": {
								"!type": "+jQuery.Event"
							},
							"returnValue": {
								"!type": "bool"
							}
						}
					},
					"onMouseUp": {
						"!arg": {
							"button": {
								"!type": "number"
							},
							"event": {
								"!type": "+jQuery.Event"
							},
							"returnValue": {
								"!type": "bool"
							}
						}
					},
					"onContextMenu": {
						"!arg": {
							"event": {
								"!type": "+jQuery.Event"
							},
							"processDefault": {
								"!type": "bool"
							}
						}
					},
					"onFocus": {
						"!arg": { }
					},
					"onBlur": {
						"!arg": { }
					},
					"onKeyDown": {
						"!arg": {
							"keyCode": {
								"!type": "number"
							},
							"shiftKey": {
								"!type": "bool"
							},
							"ctrlKey": {
								"!type": "bool"
							},
							"altKey": {
								"!type": "bool"
							},
							"event": {
								"!type": "+jQuery.Event"
							},
							"returnValue": {
								"!type": "bool"
							}
						}
					},
					"onKeyPress": {
						"!arg": {
							"keyCode": {
								"!type": "number"
							},
							"shiftKey": {
								"!type": "bool"
							},
							"ctrlKey": {
								"!type": "bool"
							},
							"altKey": {
								"!type": "bool"
							},
							"event": {
								"!type": "+jQuery.Event"
							},
							"returnValue": {
								"!type": "bool"
							}
						}
					}
				},
				"prototype": {
					"renderUtilAttached": {
						"!type": "bool"
					},
					"focusable": {
						"!type": "bool"
					},
					"selectable": {
						"!type": "bool"
					},
					"getFocusableSubControls": {
						"!type": "[+dorado.widget.Control]"
					},
					"ATTRIBUTES": { },
					"objects": {
						"!type": "[+dorado.AttributeSupport]"
					},
					"EVENTS": { },
					"refreshDom": {
						"!type": "fn(dom: +Node)"
					},
					"getDom": {
						"!type": "fn() -> +Node"
					},
					"findParent": {
						"!type": "fn(type: ?) -> +dorado.widget.Container"
					},
					"isFocusable": {
						"!type": "fn(deep?: bool) -> bool"
					},
					"setFocus": {
						"!type": "fn()"
					},
					"destroy": {
						"!type": "fn()"
					},
					"getAttributeWatcher": {
						"!type": "fn() -> +dorado.AttributeWatcher"
					},
					"get": {
						"!type": "fn(attr: string) -> !custom:doradoGet"
					},
					"set": {
						"!type": "fn(attr: string, value?: ?, options?: ?) -> !this"
					},
					"hasTag": {
						"!type": "fn(tag: string) -> bool"
					},
					"addListener": {
						"!type": "fn(name: string, listener: fn(), options?: ?) -> ?"
					},
					"removeListener": {
						"!type": "fn(name: string, listener?: fn())"
					},
					"clearListeners": {
						"!type": "fn(name: string)"
					},
					"disableListeners": {
						"!type": "fn()"
					},
					"enableListeners": {
						"!type": "fn()"
					},
					"fireEvent": {
						"!type": "fn(name: string) -> bool"
					},
					"getListenerCount": {
						"!type": "fn(name: string) -> number"
					},
					"createDom": {
						"!type": "fn() -> +Node"
					},
					"getRealWidth": {
						"!type": "fn() -> number"
					},
					"getRealHeight": {
						"!type": "fn() -> number"
					},
					"render": {
						"!type": "fn(containerElement: +Node, nextChildElement?: +Node)"
					},
					"replace": {
						"!type": "fn(elmenent: +Node)"
					},
					"unrender": {
						"!type": "fn()"
					},
					"refresh": {
						"!type": "fn(delay: bool)"
					}
				}
			},
			"CustomDropDown": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.DropDown" ],
				"prototype": {
					"!proto": "dorado.widget.DropDown.prototype"
				}
			},
			"CustomSpinner": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.MultiSlotSpinner" ],
				"prototype": {
					"!proto": "dorado.widget.MultiSlotSpinner.prototype"
				}
			},
			"DataBlockView": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.AbstractBlockView", "dorado.widget.DataControl" ],
				"prototype": {
					"renderUtilAttached": {
						"!type": "bool"
					},
					"focusable": {
						"!type": "bool"
					},
					"selectable": {
						"!type": "bool"
					},
					"getFocusableSubControls": {
						"!type": "[+dorado.widget.Control]"
					},
					"ATTRIBUTES": { },
					"objects": {
						"!type": "[+dorado.AttributeSupport]"
					},
					"EVENTS": { },
					"refreshEntity": {
						"!type": "fn(entity: +dorado.Entity)"
					},
					"setCurrentEntity": {
						"!type": "fn(entity: +dorado.Entity)"
					},
					"highlightItem": {
						"!type": "fn(entity?: +dorado.Entity, options?: ?, speed?: ?)"
					},
					"getCurrentItem": {
						"!type": "fn() -> +dorado.Entity"
					},
					"sort": {
						"!type": "fn(sortParams: ?)"
					},
					"refreshDom": {
						"!type": "fn(dom: +Node)"
					},
					"getDom": {
						"!type": "fn() -> +Node"
					},
					"findParent": {
						"!type": "fn(type: ?) -> +dorado.widget.Container"
					},
					"isFocusable": {
						"!type": "fn(deep?: bool) -> bool"
					},
					"setFocus": {
						"!type": "fn()"
					},
					"destroy": {
						"!type": "fn()"
					},
					"getAttributeWatcher": {
						"!type": "fn() -> +dorado.AttributeWatcher"
					},
					"get": {
						"!type": "fn(attr: string) -> !custom:doradoGet"
					},
					"set": {
						"!type": "fn(attr: string, value?: ?, options?: ?) -> !this"
					},
					"hasTag": {
						"!type": "fn(tag: string) -> bool"
					},
					"addListener": {
						"!type": "fn(name: string, listener: fn(), options?: ?) -> ?"
					},
					"removeListener": {
						"!type": "fn(name: string, listener?: fn())"
					},
					"clearListeners": {
						"!type": "fn(name: string)"
					},
					"disableListeners": {
						"!type": "fn()"
					},
					"enableListeners": {
						"!type": "fn()"
					},
					"fireEvent": {
						"!type": "fn(name: string) -> bool"
					},
					"getListenerCount": {
						"!type": "fn(name: string) -> number"
					},
					"createDom": {
						"!type": "fn() -> +Node"
					},
					"getRealWidth": {
						"!type": "fn() -> number"
					},
					"getRealHeight": {
						"!type": "fn() -> number"
					},
					"render": {
						"!type": "fn(containerElement: +Node, nextChildElement?: +Node)"
					},
					"replace": {
						"!type": "fn(elmenent: +Node)"
					},
					"unrender": {
						"!type": "fn()"
					},
					"refresh": {
						"!type": "fn(delay: bool)"
					},
					"disableBinding": {
						"!type": "fn()"
					},
					"enableBinding": {
						"!type": "fn()"
					},
					"getBindingData": {
						"!type": "fn(options?: ?) -> +dorado.EntityList"
					},
					"getBindingDataType": {
						"!type": "fn(options?: ?) -> +dorado.DataType"
					},
					"dataSetMessageReceived": {
						"!type": "fn(messageCode: ?, arg: ?)"
					}
				}
			},
			"DataControl": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.DataSetObserver" ],
				"!events": {
					"onGetBindingData": {
						"!arg": {
							"options": { },
							"data": {
								"!type": "+dorado.EntityList"
							},
							"processDefault": {
								"!type": "bool"
							}
						}
					},
					"onGetBindingDataType": {
						"!arg": {
							"dataType": {
								"!type": "+dorado.DataType"
							},
							"processDefault": {
								"!type": "bool"
							}
						}
					}
				},
				"prototype": {
					"!proto": "dorado.widget.DataSetObserver.prototype",
					"disableBinding": {
						"!type": "fn()"
					},
					"enableBinding": {
						"!type": "fn()"
					},
					"getBindingData": {
						"!type": "fn(options?: ?) -> +dorado.EntityList"
					},
					"getBindingDataType": {
						"!type": "fn(options?: ?) -> +dorado.DataType"
					},
					"dataSetMessageReceived": {
						"!type": "fn(messageCode: ?, arg: ?)"
					}
				}
			},
			"DataGrid": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.AbstractGrid", "dorado.widget.DataControl" ],
				"prototype": {
					"groupProperty": {
						"!type": "string"
					},
					"renderUtilAttached": {
						"!type": "bool"
					},
					"focusable": {
						"!type": "bool"
					},
					"selectable": {
						"!type": "bool"
					},
					"getFocusableSubControls": {
						"!type": "[+dorado.widget.Control]"
					},
					"ATTRIBUTES": { },
					"objects": {
						"!type": "[+dorado.AttributeSupport]"
					},
					"EVENTS": { },
					"setCurrentEntity": {
						"!type": "fn(entity: +dorado.Entity)"
					},
					"refreshEntity": {
						"!type": "fn(entity: +dorado.Entity)"
					},
					"getCurrentItem": {
						"!type": "fn() -> +dorado.Entity"
					},
					"getEntityByEvent": {
						"!type": "fn(event: +jQuery.Event) -> +dorado.Entity"
					},
					"getColumnByEvent": {
						"!type": "fn(event: +jQuery.Event) -> +dorado.widget.grid.DataColumn"
					},
					"sort": {
						"!type": "fn(column: +dorado.widget.grid.DataColumn, desc?: bool)"
					},
					"highlightItem": {
						"!type": "fn(entity?: +dorado.Entity, options?: ?, speed?: ?)"
					},
					"selectAll": {
						"!type": "fn()"
					},
					"unselectAll": {
						"!type": "fn()"
					},
					"selectInvert": {
						"!type": "fn()"
					},
					"refreshSummary": {
						"!type": "fn()"
					},
					"refreshDom": {
						"!type": "fn(dom: +Node)"
					},
					"getDom": {
						"!type": "fn() -> +Node"
					},
					"findParent": {
						"!type": "fn(type: ?) -> +dorado.widget.Container"
					},
					"isFocusable": {
						"!type": "fn(deep?: bool) -> bool"
					},
					"setFocus": {
						"!type": "fn()"
					},
					"destroy": {
						"!type": "fn()"
					},
					"getAttributeWatcher": {
						"!type": "fn() -> +dorado.AttributeWatcher"
					},
					"get": {
						"!type": "fn(attr: string) -> !custom:doradoGet"
					},
					"set": {
						"!type": "fn(attr: string, value?: ?, options?: ?) -> !this"
					},
					"hasTag": {
						"!type": "fn(tag: string) -> bool"
					},
					"addListener": {
						"!type": "fn(name: string, listener: fn(), options?: ?) -> ?"
					},
					"removeListener": {
						"!type": "fn(name: string, listener?: fn())"
					},
					"clearListeners": {
						"!type": "fn(name: string)"
					},
					"disableListeners": {
						"!type": "fn()"
					},
					"enableListeners": {
						"!type": "fn()"
					},
					"fireEvent": {
						"!type": "fn(name: string) -> bool"
					},
					"getListenerCount": {
						"!type": "fn(name: string) -> number"
					},
					"createDom": {
						"!type": "fn() -> +Node"
					},
					"getRealWidth": {
						"!type": "fn() -> number"
					},
					"getRealHeight": {
						"!type": "fn() -> number"
					},
					"render": {
						"!type": "fn(containerElement: +Node, nextChildElement?: +Node)"
					},
					"replace": {
						"!type": "fn(elmenent: +Node)"
					},
					"unrender": {
						"!type": "fn()"
					},
					"refresh": {
						"!type": "fn(delay: bool)"
					},
					"addColumn": {
						"!type": "fn(columnConfig: +dorado.widget.grid.Column, insertMode?: string, refColumn?: +dorado.widget.grid.Column) -> +dorado.widget.grid.Column"
					},
					"addColumns": {
						"!type": "fn(columnConfigs: [?])"
					},
					"getColumn": {
						"!type": "fn(name: string) -> +dorado.widget.grid.Column"
					},
					"findColumns": {
						"!type": "fn(name: ?) -> [+dorado.widget.grid.Column]"
					},
					"disableBinding": {
						"!type": "fn()"
					},
					"enableBinding": {
						"!type": "fn()"
					},
					"getBindingData": {
						"!type": "fn(options?: ?) -> +dorado.EntityList"
					},
					"getBindingDataType": {
						"!type": "fn(options?: ?) -> +dorado.DataType"
					},
					"dataSetMessageReceived": {
						"!type": "fn(messageCode: ?, arg: ?)"
					}
				}
			},
			"DataListBox": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.AbstractListBox", "dorado.widget.DataControl" ],
				"prototype": {
					"renderUtilAttached": {
						"!type": "bool"
					},
					"focusable": {
						"!type": "bool"
					},
					"selectable": {
						"!type": "bool"
					},
					"getFocusableSubControls": {
						"!type": "[+dorado.widget.Control]"
					},
					"ATTRIBUTES": { },
					"objects": {
						"!type": "[+dorado.AttributeSupport]"
					},
					"EVENTS": { },
					"refreshEntity": {
						"!type": "fn(entity: +dorado.Entity)"
					},
					"setCurrentEntity": {
						"!type": "fn(entity: +dorado.Entity)"
					},
					"highlightItem": {
						"!type": "fn(entity?: +dorado.Entity, options?: ?, speed?: ?)"
					},
					"getItemByEvent": {
						"!type": "fn(event: +jQuery.Event) -> ?"
					},
					"getCurrentItem": {
						"!type": "fn() -> +dorado.Entity"
					},
					"sort": {
						"!type": "fn(sortParams: ?)"
					},
					"refreshDom": {
						"!type": "fn(dom: +Node)"
					},
					"getDom": {
						"!type": "fn() -> +Node"
					},
					"findParent": {
						"!type": "fn(type: ?) -> +dorado.widget.Container"
					},
					"isFocusable": {
						"!type": "fn(deep?: bool) -> bool"
					},
					"setFocus": {
						"!type": "fn()"
					},
					"destroy": {
						"!type": "fn()"
					},
					"getAttributeWatcher": {
						"!type": "fn() -> +dorado.AttributeWatcher"
					},
					"get": {
						"!type": "fn(attr: string) -> !custom:doradoGet"
					},
					"set": {
						"!type": "fn(attr: string, value?: ?, options?: ?) -> !this"
					},
					"hasTag": {
						"!type": "fn(tag: string) -> bool"
					},
					"addListener": {
						"!type": "fn(name: string, listener: fn(), options?: ?) -> ?"
					},
					"removeListener": {
						"!type": "fn(name: string, listener?: fn())"
					},
					"clearListeners": {
						"!type": "fn(name: string)"
					},
					"disableListeners": {
						"!type": "fn()"
					},
					"enableListeners": {
						"!type": "fn()"
					},
					"fireEvent": {
						"!type": "fn(name: string) -> bool"
					},
					"getListenerCount": {
						"!type": "fn(name: string) -> number"
					},
					"createDom": {
						"!type": "fn() -> +Node"
					},
					"getRealWidth": {
						"!type": "fn() -> number"
					},
					"getRealHeight": {
						"!type": "fn() -> number"
					},
					"render": {
						"!type": "fn(containerElement: +Node, nextChildElement?: +Node)"
					},
					"replace": {
						"!type": "fn(elmenent: +Node)"
					},
					"unrender": {
						"!type": "fn()"
					},
					"refresh": {
						"!type": "fn(delay: bool)"
					},
					"disableBinding": {
						"!type": "fn()"
					},
					"enableBinding": {
						"!type": "fn()"
					},
					"getBindingData": {
						"!type": "fn(options?: ?) -> +dorado.EntityList"
					},
					"getBindingDataType": {
						"!type": "fn(options?: ?) -> +dorado.DataType"
					},
					"dataSetMessageReceived": {
						"!type": "fn(messageCode: ?, arg: ?)"
					}
				}
			},
			"DataPilot": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Control", "dorado.widget.DataControl" ],
				"!events": {
					"onSubControlRefresh": {
						"!arg": {
							"code": {
								"!type": "string"
							},
							"control": {
								"!type": "dorado.widget.Control"
							},
							"processDefault": {
								"!type": "bool"
							}
						}
					},
					"onSubControlAction": {
						"!arg": {
							"code": {
								"!type": "string"
							},
							"control": {
								"!type": "dorado.widget.Control"
							},
							"processDefault": {
								"!type": "bool"
							}
						}
					}
				},
				"prototype": {
					"renderUtilAttached": {
						"!type": "bool"
					},
					"focusable": {
						"!type": "bool"
					},
					"selectable": {
						"!type": "bool"
					},
					"getFocusableSubControls": {
						"!type": "[+dorado.widget.Control]"
					},
					"ATTRIBUTES": { },
					"objects": {
						"!type": "[+dorado.AttributeSupport]"
					},
					"EVENTS": { },
					"refreshDom": {
						"!type": "fn(dom: +Node)"
					},
					"getDom": {
						"!type": "fn() -> +Node"
					},
					"findParent": {
						"!type": "fn(type: ?) -> +dorado.widget.Container"
					},
					"isFocusable": {
						"!type": "fn(deep?: bool) -> bool"
					},
					"setFocus": {
						"!type": "fn()"
					},
					"destroy": {
						"!type": "fn()"
					},
					"getAttributeWatcher": {
						"!type": "fn() -> +dorado.AttributeWatcher"
					},
					"get": {
						"!type": "fn(attr: string) -> !custom:doradoGet"
					},
					"set": {
						"!type": "fn(attr: string, value?: ?, options?: ?) -> !this"
					},
					"hasTag": {
						"!type": "fn(tag: string) -> bool"
					},
					"addListener": {
						"!type": "fn(name: string, listener: fn(), options?: ?) -> ?"
					},
					"removeListener": {
						"!type": "fn(name: string, listener?: fn())"
					},
					"clearListeners": {
						"!type": "fn(name: string)"
					},
					"disableListeners": {
						"!type": "fn()"
					},
					"enableListeners": {
						"!type": "fn()"
					},
					"fireEvent": {
						"!type": "fn(name: string) -> bool"
					},
					"getListenerCount": {
						"!type": "fn(name: string) -> number"
					},
					"createDom": {
						"!type": "fn() -> +Node"
					},
					"getRealWidth": {
						"!type": "fn() -> number"
					},
					"getRealHeight": {
						"!type": "fn() -> number"
					},
					"render": {
						"!type": "fn(containerElement: +Node, nextChildElement?: +Node)"
					},
					"replace": {
						"!type": "fn(elmenent: +Node)"
					},
					"unrender": {
						"!type": "fn()"
					},
					"refresh": {
						"!type": "fn(delay: bool)"
					},
					"disableBinding": {
						"!type": "fn()"
					},
					"enableBinding": {
						"!type": "fn()"
					},
					"getBindingData": {
						"!type": "fn(options?: ?) -> +dorado.EntityList"
					},
					"getBindingDataType": {
						"!type": "fn(options?: ?) -> +dorado.DataType"
					},
					"dataSetMessageReceived": {
						"!type": "fn(messageCode: ?, arg: ?)"
					}
				}
			},
			"DataSet": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Component" ],
				"MESSAGE_REFRESH": {
					"!type": "number"
				},
				"MESSAGE_DATA_CHANGED": {
					"!type": "number"
				},
				"MESSAGE_ENTITY_STATE_CHANGED": {
					"!type": "number"
				},
				"MESSAGE_DELETED": {
					"!type": "number"
				},
				"MESSAGE_INSERTED": {
					"!type": "number"
				},
				"MESSAGE_CURRENT_CHANGED": {
					"!type": "number"
				},
				"MESSAGE_REFRESH_ENTITY": {
					"!type": "number"
				},
				"getOwnerDataSet": {
					"!type": "fn(data: +dorado.Entity) -> +dorado.widget.DataSet"
				},
				"!events": {
					"beforeLoadData": {
						"!arg": {
							"pageNo": {
								"!type": "number"
							}
						}
					},
					"onLoadData": {
						"!arg": {
							"pageNo": {
								"!type": "number"
							}
						}
					},
					"onDataLoad": {
						"!arg": { }
					}
				},
				"prototype": {
					"!proto": "dorado.widget.Component.prototype",
					"get": {
						"!type": "fn(attr: ?) -> !custom:doradoGet"
					},
					"setData": {
						"!type": "fn(data: +dorado.Entity)"
					},
					"insert": {
						"!type": "fn(data?: +dorado.Entity) -> +dorado.Entity"
					},
					"getData": {
						"!type": "fn(path?: string, options?: string) -> +dorado.Entity"
					},
					"getDataAsync": {
						"!type": "fn(path?: string, callback: dorado.Callback, options?: string)"
					},
					"queryData": {
						"!type": "fn(path: string, options?: string) -> +dorado.Entity"
					},
					"queryDataAsync": {
						"!type": "fn(path: string, callback: dorado.Callback, options?: string)"
					},
					"flush": {
						"!type": "fn()"
					},
					"flushAsync": {
						"!type": "fn(options?: fn())"
					},
					"getDataType": {
						"!type": "fn(path?: string, options?: ?) -> +dorado.DataType"
					},
					"clear": {
						"!type": "fn()"
					},
					"addObserver": {
						"!type": "fn(observer: +dorado.widget.DataSetObserver)"
					},
					"removeObserver": {
						"!type": "fn(observer: +dorado.widget.DataSetObserver)"
					},
					"disableObservers": {
						"!type": "fn()"
					},
					"enableObservers": {
						"!type": "fn()"
					},
					"notifyObservers": {
						"!type": "fn()"
					}
				}
			},
			"DataSetDropDown": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.RowListDropDown" ],
				"!events": {
					"onSetFilterParameter": {
						"!arg": {
							"dataSet": {
								"!type": "+dorado.widget.DataSet"
							},
							"filterValue": { }
						}
					}
				},
				"prototype": {
					"!proto": "dorado.widget.RowListDropDown.prototype"
				}
			},
			"DataSetObserver": {
				"!type": "fn()",
				"prototype": {
					"dataSetMessageReceived": {
						"!type": "fn(messageCode: number, arg: ?)"
					}
				}
			},
			"DataTree": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Tree", "dorado.widget.DataControl" ],
				"!events": {
					"beforeDataNodeCreate": {
						"!arg": {
							"data": {
								"!type": "+dorado.Entity"
							},
							"processDefault": {
								"!type": "bool"
							}
						}
					},
					"onDataNodeCreate": {
						"!arg": {
							"data": {
								"!type": "+dorado.Entity"
							},
							"node": {
								"!type": "+dorado.widget.tree.DataBindingNode"
							}
						}
					}
				},
				"prototype": {
					"renderUtilAttached": {
						"!type": "bool"
					},
					"focusable": {
						"!type": "bool"
					},
					"selectable": {
						"!type": "bool"
					},
					"getFocusableSubControls": {
						"!type": "[+dorado.widget.Control]"
					},
					"ATTRIBUTES": { },
					"objects": {
						"!type": "[+dorado.AttributeSupport]"
					},
					"EVENTS": { },
					"clearNodes": {
						"!type": "fn()"
					},
					"refreshNode": {
						"!type": "fn(node: +dorado.widget.tree.Node)"
					},
					"disableAutoRefresh": {
						"!type": "fn()"
					},
					"enableAutoRefresh": {
						"!type": "fn()"
					},
					"getNodeByEvent": {
						"!type": "fn(event: +jQuery.Event) -> +dorado.widget.tree.Node"
					},
					"getCheckedNodes": {
						"!type": "fn(includeHalfChecked?: bool) -> [+dorado.widget.tree.Node]"
					},
					"highlightItem": {
						"!type": "fn(node?: +dorado.widget.tree.Node, options?: ?, speed?: ?)"
					},
					"getCurrentItem": {
						"!type": "fn() -> +dorado.Entity"
					},
					"sort": {
						"!type": "fn(sortParams: ?)"
					},
					"refreshDom": {
						"!type": "fn(dom: +Node)"
					},
					"getDom": {
						"!type": "fn() -> +Node"
					},
					"findParent": {
						"!type": "fn(type: ?) -> +dorado.widget.Container"
					},
					"isFocusable": {
						"!type": "fn(deep?: bool) -> bool"
					},
					"setFocus": {
						"!type": "fn()"
					},
					"destroy": {
						"!type": "fn()"
					},
					"getAttributeWatcher": {
						"!type": "fn() -> +dorado.AttributeWatcher"
					},
					"get": {
						"!type": "fn(attr: string) -> !custom:doradoGet"
					},
					"set": {
						"!type": "fn(attr: string, value?: ?, options?: ?) -> !this"
					},
					"hasTag": {
						"!type": "fn(tag: string) -> bool"
					},
					"addListener": {
						"!type": "fn(name: string, listener: fn(), options?: ?) -> ?"
					},
					"removeListener": {
						"!type": "fn(name: string, listener?: fn())"
					},
					"clearListeners": {
						"!type": "fn(name: string)"
					},
					"disableListeners": {
						"!type": "fn()"
					},
					"enableListeners": {
						"!type": "fn()"
					},
					"fireEvent": {
						"!type": "fn(name: string) -> bool"
					},
					"getListenerCount": {
						"!type": "fn(name: string) -> number"
					},
					"createDom": {
						"!type": "fn() -> +Node"
					},
					"getRealWidth": {
						"!type": "fn() -> number"
					},
					"getRealHeight": {
						"!type": "fn() -> number"
					},
					"render": {
						"!type": "fn(containerElement: +Node, nextChildElement?: +Node)"
					},
					"replace": {
						"!type": "fn(elmenent: +Node)"
					},
					"unrender": {
						"!type": "fn()"
					},
					"refresh": {
						"!type": "fn(delay: bool)"
					},
					"disableBinding": {
						"!type": "fn()"
					},
					"enableBinding": {
						"!type": "fn()"
					},
					"getBindingData": {
						"!type": "fn(options?: ?) -> +dorado.EntityList"
					},
					"getBindingDataType": {
						"!type": "fn(options?: ?) -> +dorado.DataType"
					},
					"dataSetMessageReceived": {
						"!type": "fn(messageCode: ?, arg: ?)"
					}
				}
			},
			"DataTreeGrid": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.TreeGrid", "dorado.widget.DataTree" ],
				"prototype": {
					"groupProperty": {
						"!type": "string"
					},
					"renderUtilAttached": {
						"!type": "bool"
					},
					"focusable": {
						"!type": "bool"
					},
					"selectable": {
						"!type": "bool"
					},
					"getFocusableSubControls": {
						"!type": "[+dorado.widget.Control]"
					},
					"ATTRIBUTES": { },
					"objects": {
						"!type": "[+dorado.AttributeSupport]"
					},
					"EVENTS": { },
					"getCurrentItem": {
						"!type": "fn() -> +dorado.Entity"
					},
					"getEntityByEvent": {
						"!type": "fn(event: +jQuery.Event) -> +dorado.Entity"
					},
					"getColumnByEvent": {
						"!type": "fn(event: +jQuery.Event) -> +dorado.widget.grid.DataColumn"
					},
					"sort": {
						"!type": "fn(column: +dorado.widget.grid.DataColumn, desc?: bool)"
					},
					"highlightItem": {
						"!type": "fn(entity?: +dorado.Entity, options?: ?, speed?: ?)"
					},
					"selectAll": {
						"!type": "fn()"
					},
					"unselectAll": {
						"!type": "fn()"
					},
					"selectInvert": {
						"!type": "fn()"
					},
					"refreshSummary": {
						"!type": "fn()"
					},
					"refreshDom": {
						"!type": "fn(dom: +Node)"
					},
					"getDom": {
						"!type": "fn() -> +Node"
					},
					"findParent": {
						"!type": "fn(type: ?) -> +dorado.widget.Container"
					},
					"isFocusable": {
						"!type": "fn(deep?: bool) -> bool"
					},
					"setFocus": {
						"!type": "fn()"
					},
					"destroy": {
						"!type": "fn()"
					},
					"getAttributeWatcher": {
						"!type": "fn() -> +dorado.AttributeWatcher"
					},
					"get": {
						"!type": "fn(attr: string) -> !custom:doradoGet"
					},
					"set": {
						"!type": "fn(attr: string, value?: ?, options?: ?) -> !this"
					},
					"hasTag": {
						"!type": "fn(tag: string) -> bool"
					},
					"addListener": {
						"!type": "fn(name: string, listener: fn(), options?: ?) -> ?"
					},
					"removeListener": {
						"!type": "fn(name: string, listener?: fn())"
					},
					"clearListeners": {
						"!type": "fn(name: string)"
					},
					"disableListeners": {
						"!type": "fn()"
					},
					"enableListeners": {
						"!type": "fn()"
					},
					"fireEvent": {
						"!type": "fn(name: string) -> bool"
					},
					"getListenerCount": {
						"!type": "fn(name: string) -> number"
					},
					"createDom": {
						"!type": "fn() -> +Node"
					},
					"getRealWidth": {
						"!type": "fn() -> number"
					},
					"getRealHeight": {
						"!type": "fn() -> number"
					},
					"render": {
						"!type": "fn(containerElement: +Node, nextChildElement?: +Node)"
					},
					"replace": {
						"!type": "fn(elmenent: +Node)"
					},
					"unrender": {
						"!type": "fn()"
					},
					"refresh": {
						"!type": "fn(delay: bool)"
					},
					"addColumn": {
						"!type": "fn(columnConfig: +dorado.widget.grid.Column, insertMode?: string, refColumn?: +dorado.widget.grid.Column) -> +dorado.widget.grid.Column"
					},
					"addColumns": {
						"!type": "fn(columnConfigs: [?])"
					},
					"getColumn": {
						"!type": "fn(name: string) -> +dorado.widget.grid.Column"
					},
					"findColumns": {
						"!type": "fn(name: ?) -> [+dorado.widget.grid.Column]"
					},
					"clearNodes": {
						"!type": "fn()"
					},
					"refreshNode": {
						"!type": "fn(node: +dorado.widget.tree.Node)"
					},
					"disableAutoRefresh": {
						"!type": "fn()"
					},
					"enableAutoRefresh": {
						"!type": "fn()"
					},
					"getNodeByEvent": {
						"!type": "fn(event: +jQuery.Event) -> +dorado.widget.tree.Node"
					},
					"getCheckedNodes": {
						"!type": "fn(includeHalfChecked?: bool) -> [+dorado.widget.tree.Node]"
					},
					"disableBinding": {
						"!type": "fn()"
					},
					"enableBinding": {
						"!type": "fn()"
					},
					"getBindingData": {
						"!type": "fn(options?: ?) -> +dorado.EntityList"
					},
					"getBindingDataType": {
						"!type": "fn(options?: ?) -> +dorado.DataType"
					},
					"dataSetMessageReceived": {
						"!type": "fn(messageCode: ?, arg: ?)"
					}
				}
			},
			"DateDropDown": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.DropDown" ],
				"!events": {
					"onFilterDate": {
						"!arg": {
							"date": {
								"!type": "+Date"
							},
							"selectable": {
								"!type": "+Date"
							}
						}
					}
				},
				"prototype": {
					"!proto": "dorado.widget.DropDown.prototype"
				}
			},
			"DatePicker": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Control" ],
				"!events": {
					"onPick": {
						"!arg": {
							"date": { }
						}
					},
					"onClear": {
						"!arg": { }
					},
					"onConfirm": {
						"!arg": {
							"date": { }
						}
					},
					"onCancel": {
						"!arg": { }
					},
					"onRefreshDateCell": {
						"!arg": {
							"cell": {
								"!type": "+Node"
							},
							"date": {
								"!type": "+Date"
							}
						}
					},
					"onFilterDate": {
						"!arg": {
							"date": {
								"!type": "+Date"
							},
							"selectable": {
								"!type": "+Date"
							}
						}
					}
				},
				"prototype": {
					"!proto": "dorado.widget.Control.prototype",
					"setDate": {
						"!type": "fn(day: number, refresh: bool)"
					}
				}
			},
			"DateTimeSpinner": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.MultiSlotSpinner" ],
				"prototype": {
					"!proto": "dorado.widget.MultiSlotSpinner.prototype"
				}
			},
			"Dialog": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.FloatPanel" ],
				"!events": {
					"beforeMaximize": {
						"!arg": { }
					},
					"onMaximize": {
						"!arg": { }
					},
					"beforeMinimize": {
						"!arg": { }
					},
					"onMinimize": {
						"!arg": { }
					}
				},
				"prototype": {
					"!proto": "dorado.widget.FloatPanel.prototype"
				}
			},
			"DropDown": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Trigger" ],
				"findDropDown": {
					"!type": "fn(control: +dorado.widget.Control) -> +dorado.widget.DropDown"
				},
				"!events": {
					"onOpen": {
						"!arg": {
							"editor": {
								"!type": "+dorado.widget.AbstractEditor"
							}
						}
					},
					"onClose": {
						"!arg": {
							"editor": {
								"!type": "+dorado.widget.AbstractEditor"
							},
							"selectedValue": { }
						}
					},
					"onValueSelect": {
						"!arg": {
							"editor": {
								"!type": "+dorado.widget.AbstractEditor"
							},
							"selectedValue": { },
							"processDefault": {
								"!type": "bool"
							}
						}
					}
				},
				"prototype": {
					"!proto": "dorado.widget.Trigger.prototype",
					"close": {
						"!type": "fn(selectedValue: ?)"
					}
				}
			},
			"editor": {
				"PostException": {
					"!type": "fn()",
					"!extends": [ "dorado.Exception" ],
					"prototype": {
						"!proto": "dorado.Exception.prototype",
						"validationMessages": {
							"!type": "[?]"
						}
					}
				}
			},
			"FieldSet": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.AbstractPanel" ],
				"prototype": {
					"!proto": "dorado.widget.AbstractPanel.prototype"
				}
			},
			"FloatContainer": {
				"!type": "fn()"
			},
			"FloatControl": {
				"!type": "fn()",
				"!events": {
					"beforeShow": {
						"!arg": { }
					},
					"onShow": {
						"!arg": { }
					},
					"afterShow": {
						"!arg": { }
					},
					"beforeHide": {
						"!arg": { }
					},
					"onHide": {
						"!arg": { }
					},
					"afterHide": {
						"!arg": { }
					},
					"beforeClose": {
						"!arg": { }
					},
					"onClose": {
						"!arg": { }
					}
				},
				"prototype": {
					"show": {
						"!type": "fn(options?: ?)"
					},
					"hide": {
						"!type": "fn(options: ?)"
					}
				}
			},
			"FloatPanel": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Panel", "dorado.widget.FloatControl" ],
				"prototype": {
					"renderUtilAttached": {
						"!type": "bool"
					},
					"focusable": {
						"!type": "bool"
					},
					"selectable": {
						"!type": "bool"
					},
					"getFocusableSubControls": {
						"!type": "[+dorado.widget.Control]"
					},
					"ATTRIBUTES": { },
					"objects": {
						"!type": "[+dorado.AttributeSupport]"
					},
					"EVENTS": { },
					"close": {
						"!type": "fn()"
					},
					"addChild": {
						"!type": "fn(component: +dorado.widget.Component)"
					},
					"removeChild": {
						"!type": "fn(component: Component)"
					},
					"removeAllChildren": {
						"!type": "fn()"
					},
					"getContentContainer": {
						"!type": "fn() -> +Node"
					},
					"refreshDom": {
						"!type": "fn(dom: +Node)"
					},
					"getDom": {
						"!type": "fn() -> +Node"
					},
					"findParent": {
						"!type": "fn(type: ?) -> +dorado.widget.Container"
					},
					"isFocusable": {
						"!type": "fn(deep?: bool) -> bool"
					},
					"setFocus": {
						"!type": "fn()"
					},
					"destroy": {
						"!type": "fn()"
					},
					"getAttributeWatcher": {
						"!type": "fn() -> +dorado.AttributeWatcher"
					},
					"get": {
						"!type": "fn(attr: string) -> !custom:doradoGet"
					},
					"set": {
						"!type": "fn(attr: string, value?: ?, options?: ?) -> !this"
					},
					"hasTag": {
						"!type": "fn(tag: string) -> bool"
					},
					"addListener": {
						"!type": "fn(name: string, listener: fn(), options?: ?) -> ?"
					},
					"removeListener": {
						"!type": "fn(name: string, listener?: fn())"
					},
					"clearListeners": {
						"!type": "fn(name: string)"
					},
					"disableListeners": {
						"!type": "fn()"
					},
					"enableListeners": {
						"!type": "fn()"
					},
					"fireEvent": {
						"!type": "fn(name: string) -> bool"
					},
					"getListenerCount": {
						"!type": "fn(name: string) -> number"
					},
					"createDom": {
						"!type": "fn() -> +Node"
					},
					"getRealWidth": {
						"!type": "fn() -> number"
					},
					"getRealHeight": {
						"!type": "fn() -> number"
					},
					"render": {
						"!type": "fn(containerElement: +Node, nextChildElement?: +Node)"
					},
					"replace": {
						"!type": "fn(elmenent: +Node)"
					},
					"unrender": {
						"!type": "fn()"
					},
					"refresh": {
						"!type": "fn(delay: bool)"
					},
					"show": {
						"!type": "fn(options?: ?)"
					},
					"hide": {
						"!type": "fn(options: ?)"
					}
				}
			},
			"FormConfig": {
				"!type": "fn()"
			},
			"FormElement": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.AbstractFormElement", "dorado.widget.FormConfig" ],
				"prototype": {
					"renderUtilAttached": {
						"!type": "bool"
					},
					"focusable": {
						"!type": "bool"
					},
					"selectable": {
						"!type": "bool"
					},
					"getFocusableSubControls": {
						"!type": "[+dorado.widget.Control]"
					},
					"ATTRIBUTES": { },
					"objects": {
						"!type": "[+dorado.AttributeSupport]"
					},
					"EVENTS": { },
					"refreshDom": {
						"!type": "fn(dom: +Node)"
					},
					"getDom": {
						"!type": "fn() -> +Node"
					},
					"findParent": {
						"!type": "fn(type: ?) -> +dorado.widget.Container"
					},
					"isFocusable": {
						"!type": "fn(deep?: bool) -> bool"
					},
					"setFocus": {
						"!type": "fn()"
					},
					"destroy": {
						"!type": "fn()"
					},
					"getAttributeWatcher": {
						"!type": "fn() -> +dorado.AttributeWatcher"
					},
					"get": {
						"!type": "fn(attr: string) -> !custom:doradoGet"
					},
					"set": {
						"!type": "fn(attr: string, value?: ?, options?: ?) -> !this"
					},
					"hasTag": {
						"!type": "fn(tag: string) -> bool"
					},
					"addListener": {
						"!type": "fn(name: string, listener: fn(), options?: ?) -> ?"
					},
					"removeListener": {
						"!type": "fn(name: string, listener?: fn())"
					},
					"clearListeners": {
						"!type": "fn(name: string)"
					},
					"disableListeners": {
						"!type": "fn()"
					},
					"enableListeners": {
						"!type": "fn()"
					},
					"fireEvent": {
						"!type": "fn(name: string) -> bool"
					},
					"getListenerCount": {
						"!type": "fn(name: string) -> number"
					},
					"createDom": {
						"!type": "fn() -> +Node"
					},
					"getRealWidth": {
						"!type": "fn() -> number"
					},
					"getRealHeight": {
						"!type": "fn() -> number"
					},
					"render": {
						"!type": "fn(containerElement: +Node, nextChildElement?: +Node)"
					},
					"replace": {
						"!type": "fn(elmenent: +Node)"
					},
					"unrender": {
						"!type": "fn()"
					},
					"refresh": {
						"!type": "fn(delay: bool)"
					},
					"disableBinding": {
						"!type": "fn()"
					},
					"enableBinding": {
						"!type": "fn()"
					},
					"getBindingData": {
						"!type": "fn(options?: ?) -> +dorado.EntityList"
					},
					"getBindingDataType": {
						"!type": "fn(options?: ?) -> +dorado.DataType"
					},
					"dataSetMessageReceived": {
						"!type": "fn(messageCode: ?, arg: ?)"
					}
				}
			},
			"FormProfile": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Component", "dorado.widget.FormConfig" ],
				"prototype": {
					"ATTRIBUTES": { },
					"objects": {
						"!type": "[+dorado.AttributeSupport]"
					},
					"EVENTS": { },
					"destroy": {
						"!type": "fn()"
					},
					"getAttributeWatcher": {
						"!type": "fn() -> +dorado.AttributeWatcher"
					},
					"get": {
						"!type": "fn(attr: string) -> !custom:doradoGet"
					},
					"set": {
						"!type": "fn(attr: string, value?: ?, options?: ?) -> !this"
					},
					"hasTag": {
						"!type": "fn(tag: string) -> bool"
					},
					"addListener": {
						"!type": "fn(name: string, listener: fn(), options?: ?) -> ?"
					},
					"removeListener": {
						"!type": "fn(name: string, listener?: fn())"
					},
					"clearListeners": {
						"!type": "fn(name: string)"
					},
					"disableListeners": {
						"!type": "fn()"
					},
					"enableListeners": {
						"!type": "fn()"
					},
					"fireEvent": {
						"!type": "fn(name: string) -> bool"
					},
					"getListenerCount": {
						"!type": "fn(name: string) -> number"
					}
				}
			},
			"FormProfileSupport": {
				"!type": "fn()"
			},
			"FormSubmitAction": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Action" ],
				"prototype": {
					"!proto": "dorado.widget.Action.prototype"
				}
			},
			"Grid": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.AbstractGrid" ],
				"prototype": {
					"!proto": "dorado.widget.AbstractGrid.prototype",
					"refreshEntity": {
						"!type": "fn(entity: +dorado.Entity)"
					},
					"highlightItem": {
						"!type": "fn(entity: +dorado.Entity, options?: ?, speed?: ?)"
					}
				}
			},
			"grid": {
				"CellEditor": {
					"!type": "fn()",
					"!extends": [ "dorado.EventSupport" ],
					"prototype": {
						"!proto": "dorado.EventSupport.prototype",
						"grid": {
							"!type": "+dorado.widget.AbstractGrid"
						},
						"column": {
							"!type": "+dorado.widget.grid.Column"
						},
						"data": {
							"!type": "+dorado.Entity"
						},
						"showBorder": {
							"!type": "bool"
						},
						"minWidth": {
							"!type": "number"
						},
						"minHeight": {
							"!type": "number"
						},
						"inited": {
							"!type": "bool"
						},
						"visible": {
							"!type": "bool"
						},
						"cachable": {
							"!type": "bool"
						},
						"hideCellContent": {
							"!type": "bool"
						},
						"initDom": {
							"!type": "fn(dom: +Node)"
						},
						"refresh": {
							"!type": "fn()"
						},
						"post": {
							"!type": "fn()"
						},
						"getDom": {
							"!type": "fn() -> +Node"
						},
						"shouldShow": {
							"!type": "fn(cell: +Node) -> bool"
						},
						"show": {
							"!type": "fn(parent: +dorado.widget.AbstractGrid, cell: +Node)"
						},
						"hide": {
							"!type": "fn(post: bool)"
						}
					}
				},
				"CellRenderer": {
					"!type": "fn()",
					"!extends": [ "dorado.Renderer" ],
					"prototype": {
						"!proto": "dorado.Renderer.prototype",
						"render": {
							"!type": "fn(dom: +Node, arg: ?)"
						}
					}
				},
				"CheckBoxCellRenderer": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.grid.SubControlCellRenderer" ],
					"prototype": {
						"!proto": "dorado.widget.grid.SubControlCellRenderer.prototype"
					}
				},
				"Column": {
					"!type": "fn()",
					"!extends": [ "dorado.AttributeSupport", "dorado.EventSupport" ],
					"!events": {
						"onRenderHeaderCell": {
							"!arg": {
								"column": {
									"!type": "+dorado.widget.grid.Column"
								},
								"dom": {
									"!type": "+Node"
								},
								"processDefault": {
									"!type": "bool"
								}
							}
						},
						"onHeaderClick": {
							"!arg": {
								"column": {
									"!type": "+dorado.widget.grid.Column"
								},
								"processDefault": {
									"!type": "bool"
								}
							}
						}
					},
					"prototype": {
						"id": {
							"!type": "string"
						},
						"ATTRIBUTES": { },
						"objects": {
							"!type": "[+dorado.AttributeSupport]"
						},
						"EVENTS": { },
						"getAttributeWatcher": {
							"!type": "fn() -> +dorado.AttributeWatcher"
						},
						"get": {
							"!type": "fn(attr: string) -> !custom:doradoGet"
						},
						"set": {
							"!type": "fn(attr: string, value?: ?, options?: ?) -> !this"
						},
						"hasTag": {
							"!type": "fn(tag: string) -> bool"
						},
						"addListener": {
							"!type": "fn(name: string, listener: fn(), options?: ?) -> ?"
						},
						"removeListener": {
							"!type": "fn(name: string, listener?: fn())"
						},
						"clearListeners": {
							"!type": "fn(name: string)"
						},
						"disableListeners": {
							"!type": "fn()"
						},
						"enableListeners": {
							"!type": "fn()"
						},
						"fireEvent": {
							"!type": "fn(name: string) -> bool"
						},
						"getListenerCount": {
							"!type": "fn(name: string) -> number"
						}
					}
				},
				"ColumnGroup": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.grid.Column", "dorado.widget.grid.ColumnModel" ],
					"prototype": {
						"id": {
							"!type": "string"
						},
						"ATTRIBUTES": { },
						"objects": {
							"!type": "[+dorado.AttributeSupport]"
						},
						"EVENTS": { },
						"getAttributeWatcher": {
							"!type": "fn() -> +dorado.AttributeWatcher"
						},
						"get": {
							"!type": "fn(attr: string) -> !custom:doradoGet"
						},
						"set": {
							"!type": "fn(attr: string, value?: ?, options?: ?) -> !this"
						},
						"hasTag": {
							"!type": "fn(tag: string) -> bool"
						},
						"addListener": {
							"!type": "fn(name: string, listener: fn(), options?: ?) -> ?"
						},
						"removeListener": {
							"!type": "fn(name: string, listener?: fn())"
						},
						"clearListeners": {
							"!type": "fn(name: string)"
						},
						"disableListeners": {
							"!type": "fn()"
						},
						"enableListeners": {
							"!type": "fn()"
						},
						"fireEvent": {
							"!type": "fn(name: string) -> bool"
						},
						"getListenerCount": {
							"!type": "fn(name: string) -> number"
						},
						"addColumn": {
							"!type": "fn(columnConfig: +dorado.widget.grid.Column, insertMode?: string, refColumn?: +dorado.widget.grid.Column) -> +dorado.widget.grid.Column"
						},
						"addColumns": {
							"!type": "fn(columnConfigs: [?])"
						},
						"getColumn": {
							"!type": "fn(name: string) -> +dorado.widget.grid.Column"
						},
						"findColumns": {
							"!type": "fn(name: ?) -> [+dorado.widget.grid.Column]"
						}
					}
				},
				"ColumnModel": {
					"!type": "fn()",
					"!extends": [ "dorado.AttributeSupport" ],
					"prototype": {
						"!proto": "dorado.AttributeSupport.prototype",
						"addColumn": {
							"!type": "fn(columnConfig: +dorado.widget.grid.Column, insertMode?: string, refColumn?: +dorado.widget.grid.Column) -> +dorado.widget.grid.Column"
						},
						"addColumns": {
							"!type": "fn(columnConfigs: [?])"
						},
						"getColumn": {
							"!type": "fn(name: string) -> +dorado.widget.grid.Column"
						},
						"findColumns": {
							"!type": "fn(name: ?) -> [+dorado.widget.grid.Column]"
						}
					}
				},
				"ControlCellEditor": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.grid.CellEditor" ],
					"prototype": {
						"!proto": "dorado.widget.grid.CellEditor.prototype",
						"createEditorControl": {
							"!type": "fn() -> +dorado.widget.Control"
						},
						"setEditorControl": {
							"!type": "fn(editorControl: +dorado.widget.Control)"
						}
					}
				},
				"CriterionDropDown": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.DropDown" ],
					"prototype": {
						"!proto": "dorado.widget.DropDown.prototype"
					}
				},
				"DataColumn": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.grid.Column" ],
					"!events": {
						"onRenderCell": {
							"!arg": {
								"dom": {
									"!type": "+Node"
								},
								"data": {
									"!type": "+dorado.Entity"
								},
								"rowType": {
									"!type": "string"
								},
								"cellRenderer": {
									"!type": "+dorado.widget.grid.DefaultCellRenderer"
								},
								"processDefault": {
									"!type": "bool"
								}
							}
						},
						"onRenderFooterCell": {
							"!arg": {
								"dom": {
									"!type": "+Node"
								},
								"data": {
									"!type": "+dorado.Entity"
								},
								"column": {
									"!type": "+dorado.widget.grid.DataColumn"
								},
								"processDefault": {
									"!type": "bool"
								}
							}
						},
						"onGetCellEditor": {
							"!arg": {
								"data": {
									"!type": "+dorado.Entity"
								},
								"cellEditor": {
									"!type": "+dorado.widget.grid.CellEditor"
								}
							}
						}
					},
					"prototype": {
						"!proto": "dorado.widget.grid.Column.prototype"
					}
				},
				"DefaultCellEditor": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.grid.SimpleCellEditor" ],
					"prototype": {
						"!proto": "dorado.widget.grid.SimpleCellEditor.prototype"
					}
				},
				"DefaultCellFooterRenderer": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.grid.CellRenderer" ],
					"prototype": {
						"!proto": "dorado.widget.grid.CellRenderer.prototype"
					}
				},
				"DefaultCellHeaderRenderer": {
					"!type": "fn()",
					"!extends": [ "dorado.Renderer" ],
					"prototype": {
						"!proto": "dorado.Renderer.prototype",
						"render": {
							"!type": "fn(dom: +Node, arg: ?)"
						}
					}
				},
				"DefaultCellRenderer": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.grid.CellRenderer" ],
					"prototype": {
						"!proto": "dorado.widget.grid.CellRenderer.prototype"
					}
				},
				"DefaultRowRenderer": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.grid.RowRenderer" ],
					"prototype": {
						"!proto": "dorado.widget.grid.RowRenderer.prototype"
					}
				},
				"FilterBarCellRenderer": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.grid.SubControlCellRenderer" ],
					"prototype": {
						"!proto": "dorado.widget.grid.SubControlCellRenderer.prototype"
					}
				},
				"GroupFooterRenderer": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.grid.DefaultRowRenderer" ],
					"prototype": {
						"!proto": "dorado.widget.grid.DefaultRowRenderer.prototype"
					}
				},
				"GroupHeaderRenderer": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.grid.RowRenderer" ],
					"prototype": {
						"!proto": "dorado.widget.grid.RowRenderer.prototype"
					}
				},
				"IndicatorColumn": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.grid.DataColumn" ],
					"prototype": {
						"!proto": "dorado.widget.grid.DataColumn.prototype"
					}
				},
				"ItemModel": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.list.ItemModel" ],
					"prototype": {
						"!proto": "dorado.widget.list.ItemModel.prototype"
					}
				},
				"ProgressBarCellRenderer": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.grid.SubControlCellRenderer" ],
					"prototype": {
						"!proto": "dorado.widget.grid.SubControlCellRenderer.prototype"
					}
				},
				"RadioGroupCellRenderer": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.grid.SubControlCellRenderer" ],
					"prototype": {
						"!proto": "dorado.widget.grid.SubControlCellRenderer.prototype",
						"getRadioButtons": {
							"!type": "fn(arg: ?) -> [?]"
						}
					}
				},
				"RowNumColumn": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.grid.DataColumn" ],
					"prototype": {
						"!proto": "dorado.widget.grid.DataColumn.prototype"
					}
				},
				"RowRenderer": {
					"!type": "fn()",
					"!extends": [ "dorado.Renderer" ],
					"prototype": {
						"!proto": "dorado.Renderer.prototype",
						"doRender": { },
						"render": {
							"!type": "fn(dom: +Node, arg: ?)"
						}
					}
				},
				"RowSelectorColumn": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.grid.DataColumn" ],
					"prototype": {
						"!proto": "dorado.widget.grid.DataColumn.prototype"
					}
				},
				"SimpleCellEditor": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.grid.ControlCellEditor" ],
					"prototype": {
						"!proto": "dorado.widget.grid.ControlCellEditor.prototype"
					}
				},
				"SubControlCellRenderer": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.grid.DefaultCellRenderer" ],
					"prototype": {
						"!proto": "dorado.widget.grid.DefaultCellRenderer.prototype"
					}
				}
			},
			"GroupBox": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.AbstractPanel" ],
				"prototype": {
					"!proto": "dorado.widget.AbstractPanel.prototype"
				}
			},
			"HtmlContainer": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Container" ],
				"prototype": {
					"!proto": "dorado.widget.Container.prototype",
					"getSubDom": {
						"!type": "fn(contextKey: string) -> +Node"
					}
				}
			},
			"IFrame": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Control" ],
				"!events": {
					"onLoad": {
						"!arg": { }
					}
				},
				"prototype": {
					"!proto": "dorado.widget.Control.prototype",
					"reload": {
						"!type": "fn()"
					},
					"getIFrameWindow": {
						"!type": "fn() -> window"
					}
				}
			},
			"Image": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Control", "dorado.widget.PropertyDataControl" ],
				"prototype": {
					"blankImage": {
						"!type": "string"
					},
					"renderUtilAttached": {
						"!type": "bool"
					},
					"focusable": {
						"!type": "bool"
					},
					"selectable": {
						"!type": "bool"
					},
					"getFocusableSubControls": {
						"!type": "[+dorado.widget.Control]"
					},
					"ATTRIBUTES": { },
					"objects": {
						"!type": "[+dorado.AttributeSupport]"
					},
					"EVENTS": { },
					"refreshDom": {
						"!type": "fn(dom: +Node)"
					},
					"getDom": {
						"!type": "fn() -> +Node"
					},
					"findParent": {
						"!type": "fn(type: ?) -> +dorado.widget.Container"
					},
					"isFocusable": {
						"!type": "fn(deep?: bool) -> bool"
					},
					"setFocus": {
						"!type": "fn()"
					},
					"destroy": {
						"!type": "fn()"
					},
					"getAttributeWatcher": {
						"!type": "fn() -> +dorado.AttributeWatcher"
					},
					"get": {
						"!type": "fn(attr: string) -> !custom:doradoGet"
					},
					"set": {
						"!type": "fn(attr: string, value?: ?, options?: ?) -> !this"
					},
					"hasTag": {
						"!type": "fn(tag: string) -> bool"
					},
					"addListener": {
						"!type": "fn(name: string, listener: fn(), options?: ?) -> ?"
					},
					"removeListener": {
						"!type": "fn(name: string, listener?: fn())"
					},
					"clearListeners": {
						"!type": "fn(name: string)"
					},
					"disableListeners": {
						"!type": "fn()"
					},
					"enableListeners": {
						"!type": "fn()"
					},
					"fireEvent": {
						"!type": "fn(name: string) -> bool"
					},
					"getListenerCount": {
						"!type": "fn(name: string) -> number"
					},
					"createDom": {
						"!type": "fn() -> +Node"
					},
					"getRealWidth": {
						"!type": "fn() -> number"
					},
					"getRealHeight": {
						"!type": "fn() -> number"
					},
					"render": {
						"!type": "fn(containerElement: +Node, nextChildElement?: +Node)"
					},
					"replace": {
						"!type": "fn(elmenent: +Node)"
					},
					"unrender": {
						"!type": "fn()"
					},
					"refresh": {
						"!type": "fn(delay: bool)"
					},
					"disableBinding": {
						"!type": "fn()"
					},
					"enableBinding": {
						"!type": "fn()"
					},
					"getBindingData": {
						"!type": "fn(options?: ?) -> +dorado.EntityList"
					},
					"getBindingDataType": {
						"!type": "fn(options?: ?) -> +dorado.DataType"
					},
					"dataSetMessageReceived": {
						"!type": "fn(messageCode: ?, arg: ?)"
					}
				}
			},
			"Label": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Control", "dorado.widget.PropertyDataControl" ],
				"prototype": {
					"renderUtilAttached": {
						"!type": "bool"
					},
					"focusable": {
						"!type": "bool"
					},
					"selectable": {
						"!type": "bool"
					},
					"getFocusableSubControls": {
						"!type": "[+dorado.widget.Control]"
					},
					"ATTRIBUTES": { },
					"objects": {
						"!type": "[+dorado.AttributeSupport]"
					},
					"EVENTS": { },
					"refreshDom": {
						"!type": "fn(dom: +Node)"
					},
					"getDom": {
						"!type": "fn() -> +Node"
					},
					"findParent": {
						"!type": "fn(type: ?) -> +dorado.widget.Container"
					},
					"isFocusable": {
						"!type": "fn(deep?: bool) -> bool"
					},
					"setFocus": {
						"!type": "fn()"
					},
					"destroy": {
						"!type": "fn()"
					},
					"getAttributeWatcher": {
						"!type": "fn() -> +dorado.AttributeWatcher"
					},
					"get": {
						"!type": "fn(attr: string) -> !custom:doradoGet"
					},
					"set": {
						"!type": "fn(attr: string, value?: ?, options?: ?) -> !this"
					},
					"hasTag": {
						"!type": "fn(tag: string) -> bool"
					},
					"addListener": {
						"!type": "fn(name: string, listener: fn(), options?: ?) -> ?"
					},
					"removeListener": {
						"!type": "fn(name: string, listener?: fn())"
					},
					"clearListeners": {
						"!type": "fn(name: string)"
					},
					"disableListeners": {
						"!type": "fn()"
					},
					"enableListeners": {
						"!type": "fn()"
					},
					"fireEvent": {
						"!type": "fn(name: string) -> bool"
					},
					"getListenerCount": {
						"!type": "fn(name: string) -> number"
					},
					"createDom": {
						"!type": "fn() -> +Node"
					},
					"getRealWidth": {
						"!type": "fn() -> number"
					},
					"getRealHeight": {
						"!type": "fn() -> number"
					},
					"render": {
						"!type": "fn(containerElement: +Node, nextChildElement?: +Node)"
					},
					"replace": {
						"!type": "fn(elmenent: +Node)"
					},
					"unrender": {
						"!type": "fn()"
					},
					"refresh": {
						"!type": "fn(delay: bool)"
					},
					"disableBinding": {
						"!type": "fn()"
					},
					"enableBinding": {
						"!type": "fn()"
					},
					"getBindingData": {
						"!type": "fn(options?: ?) -> +dorado.EntityList"
					},
					"getBindingDataType": {
						"!type": "fn(options?: ?) -> +dorado.DataType"
					},
					"dataSetMessageReceived": {
						"!type": "fn(messageCode: ?, arg: ?)"
					}
				}
			},
			"layout": {
				"AnchorLayout": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.layout.Layout" ],
					"prototype": {
						"!proto": "dorado.widget.layout.Layout.prototype"
					}
				},
				"DockLayout": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.layout.AnchorLayout" ],
					"prototype": {
						"!proto": "dorado.widget.layout.AnchorLayout.prototype"
					}
				},
				"FormLayout": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.layout.Layout" ],
					"prototype": {
						"!proto": "dorado.widget.layout.Layout.prototype"
					}
				},
				"HBoxLayout": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.layout.AbstractBoxLayout" ],
					"prototype": {
						"!proto": "dorado.widget.layout.AbstractBoxLayout.prototype",
						"align": { }
					}
				},
				"Layout": {
					"!type": "fn()",
					"!extends": [ "dorado.AttributeSupport" ],
					"NONE_LAYOUT_CONSTRAINT": {
						"!type": "string"
					},
					"prototype": {
						"!proto": "dorado.AttributeSupport.prototype",
						"getDom": {
							"!type": "fn() -> +Node"
						},
						"refresh": {
							"!type": "fn()"
						},
						"onAttachToDocument": {
							"!type": "fn(containerElement: +Node)"
						},
						"onDetachFromDocument": {
							"!type": "fn()"
						},
						"addControl": {
							"!type": "fn(control: +dorado.widget.Control, layoutConstraint?: ?) -> ?"
						},
						"removeControl": {
							"!type": "fn(control: +dorado.widget.Control)"
						},
						"removeAllControls": {
							"!type": "fn()"
						},
						"disableRendering": {
							"!type": "fn()"
						},
						"enableRendering": {
							"!type": "fn()"
						}
					}
				},
				"NativeLayout": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.layout.Layout" ],
					"prototype": {
						"!proto": "dorado.widget.layout.Layout.prototype"
					}
				},
				"VBoxLayout": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.layout.AbstractBoxLayout" ],
					"prototype": {
						"!proto": "dorado.widget.layout.AbstractBoxLayout.prototype",
						"align": { }
					}
				}
			},
			"Link": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Label" ],
				"!events": {
					"onClick": {
						"!arg": {
							"button": {
								"!type": "number"
							},
							"event": {
								"!type": "+jQuery.Event"
							},
							"returnValue": {
								"!type": "bool"
							}
						}
					}
				},
				"prototype": {
					"!proto": "dorado.widget.Label.prototype"
				}
			},
			"list": {
				"ItemModel": {
					"!type": "fn()",
					"prototype": {
						"setItemDomSize": {
							"!type": "fn(itemDomSize: number)"
						},
						"getStartIndex": {
							"!type": "fn() -> number"
						},
						"setStartIndex": {
							"!type": "fn(startIndex: number)"
						},
						"isReverse": {
							"!type": "fn() -> bool"
						},
						"setReverse": {
							"!type": "fn(reverse: bool)"
						},
						"setScrollSize": {
							"!type": "fn(viewPortSize: number, scrollSize: number)"
						},
						"setScrollPos": {
							"!type": "fn(scrollPos: number)"
						},
						"getItems": {
							"!type": "fn() -> +dorado.EntityList"
						},
						"setItems": {
							"!type": "fn(items: +dorado.EntityList)"
						},
						"iterator": {
							"!type": "fn(startIndex?: number) -> +dorado.util.Iterator"
						},
						"getItemCount": {
							"!type": "fn() -> number"
						},
						"getItemAt": {
							"!type": "fn(index: number) -> +dorado.Entity"
						},
						"getItemById": {
							"!type": "fn(itemId: string) -> +dorado.Entity"
						},
						"getItemIndex": {
							"!type": "fn(item: +dorado.Entity) -> number"
						},
						"sort": {
							"!type": "fn(sortParams: ?, comparator: fn())"
						},
						"filter": {
							"!type": "fn(filterParams: [?], customFilter?: fn())"
						},
						"toArray": {
							"!type": "fn() -> [?]"
						}
					}
				},
				"ListBoxRowRenderer": {
					"!type": "fn()",
					"!extends": [ "dorado.Renderer" ],
					"prototype": {
						"!proto": "dorado.Renderer.prototype",
						"render": {
							"!type": "fn(dom: +Node, arg: ?)"
						}
					}
				}
			},
			"ListBox": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.AbstractListBox" ],
				"prototype": {
					"!proto": "dorado.widget.AbstractListBox.prototype",
					"highlightItem": {
						"!type": "fn(index?: number, options?: ?, speed?: ?)"
					}
				}
			},
			"ListDropDown": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.RowListDropDown" ],
				"prototype": {
					"!proto": "dorado.widget.RowListDropDown.prototype"
				}
			},
			"Menu": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.AbstractMenu" ],
				"!events": {
					"onHideTopMenu": {
						"!arg": { }
					},
					"onClick": {
						"!arg": {
							"button": {
								"!type": "number"
							},
							"event": {
								"!type": "+jQuery.Event"
							},
							"item": {
								"!type": "+jQuery.Event"
							},
							"returnValue": {
								"!type": "bool"
							}
						}
					}
				},
				"prototype": {
					"!proto": "dorado.widget.AbstractMenu.prototype",
					"iconSize": {
						"!type": "string"
					},
					"doOnKeyDown": {
						"!type": "fn(event: ?)"
					},
					"freeze": {
						"!type": "fn(deep?: bool)"
					},
					"unfreeze": {
						"!type": "fn(deep?: bool)"
					}
				}
			},
			"menu": {
				"AbstractMenuItem": {
					"!type": "fn()",
					"!extends": [ "dorado.RenderableElement", "dorado.EventSupport" ],
					"prototype": {
						"ATTRIBUTES": { },
						"objects": {
							"!type": "[+dorado.AttributeSupport]"
						},
						"EVENTS": { },
						"createDom": {
							"!type": "fn() -> +Node"
						},
						"refreshDom": {
							"!type": "fn(dom: +Node)"
						},
						"getRealWidth": {
							"!type": "fn() -> number"
						},
						"getRealHeight": {
							"!type": "fn() -> number"
						},
						"getDom": {
							"!type": "fn() -> +Node"
						},
						"render": {
							"!type": "fn(containerElement: +Node, nextChildElement?: +Node)"
						},
						"replace": {
							"!type": "fn(elmenent: +Node)"
						},
						"unrender": {
							"!type": "fn()"
						},
						"refresh": {
							"!type": "fn(delay: bool)"
						},
						"getAttributeWatcher": {
							"!type": "fn() -> +dorado.AttributeWatcher"
						},
						"get": {
							"!type": "fn(attr: string) -> !custom:doradoGet"
						},
						"set": {
							"!type": "fn(attr: string, value?: ?, options?: ?) -> !this"
						},
						"hasTag": {
							"!type": "fn(tag: string) -> bool"
						},
						"addListener": {
							"!type": "fn(name: string, listener: fn(), options?: ?) -> ?"
						},
						"removeListener": {
							"!type": "fn(name: string, listener?: fn())"
						},
						"clearListeners": {
							"!type": "fn(name: string)"
						},
						"disableListeners": {
							"!type": "fn()"
						},
						"enableListeners": {
							"!type": "fn()"
						},
						"fireEvent": {
							"!type": "fn(name: string) -> bool"
						},
						"getListenerCount": {
							"!type": "fn(name: string) -> number"
						}
					}
				},
				"CheckableMenuItem": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.menu.TextMenuItem" ],
					"!events": {
						"onCheckedChange": {
							"!arg": { }
						}
					},
					"prototype": {
						"!proto": "dorado.widget.menu.TextMenuItem.prototype"
					}
				},
				"ControlMenuItem": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.menu.TextMenuItem" ],
					"prototype": {
						"!proto": "dorado.widget.menu.TextMenuItem.prototype"
					}
				},
				"MenuItem": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.menu.TextMenuItem" ],
					"prototype": {
						"!proto": "dorado.widget.menu.TextMenuItem.prototype",
						"hasSubmenu": {
							"!type": "fn() -> bool"
						},
						"getItem": {
							"!type": "fn(name: string) -> +dorado.widget.menu.AbstractMenuItem"
						},
						"addItem": {
							"!type": "fn(item: +dorado.widget.menu.AbstractMenuItem, index?: number)"
						},
						"removeItem": {
							"!type": "fn(item: +dorado.widget.menu.AbstractMenuItem)"
						},
						"clearItems": {
							"!type": "fn()"
						},
						"showSubmenu": {
							"!type": "fn(focusfirst?: bool)"
						},
						"hideSubmenu": {
							"!type": "fn()"
						}
					}
				},
				"Separator": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.menu.AbstractMenuItem" ],
					"prototype": {
						"!proto": "dorado.widget.menu.AbstractMenuItem.prototype"
					}
				},
				"TextMenuItem": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.menu.AbstractMenuItem", "dorado.widget.ActionSupport" ],
					"!events": {
						"onClick": {
							"!arg": { }
						}
					},
					"prototype": {
						"ATTRIBUTES": { },
						"objects": {
							"!type": "[+dorado.AttributeSupport]"
						},
						"EVENTS": { },
						"createDom": {
							"!type": "fn() -> +Node"
						},
						"refreshDom": {
							"!type": "fn(dom: +Node)"
						},
						"getRealWidth": {
							"!type": "fn() -> number"
						},
						"getRealHeight": {
							"!type": "fn() -> number"
						},
						"getDom": {
							"!type": "fn() -> +Node"
						},
						"render": {
							"!type": "fn(containerElement: +Node, nextChildElement?: +Node)"
						},
						"replace": {
							"!type": "fn(elmenent: +Node)"
						},
						"unrender": {
							"!type": "fn()"
						},
						"refresh": {
							"!type": "fn(delay: bool)"
						},
						"getAttributeWatcher": {
							"!type": "fn() -> +dorado.AttributeWatcher"
						},
						"get": {
							"!type": "fn(attr: string) -> !custom:doradoGet"
						},
						"set": {
							"!type": "fn(attr: string, value?: ?, options?: ?) -> !this"
						},
						"hasTag": {
							"!type": "fn(tag: string) -> bool"
						},
						"addListener": {
							"!type": "fn(name: string, listener: fn(), options?: ?) -> ?"
						},
						"removeListener": {
							"!type": "fn(name: string, listener?: fn())"
						},
						"clearListeners": {
							"!type": "fn(name: string)"
						},
						"disableListeners": {
							"!type": "fn()"
						},
						"enableListeners": {
							"!type": "fn()"
						},
						"fireEvent": {
							"!type": "fn(name: string) -> bool"
						},
						"getListenerCount": {
							"!type": "fn(name: string) -> number"
						}
					}
				}
			},
			"MultiSlotSpinner": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Spinner" ],
				"prototype": {
					"!proto": "dorado.widget.Spinner.prototype",
					"slotConfigs": {
						"!type": "[?]"
					},
					"defaultSlot": {
						"!type": "number"
					}
				}
			},
			"NotifyTip": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Tip" ],
				"prototype": {
					"!proto": "dorado.widget.Tip.prototype"
				}
			},
			"NotifyTipManager": {
				"notify": {
					"!type": "fn(msg: string, options?: ?) -> +dorado.widget.NotifyTip"
				}
			},
			"NumberSpinner": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Spinner" ],
				"prototype": {
					"!proto": "dorado.widget.Spinner.prototype"
				}
			},
			"Panel": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.AbstractPanel" ],
				"prototype": {
					"!proto": "dorado.widget.AbstractPanel.prototype",
					"close": {
						"!type": "fn()"
					}
				}
			},
			"PasswordEditor": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.AbstractTextEditor" ],
				"prototype": {
					"!proto": "dorado.widget.AbstractTextEditor.prototype"
				}
			},
			"ProgressBar": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Control" ],
				"prototype": {
					"!proto": "dorado.widget.Control.prototype"
				}
			},
			"PropertyDataControl": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.DataControl" ],
				"prototype": {
					"!proto": "dorado.widget.DataControl.prototype"
				}
			},
			"RadioButton": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Control" ],
				"prototype": {
					"!proto": "dorado.widget.Control.prototype"
				}
			},
			"RadioGroup": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.AbstractDataEditor" ],
				"!events": {
					"onValueChange": {
						"!arg": { }
					}
				},
				"prototype": {
					"!proto": "dorado.widget.AbstractDataEditor.prototype",
					"addRadioButton": {
						"!type": "fn(radioButton: +dorado.widget.RadioButton, index?: number)"
					},
					"removeRadioButton": {
						"!type": "fn(radioButton: +dorado.widget.RadioButton)"
					},
					"clearRadioButtons": {
						"!type": "fn()"
					}
				}
			},
			"RowList": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.ViewPortList" ],
				"!events": {
					"onDataRowClick": {
						"!arg": {
							"event": {
								"!type": "+jQuery.Event"
							}
						}
					},
					"onDataRowDoubleClick": {
						"!arg": {
							"event": {
								"!type": "+jQuery.Event"
							}
						}
					}
				},
				"prototype": {
					"!proto": "dorado.widget.ViewPortList.prototype"
				}
			},
			"RowListDropDown": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.DropDown" ],
				"!events": {
					"onFilterItems": {
						"!arg": {
							"filterOperator": {
								"!type": "string"
							},
							"filterValue": {
								"!type": "string"
							},
							"processDefault": {
								"!type": "bool"
							}
						}
					},
					"onFilterItem": {
						"!arg": {
							"value": {
								"!type": "+dorado.Entity"
							},
							"filterValue": {
								"!type": "string"
							},
							"accept": {
								"!type": "bool"
							}
						}
					}
				},
				"prototype": {
					"!proto": "dorado.widget.DropDown.prototype"
				}
			},
			"Section": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Control" ],
				"!events": {
					"onCaptionClick": {
						"!arg": { }
					}
				},
				"prototype": {
					"!proto": "dorado.widget.Control.prototype"
				}
			},
			"SimpleButton": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.AbstractButton" ],
				"prototype": {
					"!proto": "dorado.widget.AbstractButton.prototype"
				}
			},
			"SimpleIconButton": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.SimpleButton" ],
				"prototype": {
					"!proto": "dorado.widget.SimpleButton.prototype"
				}
			},
			"Slider": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Control" ],
				"!events": {
					"beforeValueChange": {
						"!arg": { }
					},
					"onValueChange": {
						"!arg": { }
					}
				},
				"prototype": {
					"!proto": "dorado.widget.Control.prototype"
				}
			},
			"Spinner": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.AbstractTextBox" ],
				"prototype": {
					"!proto": "dorado.widget.AbstractTextBox.prototype"
				}
			},
			"SpinnerTrigger": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Trigger" ],
				"prototype": {
					"!proto": "dorado.widget.Trigger.prototype"
				}
			},
			"SplitPanel": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Control" ],
				"!events": {
					"beforeCollapsedChange": {
						"!arg": { }
					},
					"onCollapsedChange": {
						"!arg": { }
					}
				},
				"prototype": {
					"!proto": "dorado.widget.Control.prototype"
				}
			},
			"SubViewHolder": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Control" ],
				"prototype": {
					"!proto": "dorado.widget.Control.prototype"
				}
			},
			"tab": {
				"ControlTab": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.tab.Tab" ],
					"prototype": {
						"!proto": "dorado.widget.tab.Tab.prototype"
					}
				},
				"IFrameTab": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.tab.ControlTab" ],
					"prototype": {
						"!proto": "dorado.widget.tab.ControlTab.prototype"
					}
				},
				"Tab": {
					"!type": "fn()",
					"!events": {
						"beforeClose": {
							"!arg": { }
						},
						"onClose": {
							"!arg": { }
						}
					},
					"prototype": {
						"close": {
							"!type": "fn()"
						}
					}
				}
			},
			"TabBar": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.TabGroup" ],
				"prototype": {
					"!proto": "dorado.widget.TabGroup.prototype",
					"addRightToolButton": {
						"!type": "fn(button: +dorado.widget.SimpleButton)"
					}
				}
			},
			"TabColumn": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.TabGroup" ],
				"prototype": {
					"!proto": "dorado.widget.TabGroup.prototype"
				}
			},
			"TabControl": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.TabBar" ],
				"prototype": {
					"!proto": "dorado.widget.TabBar.prototype"
				}
			},
			"TabGroup": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Control" ],
				"!events": {
					"beforeTabChange": {
						"!arg": {
							"newTab": {
								"!type": "+dorado.widget.tab.Tab"
							},
							"oldTab": {
								"!type": "+dorado.widget.tab.Tab"
							}
						}
					},
					"onTabChange": {
						"!arg": {
							"newTab": {
								"!type": "+dorado.widget.tab.Tab"
							},
							"oldTab": {
								"!type": "+dorado.widget.tab.Tab"
							}
						}
					},
					"onTabRemove": {
						"!arg": {
							"tab": {
								"!type": "+dorado.widget.tab.Tab"
							}
						}
					},
					"onTabContextMenu": {
						"!arg": {
							"tab": {
								"!type": "+dorado.widget.tab.Tab"
							},
							"event": {
								"!type": "+jQuery.Event"
							},
							"processDefault": {
								"!type": "bool"
							}
						}
					}
				},
				"prototype": {
					"!proto": "dorado.widget.Control.prototype",
					"getTab": {
						"!type": "fn(tab: +dorado.widget.tab.Tab)"
					},
					"addTab": {
						"!type": "fn(tab: +dorado.widget.tab.Tab, index?: number, current?: bool) -> +dorado.widget.tab.Tab"
					},
					"removeTab": {
						"!type": "fn(tab: +dorado.widget.tab.Tab)"
					},
					"clearTabs": {
						"!type": "fn()"
					},
					"closeTab": {
						"!type": "fn(tab: +dorado.widget.tab.Tab)"
					},
					"closeOtherTabs": {
						"!type": "fn(tab: +dorado.widget.tab.Tab, force?: bool)"
					},
					"closeAllTabs": {
						"!type": "fn(force?: bool)"
					}
				}
			},
			"TemplateField": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Control", "dorado.widget.DataControl" ],
				"prototype": {
					"renderUtilAttached": {
						"!type": "bool"
					},
					"focusable": {
						"!type": "bool"
					},
					"selectable": {
						"!type": "bool"
					},
					"getFocusableSubControls": {
						"!type": "[+dorado.widget.Control]"
					},
					"ATTRIBUTES": { },
					"objects": {
						"!type": "[+dorado.AttributeSupport]"
					},
					"EVENTS": { },
					"refreshDom": {
						"!type": "fn(dom: +Node)"
					},
					"getDom": {
						"!type": "fn() -> +Node"
					},
					"findParent": {
						"!type": "fn(type: ?) -> +dorado.widget.Container"
					},
					"isFocusable": {
						"!type": "fn(deep?: bool) -> bool"
					},
					"setFocus": {
						"!type": "fn()"
					},
					"destroy": {
						"!type": "fn()"
					},
					"getAttributeWatcher": {
						"!type": "fn() -> +dorado.AttributeWatcher"
					},
					"get": {
						"!type": "fn(attr: string) -> !custom:doradoGet"
					},
					"set": {
						"!type": "fn(attr: string, value?: ?, options?: ?) -> !this"
					},
					"hasTag": {
						"!type": "fn(tag: string) -> bool"
					},
					"addListener": {
						"!type": "fn(name: string, listener: fn(), options?: ?) -> ?"
					},
					"removeListener": {
						"!type": "fn(name: string, listener?: fn())"
					},
					"clearListeners": {
						"!type": "fn(name: string)"
					},
					"disableListeners": {
						"!type": "fn()"
					},
					"enableListeners": {
						"!type": "fn()"
					},
					"fireEvent": {
						"!type": "fn(name: string) -> bool"
					},
					"getListenerCount": {
						"!type": "fn(name: string) -> number"
					},
					"createDom": {
						"!type": "fn() -> +Node"
					},
					"getRealWidth": {
						"!type": "fn() -> number"
					},
					"getRealHeight": {
						"!type": "fn() -> number"
					},
					"render": {
						"!type": "fn(containerElement: +Node, nextChildElement?: +Node)"
					},
					"replace": {
						"!type": "fn(elmenent: +Node)"
					},
					"unrender": {
						"!type": "fn()"
					},
					"refresh": {
						"!type": "fn(delay: bool)"
					},
					"disableBinding": {
						"!type": "fn()"
					},
					"enableBinding": {
						"!type": "fn()"
					},
					"getBindingData": {
						"!type": "fn(options?: ?) -> +dorado.EntityList"
					},
					"getBindingDataType": {
						"!type": "fn(options?: ?) -> +dorado.DataType"
					},
					"dataSetMessageReceived": {
						"!type": "fn(messageCode: ?, arg: ?)"
					}
				}
			},
			"TextArea": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.AbstractTextEditor" ],
				"prototype": {
					"!proto": "dorado.widget.AbstractTextEditor.prototype"
				}
			},
			"TextEditor": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.AbstractTextEditor" ],
				"prototype": {
					"!proto": "dorado.widget.AbstractTextEditor.prototype",
					"getMappedValue": {
						"!type": "fn(key: string) -> ?"
					},
					"getMappedKey": {
						"!type": "fn(value: ?) -> string"
					}
				}
			},
			"Tip": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Control", "dorado.widget.FloatControl" ],
				"prototype": {
					"renderUtilAttached": {
						"!type": "bool"
					},
					"focusable": {
						"!type": "bool"
					},
					"selectable": {
						"!type": "bool"
					},
					"getFocusableSubControls": {
						"!type": "[+dorado.widget.Control]"
					},
					"ATTRIBUTES": { },
					"objects": {
						"!type": "[+dorado.AttributeSupport]"
					},
					"EVENTS": { },
					"refreshDom": {
						"!type": "fn(dom: +Node)"
					},
					"getDom": {
						"!type": "fn() -> +Node"
					},
					"findParent": {
						"!type": "fn(type: ?) -> +dorado.widget.Container"
					},
					"isFocusable": {
						"!type": "fn(deep?: bool) -> bool"
					},
					"setFocus": {
						"!type": "fn()"
					},
					"destroy": {
						"!type": "fn()"
					},
					"getAttributeWatcher": {
						"!type": "fn() -> +dorado.AttributeWatcher"
					},
					"get": {
						"!type": "fn(attr: string) -> !custom:doradoGet"
					},
					"set": {
						"!type": "fn(attr: string, value?: ?, options?: ?) -> !this"
					},
					"hasTag": {
						"!type": "fn(tag: string) -> bool"
					},
					"addListener": {
						"!type": "fn(name: string, listener: fn(), options?: ?) -> ?"
					},
					"removeListener": {
						"!type": "fn(name: string, listener?: fn())"
					},
					"clearListeners": {
						"!type": "fn(name: string)"
					},
					"disableListeners": {
						"!type": "fn()"
					},
					"enableListeners": {
						"!type": "fn()"
					},
					"fireEvent": {
						"!type": "fn(name: string) -> bool"
					},
					"getListenerCount": {
						"!type": "fn(name: string) -> number"
					},
					"createDom": {
						"!type": "fn() -> +Node"
					},
					"getRealWidth": {
						"!type": "fn() -> number"
					},
					"getRealHeight": {
						"!type": "fn() -> number"
					},
					"render": {
						"!type": "fn(containerElement: +Node, nextChildElement?: +Node)"
					},
					"replace": {
						"!type": "fn(elmenent: +Node)"
					},
					"unrender": {
						"!type": "fn()"
					},
					"refresh": {
						"!type": "fn(delay: bool)"
					},
					"show": {
						"!type": "fn(options?: ?)"
					},
					"hide": {
						"!type": "fn(options: ?)"
					}
				}
			},
			"ToolBar": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Control" ],
				"prototype": {
					"!proto": "dorado.widget.Control.prototype",
					"showMenuOnHover": {
						"!type": "bool"
					},
					"addItem": {
						"!type": "fn(item: +dorado.widget.Control, index?: number) -> +dorado.widget.Control"
					},
					"removeItem": {
						"!type": "fn(item: +dorado.widget.Control)"
					},
					"clearItems": {
						"!type": "fn()"
					}
				}
			},
			"toolbar": {
				"Button": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.Button" ],
					"prototype": {
						"!proto": "dorado.widget.Button.prototype"
					}
				},
				"Fill": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.Control" ],
					"prototype": {
						"!proto": "dorado.widget.Control.prototype"
					}
				},
				"Label": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.Control" ],
					"prototype": {
						"!proto": "dorado.widget.Control.prototype"
					}
				},
				"Separator": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.Control" ],
					"prototype": {
						"!proto": "dorado.widget.Control.prototype"
					}
				}
			},
			"ToolTip": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Tip" ],
				"prototype": {
					"!proto": "dorado.widget.Tip.prototype"
				}
			},
			"Tree": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.AbstractTree" ],
				"prototype": {
					"!proto": "dorado.widget.AbstractTree.prototype"
				}
			},
			"tree": {
				"DataBindingNode": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.tree.DataNode" ],
					"prototype": {
						"!proto": "dorado.widget.tree.DataNode.prototype"
					}
				},
				"DataNode": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.tree.Node" ],
					"prototype": {
						"!proto": "dorado.widget.tree.Node.prototype"
					}
				},
				"ItemModel": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.list.ItemModel" ],
					"prototype": {
						"!proto": "dorado.widget.list.ItemModel.prototype"
					}
				},
				"Node": {
					"!type": "fn()",
					"!extends": [ "dorado.AttributeSupport", "dorado.EventSupport" ],
					"prototype": {
						"ATTRIBUTES": { },
						"objects": {
							"!type": "[+dorado.AttributeSupport]"
						},
						"EVENTS": { },
						"refresh": {
							"!type": "fn()"
						},
						"addNode": {
							"!type": "fn(data: +dorado.widget.tree.Node, insertMode?: number, refData?: ?) -> +dorado.widget.tree.Node"
						},
						"addNodes": {
							"!type": "fn(nodeConfigs: [+dorado.widget.tree.Node])"
						},
						"remove": {
							"!type": "fn()"
						},
						"clearChildren": {
							"!type": "fn()"
						},
						"expand": {
							"!type": "fn(callback?: fn())"
						},
						"expandAsync": {
							"!type": "fn(callback: fn())"
						},
						"collapse": {
							"!type": "fn()"
						},
						"highlight": {
							"!type": "fn(options?: ?, speed?: ?)"
						},
						"expandParents": {
							"!type": "fn()"
						},
						"getAttributeWatcher": {
							"!type": "fn() -> +dorado.AttributeWatcher"
						},
						"get": {
							"!type": "fn(attr: string) -> !custom:doradoGet"
						},
						"set": {
							"!type": "fn(attr: string, value?: ?, options?: ?) -> !this"
						},
						"hasTag": {
							"!type": "fn(tag: string) -> bool"
						},
						"addListener": {
							"!type": "fn(name: string, listener: fn(), options?: ?) -> ?"
						},
						"removeListener": {
							"!type": "fn(name: string, listener?: fn())"
						},
						"clearListeners": {
							"!type": "fn(name: string)"
						},
						"disableListeners": {
							"!type": "fn()"
						},
						"enableListeners": {
							"!type": "fn()"
						},
						"fireEvent": {
							"!type": "fn(name: string) -> bool"
						},
						"getListenerCount": {
							"!type": "fn(name: string) -> number"
						}
					}
				},
				"TreeNodeRenderer": {
					"!type": "fn()",
					"!extends": [ "dorado.Renderer" ],
					"prototype": {
						"!proto": "dorado.Renderer.prototype",
						"doRender": { }
					}
				}
			},
			"TreeGrid": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.AbstractGrid", "dorado.widget.AbstractTree" ],
				"prototype": {
					"groupProperty": {
						"!type": "string"
					},
					"renderUtilAttached": {
						"!type": "bool"
					},
					"focusable": {
						"!type": "bool"
					},
					"selectable": {
						"!type": "bool"
					},
					"getFocusableSubControls": {
						"!type": "[+dorado.widget.Control]"
					},
					"ATTRIBUTES": { },
					"objects": {
						"!type": "[+dorado.AttributeSupport]"
					},
					"EVENTS": { },
					"getCurrentItem": {
						"!type": "fn() -> +dorado.Entity"
					},
					"getEntityByEvent": {
						"!type": "fn(event: +jQuery.Event) -> +dorado.Entity"
					},
					"getColumnByEvent": {
						"!type": "fn(event: +jQuery.Event) -> +dorado.widget.grid.DataColumn"
					},
					"sort": {
						"!type": "fn(column: +dorado.widget.grid.DataColumn, desc?: bool)"
					},
					"highlightItem": {
						"!type": "fn(entity?: +dorado.Entity, options?: ?, speed?: ?)"
					},
					"selectAll": {
						"!type": "fn()"
					},
					"unselectAll": {
						"!type": "fn()"
					},
					"selectInvert": {
						"!type": "fn()"
					},
					"refreshSummary": {
						"!type": "fn()"
					},
					"refreshDom": {
						"!type": "fn(dom: +Node)"
					},
					"getDom": {
						"!type": "fn() -> +Node"
					},
					"findParent": {
						"!type": "fn(type: ?) -> +dorado.widget.Container"
					},
					"isFocusable": {
						"!type": "fn(deep?: bool) -> bool"
					},
					"setFocus": {
						"!type": "fn()"
					},
					"destroy": {
						"!type": "fn()"
					},
					"getAttributeWatcher": {
						"!type": "fn() -> +dorado.AttributeWatcher"
					},
					"get": {
						"!type": "fn(attr: string) -> !custom:doradoGet"
					},
					"set": {
						"!type": "fn(attr: string, value?: ?, options?: ?) -> !this"
					},
					"hasTag": {
						"!type": "fn(tag: string) -> bool"
					},
					"addListener": {
						"!type": "fn(name: string, listener: fn(), options?: ?) -> ?"
					},
					"removeListener": {
						"!type": "fn(name: string, listener?: fn())"
					},
					"clearListeners": {
						"!type": "fn(name: string)"
					},
					"disableListeners": {
						"!type": "fn()"
					},
					"enableListeners": {
						"!type": "fn()"
					},
					"fireEvent": {
						"!type": "fn(name: string) -> bool"
					},
					"getListenerCount": {
						"!type": "fn(name: string) -> number"
					},
					"createDom": {
						"!type": "fn() -> +Node"
					},
					"getRealWidth": {
						"!type": "fn() -> number"
					},
					"getRealHeight": {
						"!type": "fn() -> number"
					},
					"render": {
						"!type": "fn(containerElement: +Node, nextChildElement?: +Node)"
					},
					"replace": {
						"!type": "fn(elmenent: +Node)"
					},
					"unrender": {
						"!type": "fn()"
					},
					"refresh": {
						"!type": "fn(delay: bool)"
					},
					"addColumn": {
						"!type": "fn(columnConfig: +dorado.widget.grid.Column, insertMode?: string, refColumn?: +dorado.widget.grid.Column) -> +dorado.widget.grid.Column"
					},
					"addColumns": {
						"!type": "fn(columnConfigs: [?])"
					},
					"getColumn": {
						"!type": "fn(name: string) -> +dorado.widget.grid.Column"
					},
					"findColumns": {
						"!type": "fn(name: ?) -> [+dorado.widget.grid.Column]"
					},
					"clearNodes": {
						"!type": "fn()"
					},
					"refreshNode": {
						"!type": "fn(node: +dorado.widget.tree.Node)"
					},
					"disableAutoRefresh": {
						"!type": "fn()"
					},
					"enableAutoRefresh": {
						"!type": "fn()"
					},
					"getNodeByEvent": {
						"!type": "fn(event: +jQuery.Event) -> +dorado.widget.tree.Node"
					},
					"getCheckedNodes": {
						"!type": "fn(includeHalfChecked?: bool) -> [+dorado.widget.tree.Node]"
					}
				}
			},
			"treegrid": {
				"ItemModel": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.list.ItemModel", "dorado.widget.grid.ItemModel" ],
					"prototype": {
						"setItemDomSize": {
							"!type": "fn(itemDomSize: number)"
						},
						"getStartIndex": {
							"!type": "fn() -> number"
						},
						"setStartIndex": {
							"!type": "fn(startIndex: number)"
						},
						"isReverse": {
							"!type": "fn() -> bool"
						},
						"setReverse": {
							"!type": "fn(reverse: bool)"
						},
						"setScrollSize": {
							"!type": "fn(viewPortSize: number, scrollSize: number)"
						},
						"setScrollPos": {
							"!type": "fn(scrollPos: number)"
						},
						"getItems": {
							"!type": "fn() -> +dorado.EntityList"
						},
						"setItems": {
							"!type": "fn(items: +dorado.EntityList)"
						},
						"iterator": {
							"!type": "fn(startIndex?: number) -> +dorado.util.Iterator"
						},
						"getItemCount": {
							"!type": "fn() -> number"
						},
						"getItemAt": {
							"!type": "fn(index: number) -> +dorado.Entity"
						},
						"getItemById": {
							"!type": "fn(itemId: string) -> +dorado.Entity"
						},
						"getItemIndex": {
							"!type": "fn(item: +dorado.Entity) -> number"
						},
						"sort": {
							"!type": "fn(sortParams: ?, comparator: fn())"
						},
						"filter": {
							"!type": "fn(filterParams: [?], customFilter?: fn())"
						},
						"toArray": {
							"!type": "fn() -> [?]"
						}
					}
				},
				"RowRenderer": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.grid.DefaultRowRenderer" ],
					"prototype": {
						"!proto": "dorado.widget.grid.DefaultRowRenderer.prototype"
					}
				},
				"TreeColumnCellEditor": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.grid.DefaultCellEditor" ],
					"prototype": {
						"!proto": "dorado.widget.grid.DefaultCellEditor.prototype"
					}
				},
				"TreeColumnCellRenderer": {
					"!type": "fn()",
					"!extends": [ "dorado.widget.grid.DefaultCellRenderer", "dorado.widget.tree.TreeNodeRenderer" ],
					"prototype": {
						"doRender": { },
						"render": {
							"!type": "fn(dom: +Node, arg: ?)"
						}
					}
				}
			},
			"Trigger": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Component" ],
				"!events": {
					"beforeExecute": {
						"!arg": {
							"editor": {
								"!type": "+dorado.widget.AbstractTextEditor"
							},
							"processDefault": {
								"!type": "bool"
							}
						}
					},
					"onExecute": {
						"!arg": {
							"editor": {
								"!type": "+dorado.widget.AbstractTextEditor"
							}
						}
					}
				},
				"prototype": {
					"!proto": "dorado.widget.Component.prototype",
					"createTriggerButton": {
						"!type": "fn(editor: +dorado.widget.AbstractTextEditor) -> +dorado.widget.Control"
					},
					"execute": {
						"!type": "fn(editor: +dorado.widget.AbstractTextEditor)"
					}
				}
			},
			"UpdateAction": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Action" ],
				"!events": {
					"beforeUpdate": {
						"!arg": {
							"dataItems": {
								"!type": "[?]"
							},
							"parameter": { },
							"processDefault": {
								"!type": "bool"
							}
						}
					},
					"onUpdate": {
						"!arg": {
							"dataItems": { },
							"parameter": { }
						}
					},
					"onGetUpdateData": {
						"!arg": {
							"updateItem": { },
							"data": { }
						}
					}
				},
				"prototype": {
					"!proto": "dorado.widget.Action.prototype"
				}
			},
			"VerticalTabControl": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.TabColumn" ],
				"prototype": {
					"!proto": "dorado.widget.TabColumn.prototype"
				}
			},
			"View": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Container" ],
				"TOP": {
					"!type": "+dorado.widget.View"
				},
				"waitFor": {
					"!type": "fn(tasks: [+dorado.widget.DataSet], callback: dorado.Callback)"
				},
				"!events": {
					"onDataLoaded": {
						"!arg": { }
					},
					"onComponentRegistered": {
						"!arg": {
							"component": {
								"!type": "+dorado.widget.Component"
							}
						}
					},
					"onComponentUnregistered": {
						"!arg": {
							"component": {
								"!type": "+dorado.widget.Component"
							}
						}
					}
				},
				"prototype": {
					"!proto": "dorado.widget.Container.prototype",
					"id": {
						"!type": "fn(id: string) -> +dorado.widget.Component"
					},
					"tag": {
						"!type": "fn(tags: string) -> +dorado.ObjectGroup"
					},
					"getDataType": {
						"!type": "fn(name: string) -> +dorado.DataType"
					},
					"getDataTypeAsync": {
						"!type": "fn(name: string, callback: dorado.Callback)"
					},
					"bind": {
						"!type": "fn(expression: string, listener: fn(), options?: ?)"
					}
				}
			},
			"ViewPortList": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.AbstractList" ],
				"prototype": {
					"!proto": "dorado.widget.AbstractList.prototype",
					"getCurrentItem": {
						"!type": "fn() -> +dorado.Entity"
					}
				}
			},
			"YearMonthDropDown": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.DropDown" ],
				"prototype": {
					"!proto": "dorado.widget.DropDown.prototype"
				}
			},
			"YearMonthPicker": {
				"!type": "fn()",
				"!extends": [ "dorado.widget.Control" ],
				"!events": {
					"onPick": {
						"!arg": { }
					},
					"onCancel": {
						"!arg": { }
					}
				},
				"prototype": {
					"!proto": "dorado.widget.Control.prototype",
					"updateDate": {
						"!type": "fn(date: ?, month: ?)"
					}
				}
			}
		}
	},
	"jQuery": {
		"shadow": {
			"!type": "fn(options?: ?) -> jQuery.fn"
		},
		"unshadow": {
			"!type": "fn() -> jQuery.fn"
		},
		"left": {
			"!type": "fn(val?: string) -> number"
		},
		"top": {
			"!type": "fn(val?: string) -> number"
		},
		"right": {
			"!type": "fn(val?: string) -> number"
		},
		"bottom": {
			"!type": "fn(val?: string) -> number"
		},
		"position": {
			"!type": "fn(left?: string, top?: string) -> ?"
		},
		"outerWidth": {
			"!type": "fn(width?: string) -> number"
		},
		"outerHeight": {
			"!type": "fn(height?: string) -> number"
		},
		"bringToFront": {
			"!type": "fn() -> jQuery.fn"
		},
		"addClassOnHover": {
			"!type": "fn(cls: string, clsOwner?: jQuery.fn, fn?: fn()) -> jQuery.fn"
		},
		"addClassOnFocus": {
			"!type": "fn(cls: string, clsOwner?: jQuery.fn, fn?: fn()) -> jQuery.fn"
		},
		"addClassOnClick": {
			"!type": "fn(cls: string, clsOwner?: jQuery.fn, fn?: fn()) -> jQuery.fn"
		},
		"repeatOnClick": {
			"!type": "fn(fn: fn(), interval: number) -> jQuery.fn"
		},
		"fullWindow": {
			"!type": "fn() -> jQuery.fn"
		},
		"unfullWindow": {
			"!type": "fn() -> jQuery.fn"
		},
		"hashchange": {
			"!type": "fn(fn: fn()) -> jQuery.fn"
		},
		"xCreate": {
			"!type": "fn(template: ?, arg?: ?, options?: ?) -> jQuery.fn"
		},
		"slideIn": {
			"!type": "fn(options: ?) -> jQuery.fn"
		},
		"slideOut": {
			"!type": "fn(options: ?) -> jQuery.fn"
		},
		"safeSlideIn": {
			"!type": "fn(options: ?) -> jQuery.fn"
		},
		"safeSlideOut": {
			"!type": "fn(options: ?) -> jQuery.fn"
		},
		"draggable": {
			"!type": "fn(options: ?) -> jQuery.fn"
		},
		"droppable": {
			"!type": "fn(options: ?) -> jQuery.fn"
		}
	}
};

