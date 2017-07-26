sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
	],

	function(Controller, JSONModel, Toast) {
		"use strict";

		return Controller.extend("storm.controller.UserUI.Home", {
			onInit : function(){
				$.ajax({
					url:"php/User/getUserInformation.php",
					type:"GET",
					context: this,
					data: {
						email: "bla@bla.de"
					},
					success: function handleSuccess(response){
						var oModel = new JSONModel();
						oModel.setJSON(response);
						this.getView().setModel(oModel);
					},
					error:function handleError(){
					}
				});
			},
			rfidPress : function () {
				// show a native JavaScript alert
				window.open('https://de.wikipedia.org/wiki/RFID','_blank');
			}
		});
	});