sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/m/Popover',
	'sap/m/Button',
	'sap/ui/model/json/JSONModel',
	'sap/m/Dialog'
], function(jQuery, Controller, Popover, Button, JSONModel, Dialog) {
	"use strict";

	return Controller.extend("storm.controller.CustomerUI.Manage", {

		onInit: function () {
				$.ajax({
					url:"php/Customer/getAdsforCustomer.php",
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
		},

		handleEditPopoverPress: function(oEvent) {

			// create popover
			if (!this._oPopover) {
				this._oPopover = sap.ui.xmlfragment("storm.fragments.CustomerUI.addPopover", this);
				this.getView().addDependent(this._oPopover);
				this._oPopover.bindElement("/ProductCollection/0");
			}

			// delay because addDependent will do a async rerendering and the actionSheet will immediately close without it.
			var oButton = oEvent.getSource();
			jQuery.sap.delayedCall(0, this, function() {
				this._oPopover.openBy(oButton);
			});
		}

	});

});