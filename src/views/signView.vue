<script>
export default{
    data(){
        return{
           
        }
    },
    methods:{
        login(){
            this.$router.push("/loginView")
        }
    }
}
</script>

<template>
    <div  class="sign">  
        <div class="signArea">
            <h1>Sign Page</h1>
            <div class="acc signblock">
                <p>Account</p>
                <input type="text" name="" id="">
            </div>
            <div class="pwd signblock">
                <p>Password</p>
                <input type="text" name="" id="">
            </div>
            <div class="repwd signblock">
                <p>Password</p>
                <input type="text" name="" id="">
            </div>
            <div class="signbtn">
                <button @click="login" type="button">cancel</button>
                <button type="button">signup</button>
            </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>
$maincolor:#00A9FF;

.sign{
    width: 100vw;
    height: 90vh;
    background-color: $maincolor;
    display: flex;
    justify-content: center;
    align-items: center;
    h1{
        text-align: center;
    }
    .signArea{
        width: 30vw;
        height: 70vh;
        border-radius: 5px;
        // backdrop-filter: blur(20px);
        background-color: rgb(218, 218, 218);
        .signblock{
            width: 20vw;
            height: 20%;
            margin-left: 5vw;
            input{                
                width: 98%;
                height: 30px;
            }
            
        }
        .signbtn{
            text-align: center;
            button{
                width: 100px;
                height: 30px;
                border: 0;
                border-radius: 5px;
                background-color: rgb(106, 106, 106);
                margin: 0 2%;
                margin-top: 5vh;
            }
        }
    }
}

</style>
