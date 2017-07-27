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
				
				rootView: "storm.view.Homepage.Homepage",
					routing: {
						config: {
							targetsClass: "sap.m.routing.Targets",
							viewPath: "storm.view",
							controlId: "appHome",
							controlAggregation: "pages",
							viewType: "XML"
						},
						targets: {
							home: {
								viewName: "Homepage.Homepage",
								viewLevel: 0
							},
							userUi: {
								viewName: "UserUI.App",
								viewLevel: 1
							},
							registration: {
								viewName: "Registrationpage.Registration",
								viewLevel: 1
							}
						}
					}
			},

				
			init: function (){
				UIComponent.prototype.init.apply(this, arguments);
				this.getTargets().display("home");				
			}
		});
	});