sap.ui.define([
		'jquery.sap.global',
		'sap/ui/core/Fragment',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel'
	], function(jQuery, Fragment, Controller, JSONModel) {
	"use strict";
 
	return Controller.extend("storm.controller.UserUI.Vouchers", {
 
		onInit: function (oEvent) {
			
			var oModel = new JSONModel();
			oModel.loadData("model/Vouchers.json");
			this.getView().setModel(oModel);
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
		}
	});
});