<template>
  <el-card class="feed-card" v-loading="state.loading">
    <div slot="header" class="clearfix">
      <el-button @click="remove(url)" style="float: right" type="text">
        remove
      </el-button>
      <template v-if="state.error">
        <span>error</span>
      </template>
      <template v-else-if="state.loading">
        <span>loading title...</span>
      </template>
      <template v-else>
        <span>{{ feedData.title }}</span>
        <el-button @click="open(url)" style="float: right" type="text">
          open
        </el-button>
      </template>
    </div>
    <template v-if="state.error">
      {{ state.error }}
    </template>
    <template v-else-if="state.loading">
      loading description...
    </template>
    <template v-else>
      {{ feedData.description.length ? feedData.description : "no description" }}
    </template>
  </el-card>
</template>

<script>
import RSSParser from 'rss-parser'
import { mapMutations } from 'vuex'

import router from '@/router'
import { proxyUrl } from '@/util'

export default {
  data: function() {
    return {
      state: {
        loading: true,
        error: null,
      },
      feedData: null,
    }
  },
  props: {
    url: {
      type: String,
      required: true,
      validator: url => /https?:\/\/[^/]+/.test(url),
    },
  },
  methods: {
    ...mapMutations({
      remove: 'removeFeed',
    }),
    fetchFeed: async function(url) {
      let proxiedUrl = proxyUrl(url)
      this.state.loading = true
      try {
        this.feedData = await (new RSSParser()).parseURL(proxiedUrl)
      } catch (e) {
        this.state.error = e
        this.$notify.error({
          title: 'error fetching feed',
          message: e,
          duration: 0,
        })
      }
      this.state.loading = false
    },
    open: function(url) {
      router.push(`/display?url=${url}`)
    },
  },
  created: function() {
    this.fetchFeed(this.url)
  },
}
</script>

<style scoped>
.feed-card {
  width: 80%;
  min-width: 500px;
  max-width: 700px;
}

.clearfix:before, .clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>
