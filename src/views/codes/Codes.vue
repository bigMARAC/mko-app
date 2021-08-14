<template>
<v-row style="height: 80vh" class="justify-lg-center">
  <v-col cols="12" md="5" lg="5">
    <v-row justify="center" class="my-3">
      <span class="subtitle-1">
        Você possui um total de {{ codes.length }} códigos resgatados:
      </span>
    </v-row>
    <v-row justify="center">
      <v-chip-group
        column
      >
        <v-chip
          v-for="(code, index) in codes"
          :key="code.id"
          dark
          label
        >
        <v-avatar
          left
          class="secondary darken-4"
        >
          {{ index + 1 }}
        </v-avatar>
          {{ code.content }}
        </v-chip>
      </v-chip-group>
    </v-row>
    <v-row justify="center" class="mt-10">
      <span class="subtitle-2 text-center">
        Resgate mais {{ 6 - codes.length }} códigos, clicando no botão abaixo, para ganhar um corte gratuito.
      </span>
    </v-row>
    <v-divider class="my-5"></v-divider>
    <v-row justify="center" class="mt-15">
      <v-btn
      outlined
      to="/home"
      >Resgatar um novo código</v-btn>
    </v-row>
  </v-col>
</v-row>
</template>

<script>
import GetAllCodesRequest from "../../requests/GetAllCodesRequest.js";
  export default {
    data: () => ({
      codes: []
    }),
    async mounted() {
      try {
        const codesResquest = new GetAllCodesRequest(this.$store.state.user.id)
        const codesResponsse = await codesResquest.send()

        this.codes = codesResponsse.data.codes  
      } catch (error) {
        console.log(error)
      }
    }
  }
</script>