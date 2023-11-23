<script>
import { sassNull } from 'sass';

export default{
    data(){
        return{
            allData:{},
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
        }
                        
    },
    mounted(){
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

    </div>
</template>

<style lang="scss" scoped>


.d{
    width: 200px;
    height: 200px;
    background-color: pink;
}
</style>
