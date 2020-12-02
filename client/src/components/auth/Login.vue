<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <form
          class="border pl-5 pr-5"
          style="margin-top:70px;height:auto;"
          @submit.prevent="loginHandler"
        >
          <h1 class="form-page-title">Login</h1>
          <div class="form-group">
            <label for="input">Username/Email</label>
            <input
              type="text"
              id="input"
              class="form-control"
              placeholder="Username/Email"
              v-model="login.input"
            />
             <span class="text-danger" v-if="this.formErrors != null && this.formErrors.input">{{this.formErrors.input}}</span>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              class="form-control"
              placeholder="*******"
              v-model="login.password"
            />
            <span class="text-danger" v-if="this.formErrors != null && this.formErrors.password">{{this.formErrors.password}}</span>
          </div>
          <div class="text-center mt-5">
            Already have an account?
            <div>
              <router-link to="/auth/register">Click here</router-link>
            </div>
            <center>
              <button class="btn btn-primary btn-block w-75 my-4" type="submit">
                Login
              </button>
            </center>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import sweetalert from 'sweetalert';
export default {
  data() {
    return {
      login: {
        input: "",
        password: ""
      },
      formErrors: null
    };
  },
  methods: {
    async loginHandler() {
      try {
        let input = this.login.input;
        let password = this.login.password;
        let response = await this.$store.dispatch('login', { input, password })
        // let response = await this.$http.post("/auth/login", this.login);
        let data = response.data;

        console.log(data);

        if (data.errors) {
          this.formErrors = data.errors;
          return;
        }

        if (data.successMessage) {
          // localStorage.setItem("cl_token", data.accessToken);
          sweetalert("Success", data.successMessage, "success");
          this.$router.push('/');
        }
      } catch (err) {
        console.log(err);
        let errorMessage = err?.response?.data?.errorMessage ?? "Error";
        sweetalert(errorMessage,"", "error");
      }
    }
  }
};
</script>