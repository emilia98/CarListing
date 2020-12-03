<template>
  <div class="view-car">
    <div class="row">
      <div class="col-6 col-md-6 col-xs-12">
        <img v-if="car.image === null" src="https://blog.nscsports.org/wp-content/uploads/2014/10/default-img.gif" alt="no image provided" />
        <img v-if="car.image" src="car.image" :alt="`image car ${car.id}`" />
      </div>
      <div class="col-md-6 col-xs-12">
        <h2 class="text-center display-4 mb-3 ">{{car.brand}} {{car.model}}</h2>
        <p>
          <span class="label">Price: </span>
          <span class="badge badge-light badge-custom">{{car.price}}$</span>
        </p>
        <p>
          <span class="label">Year: </span>
          <span class="value">{{car.year}}</span>
        </p>
        <p>
          <span class="label">Description: </span>
          <span class="value">
              {{car.description == null ? 'N/A' : car.description}}
          </span>
        </p>
        <div class="mt-5 mb-5 actions" v-if="isLoggedIn">
            <button class="btn btn-primary">Buy</button>
            <router-link :to="`/car/update/${car.id}`" class="btn btn-info" v-if="isAuthor">Edit</router-link>
            <button class="btn btn-danger" v-if="isAuthor" @click="deleteCar(car.id)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import sweetalert from 'sweetalert';

export default {
  props: ["car", "isAuthor" ],
  computed: {
      isLoggedIn: function() {
          return this.$store.getters.isLoggedIn;
      }
  },
  methods: {
    deleteCar: async function(carId) {
      try {
        let response = await this.$http.delete(`/car/${carId}`);
        let data = response.data;

        if (data.successMessage) {
          sweetalert('Success', data.successMessage, 'success');
          this.$router.push('/');
        }
      } catch (err) {
        let errorMessage = err?.response?.data?.errorMessage ?? 'Error';
        sweetalert(errorMessage, 'Error', 'error');
        this.$router.push('/');
      }
    }
  }

};
</script>