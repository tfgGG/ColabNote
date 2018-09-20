<template>
    <div>
        <editor  v-bind:ids="ids"></editor>
        <comment></comment>
        <info></info>
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
        info:info,
        editor: editor
    },
    data () {
        return {
            note:{
                ids:'',
                noteid:''
            }
            
        }
    },
    created: function() {
        
        const word = window.location.pathname.split('/');
        this.ids = word[2];
        this.noteid = word[1];
        console.log(this.ids+" "+ this.noteid);
        
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

</style>