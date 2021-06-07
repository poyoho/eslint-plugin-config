<template>
  <div>
    <input
      @enter="enterInputName"
      @aaa="aaa"
      @a-bb-cc="asdasd"
      @update="updateAaaAsadasd"
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
      adasd: () => {
        //
      },
      bbb,
      updateAaaAsadasd: gg,
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
