<script>
export default{
    data(){
        return{
        
        }
    },
    methods:{
        gotohome(){
            this.$router.push("./")
        },
        gotologin(){
            this.$router.push("/loginView")
        },
        gotosign(){
            this.$router.push("/signView")
        },
        gototesttest(){
            this.$router.push("/testtest")
        },
        gotoback(){
            this.$router.push("/backView")
        }
    },
    components:{

    }
}
</script>

<template>
    <div class="header">
        <div class="headLeft">
            <h1>很快樂很快樂問卷平台</h1>
            <!-- <i class="fa-solid fa-magnifying-glass"></i> -->
        </div>
        <div class="headRight">
            <button @click="gotohome" type="button">列表頁</button>
            <button @click="gotoback" type="button">暫時性後台通道</button>
            <button @click="gotologin" type="button">登入</button>
            <button @click="gotosign" type="button">註冊</button>
            <button @click="gototesttest" type="button">testtest</button>
        </div>
    </div>

</template>

<style lang="scss" scoped>
.header{
    width: 100vw;
    height: 10vh;
    background-color: #89CFF3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: black;
    .headLeft{
        width: 50vw;
        display: flex;
        align-items: center;
        h1{
            margin-left: 5vw;
        }
    }
    .headRight{
        width: 50vw;
        display: flex;
        justify-content: end;
        align-items: center;
    }
    button{
        border: 0;
        background-color: transparent;
        margin: 0 2%;
        font-size: 20pt;
        transition: 0.5s;
        &:hover{
            color: gold;
        }
    }
}
</style>
