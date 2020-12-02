<template>
  <div id="app">
    <div class="container-fluid">
      <Navbar />
      <router-view />
    </div>
  </div>
</template>
<script>
import Navbar from './components/shared/Navbar';

export default {
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('logout')
          resolve()
        }
        reject(err)
        // throw err;
      });
    })
  },
  components: {
    Navbar
  }
}
</script>