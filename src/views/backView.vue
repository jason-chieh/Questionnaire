<script>
import {mapState,mapActions} from 'pinia'
import day from '../stores/day'
export default{
    data(){
        return{
            // 問卷列表全部
            allQuestionnaire:[],
            // 問卷分頁
            perpage: 6, //一頁的資料數
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
        gocal(){
        this.$router.push("/CalView")
        },
        gotovote(){
        this.$router.push("/vote")
        },
        gotoaddQuestion(){
        this.$router.push("/addQuestion")
        },
        // 後端抓取問卷全部資料
        searchAllQn(){
            const url = 'http://localhost:8081/api/quiz/searchQuestionnaireList1';
            // 要帶入的值

            const queryParams = new URLSearchParams({
            title: this.searchText,
            startDate: this.searchStartDate,
            endDate: this.searchEndDate,
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
            console.log(this.allQuestionnaire)
            })
        },
        // 設定頁籤
        setPage(page) {
        if(page <= 0 || page > this.totalPage) {
            return
        }
        this.currentPage = page
        },
        // 執行方法獲得日期
        ...mapActions(day,["getCurrentDate"]),
    },
    mounted(){
        // // 抓取日期
        // this.getCurrentDate()
        // // 要把值設定給畫面
        // const logindate = document.getElementById('logindate')
        // const sevendate = document.getElementById('sevendate')
        // logindate.value = this.nowday
        // sevendate.value = this.sevenday

        // //自動抓取全部問卷
        this.searchAllQn();
        // console.log(this.allData1)

    },
    updated(){
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
    
}
</script>



<template>
    <div  class="bg">  
        <h1>這裡是後台-問卷管理列表</h1>
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
                <button @click="searchAllQn" class="search" type="button">search</button>
            </div>
        </div>
        <div class="addDelArea">
            <button @click="gotoaddQuestion" class="add bb" type="button">add</button>
            <button class="delete bb" type="button">delete</button>
        </div>
        <div class="showBlock">
                    <table>
                    <thead>
                        <tr>
                            <th></th>
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
                            <td ><input type="checkbox" :key="index" ></td>
                            <td >{{item.id}}</td>
                            <td :key="index" @click="gotovote(index)"><a href="#">{{item.title}}</a></td>
                            <td >{{item.published? "已發布":"未發布"}}</td>
                            <td>{{item.startDate}}</td>
                            <td>{{item.endDate}}</td>
                            <td :key="index" @click="gocal(index)"><a href="#">統計連結</a></td>
                        </tr>
                        <!-- 可以继续添加更多的行 -->
                    </tbody>
                </table>
        </div>
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
    height: 90vh;
    background-color: #00A9FF;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    h1{
        margin-top: 0;
    }
    .searchBlock{
        width: 80vw;
        height: 20vh;
        background-color: rgb(218, 218, 218);
        display: flex;
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
                    font-size: 16pt;
                    border-radius: 5px;
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
                    font-size: 16pt;
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
            .search{
                width: 150px;
                height: 30px;
                border: 0;
                border-radius: 5px;
                color: black;
                font-weight: bold;
                font-size: 16pt;
                transition: 1s;
                margin-top: 7vh;
                background-color: gray;
                &:hover{
                    color: white;
                }
            }
        }
    }
    .addDelArea{
        display: flex;
        justify-content:baseline;
        align-items: center;
        width: 80vw;
        height: 10vh;
        .bb{
            width: 10vw;
            height: 5vh;
            border-radius: 5px;
            border: 0;
        }
        .add{   
            background-color: #005288;
            color: white;
                &:hover{
                    color: white;
                }
            }
        .delete{
                background-color: red;
                margin-left: 3vw;
                color: white;
                &:hover{
                    color: white;
                }
        }
    }
    .showBlock{
        width: 80vw;
        // height: 41vh;
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
