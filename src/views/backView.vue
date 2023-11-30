<script>
import {mapState,mapActions} from 'pinia'
import day from '../stores/day'

import Swal from 'sweetalert2'

import {RouterLink} from "vue-router"
export default{
    data(){
        return{
            // 問卷列表全部
            allQuestionnaire:[],
            // 問卷分頁
            perpage: 10, //一頁的資料數
            currentPage: 1,
             //搜尋標題
            searchText:"",
            searchStartDate: "",
            searchEndDate:"",
            //要去後台刪除問卷~ 前台點選問卷的索引直陣列
            indexArr: []
        
        }
    },
    components:{
        RouterLink
    },
    methods:{
        // 特效提示框-不能更新
        specialNotion(){
            Swal.fire({
                title: '不能更新!',
                text: '請更新未發佈或是未開始~',
                icon: 'error',
                confirmButtonText: 'ok'
                })
        },
        // 特效提示框-不能刪除
        specialNotion1(){
            Swal.fire({
                title: '不能刪除!',
                text: '請看時間',
                icon: 'error',
                confirmButtonText: 'ok'
                })
        },
        
        //判斷時間是不是已經到了問卷要出版了
        checkedQnShouldPublished(){
            var checkDataPublished =[]

            this.allQuestionnaire.forEach(element => {
                const stDay =new Date(element.startDate)
                const nDay  =new Date(this.nowday)
                if(nDay>=stDay&&element.published==false){
                    element.published=true
                    checkDataPublished.push(element.id)
                    console.log("發現了時間到了未發佈")
                }
            });
            console.log("有發現時間到了未發佈的嗎")

            if(checkDataPublished.length!=0){
                var url = "http://localhost:8081/api/quiz/updateQuestionnaireList";
                fetch(url, {
                method: "POST", // or 'PUT'
                body: JSON.stringify(checkDataPublished), // data can be `string` or {object}!
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
                })
                .then((res) => res.json())
                .catch((error) => console.error("Error:", error))
                .then((response) => console.log("Success:", response));
            }

        },
        //跳轉頁面們
        gocal(){
        this.$router.push("/CalView")
        },
        gotovote(){
        this.$router.push("/vote")
        },
        gotoaddQuestion(){
            this.seteditQuestionnaire(-1)
            this.$router.push("/addQuestion")
        },
        gotoEditQuestion(index){
            //先去算索引值數字
            var pagekey = (this.perpage*(this.currentPage-1))+index

            // const stDay =new Date(this.allQuestionnaire[pagekey].startDate)
            // const edDay =new Date(this.allQuestionnaire[pagekey].endDate)
            // const nDay  =new Date(this.nowday)
            // if(nDay>edDay || nDay>=stDay){
            //     this.specialNotion();
            //     return
            // }

            var editId = this.allQuestionnaire[pagekey].id
            this.seteditQuestionnaire(editId)
            this.searchAllQna();
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
        // 刪除列表業的問卷
        deleQn() {
            //終止方法的可愛變數
            let stopDel=false;
            // 後端需要的qnidList
            var data = [
                
            ];
            //前端要得索引值
            var data1 = [
                
            ];

            // 判斷我要去刪掉陣列問卷的哪幾個
            for (let i = 0; i < this.indexArr.length; i++) {
                let indexNum = 0;
                let bigNum =this.indexArr[i].currPage
                let  smallNum =  this.indexArr[i].index
                
                indexNum = this.perpage*(bigNum-1)+smallNum
                data1.push(indexNum)
                data.push(this.allQuestionnaire[indexNum].id)
            }
            console.log(data1);


            //判斷這幾個裡面有沒有已經出版在進行中的資料
            for(let w = 0; w<data1.length ; w++){
                const SSdate = new Date(this.allQuestionnaire[data1[w]].startDate);
                const NNdate = new Date(this.nowday);
                if(this.allQuestionnaire[data1[w]].published == true && NNdate>=SSdate){
                    stopDel=true;
                    this.specialNotion1();
                    return stopDel;
                }
            };

            
            if(stopDel){
                this.specialNotion1();
                this.indexArr=[];
                return 
            }
              // 抓到當中有出版的直接終止掉-----------------------------------------------------------------

            

            //把前端的資料刪掉
            for(let i = 0; i < this.allQuestionnaire.length; i++){
                    for(let k = 0; k < data.length; k++){
                    if(this.allQuestionnaire[i].id==data[k]){
                        this.allQuestionnaire.splice(i,1)
                    }
                    
                }
            }

            //前往後端刪資料
            var url = "http://localhost:8081/api/quiz/deleteQuestionnaire";
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
            this.indexArr=[];


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
        // 處理問卷文字狀態  
        getPublishedStatus(published,startDate,endDate) {
            if(!published){
                return "未發布!!";
            }
            
            const SSdate = new Date(startDate);
            const EEdate = new Date(endDate);
            const NNdate = new Date(this.nowday);
            if (NNdate < SSdate) {
                return "尚未開始";
            } else if (NNdate > EEdate) {
                return "已結束";
            } else {
                return "進行中";
            }
        },
        // 點選checkbox會把陣列object化可以去判斷第幾頁第幾個checkbox
        addNumInIndexArr(index){
            let obj ={
                currPage:this.currentPage,
                index:index
            }
            this.indexArr.push(obj)

            this.indexArr =  this.indexArr.filter(function(item, index, self) {
                let slicedArr = self.slice(0, index).concat(self.slice(index + 1));
                
                    return !slicedArr.some(function(obj) {
                        return obj.currPage === item.currPage && obj.index === item.index;
                    });
            });



        },
        // 執行方法獲得日期 還有 設定編輯問卷的代碼
        ...mapActions(day,["getCurrentDate","seteditQuestionnaire","searchAllQna","searchAllQnIsPublished"]),
    },
    mounted(){
        // // 抓取日期
        this.getCurrentDate()
        // // 要把值設定給畫面
        // const logindate = document.getElementById('logindate')
        // const sevendate = document.getElementById('sevendate')
        // logindate.value = this.nowday
        // sevendate.value = this.sevenday
        
        // pinya收尋後端問卷
        this.searchAllQna();

        // //自動抓取全部問卷
        this.searchAllQn();

        //pinya抓已出版的問卷
        this.searchAllQnIsPublished();

    },
    unmounted(){
        // pinya收尋後端問卷
        this.searchAllQna();    
        //離開的時候必須去檢查問卷時間是否到期然後要出版
        this.checkedQnShouldPublished();


    },
    updated(){
        // console.log(this.indexArr)
        // console.log(allQuestionnaireA)
    },

    computed:{
        // 抓取pinia裡面算出的值今天日期跟七天後
        ...mapState(day,["nowday","sevenday","allQuestionnaireA"])
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
            <button @click="deleQn" class="delete bb" type="button">delete</button>
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
                        <tr v-for="item, index in allQuestionnaire.slice(pageStart, pageEnd)"  >
                            <td ><input type="checkbox"  v-model="item.checked" @click="addNumInIndexArr(index)" ></td>
                            <td >{{item.id}}</td>
                            <td ><a :key="index" :id="this.currentPage+'-'+index" @click="gotoEditQuestion(index)" href="#">{{item.title}}</a></td>
                            <td >{{getPublishedStatus(item.published, item.startDate,item.endDate )}}</td>
                            <td>{{item.startDate}}</td>
                            <td>{{item.endDate}}</td>
                            <td :key="index" ><a :key="index"  @click="" href="#">統計連結</a></td>
                        </tr>
                        <!-- 可以继续添加更多的行 -->
                    </tbody>
                </table>
        </div>
        <div class="pageNumber">
            <ul class="pagination">
                <li class="page-item" @click.prevent="setPage(currentPage-1)">
                    <a class="page-link" href="#" aria-label="Previous">
                    <span  aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="page-item" :class="{'active': (currentPage === (n))}"
                v-for="(n, index) in totalPage" :key="index" @click.prevent="setPage(n)">
                    <a class="page-link" href="#">{{ n }}</a>
                </li>
                <li class="page-item" @click.prevent="setPage(currentPage+1)">
                    <a class="page-link" href="#" aria-label="Next">
                    <span  aria-hidden="true">&raquo;</span>
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
