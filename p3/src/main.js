// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import VeeValidate from 'vee-validate'
import Loading from "vue-loading-overlay";
import CKEditor from '@ckeditor/ckeditor5-vue';
import Router from 'vue-router';
//primeng
import FullCalendar from 'primevue/fullcalendar';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';

Vue.component('FullCalendar', FullCalendar);
Vue.component('Calendar', Calendar);
Vue.component('Dropdown', Dropdown);
Vue.component('Button', Button);
Vue.component('Loading', Loading);
Vue.component('DataTable', DataTable);
Vue.component('Column', Column);
Vue.component('InputText', InputText);
Vue.component('Toast', Toast);


Vue.use(BootstrapVue)
Vue.use(VeeValidate);
Vue.use(ToastService);
Vue.use(CKEditor);
Vue.use(Router)

localStorage.setItem("favoriteList", null)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
