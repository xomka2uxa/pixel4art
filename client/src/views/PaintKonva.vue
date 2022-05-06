<template>
  <div id="container"></div>
</template>

<script>
import Konva from 'konva';

export default {
  data() {
    return {
      stage: '',
      layer: '',
      circle: '',
    };
  },

  mounted() {
    // const width = window.innerWidth;
    // const height = window.innerHeight;
    // first we need to create a stage
    const stage = new Konva.Stage({
      container: 'container',
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const layer = new Konva.Layer();

    const group = new Konva.Group();

    const circle = new Konva.Circle({
      x: stage.width() / 2,
      y: stage.height() / 2,
      radius: 70,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 4,
    });

    // circle.on('click', () => {
    //   alert('You clicked the circle!');
    //   /* eslint no-param-reassign: "off" */
    //   // evt.cancelBubble = true;
    // });

    // group.on('click', () => {
    //   alert('You clicked on the group!');
    // });

    // layer.on('click', () => {
    //   alert('You clicked on the layer!');
    // });

    group.add(circle);
    layer.add(group);

    // add the layer to the stage
    stage.add(layer);
  },
};
</script>
