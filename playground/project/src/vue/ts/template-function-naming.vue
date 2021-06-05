<template>
  <div>
    <input @enter="enterInputName">
    <a @click="clickSubmit">提交</a>
    <!-- 错误函数定义 -->
    <a
      @click="aaaSubmit"
      @enter="() => {}"
      @test="click"
    >提交</a>
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    // 点击-提交
    clickSubmit (): void {
      //
    },

    // 回车-提交
    enterInputName (): void {
      this.clickSubmit() // 错误写法
    },

    // 错误定义 必须为
    aaaSubmit(): void {
      //
    }
  }
}
</script>
