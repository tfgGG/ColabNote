<template>
<div>
    <div ref="editor">
      
    </div>
</div>
</template>

<script>
import $ from 'jquery';
import Quill from 'quill';
import axios from 'axios'
import ShareDB from 'sharedb/lib/client';
import richText from 'rich-text';
const socket = new WebSocket('ws://localhost:3000');
const connection = new ShareDB.Connection(socket);
ShareDB.types.register(richText.type);
export default {
  props:["ids"],
  data() {
    return {
      id:this.ids,
      note:{},
      saving:null,
      quill: null,
      editdoc:null,

    };
  },
   computed:{
      menulist(){
        return this.$store.getters.menulist
      },
  },
  created: function(){ 
     this.save()

    
  },
  mounted: function(){
      
      this.editdoc = connection.get(this.id[0],this.id[1]);
      this.quill = new Quill(this.$refs.editor,{theme: 'snow'})
      
      this.editdoc.subscribe((err)=> { 
  
          if (err) throw err;

          //代表server turn on again 或 使用者本來就空的
          if(this.editdoc.data.ops.length == 0){
             var t = setTimeout(()=>{
                console.log("printing IF")
                var parsedata = JSON.parse(this.getnote().note)
                this.quill.setContents(parsedata.ops)
                clearTimeout(t)
             },2500)
          }
          else{
            console.log("printing ELSE")
            this.quill.setContents(this.editdoc.data);
          }

          this.quill.on('text-change', (delta, oldDelta, source)=> {
            if (source !== 'user') return;
            this.editdoc.submitOp(delta, {source:this.quill});
          });

         this.quill.on('editor-change', (eventName, ...args) => {
            //var range =this.quill.getSelection();
        
            //var text =this.quill.getText(range.index, range.length);
            //console.log('position ', range.index);
          });

          this.editdoc.on('op', (op, source) =>{
            if (source ===this.quill) return;
            this.update(op)
          }); 
      });
  },
  methods: {
     update(op){
        this.quill.updateContents(op);
     },
     save(note){
        this.saving = setInterval(() => {
 
            var n = JSON.stringify(this.quill.getContents())
            this.getnote().note = n 
            this.$store.dispatch('savenote',this.getnote())

        }, 8000)
     },
     getnote(){
        var note = this.menulist.find((item, index, array)=>{
                return item.idnote_list == this.id[1]
        })
        console.log("Inside Function")
        console.log(note)
        return note
     }
    
  },
  beforeDestroy () {
    clearInterval(this.saving)
  },
};
</script>

<style>
/* 樣式也可以包進來 ._. */
</style>