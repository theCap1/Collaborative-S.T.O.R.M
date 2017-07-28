sap.ui.define([
	'sap/m/Button',
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	'sap/m/Dialog',
	'sap/m/Text',
	'sap/m/MessageToast'
	],

	function(Button, Controller, JSONModel, Dialog, Text, MessageToast) {
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
			
			voucherPress : function (oEvent) {
				var oView = this.getView();
				var oModel = oView.getModel();
				
				var sVoucherTitle = oEvent.getSource().getParent().getParent().mAggregations.headerToolbar.mAggregations.content[0].mProperties.text;
				var sVoucherDescription = sVoucherTitle.split(" | ")[0];
				var sVoucherPrice = sVoucherTitle.split(" | ")[1];
				var sVoucherName;
				var vouchersCount = oModel.getProperty("/voucher").length;
				for (var i = 0; i < vouchersCount; i++) { 
					var sDescriptionText=oModel.getProperty("/voucher/" + i + "/description");
					if(sDescriptionText === sVoucherDescription){
						sVoucherName = oModel.getProperty("/voucher/" + i + "/name");
					}
				}
						
				var oDialog = new Dialog({
				title: "Confirm",
				type: "Message",
				content: new Text({ text: "Are you sure you want to pay " + sVoucherPrice + " Credits for this " + sVoucherDescription + "?" }),
				beginButton: new Button({
					text: "Confirm",
					press: function () {
						$.ajax({
							url:"php/User/setVoucherUserConnection.php",
							type:"POST",
							data: {
								voucher_name: sVoucherName,
								user_email: sap.ui.getCore().getModel("data").getProperty("/data/0/email")
							},
							context: this,
							success: function handleSuccess(response){
								if (response === "success"){
									MessageToast.show("Congratulations! The voucher was added to your voucher list. :)");
									oView.byId("accBalance").setText(oView.byId("accBalance").getText()-sVoucherPrice);
								}else{
									MessageToast.show("Ups, it seems like you don't have enough credits for this voucher. :(");
								}
							},
							error:function handleError(){
							}
						});
						oDialog.close();
					}
				}),
				endButton: new Button({
					text: "Cancel",
					press: function () {
						oDialog.close();
					}
				}),
				afterClose: function() {
					oDialog.destroy();
				}
			});
 
			oDialog.open();
			}
		});
	});