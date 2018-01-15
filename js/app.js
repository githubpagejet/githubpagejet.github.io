// Set the App object
var App = {
    controller: {},
    listener: null,
    listener_interval: null,
    lang: null,
    langCode: 0,
    pageConfig: {}, // this will contain different configuration depends on the page where we  are!

    isTabFocused: function(){
        var stateKey, eventKey, keys = {
            hidden: "visibilitychange",
            webkitHidden: "webkitvisibilitychange",
            mozHidden: "mozvisibilitychange",
            msHidden: "msvisibilitychange"
        };

        for (stateKey in keys) {
            if (stateKey in document) {
                eventKey = keys[stateKey];
                break;
            }
        }

        return function(c) {
            if (c) document.addEventListener(eventKey, c);
            return !document[stateKey];
        }
    }
};

// System configurations and global listeners
$(function() {
    // Initial configurations
		// Set router things
    Router.config({
        mode: 'history'
    });
		// Set configurations
    dataManager.config({
        api: config['data_manager']['api']
    });
		// Set language
    App.lang = dataManager.getCookie('lang') ? dataManager.getCookie('lang') : config['app']['default_lang'];   
	$('#lang-switcher').val(App.lang).show();
		// Set tab listener
	clearInterval(App.listener);
    App.listener_interval = config['app']['interval'];
    App.listener = setInterval(fn, App.listener_interval);
	
    // Links
    $(document).on('click', '.pg-link', function(e){
        e.preventDefault();
        e.stopImmediatePropagation();

        var href = $(this).attr('href');

        // we don't need to redirect # or empty URL
        if (href == "#" || href == "") {
            return;
        }

        Router.navigate(href);
    });
    $(document).on('click', '.pg-link-inactive', function(e){
        e.preventDefault();
        e.stopImmediatePropagation();
    });

    // Buttons and links
    $(document).on('click', '.pg-action', function(e){
        e.preventDefault();
        e.stopImmediatePropagation();

        // Call the corresponding controller
        var data = $(this).attr('data').split('-');
        var action = data[0];
        data.shift();
        for (i in data) {
            action += data[i].charAt(0).toUpperCase() + data[i].slice(1);
        }
        App.controller[action]($(this));
    });

    //Switch language
    $("select.lang-switcher").on('change', function(e){
        e.preventDefault();
        e.stopImmediatePropagation();

		dataManager.setCookie('lang', $(this).val(), config['app']['lang_period']);		
		
        window.location.href = '/'+Router.getFragment();
    });

    // Periodical listener
    var fn = function() {
		// Adjust the time in case we focus or un-focus the tab
        if (App.isTabFocused()) {
            if (App.listener_interval != config['app']['interval']) {
                App.listener_interval = config['app']['interval'];
				
                clearInterval(App.listener);
                App.listener = setInterval(fn, App.listener_interval);
            }
        } else {
            if (App.listener_interval != config['app']['interval_not_focused']) {
                App.listener_interval = config['app']['interval_not_focused'];
				
                clearInterval(App.listener);
                App.listener = setInterval(fn, App.listener_interval);
            }
        }

		// Execute some actions on regular basis
        if (App.isTabFocused()) {
            console.log('Some action');
        }
    };
});