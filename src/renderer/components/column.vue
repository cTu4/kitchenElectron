<template>

  <div  class="column d-flex flex-column">
    <div class="title">
        <span class="text t-24px font-weight-700">{{column.status}}</span>
        <span class="summ t-11px t-gray-op3">{{column.dishes.length}}</span>
    </div>
    <div class="subtitle">
      <span class="text">All</span>
      <span class="summ">{{column.dishes.length}}</span>
    </div>
    <draggable :list="column.dishes"
               ghost-class="ghost"
               class="list-group"
               v-bind="dragOptions"
               @start="move"
               @change="change(index, $event)"
    >
        <card @onFlow_card="flow" class="wrap" v-for="dish in column.dishes" :dish="dish" :status="status" :key="dish.id"></card>
    </draggable>


  </div>

</template>

<script>
import Draggable from 'vuedraggable'
import rawDisplayer from './rawDisplayer'
import card from './card'

export default {
  name: 'app',
  props: [
    "column",
    "status",
    "index"
  ],
  components:{
    Draggable,
    rawDisplayer,
    card: card
  },
  methods:{
    flow(dish){
      let index = this.column.dishes.indexOf(dish);
      this.$emit("onFlow_column", index, dish.status,dish);
    },
    change(index,e){
      if(e.added){
        switch (index){
          case 0:
            e.added.element.status = 'income';
            break;
          case 1:
            e.added.element.status = 'progress';
            break;
          case 2:
            e.added.element.status = 'ready';
            break;
        }


        // request to change status of dish
      }
    },
    move(e){
      let card = $(e.item).find('.dish.active');
      card.toggleClass('active');
      card.next().toggleClass('active');
      card.parent().siblings('.wrap').find('.dish').toggleClass('blur');

    }
  },
  mounted() {
    console.log(this.column)
  },
  computed: {
    checkTime(dish){
      console.log(dish);
    },
    DragClass(){
      let DragClass = "";
      switch (this.status){
        case "income":
          DragClass = "";
          break;

        case "progress":
          DragClass = "income"
          break;
        case "ready":
          DragClass = ["progress"];
          break;
      }
      return DragClass;
    },
    dragOptions() {
      return {
        animation: 200,
        group: {
          name: this.status,
          put: this.DragClass
        },
        disabled: false,
        ghostClass: "ghost",
        sort: true,
        delay: 100,
        delayOnTouchOnly: true,
        forceFallback: true,
        scrollSensitivity: 200,

      };
    }
  },
  data () {

    return {

    }
  }
}
</script>

<style scoped>
  .column{
    width: 33.3%;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    padding: 16px 12px;
    height: 100%;
  }

  .title .summ{
    vertical-align: top;
  }
  .wrap{
    position: relative;
  }
  .list-group{
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    max-height: 100vh;
  }
  .list-group,.list-group span{
    height: 100%;
  }
  ::-webkit-scrollbar {
    display: none;
  }
</style>
