sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/m/Popover',
	'sap/m/Button',
	'sap/ui/model/json/JSONModel',
	'sap/m/Dialog',
	'sap/m/MessageToast'
], function(jQuery, Controller, Popover, Button, JSONModel, Dialog, MessageToast) {
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
		
		handleDeletePress: function(){
			var oDetailPage = this.getView().getParent().getParent().getParent().getCurrentDetailPage();
			var oView = sap.ui.view({viewName:"storm.view.CustomerUI.Manage", type:sap.ui.core.mvc.ViewType.XML});
			
				var oDialog = new Dialog({
					title: "Warning",
					type: "Message",
					state: "Warning",
					content: new Text({ text: "Are you sure you want to remove this ad from the database? You won't be able to access it anymore." }),
					beginButton: new Button({
						text: "Remove",
						press: function () {
								$.ajax({
									url:"php/Customer/deleteAd.php",
									type:"GET",
									context: this,
									data: {
										name: sap.ui.getCore().getModel("data").getProperty("/data/0/ad")
									},
									success: function handleSuccess(){
									},
									error:function handleError(){
									}
								});
								//list.removeItem(aToBeDeleted[i]);
							oDialog.close();
							oDetailPage.removeAllContent();
							oDetailPage.insertContent(oView);
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
		},
		
		handleSavePress:function(){
			var sName = this.getView().byId("adNameInput").getValue();
			var aInterests = this.getView().byId("comboBreaker").getEnabledItems();
			var aUserInterests = this.getView().byId("comboBreaker").getSelectedKeys();
			for(var i = 0; i < aInterests.length; i++){
				aInterests[i] = "0";
			}
			for(i = 0; i < aUserInterests.length; i++){
				aInterests[aUserInterests[(i)]-1]="1";
			}
				$.ajax({
					url:"php/Customer/updateAd.php",
					type:"GET",
					context: this,
					data: {
						name: sName,
						oldname: sap.ui.getCore().getModel("data").getProperty("/data/0/ad")
					},
					success: function handleSuccess(){
						$.ajax({
							url:"php/Customer/setInterestsAd.php",
							type:"GET",
							context: this,
							data: {
								interests: aInterests,
								ad_name: sName
							},
							success: function handleSuccess(){
								MessageToast.show("Ad updated successfully!");
							},
							error:function handleError(){
							}
						});
					},
					error:function handleError(){
					}
				});
		}

	});

});