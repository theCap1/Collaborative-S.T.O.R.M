sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"ShopScreenStormShopScreen/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("ShopScreenStormShopScreen.Component", {

		metadata: {
			manifest: "json",
			rootView: "ShopScreenStormShopScreen.view.RFID_Reader",
               routing: {
                               config: {
                                               targetsClass: "sap.m.routing.Targets",
                                               viewPath: "ShopScreenStormShopScreen.view",
                                               controlId: "app",
                                               controlAggregation: "pages",
                                               viewType: "XML"
                               },
                               targets: {
                                               reader: {
                                                              viewName: "RFID_Reader",
                                                              viewLevel: 0
                                               },

                                               shop: {
                                                              viewName: "ShopScreen",
                                                              viewLevel: 1
                                               }
                               }}
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			this.getTargets().display("reader");
			
			window.user = "";
			window.shop = "";
		}
	});
});