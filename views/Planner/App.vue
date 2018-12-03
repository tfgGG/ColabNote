<template>
    <div>
    

            <plan></plan>
            
    </div>
</template>

<script>
// Imports
//var fs = require('fs')
//import LocalStorage from 'node-localstorage'
import plan from './plan.vue'
import axios from 'axios'
export default {
    components:{
        plan:plan,
    },
    data () {
        return {
            ids:[],
            toogle: "0",
        }
    },
    created:function(){

        //var LocalStorage = require('node-localstorage').LocalStorage;
        //var url = "http://"+document.location.origin+":3000/gettoken"
        //axios.get("/api/hello/").then((response)=>{console.log(response.data)})
        

    }

}
</script>

<style>

</style>