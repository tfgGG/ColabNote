<template>
<div>

  <div class="ui basic segment">
    <!--<h4>{{subtitle}}</h4>-->
    <h4>{{loading}}</h4>
    <div id="editor" :class="{ view: this.mode == 'view'}">
      
    </div>
  </div>
</div>
</template>

<script>
import $ from 'jquery';
import Quill from 'quill';
import axios from 'axios'
import ShareDB from 'sharedb/lib/client';
import richText from 'rich-text';
const socket = new WebSocket('ws://'+location.hostname+":"+location.port);
const connection = new ShareDB.Connection(socket);
ShareDB.types.register(richText.type);
export default {
  props:["ids",'mode'],
  data() {
    return {
      id:this.ids,
      note:{},
      saving:null,
      quill: null,
      editdoc:null,
      mode: this.mode[0],
      loading:'',
      editstatus:0
    };
  },
   computed:{
      menulist(){
        return this.$store.getters.menulist
      },
  },
  created: function(){ 
     this.save()
     //this.$store.dispatch("GetUser")
     console.log("MODE:"+this.mode)
  
    
  },
  mounted: function(){
      
      this.editdoc = connection.get(this.id[0],this.id[1]);
      if(this.mode == 'view')
      {
        this.quill = new Quill('#editor',{readOnly: true,theme: 'bubble'})

      }else{
        this.quill = new Quill('#editor', { modules: { toolbar: ['image','bold','italic',{ 'color': [] },{ 'header': '3' },{ size: [ 'small', false, 'large', 'huge' ]},{ 'list': 'ordered'}, { 'list': 'bullet' },'indent','font'] },theme: 'snow'});
      }
      this.editdoc.subscribe((err)=> { 
  
          if (err) throw err;
          
          //代表server turn on again 或 使用者本來就空的
          if(this.editdoc.data.ops[0].insert == ' '){
             this.loading ="Data Loading...."
             var t = setTimeout(()=>{
                console.log("printing IF")
                this.editstatus = 1
                

                if(this.getnote().note !='' && this.getnote().note != null)
                {
                    console.log(this.getnote().note)
                    var parsedata = JSON.parse(this.getnote().note)
                //this.quill.setContents(parsedata.ops)
                  console.log(parsedata.ops)
                  this.editdoc.data = parsedata.ops
                  this.quill.setContents(this.editdoc.data);
                  console.log(this.editdoc.data)
                   
                }
                //this.editdoc.data.shift()
                 this.loading=''
                clearTimeout(t)
             },1500)
          }
          else{
            console.log("printing ELSE")
            console.log(this.editdoc.data)
            this.quill.setContents(this.editdoc.data);
            
          }
          //this.quill.setContents(this.editdoc.data);

          this.quill.on('text-change', (delta, oldDelta, source)=> {
            console.log(delta)
            if (source !== 'user') return;
            this.editdoc.submitOp(delta, {source:this.quill});
            
          });

         this.quill.on('editor-change', (eventName, ...args) => {
            //var range =this.quill.getSelection();
        
            //var text =this.quill.getText(range.index, range.length);
            //console.log('position ', range.index);
          });

          this.editdoc.on('op', (op, source) =>{
            //console.log(source)
            
            if (source === this.quill) return;
            //console.log('op')
            this.update(op)
          }); 
      });
  },
  methods: {
     update(op){
        //console.log("Update")
        /*if(this.editstatus == 1)
        {
          this.editdoc.data.ops.concat(op.ops)
          this.editstatus = 0
          op.ops = this.editdoc.data.ops
        }*/
        this.quill.updateContents(op);
       // console.log(this.editdoc.data)
     },
     save(note){
        this.saving = setInterval(() => {
           
            var n = JSON.stringify(this.quill.getContents())
            this.getnote().note = n 
            this.$store.dispatch('savenote',this.getnote())

        }, 6000)
     },
     getnote(){
        var note = this.menulist.find((item, index, array)=>{
                return item.idnote_list == this.id[1]
        })
        //console.log("Inside Function")
        //console.log(note)
        return note
     }
    
  },
  beforeDestroy () {
    clearInterval(this.saving)
  },
};
</script>

<style scoped>
body{
  background-color: white;
}

.view{
  border-radius: 3px;
  border: 1px solid #A8B0B7
}
/* 樣式也可以包進來 ._. */
</style>