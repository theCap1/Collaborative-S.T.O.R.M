sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/ui/model/json/JSONModel",
		"sap/m/MessageToast",
		"jquery.sap.global",
		"sap/ui/core/mvc/Controller",
		"sap/ui/model/json/JSONModel",
		"./CustomerFormat",
		"./InitPage"
	],

	function(Controller, JSONModel, Toast, jQuery, CustomerFormat, InitPageUtil) {
		"use strict";

		return Controller.extend("storm.controller.CustomerUI.App", {
			
			afterRender: function() {}
		});

	});