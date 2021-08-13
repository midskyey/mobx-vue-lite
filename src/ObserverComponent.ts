import { defineComponent } from 'vue-demi'
import h, { slot } from './utils'
import { reaction } from 'mobx'

export default defineComponent({
    data: () => ({
        key: 0,
        dispose: () => {}
    }),
    methods: {
        forceUpdate() {
            this.key++
        }
    },
    mounted() {
        this.dispose = reaction(() => slot(this.$slots.default), () => {
            this.forceUpdate()
        }, {
            requiresObservable: true
        })
    },
    unmounted() {
        this.dispose()
    },
    render() {
        return h(this.$slots.default!, { key: this.key })
    }
})