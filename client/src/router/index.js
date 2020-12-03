import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/auth/Login.vue';
import Register from '../views/auth/Register.vue';
import CreateCar from '../views/cars/CreateCar.vue';
import ViewCar from '../views/cars/ViewCar.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/auth/login',
        name: 'login',
        component: Login,
        meta: {
            notAuthenticated: true
        }
    },
    {
        path: '/auth/register',
        name: 'register',
        component: Register,
        meta: {
            notAuthenticated: true
        }
    },
    {
        path: '/car/new',
        name: 'new',
        component: CreateCar,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/car/:id',
        name: 'getCarById',
        component: ViewCar,
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next();
            return;
        }
        next('/auth/login');
    } else {
        next()
    }
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.notAuthenticated)) {
        if (!store.getters.isLoggedIn) {
            next();
            return;
        }
        next('/');
    } else {
        next();
    }
});

export default router;