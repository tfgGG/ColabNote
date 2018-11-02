<template>
<div>
    <div>
      <h3 class="ui Large header">
        <div class="content">
          {{noteinfo.title}}
          <div class="sub header">{{noteinfo.intro}}</div>
        </div>
      </h3>
      <button class="ui blue basic button">Move to Comment Area</button>
      <button class="ui blue basic button">Add to Planner</button>
    </div>
</div>
</template>
<script>
export default {
  props:['ids'],
  data: function() { 
    return {
        data:"Hello!",
        ids: this.ids
    }
  },
  computed:{
    noteinfo(){
      return this.$store.state.noteinfo
    }
  },
  created:function(){

    this.$store.dispatch("getnoteinfo",this.ids[0])

  }
 
};
</script>

<style>
/* 樣式也可以包進來 ._. */
.original-white {
  color: #fff;
}
[v-cloak] { display: none; }


</style>