<script>
import {mapState,mapActions} from 'pinia'
import day from '../stores/day'
export default{
    data(){
        return{ 
                //作答頁跟確認頁轉換
                page:1,
               // 從pinya拿到home給我們的問卷標題
                fromPinyaQn:[],
                //從方法拿到的問卷小問題們
                questionArr:[],
                //綁定及時的姓名,年紀，信箱，手機
                answerName:"",
                answerPhone:"",
                answerEmail:"",
                answerAge:"",
            

        }
    },
    components:{
    },
    methods:{
        goconfirm(){
        this.createCheckQuestion();
        this.page = 2 
        },
        backconfirm(){
        this.page = 1 
        },
        //生成作答問題===========================================================
        createQuestion(){

            // 將問題和選項生成到此元素中
            const createQuestionPlace = document.getElementById('createQuestionPlace');

            this.questionArr.forEach(question => {
                // 創建問題的容器 div
                const questionDiv = document.createElement('div');
                // 添加問題標題
                const questionTitle = document.createElement('p');
                questionTitle.textContent =question.quid+"."+ question.qtitle;
                questionTitle.setAttribute('style', 'font-size: 16pt;font-weight: bold;'); //小問題設定字型大小
                questionDiv.appendChild(questionTitle);
                //創建必填
                if(question.necessary==true){
                    const notionMustAnswer = document.createElement('p');
                    notionMustAnswer.textContent ="此題必填"
                    questionDiv.appendChild(notionMustAnswer);
                    notionMustAnswer.setAttribute('style', 'font-size: 10pt;color:red; margin: 0;');
                }
                // 拆分選項（假設選項以分號分隔）
                const options = question.option.split(';');
                for(let i =0 ; i<options.length;i++){
                    options[i] = (i+1)+"."+options[i]
                }
                // 遍歷選項，創建並添加選項到問題容器中
                options.forEach(option => {
                const label = document.createElement('label');
                const input = document.createElement('input');
                if(question.optionType=="單選"){
                    input.setAttribute('type', 'radio'); //取決於 optionType
                    input.setAttribute('value', option); //設定被勾選的value值
                    var a = question.quid.toString();
                    input.setAttribute('id', a); //設獨特的idkey
                    input.setAttribute('name',a); //因為是單選所以名子要設定一樣只能有一個答案
                    input.setAttribute('tagName',"單選"); 
                    label.appendChild(document.createTextNode(option));
                    if(question.necessary==true){
                        input.setAttribute('required',true); //設獨特的idkey
                    }
                    
                }
                if(question.optionType=="多選"){
                    input.setAttribute('type', 'checkbox'); // 取決於 optionType
                    input.setAttribute('value', option); //設定被勾選的value值
                    var a = question.quid.toString();
                    input.setAttribute('id', a); //設獨特的idkey
                    input.setAttribute('tagName',"多選"); 
                    label.appendChild(document.createTextNode(option));
                    if(question.necessary==true){
                        input.setAttribute('required',true); //設獨特的idkey
                    }
                }
                if(question.optionType=="文字回答"){
                    input.setAttribute('type', 'textarea'); // 取決於 optionType
                    input.setAttribute('style', 'width: 300px; height: 50px;resize: none;');
                    input.setAttribute('rows', '5');
                    input.setAttribute('cols', '33');
                    var a = question.quid.toString();
                    input.setAttribute('id', a); //設獨特的idkey
                    input.setAttribute('tagName',"文字"); 
                    if(question.necessary==true){
                        input.setAttribute('required',true); //設獨特的idkey
                    }
                }
                label.appendChild(input);
                questionDiv.appendChild(label);
                });
                // 將問題容器添加到整體容器中
                createQuestionPlace.appendChild(questionDiv);
            });

        },
        //生成確認答案===========================================================
        createCheckQuestion(){
            // // 获取 createQuestionPlace 中所有的 input 元素
            // const inputs = document.querySelectorAll('#createQuestionPlace input');
            // // 创建一个对象，用于存储每个 input 元素的值
            // const inputValues = [];
            // // 遍历所有 input 元素并将它们的值存储到 inputValues 对象中
            // inputs.forEach(input => {
            //     const inputId = input.id; // 获取 input 元素的 id 或者其他属性
            //     const inputValue = input.value; // 获取 input 元素的值
            //     const inputchecked = input.checked; // 获取 input 元素的值
            //     const inputRequired = input.required; // 获取 input 元素的值
            //     let obj={
            //         id:inputId,
            //         value:inputValue,
            //         check:inputchecked,
            //         required:inputRequired

            //     }
            //     inputValues.push(obj); 
            // });
            // // 现在 inputValues 对象中存储了每个 input 元素的值，可以根据需要使用这些值
            // console.log('所有 input 元素的值:', inputValues);
            // console.log(this.questionArr)
            var radioArr=[];
            var checkboxArr=[];
            var textArr=[];


            const form = document.getElementById('createQuestionPlace');
            const radioAnswers = {};

            const radioInputs = form.querySelectorAll('input[type="radio"]:checked');
            radioInputs.forEach(input => {
                const questionName = input.getAttribute('name');
                const answer = input.value;
                radioAnswers[questionName] = answer;
                radioArr.push(answer)
            });
            console.log('單選按鈕作答答案：', radioAnswers);
//==========================================================================================
            const form1 = document.getElementById('createQuestionPlace');
            const checkboxAnswers = {};

            const checkboxInputs = form.querySelectorAll('input[type="checkbox"]:checked');
            checkboxInputs.forEach(input => {
                const questionName = input.getAttribute('name');
                const answer = input.value;

                if (!checkboxAnswers[questionName]) {
                    checkboxAnswers[questionName] = [answer];
                } else {
                    checkboxAnswers[questionName].push(answer);
                }
                checkboxArr.push(checkboxAnswers.null)
            });
            console.log('多選框作答答案：', checkboxAnswers.null);
            // 可以將答案進行其他處理或儲存
//==========================================================================================
            const form2 = document.getElementById('createQuestionPlace');
                const textAnswers = {};

                const textInputs = form.querySelectorAll('input[type="textarea"]');
                textInputs.forEach(input => {
                    const questionName = input.getAttribute('name');
                    const answer = input.value;
                    textAnswers[questionName] = answer;
                    textArr.push(answer)
                });
                console.log('文字輸入框作答答案：', textArr);
                // 可以將答案進行其他處理或儲存

            




            // 將問題和選項生成到此元素中
            const checkQuestionPlace = document.getElementById('checkQuestionPlace');
            // 遍歷問題列表
            this.questionArr.forEach(question => {
                    var answer = "";
                    // 創建問題的容器 div
                    const questionDiv = document.createElement('div');
                    if(question.optionType=="單選"){
                        answer =radioArr[0]
                    }
                    if(question.optionType=="多選"){
                        answer = checkboxArr[0]
                    }
                    if(question.optionType=="文字回答"){
                        answer =textArr[0]
                    }

                    // 添加問題標題
                    const questionTitle = document.createElement('p');
                    questionTitle.textContent =question.quid+"."+ question.qtitle;
                    const questionAnswer = document.createElement('p');
                    questionAnswer.textContent = answer

                    questionTitle.setAttribute('style', 'font-size: 16pt;font-weight: bold;'); //小問題設定字型大小
                    questionDiv.appendChild(questionTitle);
                    questionDiv.appendChild(questionAnswer);
                    // 將問題容器添加到整體容器中
                    checkQuestionPlace.appendChild(questionDiv);

                    if(question.optionType=="單選"){
                        radioArr.splice(0,1)
                    }
                    if(question.optionType=="多選"){
                        checkboxArr.splice(0,1)
                    }
                    if(question.optionType=="文字回答"){
                        textArr.splice(0,1)
                    }
            });
        },
        // pinya執行方法獲得方法
        ...mapActions(day,["getTellVoteWhichOne","searchAllQnIsPublished","getfromPinyaQn","getquestionArr","setquestionArr"]),
    },
    computed:{
        // 抓取pinia裡面的已出版問卷
        ...mapState(day,["isPublishedQnArr"])
    },
    beforeMount(){

    },
    created(){  



    },
    mounted(){
        // // 告訴pinya我要以出版的問卷
        // this.searchAllQnIsPublished();

        this.fromPinyaQn  = this.getfromPinyaQn();
        this.questionArr  = this.getquestionArr();
        //創建問卷可以作答
        this.createQuestion();



    },
    unmounted(){
        this.fromPinyaQn  = [];
        this.questionArr  = [];
    },
    updated(){
        // console.log(this.isPublishedQnArr)
        // console.log(this.getTellVoteWhichOne())
    }
}
</script>

