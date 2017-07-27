sap.ui.define([
		'jquery.sap.global',
		'sap/ui/core/Fragment',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel',
		'sap/m/MessageToast'
	], function(jQuery, Fragment, Controller, JSONModel, MessageToast) {
	"use strict";
 
	return Controller.extend("storm.controller.UserUI.ChangePersonalInfo", {
 
		onInit: function () {
 
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
					email: sap.ui.getCore().getModel("data").getProperty("/data/0/email")
				},
				success: function handleSuccess(response){
					var oModel = new JSONModel();
    				oModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
					oModel.setJSON(response);
					this.getView().setModel(oModel);
					
					var addressString=oModel.getProperty("/user/0/address");
					var addressArray=addressString.split("§");
					this.getView().byId("streetInput").setValue(addressArray[0]);
					this.getView().byId("numberInput").setValue(addressArray[1]);
					this.getView().byId("zipInput").setValue(addressArray[2]);
					this.getView().byId("cityInput").setValue(addressArray[3]);
					this.getView().byId("stateInput").setValue(addressArray[4]);
					
					var interests=[];
					var userInterestsCount=oModel.getProperty("/user/0/interest categories").length;
						for (var i = 0; i < userInterestsCount; i++) { 
							var interestKey = oModel.getProperty("/user/0/interest categories/" + i + "/id");
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
			this._changeView("DisplayPersonalInfo");
		},
 
		handleSavePress : function () {
			var sOldEmail = this.getView().getModel().getProperty("/user/0/email");
			var sNewEmail = this.getView().byId("mailInput").getValue();
			var sFirstName = this.getView().byId("firstNameInput").getValue();
			var sLastName = this.getView().byId("lastNameInput").getValue();
			var sPassword = this.getView().byId("currentPasswordInput").getValue();
			var iAccountBalance = this.getView().getModel().getProperty("/user/0/internalCurrencyCount");
			var sGender = this.getView().byId("radioButtons").getSelectedButton().getText();
			
			var dBirthday = this.getView().byId("datePicker").getValue();
			
			var sStreet = this.getView().byId("streetInput").getValue();
			var sNumber = this.getView().byId("numberInput").getValue();
			var sZIP = this.getView().byId("zipInput").getValue();
			var sCity = this.getView().byId("cityInput").getValue();
			var sState = this.getView().byId("stateInput").getValue();
			var sAddress = sStreet + "§" + sNumber + "§" + sZIP + "§" + sCity + "§" + sState;
			
			var aInterests = this.getView().byId("comboBreaker").getEnabledItems();
			var aUserInterests = this.getView().byId("comboBreaker").getSelectedKeys();
			for(var i = 0; i < aInterests.length; i++){
				aInterests[i] = "0";
			}
			for(i = 0; i < aUserInterests.length; i++){
				aInterests[aUserInterests[(i)]-1]="1";
			}
			
			var sNewPassword = this.getView().byId("newPasswordInput").getValue();
			var sRepeatNewPassword = this.getView().byId("repeatNewPasswordInput").getValue();
			if(sNewPassword === "" && sRepeatNewPassword === ""){
				sNewPassword = sPassword;
				sRepeatNewPassword = sPassword;
			}
			
			if(sNewPassword === sRepeatNewPassword){
				if(sNewEmail !== "" && sFirstName !== "" && sLastName !== "" && dBirthday !== "" && sStreet !== "" && sNumber !== "" && sZIP !== "" && sCity !== "" && sState !== ""){
					$.ajax({
						url:"php/User/getUserLogin.php",
						data: {
							email: sOldEmail,
							password: sPassword
						},
						type:"GET",
						context: this,
						success: function handleSuccess(response){
							if (response === "success") {
								$.ajax({
									url:"php/User/updateUser.php",
									data: {
										oldemail: sOldEmail,
										email: sNewEmail,
										firstname: sFirstName,
										lastname: sLastName,
										password: sNewPassword,
										internalCurrencyCount: iAccountBalance,
										gender: sGender,
										birthday: dBirthday,
										address: sAddress
									},
									type:"GET",
									context: this,
									success: function handleSuccess2(response2){
										if(response2==="success"){
											$.ajax({
												url:"php/User/setInterestsUser.php",
												data: {
													email: sNewEmail,
													interests: aInterests
												},
												type:"GET",
												context: this,
												success: function handleSuccess3(){
													MessageToast.show("Your data was successfully updated!");
													this._changeView("DisplayPersonalInfo");
												},
												error:function handleError(){
													MessageToast.show("Ups, something went wrong with the transmission of your interests. Please contact the support. :(");
												}
											});
											sap.ui.getCore().getModel("data").setProperty("/data/0/email",sNewEmail);
										}else{
											MessageToast.show("Sorry, but this mail address is already taken.");
										}
									},
									error:function handleError(){
										MessageToast.show("Ups, something went wrong with the transmission of your data. Please contact the support. :(");
									}
								});
							}else{
								MessageToast.show("Please enter your password to save or press 'Cancel'");
							}
						},
						error:function handleError(){
						}
					});
				}else{
				MessageToast.show("Please fill out all the mandatory fields.");
				}
			}else{
				MessageToast.show("The new password and the repeatition of it do not not match!");
			}
			
 
		},
		
		_changeView: function (sViewName){
			var oDetailPage = this.getView().getParent().getParent().getParent().getCurrentDetailPage();
			
			oDetailPage.removeAllContent();
			
			var oView = sap.ui.view({viewName:"storm.view.UserUI." + sViewName, type:sap.ui.core.mvc.ViewType.XML});
			
			oDetailPage.insertContent(oView);
		},
 
		handleDateChange: function (oEvent) {
			var oDatePicker = oEvent.oSource;
			var bValid = oEvent.getParameter("valid");
			this._iEvent++;
 
			if (bValid) {
				oDatePicker.setValueState(sap.ui.core.ValueState.None);
			} else {
				oDatePicker.setValueState(sap.ui.core.ValueState.Error);
			}
		}
	});
});