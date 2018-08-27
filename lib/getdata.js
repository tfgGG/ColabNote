var client = require('node-rest-client').Client;
var base = "http://localhost:8000/";
var db = module.exports = {
    
    getcomment : function(noteid){
        var json = [
            {
                user:"Tom",
                date:"two weeks ago",
                comment: "OK I got it",
                photo: base+"media/user1.jpg",
            },
            {
                user:"Kate",
                date:"two weeks ago",
                comment: "Yeah you are right",
                photo: base+"media/user1.jpg",
            },
            {
                user:"Huang Li Chen",
                date:"two weeks ago",
                comment: "OK I got it",
                photo: base+"media/user1.jpg",
            },
        ];
        //object inside array
        return json;
    },
    postcomment: function(){


    },
    getuser: function(){
        /*client.get(base+"/login/now", function (data, response) {
            // parsed response body as js object
            console.log(data);
            // raw response
            console.log(response);
        });*/
        //object
        var user = { name:"haha", birth:"2017" , photo: base+"media/user1.jpg" }
        return user;
    }
};