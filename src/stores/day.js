import { defineStore } from 'pinia';


export default defineStore("day",{
    state:()=>({
    
    }),
    getters:{
    },
    actions:{
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
    }
})