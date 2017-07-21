sap.ui.define([
'jquery.sap.global',
"sap/ui/core/mvc/Controller",
'sap/m/Popover',
'sap/m/Button',
'sap/m/MessageToast'
], function(jQuery, Controller, Popover, Button, MessageToast) {
"use strict";

return Controller.extend("storm.controller.Homepage.Homepage", {
	onInit: function() {
			
	},
	
	handleRegister: function(cEventCustomer) {
		//navigation to registration page
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
		/*var sCustomerEmail = this._cPopover.getContent()[1]._lastValue;
		var sCustomerPassword = this._cPopover.getContent()[3]._lastValue;
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

		$.ajax({
			url: "php/getUserLogin.php",
			data: {
				"email": sCustomerEmail,
				"password": sCustomerPassword
			},
			type: "GET",
			success: function(response) {
				if (response == "success") {
					oRouter.navTo("UserUI");
					MessageToast.show("Successful Customer Login");
				} else {
					MessageToast.show("Email or Password is incorrect");
				}
			},
			error: function(xhr) {

			}
		});
		this._cPopover.destroy();
		this._cPopover = null;*/
		this.getOwnerComponent().getTargets().display("userUi");
	},
	
	PopoverClose: function() {
	},

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

		$.ajax({
			url: "php/getUserLogin.php",
			data: {
				"email": sUserEmail,
				"password": sUserPassword
			},
			type: "GET",
			success: function(response) {
				if (response == "success") {
					MessageToast.show("Successful User Login");
					
				} else {
					MessageToast.show("Email or Password is incorrect");
				}
			},
			error: function(xhr) {

			}
		});

		this._uPopover.destroy();
		this.uPopover = null;
	}
});


});