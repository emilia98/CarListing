<template>
  <div class="container mt-5">
    <ViewCar :car="this.car" :isAuthor="this.isAuthor"/>
  </div>
</template>
<script>
import sweetalert from 'sweetalert';
import ViewCar from '../../components/cars/ViewCar';

export default {
     data() {
        return {
            car: null,
            isAuthor: false
        }
    },
    async created() {
        try {
            let response = await this.$http.get(`/car/${this.$route.params.id}`);
            if (response?.data?.car) {
                this.car = response.data.car;
                this.isAuthor = response.data.isAuthor;
            }
        } catch(err) {
            let errorMessage = err.response?.data?.errorMessage ?? 'Error';
            sweetalert(errorMessage, 'Error', 'error');
            this.$router.push('/');
        }
    },
    components: {
        ViewCar
    }
};
</script>
