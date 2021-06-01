<template>
  <div id="app">

<hello-world></hello-world>
    <router-view/>
  
  </div>
</template>
<script>
import HelloWorld from './components/HelloWorld.vue';
import Item from './components/Item.vue';
  export default {

  components:{
    HelloWorld:HelloWorld, 
    Item:Item
  }
  
  }

</script>

