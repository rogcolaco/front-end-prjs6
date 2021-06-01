import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import Notifications from "@/pages/Notifications.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Typography from "@/pages/Typography.vue";
import TableList from "@/pages/TableList.vue";
import RendaFixa from "@/pages/RendaFixa/RendaFixa.vue";
import FundosInvestimento from "@/pages/Founds/fundosInvestimento.vue";
import Darf from "@/pages/darf.vue";
import Selic from "../pages/Selic.vue"
import IPCA from "../pages/IPCA.vue"
import RegisterContact from "../pages/RegisterContact.vue"
import DeleteContact from "../pages/DeleteContact.vue"


const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/rendafixa",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "stats",
        name: "stats",
        component: UserProfile
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications
      },
      {
        path: "icons",
        name: "icons",
        component: Icons
      },
      {
        path: "maps",
        name: "maps",
        component: Maps
      },
      {
        path: "typography",
        name: "typography",
        component: Typography
      },
      {
        path: "table-list",
        name: "table-list",
        component: TableList
      },
      {
        path: "rendafixa",
        name: "Renda Fixa",
        component: RendaFixa
      },
      {
        path: "fundodeinvestimento",
        name: "Fundo de Investimento",
        component: FundosInvestimento
      },
      {
        path: "darf",
        name: "DARF",
        component: Darf
      },
      {
        path: "selic",
        name: "SELIC",
        component: Selic
      },
      {
        path: "ipca",
        name: "IPCA",
        component: IPCA
      },
      {
        path: "cadastro",
        name: "Cadastro",
        component: RegisterContact
      },
      {
        path: "excluircadastro",
        name: "Excluir Cadastro",
        component: DeleteContact
      },
    ]
  },
  { path: "*", component: NotFound }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
