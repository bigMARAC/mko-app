<template>
<v-row style="height: 80vh" justify="center">
  <v-col cols="12" md="5" lg="5">
    <v-list>
      <v-list-group
        :value="false"
        prepend-icon="mdi-account-circle"
        append-icon="mdi-qrcode"
        v-for="(customer, index) in customers"
        :key="customer.id"
      >
        <template v-slot:activator>
          <v-list-item-title>{{ customer.name }}</v-list-item-title>
        </template>

        <v-list-item class="mt-1">
          <v-btn
            @click="generateCode(customer.id, index)" 
            block 
            color="primary"
            class="code-button"
            :loading="customer.clicked"
            :disabled="customer.clicked"
          >{{ customer.text }}</v-btn>
        </v-list-item>
      </v-list-group>
    </v-list>
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
import GenerateCodeRequest from '../../requests/GenerateCodeRequest'
import GetAllCustomers from "../../requests/GetAllCustomers.js";
  export default {
    data: () => ({
      loading: [true],
      error: null,
      errorMessage: null,
      customers: null
    }),
    methods: {
      async generateCode(customer_id, index) {
        try {
          this.customers[index].clicked = true
          const generateCodeRequest = new GenerateCodeRequest(this.$store.state.user.token, customer_id)
          const generateCodeResponse = await generateCodeRequest.send()
          setTimeout(() => {
            this.customers[index].text = generateCodeResponse.data.code
            this.customers[index].clicked = false
          }, 3000);
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
    },
    async mounted() {
      try {
        const customerResquest = new GetAllCustomers(this.$store.state.user.token)
        const customerResponsse = await customerResquest.send()
        this.$store.dispatch('actionSetCustomers', customerResponsse.data.customers)

        this.customers = this.$store.state.customers
        this.customers = this.customers.map((el) => ({
          name: el.name,
          username: el.username,
          id: el.id,
          clicked: false,
          text: 'Gerar Código'
        }))
  
      } catch (error) {
        console.log(error)
      }
    }
  }
</script>