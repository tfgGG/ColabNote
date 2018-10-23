<template>
    <div>
        
        <div id="mySidenav" class="sidenav">
               
        </div>
        
        <div id="main">

                        <button id="open" class="btn btn-default" v-on:click= "openNav" >三</button>
                        <editor v-bind:ids="ids"></editor>
                        <comment v-bind:ids="ids"></comment>
    
                    <info v-bind:ids="ids"></info>

        </div>    
            
    </div>
</template>

<script>
// Imports
import comment from './layouts/comment.vue' 
import info from './layouts/info.vue' 
import editor from './layouts/editor.vue' 

export default {
    components:{
        comment:comment,
         editor: editor,
         info:info
       
    },
    data () {
        return {
            ids:[],
            toogle: "0",
        }
    },
    created: function() {
        
        const word = window.location.pathname.split('/');
        this.ids.push( word[2])
        this.ids.push( word[3])
        console.log(this.ids);
        
    },
    methods: {

        openNav: function(){
            console.log("OpenNav")
            if(this.toogle=="0")
            {
                document.getElementById("mySidenav").style.width = "250px"
                document.getElementById("main").style.marginLeft = "250px"
                this.toogle = "1"
            }else{
                this.closeNav()
                this.toogle ="0"
            }
           
        },
        closeNav: function(){
            document.getElementById("mySidenav").style.width = "0"
            document.getElementById("main").style.marginLeft= "0"
            
        },
        showComment: function(){
            console.log("show")
        },

    }
}
</script>

<style>
body{
    margin: 0;
    font-family: 'Nunito SemiBold';
}
#editor{
    height:100%;
}

#open{
    position: relative;
}

.sidenav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #111;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
}

.sidenav a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
}

.sidenav a:hover {
    color: #f1f1f1;
}

.sidenav .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
}
#main {
    transition: margin-left .5s;
    padding: 16px;
}
@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}

</style>