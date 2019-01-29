import Hello from './components/Hello'
import { createVueInstance } from './init/createVueInstance'

createVueInstance({
  Hello
}).then((instance) => {
  instance.$mount('#app');
})
