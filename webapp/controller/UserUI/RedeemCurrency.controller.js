sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
	],

	function(Controller, JSONModel, Toast) {
		"use strict";

		return Controller.extend("storm.controller.UserUI.RedeemCurrency", {
			onInit : function(){
				var oModel = new JSONModel();
				$.ajax({
					url:"php/User/getUserInformation.php",
					type:"GET",
					context: this,
					data: {
						email: sap.ui.getCore().getModel("data").getProperty("/data/0/email")
					},
					success: function handleSuccess(response){
						oModel.setJSON(response);
				        var balance = oModel.getProperty("/user/0/internalCurrencyCount");
						this.getView().byId("accBalance").setText(balance);
					},
					error:function handleError(){
					}
				});
				$.ajax({
					url:"php/General/getAllVouchers.php",
					type:"GET",
					context: this,
					success: function handleSuccess(response){
						oModel.setJSON(response);
						this.getView().setModel(oModel);
						var vouchersCount = oModel.getProperty("/voucher").length;
						for (var i = 0; i < vouchersCount; i++) { 
							var voucher_title=this.getView().byId("voucher" + i + "_title");
							var titleText=oModel.getProperty("/voucher/" + i + "/description") + " | " + oModel.getProperty("/voucher/" + i + "/requiredPoints");
							voucher_title.setText(titleText);
							
							var voucher_img=this.getView().byId("voucher" + i + "_img");
							var img_src=oModel.getProperty("/voucher/" + i + "/img");
							voucher_img.setSrc("data:image/bmp;base64," + img_src);
						}
					},
					error:function handleError(){
					}
					
				});
			},
			
			voucherPress : function () {
				// show a native JavaScript alert
				window.open('https://de.wikipedia.org/wiki/RFID','_blank');
			}
		});
	});