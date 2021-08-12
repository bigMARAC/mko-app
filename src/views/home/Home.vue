<template>
<v-row style="height: 80vh" justify="center">
  <v-col cols="12" md="5" lg="5">
    <v-list>
      <v-list-group
        :value="false"
        prepend-icon="mdi-account-circle"
        append-icon="mdi-qrcode"
      >
        <template v-slot:activator>
          <v-list-item-title>Marcos Emanuel</v-list-item-title>
        </template>

        <v-list-item class="mt-1">
          <v-btn 
            @click="generateCode(1)" 
            block 
            color="primary"
            :loading="loading"
            :disabled="loading"
          >Gerar Código</v-btn>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-col>
</v-row>
</template>

<script>
import GenerateCodeRequest from '../../requests/GenerateCodeRequest'
  export default {
    data: () => ({
      loading: null
    }),
    methods: {
      async generateCode(customer_id) {
        try {
          this.loading = true
          const generateCodeRequest = new GenerateCodeRequest(this.$store.state.user.token, customer_id)
          const generateCodeResponse = await generateCodeRequest.send()

          console.log(generateCodeResponse.data.code)
        } catch (error) {
          console.log(error.response.data.message)
        }
      }
    }
  }
</script>