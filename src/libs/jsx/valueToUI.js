import updateDOM from "./updateDOM";
import shallowEqual from "./utils/shallowEquals";

function valueToUI() {
  const values = {
    states: [],
    stateIndex: 0,
    dependencies: [],
    depsIndex: 0,
    effectList: [],
  };

  const renderInfo = {
    root: null,
    $parent: null,
    currentVDOM: null,
    futureVDOM: null,
  };

  // 실제 DOM을 업데이트 하는 렌더링 함수
  function _render() {
    values.stateIndex = 0;
    values.depsIndex = 0;
    values.effectList = [];

    renderInfo.futureVDOM = renderInfo.root();

    updateDOM(
      renderInfo.$parent,
      renderInfo.currentVDOM,
      renderInfo.futureVDOM
    );

    renderInfo.currentVDOM = renderInfo.futureVDOM;

    values.effectList.forEach((effect) => effect());
  }

  /**
   * 최상위 컴포넌트를 최초 렌더링 또는 리렌더링합니다.
   *
   * @param {HTMLElement} rootElement 실제 DOM 컨테이너
   * @param {Function} component 최상위 컴포넌트 함수
   */
  function render(rootElement, component) {
    renderInfo.$parent = rootElement;
    renderInfo.root = component;
    values.states = [];
    values.dependencies = [];
    _render();
  }

  /**
   * 상태 관리를 위한 useState 훅입니다.
   *
   * @param {any} initialState 초기 상태값
   * @returns {[any, Function]} 상태값과 상태 업데이트 함수
   */
  function useState(initialState) {
    const index = values.stateIndex;

    if (typeof values.states[index] === "undefined") {
      values.states[index] = initialState;
    }

    const state = values.states[index];

    function setState(newState) {
      if (shallowEqual(state, newState)) {
        return;
      }

      values.states[index] = newState;
      queueMicrotask(_render);
    }

    values.stateIndex += 1;

    return [state, setState];
  }

  /**
   * 부수 효과를 위한 useEffect 훅입니다.
   *
   * @param {Function} callback 이펙트 콜백 함수
   * @param {Array<any>} dependencies 의존성 배열
   */
  function useEffect(callback, dependencies) {
    const index = values.depsIndex;

    values.effectList.push(() => {
      const oldDependencies = values.dependencies[index];
      let hasChanged = true;

      if (oldDependencies) {
        hasChanged = dependencies
          ? dependencies.some(
              (val, idx) => !shallowEqual(val, oldDependencies[idx])
            )
          : true;
      }

      if (hasChanged) {
        values.dependencies[index] = dependencies;
        callback();
      }
    });

    values.depsIndex += 1;
  }

  return { render, useState, useEffect };
}

export const { render, useState, useEffect } = valueToUI();
