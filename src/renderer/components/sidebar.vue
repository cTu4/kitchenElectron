<template>
    <div class="sidebar d-flex flex-column  align-items-center">
      <div class="menu text-center pointer">
          <img :src="IsDev ? '/src/renderer/images/Union.png':'/var/www/html/kitchenElectron/build/linux-unpacked/resources/images/Union.png'">
      </div>
      <div class="table-icon" :class="table.Status === 'Free' ?'blue':'white'" v-for="table in tables">
        <div class="t-13px font-weight-700" :class="table.Status === 'Free' ? 't-white':''">{{table.Number}}</div>
        <div class="t-13px font-weight-400" :class="table.Status === 'Free' ? 't-white':''">{{table.Capacity}}</div>
      </div>
    </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {

    }
  },
  props: {
    tables: Object,
    IsDev: String
  }
}
</script>

<style scoped>
.sidebar{
  width: 60px;
  /*height: 100%;*/
  background: rgba(247, 248, 250, 0.7);
  box-shadow: 2px 2px 4px rgba(37, 40, 44, 0.02), 10px 30px 60px rgba(37, 40, 44, 0.1);
  backdrop-filter: blur(60px);
  border-radius: 0 25px 0 0;
  padding-top: 15px;
}
.menu{
  width: 28px;
  padding: 2px 7px;
  background: rgba(37, 40, 44, 0.05);
  border-radius: 16px;
}
.table-icon{
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 4px;
  position: relative;
  margin: 12px 0;
}
.white{
  background: #FFFFFF;
}
.blue{
  background: #1A79EE;
}
.table-icon div{
  position: absolute;
}
.table-icon  div:first-child{
  top: 4px;
  left: 4px;
}
.table-icon div:last-child{
  bottom: 4px;
  right: 4px;
}
</style>
