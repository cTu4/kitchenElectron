<template>
  <div class="column">
      <div class="right-bar-cart date">
        <div class="time t-36px">
          {{time}}
        </div>
        <div class="date t-13px">
          {{date | moment("dd, MMMM DD")}}
        </div>
        <div class="location t-13px">
          Moscow
        </div>
      </div>
      <div class="right-bar-cart order">
        <img src="/src/renderer/images/Add.png">
        <div class="t-17px font-weight-600">
          New Order
        </div>
      </div>
      <div class="right-bar-cart issue">
        <img src="/src/renderer/images/Check_Out.png">
        <div class="t-17px font-weight-600">
          For Issue
        </div>
      </div>
      <div class="right-bar-cart cooks">
        <img src="/src/renderer/images/Cooks.png">
        <div class="t-17px font-weight-600">
          Cooks
        </div>
      </div>
      <div class="right-bar-cart waiters">
        <img src="/src/renderer/images/Waiters.png">
        <div class="t-17px font-weight-600">
          Waiters
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
        time: ''
    }
  },
  methods:{
    setDate(){
      let date = new Date();
      let res = String((date.getHours() < 10) ? '0' + date.getHours() : date.getHours()) + ":" +
        String((date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes());
      this.time = res;
    }
  },
  computed:{
      date(){
        let res = new Date();
        return res;
      }
  },
  created() {
    this.setDate();
    setInterval(this.setDate,1000);
  }
}
</script>

<style scoped>
.column{
  width: 20%;
  padding: 8px;
}
.right-bar-cart{
  text-align: center;
  border-radius: 10px;
  background: rgba(37, 40, 44, 0.05);
  padding: 20px;
  margin: 8px 0;
  cursor: pointer;
}
.time{
  margin-bottom: 8px;
}
.right-bar-cart img{
  margin-bottom: 28px;
  margin-top: 16px;
}
.right-bar-cart > div{
  /*margin-bottom: 20px;*/
}
</style>
