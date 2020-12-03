<template>
  <div class="container mt-5">
    <h1 class="text-center display-4 mb-5">Welcome to CarListing App</h1>
    <div class="row">
      <div v-for="car in cars" :key="car.id" class="col-md-3">
        <CarCard :car="car"/>
      </div>
    </div>
  </div>
</template>
<script>
import sweetalert from "sweetalert";
import CarCard from "../components/cars/CarCard";

export default {
  data() {
    return {
      cars: [],
    };
  },
  async created() {
    try {
      let response = await this.$http.get("/car");

      if (response?.data?.cars) {
        this.cars = response.data.cars;
      }
    } catch (err) {
      sweetalert("Error", err, "error");
    }
  },
  components: {
    CarCard,
  },
};
</script>
<style scoped></style>
