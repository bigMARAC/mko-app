<template>
  <v-row style="height: 80vh" justify="center" align="center">
    <v-col cols="12" md="5" lg="5" align="center">
      <v-form>
        <v-text-field
          v-model="code"
          label="Código"
          placeholder="Informe o código de fidelidade"
          required
          append-icon="mdi-qrcode"
          outlined
          dense
          ripple
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
    </v-col>
  </v-row>
</template>

<script>
import Vue from "vue";
import RevokeCodeRequest from '../../requests/RevokeCodeRequest'
  export default Vue.extend({
    data: () => ({
      color: "primary",
      text: "Resgatar Código",
      loading: null,
      disable: null,
      code: null
    }),
    methods: {
      async revokeCode() {
        this.loading = true
        this.disable = true
        try {
          const revokeCodeRequest = new RevokeCodeRequest(this.code)
          const revokeCodeResponse = await revokeCodeRequest.send()
          if (revokeCodeResponse.status == 200) {
            setTimeout(() => {
              this.text = "Código Regastado"
              this.loading = false
              this.disable = false
              this.color = "light-green darken-3"
            }, 2000);
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
  })
</script>