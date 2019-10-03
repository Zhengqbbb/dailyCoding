<template>
  <div>
    hello vue
    
  </div>
</template>

<script lang="ts">
import {Component,Vue} from 'vue-property-decorator';

@Component({
  components:{
    //TODO...
  }
})
export default class Todo extends Vue({
  public todos:string[] = ['香蕉', '苹果'];
})
</script>