import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {
  Button,
  Row,
  Col,
  Swipe,
  SwipeItem,
  Lazyload,
  List,
  Field,
  NavBar,
  Toast,
  Tab,
  Tabs,
  PullRefresh,
  Tabbar,
  TabbarItem,
  Stepper,
  Cell,
  CellGroup,
  Search,
  Panel,
  Icon,
  GoodsAction,
  GoodsActionButton,
  GoodsActionIcon,
  SubmitBar,
  Checkbox,
  CheckboxGroup,
  Card,
  Tag,
  Divider,
  Grid,
  GridItem,
  Sidebar,
  SidebarItem,
  Sticky,
  AddressList,
  AddressEdit
} from 'vant'

Vue.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(Field).use(NavBar).use(Toast).use(Tab).use(Tabs).use(PullRefresh).use(Tabbar).use(TabbarItem).use(Stepper).use(Cell).use(CellGroup).use(Search).use(Panel).use(Icon).use(GoodsAction).use(GoodsActionButton).use(GoodsActionIcon).use(SubmitBar).use(Checkbox).use(CheckboxGroup).use(Card).use(Tag).use(Divider).use(Grid).use(GridItem).use(Sidebar).use(SidebarItem).use(Sticky).use(AddressEdit).use(AddressList)

Vue.config.productionTip = false
Vue.prototype.$mock = require('mockjs')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')