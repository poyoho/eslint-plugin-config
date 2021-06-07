<script>
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @poyoho/config/vue/teamplate-export-order */
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
    const cc = () => {
      return {
        a,b,c
      }
    }
    var arr = [a, b, ...{A,B,C}]
    var gg = {a,b, ...a}
    if (a)
    {
      b = 1
    }

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
