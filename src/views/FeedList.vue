<template>
  <el-container>
    <el-aside>
      <el-form>
          <el-form-item prop="input">
          <el-input v-model="form.input" type="url" required />
        </el-form-item>
        <el-form-item>
          <el-button @click="addUniqueFeed(form.input)">add</el-button>
        </el-form-item>
      </el-form>
    </el-aside>
    <el-main class="feed-list">
      <feed class="feed" v-for="(feed, i) in feeds" :key="i" :url="feed" />
    </el-main>
  </el-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import Feed from '@/components/Feed'

export default {
  data: function() {
    return {
      form: {
        input: '',
      },
    }
  },
  computed: {
    ...mapGetters({
      feeds: 'getFeeds',
    }),
  },
  methods: {
    ...mapMutations({
      addFeed: 'addFeed',
    }),
    addUniqueFeed: function(url) {
      if (this.feeds.includes(url)) {
        this.$notify.error({
          title: 'error',
          message: 'this feed already exists',
        })
      } else {
        this.addFeed(url)
      }
    },
  },
  components: {
    feed: Feed,
  },
}
</script>

<style scoped>
.feed-list {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}

.feed {
  margin: 10px;
}
</style>
