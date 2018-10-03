const axios = require('axios')
axios.defaults.baseURL = "http://localhost:8000/"
const anxiosfunc = module.exports = {
    
    getcomment : function(noteid){

        axios.get('/upload/Comment/'+ noteid)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log("getcomment error"+error);
            });
        /*
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
        ];*/
        //object inside array
        return json;
    },
    postcomment: function(noteid,obj){
        axios.post('/user', obj)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
        });
    },
    getuser: function(){
       
        return axios.get('/login/now/')
            .then((response) => {
                return response.data
               // console.log(response);
            })
            .catch(function (error) {
                console.log("get user error"+ error);
            });

        //var user = { name:"haha", birth:"2017" , photo: axios.defaults.baseURL+"media/user1.jpg" }
        // return data;
    },
    getdetail:function(){ 
        return  axios.get('/upload/RESTdetail/27/')
            .then(function (response) {
                return response.data
            })
            .catch(function (error) {
                console.log("get detail error"+ error);
            });
    } 
};

const db = module.exports = {

    async getdetail(){
        console.log("get Detail running")
        var result = await axios.get('/upload/RESTdetail/27/')
        return JSON.stringify(result.data)
    },
    async getuser(){
        console.log("get User running")
        var result = await anxiosfunc.getuser()
        console.log("---User:---")
        console.log(result.data)
        return JSON.stringify(result.data)
    }      
}

/*
function returndata (response){
    console.log(response)
    return response
}
*/
//const d = db.getdetail()
//console.log("d")
//console.log(d)