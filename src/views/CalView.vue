<script>
import { sassNull } from 'sass';
import {mapState,mapActions} from 'pinia'
import day from '../stores/day'
import Swal from 'sweetalert2'
import Chart from 'chart.js/auto';

export default{
    data(){
        return{
            //先拿問卷編號
            thisQnNumber:0,
            //然後把此問卷的作答者抓出來
            allUserData:{},
            //再把問題跟問卷抓出來
            allQnData:{},

            //作答者答案的陣列
            userDataArr:[],

            // 問題題目陣列
            questionArr:[]



        }
    },
    methods: {
        // 把題目的問題生出來
        createQuestion(){  
            //命名等等要生成的位置
            const questionPlaceId = document.getElementById("questionPlaceId")
            this.questionArr = this.allQnData.question_list
            


            // 把問題一個一個抓出來生成東西
            this.questionArr.forEach(question=>{
                
                // 創建問題的容器 div 並且設定樣式
                const LeftQuestionDiv = document.createElement('div');
                LeftQuestionDiv.setAttribute("class","LeftQuestionDiv")
                LeftQuestionDiv.setAttribute("style","padding: 2% 2%;")
                const questionDiv = document.createElement('div');
                questionDiv.setAttribute('style', 'min-height:50vh;min-width:70vh;margin-bottom: 5vh;background-color:pink;display: flex;'); 
                // 添加問題標題
                const questionTitle = document.createElement('p');
                //設定問題標題 並且設定樣式
                questionTitle.textContent =question.quid+"."+ question.qtitle;
                questionTitle.setAttribute('style', 'font-size: 20pt;font-weight: bold;margin: 0 0 ;width:70vh'); //小問題設定字型大小
                // 把問題名稱塞進div包起來
                questionDiv.appendChild(questionTitle);


                // 新增一個答案show出區
                const questionAnswer = document.createElement('div');
                questionAnswer.setAttribute('style', 'height:40vh;width:50vh;overflow: auto')
                questionAnswer.setAttribute('id', question.quid)




                        // // 拆分選項（假設選項以分號分隔）
                        // const options = question.option.split(';');
                        // for(let i =0 ; i<options.length;i++){
                        //     options[i] = (i+1)+"."+options[i]
                        // }
                        if(question.optionType=="單選"){
                            questionTitle.textContent =  questionTitle.textContent +"--單選題"
                        }
                        if(question.optionType=="多選"){
                            questionTitle.textContent =  questionTitle.textContent +"--多選題"
                        }
                        if(question.optionType=="文字回答"){
                            questionTitle.textContent =  questionTitle.textContent +"--文字回答"
                        }
                        //假如有必填
                        if(question.necessary==true){
                            questionTitle.textContent = questionTitle.textContent+"--(必填)"
                            questionTitle.setAttribute('style',"font-size: 20pt;font-weight: bold;margin: 0 0 ;width:70vh;color:red;")
                        }

                        LeftQuestionDiv.appendChild(questionTitle)
                        LeftQuestionDiv.appendChild(questionAnswer)
                        // 將答案區左半邊放進div
                        questionDiv.appendChild(LeftQuestionDiv);                       



                // =================================================================以上是生成問題

                        //將使用者的答案抓出來
                        var PlusAns =[]
                        this.userDataArr.forEach(item=>{
                            if(item.qid==question.quid){
                                PlusAns.push(item.ans)
                            }
                        })
                        console.log(PlusAns)
    
                        if(question.optionType=="多選"){
                            
                            let newArray = PlusAns.flatMap(item => {
                            if (item === '該使用者未作答') {
                                return item;
                            } else {
                                let splitItems = item.split(';').filter(Boolean);
                                return splitItems;
                            }
                            });
                            PlusAns = newArray
                            console.log(newArray);
                            console.log("你好我是多選")
                        }



                        //開始判斷資料有幾個出現一樣的答案
                        const frequencyCount = {};
                        // 抓出來便利，並統計每個字符串出現的次数
                        PlusAns.forEach((item) => {
                            if (frequencyCount[item]) {
                                frequencyCount[item] += 1;
                            } else {
                                frequencyCount[item] = 1;
                            }
                        });

                        //建立給圖表的陣列
                        var circleContent = [];
                        var circleNum = [];
                        // 印出结果
                        for (const key in frequencyCount) {
                            if (frequencyCount.hasOwnProperty(key)) {
                                // console.log(`'${key}' 回答了 ${frequencyCount[key]} 次`);
                                circleContent.push(`${key}`)
                                circleNum.push(`${frequencyCount[key]}`)
                                // console.log(circleContent)
                                // console.log(circleNum)
                                const userChoose = document.createElement('p');
                                userChoose.setAttribute('style', 'font-size: 16pt;margin: 0 0;'); //小問題設定字型大小
                                userChoose.textContent =`${key}------${frequencyCount[key]}`;
                                questionAnswer.appendChild(userChoose);
                            }
                        }
                        
                //==================================================================以下是要生成圖形表

                        // 將答案區右邊放進div
                        const RightQuestionDiv = document.createElement('div');
                        RightQuestionDiv.setAttribute('style', 'width:22vw;')
                        RightQuestionDiv.setAttribute('class', 'RightQuestionDiv')
                        questionDiv.appendChild(RightQuestionDiv);  

                        
                        // 創建canvas元素
                        const canvas = document.createElement('canvas');
                        canvas.width = 100; // 設置canvas的寬度
                        canvas.height = 100; // 設置canvas的高度
                        var iddd =question.quid.toString();
                        canvas.id = 'myPieChart'+iddd;

                        // 檢查是否成功創建了canvas元素
                        if (canvas.getContext) {
                            const ctx = canvas.getContext('2d');

                            // 將canvas添加到創建的容器中
                            RightQuestionDiv.appendChild(canvas);

                            // 圖表數據
                            const data = {
                                labels: circleContent,/////////圖表名子分類是陣列!!!!!!!!!!!!!
                                datasets: [{
                                    data: circleNum,
                                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                                }]
                            };

                            // 圖表選項
                            const options = {
                                // 在这里添加你的图表选项
                            };

                            // 創建新的圖表視窗
                            new Chart(ctx, {
                                type: 'pie',
                                data: data,
                                options: options   //圖表答案%%%選項是陣列
                            });
                        } else {
                            // 瀏覽器不支持Canvas
                            console.error('当前浏览器不支持Canvas。');
                        }
                //=============================================================================

                //=================================================================================



                // 將問題容器添加到整體容器中
                questionPlaceId.appendChild(questionDiv);
            })
            
        },  
        //把題目答案塞進去
        startToCalculate(){
            // // 把問題跑回圈
            // for(let j =0;j<this.questionArr.length;j++){
            //     // 把回答跑回圈
            //     for(let k =0;k<this.userDataArr.length;k++){
            //         if(this.questionArr[j].quid==this.userDataArr[k].qid){
            //             const userAns = document.getElementById((this.questionArr[j].quid).toString)
            //             var label = document.createElement('p');
            //             label.textContent =this.userDataArr[k].ans;
            //             userAns.appendChild(label);
            //         }
            //     }
            // }

        },
         // 特效提示框-還沒有人作答
        specialNotion12(){
            Swal.fire({
                title: '此問卷還未有人作答無統計資料!',
                text: '',
                icon: 'error',
                confirmButtonText: 'ok'
                })
        },
        ...mapActions(day,["searchAllQna","gettellCircleWhichOne","getCircleArr"]),
        
    },
    computed: {
        ...mapState(day,["allQuestionnaireA"])
    },
    mounted(){
        
        this.allUserData = this.getCircleArr();
        this.userDataArr = this.allUserData.userList

         //先拿問卷編號
        let x = this.gettellCircleWhichOne()
        this.thisQnNumber =x
        //再把此問卷的問卷跟問題抓出來
        this.searchAllQna()
        var data =this.allQuestionnaireA.quizVoList
        for(let i = 0 ;i<data.length;i++){
            if(data[i].questionnaire.id==x){
                this.allQnData=data[i]
            }
        }
        //判斷有沒有人作答 沒人做答跳回首頁
        if(this.userDataArr.length==0){
            this.specialNotion12();
            this.$router.push("./")
            return
        }
        //跑去生成問題圖表區
        this.createQuestion();

        //自動生成時間跟標題 
        const timeShow = document.getElementById('timeShow');
        const nameShow = document.getElementById('nameShow');
        nameShow.innerText = this.allQnData.questionnaire.title
        timeShow.innerText = this.allQnData.questionnaire.startDate+ "~" + this.allQnData.questionnaire.endDate

        // 把答案塞進去圖表區
        this.startToCalculate();


        // console.log(this.userDataArr)
        // console.log(this.questionArr)



    },
    beforeMount(){
    
    },
    updated(){

    }
}
</script>

<template>
    <div class="bg">  
        <h1>問卷統計圖表</h1>
        <div class="showBlock">
            
            <h4 style="font-size: 18pt;" id="timeShow">{{123}}</h4>
            <h1 style="font-size: 40pt;" id="nameShow">{{12}}</h1>
            <div id="questionPlaceId" class="questionPlace">
                    
            </div>
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
    overflow: auto;


    .showBlock{
    width: 80vw;
    min-height: 80vh;
    background-color: rgb(218, 218, 218);
    border-radius: 5px;
        h4{
            text-align:end;
            
        }
        h1{
            text-align: center;
        }
        .questionPlace{
            width: 70vw;
            margin: 2vw 5vw;
            
        }
    }
}
</style>
