<template>
  <div>
    <Navbar />
    
  </div>
</template>
<script>
// import VueJwtDecode from "vue-jwt-decode";
import Navbar from '../components/shared/Navbar';
export default {
  data() {
    return {
      user: {}
    };
  },

  methods: {
      /*
    getUserDetails() {
      let token = localStorage.getItem("jwt");
      let decoded = VueJwtDecode.decode(token);
      this.user = decoded;
    },*/
   /* logUserOut() {
      localStorage.removeItem("jwt");
      this.$router.push("/");
    } */
  },
  async created() {
    // this.getUserDetails();

    try {
        let response = await this.$http.get("/car");

        console.log()
        console.log(response.data.cars);
    } catch(err) {
        console.log(err);
    }
  },
  components: {
      Navbar
  }
};
</script>
<style scoped></style>