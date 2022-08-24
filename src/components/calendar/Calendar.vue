<script setup lang="ts">
import { computed, ref } from "@vue/reactivity";
import CalendarSelect from "./CalendarSelect.vue";
import CalendarDaysGrid from "./CalendarDaysGrid.vue";
import { Transition } from "vue";
const DEFAULT_YEAR_OPTIONS_COUNT = 10;

const props = defineProps<{
  yearsSelectList?: Array<string>;
  modelValue?: Date | null;
  locale?: Intl.LocalesArgument;
}>();

const emit = defineEmits<{ (event: "update:modelValue", date: Date): void }>();

const monthList = new Array(12)
  .fill("")
  .map((_, index) =>
    new Date(0, index).toLocaleString(props.locale, { month: "long" })
  );

const yearsList = computed(
  () =>
    props.yearsSelectList ||
    new Array(DEFAULT_YEAR_OPTIONS_COUNT)
      .fill(new Date().getFullYear())
      .map((year: number, index: number) => (year + index).toString())
);

const selectedMonth = ref(0);
const selectedYear = ref(+yearsList.value[0]);
const selectedDay = ref(1);

const headerMonth = ref(monthList[0]);
const headerYear = ref(yearsList.value[0]);
const headerDay = ref(1);

if (props.modelValue) {
  selectedYear.value = props.modelValue.getFullYear();
  selectedMonth.value = props.modelValue.getMonth();
  selectedDay.value = props.modelValue.getDate();

  headerYear.value = props.modelValue.getFullYear().toString();
  headerMonth.value = monthList[props.modelValue.getMonth()];
  headerDay.value = props.modelValue.getDate();
}

const currentDateFormatted = computed(() => {
  if (props.modelValue === null) {
    return "Select date...";
  }
  const tempDate = new Date(
    selectedYear.value,
    selectedMonth.value,
    selectedDay.value
  );
  return tempDate.toLocaleString(props.locale, {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
});

const onDaySelect = (value: number) => {
  selectedYear.value = +headerYear.value;
  selectedMonth.value = monthList.indexOf(headerMonth.value);
  selectedDay.value = value;

  const initialModelValueIfNull = new Date(
    selectedYear.value,
    selectedMonth.value,
    selectedDay.value
  );

  emit("update:modelValue", currentDate.value || initialModelValueIfNull);
};

const currentDate = computed<Date | null>(() => {
  if (props.modelValue === null) {
    return null;
  }

  const modifiedDate = new Date(
    selectedYear.value,
    selectedMonth.value,
    selectedDay.value
  );

  return modifiedDate;
});

const headerDate = computed<Date>(() => {
  const modifiedDate = new Date(
    +headerYear.value,
    monthList.indexOf(headerMonth.value),
    headerDay.value
  );

  return modifiedDate;
});
</script>

<template>
  <div class="calendar" data-test-calendar>
    <div class="calendar__header">
      <div class="calendar__header-selects">
        <div class="calenar__year-select-wrapper">
          <CalendarSelect
            :options-list="yearsList"
            v-model="headerYear"
            data-test-years-select
          />
        </div>
        <div class="calenar__month-select-wrapper">
          <CalendarSelect
            v-model="headerMonth"
            :options-list="monthList"
            data-test-month-select
          />
        </div>
      </div>
      <div class="calendar__header-current-date">
        {{ currentDateFormatted }}
      </div>
    </div>
    <div class="calendar__body">
      <Transition name="grid-animation" mode="out-in">
        <CalendarDaysGrid
          :key="headerDate.toLocaleDateString()"
          @day-select="onDaySelect"
          :date="currentDate"
          :headerDate="headerDate"
          data-test-days-grid
      /></Transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.grid-animation-enter-active {
  transition: transform 0.5s ease-out, opacity 0.6s ease-out;
}
.grid-animation-leave-active {
  transition: transform 0.5s ease-in, opacity 0.6s ease-in;
}
.grid-animation-enter-from,
.grid-animation-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.calendar {
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.2), 0 0 5px 1px rgba(0, 0, 0, 0.2);
  padding: 8px;
  display: flex;
  width: fit-content;
  flex-flow: column nowrap;
  border-radius: 5px;
  font-family: "Roboto", sans-serif;
  background-color: #ffc400;
  color: #fff;
  &__header {
    display: flex;
    flex-flow: column nowrap;
    &-selects {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      font-weight: 700;
    }
    &-current-date {
      text-align: center;
      font-weight: 700;
      padding: 15px 0;
      text-decoration: underline;
      font-size: 1.2rem;
    }
  }
  &__body {
    overflow: hidden;
    padding: 3px;
  }
}
</style>
