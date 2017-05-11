<template>
  <div id="header">
    <div id="header-inner">
      <div class="tip">
        <div class="avator"><img src="./head.jpg"></div>
        <span>Athon's Blog</span>
      </div>
      <ul id="header-content">
        <li><router-link to="/home">首页</router-link></li>
        <li><router-link to="/types">分类</router-link></li>
        <li><router-link to="/archives">归档</router-link></li>
        <li><router-link to="/about">About</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    };
  }
};
</script>

<style lang="scss" scoped>
#header{
  // position: fixed;
  width: 100%;
  color: #fff;
  flex: 0 0 80px;
  font-size: 24px;
  box-shadow: 0 1px 5px rgba(0,0,0,.1);
  z-index: 10;
  background-color: #30aaaa;
}

#header-inner{
  display: flex;
  margin: 0 auto;
  max-width: 1000px;
  height: 80px;
}

#header-content{
  margin: 0 auto;
  width: 500px;
  display: flex;
  height: 100%;
  align-items: center;
  // justify-content: space-around;
  font-size: 18px;
  color: #fff;

  li{
    a{
      color: #fff;
      cursor: pointer;

      &:hover,&.router-link-active{
        color: #a3fadc;
      }

      // padding-right: 10px;
    }
    padding: 0 25px;
    line-height: 1;
    border-right: 1px solid rgba(255,255,255, 0.6);

    &:last-child{
      border: none;
      padding-right: 0;
    }
  }
}

.tip{
  display: flex;
  width: 600px;
  height: 100%;
  align-items: center;
}

.avator{
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 100%;
  // overflow: hidden;
  margin-right: 10px;
  // border: 1px solid #fff;

  img{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%,-50%,0);
    width: 80%;
    border-radius: 100%;
  }

  &:after,&:before{
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    content: '';
    width: 100%;
    height: 100%;
    border: 1px solid #fff;
    border-radius: 100%;
    border-top-color: #fff;
    border-right-color: transparent;
    border-left-color: transparent;
    border-bottom-color: transparent;
    animation: rotate 2s infinite;
  }

  &:before{
    border-top-color: transparent;
    border-right-color: transparent;
    border-left-color: transparent;
    border-bottom-color: #fff;
  }
}

@keyframes rotate{
  0%{-webkit-transform:rotate(0)}
  99.9%{-webkit-transform:rotate(0)}
}
</style>