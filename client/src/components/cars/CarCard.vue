<template>
  <div class="card mb-5">
    <img
      v-if="car.image === null"
      class="card-img-top"
      src="https://blog.nscsports.org/wp-content/uploads/2014/10/default-img.gif"
      alt="no image provided"
    />
    <img
      v-if="car.image"
      class="card-img-top"
      src="car.image"
      :alt="`image car ${car.id}`"
    />
    <div class="card-body">
      <h5 class="card-title">{{ car.brand }} {{ car.model }}</h5>
      <div class="card-text">
        <p>
          <span class="badge badge-dark badge-custom">{{ car.price }}$</span>
        </p>

        <p><span>Year: </span> {{ car.year }}</p>
      </div>
      <router-link
        :to="`/car/${car.id}`"
        class="btn btn-dark btn-sm text-center"
        v-if="isLoggedIn"
        >See More</router-link
      >
    </div>
  </div>
</template>
<script>
export default {
  props: ["car"],
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>
