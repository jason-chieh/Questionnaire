<script>
export default{
    data(){
        return{
        }
    },
    components:{
    },
    methods:{
        goconfirm(){
        this.$router.push("/confirm")
        }
    }
}
</script>

<template>
    <div class="bg">  
        <h1>請輸入問卷</h1>
        <div class="showBlock">
        </div>
        <button @click="goconfirm" type="button">提交並且前往確認</button>
    </div>

</template>

<style lang="scss" scoped>

.bg{
    width: 100vw;
    background-color: #00A9FF;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .showBlock{
    width: 80vw;
    height: 50vh;
    background-color: rgb(218, 218, 218);
    border-radius: 5px;
    }
    button{
        margin: 2% 2%;
        border: 0;
        width: 150px;
        height: 50px;
        border-radius: 5px;
    }
}
</style>
