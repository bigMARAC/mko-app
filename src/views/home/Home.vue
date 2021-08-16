<template>
  <v-row style="height: 80vh" justify="center" align="center">
    <v-col cols="12" md="5" lg="5" align="center">
      <v-form v-model="valid" ref="codes_form">
        <v-text-field
          v-model="code"
          label="Código"
          placeholder="Informe o código de fidelidade"
          required
          append-icon="mdi-qrcode"
          outlined
          dense
          ripple
          :rules="codeRules"
          :counter="maxCodes"
        >
        </v-text-field>
        <v-btn
            @click="revokeCode"
            block 
            :color="color"
            class="code-button"
            :loading="loading"
            :disabled="disable"
          >{{ text }}</v-btn>
      </v-form>
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
    </v-col>
  </v-row>
</template>

<script>
import Vue from "vue";
import RevokeCodeRequest from '../../requests/RevokeCodeRequest'
  export default Vue.extend({
    data: (instance) => ({
      valid: null,
      color: "primary",
      text: "Resgatar Código",
      maxCodes: 7,
      loading: null,
      disable: null,
      code: null,
      error: null,
      errorMessage: null,
      codeRules: [
        v => !!v || 'O campo é obrigatório',
        v => (v || '').length == instance.maxCodes || `O código precisa ter ${instance.maxCodes} caracteres`
      ]
    }),
    methods: {
      async revokeCode() {
        try {
          if (this.$refs.codes_form.validate()) {
            this.loading = true
            this.disable = true
            const revokeCodeRequest = new RevokeCodeRequest(this.code)
            const revokeCodeResponse = await revokeCodeRequest.send()

            this.loading = false
            this.disable = false

            if (revokeCodeResponse.status == 200) {
              this.$router.push('/codes')
            }
          } else {
            this.errorMessage = 'Campos Inválidos'
            this.error = true
            this.loading = false
          }
        } catch (error) {
          this.loading = false
          this.disable = false
          this.error = true
          this.errorMessage = error.response.data.message ?? 'Ocorreu um erro inesperado. Por favor tente novamente mais tarde.'
        }
      },
      closeError() {
        this.error = false
        this.loading = false
        this.disable = false
      }
    }
  })
</script>