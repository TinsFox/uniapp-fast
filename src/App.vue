<script>
import { promisify } from 'miniprogram-api-promise';

export default {
  onLaunch: async function() {
    console.log('App Launch');
    // #ifdef MP-WEIXIN
    this.$store.dispatch('user/login', await promisify(uni.login)())
      .then((res) => {
        console.log("=======!!!!>",res)
        if (!res) return;
        this.$store.dispatch('user/getInfo');
      })
      .catch(() => {
        this.loading = false;
      });
    // #endif
  },
  onShow: function() {
    console.log('App Show');
  },
  onHide: function() {
    console.log('App Hide');
  }
};
</script>

<style>
/*每个页面公共css */
</style>
