<template>
  <transition name="rotate-in">
  	<div class="list-wrap" :class="{ active: showing }">
  		<ul class="v-list">
  			<li v-for="item in items">
  				<div class="item-wrap" @click="showDetail(item._id)">
  					<img :src="item.show" alt="">
  					<div class="item-bottom">
  						<i :style="{ backgroundImage: `url(${item.show})` }" class="blur"></i>
  						<h3 class="item-title">{{item.title}}</h3>
  						<p class="item-desc">{{item.abstract}}</p>
  					</div>
  				</div>
  			</li >
  		</ul>
  	</div>
  </transition>
</template>

<script>
import { post } from 'common/js/api';

export default {
  data () {
    return {
    	items: [],
    	showing: false,
    	
      detail: ''
    };
  },

  methods: {
  	showDetail(id) {
  		this.showing = true;
  		this.loadingContent = true;

      setTimeout(() => {
        this.$router.push({ path: '/detail' });
      }, 10000);
      
      // post('posts/detail', { id: id }).then(r=>{
      //   this.detail = r.data.content;

      //   setTimeout(()=>{
      //     this.loadingContent = false;
      //   }, 1000);
      // })

  		
  	},

  },

  mounted() {
    post('posts', {
      page: 1,
      limit: 9
    }).then(r=>{
      this.items = r.data.list;
    })
  }
};
</script>

<style>
	body{
		background-color: #30aaaa;
		overflow: hidden;
	}
</style>

<style lang="scss" scoped>
.list-wrap{
	perspective: 1500px;
	height: 1020px;

	&.active{
		.v-list{
      transition: transform 0.5s;
      transform: translate3d(0,0, -1500px);
      transform-style: preserve-3d;
    }
	}
}

.rotate-in-enter, .rotate-in-leave-active {
  opacity: 0;
  transform: translate3d(-50%,-50%,-1500px) rotateX(179.9deg);
}

.v-list{
	display: flex;
	flex-wrap: wrap;
	align-item: center;
	margin: 0 auto;
	max-width: 900px;

	li{
		display: block;
		flex: 0 0 33.33%;
		width: 33.33%;
		text-align: center;
		margin-bottom: 40px;
		overflow: hidden;
		
		img{
			transition: transform 0.5s;
		}

		
	}
}

.item-wrap{
	position: relative;
	display: inline-block;
	width: 240px;
	height: 200px;
	overflow: hidden;
	cursor: pointer;

	&:hover{
		img{
			transform: scale(1.15);
		}

		.item-bottom{
			transform: translate3d(0,0,0);
		}
	}
}

.item-bottom{
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 70px;
	padding: 10px;
	background-color: rgba(0,0,0, 0.6);
	transform: translate3d(0,100%,0);
	transition: transform 0.5s;
	color: rgba(255,255,255, .85);
	text-align: left;
	box-sizing: border-box;
	background-color: rgba(0,0,0, 0.4);
	overflow: hidden;

	.blur{
		position: absolute;
		top: 0;
		left: 0;
		display: inline-block;
		width: 100%;
		height: 100%;
		background-size: 100%;
		background-position: 0 bottom;
		filter: brightness(0.5) blur(5px);
		z-index: -1;
	}
}

.item-title{
	font-size: 20px;
	margin-bottom: 2px;
}

.item-desc{
	height: 20px;
	font-size: 14px;
	line-height: 1.5;
	color: rgba(255,255,255, 0.74);
	text-align: justify;
	text-overflow:ellipsis;
	overflow: hidden;
	white-space: nowrap;
}

.loading{
	top: 0;
	left: 0;
	position: absolute;
	width: 100%;
	height: 100%;

	.loading-icon{
		position: absolute;
		top: 50%;
		left: 50%;
		width: 50px;
		margin-left: -25px;
		margin-top: -25px;
	}
}
</style>