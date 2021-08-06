<template>
  <view class='content'>
    <view>
      <text class='title'>{{ name }}</text>
    </view>
    <button @click='route'>路由测试</button>
  </view>
</template>

<script>
import store from '@/store/index.js'; //需要引入store
import { mapState } from 'vuex'; //引入mapState
export default {
  data() {
    return {
      title: 'Hello'
    };
  },
  computed: {
    ...mapState({
      name: state => state.name,
      age: state => state.age,
      token: state => state.user.token
    }),
    todos() {
      return store.getters.doneTodos;
    }
  },
  methods: {
    route() {
      console.log('路由测试', this.$Router);
      this.$Router.push({ name: 'route' });
    },
    onLoad() {
      console.log(this.$Route);
      console.log(ROUTES);
    }
  }
};
</script>

<style>
.content {
  margin-top: 500rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
  width: 300px;
  height: 300px;
}
</style>
