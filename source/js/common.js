/*
 * common-module.js
 *
 * @project:    SN-Car-Facelift
 * @requires:   jQuery 3.1.1
 * @date:       2017-01-02
 * @author:     Shashank, sshrivastava5@sapient.com
 * @licensor:   SAPIENNITRO
 * @namespaces: sncf
 */

/**
 * @namespace sncf Sapient nitro cartier facelift
 */
var sncf = window.snfc || {};

/**
 * @namespace Main
 * @memberof snqs
 * @property {null} property - description of property
 */
sncf.Main = (function(window, $, namespace) {
    //'use strict'; 
    var init,

    // Public variables

    //Private variables

    init = function() {
    	alert("boom");
    	console.log("")
    };

    return {
    	init: init
    }

})(window, jQuery, 'sncf');
sncf.Main.init();