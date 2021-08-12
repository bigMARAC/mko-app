<template>
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
        <v-btn @click="generateCode(1)" block color="primary">Gerar Código</v-btn>
      </v-list-item>
    </v-list-group>
  </v-list>
</template>

<script>
import GenerateCodeRequest from '../../requests/GenerateCodeRequest'
  export default {
    data: () => ({
      
    }),
    methods: {
      async generateCode(customer_id) {
        try {
          const generateCodeRequest = new GenerateCodeRequest(customer_id)
          const generateCodeResponse = await generateCodeRequest.send()

          console.log(generateCodeResponse)
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
</script>