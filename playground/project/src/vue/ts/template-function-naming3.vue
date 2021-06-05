<template>
  <div>
    <input
      @enter="enterInputName"
      @aaa="aaa"
      @a-bb-cc="asdasd"
      @update="AaaaAsadasd"
      @a-b-c="adasd"
    >
  </div>
</template>
<script>
export default defineComponent({
  setup() {
    function gg() {
      //
    }
    const bbb = () => {
      //
    }
    gg()
    gg()
    gg()
    gg()
    return {
      aaa,
      bbb,
      adasd: () => {
        //
      },
      AaaaAsadasd: gg,
    }
  },
  methods: {
    a: () => {
      //
    },
    b: () => {
      //
    },
    c() {
      this.a()
    },
  }
})
</script>
