sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("ShopScreenStormShopScreen.controller.ShopScreen", {
		
		onInit: function() {
			window.oImg = this.byId("img");
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
		},
		onBack: function() {
			this.getOwnerComponent().getTargets().display("reader");
			this.getView().removeContent();
		}
	});
});