<template>
  <div class="logo-wrap el-row--flex is-align-middle">
    <img src="/images/logo-white.png" class="logo-white" />
    <img src="/images/logo-black.png" class="logo-black" />
    <span class="hidden-sm-and-down">六点了技术</span>
  </div>
</template>
<script type="text/babel">
  export default {
    name: 'LogoSvg',
  }
</script>

<style lang="scss" scoped>
  img {
    display: inline-block;
    height: 100%;
    width: auto;
    margin-right: 10px;
  }
  .logo-black {
    display: none;
  }
  .logo-wrap {
    font-size: 18px;
    height: 30px;
    font-weight: bold;
    margin-top: 15px;
  }
</style>
<style lang="scss">
  .nav-white {
    .logo-white {
      display: none;
    }
    .logo-black {
      display: inline-block;
    }
    .logo-wrap {
      color: var(--s-theme-color--dark);
    }
  }
</style>
