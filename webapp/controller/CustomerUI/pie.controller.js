sap.ui.define([
        'jquery.sap.global',
        'sap/ui/core/mvc/Controller',
        'sap/ui/model/json/JSONModel',
        './CustomerFormat',
        './InitPage'
    ], function(jQuery, Controller, JSONModel, CustomerFormat, InitPageUtil) {
    "use strict";
    
    return Controller.extend("storm.controller.CustomerUI.pie", {
 
        onInit : function (evt) {
    		var oModel = new JSONModel();
            
            var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame");
            oVizFrame.setVizProperties({
                legend: {
                    title: {
                        visible: false
                    }
                },
                title: {
                    visible: false
                }
            });
        	var dataModel = new JSONModel();
			oModel.loadData("model/Dashboard.json");
			this.getView().setModel(oModel);
            
            var oPopOver = this.getView().byId("idPopOver");
            oPopOver.connect(oVizFrame.getVizUid());
            oPopOver.setFormatString(CustomerFormat.FIORI_LABEL_FORMAT_2);
            
            InitPageUtil.initPageSettings(this.getView());
 
            var that = this;
            dataModel.attachRequestCompleted(function() {
                that.dataSort(this.getData());
            });
        },
        onDataLabelChanged : function(oEvent){
            if(this.oVizFrame){
                this.oVizFrame.setVizProperties({
                    plotArea: {
                        dataLabel: {
                            visible: oEvent.getParameter('state')
                        }
                    }
                });
            }
        },
        onDatasetSelected : function(oEvent){
            var datasetRadio = oEvent.getSource();
            if(this.oVizFrame && datasetRadio.getSelected()){
                var bindValue = datasetRadio.getBindingContext().getObject();
                var dataModel = new JSONModel(this.dataPath + bindValue.value);
                this.oVizFrame.setModel(dataModel);
                var that = this;
                this.oVizFrame.getModel().attachRequestCompleted(function() {
                    that.dataSort(this.getData());
                });
            }
        },
        initCustomFormat : function(){
            CustomerFormat.registerCustomFormat();
        }
    }); 
 
});