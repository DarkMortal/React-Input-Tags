import { create } from "zustand";

const MAX_TAGS = 10;

const setUnion = function (s1, s2) {
  let S1 = !(s1 instanceof Set) ? new Set() : s1;
  let S2 = !(s2 instanceof Set) ? new Set() : s2;
  let newSet = new Set();

  S1.forEach((elem) => newSet.add(elem));
  S2.forEach((elem) => {
    if (newSet.size < MAX_TAGS) newSet.add(elem);
  });

  return newSet;
};

const adjustValue = (val) => {
  if (val < 0) return 0;
  if (val > MAX_TAGS) return MAX_TAGS;
  return val;
};

const tagStore = (setState) => ({
  tags: new Set(),
  tagsLeft: MAX_TAGS,
  addTag: (tag) =>
    setState((currentState) => {
      let tempSet =
        currentState.tagsLeft > 0
          ? setUnion(currentState.tags, new Set().add(tag))
          : currentState.tags;
      let tagSize =
        currentState.tags instanceof Set ? currentState.tags.size : 0;
      return {
        tags: tempSet,
        tagsLeft: adjustValue(currentState.tagsLeft - tempSet.size + tagSize)
      };
    }),
  removeTag: (tag) =>
    setState((currentState) => {
      currentState.tags.delete(tag);
      return {
        tags: currentState.tags,
        tagsLeft: adjustValue(currentState.tagsLeft + 1)
      };
    }),
  removeAllTags: () =>
    setState(() => ({
      tags: new Set(),
      tagsLeft: MAX_TAGS
    })),
  removeLastTag: () =>
    setState((currentState) => {
      currentState.tags.delete(Array.from(currentState.tags).pop());
      return {
        tags: currentState.tags,
        tagsLeft: adjustValue(currentState.tagsLeft + 1)
      };
    })
});

const useTagStore = create(tagStore);
export default useTagStore;
