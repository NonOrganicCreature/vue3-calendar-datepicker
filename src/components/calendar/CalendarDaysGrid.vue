<script setup lang="ts">
import { computed } from "@vue/reactivity";

type DayView = {
  value: string | number;
  selected: boolean;
  available: boolean;
};

const props = defineProps<{
  date: Date | null;
  headerDate: Date;
}>();

const emit = defineEmits<{
  (event: "daySelect", day: number): void;
}>();

const daysByDate = computed<Array<DayView>>(() => {
  let currentDate = new Date(props.headerDate);

  currentDate.setDate(1);
  currentDate.setMonth(currentDate.getMonth() + 1);
  currentDate.setDate(0);

  const MONTH_DAYS_COUNT = currentDate.getDate();
  const MAX_DAYS = 35;

  return new Array(MAX_DAYS)
    .fill(1)
    .map<DayView>((day, index) => ({
      value:
        day + index > MONTH_DAYS_COUNT
          ? day + index - MONTH_DAYS_COUNT
          : day + index,
      selected:
        props.date !== null &&
        day + index === props.date.getDate() &&
        props.headerDate.getMonth() === props.date.getMonth(),
      available: day + index <= MONTH_DAYS_COUNT
    }));
});

const onDayClick = (day: number) => {
  emit("daySelect", day);
};
</script>

<template>
  <div class="calendar-days-grid" data-test-grid>
    <button
      data-test-grid-cell
      class="calendar-days-grid__day-item"
      @click="onDayClick(+day.value)"
      v-for="day in daysByDate"
      :class="[
        { 'calendar-days-grid__day-item--selected': day.selected },
        { 'calendar-days-grid__day-item--available': day.available }
      ]"
    >
      {{ day.value }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.calendar-days-grid {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: repeat(7, 1fr);
  &__day-item {
    cursor: pointer;
    padding: 0.75rem;
    text-align: center;
    background: none;
    border: none;
    background-image: linear-gradient(0, #fff, #fff);
    background-size: 90% 90%;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    color: #000;
    user-select: none;
    &:focus {
      outline: 1px solid #000;
    }
    &:hover {
      background-image: linear-gradient(
        0,
        lighten(#bbb, 10),
        lighten(#bbb, 10)
      );
      background-size: 90% 90%;
      background-repeat: no-repeat;
      background-position: 50% 50%;
    }
    &:not(&--available) {
      background: none;
      color: #aaa;
      cursor: auto;
      &:focus {
        outline: none;
      }
    }
    &--selected {
      background-image: linear-gradient(0, #bbb, #bbb);
      background-size: 90% 90%;
      background-repeat: no-repeat;
      background-position: 50% 50%;
    }
  }
}
</style>
