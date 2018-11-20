<template>
<div>
    <div class="ui menu">
            <div class="item">
              <img src="">
            </div>
            <a class="item" href="http://140.136.150.93/person/index/">MyPage</a>
            <a class="item" href = "http://140.136.150.93/upload/index/ ">Notes</a> 

            <a class="right item" href="">
                <button class="ui blue basic button"><i class="user icon"></i>Sign-in</button>
            </a>
            <a class= "item" href="/login/register/">
                <button class="ui blue button"><i class="pencil alternate icon"></i>Register</button>
            </a>

            <a class="right item" href=" ">Logout</a>
            <div class= "item">
                <img class= "ui avatar image" src="">
                <div class="right floated"><h5>Hi</h5></div>
            </div>


    </div>
</div>

</template>

<script>
export default {
    data(){
        return{
            url: "http://140.136.150.93/"
        }
    },
    computed:{

    }
}
</script>

<style scoped>

</style>

