$(function() {
	// Home page
	App.controller.pagePage = function()
	{
		// Example usage of handlebars
        var template = Handlebars.templates.page;
        var input_data = {}; // this can be "data"
        $('#content').html(template($.extend(App[App.lang], input_data)));
			
		console.log('Just page');
	}
	
    // Contact us page
    App.controller.pageContactUs = function()
    {
        console.log('Contact us page');
    };
});