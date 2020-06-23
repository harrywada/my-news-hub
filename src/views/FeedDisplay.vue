<template>
  <el-container>
    <el-header>
      <el-page-header @back="back">
        <template v-slot:title>all feeds</template>
        <template v-slot:content>posts</template>
      </el-page-header>
    </el-header>
    <el-main>
      <el-table v-loading="loading" :data="items">
        <el-table-column prop="pubDate" label="date" />
        <el-table-column prop="title" label="title" />
        <el-table-column prop="link" label="link" />
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import RSSParser from 'rss-parser'

import router from '@/router'
import { proxyUrl } from '@/util'

export default {
  data: function() {
    return {
      error: null,
      items: [],
      loading: true,
    }
  },
  props: {
    url: String,
  },
  methods: {
    back: function() {
      router.push('/')
    },
    update: async function() {
      const parser = new RSSParser()
      let proxiedUrl = proxyUrl(this.url)

      this.loading = true
      try {
        ({ items: this.items } = await parser.parseURL(proxiedUrl))
      } catch (e) {
        this.error = e
      }
      this.loading = false
    },
  },
  created: async function() {
    if (!this.url) {
      router.replace('/')
    } else {
      await this.update()
    }
  },
}
</script>
