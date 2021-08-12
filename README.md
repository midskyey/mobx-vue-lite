# mobx-vue-lite

Lightweight Vue bindings for MobX based on Composition API.

## Install

```sh
yarn add mobx-vue-lite
```

## Example

### **`useLocalObservable<T>(initializer: () => T, annotations?: AnnotationsMap<T>): Ref<T>`**

Creates an observable object with the given properties, methods and computed values.

```html
<template>
    <div>Count: {{ state.count }}</div>
    <div>Doubled: {{ state.double }}</div>
    <button @click="state.increment">Increment</button>
</template>

<script setup lang="ts">
import { useLocalObservable } from 'mobx-vue-lite'

const state = useLocalObservable(() => ({
    count: 0,
    get double() {
        return this.count * 2
    },
    increment() {
        this.count++
    }
}))
</script>
```

### **`<Observer></Observer>`**

Is a renderless Vue component, which applies observer to its children. `<Observer>` can be used both inside Options and Composition API components.

```html
<template>
    <Observer>
        <div>Name: {{ data.name }}</div>
        <button @click="changeName">Change name</button>
    </Observer>
</template>

<script setup lang="ts">
import { observer, runInAction } from 'mobx'
import { Observer } from 'mobx-vue-lite'

const data = observable({ name: 'John' })

const changeName = () => {
    runInAction(() => {
        data.name = 'Jane'
    })
}
</script>
```

### **`createGlobalObservable<T>(stateFactory: () => T): () => T`**

Create a global observer from a local observer.

```ts
// store.ts
import { createGlobalObservable } from 'mobx-vue-lite'

export const useGlobalObservable = createGlobalObservable(() => {
  return useLocalObservable(() => ({
      count: 0,
      get double() {
        return this.count * 2
      },
      increment() {
        this.count++
      }
    }))
})
```

```html
<template>
    <div>Count: {{ state.count }}</div>
    <div>Doubled: {{ state.double }}</div>
    <button @click="state.increment">Increment</button>
</template>

<script setup lang="ts">
import { useGlobalObservable } from './store'

// Can be reused in any component and state will be in sync
const state = useGlobalObservable()
</script>
```

## Credits

API is inspired from https://github.com/mobxjs/mobx-react-lite.

## License

MIT License © 2021 [Robert Soriano](https://github.com/wobsoriano)