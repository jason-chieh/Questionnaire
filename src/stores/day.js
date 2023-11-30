import { defineStore } from 'pinia';


export default defineStore("day",{
    state:()=>({
        // 所有的問卷包括小問題
        allQuestionnaireA:[],
        //全域變數告訴新增問題說這次是要編輯
        editQuestionnaire:0,
        //全域變數告訴投票頁面是邸幾個問卷
        tellVoteWhichOne:0,
        //全域變數告訴圓形圖頁面是第幾個問卷
        tellCircleWhichOne:0,
        // 從pinya拿到home給我們的問卷標題
        fromPinyaQn:[],
        //從方法拿到的問卷小問題們
        questionArr:[],
        //從方法拿到作答的使用者們
        allUserDataPinia:[]
        
    }),
    getters:{

    },
    actions:{
        //抓取當天日期--------------------------------------
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

        //把後端所有問卷包括小問題抓出來--------------------
        async searchAllQna(){
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

            await fetch(urlWithParams, {
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
                // console.log(this.allQuestionnaireA);
            })
        },
        // 後端抓取問卷   已出版的
        async searchAllQnIsPublished(){
                const url = 'http://localhost:8081/api/quiz/searchQuestionnaireList1';
                // 要帶入的值
    
                const queryParams = new URLSearchParams({
                title: "",
                startDate:"2000-01-01",
                endDate:"2099-01-01",
                isPublished:true
                });
    
                // 將查詢字串附加到 URL
                const urlWithParams = `${url}?${queryParams}`;
    
                await fetch(urlWithParams, {
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
                this.isPublishedQnArr = data;
                })
        },


        //去抓看到底是哪張問卷要投票生成
        async prepareVote(){
            const a =this.getTellVoteWhichOne()
            const arr = this.isPublishedQnArr.questionnaireList
            for(let i=0 ; i< arr.length;i++){
                if(arr[i].id==a){
                    this.fromPinyaQn=arr[i]
                    
                }
            }

            const url = 'http://localhost:8081/api/quiz/searchQuestionList';
            // 要帶入的值

            const queryParams = new URLSearchParams({
                qnid:a
            });

            // 將查詢字串附加到 URL
            const urlWithParams = `${url}?${queryParams}`;

            await fetch(urlWithParams, {
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
            this.questionArr = data;
            this.questionArr = this.questionArr.questionList
            // console.log(this.questionArr)
            })
            // return Promise.resolve();
        },


        //前往後端抓作答人資料
        async searchUserDataP(){
            const w =this.gettellCircleWhichOne();

            const url = 'http://localhost:8081/api/quiz/searchUserPeople';
            // 要帶入的值
            const queryParams = new URLSearchParams({
                qnidid:w
            });

            // 將查詢字串附加到 URL
            const urlWithParams = `${url}?${queryParams}`;

            await fetch(urlWithParams, {
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
            this.allUserDataPinia = data;

            })
        },


// ===========================================================================get and set===================================

        //告訴新增問題說這次是要編輯============================================
        geteditQuestionnaire(){
            return this.editQuestionnaire
        },
        seteditQuestionnaire(num){
            this.editQuestionnaire = num ;
        },
        //告訴投票頁面是哪個問卷要create=========================================fromPinyaQn
        getTellVoteWhichOne(){
            return this.tellVoteWhichOne
        },
        setTellVoteWhichOne(num){
            this.tellVoteWhichOne = num ;
        },
        //告訴投票頁面是哪個問卷標題
        getfromPinyaQn(){
            return this.fromPinyaQn
        },
        setfromPinyaQn(num){
            this.fromPinyaQn = num ;
        },
        //告訴投票頁面是哪個問卷標題
        getquestionArr(){
            return this.questionArr
        },
        setquestionArr(num){
            this.questionArr = num ;
        },


        //告訴圓形圖頁面是哪個問卷=================================================
        gettellCircleWhichOne(){
            return this.tellCircleWhichOne
        },
        settellCircleWhichOne(num){
            this.tellCircleWhichOne = num ;
        },
        getCircleArr(){
            return  this.allUserDataPinia
        },


    }
})