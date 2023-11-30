<script>
import {mapState,mapActions} from 'pinia'
import Swal from 'sweetalert2'
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
                //創立一個答案陣列依序
                AllanswerArr:[],

                //綁定及時的姓名,年紀，信箱，手機
                answerName:"",
                answerPhone:"",
                answerEmail:"",
                answerAge:"",
                // //建立必填問題檢查碼
                MustBeAnswerNum:0,
                //此問卷的大號碼
                thisQnNumber:0,
                // 定義正規表式---綁定及時的姓名,年紀，信箱，手機
                nameRegex: /^\D+$/,
                phoneRegex: /^\d{10}$/,
                emailRegex: /@/,
                ageRegex: /^\d+$/

        }
    },
    components:{
    },
    methods:{
        gohomePage(){
            this.$router.push("./")
        },
        // 特效提示框基本資料沒填
        specialNotion12(){
            Swal.fire({
                title: '請確實填寫個人資料!',
                text: '',
                icon: 'error',
                confirmButtonText: 'ok'
                })
        },
        // 特效提示框必填沒填
        specialNotion2(){
            Swal.fire({
                title: '必填沒填!',
                text: '',
                icon: 'error',
                confirmButtonText: 'ok'
                })
        },
        //前往確認頁
        goconfirm(){
            //檢查基本資料有沒有填
            if (!this.nameRegex.test(this.answerName) || !this.phoneRegex.test(this.answerPhone) || !this.emailRegex.test(this.answerEmail) || !this.ageRegex.test(this.answerAge)) {
                    this.specialNotion12()
                    return
            }
            this.createCheckQuestion();



            if(this.MustBeAnswerNum!=0){
                this.specialNotion2();
                this.MustBeAnswerNum=0
                 //=================================把確認頁先清空
                const checkquestionPlace = document.getElementById('checkQuestionPlace');
                // 取得父級 div 的所有子級 div
                const childDivs = checkquestionPlace.querySelectorAll('div');
                // for所有子級 div 並刪除它們
                childDivs.forEach(childDiv => {
                    childDiv.remove();
                });
                return
            }else{
                this.page = 2 
            }
            
        },
        //回去作答頁
        backconfirm(){
            this.page = 1 

            //=================================把確認頁先清空
            // 取得父級 div
            const checkquestionPlace = document.getElementById('checkQuestionPlace');
            // 取得父級 div 的所有子級 div
            const childDivs = checkquestionPlace.querySelectorAll('div');
            // 迭代所有子級 div 並刪除它們
            childDivs.forEach(childDiv => {
                childDiv.remove();
            });
            
        },

        //生成作答問題===========================================================
        createQuestion(){
            // 將問題和選項生成到此元素中
            const createQuestionPlace = document.getElementById('createQuestionPlace');

            this.questionArr.forEach(question => {
                // 創建一個專門放答案得陣列
                let answerString = "該使用者未作答";
                this.AllanswerArr.push(answerString)
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
                    // this.MustBeAnswerNum++
                        
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
                                input.setAttribute('required',true); 
                                console.log("你好")
                            }
                            // input.setAttribute('required',false); 
                            
                        }
                        if(question.optionType=="多選"){
                            input.setAttribute('type', 'checkbox'); // 取決於 optionType
                            input.setAttribute('value', option); //設定被勾選的value值
                            var a = question.quid.toString();
                            input.setAttribute('id', a); //設獨特的idkey
                            input.setAttribute('tagName',"多選"); 
                            // input.setAttribute('name',a); //因為是單選所以名子要設定一樣只能有一個答案
                            label.appendChild(document.createTextNode(option));


                            if(question.necessary==true){
                                input.setAttribute('required',true);
                                console.log("你好")
                            }
                            // input.setAttribute('required',false); 
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
                                input.setAttribute('required',true);
                                console.log("你好")
                            }
                            // input.setAttribute('required',false); 
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

            // 創建各個答案的陣列
            var radioArr=[];
            var checkboxArr=[];
            var textArr=[];
            //開始去尋找type為radio的答案
            const form = document.getElementById('createQuestionPlace');



//=======================================================================================
            const radioAnswers = {};
            const radioInputs = form.querySelectorAll('input[type="radio"]:checked');



            radioInputs.forEach(input => {
                const questionName = input.getAttribute('name');
                const answer = input.value;
                radioAnswers[questionName] = answer;
                radioArr.push(answer)
            });


            console.log('單選按鈕作答答案：', radioAnswers);
            console.log(typeof radioAnswers);
//========================================================================================
            const checkboxAnswers = {};
            const checkboxInputs = form.querySelectorAll('input[type="checkbox"]:checked');

            const checkboxInputsArray = [...checkboxInputs];
            console.log(typeof checkboxInputsArray)

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
            console.log(typeof checkboxAnswers);
            // 可以將答案進行其他處理或儲存
//==========================================================================================
                const textAnswers = {};
                const textInputs = form.querySelectorAll('input[type="textarea"]');


                textInputs.forEach(input => {
                    const questionName = input.getAttribute('name');
                    const answer = input.value;
                    textAnswers[questionName] = answer;
                    textArr.push(answer)
                });


                console.log('文字輸入框作答答案：', textArr);
                console.log(typeof textArr);

            




            // 將問題和選項生成到此元素中
            const checkQuestionPlace = document.getElementById('checkQuestionPlace');
            
            var AllanswerArrIndex = 0;
            // 遍歷問題列表
            this.questionArr.forEach(question => {

                    //設定一個空字串來裝答案
                    var answer = "";
                    // 創建問題的容器 div
                    const questionDiv = document.createElement('div');
                    if(question.optionType=="單選"){
                        answer =radioArr[0]
                        if(answer!=null){
                            this.AllanswerArr[AllanswerArrIndex]=answer
                        }
                        if(question.necessary==true&&answer==null){
                            this.MustBeAnswerNum++
                        }
                        if(answer==null){
                            this.AllanswerArr[AllanswerArrIndex]="該使用者未作答"
                            answer="該使用者未作答"
                        }
                    }
                    if(question.optionType=="多選"){
                        let answerArr = checkboxArr[0] 
                        if(answerArr!=null){
                            answerArr.forEach(input => {
                                answer=answer+input+";"
                            });
                            this.AllanswerArr[AllanswerArrIndex]=answer
                        }
                        if(question.necessary==true&&answerArr==null){
                            this.MustBeAnswerNum++
                        }
                        if(answerArr==null){
                            this.AllanswerArr[AllanswerArrIndex]="該使用者未作答"
                            answer="該使用者未作答"
                        }
                    }
                    if(question.optionType=="文字回答"){
                        answer =textArr[0]
                        if(answer!=""){
                            this.AllanswerArr[AllanswerArrIndex]=answer
                        }
                        if(question.necessary==true&&answer==""){
                            this.MustBeAnswerNum++
                        }
                        if(answer==""){
                            this.AllanswerArr[AllanswerArrIndex]="該使用者未作答"
                            answer="該使用者未作答"
                        }
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
                    
                    //判斷問題狀態是什麼把相對應陣列裡面得數字刪掉
                    if(question.optionType=="單選"){
                        radioArr.splice(0,1)
                    }
                    if(question.optionType=="多選"){
                        checkboxArr.splice(0,1)
                    }
                    if(question.optionType=="文字回答"){
                        textArr.splice(0,1)
                    }

                    AllanswerArrIndex++
                });

        },

        // //新增答案到後台
        addUserAnswer(){
                let i = 0 ;
                this.questionArr.forEach(question => {
                    const url = 'http://localhost:8081/api/quiz/addAnswer';
                    // 要帶入的值
                    var data = {
                        "user":{
                            "name":this.answerName,
                            "phoneNumber":this.answerPhone,
                            "email":this.answerEmail,
                            "age":parseInt(this.answerAge),
                            "qnid":this.thisQnNumber,
                            "qid":question.quid,
                            "ans":this.AllanswerArr[i]
                        }
                    };

                    fetch(url, {
                    method: "POST", // or 'PUT'
                    body: JSON.stringify(data), // data can be `string` or {object}!
                    headers: new Headers({
                        "Content-Type": "application/json",
                    }),
                    })
                    .then((res) => res.json())
                    .catch((error) => console.error("Error:", error))
                    .then((response) => console.log("Success:", response));
                    i++
                });

                this.$router.push("./")
                
        },
        // pinya執行方法獲得方法
        ...mapActions(day,["getTellVoteWhichOne","getfromPinyaQn","getquestionArr"]),
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

        this.fromPinyaQn  = this.getfromPinyaQn();
        this.questionArr  = this.getquestionArr();
        //創建問卷可以作答
        this.createQuestion();

        this.thisQnNumber = this.getTellVoteWhichOne()


    },
    unmounted(){
        this.fromPinyaQn  = [];
        this.questionArr  = [];
        this.MustBeAnswerNum =0;
    },
    updated(){
        console.log(this.thisQnNumber)
        // console.log(this.AllanswerArr)
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
            <div style="display: flex;" class="botBtn">
                <button @click="gohomePage" type="button">回首頁</button>
                <button @click="goconfirm" type="button">提交並且前往確認</button>
            </div>
    </div>
    <div v-show="page==2" class="bg2">  
        <h1>請確認問卷</h1>
        <div class="checkAnswerPlace">
            <h1>{{this.fromPinyaQn.title}}</h1>
            <p  style="font-weight: bold;text-align: center;">內容:{{this.fromPinyaQn.description}}</p>
            <p class="pp" for="" style="font-weight: bold;font-size: 16pt;font-family:'微軟正黑體';">姓名:{{this.answerName==""?"你還沒填個人資訊":this.answerName}}</p>
            <p class="pp" for="" style="font-weight: bold;font-size: 16pt;font-family:'微軟正黑體';">手機:{{this.answerPhone==""?"你還沒填個人資訊":this.answerPhone}}</p>
            <p class="pp" for="" style="font-weight: bold;font-size: 16pt;font-family:'微軟正黑體';">信箱:{{this.answerEmail==""?"你還沒填個人資訊":this.answerEmail}}</p>
            <p class="pp"  for="" style="font-weight: bold;font-size: 16pt;font-family:'微軟正黑體';">年紀:{{this.answerAge==""?"你還沒填個人資訊":this.answerAge}}</p>
            <!-- //下面是自動生成的 -->
            <div id="checkQuestionPlace" class="checkquestionPlace">
            </div>
        </div>
        <div  class="botBtn">
            <button @click="backconfirm" type="button">返回更改答案</button>
            <button @click="addUserAnswer" type="button">新增你的答案</button>
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
        border: 1px solid black;
            label{
                font-size: 16pt;
                font-weight: bold;
            }
        }
    }
    .botBtn{
        display: flex;
        button{
        margin: 2% 2%;
        border: 0;
        width: 150px;
        font-weight: bold;
        font-size: 14pt;
        height: 50px;
        border-radius: 5px;
        background-color: rgb(80, 80, 248);
    }
    }

}
</style>
