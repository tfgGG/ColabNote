<template>
    <div>
        
       <!-- <div id="mySidenav" class="sidenav">
               
        </div>-->
        
        <heads></heads>
        <div id="main" >
            
            <plan></plan>
        </div>    
            
    </div>
</template>

<script>
// Imports
import plan from './plan.vue'
import heads from '../layouts/heads.vue'
export default {
    components:{
        plan:plan,
        heads:heads
    },
    data () {
        return {
            ids:[],
            toogle: "0",
        }
    },

}
</script>

<style>

</style>