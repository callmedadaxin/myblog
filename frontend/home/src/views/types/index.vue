<template>
  <div id="types">

    <ul class="type-list">
      <li v-for="item in types" :style="{fontSize: getSize(item)}">{{item.type}}({{item.num}})</li >
    </ul>
  </div>
</template>

<script>
import {get} from 'common/js/api';
import { Util, Shape, Cloud } from 'g2';

export default {
  data () {
    return {
      types: []
    };
  },

  mounted() {
    Shape.registShape('point', 'cloud', {
      drawShape: function(cfg, container) {
        cfg.points = this.parsePoints(cfg.points);
        var attrs = getTextAttrs(cfg);
        // 给容器添加text类型的shape
        // 坐标仍然是原来的坐标
        // 文字样式为通过getTextAttrs方法获取的样式
        var shape = container.addShape('text', {
          attrs: Util.mix(attrs, {
            x: cfg.points[0].x,
            y: cfg.points[0].y
          })
        });
        return shape;
      }
    });
    get('type').then(r=>{
      this.draw(r.data);
    })

    
  },

  methods: {
    getSize(item) {
      return item.value + 'px';
    },

    getTextAttrs(cfg) {
      var textAttrs = Util.mix(true, {}, {
        fillOpacity: cfg.opacity,
        fontSize: cfg.size,
        rotate: cfg.origin._origin.rotate,
        text: cfg.origin._origin.text,
        textAlign: 'center',
        fill: cfg.color,
        textBaseline:'Alphabetic'
      }, cfg.style);
      return textAttrs;
    },

    draw(data) {
      data.sort(function(a,b){
        return b.num-a.num;
      });
      // 获取数据的最大值和最小值
      var max = data[0].num;
      var min = data[data.length-1].num;
      // 构造一个词云布局对象
      var layout = new Cloud({
        // 传入数据源
        words: data,
        // 设定宽高（默认为500*500）
        width: 650,
        height: 450,
        // 设定文字大小配置函数(默认为12-40px的随机大小)
        size: function(words){
          // 将pv映射到canvas可绘制的size范围14-100(canvas默认最小文字为12px)
          return ((words.num - min)/(max - min)) * (100 - 14) + 14;
        },
        // 设定文字内容
        text: function(words){
          return words.type;
        }
      });
      // 执行词云布局函数，并在回调函数中调用G2对结果进行绘制
      layout.exec(function(texts){
        var chart = new G2.Chart({
          id : 'type',
          // canvas的宽高需要和布局宽高一致
          width: 650,
          height: 450,
          plotCfg : {
            margin : 0
          }
        });
        chart.legend(false);
        chart.source(texts);
        chart.axis(false);
        chart.tooltip({
          title:false
        });
        // 将词云坐标系调整为G2的坐标系
        chart.coord().reflect();
        // 绘制点图，在x*y的坐标点绘制自定义的词云shape，颜色根据text字段进行映射，大小根据size字段的真实值进行映射，文字样式配置为词云布局返回的样式，tooltip显示site*pv两个字段的内容
        chart.point().position('x*y').color('text').size('size',function(size){
          return size;
        }).shape('cloud').style({
          fontStyle: texts[0].style,
          fontFamily: texts[0].font,
          fontWeight: texts[0].weight
        }).tooltip('site*pv');
        chart.render();
      });
    }
  }
};
</script>

<style lang="css" scoped>
</style>