Router    
    .add('page', function(){
        App.controller.pagePage();
    })
    .add('contact-us', function(){
        App.controller.pageContactUs();
    })
    .check().listen();