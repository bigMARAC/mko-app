<template>
  <div id="app">
    <div id="nav">
      <v-app id="inspire">
      <v-navigation-drawer class="text-left" v-model="drawer" v-if="!['Login', 'Signup', 'Admin'].includes(this.$router.currentRoute.name)" app>
        <v-list-item class="primary">
          <v-list-item-content>
            <v-list-item-title class="text-h6 secondary--text">
              Barbearia MKO
            </v-list-item-title>
            <v-list-item-subtitle class="secondary--text">
              Olá, {{ this.$store.state.user.name }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list
          dense
          nav
        >
          <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.to"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app color="primary">
        <v-app-bar-nav-icon v-if="!['Login', 'Signup', 'Admin'].includes(this.$router.currentRoute.name)" class="secondary--text" @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title class="secondary--text">{{ this.$router.currentRoute.name }}</v-toolbar-title>
      </v-app-bar>

      <v-main>
        <!--  -->
        <router-view/>
      </v-main>
    </v-app>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      items: [
        { title: 'Resgatar Código', icon: 'mdi-home', to: '/home' },
        { title: 'Códigos Resgatados', icon: 'mdi-qrcode', to: '/codes' },
        { title: 'Logout', icon: 'mdi-logout', to: '/logout' },
      ],
      token: undefined,
      drawer: null
    }),
  }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.code-button {
  letter-spacing: 5px !important;
}

#nav {
  padding: 20px;

  a {
    text-decoration: none;
  }
}

.v-slide-group__content {
  justify-content: center !important;
}
</style>
