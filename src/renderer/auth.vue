<template>
    <div class="auth">
      <notifications position="top right"/>
        <div class="auth-form ">
            <div class="auth-form-panel active">
              <h2 class="auth-form-title t-24px t-white font-weight-bold">Scan your QR-code</h2>
              <a href="/" class="auth-block pointer">
                  <div class="auth-block-img">

                  </div>
                  <div class="auth-block-name t-28px font-weight-700">
                    Vasya Pupkin
                  </div>
              </a>

            </div>

          <div class="main-keyboard ">
            <div class="auth-form__panel auth-form__panel_dark" data-panel="code">
              <h2 class="auth-form__title t-24px t-white font-weight-bold">Enter your 4-digits code</h2>
              <form action="/" method="POST" class="auth-pin-code">
                <div class="c-field">
                  <div class="custom-input">
                    <div class="custom-input__decor d-flex justify-content-between">
                      <div class="code code-1"></div>
                      <div class="code code-2"></div>
                      <div class="code code-3"></div>
                      <div class="code code-4"></div>
                    </div>
                    <input class="custom-input__input" type="password" maxlength="4" name="CODE">
                  </div>
                  <div id="numpad">
                    <div class="row justify-content-between">
                      <div class="number t-56px">1</div>
                      <div class="number t-56px">2</div>
                      <div class="number t-56px">3</div>
                    </div>
                    <div class="row justify-content-between">
                      <div class="number t-56px">4</div>
                      <div class="number t-56px">5</div>
                      <div class="number t-56px">6</div>
                    </div>
                    <div class="row justify-content-between">
                      <div class="number t-56px">7</div>
                      <div class="number t-56px">8</div>
                      <div class="number t-56px">9</div>
                    </div>
                    <div class="row justify-content-center">
                      <div class="number t-56px">0</div>
<!--                      <div class="number t-56px">-->
<!--                        <img src="./images/delete.png" alt="">-->
<!--                      </div>-->

                    </div>



                  </div>

                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="keyboard">
            <div class="btn-keyboard pointer"></div>

        </div>
    </div>
</template>

<script>
import Notifications from 'vue-notification'
import Vue from "vue";
Vue.use(Notifications);




export default {
  name: "auth",
  methods:{
    addKey(value){
      if($('.main-keyboard.active').length){
        let input = $('.custom-input__input');
        let old_value = input.val();
        let new_value = old_value;
        if(old_value.length < 4){
          new_value = old_value + value;
          input.val(new_value);
        }
        switch (old_value.length){
          case 0:
            $('.code-1').toggleClass('active');
            break;
          case 1:
            $('.code-2').toggleClass('active');
            break;
          case 2:
            $('.code-3').toggleClass('active');
            break;
          case 3:
            $('.code-4').toggleClass('active');
            if(new_value === '1111'){
              document.location.href="/";
            }
            else{
              this.$notify({
                title: 'Authorization',
                text: 'Wrong password!',
                type: 'error'
              });
              input.val('');
              $('.code-1').toggleClass('active');
              $('.code-2').toggleClass('active');
              $('.code-3').toggleClass('active');
              $('.code-4').toggleClass('active');

            }
            break;
        }
      }

    }
  },
  mounted() {
    $(document).bind('keypress', (e)=>{
      let keyCode = e.which ? e.which : e.keyCode
      if ((keyCode >= 48 && keyCode <= 57)) {
        this.addKey(String.fromCharCode(keyCode));

      }
    });


    $('.btn-keyboard').bind('click', (e)=>{
      $('.main-keyboard').toggleClass('active');
      $('.auth-form-panel').toggleClass('active');
    });

    $('.number').on('click', (e)=>{
      this.addKey($(e.target).text());
      // let input = $('.custom-input__input');
      // let old_value = input.val();
      // let new_value = old_value;
      // if(old_value.length < 4){
      //   new_value = old_value + $(e.target).text();
      //   input.val(new_value);
      // }
      // switch (old_value.length){
      //   case 0:
      //     $('.code-1').toggleClass('active');
      //     break;
      //   case 1:
      //     $('.code-2').toggleClass('active');
      //     break;
      //   case 2:
      //     $('.code-3').toggleClass('active');
      //     break;
      //   case 3:
      //     $('.code-4').toggleClass('active');
      //     if(new_value === '1111'){
      //       document.location.href="/";
      //     }
      //     else{
      //       alert("Wrong password!");
      //       input.val('');
      //       $('.code-1').toggleClass('active');
      //       $('.code-2').toggleClass('active');
      //       $('.code-3').toggleClass('active');
      //       $('.code-4').toggleClass('active');
      //
      //     }
      //     break;
      // }

    })
  }
}
</script>

<style scoped>

  .auth{
    background-image: url("./images/rest.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    flex: 0 0 auto;
    height: 100vh;
    width: 100%;
    position: relative;
    font-family: "Inter",sans-serif!important;

  }
  .auth-form{
    height: 100%;
    width: 100%;
    background-color: rgba(36,39,46,.96);
  }
  .auth-form-panel, .main-keyboard {
    height: 100%;
    text-align: center;
    padding: 80px 0;
    color: #fff;
  }
  .main-keyboard{
    margin: 0 auto;
    width: 320px;
  }
  .auth-block{
    margin: 96px auto 0 auto;
    background: #fff;
    padding: 16px;
    color: #000!important;
    width: 270px;
    height: 270px;
    border: 8px solid #fff;
    border-radius: 16px;
    text-decoration: none;
    text-align: center;
    display: block;
  }
  .auth-block-img{
    height: 100px;
    width: 100px;
  }
  .auth-block:hover > *{
    text-decoration: none!important;
    color: #000!important;

  }
  .auth-block a{
    color: #000!important;
  }
  .keyboard{
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 20px;
  }
  .btn-keyboard{
    background: #1b5ce0;
    height: 56px;
    width: 56px;
    border-radius: 16px;
  }
  .main-keyboard, .auth-form-panel{
    display: none;
  }
  .main-keyboard.active, .auth-form-panel.active{
    display: block;
  }
  .custom-input{
      padding: 0 75px;

  }
  .custom-input__decor{
    margin-bottom: 50px;

  }
  .custom-input__input{
    display: none;
  }
  .code{
    height: 20px;
    width: 20px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.1);
  }
  .code.active{
    background: #fff;

  }
  .auth-form__title{
    margin-bottom: 20px;
  }
  #numpad{
    padding: 0 50px;
  }
  .number{
    cursor: pointer;
  }

</style>
