<template>
  <div
    class="test"
    @aaa="aaa"
  >
    asd
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line simple-import-sort/imports
import {f,h,e} from "./export2"
import {b,c,a} from "./export"
export default {
  methods: {
    aaa(): "asd" {
      console.log(a,b,c,e,f,h)
      return "asd"
    }
  }
}
</script>

<style>

</style>
