<template>
    <div>
        <div v-if="mode != 'frame'">
            <heads></heads>
            <!--<comment v-bind:ids="ids" id="mySidenav" class='sidenav' ></comment>-->
        </div>
        <div id="main"  v-if="mode!= 'frame'">
            <button  class="ui icon basic button" @click="openNav"><i class="wechat icon"></i></button>
            <div class='ui grid container'> 
                
                    <div class="five wide column" id="info">
                        <info v-bind:ids="ids"  v-bind:mode="mode"></info>
                    </div>
                    <div class="eleven wide column">                    
                        <div class="ui grid">
                            <div  class="sixteen wide column"><noteinfo v-bind:ids="ids" v-bind:mode="mode"></noteinfo></div>
                            <div class="sixteen wide column"><editor v-bind:ids="ids"  v-bind:mode="mode"></editor></div>
                        </div>
                    </div>
                    
            </div>
            <!--<button  class="ui icon basic button" @click="openNav"><i class="wechat icon"></i></button>-->
        </div>    

        <div v-if="mode=='frame'" class='ui grid'>                 
                <div class="five wide column">
                    <info v-bind:ids="ids"  v-bind:mode="mode"></info>
                </div>
                <div class="eleven wide column">                    
                        <div class="sixteen wide column"><editor v-bind:ids="ids"  v-bind:mode="mode"></editor></div>       
                </div> 
        </div>

        <div v-if="mode != 'frame'">
            <comment v-bind:ids="ids" id="mySidenav" class='sidenav' ></comment>
        </div>
    </div>
</template>

<script>
// Imports
import comment from './comment.vue' 
import info from './info.vue' 
import editor from './editor.vue' 
import noteinfo from './noteinfo.vue'
import heads from '../layouts/heads.vue'

export default {
    components:{
         noteinfo:noteinfo,
         comment:comment,
         editor: editor,
         info:info,
         heads:heads
    },
    data () {
        return {
            ids:[],
            toogle: "0",
            mode:''
        }
    },
    created: function() {
        

        const word = window.location.pathname.split('/');
        this.ids.push( word[2])
        this.ids.push( word[3])
        var urlParams = new URLSearchParams(window.location.search);
        this.mode = urlParams.getAll('p')  

        
    
    },
    methods: {

        openNav: function(){
            console.log("OpenNav")
            if(this.toogle=="0")
            {
                document.getElementById("mySidenav").style.width = "350px"
                document.getElementById("main").style.marginLeft = "350px"
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
    display:block;
    position: fixed;
    z-index: 1;
    top: 0;
    background-color:white;
    overflow-x: hidden;
    overflow-y: hidden;
    transition: 0.5s;
    border: 1px #B4BABD solid;
}
#main {
    transition: margin-left .5s;
    padding: 16px;
}
@media screen and (max-height: 450px) {
  .sidenav a {font-size: 18px;}
  #info{display: none;}
}

</style>