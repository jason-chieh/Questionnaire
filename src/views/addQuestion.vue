<script>
import {mapState,mapActions} from 'pinia'
import day from '../stores/day'

export default{
    data(){
        return{
            // 題目標題跟題目製作畫面切換
            page:1,
            editPage:1,
            selectMode:1,

            // 問卷的陣列
            questionArr:[],
            // 問卷的內容
            question:"",
            mustbechoose:"",
            questionanswer:"",
        }
    },
    methods:{
        goQuestion(){
            this.page=2
        },
        goTitle(){
            this.page=1
        },
        gotoback(){
            this.$router.push("/backView")
        },
        goedit(){
            this.editPage=2
        },
        goeditBack(){
            this.editPage=1
        },
        // pinia抓取時間
        ...mapActions(day,["getCurrentDate"]),
        // 新增問題
        addQuestion(){
            let mustbechoosechiense = "";
            let kind ="";
            // 判斷是否為必填
            if(this.mustbechoose){
                mustbechoosechiense = "必填"
            }else{
                mustbechoosechiense = "選填"
            }
            // 判斷選擇的種類
            if(this.selectMode==1){
                kind = "文字輸入"
            }else if(this.selectMode==2){
                kind = "單選題"
            }else{
                kind = "多選題"
            }

            let questionObj={
                question:this.question,
                mustbechoose:mustbechoosechiense,
                questionkind:kind,
            }
            if(this.question=="" || this.questionanswer==[]){
                alert("必須填寫問題")
            }else{
                this.questionArr.push(questionObj)
                this.question = ""
                this.mustbechoose = ""
                this.questionanswer = ""
            }
        }
    },
    mounted(){
        // 抓取日期
        this.getCurrentDate()
        // 要把值設定給畫面
        const logindate = document.getElementById('logindate')
        const sevendate = document.getElementById('sevendate')
        logindate.value = this.nowday
        sevendate.value = this.sevenday
    },
    computed:{
    // 抓取pinia裡面算出的值今天日期跟七天後
    ...mapState(day,["nowday","sevenday"])
    },
    updated(){
        // const one = document.getElementById("one")
        // console.log(one.text)
    }
}
</script>

<template>
    <div class="bg">  
        <div class="bigArea">
            <!-- 上方選擇列切換 -->
            <div class="top">
                <button @click="goTitle" type="button">問卷題目</button>
                <button @click="goQuestion" type="button">問卷內容</button>
            </div>

            <!-- 問卷標題跟問卷內容 -->
            <div v-if="page==1" class="questionTitle">
                <div class="titleContent">
                    <label for="">問卷名稱:</label>
                    <input type="text"><br>
                    <label for="">描述內容:</label>
                    <input type="text"><br>
                    <label for="">開始時間:</label>
                    <input id="logindate" type="date"><br>
                    <label for="">結束時間:</label>
                    <input id="sevendate" type="date">
                </div>
            </div>
            <div v-if="page==2" class="addQuestion">
                <div  class="addQuestionTop">
                    <label class="labelq" for="">問題:</label>
                    <input class="inputq"  type="text" v-model="question">
                    <select class="selectq" name="" id="" v-model="selectMode" >
                        <option id="one" value="1" >文字回答</option>
                        <option id="two" value="2">單選</option>
                        <option id="three" value="3">多選</option>
                    </select>
                    <input class="checkboxq" type="checkbox" v-model="mustbechoose" value="必填">
                    <label  for="">必填</label><br>
                    <label class="labelq" for="">選擇答案:</label>
                    <input class="inputq" type="text" v-model="questionanswer">
                    <button @click="addQuestion" class="addBtn" type="button">送出</button>
                    <button class="delBtn" type="button">刪除</button>
                </div>


                <div class="addQuestionBot">
                    <table>
                        <thead>
                            <tr>
                                <th>勾選</th>
                                <th>編號</th>
                                <th>問題</th>
                                <th>種類</th>
                                <th>必填</th>
                                <th>編輯</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item,index in questionArr" >
                                <td ><input type="checkbox" :key="index"></td>
                                <td >{{index+1}}</td>
                                <td ><a href="#">{{item.question}}</a></td>
                                <td>{{item.questionkind}}</td>
                                <td>{{item.mustbechoose}}</td>
                                <td @click="goedit"><a href="#">編輯</a></td>
                            </tr>
                            <!-- 可以继续添加更多的行 -->
                        </tbody>
                    </table>
                </div>
            </div>


            <!-- 編輯畫面 -->
            <div v-if="editPage==2" class="addQuestionEdit">
                <div class="editArea">
                    <h1 >問題編輯</h1>
                    <label for="">問題:</label>
                    <input type="text"><br>
                    <label for="">答案:</label>
                    <input type="text">

                    <div class="editAreaBot">
                        <select  name="" id=""  >
                            <option  value="1" >文字回答</option>
                            <option  value="2">單選</option>
                            <option  value="3">多選</option>
                        </select>
                    <input  type="checkbox" value="true">
                    <label  for="">必填</label><br>
                    </div>
                    <div class="editAreaBtn">
                        <button @click="goeditBack" type="button">取消</button>
                        <button type="button">確定修改</button>
                    </div>
                </div>
            </div>
            <div class="bot">
                <button @click="gotoback" class="chancel buttont" type="button">取消新增</button>
                <button @click="gotoback" class="send buttont" type="button">確定新增</button>
            </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>
