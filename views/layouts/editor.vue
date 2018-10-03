<template>
<div>
    <div id="editor">
      
    </div>
    <div id="menu">
      <ul>
      </ul>
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
      detail:[]
    };
  },
  computed:{
  },
  created: function(){ 
     //console.log(this.ids); 

  },
  mounted: function(){


       axios.get('/upload/RESTdetail/27/')
            .then((response)=> {
              console.log("Vue Comment Detail")
              console.log(response.data)
                this.detail = response.data
            })
            .catch(function (error) {
                console.log("Get Detail error"+ error);
      });
      console.log("Editor Ids array")
      console.log(this.id)
      const editdoc = connection.get(this.id[0],this.id[1]);
      console.log("editdoc"+ editdoc);
      editdoc.subscribe(function(err) { 
  
          if (err) throw err;
          const quill = new Quill('#editor', {theme: 'snow'});
          //console.log(quill);
          quill.setContents(editdoc.data);
          quill.on('text-change', function(delta, oldDelta, source) {
            if (source !== 'user') return;
            editdoc.submitOp(delta, {source: quill});
          });

          quill.on('editor-change', function(eventName, ...args) {
            var range = quill.getSelection();
        
            var text = quill.getText(range.index, range.length);
            //console.log('position ', range.index);
          });

          editdoc.on('op', function(op, source) {
            if (source === quill) return;
            quill.updateContents(op);
          }); 
      });
  },
  methods: {
    
  }
};
</script>

<style>
/* 樣式也可以包進來 ._. */
</style>