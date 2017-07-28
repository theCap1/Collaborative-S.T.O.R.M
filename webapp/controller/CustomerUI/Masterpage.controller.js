sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/Fragment',
	'sap/ui/core/mvc/Controller',
	"sap/ui/core/mvc/View",
	'sap/ui/model/json/JSONModel'
], function(jQuery, Fragment, Controller, JSONModel) {
	"use strict";

	return Controller.extend("storm.controller.CustomerUI.Masterpage", {

		_mData: null,
		_oModel: null,
		onInit: function(oEvent) {},
		
		handleDashboardPress: function(){
			
			var item=this.getView().byId("DashboardNav");
			var expanded=item.getExpanded();
			
			if (expanded){
				item.setExpanded(false); 
			}else{
				item.setExpanded(true); 
			}
		},

		handleDashboardConfigPress: function() {
			this._changeView("pie");
		},

		handleDashboard2ConfigPress: function() {
			this._changeView("Bar");
		},

		handleDashboard3ConfigPress: function() {
			this._changeView("Line");
		},

		handleCDetailsPress: function() {
			this._changeView("CDetails");
		},

		handleManagePress: function() {
			this._changeView("Manage");
			$.ajax({
				url: "php/RetrieveAds.php"
			});

		},

		handleContactUsPress: function() {
			this._changeView("ContactUs");
		},

		_changeView: function(sViewName) {
			var oDetailPage = this.getView().getParent().getParent().getParent().getCurrentDetailPage();

			oDetailPage.removeAllContent();

			var oView = sap.ui.view({ /*id:sViewName, */
				viewName: "storm.view.CustomerUI." + sViewName,
				type: sap.ui.core.mvc.ViewType.XML
			});

			oDetailPage.insertContent(oView);
		}
	});
});