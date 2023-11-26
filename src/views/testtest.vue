<script>
import { sassNull } from 'sass';
import {mapState,mapActions} from 'pinia'
import day from '../stores/day'


export default{
    data(){
        return{
            paginatedCheckboxes:[],
            allQuestionnaire: [], // 你的所有问卷数据
            perpage: 10, // 每页数据量
            currentPage: 0, // 当前页码，从 0 开始
            checkboxStates: [] // 存储每个页面的复选框状态的数组
            
        }
    },
    methods: {
        addquestionnaire(){
            var url = "http://localhost:8081/api/quiz/create";
            var data = {
                "questionnaire":{
                    "title":"test12311",
                    "description":"test1111",
                    "published":false,
                    "startDate":"2023-11-20",
                    "endDate":"2023-11-30"
                },
                "question_list":[
                    {
                    "quid":12,
                    "qtitle":"abc",
                    "optionType":"multi",
                    "necessary":"true",
                    "option":"Q;T;R"
                    }
                ]
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
        search(){
            const url = 'http://localhost:8081/api/quiz/search1';
            // 要帶入的值
            const queryParams = new URLSearchParams({
            title: "t",
            start_Date: 2023-11-22,
            end_Date: 2023-11-30,
            });

            // 將查詢字串附加到 URL
            const urlWithParams = `${url}?${queryParams}`;

            fetch(urlWithParams, {
            method: "GET", 
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            })
            .then((res) => res.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => console.log("Success:", response));
        },
        createQ(){
            const questions = [
            { "quid": 1, "qnid": 80, "qtitle": "星巴克", "optionType": "單選", "necessary": "", "option": "12;032;13" },
            { "quid": 2, "qnid": 80, "qtitle": "露易莎", "optionType": "多選", "necessary": "", "option": "21;3;21" },
            { "quid": 3, "qnid": 80, "qtitle": "cama", "optionType": "文字", "necessary": "", "option": "" },
            { "quid": 4, "qnid": 80, "qtitle": "賓恩樂", "optionType": "單選", "necessary": "", "option": "21;3;2;1" },
            ];

            // 將問題和選項生成到此元素中
            const container = document.getElementById('question-container');

            // 遍歷問題列表
            questions.forEach(question => {
            // 如果問題標題不為空
            if (question.qtitle.trim() !== '') {
                // 創建問題的容器 div
                const questionDiv = document.createElement('div');

                // 添加問題標題
                const questionTitle = document.createElement('p');
                questionTitle.textContent = question.qtitle;
                questionDiv.appendChild(questionTitle);

                // 拆分選項（假設選項以分號分隔）
                const options = question.option.split(';');
                // 遍歷選項，創建並添加選項到問題容器中
                options.forEach(option => {
                const label = document.createElement('label');
                const input = document.createElement('input');
                if(question.optionType=="單選"){
                    input.setAttribute('type', 'radio'); // 或 'radio'，取決於 optionType
                }
                if(question.optionType=="多選"){
                    input.setAttribute('type', 'checkbox'); // 或 'radio'，取決於 optionType
                }
                if(question.optionType=="文字"){
                    input.setAttribute('type', 'text'); // 或 'radio'，取決於 optionType
                }

                // 假設值為選項內容
                input.setAttribute('value', option);
                label.appendChild(input);
                label.appendChild(document.createTextNode(option));
                questionDiv.appendChild(label);
                });

                // 將問題容器添加到整體容器中
                container.appendChild(questionDiv);
            }
            });


        },
        // 前往後端刪除資料!
        goBackDelQn(){
            var url = "http://localhost:8081/api/quiz/deleteQuestionnaire";
            var data = [
                80,81
            ];

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

        // 刪除子div子元素
        delete231(){
            const question = document.getElementById('question-container');

            // 檢查是否找到了該 div 元素
            if (question !== null) {
            // 移除所有子元素
            while (question.firstChild) {
                question.removeChild(question.firstChild);
            }
            } else {
            console.error('找不到指定的 div 元素');
}
        },
        increment() {
            this.$store.commit('increment')
            console.log(this.$store.state.count)
        },
        ...mapActions(day,["searchAllQna"]),
                        
    },
    mounted(){
        this.searchAllQna();
        console.log("ssssss")
        console.log(this.aaa)
    },
    beforeMount(){
    
    },
    computed: {
        ...mapState(day,["allQuestionnaireA"])
    },
    updated(){
    }
}
</script>

<template>
    <div class="d">
        <h1 id="hh">你好</h1>
        <input id="inp" type="text">
        <button type="submit" @click="addquestionnaire" id="btn">按我新增問卷到資料庫</button>
        <button type="submit" @click="search" id="btn">按我查詢資料庫</button>
        <button type="submit" @click="createQ" id="btn">新增問題</button>
        <button type="submit" @click="delete231" id="btn">新增問題</button>
        <button type="submit" @click="goBackDelQn" id="btn">後臺山問卷</button>
        <button type="submit" @click="" id="btn">vuex練習</button>
        <p>{{this.allQuestionnaireA}}</p>
    </div>
    <div id="question-container" class="question-cont">
    </div>


    

    
</template>

<style lang="scss" scoped>


.d{
    width: 200px;
    height: 200px;
    background-color: pink;
}
</style>









