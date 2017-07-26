sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("ShopScreenStormShopScreen.controller.RFID_Reader", {
		
		onInit: function() {
			$.ajax({
					url:"php/getShops.php",
					type:"GET",
					context: this,
					success: function handleSuccess(response){
						var oModel = new JSONModel();
						oModel.setJSON(response);
						sap.ui.getCore().setModel(oModel,"shopModel");
						this.getView().byId("comboShops").setModel(sap.ui.getCore().getModel("shopModel"));
					},
					error:function handleError(){
					}
			});
			$.ajax({
					url:"php/getUsers.php",
					type:"GET",
					context: this,
					success: function handleSuccess(response){
						var oModel = new JSONModel();
						oModel.setJSON(response);
						sap.ui.getCore().setModel(oModel,"userModel");
						this.getView().byId("comboUser").setModel(sap.ui.getCore().getModel("userModel"));
					},
					error:function handleError(){
					}
			});
		},
		onSimulate: function() {
			if (window.user === "") {
				window.user = this.getView().byId("comboUser").getSelectedKey();
				window.shop = this.getView().byId("comboShops").getSelectedKey();
				this.getOwnerComponent().getTargets().display("shop");
			}else {
				window.user = this.getView().byId("comboUser").getSelectedKey();
				window.shop = this.getView().byId("comboShops").getSelectedKey();
				$.ajax({
						url:"php/getDemoAd.php",
						type:"GET",
						data: {
								"email": window.user,
								"shop": window.shop
							},
						context: this,
						success: function handleSuccess(response){
							if (response.startsWith("<?php")) {
								window.oImg.setSrc("https://img.grouponcdn.com/coupons/svWS786jtP7X3Y2JHsBTRQ/walmart_com-500x500");
							}else {
								window.oImg.setSrc("data:image/bmp;base64," + response);
							}
						},
						error:function handleError(){
						}
				});
				this.getOwnerComponent().getTargets().display("shop");
			}
		}
	});
});