<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { useClickOutside } from "@/composables/click-outside";

const props = defineProps<{
  optionsList: Array<string>;
  modelValue?: string;
}>();
const emit = defineEmits<{
  (event: "update:modelValue", option: string): void;
}>();

const rootRef = ref<HTMLElement>();
const selectedOption = ref(props.modelValue || props.optionsList[0]);
const showOptionsList = ref(false);

useClickOutside(rootRef, () => (showOptionsList.value = false));

const toggleOptionsList = () => {
  showOptionsList.value = !showOptionsList.value;
};

const clickOption = (option: string) => {
  showOptionsList.value = false;
  selectedOption.value = option;
  emit("update:modelValue", option);
};
</script>

<template>
  <div ref="rootRef" class="calendar-select" data-test-options-select>
    <button
      class="calendar-select__selected-option"
      data-test-selected-option
      @click="toggleOptionsList"
      ref="selectedOptionRef"
    >
      {{ selectedOption }}
    </button>
    <div
      class="calendar-select__options"
      data-test-options-list
      v-show="showOptionsList"
    >
      <button
        class="calendar-select__option"
        data-test-option
        v-for="option in props.optionsList"
        @click="clickOption(option)"
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.calendar-select {
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.2);
  position: relative;
  user-select: none;
  color: #000;
  background-color: #eee;
  &__options {
    position: absolute;
    top: calc(100% + 1px);
    left: 0;
    background-color: #fff;
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.2);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  &__option {
    padding: 5px 20px 5px 10px;
    cursor: pointer;
    border: none;
    width: 100%;
    text-align: left;
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
  &__selected-option {
    border: none;
    padding: 5px 20px 5px 10px;
    position: relative;
    cursor: pointer;
    // color: #fff;
    &::before {
      display: block;
      position: absolute;
      right: 5px;
      top: 50%;
      transform: translateY(-50%);
      content: "";
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 5px 5px 0 5px;
      border-color: #000 transparent transparent transparent;
    }
    &:hover {
      &::before {
        top: 60%;
      }
    }
  }
}
</style>
