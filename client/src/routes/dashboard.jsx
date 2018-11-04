import Dashboard from "views/Dashboard/Dashboard.jsx";
import Notifications from "views/Notifications/Notifications.jsx";
import Icons from "views/Icons/Icons.jsx";
import Typography from "views/Typography/Typography.jsx";
import TableList from "views/TableList/TableList.jsx";
import Maps from "views/Maps/Maps.jsx";
import UserPage from "views/UserPage/UserPage.jsx";
import CampDetail from "views/CampDetail/CampDetail.jsx";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Kamplar",
    icon: "nc-icon nc-bank",
    component: Dashboard
  },
  {
    path: "/icons",
    name: "Kayıt",
    icon: "nc-icon nc-badge",
    component: Icons
  },
  {
    path: "/camp-detail",
    name: "Kamp Detayı",
    icon: "nc-icon nc-user-run",
    component: CampDetail
  },
  /*
  {
    path: "/maps",
    name: "Ön Kayıt Listesi",
    icon: "nc-icon nc-bullet-list-67",
    component: Maps
  },*/
  {
    path: "/tables",
    name: "Sporcu Listesi",
    icon: "nc-icon nc-user-run",
    component: TableList
  },

  {
    path: "/notifications",
    name: "Ödeme Raporları",
    icon: "nc-icon nc-credit-card",
    component: Notifications
  },

  {
    path: "/users",
    name: "Kullanıcı Yönetimi",
    icon: "nc-icon nc-settings",
    component: TableList
  },
/*
  {
    path: "/user-page",
    name: "Kullanıcı Profili",
    icon: "nc-icon nc-single-02",
    component: UserPage
  },


  {
    path: "/tables",
    name: "Table List",
    icon: "nc-icon nc-tile-56",
    component: TableList
  },

  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-caps-small",
    component: Typography
  },
*/
  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;
