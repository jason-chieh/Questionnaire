<script>
import {mapState,mapActions} from 'pinia'
import day from '../stores/day'

import Swal from 'sweetalert2'


export default{
    data(){
        return{
        // 問卷總表
        allQuestionnaire:[],
        //問卷分頁
        perpage: 10, //一頁的資料數
        currentPage: 1,
        //搜尋標題
        searchText:"",
        searchStartDate: "",
        searchEndDate:"",
        }
    },
    components:{
        
    },
    methods:{
        // 特效提示框
        specialNotion(){
            Swal.fire({
                title: '問卷已經結束或是還沒開始喔!',
                text: '請點選正在進行中的問卷~',
                icon: 'error',
                confirmButtonText: 'ok'
                })
        },
        gocal(){
        this.$router.push("/CalView")
        },
        gotovote(index){
        let key = this.perpage*(this.currentPage-1)+index
        this.setTellVoteWhichOne(this.allQuestionnaire[key].id);

        const stDay =new Date(this.allQuestionnaire[key].startDate)
        const edDay =new Date(this.allQuestionnaire[key].endDate)
        const nDay  =new Date(this.nowday)
        if(nDay>edDay || nDay<stDay){
            this.specialNotion()
            return
        }


        this.prepareVote().then(() => {
        // 確保在導航之前所有非同步操作都已完成
        this.$router.push("/vote");
        });
        // this.prepareVote();
        // this.$router.push("/vote")
        },
        // 後端抓取問卷抓取已出版的
        searchAllQn(){
            const url = 'http://localhost:8081/api/quiz/searchQuestionnaireList1';
            // 要帶入的值

            const queryParams = new URLSearchParams({
            title: this.searchText,
            startDate: this.searchStartDate,
            endDate: this.searchEndDate,
            isPublished:true
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
            // console.log(this.allQuestionnaire)
            })
        },
        // 設定頁籤
        setPage(page) {
            if(page <= 0 || page > this.totalPage) {
                return
            }
            this.currentPage = page
        },
        // 處理問卷文字狀態  
        getPublishedStatus(startDate,endDate) {  
            const SSdate = new Date(startDate);
            const EEdate = new Date(endDate);
            const NNdate = new Date(this.nowday);
            if (NNdate < SSdate) {
                return "尚未開始";
            }
            if (NNdate > EEdate) {
                return "已結束";
            }
            return "進行中";
            
        },
        // pinya執行方法獲得日期
        ...mapActions(day,["getCurrentDate","searchAllQna","setTellVoteWhichOne","searchAllQnIsPublished","prepareVote"]),
    },

    mounted(){
        // 抓取日期
        this.getCurrentDate()
        // 要把值設定給畫面
        const logindate = document.getElementById('logindate')
        // const sevendate = document.getElementById('sevendate')
        // this.searchStartDate = this.nowday
        // this.searchEndDate = this.sevenday
        // logindate.value = this.nowday
        // sevendate.value = this.sevenday

        // 去找資料庫前台列表
        this.searchAllQn()

        //pinya去抓後台資料
        this.searchAllQna();

        //pinya抓已出版的問卷
        this.searchAllQnIsPublished();



        },
        computed:{
        // 抓取pinia裡面算出的值今天日期跟七天後
        ...mapState(day,["nowday","sevenday"])
        ,
        // 頁面頁籤計算
        totalPage() {
        return Math.ceil(this.allQuestionnaire.length / this.perpage)
                    //Math.ceil()取最小整數
        },
        pageStart() {
            return (this.currentPage - 1) * this.perpage
                    //取得該頁第一個值的index
        },
        pageEnd() {
            return this.currentPage * this.perpage
                    //取得該頁最後一個值的index
        }
    },
    updated(){
    }

}
</script>

