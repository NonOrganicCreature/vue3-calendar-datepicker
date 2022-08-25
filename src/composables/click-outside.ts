import { onMounted, onUnmounted, Ref } from "vue";

const isChildrenClicked = (e: MouseEvent, rootRef: Ref) => {
  let rootChildren = rootRef.value as Element;
  let queue = [rootChildren];
  while (queue.length > 0) {
    const currentChild = queue.pop();
    const nestedChildrenArray = Array.from(currentChild!.children);
    const isChildrenClicked = nestedChildrenArray.includes(e.target as Element);

    if (isChildrenClicked) {
      return true;
    }

    if (!isChildrenClicked) {
      queue.push(...nestedChildrenArray);
    }
  }

  return false;
};

const useClickOutside = (rootRef: Ref, cb: () => void) => {
  const inner = (e: MouseEvent) => {
    if (!isChildrenClicked(e, rootRef)) {
      cb();
    }
  };

  onMounted(() => {
    document.addEventListener("click", inner);
  });

  onUnmounted(() => {
    document.removeEventListener("click", inner);
  });
};

export { useClickOutside };
