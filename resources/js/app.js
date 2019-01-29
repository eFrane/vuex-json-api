import Bookstore from './components/Bookstore'
import { createVueInstance } from './init/createVueInstance'

createVueInstance({
  Bookstore
}).then((instance) => {
  instance.$mount('#app');
})
