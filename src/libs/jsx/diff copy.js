function isNodeChanged(oldNode, newNode) {
  return (
    typeof oldNode !== typeof newNode ||
    (typeof oldNode === "string" && oldNode !== newNode) ||
    oldNode.type !== newNode.type
  );
}

function mapEventName(key) {
  // React 스타일 → 실제 DOM 이벤트로 매핑
  const eventMap = {
    onChange: "input", // React처럼 동작하게 만듦
    onClick: "click",
    onInput: "input",
    onSubmit: "submit",
    onBlur: "blur",
    onFocus: "focus",
  };
  return eventMap[key] || key.slice(2).toLowerCase();
}

function updateProps(element, oldProps = {}, newProps = {}) {
  Object.keys(oldProps).forEach((name) => {
    if (!(name in newProps)) {
      if (key.startsWith("on")) {
        const eventType = mapEventName(key);
        element.addEventListener(eventType, value);
      } else {
        element.removeAttribute(name);
      }
    }
  });

  Object.keys(newProps).forEach((name) => {
    if (oldProps[name] !== newProps[name]) {
      if (name.startsWith("on")) {
        const eventType = mapEventName(name);
        if (oldProps[name]) {
          element.removeEventListener(eventType, oldProps[name]);
        }
        element.addEventListener(eventType, newProps[name]);
      } else {
        element.setAttribute(name, newProps[name]);
      }
    }
  });
}

function diff(parent, newNode, oldNode, index = 0) {
  const currentElement = parent.childNodes[index];

  if (!oldNode) {
    parent.appendChild(createElement(newNode));
    return;
  }

  if (!newNode) {
    parent.removeChild(currentElement);
    return;
  }

  if (isNodeChanged(oldNode, newNode)) {
    parent.replaceChild(createElement(newNode), currentElement);
    return;
  }

  if (typeof newNode === "string") {
    return;
  }

  updateProps(currentElement, oldNode.props, newNode.props);

  const maxLength = Math.max(newNode.children.length, oldNode.children.length);

  for (let i = 0; i < maxLength; i++) {
    diff(currentElement, newNode.children[i], oldNode.children[i], i);
  }
}

function createElement(node) {
  if (typeof node === "string") {
    return document.createTextNode(node);
  }

  const element = document.createElement(node.type);

  Object.entries(node.props || {}).forEach(([key, value]) => {
    if (key.startsWith("on")) {
      const eventType = mapEventName(key);
      element.addEventListener(eventType, value);
    } else {
      element.setAttribute(key, value);
    }
  });

  (node.children || [])
    .map(createElement)
    .forEach((child) => element.appendChild(child));

  return element;
}

export { diff, createElement };
