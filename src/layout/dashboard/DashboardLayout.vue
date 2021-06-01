<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <!--<sidebar-link to="/dashboard" name="Dashboard" icon="ti-panel" />
  <sidebar-link to="/stats" name="User Profile" icon="ti-user" />
  <sidebar-link to="/table-list" name="Table List" icon="ti-view-list-alt" />
  <sidebar-link to="/typography" name="Typography" icon="ti-text" /> -->
        <!-- <sidebar-link to="/icons" name="Icons" icon="ti-pencil-alt2" /> -->
        <!-- <sidebar-link to="/maps" name="Map" icon="ti-map" />
  <sidebar-link to="/notifications" name="Notifications" icon="ti-bell" /> -->
        <sidebar-link to="/rendafixa" name="Renda Fixa" icon="ti-money" />
        <sidebar-link to="/fundodeinvestimento" name="Fundo de Investimento" icon="ti-stats-up" />
        <sidebar-link to="/ipca" name="IPCA" icon="ti-stats-up" />
        <sidebar-link to="/selic" name="Selic" icon="ti-stats-up" />
        <sidebar-link
          to="/darf"
          name="DARF - Imposto de Renda"
          icon="ti-file"
        />
      </template>
      <mobile-menu>
        <li class="nav-item">
          <a class="nav-link">
            <i class="ti-panel"></i>
            <p>Stats</p>
          </a>
        </li>
        <!-- <drop-down class="nav-item"
                   title="5 Notifications"
                   title-classes="nav-link"
                   icon="ti-bell">
          <a class="dropdown-item">Notification 1</a>
          <a class="dropdown-item">Notification 2</a>
          <a class="dropdown-item">Notification 3</a>
          <a class="dropdown-item">Notification 4</a>
          <a class="dropdown-item">Another notification</a>
        </drop-down> -->
        <li class="nav-item">
          <a class="nav-link">
            <i class="ti-settings"></i>
            <p>Settings</p>
          </a>
        </li>
        <li class="divider"></li>
      </mobile-menu>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar"> </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
