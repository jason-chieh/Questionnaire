<script>
import {mapState,mapActions} from 'pinia'
import day from '../stores/day'
export default{
  data(){
    return{
      x:5,
      arr2:[1,2,3,4],
      pages: Array.from({ length: 10 }, (_, i) => i + 1),
      content: ''
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
    // 執行方法獲得日期
    ...mapActions(day,["getCurrentDate"]),
  },
  mounted(){
    // 抓取日期
    this.getCurrentDate()
    // 要把值設定給畫面
    const logindate = document.getElementById('logindate')
    const sevendate = document.getElementById('sevendate')
    logindate.value = this.nowday
    sevendate.value = this.sevenday
  },
  computed:{
    // 抓取pinia裡面算出的值今天日期跟七天後
    ...mapState(day,["nowday","sevenday"])
  }
}
</script>

<template>
  <div class="bg">  
      <div class="searchBlock">
            <div class="searchBlockLeft">
                    <div class="title">
                        <label for="">問卷標題:</label>
                        <input type="text"><br>
                    </div>
                    <div class="time">
                        <label for="">問卷時間:</label>
                        <input id="logindate" type="date">
                        <input id="sevendate" class="input1" type="date">
                    </div>
            </div>
            <div class="searchBlockRight">
                <button class="search bb" type="button">search</button>
            </div>
      </div>
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
                    <tr v-for="item, index in arr2">
                        <td >{{item}}</td>
                        <td :key="index" @click="gotovote(index)"><a href="#">問卷標題1</a></td>
                        <td>已完成</td>
                        <td>2023-10-26 10:00 AM</td>
                        <td>2023-10-30 10:00 AM</td>
                        <td :key="index" @click="gocal(index)"><a href="#">統計連結</a></td>
                    </tr>
                    <!-- 可以继续添加更多的行 -->
                </tbody>
              </table>
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
    height: 41vh;
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
}
</style>
