sap.ui.define(['sap/m/MessageToast', 'sap/ui/core/mvc/Controller', 'sap/ui/model/json/JSONModel', 'jquery.sap.global', 'jquery.sap.script'],
	function(MessageToast, Controller, JSONModel, jQuery, jQuerySapScript) {
		"use strict";

		return Controller.extend("storm.controller.registration", {


			onInit: function(oEvent) {
			
			},

			onValidateFieldGroup: function(oEvt) {
				//currently there is no actual validation triggered
				var aFieldGroup = oEvt.getParameters().fieldGroupIds,
					sMessage = "Group '" + aFieldGroup[0] + "' Validation:",
					sType = this.mMessageMapping[aFieldGroup[0]].type,
					sMessageId = this.mMessageMapping[aFieldGroup[0]].id;

				//display a sample message
				this.getView().byId(sMessageId).setType(sType).setText(sMessage + sType).setVisible(true);
				//deliver toast
				MessageToast.show("Validation of field group '" + aFieldGroup[0] + "' triggered.", {
					duration: 500
				});
			},
			onMsgStripClose: function(oEvt) {
				oEvt.oSource.setVisible(false);
			},
			onAccept: function() {
				this.hideMessages();
				//deliver toast
				MessageToast.show("Accept triggered", {
					duration: 500
				});
			},
			onCancel: function() {
				this.hideMessages();
				//deliver toast
				MessageToast.show("Cancel triggered", {
					duration: 500
				});
			},
			onReset: function() {
				this.hideMessages();
				this.getView().getModel().setData({});
				//deliver toast
				MessageToast.show("Reset triggered", {
					duration: 500
				});
			},
			hideMessages: function() {
				for (var n in this.mMessageMapping) {
					this.getView().byId(this.mMessageMapping[n].id).setVisible(false);
				}
			},
			
			handleSelectionChange: function(oEvent) {
			var changedItem = oEvent.getParameter("changedItem");
			var isSelected = oEvent.getParameter("selected");
 
			var state = "Selected";
			if (!isSelected) {
				state = "Deselected";
			}
 
			MessageToast.show("Event 'selectionChange': " + state + " '" + changedItem.getText() + "'", {
				width: "auto"
			});
		},
 
		handleSelectionFinish: function(oEvent) {
			var selectedItems = oEvent.getParameter("selectedItems");
			var messageText = "Event 'selectionFinished': [";
 
			for (var i = 0; i < selectedItems.length; i++) {
				messageText += "'" + selectedItems[i].getText() + "'";
				if (i != selectedItems.length-1) {
					messageText += ",";
				}
			}
 
			messageText += "]";
 
			MessageToast.show(messageText, {
				width: "auto"
			});
		}

		});
	});