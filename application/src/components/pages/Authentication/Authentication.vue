<template>
  <div class="l-auth-container">
    <div class="l-auth" v-if="authVisible">
      <h3 class="text-xs-center light-blue--text">Авторизация</h3>
      <v-form v-model="validLogin">
        <v-text-field label="Введите логин"
                      v-model="credentials.username"
                      prepend-icon="account_box"
                      :rules="rules"
                      required
                      color="light-blue lighten-1">
        </v-text-field>

        <v-text-field label="Введите пароль"
                      v-model="credentials.password"
                      prepend-icon="lock"
                      :rules="rules"
                      :append-icon="loginPasswordVisible ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (loginPasswordVisible = !loginPasswordVisible)"
                      :type="loginPasswordVisible ? 'text' : 'password'"
                      color="light-blue lighten-1"
                      required>
        </v-text-field>

        <v-btn block color="light-blue lighten-1 mb-3" @click.native="submitAuthentication()">Войти</v-btn>
        <p class="text-xs-center light-blue--text mb-0">У вас ещенет аккаунта?</p>
        <v-btn block flat color="light-blue lighten-1" @click.native="signUpVisible = true,authVisible = false">Зарегистрироваться</v-btn>

      </v-form>
    </div>

    <div class="l-signup" v-if="signUpVisible">

      <v-form v-model="validSignUp">
        <h3 class="text-xs-center light-blue--text">Регистрация</h3>
        <v-text-field label="Введите логин"
                      v-model="newUser.username"
                      prepend-icon="account_box"
                      :rules="rules"
                      required
                      color="light-blue lighten-1">
        </v-text-field>

        <v-text-field label="Введите e-mail"
                      v-model="newUser.email"
                      prepend-icon="email"
                      :rules="rules"
                      required
                      color="light-blue lighten-1">
        </v-text-field>

        <v-text-field label="Введите пароль"
                      v-model="newUser.password"
                      prepend-icon="lock"
                      :rules="rules"
                      :append-icon="signUpPasswordVisible ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (signUpPasswordVisible = !signUpPasswordVisible)"
                      :type="signUpPasswordVisible ? 'text' : 'password'"
                      color="light-blue lighten-1"
                      required>
        </v-text-field>

        <v-btn block color="light-blue lighten-1" @click.native="submitSignUp()">Зарегистрироваться</v-btn>

        <v-btn block flat color="light-blue lighten-1" @click.native="signUpVisible = false,authVisible = true">Войти</v-btn>

      </v-form>
    </div>

    <v-snackbar :timeout="timeout"
                bottom="bottom"
                color="red lighten-1"
                v-model="snackbar">
      {{ message }}
    </v-snackbar>
  </div>
</template>

<script>
  import Authentication from '@/components/pages/Authentication'
  export default {
    data () {
      return {
        snackbar: false,
        validLogin: false,
        validSignUp: false,
        signUpVisible: false,
        authVisible: true,
        loginPasswordVisible: false,
        signUpPasswordVisible: false,
        timeout: 6000,
        rules: [ (value) => !!value || 'This field is required' ],
        credentials: {
          username: '',
          password: ''
        },
        newUser: {
          username: '',
          password: ''
        },
        message: ''
      }
    },
    methods: {
      submitAuthentication () {
        Authentication.authenticate(this, this.credentials, '/')
      },

      submitSignUp () {
        Authentication.signup(this, this.newUser, '/')
      }
    }
  }
</script>

<style lang="scss">
  @import "./../../../assets/styles";

  .l-auth {
    background-color: $background-color;
    padding: 15px;
    margin: 45px auto;
    min-width: 272px;
    max-width: 320px;
    animation: bounceIn 1s forwards ease;

    label, input, .icon {
      color: #29b6f6!important;
    }

    .input-group__details {
      &:before {
        background-color: $border-color-input !important;
      }
    }
  }

  .l-signup {
    @extend .l-auth;
    animation: slideInFromLeft 1s forwards ease;
  }
</style>
