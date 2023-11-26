import { defineStore } from 'pinia';


export default defineStore("day",{
    state:()=>({
        allQuestionnaireA:[],
        //
        editQuestionnaire:0
        
    }),
    getters:{

    },
    actions:{
        //抓取當天日期
        getCurrentDate() {

            // 這是今天日期
            var now = new Date();
            
            var year = now.getFullYear();
            var month = now.getMonth() + 1; // 月份有可能是0所以要加一
            var day = now.getDate();
            // 確保單位數前面要補0
            month = month < 10 ? '0' + month : month;
            day = day < 10 ? '0' + day : day;
            // 將日期顯示在頁面上
            this.nowday = year + '-' + month + '-' + day;


            // 這是今天日期加七天
            var futureDate = new Date();
            futureDate.setDate(now.getDate() + 7);
            var futureYear = futureDate.getFullYear();
            var futureMonth = (futureDate.getMonth() + 1).toString().padStart(2, '0');
            var futureDay = futureDate.getDate().toString().padStart(2, '0');
            this.sevenday = futureYear+'-' + futureMonth + '-' + futureDay;

            // 這是今天加兩天
            var twoDate = new Date();
            twoDate.setDate(now.getDate() + 2);
            var twoDateYear = twoDate.getFullYear();
            var twoDateMonth = (twoDate.getMonth() + 1).toString().padStart(2, '0');
            var twoDateDay = twoDate.getDate().toString().padStart(2, '0');
            this.twoday = twoDateYear+'-' + twoDateMonth + '-' + twoDateDay;

            var twoDateS = new Date();
            twoDateS.setDate(now.getDate() + 9);
            var twoDateYearS = twoDateS.getFullYear();
            var twoDateMonthS = (twoDateS.getMonth() + 1).toString().padStart(2, '0');
            var twoDateDayS = twoDateS.getDate().toString().padStart(2, '0');
            this.twodayS = twoDateYearS+'-' + twoDateMonthS + '-' + twoDateDayS;
        },

        //把後端所有問卷包括小問題抓出來
        searchAllQna(){
            var arr =[];
            const url = 'http://localhost:8081/api/quiz/search1';
            // 要帶入的值

            const queryParams = new URLSearchParams({
            title: "",
            startDate:"2000-01-01",
            endDate:"2099-01-01",
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
                this.allQuestionnaireA=data
            })
        },

        geteditQuestionnaire(){
            console.log(this.editQuestionnaire)
            return this.editQuestionnaire
        },
        seteditQuestionnaire(num){
            this.editQuestionnaire = num ;
        }


    }
})