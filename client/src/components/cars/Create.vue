<template>
    <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <form
          class="border pl-5 pr-5"
          style="margin-top:70px;height:auto;"
          @submit.prevent="submitCarHandler"
        >
          <h1 class="form-page-title">New Car</h1>
          <div class="form-group">
            <label for="brand">Brand</label>
            <input
              type="text"
              id="brand"
              class="form-control"
              placeholder="Opel"
              v-model="car.brand"
            />
             <span class="text-danger" v-if="this.formErrors != null && this.formErrors.brand">{{this.formErrors.brand}}</span>
          </div>
          <div class="form-group">
            <label for="model">Model</label>
            <input
              type="text"
              id="model"
              class="form-control"
              placeholder="Corsa"
              v-model="car.model"
            />
             <span class="text-danger" v-if="this.formErrors != null && this.formErrors.model">{{this.formErrors.model}}</span>
          </div>
          <div class="form-group">
            <label for="year">Year</label>
            <input
              type="number"
              id="year"
              class="form-control"
              placeholder="2020"
              v-model="car.year"
            />
             <span class="text-danger" v-if="this.formErrors != null && this.formErrors.year">{{this.formErrors.year}}</span>
          </div>
          <div class="form-group">
            <label for="price">Price</label>
            <input
              type="text"
              id="price"
              class="form-control"
              placeholder="10000"
              v-model="car.price"
            />
             <span class="text-danger" v-if="this.formErrors != null && this.formErrors.price">{{this.formErrors.price}}</span>
          </div>
          <div class="text-center mt-5">
            <center>
              <button class="btn btn-dark btn-lg btn-block w-75 my-4" type="submit">
                New Car
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
            car: {
                brand: "",
                model: "",
                year: "",
                price: ""
            },
            formErrors: null
        }
    },
    methods: {
        async submitCarHandler() {
            try {
                let response = await this.$http.post('/car', this.car);
                let data = response.data;

                if (data.errors) {
                    this.formErrors = data.errors;
                    return;
                }

                if (data.successMessage) {
                    sweetalert('Success', data.successMessage, "success");
                    this.$router.push('/');
                }
            } catch (err) {
                let errorMessage = err?.response?.data?.errorMessage ?? "Error";
                sweetalert(errorMessage, "", "error");
            }
        }
    }
}
</script>