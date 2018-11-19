<template>
    <div>
    

            <plan></plan>
            
    </div>
</template>

<script>
// Imports
import plan from './plan.vue'
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

}
</script>

<style>

</style>