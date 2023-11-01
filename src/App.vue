<script>
import { RouterLink, RouterView } from 'vue-router';
import HomeHeader from './views/HomeHeader.vue';
export default{
  data(){
    return{
      
    }
  },
  components:{
    RouterView,
    HomeHeader
  }
}
</script>

<template>
  <HomeHeader />
  <RouterView />
</template>

<style lang="scss" scoped>

</style>
