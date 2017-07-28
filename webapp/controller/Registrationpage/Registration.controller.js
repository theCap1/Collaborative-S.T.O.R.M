sap.ui.define(['sap/m/MessageToast', 'sap/ui/core/mvc/Controller', 'sap/ui/model/json/JSONModel', 'jquery.sap.global', 'jquery.sap.script'],
	function(MessageToast, Controller, JSONModel, jQuery, jQuerySapScript) {
		"use strict";

		return Controller.extend("storm.controller.Registrationpage.Registration", {

			onInit: function(oEvent) {
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
			},
			
			onCancel: function() {
				this.getView().byId("mailInput").setValue("");
				this.getView().byId("PasswordInput").setValue("");
				this.getView().byId("repeatPasswordInput").setValue("");
				this.getView().byId("streetInput").setValue("");
				this.getView().byId("numberInput").setValue("");
				this.getView().byId("zipInput").setValue("");
				this.getView().byId("cityInput").setValue("");
				this.getView().byId("stateInput").setValue("");
				this.getView().byId("firstNameInput").setValue("");
				this.getView().byId("lastNameInput").setValue("");
				
				this.getOwnerComponent().getTargets().display("home");
			},
			
			onSubmit: function() {
				var oOwnerComponent = this.getOwnerComponent();
				var sEmail = this.getView().byId("mailInput").getValue();
				var sFirstName = this.getView().byId("firstNameInput").getValue();
				var sLastName = this.getView().byId("lastNameInput").getValue();
				var sPassword = this.getView().byId("PasswordInput").getValue();
				var sRepeatPassword = this.getView().byId("repeatPasswordInput").getValue();
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
				if (sEmail && sFirstName && sLastName && sPassword && sGender && dBirthday && sStreet && sNumber && sZIP && sCity && sState && sAddress) {
					if(sPassword === sRepeatPassword){
						$.ajax({
							url:"php/User/setUser.php",
							data: {
								email: sEmail,
								firstname: sFirstName,
								lastname: sLastName,
								password: sPassword,
								gender: sGender,
								birthday: dBirthday,
								address: sAddress
							},
							type:"GET",
							context: this,
							success: function handleSuccess2(response){
								if (response === "success") {
									$.ajax({
										url:"php/User/setInterestsUser.php",
										data: {
											email: sEmail,
											interests: aInterests
										},
										type:"GET",
										context: this,
										success: function handleSuccess3(){
											MessageToast.show("Your account was created successfully and your RFID chip will be shipped soon!");
											oOwnerComponent.getTargets().display("home");
										},
										error:function handleError(){
											MessageToast.show("Ups, something went wrong with the transmission of your interests. Please contact the support. :(");
										}
									});
								}else {
									MessageToast.show("This Email address is already in use!");
								}
							},
							error:function handleError(){
								MessageToast.show("Ups, something went wrong with the transmission of your data. Please contact the support. :(");
							}
						});
					}else{
						MessageToast.show("The password and the repeatition of it do not not match!");
					}
				}else{
					MessageToast.show("All fields are mandatory");
				}
	 
			}

		});
	});