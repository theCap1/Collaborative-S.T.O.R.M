sap.ui.define([
		'jquery.sap.global',
		'sap/ui/core/Fragment',
		'sap/ui/core/mvc/Controller',
		"sap/ui/core/mvc/View",
		'sap/ui/model/json/JSONModel'
	], function(jQuery, Fragment, Controller) {
	"use strict";
 
	return Controller.extend("storm.controller.UserUI.Masterpage", {
 
		onInit: function () {
		},
		
		handleHomePress: function () {
			this._changeView("Home");
		},
		
		handleRewardsPress: function(){
			
			var item=this.getView().byId("rewards");
			var expanded=item.getExpanded();
			
			if (expanded){
				item.setExpanded(false); 
			}else{
				item.setExpanded(true); 
			}
		},
 
		handleRedeemPress : function () {
			this._changeView("RedeemCurrency"); 
		},
		
		handleVouchersPress : function () {
			this._changeView("Vouchers");	
		},
 
		handleAccountPress : function () {
			this._changeView("PersonalInfo"); 
		},
		
		_changeView: function (sViewName){
			var oDetailPage = this.getView().getParent().getParent().getParent().getCurrentDetailPage();
			
			oDetailPage.removeAllContent();
			
			var oView = sap.ui.view({/*id:sViewName, */viewName:"storm.view.UserUI." + sViewName, type:sap.ui.core.mvc.ViewType.XML});
			
			oDetailPage.insertContent(oView);
		}
	});
});