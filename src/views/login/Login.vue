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
          <v-btn @click="login" block color="primary">
            <span>Entrar</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-form>

    </v-col>
  </v-row>
</template>

<script>
import Vue from "vue";
import LoginRequest from "./../../requests/LoginRequest.js";
  export default Vue.extend({
    data: () => ({
      valid: null,
      user: {
        email: null,
        password: null
      }
    }),
    methods: {
      async login() {
        try {
          const loginRequest = new LoginRequest (this.user.email, this.user.password)
          const loginResponse = await loginRequest.send()

          this.$store.dispatch('actionSetUser', loginResponse.data.user)
          this.$store.dispatch('actionSaveUser')

          this.$router.push('/home')
        } catch (error) {
          console.log(error.response.data.message)
        }
      }
    }
  })
</script>