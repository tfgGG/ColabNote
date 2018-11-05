<template>
<div>
      <div class="ui basic segment">
        <h3 class="ui left floated header">
            {{noteinfo.title}}
            <div class="sub header">{{noteinfo.intro}}</div>
            <a  :key="f" v-for="f in field" class="ui gray label">#{{f.text}}</a>

        </h3>
        <div class="ui right floated header">
              <button class="samll ui blue basic button">Comment</button>
              <button class="small ui blue basic button">Planner</button>
        </div>
      </div>
</div>
</template>
<script>
import cat from '../../public/js/cat.json'
export default {
  props:['ids'],
  data: function() { 
    return {
        ids: this.ids,
        data:cat,
        field:[]
    }
  },
  computed:{
    noteinfo(){
      return this.$store.state.noteinfo
    },
    filed(){
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