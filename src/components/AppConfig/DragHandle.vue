<template>
  <n-button ref="dragHandle" class="drag-handle" circle type="primary">
    <template #icon>
      <n-icon size="2rem" :component="SettingsOutlined" />
    </template>
  </n-button>
</template>
<script lang="ts">
export default {
  name: 'DragHandle',
}
</script>
<script setup lang="ts">
import { ref, onMounted, ComponentPublicInstance } from 'vue';
import interact from 'interactjs'
import { SettingsOutlined } from '@vicons/material'

const emit = defineEmits(['tap'])

function setDraggable(element: ComponentPublicInstance | null, tapEvent: () => void) {
  const position = { x: 0, y: 0 }
  if (element && element.$el) {
    const interactObj = interact(element.$el)
    interactObj.styleCursor(false)
    interactObj.draggable({
      // enable inertial throwing
      inertia: true,
      // keep the element within the area of it's parent
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: document.body,
          endOnly: true
        })
      ],
      // enable autoScroll
      autoScroll: true,
      listeners: {
        move(event) {
          position.x += event.dx
          position.y += event.dy
          event.target.style.transform =
            `translate(${position.x}px, ${position.y}px)`
        },
      },
    })
    interactObj.on('tap', tapEvent)
  }

}

const dragHandle = ref(null);

onMounted(() => {
  setDraggable(dragHandle.value, () => {
    emit('tap')
  })
})

</script>
<style lang="less" scoped>
@handle-size: 3rem;

.drag-handle {
  width: @handle-size;
  height: @handle-size;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  touch-action: none;
  user-select: none;
  position: absolute;
  z-index: 2;
  top: calc(50% - @handle-size);
  right: 0;
}
</style>
