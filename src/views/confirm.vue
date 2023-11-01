<script>
export default{
    data(){
        return{
        }
    },
    components:{
    },
    methods:{
        gohome(){
        this.$router.push("/")
        },
        govote(){
        this.$router.push("/vote")
        }
    }
}
</script>

<template>
    <div class="bg">  
        <h1>最後確認</h1>
        <div class="showBlock">
        </div>
        <div class="btn">
            <button @click="govote" type="button">上一頁</button>
            <button @click="gohome" type="button">確認</button>
        </div>
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

    .btn{
        display: flex;
            button{
                margin: 2% 2%;
                border: 0;
                width: 150px;
                height: 50px;
                border-radius: 5px;
            }
    }
}
</style>
