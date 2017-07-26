sap.ui.define([
		'jquery.sap.global',
		'sap/ui/core/Fragment',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel'
	], function(jQuery, Fragment, Controller, JSONModel) {
	"use strict";
 
	return Controller.extend("storm.controller.UserUI.PersonalInfo", {
		
		onInit: function (oEvent) {
 
			// set explored app's demo model on this sample - Comment
			//var oModel = new JSONModel(jQuery.sap.getModulePath("storm", "/supplier.json"));
			//this.getView().setModel(oModel);
 
			//this.getView().bindElement("/SupplierCollection/0");
 
			// Set the initial form to be the display one
			this._showFormFragment("DisplayPersonalInfo");
			//var fragment = this.getView().createId("displayFragment");
			//var tab = sap.ui.core.Fragment.byId(fragment, "streetText");
		
			$.ajax({
				url:"php/User/getUserInformation.php",
				type:"GET",
				context: this,
				data: {
					email: "bla@bla.de"
				},
				success: function handleSuccess(response){
					var oModel = new JSONModel();
					oModel.setJSON(response);
					this.getView().setModel(oModel);
					
					
					var addressString=oModel.getProperty("/user/0/address");
					var addressArray=addressString.split("§");
					this.getView().byId("streetText").setText(addressArray[0]);
					this.getView().byId("numberText").setText(addressArray[1]);
					this.getView().byId("zipText").setText(addressArray[2]);
					this.getView().byId("cityText").setText(addressArray[3]);
					this.getView().byId("stateText").setText(addressArray[4]);
					
					var interestsCount = oModel.getProperty("/user/0/interest categories").length; 
					var interestsString="";
						for (var i = 0; i < interestsCount; i++) { 
							var interest = oModel.getProperty("/user/0/interest categories/" + i + "/name");
							if (i !== interestsCount-1){
								interestsString=interestsString + interest + ", ";
							}else{
								interestsString=interestsString + interest;
							}
						}
					this.getView().byId("interestsString").setText(interestsString);
				},
				error:function handleError(){
				}
			});
		},
 
		onExit : function () {
			for(var sPropertyName in this._formFragments) {
				if(!this._formFragments.hasOwnProperty(sPropertyName)) {
					return;
				}
 
				this._formFragments[sPropertyName].destroy();
				this._formFragments[sPropertyName] = null;
			}
		},
 
		handleEditPress : function () {
 
			//Clone the data - Comment
			//this._oSupplier = jQuery.extend({}, this.getView().getModel().getData().SupplierCollection[0]);
			this._toggleButtonsAndView(true);
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
			
			$.ajax({
				url:"php/User/getUserInformation.php",
				type:"GET",
				context: this,
				data: {
					email: "bla@bla.de"
				},
				success: function handleSuccess(response){
					var oModel = new JSONModel();
					oModel.setJSON(response);
					
					var interests=[];
					var userInterestsCount=oModel.getProperty("/user/0/interest categories").length;
						for (var i = 0; i < userInterestsCount; i++) { 
							var interestKey = oModel.getProperty("/user/0/interest categories/" + i + "/name");
							interests[i]=interestKey;
						}
					this.getView().byId("comboBreaker").addSelectedKeys(interests);
					
					var genderText = oModel.getProperty("/user/0/gender");
					if(genderText==="Female"){
						this.getView().byId("radioButtons").setSelectedButton(this.getView().byId(genderText));
					}else if(genderText==="Male"){
						this.getView().byId("radioButtons").setSelectedButton(this.getView().byId(genderText));
					}else{
						this.getView().byId("radioButtons").setSelectedButton(this.getView().byId(genderText));
					}
				},
				error:function handleError(){
				}
			});
		},
 
		handleCancelPress : function () {
 
			//Restore the data
			//var oModel = this.getView().getModel();
			//var oData = oModel.getData();
 
			////oData.SupplierCollection[0] = this._oSupplier;
 
			//oModel.setData(oData);
			// set explored app's demo model on this sample
			//var oModel = new JSONModel(jQuery.sap.getModulePath("sap.ui.demo.mock", "/supplier.json"));
			//this.getView().setModel(oModel);
 
			//this.getView().bindElement("/SupplierCollection/0");
 
			// Set the initial form to be the display one
			this._toggleButtonsAndView(false);
		},
 
		handleSavePress : function () {
 
			this._toggleButtonsAndView(false);
 
		},
 
		_formFragments: {},
 
		_toggleButtonsAndView : function (bEdit) {
			var oView = this.getView();
 
			// Show the appropriate action buttons
			oView.byId("edit").setVisible(!bEdit);
			oView.byId("save").setVisible(bEdit);
			oView.byId("cancel").setVisible(bEdit);
 
			// Set the right form type
			this._showFormFragment(bEdit ? "ChangePersonalInfo" : "DisplayPersonalInfo");
		},
 
		_getFormFragment: function (sFragmentName) {
			var oFormFragment = this._formFragments[sFragmentName];
 
			if (oFormFragment) {
				return oFormFragment;
			}
 
			oFormFragment = sap.ui.xmlfragment(this.getView().getId(), "storm.fragments.UserUI." + sFragmentName);
 
			return this._formFragments[sFragmentName] = oFormFragment;
		},
 
		_showFormFragment : function (sFragmentName) {
			var oPage = this.getView().byId("page");
 
			oPage.removeAllContent();
			oPage.insertContent(this._getFormFragment(sFragmentName));
		},
 
		handleChange: function (oEvent) {
			var oDP = oEvent.oSource;
			var bValid = oEvent.getParameter("valid");
			this._iEvent++;
 
			if (bValid) {
				oDP.setValueState(sap.ui.core.ValueState.None);
			} else {
				oDP.setValueState(sap.ui.core.ValueState.Error);
			}
		}
 
	});
 
 
});