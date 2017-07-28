sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/Fragment',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/m/MessageToast'
], function(jQuery, Fragment, Controller, JSONModel, MessageToast) {
	"use strict";
 
	var CController = Controller.extend("storm.controller.UserUI.ContactUs", {
 
		_mData : null,
		_oModel : null,
		onInit: function() {
			//	create JSON model instance
			this._oModel = new JSONModel();
 
			// JSON sample data
			var mData = {
				pages: [
					{
						pageId: "companyPageId",
						header: "Company info",
						title: "S.T.O.R.M Advertising",
						icon: "sap-icon://building",
						groups: [
							{
								heading: "Contact Details",
								elements: [
									{
										label: "Phone",
										value: "+001 6101 34869-0",
										elementType: sap.m.QuickViewGroupElementType.phone
									},
									{
										label: "Address",
										value: "Coblitzallee 1-9, 68163 Mannheim",
										elementType: sap.m.QuickViewGroupElementType.text
									}
								]
							},
							{
								heading: "Main Contact",
								elements: [
									{
										label: "Name",
										value: "Tim Clifford",
										elementType: sap.m.QuickViewGroupElementType.pageLink,
										pageLinkId: "companyEmployeePageId"
									},
									{
										label: "Mobile",
										value: "+001 6101 34869-0",
										elementType: sap.m.QuickViewGroupElementType.mobile
									},
									{
										label: "Phone",
										value: "+001 6101 34869-0",
										elementType: sap.m.QuickViewGroupElementType.phone
									},
									{
										label: "Email",
										value: "storm@advertising.de",
										emailSubject : 'Customer Feedback' ,
										elementType: sap.m.QuickViewGroupElementType.email
									}
								]
							}
						]
					},
					{
						pageId: "companyEmployeePageId",
						header: "Employee Info",
						title: "Tim Clifford",
						icon: "sap-icon://person-placeholder",
						description: "Chief Financial Officer",
						groups: [
							{
								heading: "Company",
								elements: [
									{
										label: "Name",
										value: "S.T.O.R.M. Advertising",
										elementType: sap.m.QuickViewGroupElementType.link
									},
									{
										label: "Address",
										value: "Coblitzallee 1-9, 68163 Mannheim"
									},
									{
										label: "Slogan",
										value: "Innovation through technology"
									}
								]
							},
							{
								heading: "Other",
								elements: [
									{
										label: "Email",
										value: "tim.clifford@storm.de",
										emailSubject : 'contact us',
										elementType: sap.m.QuickViewGroupElementType.email
									},
									{
										label: "Phone",
										value: "+359 888 888 888",
										elementType: sap.m.QuickViewGroupElementType.mobile
									}
								]
							}
						]
					}
				]
			};
 
			this._mData = mData;
 
			// set the data for the model
			this._oModel.setData(this._mData);
			this.getView().setModel(this._oModel);
		},
 
 
		onAfterRendering: function() {
			this.getView().byId("quickViewCardContainer").$().css("maxWidth", "320px");
		}
 
	});
 
 
 
	return CController;
 
});