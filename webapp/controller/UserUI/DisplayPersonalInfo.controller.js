sap.ui.define([
		'jquery.sap.global',
		'sap/ui/core/Fragment',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel'
	], function(jQuery, Fragment, Controller, JSONModel) {
	"use strict";
 
	return Controller.extend("storm.controller.UserUI.DisplayPersonalInfo", {
 
		onInit: function () {
			$.ajax({
				url:"php/User/getUserInformation.php",
				type:"GET",
				context: this,
				data: {
					email: sap.ui.getCore().getModel("data").getProperty("/data/0/email")
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
 
		handleEditPress : function () {
 
			this._changeView("ChangePersonalInfo");

			
		},
		
		_changeView: function (sViewName){
			var oDetailPage = this.getView().getParent().getParent().getParent().getCurrentDetailPage();
			
			oDetailPage.removeAllContent();
			
			var oView = sap.ui.view({viewName:"storm.view.UserUI." + sViewName, type:sap.ui.core.mvc.ViewType.XML});
			
			oDetailPage.insertContent(oView);
		}
	});
});