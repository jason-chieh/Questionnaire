<script>
import {mapState,mapActions} from 'pinia'
import day from '../stores/day'

export default{
    data(){
        return{
            // 拿到全部問卷
            allQuestionnaire:[],
            allQnQu:[],
            //拿到最新問卷的id
            lastestId:0,
            // 題目標題跟題目製作畫面切換
            page:1,
            editPage:1,

            // 問卷的陣列
            question_list:[],
            // 選擇問題的陣列索引
            indexArr:[],

            // 問卷小問題的內容
            question:"",
            // quNum:1,
            mustbechoose:"",
            questionanswer:"",
            selectMode:"",
            //問卷的總標題+描述內容+時間
            questionnaireName:"",
            questionnaireContent:"",
            questionnaireStartDate:"",
            questionnaireEndDate:"",
            // 問卷問題的編輯索引直
            // questionEditKey:0,
            //編輯裡面的資料
            editQuestion:"",
            editQuestionanswer:"",
            editMustbechoose:"",
            editType:"",
            editIndex:0,  //單一問題的索引值

            updateNum:-1,
            
        }
    },
    methods:{
        goCheckPage(){
            this.createQuestion();
            this.allQnQu.length==0 ? this.page=2.5:this.page=2.6

        },
        goCalCircle(){
            this.page=4
        },
        goPeople(){
            this.page=3
        },
        goQuestion(){
            this.delCheckParamQuestion();
            this.page=2
        },
        goTitle(){
            this.page=1
        },
        gotoback(){
            this.$router.push("/backView")
        },
        // 從確認頁前往後端新增並發布
        gotobackAndAddAndPublished(){
            var url = "http://localhost:8081/api/quiz/create";
            var data = {
                "questionnaire":{
                    "title":this.questionnaireName,
                    "description":this.questionnaireContent,
                    "published":true,
                    "startDate":this.questionnaireStartDate,
                    "endDate":this.questionnaireEndDate
                },
                "question_list":this.question_list
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
            
            this.$router.push("/backView")
        },
        // 從確認頁前往後端新增
        gotobackAndAdd(){
            this.addquestionnaire();
            this.$router.push("/backView")
        },
        // 從確認頁前往後端更新
        gotobackAndUpdate(){
            this.updatequestionnaire();
            this.$router.push("/backView")
        },
        //前往單一問題的編輯頁
        goedit(index){
            this.editPage=2
            
            this.editIndex = index
            this.editQuestion=this.question_list[index].qtitle
            this.editQuestionanswer=this.question_list[index].option
            this.editMustbechoose=this.question_list[index].necessary
            this.editType=this.question_list[index].optionType

        },
        goeditBack(){
            this.editPage=1
        },
        // 確定編輯後返回多個小問題
        goeditBackAndUpdate(){
            this.editPage=1

            let index = this.editIndex
            this.question_list[index].qtitle=this.editQuestion
            this.question_list[index].option= this.editQuestionanswer
            this.question_list[index].necessary=this.editMustbechoose
            this.question_list[index].optionType=this.editType

        },
        // pinia抓取時間
        ...mapActions(day,["getCurrentDate","geteditQuestionnaire","searchAllQna"]),



        // 前端新增問題們
        addQuestion(){
            if(this.allQnQu.length!=0){
                this.lastestId--
            }
            let questionObj={
                quid:this.question_list.length+1,
                qnid:this.lastestId,
                qtitle:this.question,
                optionType:this.selectMode.length==0 ?"文字回答":this.selectMode,
                necessary:this.mustbechoose,
                option:this.questionanswer.length==0 ?"打字回答~":this.questionanswer,
            }
            console.log(questionObj.option)
            this.question_list.push(questionObj)
            this.indexArr.push(false)
            this.question = ""
            this.mustbechoose = ""
            this.questionanswer = ""
        },
        // 前端刪除問題們
        delQuestion(){
            // 把問卷checkbox索引直放到陣列 並把key值抓出來判斷然後刪掉問卷陣列的問題
            for (let i = 0; i < this.indexArr.length; i++) {
                if (this.indexArr[i] == true) {
                    this.question_list.splice(i, 1);
                    this.indexArr.splice(i, 1);
                    i--
                }
            }


            // 重新判斷問題索引值
            for (let i = 0; i < this.question_list.length; i++) {
                if(this.question_list[i].quid !=i+1){
                    this.question_list[i].quid=i+1
                }
            }
        
        },




        // 前往後端新增整個問卷加上問題
        addquestionnaire(){
            var url = "http://localhost:8081/api/quiz/create";
            var data = {
                "questionnaire":{
                    "title":this.questionnaireName,
                    "description":this.questionnaireContent,
                    "published":false,
                    "startDate":this.questionnaireStartDate,
                    "endDate":this.questionnaireEndDate
                },
                "question_list":this.question_list
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
        },
        // 前往後端  更新  整個問卷加上問題
        updatequestionnaire(){
            var url = "http://localhost:8081/api/quiz/update";
            var data = {
                "questionnaire":{
                    "id":this.updateNum,
                    "title":this.questionnaireName,
                    "description":this.questionnaireContent,
                    "published":false,
                    "startDate":this.questionnaireStartDate,
                    "endDate":this.questionnaireEndDate
                },
                "question_list":this.question_list
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
        },
        // 前往後端搜尋全部問卷
        searchAllQn(){
            const url = 'http://localhost:8081/api/quiz/searchQuestionnaireList1';
            // 要帶入的值
            const queryParams = new URLSearchParams({
            title: "",
            startDate:"",
            endDate: "",
            isPublished:false
            });

            // 將查詢字串附加到 URL
            const urlWithParams = `${url}?${queryParams}`;

            fetch(urlWithParams, {
            method: "GET", 
            headers: new Headers({
                "Accept":"application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin":"*"
            }),
            })
            .then(response => {
            // 將API回應轉換為JSON格式
            return response.json();
            })
            .then(data => {
            // 將API回應的JSON數據設置到組件的responseData數據屬性中
            this.allQuestionnaire = data;
            this.allQuestionnaire = this.allQuestionnaire.questionnaireList;
            this.allQuestionnaire = this.allQuestionnaire.reverse();
            this.lastestId = (this.allQuestionnaire[0].id)+1;
            // console.log(this.allQuestionnaire)

            })
        },


        //生成確認問題
        createQuestion(){
        
            // 將問題和選項生成到此元素中
            const createQuestionPlace = document.getElementById('createQuestionPlace');

            // 遍歷問題列表
            this.question_list.forEach(question => {
            if(question.option=="null"){

            }
            // 如果問題標題不為空
            if (question.qtitle.trim() !== '') {
                // 創建問題的容器 div
                const questionDiv = document.createElement('div');

                // 添加問題標題
                const questionTitle = document.createElement('p');
                questionTitle.textContent =question.quid+"."+ question.qtitle;
                questionDiv.appendChild(questionTitle);

                // 拆分選項（假設選項以分號分隔）
                const options = question.option.split(';');
                // 遍歷選項，創建並添加選項到問題容器中
                options.forEach(option => {
                const label = document.createElement('label');
                const input = document.createElement('input');
                if(question.optionType=="單選"){
                    input.setAttribute('type', 'radio'); //取決於 optionType
                    label.appendChild(document.createTextNode(option));
                }
                if(question.optionType=="多選"){
                    input.setAttribute('type', 'checkbox'); // 取決於 optionType
                    label.appendChild(document.createTextNode(option));
                }
                if(question.optionType=="文字回答"){
                    input.setAttribute('type', 'textarea'); // 取決於 optionType
                    input.setAttribute('style', 'width: 300px; height: 50px;resize: none;');
                    input.setAttribute('rows', '5');
                    input.setAttribute('cols', '33');
                }

                // // 假設值為選項內容
                // input.setAttribute('value', option);

                label.appendChild(input);
                // label.appendChild(document.createTextNode(option));
                questionDiv.appendChild(label);
                });

                // 將問題容器添加到整體容器中
                createQuestionPlace.appendChild(questionDiv);
            }
            });

        },
        // 刪除確認頁跳出的確認問題
        delCheckParamQuestion(){
            const createQuestionPlace = document.getElementById('createQuestionPlace');

            // 檢查是否找到了該 div 元素
            if (createQuestionPlace !== null) {
            // 移除所有子元素
            while (createQuestionPlace.firstChild) {
                createQuestionPlace.removeChild(createQuestionPlace.firstChild);
            }
            } else {
            console.error('找不到指定的 div 元素');
            }

        }
    },
    computed:{
    // 抓取pinia裡面算出的值今天日期跟七天後
    ...mapState(day,["nowday","twoday","sevenday","twodayS","allQuestionnaireA"])
    },
    mounted(){
        // 抓取日期
        this.getCurrentDate()
        // 要把值設定給畫面
        const logindate = document.getElementById('logindate')
        const sevendate = document.getElementById('sevendate')
        this.questionnaireStartDate = this.twoday
        this.questionnaireEndDate = this.twodayS
        logindate.value = this.twoday
        sevendate.value = this.twodayS

        // pinya收尋後端問卷    結束的時候也要在收尋一次做更新!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        this.searchAllQna();

        //去後端抓取問卷資料
        this.searchAllQn();


        //抓取要編輯的問卷代碼   要編輯的話才會跑進來喔~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        let x = this.geteditQuestionnaire();
        this.updateNum = x;
        
        if(x!=-1){
            // console.log(this.lastestId)
            const arr = this.allQuestionnaireA.quizVoList
            this.allQnQu = arr
            var longlong =this.allQnQu.length
            // console.log(this.allQnQu)
            for(let i = 0 ; i< longlong ; i++){
                if(this.allQnQu[i].questionnaire.id==x){
                    this.questionnaireName = this.allQnQu[i].questionnaire.title;
                    this.questionnaireContent = this.allQnQu[i].questionnaire.description;
                    this.questionnaireStartDate =this.allQnQu[i].questionnaire.startDate;
                    this.questionnaireEndDate = this.allQnQu[i].questionnaire.endDate;
                    this.question_list = this.allQnQu[i].question_list
                    
                }
                
            }
            return
        }

        console.log("不編輯")

        
    },
    unmounted(){
        // pinya收尋後端問卷
        this.searchAllQna();
    },
    updated(){
        // const checkboxt = document.getElementById("checkboxt")
        // console.log(this.indexArr)
        // console.log(this.question_list)
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
                <button @click="goPeople" type="button">問卷回饋</button>
                <button @click="goCalCircle" type="button">統計圖表</button>
            </div>

            <!-- 問卷標題跟問卷內容 -->
            <div v-if="page==1" class="questionTitle">
                <div class="titleContent">
                    <label for="">問卷名稱:</label>
                    <input type="text" v-model="this.questionnaireName"><br>
                    <label for="">描述內容:</label>
                    <input type="text"  v-model="this.questionnaireContent"><br>
                    <label for="">開始時間:</label>
                    <input id="logindate" type="date" v-model="this.questionnaireStartDate"><br>
                    <label for="">結束時間:</label>
                    <input id="sevendate" type="date" v-model="this.questionnaireEndDate"><br>
                </div>
            </div>
            <!-- 問卷問題們 -->
            <div v-if="page==2" class="addQuestion">
                <div  class="addQuestionTop">
                    <label class="labelq" for="">問題:</label>
                    <input class="inputq"  type="text" v-model="question">

                    <select id="selectqu" class="selectq"  v-model="selectMode" >
                        <option value="">請選擇</option>
                        <option id="one" value="文字回答" >文字回答</option>
                        <option id="two" value="單選">單選</option>
                        <option id="three" value="多選">多選</option>
                    </select>

                    <input class="checkboxq" type="checkbox" v-model="mustbechoose" value="必填">
                    <label  for="">必填</label><br>
                    <label class="labelq" for="">選擇答案:</label>
                    <input class="inputq" type="text" v-model="questionanswer">
                    <button @click="addQuestion" class="addBtn" type="button">送出</button>
                    <button @click="delQuestion" class="delBtn" type="button">刪除</button>
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
                            <tr v-for="item,index in question_list" >
                                <td ><input type="checkbox" id="checkboxt" :key="index" v-model="indexArr[index]"></td>
                                <td >{{item.quid}}</td>
                                <td ><a href="#">{{item.qtitle}}</a></td>
                                <td>{{item.optionType}}</td>
                                <td>{{item.necessary? "必填":"選填"}}</td>
                                <td @click="goedit(index)"><a href="#" :key="index" >編輯</a></td>
                            </tr>
                            <!-- 可以继续添加更多的行 -->
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- 確認頁面表 -->
            <div v-show="page==2.5||page==2.6" class="checkPage">
                <h1>{{this.questionnaireName}}</h1>
                <p style="font-weight: bold;">內容:{{this.questionnaireContent}}</p>
                <label for="">姓名:</label>
                <input type="text"><br>
                <label for="">手機:</label>
                <input type="text"><br>
                <label for="">信箱:</label>
                <input type="text"><br>
                <label for="">年齡:</label>
                <input type="text">
                <div id="createQuestionPlace" class="questionPlace">
                        

                </div>
            </div>
            <!-- 問卷回饋的人 -->
            <div v-if="page==3" class="questionPeople">
            </div>
            <!-- 統計圖表 -->
            <div v-if="page==4" class="circleCal">
            </div>

            <!-- 編輯畫面 -->
            <div v-if="editPage==2" class="addQuestionEdit">
                <div class="editArea">
                    <h1 >問題編輯</h1>
                    <label for="">問題:</label>
                    <input type="text" v-model="editQuestion" ><br>
                    <label for="">答案:</label>
                    <input type="text" v-model="editQuestionanswer">

                    <div class="editAreaBot">
                        <select  name="" id=""  v-model="editType" >
                            <option  value="文字回答" >文字回答</option>
                            <option  value="單選">單選</option>
                            <option  value="多選">多選</option>
                        </select>
                    <input  type="checkbox" value="true" v-model="editMustbechoose">
                    <label  for="">必填</label><br>
                    </div>
                    <div class="editAreaBtn">
                        <button @click="goeditBack" type="button">取消</button>
                        <button @click="goeditBackAndUpdate" type="button">確定修改</button>
                    </div>
                </div>
            </div>

            <!-- 底下的按鈕跳轉頁們 -->
            <div v-show="page==1" class="bot">
                <button @click="gotoback" class="chancel buttont" type="button">取消</button>
                <button @click="goQuestion" class="send buttont" type="button">下一步</button>
            </div>
            <div v-show="page==2" class="bot">
                <button @click="goTitle" class="chancel buttont" type="button">上一步</button>
                <button @click="goCheckPage" class="send buttont" type="button">前往確認頁</button>
            </div>
            <!-- 確認頁面的底下 -->
            <div v-show="page==2.5" class="bot">
                <button @click="goQuestion" class="chancel buttont" type="button">取消新增回編輯</button>
                <button @click="gotobackAndAdd" class="send buttont" type="button">確定新增</button>
                <button @click="gotobackAndAddAndPublished" class="send buttont" type="button">新增並馬上發布</button>
            </div>
            <div v-show="page==2.6" class="bot">
                <button @click="goQuestion" class="chancel buttont" type="button">取消更新</button>
                <button @click="gotobackAndUpdate" class="send buttont" type="button">更新</button>
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
        // 新增問題標題
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
                button{
                    width: 100px;
                    height: 30px;
                    background-color: rgb(209, 139, 53);
                    margin-top: 20vh;
                    margin-left: 10vw;
                    border: 0;
                    border-radius: 5px;
                    color: white;
                    font-size: 16pt;
                }
            }
        }
        // 新增問題
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
            .botBtn{
                width: 100px;
                height: 30px;
                background-color: rgb(209, 139, 53);
                margin-left: 10vw;
                margin-top: 5vh;
                border: 0;
                border-radius: 5px;
                color: white;
                font-size: 16pt;
            }
        }
        .checkPage{
            width: 80vw;
            height: 60vh;
            padding-left: 10vw;
            overflow: auto;
            background-color: white;
            h1{
                width: 50vw;
            }
            p{
                width: 50vw;
            }
            input{
                font-size: 16pt;
                margin-bottom: 2vh;
            }
            .questionPlace{
                width: 70vw;
                border: 1px solid black;
                padding: 2% 2%;
                margin-bottom: 5vh;
            }
        }
        // 問卷回饋的人
        .questionPeople{
            width: 90vw;
            height: 60vh;
            background-color: pink;
        }
        // 統計圖表
        .circleCal{
            width: 90vw;
            height: 60vh;
            background-color: pink;
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
