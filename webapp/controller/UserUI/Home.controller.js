sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
	],

	function(Controller, JSONModel, Toast) {
		"use strict";

		return Controller.extend("storm.controller.UserUI.Home", {
			rfidPress : function () {
				// show a native JavaScript alert
				window.open('https://de.wikipedia.org/wiki/RFID','_blank');
			}
		});
	});