$maincolor:#00A9FF;
$maincolor2:rgb(218, 218, 218);
.bg{
    width: 100vw;
    height: 90vh;
    background-color: $maincolor;
    display: flex;
    justify-content: center;
    align-items: center;
    .bigArea{
        width: 90vw;
        height: 80vh;
        background-color: $maincolor2;
        border: 2px solid black;
        .top{
            width: 90vw;
            height: 10vh;
            display: flex;
            align-items: center;
            border-bottom: 2px solid black;

            button{
                font-size: 18pt;
                background-color: transparent;
                margin: 0 1vw;
                border: 0;
                background-color: rgb(124, 124, 124);
                border-radius: 5px;
                color: white;
                &:hover{
                    cursor: pointer;
                    border: 1px solid black;
                }
            }
        }
        .questionTitle{
            width: 90vw;
            height: 60vh;
            .titleContent{
                label{
                    margin-left: 3vw;
                    margin-right: 1vw;
                    font-size: 16pt;
                }
                input{
                    margin-top: 5vh;
                    font-size: 16pt;
                }
            }
        }
        .addQuestion{
            width: 90vw;
            height: 60vh;
            overflow: auto;
            .addQuestionTop{
                .selectq{
                    margin-left: 3vw;
                    font-size: 16pt;
                }
                .checkboxq{
                    margin-left: 3vw;
                    width: 20px;
                    height: 20px;
                }
                .addBtn{
                    margin-left: 5vw;
                    border: 0;
                    font-size: 16pt;
                    border-radius: 5px;
                    background-color: blue;
                    color: white;
                    &:hover{
                        cursor: pointer;
                        border: 1px solid black;
                    }
                }
                .delBtn{
                    margin-left: 4vw;
                    border: 0;
                    font-size: 16pt;
                    border-radius: 5px;
                    background-color: red;
                    color: white;
                    &:hover{
                        cursor: pointer;
                        border: 1px solid black;
                    }
                }
                .labelq{
                    margin-left: 3vw;
                    font-size: 16pt;
                }
                .inputq{
                    font-size: 16pt;
                    margin-top: 4vh;
                }
                .inputradio{
                    font-size: 16pt;
                    margin-top: 4vh;
                    width: 15vw;
                }
                label{
                    font-size: 16pt;
                }
                .inputcheckbox{
                    font-size: 16pt;
                    margin-top: 4vh;
                    width: 15vw;
                }
            }
            .addQuestionBot{
                width: 90vw;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 2vh;
                overflow: auto;
                table {
                    width: 90%;
                    border-collapse: collapse;
                }
                th, td {
                    border: 1px solid black;
                    padding: 10px;
                    text-align: center;
                    input{
                        width: 20px;
                        height: 20px;
                    }
                }
                th {
                    background-color: rgb(187, 186, 186);
                }
            }
        }
        .addQuestionEdit{
            position: absolute;
            width: 100vw;
            height: 100vh;
            background-color: rgb(0, 0, 0,0.6);
            top: 0;
            left: 0;
            .editArea{
                position: absolute;
                width: 30vw;
                height: 50vh;
                background-color: white;
                transform: translate(-50%,-50%);
                top: 50%;
                left: 50%;
                text-align: center;
                input{
                    margin: 0 1vw;
                    margin-top: 2vh;
                    border: 1px solid black;
                    font-size: 16pt;
                    
                }
                label{
                    font-size: 16pt;
                }
                .editAreaBot{
                    margin-top: 2vh;
                }
                .editAreaBtn{
                    margin-top: 8vh;
                    button{
                        margin: 0 2vw;
                        font-size: 16pt;
                        border: 0;
                        background-color: gray;
                        color: white;
                        transition: 1s;
                        border-radius: 5px;
                    }
                }
                select{
                    margin: 0 2vw;
                    border: 1px solid black;
                    font-size: 16pt;
                }
            }

        }
        .bot{
            width: 90vw;
            height: 10vh;
            display: flex;
            justify-content: center;
            align-items: center;
            border-top: 2px solid black;
            .buttont{
                width: 10vw;
                height: 5vh;
                background-color: transparent;
                margin: 0 1vw;
                border: 0;
                border-radius: 5px;
                color: white;
            }
            .chancel{
                background-color: gray;
            }
            .send{
                background-color: rgb(59, 161, 59);
            }
        }
    }
}
</style>
