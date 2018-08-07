var client = require('node-rest-client').Client;
var base = "http://localhost:8000/";
var db = module.exports = {
    
    getcomment : function(noteid){
        client.get(base+"/note/"+ noteid, function (data, response) {
            // parsed response body as js object
            console.log(data);
            // raw response
            console.log(response);
        });
    },
    postcomment: function(){


    },
    getuser: function(){
        client.get(base+"/login/now", function (data, response) {
            // parsed response body as js object
            console.log(data);
            // raw response
            console.log(response);
        });
    }
};