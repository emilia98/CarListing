<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <form
          class="border pl-5 pr-5"
          style="margin-top:70px;height:auto;"
          @submit.prevent="registerHandler"
        >
          <h1 class="form-page-title">Register</h1>
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              class="form-control"
              placeholder="JohnDoe123"
              v-model="register.username"
            />
            <span class="text-danger" v-if="this.formErrors != null && this.formErrors.username">{{this.formErrors.username}}</span>
          </div>
          <div class="form-group">
            <label for="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              class="form-control"
              placeholder="John Doe"
              v-model="register.fullName"
            />
            <span class="text-danger" v-if="this.formErrors != null && this.formErrors.fullName">{{this.formErrors.fullName}}</span>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="text"
              id="email"
              class="form-control"
              placeholder="john.doe@gmail.com"
              v-model="register.email"
            />
            <span class="text-danger" v-if="this.formErrors != null && this.formErrors.email">{{this.formErrors.email}}</span>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              class="form-control"
              placeholder="*******"
              v-model="register.password"
            />
            <span class="text-danger" v-if="this.formErrors != null && this.formErrors.password">{{this.formErrors.password}}</span>
          </div>
          <div class="text-center mt-5">
            Don't you have an account?
            <div>
              <router-link to="/auth/login">Click here</router-link>
            </div>
            <center>
              <button class="btn btn-primary btn-block w-75 my-4" type="submit">
                Register
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
      register: {
        username: "",
        email: "",
        password: "",
        fullName: "",
      },
      formErrors: null
    };
  },
  methods: {
    async registerHandler() {
      try {
        // let formData = {
        //   username: this.register.username,
        //   email: this.register.email,
        //   password: this.register.password,
        //   fullName: this.register.fullName
        // };

        // let response = await this.$store.dispatch('register', formData);
        let response = await this.$http.post("/auth/register", this.register);
        let data = response.data;

        if (data.errors) {
          this.formErrors = data.errors;
          return;
        }

        if (data.successMessage) {
          sweetalert("Success", data.successMessage, "success");
          this.$router.push('/auth/login');
        }
      } catch (err) {
        let errorMessage = err?.response?.data?.errorMessage ?? "Error";
        sweetalert(errorMessage,"", "error");
      }
    },
  },
};
</script>
