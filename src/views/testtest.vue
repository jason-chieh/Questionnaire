<script>
export default{
        // <!-- -----------------------------------------------------方法2 -->
    data(){
        return{
            pages: Array.from({ length: 10 }, (_, i) => i + 1),
            content: ''
        }
    },
    methods: {
                showContent(pageNumber) {
                    this.content = `内容：页面 ${pageNumber}`;
                    console.log(this.pages)
                }
    },

    // <!-- -----------------------------------------------------方法1 -->
    mounted(){
        var tabsContainer = document.getElementById('tabs-container');
        var contentContainer = document.getElementById('content');


        // 创建10个页面标签
        for (var i = 1; i <= 10; i++) {
            var tab = document.createElement('button');
            tab.className = 'tab';
            tab.textContent = i;
            tab.dataset.pageNumber = i;
            tab.addEventListener('click', function() {
                var pageNumber = this.dataset.pageNumber;
                contentContainer.textContent = '内容：页面 ' + pageNumber;
            });
            tabsContainer.appendChild(tab);
        }
    }
}
</script>

<template>
    <!-- -----------------------------------------------------方法1 -->

<div class="tabs" id="tabs-container"></div>
    <div id="content"></div>


<!-- -----------------------------------------------------方法2 -->
    <div id="app">
        <div class="tabs1">
            <div class="tab1" v-for="pageNumber in pages" :key="pageNumber" @click="showContent(pageNumber)">
                {{ pageNumber }}
            </div>
        </div>
        <div id="content">
            {{ content }}
        </div>
    </div>
</template>

<style lang="scss" scoped>

// 方法1

  .tabs {
            display: flex;
            justify-content: center;
            margin-top: 20px;
            background-color: pink;
            
        }

        .tab {
            margin: 0 10px;
            cursor: pointer;
        }


// 方法2

        .tabs1 {
            display: flex;
            justify-content: center;
            margin-top: 20px;
        }

        .tab1 {
            margin: 0 10px;
            cursor: pointer;
        }

</style>
