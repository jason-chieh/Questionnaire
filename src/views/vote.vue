<script>
import {mapState,mapActions} from 'pinia'
import day from '../stores/day'
export default{
    data(){
        return{
               // 從pinya拿到home給我們的問卷標題
                fromPinyaQn:[],
                //從方法拿到的問卷小問題們
                questionArr:[],

        }
    },
    components:{
    },
    methods:{
        goconfirm(){
        this.$router.push("/confirm")
        },
        //生成確認問題
        createQuestion(){
            // 將問題和選項生成到此元素中
            const createQuestionPlace = document.getElementById('createQuestionPlace');

            // 遍歷問題列表
            this.questionArr.forEach(question => {
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
        // pinya執行方法獲得方法
        ...mapActions(day,["getTellVoteWhichOne","searchAllQnIsPublished","getfromPinyaQn","getquestionArr"]),
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
        // 告訴pinya我要以出版的問卷
        this.searchAllQnIsPublished();

        this.fromPinyaQn  = this.getfromPinyaQn();
        this.questionArr  = this.getquestionArr();

        // //去抓看到底是哪張問卷要投票並生成問卷
        // this.prepareVote();

        //創建問卷可以作答
        this.createQuestion();




    },
    updated(){
        // console.log(this.isPublishedQnArr)
        // console.log(this.getTellVoteWhichOne())
    }
}
</script>

<template>
    <div class="bg">  
        <h1>請輸入問卷</h1>
        <div class="answerPlace">
            <h1>{{this.fromPinyaQn.title}}</h1>
            <p style="font-weight: bold;">內容:{{this.fromPinyaQn.description}}</p>
            <label for="">姓名:</label>
            <input type="text"><br>
            <label for="">手機:</label>
            <input type="text"><br>
            <label for="">信箱:</label>
            <input type="text"><br>
            <label for="">年齡:</label>
            <input type="text">
            <!-- //下面是自動生成的 -->
            <div id="createQuestionPlace" class="questionPlace">
            </div>
        </div>

        <button @click="createQuestion" type="button">提交並且前往確認</button>
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
        height: 70vh;
        background-color: rgb(218, 218, 218);
        padding: 3% 3%;
        h1{

            text-align: center;
        }
        p{
            font-size: 16pt;
            text-align: center;
        }
        input{
            font-size: 16pt;
            margin-bottom: 2vh;
        }
        .questionPlace{
        background-color: rgb(218, 218, 218);
        border-radius: 5px;
        overflow: auto;
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
