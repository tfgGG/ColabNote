<template>
<div>
    <div class="ui menu">

             <img src="http://140.136.150.93/media/logo.png" width="100px" height="65px">
        
            <a class="item" href="http://140.136.150.93/person/index/">MyPage</a>
            <a class="item" href = "http://140.136.150.93/upload/index/ ">Notes</a> 
            <a class="item" href = "https://140.136.150.93:3232/ ">WebCam</a> 

            <a  v-if="user == null" class="right item" href="http://140.136.150.93/login/login/">
                <button class="ui blue basic button"><i class="user icon"></i>Sign-in</button>
            </a>
            <a  v-if="user == null" class= "item" href="/login/register/">
                <button class="ui blue button"><i class="pencil alternate icon"></i>Register</button>
            </a>

            <a  v-if="user != null"  class="right item" @click="logout">Logout</a>
            <div  v-if="user != null" class= "item">
                <img class= "ui avatar image" v-bind:src="url+ user.first_name">
                <div class="right floated"><h5>Hi, {{user.email}}</h5></div>
            </div>


    </div>
</div>

</template>

<script>
export default {
    data(){
        return{
            url: "http://140.136.150.93/media/"
        }
    },
    computed:{
        user(){
            return this.$store.state.user
        },

    },
    created:function(){
       
    },
    methods:{
        logout(){
           
            var name = 'accesstoken'
            document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/'
            location.href = "http://140.136.150.93/login/logout/"
        }
    }

}
</script>

<style scoped>

</style>

