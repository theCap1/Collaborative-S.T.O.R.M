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
						email: sap.ui.getCore().getModel("data").getProperty("/data/0/email")
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
				window.open('https://de.wikipedia.org/wiki/RFID','_blank');
			},
			tilePress:function(){
				var oDetailPage = this.getView().getParent().getParent().getParent().getCurrentDetailPage();
			
			oDetailPage.removeAllContent();
			
			var oView = sap.ui.view({viewName:"storm.view.UserUI.RedeemCurrency", type:sap.ui.core.mvc.ViewType.XML});
			
			oDetailPage.insertContent(oView);
			}
		});
	});