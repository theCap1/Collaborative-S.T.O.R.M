sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/m/Popover',
	'sap/m/Button',
	'sap/ui/model/json/JSONModel',
	'sap/m/Dialog'
], function(jQuery, Controller, Popover, Button, JSONModel, Dialog) {
	"use strict";

	return Controller.extend("storm.controller.CustomerUI.AdEdit", {

		onInit: function () {
			this.getView().byId("adNameInput").setValue(sap.ui.getCore().getModel("data").getProperty("/data/0/ad"));
			
			var aInterests;
			var iAddNum;
			
			$.ajax({
				url:"php/general/getInterests.php",
				type:"GET",
				context: this,
				success: function handleSuccess(response){
					var oModel = new JSONModel();
					oModel.setJSON(response);
					sap.ui.getCore().setModel(oModel,"secondModel");
					this.getView().byId("comboBreaker").setModel(sap.ui.getCore().getModel("secondModel"));
				},
				error:function handleError(){
				}
			});
			
			var oModel = new JSONModel();
			$.ajax({
				url:"php/Customer/getAdsforCustomer.php",
				type:"GET",
				context: this,
				data: {
					email: sap.ui.getCore().getModel("data").getProperty("/data/0/email")
				},
				success: function handleSuccess(response){
					oModel.setJSON(response);
					this.getView().setModel(oModel);
			
					var adsCount = oModel.getProperty("/ad").length;
					for (var i = 0; i < adsCount; i++) { 
						var sAdNameText=oModel.getProperty("/ad/" + i + "/name");
						if(sAdNameText === sap.ui.getCore().getModel("data").getProperty("/data/0/ad")){
							aInterests = oModel.getProperty("/ad/" + i + "/interests categories");
							iAddNum = i;
						}
					}
					
					var interests=[];
					var userInterestsCount=oModel.getProperty("/ad/" + iAddNum + "/interest categories").length;
						for (var i = 0; i < userInterestsCount; i++) { 
							var interestKey = oModel.getProperty("/ad/" + iAddNum + "/interest categories/" + i + "/id");
							interests[i]=interestKey;
						}
					this.getView().byId("comboBreaker").addSelectedKeys(interests);
				},
				error:function handleError(){
				}
			});
		},
		
		handleCancelPress:function(){
			var oDetailPage = this.getView().getParent().getParent().getParent().getCurrentDetailPage();
			
			oDetailPage.removeAllContent();
			
			var oView = sap.ui.view({viewName:"storm.view.CustomerUI.Manage", type:sap.ui.core.mvc.ViewType.XML});
			
			oDetailPage.insertContent(oView);
		},
		
		handleSavePress:function(){
			var list = this.getView().byId("list");
			var aToBeDeleted = list.getSelectedItems();
			var sVoucherCode;
			
			if(aToBeDeleted.length !== 0){
				var oDialog = new Dialog({
					title: "Warning",
					type: "Message",
					state: "Warning",
					content: new Text({ text: "Are you sure you want to remove these vouchers from your list? You will not be able to access them afterwards." }),
					beginButton: new Button({
						text: "Remove",
						press: function () {
							for (var i = 0; i < aToBeDeleted.length; i++) { 
								sVoucherCode = aToBeDeleted[i].getProperty("description");
								$.ajax({
									url:"php/User/deleteUserVoucher.php",
									type:"GET",
									context: this,
									data: {
										voucher_code: sVoucherCode
									},
									success: function handleSuccess(){
									},
									error:function handleError(){
									}
								});
								list.removeItem(aToBeDeleted[i]);
							}
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
			this.handleDonePress();
		}

	});

});