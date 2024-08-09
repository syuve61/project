import { defineStore } from 'pinia'
import { ref } from 'vue'


export const Store = defineStore('Store', {
   testData: ref([1,2,3,4,5])
  // console.log(testdata);
  // return { testData }
})