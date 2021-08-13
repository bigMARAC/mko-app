<template>
  <v-row style="height: 80vh" justify="center" align="center">
    <v-col cols="12" md="5" lg="5" align="center">
    <v-img max-width="150" class="mt-n16 mb-5" src="../../assets/logo-min.png"></v-img>

    <v-form v-model="valid">
      <v-text-field
        v-model="user.email"
        label="E-mail"
        required
        append-icon="mdi-email"
        outlined
        dense
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
      >
      </v-text-field>
      <v-row justify="center">
        <span class="text-caption px-3 my-2">Você está se autenticando como administrador do sistema. Se você não possui os privilégios necessários, por favor retorne para a página de login clicando <router-link to="/" class="red--text">aqui</router-link>
        </span>
      </v-row>
      <v-row class="my-3" justify="center">
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
import AdminLoginRequest from "./../../requests/AdminLoginRequest.js";
  export default Vue.extend({
    data: () => ({
      error: null,
      errorMessage: null,
      valid: null,
      loading: null,
      user: {
        email: null,
        password: null
      }
    }),
    methods: {
      async login() {
        try {
          this.loading = true
          const loginRequest = new AdminLoginRequest (this.user.email, this.user.password)
          const loginResponse = await loginRequest.send()

          this.$store.dispatch('actionSetUser', loginResponse.data.user)
          this.$store.dispatch('actionSaveUser')

          this.$router.push('/home')
        } catch (error) {
          setTimeout(() => {
            this.loading = false
          }, 6000);
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