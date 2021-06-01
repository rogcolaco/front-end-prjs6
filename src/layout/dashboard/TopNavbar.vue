<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">{{routeName}}</a>
      <button class="navbar-toggler navbar-burger"
              type="button"
              @click="toggleSidebar"
              :aria-expanded="$sidebar.showSidebar"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
      </button>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a href="/cadastro" class="nav-link cadastroBtn" round>
              <i class="ti-user"></i>
              <p>Cadastre-se</p>
            </a>
          </li>
          <!-- <drop-down class="nav-item"
                     title="5 Notifications"
                     title-classes="nav-link"
                     icon="ti-bell">
            <a class="dropdown-item" href="#">Notification 1</a>
            <a class="dropdown-item" href="#">Notification 2</a>
            <a class="dropdown-item" href="#">Notification 3</a>
            <a class="dropdown-item" href="#">Notification 4</a>
            <a class="dropdown-item" href="#">Another notification</a>
          </drop-down> -->
          <!-- <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="ti-settings"></i>
              <p>
                Settings
              </p>
            </a>
          </li> -->
        </ul>
      </div>
    </div></nav>
</template>
<script>
export default {
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    }
  },
  data() {
    return {
      activeNotifications: false
    };
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    }
  }
};
</script>
<style lang="scss" scoped>

.cadastroBtn {
  background: #4bda3e;
  padding: 10px 30px !important;
  border-radius: 20px;
  color: #000 !important;
  box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.15);
  -webkit-box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.15);
  -moz-box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.15);
  margin-right: 15px !important;
}

.cadastroBtn:hover {
  background: #1cf308;
  box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.5);
  -webkit-box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.5);
  -moz-box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.5);
}

.navbar-nav .nav-item .cadastroBtn p{
    color: #000 !important;
  }

</style>
