import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import Calendar from "@/components/calendar/Calendar.vue";
import CalendarDaysGrid from "@/components/calendar/CalendarDaysGrid.vue";
describe("Calendar component tests", () => {
  test("Calendar mounted", () => {
    const wrapper = mount(Calendar, {
      props: {}
    });

    const root = wrapper.get(".calendar");
    expect(root).toBeDefined();
  });

  test("Year select rendered and closed by default", () => {
    const wrapper = mount(Calendar, {
      props: {}
    });

    const yearSelectRootElement = wrapper.get("[data-test-years-select]");
    const yearSelectList = yearSelectRootElement.find(
      "[data-test-options-list]"
    );

    expect(yearSelectList.isVisible()).toBeFalsy();
  });

  test("Grid cells are rendering", () => {
    const componentSelectedDate = new Date();
    const wrapper = mount(Calendar, {
      props: {
        modelValue: new Date(componentSelectedDate)
      }
    });

    componentSelectedDate.setDate(1);
    componentSelectedDate.setMonth(componentSelectedDate.getMonth() + 1);
    componentSelectedDate.setDate(0);

    const grid = wrapper.find("[data-test-days-grid]");

    expect(grid).toBeDefined();
  });

  test("Grid cells are rendering according to selected year and month", () => {
    const componentSelectedDate = new Date();
    const wrapper = mount(Calendar, {
      props: {
        modelValue: new Date(componentSelectedDate)
      }
    });

    componentSelectedDate.setDate(1);
    componentSelectedDate.setMonth(componentSelectedDate.getMonth() + 1);
    componentSelectedDate.setDate(0);

    const daysCount = componentSelectedDate.getDate();
    const gridCellsElementWithLastDayTextNode = wrapper
      .find("[data-test-days-grid]")
      .findAll("[data-test-grid-cell]")
      .find((el) => el.text() === daysCount.toString());

    expect(Number(gridCellsElementWithLastDayTextNode?.text())).toBe(daysCount);
  });

  test("Grid cells are rendering according to selected year and month", async () => {
    const componentSelectedDate = new Date();
    const wrapper = mount(Calendar, {
      props: {
        modelValue: new Date(componentSelectedDate)
      }
    });

    componentSelectedDate.setDate(1);
    componentSelectedDate.setMonth(componentSelectedDate.getMonth() + 1);
    componentSelectedDate.setDate(0);

    const gridCellsElements = wrapper
      .find("[data-test-days-grid]")
      .findAll("[data-test-grid-cell]");
    const randomCellIndex = Math.floor(
      Math.random() * gridCellsElements.length
    );

    await gridCellsElements[randomCellIndex].trigger("click");
    
    expect(+gridCellsElements[randomCellIndex].text()).toEqual(
      new Date(wrapper.emitted('update:modelValue')![0][0] as string).getDate()
    );
  });
});