<template>
    <div class="bg">  
        <!-- 搜尋列 -->
        <div class="searchBlock">
            <div class="searchBlockLeft">
                    <div class="title">
                        <label for="">問卷標題:</label>
                        <input type="text" v-model="this.searchText"><br>
                    </div>
                    <div class="time">
                        <label for="">問卷時間:</label>
                        <input id="logindate" type="date" v-model="this.searchStartDate">
                        <input id="sevendate" class="input1" type="date" v-model="this.searchEndDate">
                    </div>
            </div>
            <div class="searchBlockRight">
                <button @click="searchAllQn()" class="search bb" type="button">search</button>
            </div>
        </div>
        <!-- 問卷修出內容 -->
        <div class="showBlock">
            <table>
                    <thead>
                        <tr>
                            <th>編號</th>
                            <th>問卷</th>
                            <th>狀態</th>
                            <th>開始時間</th>
                            <th>結束時間</th>
                            <th>觀看統計</th>
                        </tr>
                    </thead>
                <tbody>
                    <tr v-for="item, index in allQuestionnaire.slice(pageStart, pageEnd)">
                        <td >{{item.id}}</td>
                        <td ><a :key="index" @click="gotovote(index)" href="#">{{item.title}}1</a></td>
                        <td>{{getPublishedStatus(item.startDate,item.endDate )}}</td>
                        <td>{{item.startDate}}</td>
                        <td>{{item.endDate}}</td>
                        <td :key="index" ><a @click="gocal(index)" href="#">統計連結</a></td>
                    </tr>
                    <!-- 可以继续添加更多的行 -->
                </tbody>
            </table>
        </div>
        <!-- 底下頁籤 -->
        <div class="pageNumber">
            <ul class="pagination">
                <li class="page-item" @click.prevent="setPage(currentPage-1)">
                    <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="page-item" :class="{'active': (currentPage === (n))}"
                v-for="(n, index) in totalPage" :key="index" @click.prevent="setPage(n)">
                    <a class="page-link" href="#">{{ n }}</a>
                </li>
                <li class="page-item" @click.prevent="setPage(currentPage+1)">
                    <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
$maincolor:#00A9FF;
.bg{
width: 100vw;
background-color: #00A9FF;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
    .searchBlock{
        width: 80vw;
        height: 20vh;
        background-color: rgb(218, 218, 218);
        display: flex;
        margin-top: 5vh;
        .searchBlockLeft{
            width: 40vw;
            height: 20vh;
            .title{
                width: 36vw;
                height: 50%;
                display: flex;
                align-items: center;
                label{
                    font-weight: bold;
                    font-size: 20pt;
                    margin: 0 1vw;
                }
                input{
                    width: 25vw;
                    // height: 35%;
                    border-radius: 5px;
                    font-size: 18pt;
                }
                }
            .time{
                width: 36vw;
                height: 50%;
                display: flex;
                align-items: center;
                label{
                    font-weight: bold;
                    font-size: 20pt;
                    margin: 0 1vw;
                }
                input{
                    width: 12vw;
                    // height: 35%;
                    font-size: 18pt;
                    border-radius: 5px;
                }
                .input1{
                    margin-left: 1vw;
                }
            }
        }
        .searchBlockRight{
            width: 40vw;
            height: 20vh;
            .bb{
                width: 150px;
                height: 30px;
                border: 0;
                border-radius: 5px;
                color: black;
                font-weight: bold;
                transition: 1s;
                margin-top: 7vh;
            }
            .search{
                background-color: gray;
                font-size: 16pt;
                &:hover{
                    color: white;
                }
            }
        }
    }
    .showBlock{
    margin-top: 5vh;
    width: 80vw;
    height: 65vh;
    background-color: rgb(218, 218, 218);
    border-radius: 5px;
    table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid black;
            padding: 10px;
            text-align: center;
        }
        th {
            background-color: rgb(187, 186, 186);
        }
    }
    .pageNumber{
        width: 30vw;
        height: 10vh;
        .pagination{
            display: flex;
            justify-content:space-around;
            list-style: none;
            padding: 0;
            .page-item{
                font-size: 16pt;
            }
        }
    }
}
</style>
