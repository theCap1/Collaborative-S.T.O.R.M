sap.ui.define([
	'jquery.sap.global',
	"sap/ui/core/mvc/Controller",
	'sap/m/Popover',
	'sap/m/Button',
	"sap/ui/model/json/JSONModel",
	'sap/m/MessageToast'
], function(jQuery, Controller, Popover, Button, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("storm.controller.Homepage.Homepage", {

		onInit: function() {
			var data = {
				data: [

					{
						email: ""
					}

				]
			};

			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(data);
			sap.ui.getCore().setModel(oModel, "data");
		},

		handleRegister: function(cEventCustomer) {
			this.getOwnerComponent().getTargets().display("registration");
		},

		handleCustomerPopoverPress: function(cEventCustomer) {

			// create popover
			if (!this._cPopover) {
				this._cPopover = sap.ui.xmlfragment("storm.fragments.Homepage.PopoverCustomer", this);
				this.getView().addDependent(this._cPopover);
			}

			// delay because addDependent will do a async rerendering and the actionSheet will immediately close without it.
			var cButton = cEventCustomer.getSource();
			jQuery.sap.delayedCall(0, this, function() {
				this._cPopover.openBy(cButton);
			});
		},

		handleCustomerLoginPress: function(cEventCustomer) {
			var sCustomerEmail = this._cPopover.getContent()[1]._lastValue;
			var sCustomerPassword = this._cPopover.getContent()[3]._lastValue;
			var oOwnerComponent = this.getOwnerComponent();

			$.ajax({
				url: "php/Customer/getCustomerLogin.php",
				data: {
					"email": sCustomerEmail,
					"password": sCustomerPassword
				},
				type: "GET",
				success: function(response) {
					if (response == "success") {
						sap.ui.getCore().getModel("data").setProperty("/data/0/email", sCustomerEmail);
						oOwnerComponent.getTargets().display("customerUi");
					} else {
						MessageToast.show("Email or Password is incorrect");
					}
				},
				error: function(xhr) {

				}
			});
			this._cPopover.destroy();
			this._cPopover = null;
		},

		PopoverClose: function() {},

		handleUserPopoverPress: function(uEventUser) {

			// create popover
			if (!this._uPopover) {
				this._uPopover = sap.ui.xmlfragment("storm.fragments.Homepage.PopoverUser", this);
				this.getView().addDependent(this._uPopover);
			}

			// delay because addDependent will do a async rerendering and the actionSheet will immediately close without it.
			var uButton = uEventUser.getSource();
			jQuery.sap.delayedCall(0, this, function() {
				this._uPopover.openBy(uButton);
			});
		},

		handleUserLoginPress: function(uEventUser) {
			var sUserEmail = this._uPopover.getContent()[1]._lastValue;
			var sUserPassword = this._uPopover.getContent()[3]._lastValue;
			var oOwnerComponent = this.getOwnerComponent();

			$.ajax({
				url: "php/User/getUserLogin.php",
				data: {
					"email": sUserEmail,
					"password": sUserPassword
				},
				type: "GET",
				success: function(response) {
					if (response == "success") {
						if (sap.ui.getCore().getModel("data").getProperty("/data/0/email") === "") {
							sap.ui.getCore().getModel("data").setProperty("/data/0/email", sUserEmail);
						} else {
							sap.ui.getCore().getModel("data").setProperty("/data/0/email", sUserEmail);
						}
						oOwnerComponent.getTargets().display("userUi");
					} else {
						MessageToast.show("Email or Password is incorrect");
					}
				},
				error: function(xhr) {

				}
			});

			this._uPopover.destroy();
			this._uPopover = null;
		}
	});

});