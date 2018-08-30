<template>
<div>
    
</div>
</template>

<script>

var db = require("../../lib/getdata");

export default {
  data: function() {
    return {
      menuItems: "wdwd"
    };
  },
  methods: {
    send: function() {
      //db.postcomment();
      console.log("send");
    }
  }
};
</script>

<style>
/* 樣式也可以包進來 ._. */
.original-white {
  color: #fff;
}
</style>