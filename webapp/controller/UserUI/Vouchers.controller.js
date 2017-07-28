sap.ui.define([
		'sap/m/Button',
		'jquery.sap.global',
		'sap/ui/core/Fragment',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel',
		'sap/m/Dialog',
		'sap/m/Text'
	], function(Button, jQuery, Fragment, Controller, JSONModel, Dialog, Text) {
	"use strict";
 
	return Controller.extend("storm.controller.UserUI.Vouchers", {
 
		onInit: function () {
				$.ajax({
					url:"php/User/getUserVoucher.php",
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
		
		handleEditPress:function(){
			var list = this.getView().byId("list");
			list.setMode("MultiSelect");
			
			var delButton = this.getView().byId("remove");
			delButton.setVisible(true);
			var editButton = this.getView().byId("edit");
			editButton.setVisible(false);
			var doneButton = this.getView().byId("done");
			doneButton.setVisible(true);
		},
		
		handleDonePress:function(){
			var list = this.getView().byId("list");
			list.setMode("None");
			
			var remButton = this.getView().byId("remove");
			remButton.setVisible(false);
			var editButton = this.getView().byId("edit");
			editButton.setVisible(true);
			var doneButton = this.getView().byId("done");
			doneButton.setVisible(false);
		},
		
		handleRemovePress:function(){
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