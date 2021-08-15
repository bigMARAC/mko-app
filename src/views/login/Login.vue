<template>
  <v-row style="height: 80vh" justify="center" align="center">
    <v-col cols="12" md="5" lg="5" align="center">
    <v-img max-width="150" class="mt-n16 mb-5" src="../../assets/logo-min.png"></v-img>

    <v-form v-model="valid" ref="login_form">
      <v-text-field
        v-model="user.email"
        label="E-mail"
        required
        append-icon="mdi-email"
        outlined
        dense
        :rules="emailRules"
      >
      </v-text-field>
      <v-text-field
        v-model="user.password"
        label="Senha"
        required
        append-icon="mdi-lock"
        outlined
        dense
        type="password"
        :counter="counter"
        :rules="nameRules"
      >
      </v-text-field>
      <v-row justify="end" class="px-3">
        <router-link to="/about">Esqueceu a senha?</router-link>
      </v-row>
      <v-row class="my-3" justify="center">
        <v-col cols="6">
          <v-btn :to="'/register'" block color="primary" outlined>
            <span class="black--text">Cadastre-se</span>
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn 
            @click="login" 
            block 
            color="primary"
            :loading="loading"
            :disabled="loading"
          >
            <span>Entrar</span>
          </v-btn>
        </v-col>
      </v-row>
      <v-snackbar color="error" :timeout="6000" v-model="error">
        <span>
          {{ errorMessage }}
        </span>
        <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs" @click="closeError">
            Fechar
          </v-btn>
        </template>
      </v-snackbar>
    </v-form>

    </v-col>
  </v-row>
</template>

<script>
import Vue from "vue";
import LoginRequest from "./../../requests/LoginRequest.js";
  export default Vue.extend({
    data: (instance) => ({
      valid: null,
      error: null,
      errorMessage: null,
      loading: null,
      counter: 0,
      maxPassword: 8,
      user: {
        email: null,
        password: null
      },
      emailRules: [
        v => !!v || 'O campo e-mail é obrigatório',
        v => /.+@.+\..+/.test(v) || 'E-mail inválido',
      ],
      nameRules: [
        v => !!v || 'O campo senha é obrigatório',
        v => (v || '').length >= instance.maxPassword || `A senha precisa ter pelo menos ${instance.maxPassword} caracteres`
      ]
    }),
    methods: {
      async login() {
        try {
          if (this.$refs.login_form.validate()) {
            const loginRequest = new LoginRequest (this.user.email, this.user.password)
            const loginResponse = await loginRequest.send()

            this.$store.dispatch('actionSetUser', loginResponse.data.user)
            this.$store.dispatch('actionSaveUser')

            this.$router.push('/home')
          } else {
            this.errorMessage = 'Campos Inválidos'
            this.error = true
            this.loading = false
          }   
        } catch (error) {
          this.loading = false
          this.error = true
          this.errorMessage = error.response.data.message ?? 'Ocorreu um erro inesperado. Por favor tente novamente mais tarde.'
        }
      },
      closeError() {
        this.error = false
        this.loading = false
      }
    }
  })
</script>