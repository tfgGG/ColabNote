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
      detail:[],
      quill: null,
      editdoc:null,
    };
  },
  computed:{
  },
  created: function(){ 
     //console.log(this.ids); 

  },
  mounted: function(){


     // console.log("Editor Ids array")
      //console.log(this.id)
      
      this.editdoc = connection.get(this.id[0],this.id[1]);
    
      this.quill = new Quill(this.$refs.editor,{theme: 'snow'})
      this.editdoc.subscribe((err)=> { 
  
          if (err) throw err;
          this.quill.setContents(this.editdoc.data);
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
     connection(noteid,id){
        if(this.editdoc.id == id)
          return;
        var doc = connection.get(noteid,id)
        doc.fetch(()=>{
          this.update(doc.data);
        })
        this.editdoc = doc
     }
    
  }
};
</script>

<style>
/* 樣式也可以包進來 ._. */
</style>