// src/libs/jsx/useEffect.js
import shallowEqual from "./utils/shallowEquals";

const valueObject = {
  dependencies: [],
  effectList: [],
  depsIndex: 0,
};

export function resetEffectIndex() {
  valueObject.depsIndex = 0;
  valueObject.effectList = [];
}

export function useEffect(callback, dependencies) {
  const index = valueObject.depsIndex;

  valueObject.effectList.push(() => {
    const oldDependencies = valueObject.dependencies[index];

    let hasChanged = true;

    if (oldDependencies) {
      hasChanged = dependencies
        ? dependencies.some(
            (val, idx) => !shallowEqual(val, oldDependencies[idx])
          )
        : true;
    }

    if (hasChanged) {
      valueObject.dependencies[index] = dependencies;
      callback();
    }
  });

  valueObject.depsIndex += 1;
}

export function runEffects() {
  valueObject.effectList.forEach((effect) => effect());
}
