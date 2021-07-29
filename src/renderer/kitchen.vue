<template>
  <div id="kitchen" class="d-flex">
        <app-sidebar
            :IsDev="IsDev"
            :tables=tables>
        </app-sidebar>
        <div class="kanban d-flex" >
          <column
              @onFlow_column="changeStatusDish"
              v-for="(column, status, index) in kanban"
              :key="index"
              :id="index"
              :index="index"
              :column=column
              :status=status >
          </column>
        </div>
        <right-bar
            :IsDev="IsDev">
        </right-bar>
  </div>

</template>

<script>
import sidebar from './components/sidebar.vue'
import column from './components/column.vue'
import right_bar from './components/right_bar.vue'
import Draggable from 'vuedraggable'
import axios from 'axios';

export default {
  name: 'app',
  data() {
    return {
      id: 100,
      tables: {},
      kanban: {
        'income': {
          status: 'Income',
          dishes: [

          ]
        },
        'progress':{
          status: 'In Progress',
          dishes: [

          ]
        },
        'ready':{
          status: 'Ready',
          dishes: [

          ]
        }
      }
    }
  },

  methods:{
    changeStatusDish(index,status, dish){
      console.log(index,status);
      console.log(this.kanban[status].dishes[index]);
      this.kanban[status].dishes.splice(index,1);
      switch (status){
        case 'income':
          dish.status = 'progress';
          this.kanban.progress.dishes.push(dish);
          break;
        case 'progress':
          dish.status = 'ready';
          this.kanban.ready.dishes.push(dish);
          break;
      }
      console.log(this.kanban);
      $('.dish.blur').toggleClass('blur');
    },
    GetDish(dish, kitchen, delay){
      dish.id = this.id;
      dish.name = dish.dishName;
      dish.table_number = this.randomInteger(1,20);
      dish.time = dish.prepTime;
      dish.time_placement = delay? moment().unix() - this.randomInteger(0,600) : moment().unix() ;
      dish.comment = "Without honey";
      dish.code = "D17";
      dish.status = "income";
      dish.options = [
        "Label",
        "Label 2"
      ];
      kitchen.id++;
      return dish;
    },
    randomInteger(min, max) {
      // случайное число от min до (max+1)
      let rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    },
     addTable(){
      let timeout = this.randomInteger(0,60000);
      let kitchen = this;
      // let k = this.id++;
      setTimeout(function (){
        axios.get("https://api.brest.app/kitchen/").then((resp) =>{

          let dish = kitchen.GetDish(resp.data[0], kitchen, false);

          kitchen.kanban.income.dishes.push(dish);
        }).catch((error)=> console.log(error))
      }, timeout);
      console.log(timeout);

     },
    deleteTable(){
        this.kanban.ready.dishes.pop();
    }
  },
  computed:{
    IsDev(){
      return  process.env.npm_package_name;
    }
  },
  created() {
    // axios.get(" https://api.brest.app/tables/statuses").then((resp) =>{
    //   let tabless = resp.data;
    //   let data = {};
    //   for(let table in tabless){
    //     data[table] = tabless[table];
    //   }
    //   this.tables = data;
    // }).catch((error)=> console.log(error));

  for (let i=1;i<5; i+=3){
    axios.get("https://api.brest.app/kitchen/").then((resp) =>{
            let dish = this.GetDish(resp.data[0], this, true);
      // let dish2 = this.GetDish(resp.data[0], this, true);
      // let dish3 = this.GetDish(resp.data[0], this, true);

      dish.status = 'income';
      // dish2.status = 'income';
      // dish3.status = 'income';

      // this.kanban.income.dishes[dish.id] = dish;

      this.kanban.income.dishes.push(dish);
      // this.kanban.income.dishes.push(dish2);
      // this.kanban.income.dishes.push(dish3);

    }).catch((error)=> console.log(error));
    axios.get("https://api.brest.app/kitchen/").then((resp) =>{
      let dish = this.GetDish(resp.data[0], this, true);
      dish.status = 'progress';
      this.kanban.progress.dishes.push(dish);
    }).catch((error)=> console.log(error));
    axios.get("https://api.brest.app/kitchen/").then((resp) =>{
      let dish = this.GetDish(resp.data[0], this, true);
      dish.status = 'ready';
      this.kanban.ready.dishes.push(dish);
    }).catch((error)=> console.log(error));

    // axios.post("https://equilit.eu.auth0.com/oauth/token/",{
    //   'client_id' : '53MrMuBXG87ERcoyHkYjJmU2rnvAwuaX',
    //   'client_secret' : "lqQ71jjtaOk-F9zJoUbtMn-n9rgcAHIkkj5yiKCaTjmwke-lHjrQm-Kxf-qBh7bl",
    //   'audience': 'https://rests.users.api',
    //   'grant_type': "client_credentials"
    // }).then((resp) =>{
    //  let data = resp.data;
    //   console.log(resp.data.access_token);
    //
    //   axios.post("http://rests.users.api/",{
    //     'authorization' :  "Bearer" + data.access_token
    //   }).then((response) =>{
    //     console.log(response)
    //   });
    // }).catch((error)=> console.log(error));

  }

  },
  mounted(){
    setInterval(this.addTable, 10000);
    setInterval(this.deleteTable, 50000);


  },

  components: {
    AppSidebar: sidebar,
    Column: column,
    RightBar: right_bar,
    Draggable

  }
}
</script>

<style>

@import "css/style.css";
  body{
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none;   /* Chrome/Safari/Opera */
    -khtml-user-select: none;    /* Konqueror */
    -moz-user-select: none;      /* Firefox */
    -ms-user-select: none;       /* Internet Explorer/Edge */
    user-select: none;
    min-height: 100vh;
    background: #e8e9eb;
  }
  #kitchen{
    /*min-height: 700px;*/
    /*max-height: 100%;*/
    max-height: 800px;
    min-height: 100vh;
    max-width: 1024px;
    margin: auto;
  }
  .pointer{
    cursor: pointer;
  }
  .kanban{
    width: 80%;
    /*height: 100%;*/
  }
  body{
    /*font-family: Inter;*/
    font-style: normal;
  }

</style>
