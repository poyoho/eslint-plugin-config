<script>
export default defineComponent({
  setup(props) {
    const b = "hello world"
    const a = reactive({
      bb: () => {
        return {a,b,c}
      }
    })
    function bb() {
      return {
        a,b,c
      }
    }
    // eslint-disable-next-line sonarjs/no-identical-functions
    const cc = () => {
      return {
        a,b,c
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let arr = [a, b, ...{A,B,C}]
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let gg = {a,b, ...a}
    if (a)
    {
      // eslint-disable-next-line no-const-assign
      b = 1
    }

    // eslint-disable-next-line @poyoho/config/vue/teamplate-export-order
    return {
      ...b,
      [aaa]: reactive(aaa),
      ...c,
      "aaa-bb-c": 1,
      ...a,
      99: 123,
      a,
      dd: bb,
      [asd.asd]: 123,
      ee: cc,
      bb,
      props,
      cc,
    }
  },
  data: () => {
    return {
    }
  },
  computed: {
    aaa: {
      get() {
        return "3"
      },
      set() {
        this.a = 3
      }
    },
    bbb: {
      get() {
        return "1"
      },
      set() {
        this.a = 1
      }
    },
    ddd: {
      get() {
        return "2"
      },
      set() {
        this.a = 2
      }
    },
  },
  methods: {
    methods() {
      //
    }
  },
})
</script>