<template>
    <div v-show="page==1" class="bg">  
        <h1>請輸入問卷</h1>
        <div class="answerPlace">
            <h1>{{this.fromPinyaQn.title}}</h1>
            <p style="font-weight: bold;">內容:{{this.fromPinyaQn.description}}</p>
            <label for="">姓名:</label>
            <input type="text" v-model="this.answerName"><br>
            <label for="" >手機:</label>
            <input type="text" v-model="this.answerPhone"><br>
            <label for="">信箱:</label>
            <input type="text" v-model="this.answerEmail"><br>
            <label for="">年齡:</label>
            <input type="text" v-model="this.answerAge">
            <!-- //下面是自動生成的 -->
            <div id="createQuestionPlace" class="questionPlace">
            </div>
        </div>

        <button @click="goconfirm" type="button">提交並且前往確認</button>
    </div>
    <div v-show="page==2" class="bg2">  
        <h1>請確認問卷</h1>
        <div class="checkAnswerPlace">
            <h1>{{this.fromPinyaQn.title}}</h1>
            <p  style="font-weight: bold;">內容:{{this.fromPinyaQn.description}}</p>
            <p class="pp" for="" style="font-weight: bold;font-size: 16pt;font-family:'微軟正黑體';margin-left: 10vw;">姓名:{{this.answerName==""?"你還沒填個人資訊":this.answerName}}</p>
            <p class="pp" for="" style="font-weight: bold;font-size: 16pt;font-family:'微軟正黑體';margin-left: 10vw;">手機:{{this.answerPhone==""?"你還沒填個人資訊":this.answerPhone}}</p>
            <p class="pp" for="" style="font-weight: bold;font-size: 16pt;font-family:'微軟正黑體';margin-left: 10vw;">信箱:{{this.answerEmail==""?"你還沒填個人資訊":this.answerEmail}}</p>
            <p class="pp"  for="" style="font-weight: bold;font-size: 16pt;font-family:'微軟正黑體';margin-left: 10vw;">年紀:{{this.answerAge==""?"你還沒填個人資訊":this.answerAge}}</p>
            <!-- //下面是自動生成的 -->
            <div id="checkQuestionPlace" class="checkquestionPlace">
            </div>
        </div>

        <button @click="backconfirm" type="button">返回更改答案</button>
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
    .answerPlace{
        width: 80vw;
        min-height:70vh;
        background-color: rgb(218, 218, 218);
        padding: 3% 3%;

        h1{

            text-align: center;
        }
        p{
            font-size: 16pt;
            text-align: center;
        }
        label{
            font-size: 16pt;
            font-weight: bold;
        }
        input{
            font-size: 16pt;
            margin-bottom: 2vh;
        }
        .questionPlace{
        background-color: rgb(218, 218, 218);
        border-radius: 5px;
            label{
                font-size: 16pt;
                font-weight: bold;
            }
        }
    }
  
    button{
        margin: 2% 2%;
        border: 0;
        width: 150px;
        height: 50px;
        border-radius: 5px;
    }
}

.bg2{
    width: 100vw;
    background-color: #00A9FF;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .checkAnswerPlace{
        width: 80vw;
        min-height:70vh;
        background-color: rgb(218, 218, 218);
        padding: 3% 3%;

        h1{

            text-align: center;
        }
        label{
            font-size: 16pt;
            font-weight: bold;
        }
        input{
            font-size: 16pt;
            margin-bottom: 2vh;
        }
        .checkquestionPlace{
        background-color: rgb(218, 218, 218);
        border-radius: 5px;
            label{
                font-size: 16pt;
                font-weight: bold;
            }
        }
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
