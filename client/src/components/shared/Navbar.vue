<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="#">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item" v-if="isLoggedIn">
            <button class="btn btn-primary nav-link text-light mr-3">
              New Car
            </button>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <a class="nav-link"> Logout</a>
          </li>
          <li class="nav-item">
            <router-link to="/auth/login" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/auth/register" class="nav-link">Register</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
