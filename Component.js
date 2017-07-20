sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel"
	],
	function(UIComponent, JSONModel) {
		"use strict";

		return UIComponent.extend("storm.Component", {

			metadata: {
				manifest: "json",
				includes: [ "css/style.css" ],
				config: {
					sample: {
						stretch: true,
						files: [
							"App.view.xml",
							"App.controller.js"
						]
					}
				},
				init: function (){
					UIComponent.prototype.init.apply(this, arguments);
					
					this.getRouter().initialize();
					
				}
			}
		});

	});