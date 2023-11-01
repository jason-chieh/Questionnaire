import { defineStore } from 'pinia';


export default defineStore("day",{
    state:()=>({
    
    }),
    getters:{
    },
    actions:{
        getCurrentDate() {
            var now = new Date();
            
            var year = now.getFullYear();
            var month = now.getMonth() + 1; // 月份有可能是0所以要加一
            var day = now.getDate();
            // 確保單位數前面要補0
            month = month < 10 ? '0' + month : month;
            day = day < 10 ? '0' + day : day;
            // 將日期顯示在頁面上
            this.nowday = year + '-' + month + '-' + day;


            var futureDate = new Date();
            futureDate.setDate(now.getDate() + 7);
            var futureYear = futureDate.getFullYear();
            var futureMonth = (futureDate.getMonth() + 1).toString().padStart(2, '0');
            var futureDay = futureDate.getDate().toString().padStart(2, '0');
            this.sevenday = futureYear+'-' + futureMonth + '-' + futureDay;
        },
    }
})