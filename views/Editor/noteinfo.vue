<template>
<div>
      <div class="ui basic segment">
        <div class="ui left floated header">
            <h3>{{noteinfo.title}}</h3>
            <div class="sub header">{{noteinfo.intro}}</div>
            <div class="sub header"><a  :key="f" v-for="f in field" class="ui gray label">#{{f.text}}</a></div>
        </div>
        <div class="ui right floated header">
              <button class="samll ui blue basic button">Comment</button>
              <button class="small ui blue basic button">Planner</button>
        </div>
      </div>
</div>
</template>
<script>
export default {
  props:['ids'],
  data: function() { 
    return {
        ids: this.ids,
    }
  },
  computed:{
    noteinfo(){
      return this.$store.state.noteinfo
    },
    field(){
      return this.$store.state.field
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