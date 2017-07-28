sap.ui.define([
        'jquery.sap.global',
        'sap/ui/core/mvc/Controller',
        'sap/ui/model/json/JSONModel',
        'sap/viz/ui5/data/FlattenedDataset',
        './CustomerFormat',
        './InitPage'
    ], function(jQuery, Controller, JSONModel, FlattenedDataset, CustomerFormat, InitPageUtil) {
    "use strict";
    
    return Controller.extend("storm.controller.CustomerUI.Line", {
 
        onInit : function (evt) {
            this.initCustomFormat();
            // set explored app's demo model on this sample
            var oModel = new JSONModel(this.settingsModel);
            oModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
            this.getView().setModel(oModel);
            
            var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame");
            oVizFrame.setVizProperties({
                plotArea: {
                    dataLabel: {
                        formatString:CustomerFormat.FIORI_LABEL_SHORTFORMAT_2,
                        visible: true
                    }
                },
                valueAxis: {
                    label: {
                        formatString: CustomerFormat.FIORI_LABEL_SHORTFORMAT_10
                    },
                    title: {
                        visible: false
                    }
                },
                categoryAxis: {
                    title: {
                        visible: false
                    }
                },
                title: {
                    visible: false,
                    text: 'Revenue by City and Store Name'
                }
            });
            	var dataModel = new JSONModel();
			oModel.loadData("model/Dashboard.json");
			this.getView().setModel(oModel);
            
            var oPopOver = this.getView().byId("idPopOver");
            oPopOver.connect(oVizFrame.getVizUid());
            oPopOver.setFormatString(CustomerFormat.FIORI_LABEL_FORMAT_2);
            
            InitPageUtil.initPageSettings(this.getView());
        },
        onDatasetSelected : function(oEvent){
            var datasetRadio = oEvent.getSource();
            if(this.oVizFrame && datasetRadio.getSelected()){
                var bindValue = datasetRadio.getBindingContext().getObject();
                var dataset = {
                    data: {
                        path: "/milk"
                    }
                };
                var dim = this.settingsModel.dimensions[bindValue.name];
                dataset.dimensions = dim;
                dataset.measures = this.settingsModel.measures;
                var oDataset = new FlattenedDataset(dataset);
                this.oVizFrame.setDataset(oDataset);
                var dataModel = new JSONModel(this.dataPath + bindValue.value);
                this.oVizFrame.setModel(dataModel);
 
                var feedCategoryAxis = this.getView().byId('categoryAxisFeed');
                this.oVizFrame.removeFeed(feedCategoryAxis);
                var feed = [];
                for (var i = 0; i < dim.length; i++) {
                    feed.push(dim[i].name);
                }
                feedCategoryAxis.setValues(feed);
                this.oVizFrame.addFeed(feedCategoryAxis);
            }
        },
        onSeriesSelected : function(oEvent){
            var seriesRadio = oEvent.getSource();
            if(this.oVizFrame && seriesRadio.getSelected()){
                var bindValue = seriesRadio.getBindingContext().getObject();
                
                var feedValueAxis = this.getView().byId('valueAxisFeed');
                this.oVizFrame.removeFeed(feedValueAxis);
                feedValueAxis.setValues(bindValue.value);
                this.oVizFrame.addFeed(feedValueAxis);
            }
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
        onAxisTitleChanged : function(oEvent){
            if(this.oVizFrame){
                var state = oEvent.getParameter('state');
                this.oVizFrame.setVizProperties({
                    valueAxis: {
                        title: {
                            visible: state
                        }
                    },
                    categoryAxis: {
                        title: {
                            visible: state
                        }
                    }
                });
            }
        },
        initCustomFormat : function(){
            CustomerFormat.registerCustomFormat();
        }
    }); 
 
    return Controller;
 
});