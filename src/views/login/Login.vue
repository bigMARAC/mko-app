<template>
  <v-row style="height: 80vh" justify="center" align="center">
    <v-col cols="12" md="3" lg="3" align="center">

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
      <v-row class="my-3" justify="center">
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

          this.$router.push('/')
        } catch (error) {
          console.log(error.response.data.message)
        }
      }
    }
  })
</script>