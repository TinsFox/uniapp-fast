export default {
  addAgeAsync({ commit }) {
    console.log('1');
    return new Promise((resolve, reject) => {
      console.log('2');
      setTimeout(() => {
        console.log('4');
        commit('addAge');
      }, 0);
    });
  }
};
