function makeMap(str, expectsLowerCase) {
  const map2 = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i3 = 0; i3 < list.length; i3++) {
    map2[list[i3]] = true;
  }
  return expectsLowerCase ? (val) => !!map2[val.toLowerCase()] : (val) => !!map2[val];
}
function normalizeStyle(value) {
  if (isArray$2(value)) {
    const res = {};
    for (let i3 = 0; i3 < value.length; i3++) {
      const item = value[i3];
      const normalized = isString$1(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString$1(value)) {
    return value;
  } else if (isObject$1(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*.*?\*\//gs;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString$1(value)) {
    res = value;
  } else if (isArray$2(value)) {
    for (let i3 = 0; i3 < value.length; i3++) {
      const normalized = normalizeClass(value[i3]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$1(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
const toDisplayString = (val) => {
  return isString$1(val) ? val : val == null ? "" : isArray$2(val) || isObject$1(val) && (val.toString === objectToString || !isFunction$1(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject$1(val) && !isArray$2(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
const EMPTY_OBJ = {};
const EMPTY_ARR = [];
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend$1 = Object.assign;
const remove = (arr, el) => {
  const i3 = arr.indexOf(el);
  if (i3 > -1) {
    arr.splice(i3, 1);
  }
};
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
const isArray$2 = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction$1 = (val) => typeof val === "function";
const isString$1 = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject$1 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject$1(val) && isFunction$1(val.then) && isFunction$1(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString$1(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_2, c2) => c2 ? c2.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, arg) => {
  for (let i3 = 0; i3 < fns.length; i3++) {
    fns[i3](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const looseToNumber = (val) => {
  const n2 = parseFloat(val);
  return isNaN(n2) ? val : n2;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this.effects = [];
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
    }
  }
  get active() {
    return this._active;
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    activeEffectScope = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this._active) {
      let i3, l2;
      for (i3 = 0, l2 = this.effects.length; i3 < l2; i3++) {
        this.effects[i3].stop();
      }
      for (i3 = 0, l2 = this.cleanups.length; i3 < l2; i3++) {
        this.cleanups[i3]();
      }
      if (this.scopes) {
        for (i3 = 0, l2 = this.scopes.length; i3 < l2; i3++) {
          this.scopes[i3].stop(true);
        }
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
      this._active = false;
    }
  }
}
function recordEffectScope(effect, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
const createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
const newTracked = (dep) => (dep.n & trackOpBit) > 0;
const initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i3 = 0; i3 < deps.length; i3++) {
      deps[i3].w |= trackOpBit;
    }
  }
};
const finalizeDepMarkers = (effect) => {
  const { deps } = effect;
  if (deps.length) {
    let ptr = 0;
    for (let i3 = 0; i3 < deps.length; i3++) {
      const dep = deps[i3];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};
const targetMap = /* @__PURE__ */ new WeakMap();
let effectTrackDepth = 0;
let trackOpBit = 1;
const maxMarkerBits = 30;
let activeEffect;
const ITERATE_KEY = Symbol("");
const MAP_KEY_ITERATE_KEY = Symbol("");
class ReactiveEffect {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this.parent = void 0;
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    let parent = activeEffect;
    let lastShouldTrack = shouldTrack;
    while (parent) {
      if (parent === this) {
        return;
      }
      parent = parent.parent;
    }
    try {
      this.parent = activeEffect;
      activeEffect = this;
      shouldTrack = true;
      trackOpBit = 1 << ++effectTrackDepth;
      if (effectTrackDepth <= maxMarkerBits) {
        initDepMarkers(this);
      } else {
        cleanupEffect(this);
      }
      return this.fn();
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        finalizeDepMarkers(this);
      }
      trackOpBit = 1 << --effectTrackDepth;
      activeEffect = this.parent;
      shouldTrack = lastShouldTrack;
      this.parent = void 0;
      if (this.deferStop) {
        this.stop();
      }
    }
  }
  stop() {
    if (activeEffect === this) {
      this.deferStop = true;
    } else if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect(effect) {
  const { deps } = effect;
  if (deps.length) {
    for (let i3 = 0; i3 < deps.length; i3++) {
      deps[i3].delete(effect);
    }
    deps.length = 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep());
    }
    trackEffects(dep);
  }
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray$2(target)) {
    const newLength = Number(newValue);
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newLength) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray$2(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray$2(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  if (deps.length === 1) {
    if (deps[0]) {
      {
        triggerEffects(deps[0]);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    {
      triggerEffects(createDep(effects));
    }
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  const effects = isArray$2(dep) ? dep : [...dep];
  for (const effect of effects) {
    if (effect.computed) {
      triggerEffect(effect);
    }
  }
  for (const effect of effects) {
    if (!effect.computed) {
      triggerEffect(effect);
    }
  }
}
function triggerEffect(effect, debuggerEventExtraInfo) {
  if (effect !== activeEffect || effect.allowRecurse) {
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
const get$1$1 = /* @__PURE__ */ createGetter();
const shallowGet = /* @__PURE__ */ createGetter(false, true);
const readonlyGet = /* @__PURE__ */ createGetter(true);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i3 = 0, l2 = this.length; i3 < l2; i3++) {
        track(arr, "get", i3 + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function hasOwnProperty(key) {
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
function createGetter(isReadonly2 = false, shallow = false) {
  return function get2(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return shallow;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray$2(target);
    if (!isReadonly2) {
      if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty;
      }
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject$1(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  };
}
const set$1$1 = /* @__PURE__ */ createSetter();
const shallowSet = /* @__PURE__ */ createSetter(true);
function createSetter(shallow = false) {
  return function set2(target, key, value, receiver) {
    let oldValue = target[key];
    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
      return false;
    }
    if (!shallow) {
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray$2(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray$2(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value);
      }
    }
    return result;
  };
}
function deleteProperty(target, key) {
  const hadKey = hasOwn(target, key);
  target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger(target, "delete", key, void 0);
  }
  return result;
}
function has$1(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
}
function ownKeys(target) {
  track(target, "iterate", isArray$2(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
const mutableHandlers = {
  get: get$1$1,
  set: set$1$1,
  deleteProperty,
  has: has$1,
  ownKeys
};
const readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    return true;
  },
  deleteProperty(target, key) {
    return true;
  }
};
const shallowReactiveHandlers = /* @__PURE__ */ extend$1({}, mutableHandlers, {
  get: shallowGet,
  set: shallowSet
});
const toShallow = (value) => value;
const getProto = (v2) => Reflect.getPrototypeOf(v2);
function get$3(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has(key, isReadonly2 = false) {
  const target = this[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add$2(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto2 = getProto(target);
  const hadKey = proto2.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set$2(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  }
  get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get$3(this, key);
    },
    get size() {
      return size(this);
    },
    has,
    add: add$2,
    set: set$2,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get$3(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has,
    add: add$2,
    set: set$2,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get$3(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: createReadonlyMethod(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: createReadonlyMethod(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: createReadonlyMethod(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get$3(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: createReadonlyMethod(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: createReadonlyMethod(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: createReadonlyMethod(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value[
    "__v_skip"
    /* ReactiveFlags.SKIP */
  ] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject$1(target)) {
    return target;
  }
  if (target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ] && !(isReadonly2 && target[
    "__v_isReactive"
    /* ReactiveFlags.IS_REACTIVE */
  ])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ]);
  }
  return !!(value && value[
    "__v_isReactive"
    /* ReactiveFlags.IS_REACTIVE */
  ]);
}
function isReadonly(value) {
  return !!(value && value[
    "__v_isReadonly"
    /* ReactiveFlags.IS_READONLY */
  ]);
}
function isShallow(value) {
  return !!(value && value[
    "__v_isShallow"
    /* ReactiveFlags.IS_SHALLOW */
  ]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  def(value, "__v_skip", true);
  return value;
}
const toReactive = (value) => isObject$1(value) ? reactive(value) : value;
const toReadonly = (value) => isObject$1(value) ? readonly(value) : value;
function trackRefValue(ref2) {
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    {
      trackEffects(ref2.dep || (ref2.dep = createDep()));
    }
  }
}
function triggerRefValue(ref2, newVal) {
  ref2 = toRaw(ref2);
  const dep = ref2.dep;
  if (dep) {
    {
      triggerEffects(dep);
    }
  }
}
function isRef(r2) {
  return !!(r2 && r2.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function shallowRef(value) {
  return createRef(value, true);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
    newVal = useDirectValue ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = useDirectValue ? newVal : toReactive(newVal);
      triggerRefValue(this);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
var _a$1$1;
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this[_a$1$1] = false;
    this._dirty = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this[
      "__v_isReadonly"
      /* ReactiveFlags.IS_READONLY */
    ] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    trackRefValue(self2);
    if (self2._dirty || !self2._cacheable) {
      self2._dirty = false;
      self2._value = self2.effect.run();
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}
_a$1$1 = "__v_isReadonly";
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction$1(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = NOOP;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  return cRef;
}
function warn$1(msg, ...args) {
  return;
}
function callWithErrorHandling(fn, instance, type, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction$1(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i3 = 0; i3 < fn.length; i3++) {
    values.push(callWithAsyncErrorHandling(fn[i3], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i3 = 0; i3 < errorCapturedHooks.length; i3++) {
          if (errorCapturedHooks[i3](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    console.error(err);
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
function nextTick(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJobId = getId(queue[middle]);
    middleJobId < id ? start = middle + 1 : end = middle;
  }
  return start;
}
function queueJob(job) {
  if (!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function invalidateJob(job) {
  const i3 = queue.indexOf(job);
  if (i3 > flushIndex) {
    queue.splice(i3, 1);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray$2(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(cb, cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex)) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(seen, i3 = isFlushing ? flushIndex + 1 : 0) {
  for (; i3 < queue.length; i3++) {
    const cb = queue[i3];
    if (cb && cb.pre) {
      queue.splice(i3, 1);
      i3--;
      cb();
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    activePostFlushCbs.sort((a2, b) => getId(a2) - getId(b));
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
const comparator = (a2, b) => {
  const diff2 = getId(a2) - getId(b);
  if (diff2 === 0) {
    if (a2.pre && !b.pre)
      return -1;
    if (b.pre && !a2.pre)
      return 1;
  }
  return diff2;
};
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  queue.sort(comparator);
  const check = NOOP;
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (false)
          ;
        callWithErrorHandling(
          job,
          null,
          14
          /* ErrorCodes.SCHEDULER */
        );
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs();
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs();
    }
  }
}
/* @__PURE__ */ new Set();
/* @__PURE__ */ new Map();
function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || EMPTY_OBJ;
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a2) => isString$1(a2) ? a2.trim() : a2);
    }
    if (number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(handler, instance, 6, args);
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(onceHandler, instance, 6, args);
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction$1(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend$1(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$1(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray$2(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend$1(normalized, raw);
  }
  if (isObject$1(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function pushScopeId(id) {
  currentScopeId = id;
}
function popScopeId() {
  currentScopeId = null;
}
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx)
    return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    let res;
    try {
      res = fn(...args);
    } finally {
      setCurrentRenderingInstance(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking(1);
      }
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
function markAttrsAccessed() {
}
function renderComponentRoot(instance) {
  const { type: Component, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit: emit2, render, renderCache, data, setupState, ctx, inheritAttrs } = instance;
  let result;
  let fallthroughAttrs;
  const prev = setCurrentRenderingInstance(instance);
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      result = normalizeVNode(render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx));
      fallthroughAttrs = attrs;
    } else {
      const render2 = Component;
      if (false)
        ;
      result = normalizeVNode(render2.length > 1 ? render2(props, false ? {
        get attrs() {
          markAttrsAccessed();
          return attrs;
        },
        slots,
        emit: emit2
      } : { attrs, slots, emit: emit2 }) : render2(
        props,
        null
        /* we know it doesn't need it */
      ));
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(
      err,
      instance,
      1
      /* ErrorCodes.RENDER_FUNCTION */
    );
    result = createVNode(Comment);
  }
  let root = result;
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys2 = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys2.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys2.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
        }
        root = cloneVNode(root, fallthroughAttrs);
      }
    }
  }
  if (vnode.dirs) {
    root = cloneVNode(root);
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    root.transition = vnode.transition;
  }
  {
    result = root;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
const filterModelListeners = (attrs, props) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i3 = 0; i3 < dynamicProps.length; i3++) {
        const key = dynamicProps[i3];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i3 = 0; i3 < nextKeys.length; i3++) {
    const key = nextKeys[i3];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent && parent.subTree === vnode) {
    (vnode = parent.vnode).el = el;
    parent = parent.parent;
  }
}
const isSuspense = (type) => type.__isSuspense;
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray$2(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
function provide(key, value) {
  if (!currentInstance)
    ;
  else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance) {
    const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction$1(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
    } else
      ;
  }
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  return doWatch(source, cb, options);
}
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
  const instance = getCurrentScope() === (currentInstance === null || currentInstance === void 0 ? void 0 : currentInstance.scope) ? currentInstance : null;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray$2(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s3) => isReactive(s3) || isShallow(s3));
    getter = () => source.map((s3) => {
      if (isRef(s3)) {
        return s3.value;
      } else if (isReactive(s3)) {
        return traverse(s3);
      } else if (isFunction$1(s3)) {
        return callWithErrorHandling(
          s3,
          instance,
          2
          /* ErrorCodes.WATCH_GETTER */
        );
      } else
        ;
    });
  } else if (isFunction$1(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(
        source,
        instance,
        2
        /* ErrorCodes.WATCH_GETTER */
      );
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
      };
    }
  } else {
    getter = NOOP;
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(
        fn,
        instance,
        4
        /* ErrorCodes.WATCH_CLEANUP */
      );
    };
  };
  let ssrCleanup;
  if (isInSSRComponentSetup) {
    onCleanup = NOOP;
    if (!cb) {
      getter();
    } else if (immediate) {
      callWithAsyncErrorHandling(cb, instance, 3, [
        getter(),
        isMultiSource ? [] : void 0,
        onCleanup
      ]);
    }
    if (flush === "sync") {
      const ctx = useSSRContext();
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
    } else {
      return NOOP;
    }
  }
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect.active) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v2, i3) => hasChanged(v2, oldValue[i3])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    job.pre = true;
    if (instance)
      job.id = instance.uid;
    scheduler = () => queueJob(job);
  }
  const effect = new ReactiveEffect(getter, scheduler);
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect(effect.run.bind(effect), instance && instance.suspense);
  } else {
    effect.run();
  }
  const unwatch = () => {
    effect.stop();
    if (instance && instance.scope) {
      remove(instance.scope.effects, effect);
    }
  };
  if (ssrCleanup)
    ssrCleanup.push(unwatch);
  return unwatch;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString$1(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction$1(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i3 = 0; i3 < segments.length && cur; i3++) {
      cur = cur[segments[i3]];
    }
    return cur;
  };
}
function traverse(value, seen) {
  if (!isObject$1(value) || value[
    "__v_skip"
    /* ReactiveFlags.SKIP */
  ]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, seen);
  } else if (isArray$2(value)) {
    for (let i3 = 0; i3 < value.length; i3++) {
      traverse(value[i3], seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v2) => {
      traverse(v2, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], seen);
    }
  }
  return value;
}
function defineComponent(options) {
  return isFunction$1(options) ? { setup: options, name: options.name } : options;
}
const isAsyncWrapper = (i3) => !!i3.type.__asyncLoader;
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks2 = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      unsetCurrentInstance();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks2.unshift(wrappedHook);
    } else {
      hooks2.push(wrappedHook);
    }
    return wrappedHook;
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target)
);
const onBeforeMount = createHook(
  "bm"
  /* LifecycleHooks.BEFORE_MOUNT */
);
const onMounted = createHook(
  "m"
  /* LifecycleHooks.MOUNTED */
);
const onBeforeUpdate = createHook(
  "bu"
  /* LifecycleHooks.BEFORE_UPDATE */
);
const onUpdated = createHook(
  "u"
  /* LifecycleHooks.UPDATED */
);
const onBeforeUnmount = createHook(
  "bum"
  /* LifecycleHooks.BEFORE_UNMOUNT */
);
const onUnmounted = createHook(
  "um"
  /* LifecycleHooks.UNMOUNTED */
);
const onServerPrefetch = createHook(
  "sp"
  /* LifecycleHooks.SERVER_PREFETCH */
);
const onRenderTriggered = createHook(
  "rtg"
  /* LifecycleHooks.RENDER_TRIGGERED */
);
const onRenderTracked = createHook(
  "rtc"
  /* LifecycleHooks.RENDER_TRACKED */
);
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
function withDirectives(vnode, directives) {
  const internalInstance = currentRenderingInstance;
  if (internalInstance === null) {
    return vnode;
  }
  const instance = getExposeProxy(internalInstance) || internalInstance.proxy;
  const bindings = vnode.dirs || (vnode.dirs = []);
  for (let i3 = 0; i3 < directives.length; i3++) {
    let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i3];
    if (dir) {
      if (isFunction$1(dir)) {
        dir = {
          mounted: dir,
          updated: dir
        };
      }
      if (dir.deep) {
        traverse(value);
      }
      bindings.push({
        dir,
        instance,
        value,
        oldValue: void 0,
        arg,
        modifiers
      });
    }
  }
  return vnode;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i3 = 0; i3 < bindings.length; i3++) {
    const binding = bindings[i3];
    if (oldBindings) {
      binding.oldValue = oldBindings[i3].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
}
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
const NULL_DYNAMIC_COMPONENT = Symbol();
function resolveDynamicComponent(component) {
  if (isString$1(component)) {
    return resolveAsset(COMPONENTS, component, false) || component;
  } else {
    return component || NULL_DYNAMIC_COMPONENT;
  }
}
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(
        Component,
        false
        /* do not include inferred name to avoid breaking existing code */
      );
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component;
      }
    }
    const res = (
      // local registration
      // check instance[type] first which is resolved for options API
      resolve(instance[type] || Component[type], name) || // global registration
      resolve(instance.appContext[type], name)
    );
    if (!res && maybeSelfReference) {
      return Component;
    }
    return res;
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
function renderList(source, renderItem, cache, index2) {
  let ret;
  const cached = cache && cache[index2];
  if (isArray$2(source) || isString$1(source)) {
    ret = new Array(source.length);
    for (let i3 = 0, l2 = source.length; i3 < l2; i3++) {
      ret[i3] = renderItem(source[i3], i3, void 0, cached && cached[i3]);
    }
  } else if (typeof source === "number") {
    ret = new Array(source);
    for (let i3 = 0; i3 < source; i3++) {
      ret[i3] = renderItem(i3 + 1, i3, void 0, cached && cached[i3]);
    }
  } else if (isObject$1(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, (item, i3) => renderItem(item, i3, void 0, cached && cached[i3]));
    } else {
      const keys2 = Object.keys(source);
      ret = new Array(keys2.length);
      for (let i3 = 0, l2 = keys2.length; i3 < l2; i3++) {
        const key = keys2[i3];
        ret[i3] = renderItem(source[key], key, i3, cached && cached[i3]);
      }
    }
  } else {
    ret = [];
  }
  if (cache) {
    cache[index2] = ret;
  }
  return ret;
}
function renderSlot(slots, name, props = {}, fallback, noSlotted) {
  if (currentRenderingInstance.isCE || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.isCE) {
    if (name !== "default")
      props.name = name;
    return createVNode("slot", props, fallback && fallback());
  }
  let slot = slots[name];
  if (slot && slot._c) {
    slot._d = false;
  }
  openBlock();
  const validSlotContent = slot && ensureValidVNode(slot(props));
  const rendered = createBlock(
    Fragment,
    {
      key: props.key || // slot content array of a dynamic conditional slot may have a branch
      // key attached in the `createSlots` helper, respect that
      validSlotContent && validSlotContent.key || `_${name}`
    },
    validSlotContent || (fallback ? fallback() : []),
    validSlotContent && slots._ === 1 ? 64 : -2
    /* PatchFlags.BAIL */
  );
  if (!noSlotted && rendered.scopeId) {
    rendered.slotScopeIds = [rendered.scopeId + "-s"];
  }
  if (slot && slot._c) {
    slot._d = true;
  }
  return rendered;
}
function ensureValidVNode(vnodes) {
  return vnodes.some((child) => {
    if (!isVNode(child))
      return true;
    if (child.type === Comment)
      return false;
    if (child.type === Fragment && !ensureValidVNode(child.children))
      return false;
    return true;
  }) ? vnodes : null;
}
const getPublicInstance = (i3) => {
  if (!i3)
    return null;
  if (isStatefulComponent(i3))
    return getExposeProxy(i3) || i3.proxy;
  return getPublicInstance(i3.parent);
};
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend$1(/* @__PURE__ */ Object.create(null), {
    $: (i3) => i3,
    $el: (i3) => i3.vnode.el,
    $data: (i3) => i3.data,
    $props: (i3) => i3.props,
    $attrs: (i3) => i3.attrs,
    $slots: (i3) => i3.slots,
    $refs: (i3) => i3.refs,
    $parent: (i3) => getPublicInstance(i3.parent),
    $root: (i3) => getPublicInstance(i3.root),
    $emit: (i3) => i3.emit,
    $options: (i3) => resolveMergedOptions(i3),
    $forceUpdate: (i3) => i3.f || (i3.f = () => queueJob(i3.update)),
    $nextTick: (i3) => i3.n || (i3.n = nextTick.bind(i3.proxy)),
    $watch: (i3) => instanceWatch.bind(i3)
  })
);
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    let normalizedProps;
    if (key[0] !== "$") {
      const n2 = accessCache[key];
      if (n2 !== void 0) {
        switch (n2) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)
      ) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else
      ;
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      return false;
    } else {
      {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
let shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook(
      options.beforeCreate,
      instance,
      "bc"
      /* LifecycleHooks.BEFORE_CREATE */
    );
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = null;
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction$1(methodHandler)) {
        {
          ctx[key] = methodHandler.bind(publicThis);
        }
      }
    }
  }
  if (dataOptions) {
    const data = dataOptions.call(publicThis, publicThis);
    if (!isObject$1(data))
      ;
    else {
      instance.data = reactive(data);
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction$1(opt) ? opt.bind(publicThis, publicThis) : isFunction$1(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      const set2 = !isFunction$1(opt) && isFunction$1(opt.set) ? opt.set.bind(publicThis) : NOOP;
      const c2 = computed({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c2.value,
        set: (v2) => c2.value = v2
      });
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction$1(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook(
      created,
      instance,
      "c"
      /* LifecycleHooks.CREATED */
    );
  }
  function registerLifecycleHook(register, hook) {
    if (isArray$2(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray$2(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP, unwrapRef = false) {
  if (isArray$2(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject$1(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
          /* treat default function as factory */
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      if (unwrapRef) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v2) => injected.value = v2
        });
      } else {
        ctx[key] = injected;
      }
    } else {
      ctx[key] = injected;
    }
  }
}
function callHook(hook, instance, type) {
  callWithAsyncErrorHandling(isArray$2(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString$1(raw)) {
    const handler = ctx[raw];
    if (isFunction$1(handler)) {
      watch(getter, handler);
    }
  } else if (isFunction$1(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject$1(raw)) {
    if (isArray$2(raw)) {
      raw.forEach((r2) => createWatcher(r2, ctx, publicThis, key));
    } else {
      const handler = isFunction$1(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction$1(handler)) {
        watch(getter, handler, raw);
      }
    }
  } else
    ;
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach((m2) => mergeOptions$1(resolved, m2, optionMergeStrategies, true));
    }
    mergeOptions$1(resolved, base, optionMergeStrategies);
  }
  if (isObject$1(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions$1(to2, from2, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from2;
  if (extendsOptions) {
    mergeOptions$1(to2, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach((m2) => mergeOptions$1(to2, m2, strats, true));
  }
  for (const key in from2) {
    if (asMixin && key === "expose")
      ;
    else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to2[key] = strat ? strat(to2[key], from2[key]) : from2[key];
    }
  }
  return to2;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeObjectOptions,
  emits: mergeObjectOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to2, from2) {
  if (!from2) {
    return to2;
  }
  if (!to2) {
    return from2;
  }
  return function mergedDataFn() {
    return extend$1(isFunction$1(to2) ? to2.call(this, this) : to2, isFunction$1(from2) ? from2.call(this, this) : from2);
  };
}
function mergeInject(to2, from2) {
  return mergeObjectOptions(normalizeInject(to2), normalizeInject(from2));
}
function normalizeInject(raw) {
  if (isArray$2(raw)) {
    const res = {};
    for (let i3 = 0; i3 < raw.length; i3++) {
      res[raw[i3]] = raw[i3];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to2, from2) {
  return to2 ? [...new Set([].concat(to2, from2))] : from2;
}
function mergeObjectOptions(to2, from2) {
  return to2 ? extend$1(extend$1(/* @__PURE__ */ Object.create(null), to2), from2) : from2;
}
function mergeWatchOptions(to2, from2) {
  if (!to2)
    return from2;
  if (!from2)
    return to2;
  const merged = extend$1(/* @__PURE__ */ Object.create(null), to2);
  for (const key in from2) {
    merged[key] = mergeAsArray(to2[key], from2[key]);
  }
  return merged;
}
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  def(attrs, InternalObjectKey, 1);
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const { props, attrs, vnode: { patchFlag } } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i3 = 0; i3 < propsToUpdate.length; i3++) {
        let key = propsToUpdate[i3];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
              /* isAbsent */
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
              /* isAbsent */
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i3 = 0; i3 < needCastKeys.length; i3++) {
      const key = needCastKeys[i3];
      props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn(castValues, key));
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && isFunction$1(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(null, props);
          unsetCurrentInstance();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[
      0
      /* BooleanFlags.shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* BooleanFlags.shouldCastTrue */
      ] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction$1(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys2] = normalizePropsOptions(raw2, appContext, true);
      extend$1(normalized, props);
      if (keys2)
        needCastKeys.push(...keys2);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$1(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray$2(raw)) {
    for (let i3 = 0; i3 < raw.length; i3++) {
      const normalizedKey = camelize(raw[i3]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray$2(opt) || isFunction$1(opt) ? { type: opt } : Object.assign({}, opt);
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[
            0
            /* BooleanFlags.shouldCast */
          ] = booleanIndex > -1;
          prop[
            1
            /* BooleanFlags.shouldCastTrue */
          ] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject$1(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$") {
    return true;
  }
  return false;
}
function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*(function|class) (\w+)/);
  return match ? match[2] : ctor === null ? "null" : "";
}
function isSameType(a2, b) {
  return getType(a2) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray$2(expectedTypes)) {
    return expectedTypes.findIndex((t2) => isSameType(t2, type));
  } else if (isFunction$1(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
const isInternalKey = (key) => key[0] === "_" || key === "$stable";
const normalizeSlotValue = (value) => isArray$2(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
const normalizeSlot$1 = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    return rawSlot;
  }
  const normalized = withCtx((...args) => {
    if (false)
      ;
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key))
      continue;
    const value = rawSlots[key];
    if (isFunction$1(value)) {
      slots[key] = normalizeSlot$1(key, value, ctx);
    } else if (value != null) {
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
const normalizeVNodeSlots = (instance, children) => {
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
const initSlots = (instance, children) => {
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      instance.slots = toRaw(children);
      def(children, "_", type);
    } else {
      normalizeObjectSlots(children, instance.slots = {});
    }
  } else {
    instance.slots = {};
    if (children) {
      normalizeVNodeSlots(instance, children);
    }
  }
  def(instance.slots, InternalObjectKey, 1);
};
const updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        extend$1(slots, children);
        if (!optimized && type === 1) {
          delete slots._;
        }
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && !(key in deletionComparisonTarget)) {
        delete slots[key];
      }
    }
  }
};
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction$1(rootComponent)) {
      rootComponent = Object.assign({}, rootComponent);
    }
    if (rootProps != null && !isObject$1(rootProps)) {
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new Set();
    let isMounted = false;
    const app2 = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v2) {
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin))
          ;
        else if (plugin && isFunction$1(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app2, ...options);
        } else if (isFunction$1(plugin)) {
          installedPlugins.add(plugin);
          plugin(app2, ...options);
        } else
          ;
        return app2;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          }
        }
        return app2;
      },
      component(name, component) {
        if (!component) {
          return context.components[name];
        }
        context.components[name] = component;
        return app2;
      },
      directive(name, directive) {
        if (!directive) {
          return context.directives[name];
        }
        context.directives[name] = directive;
        return app2;
      },
      mount(rootContainer, isHydrate, isSVG) {
        if (!isMounted) {
          const vnode = createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          if (isHydrate && hydrate) {
            hydrate(vnode, rootContainer);
          } else {
            render(vnode, rootContainer, isSVG);
          }
          isMounted = true;
          app2._container = rootContainer;
          rootContainer.__vue_app__ = app2;
          return getExposeProxy(vnode.component) || vnode.component.proxy;
        }
      },
      unmount() {
        if (isMounted) {
          render(null, app2._container);
          delete app2._container.__vue_app__;
        }
      },
      provide(key, value) {
        context.provides[key] = value;
        return app2;
      }
    };
    return app2;
  };
}
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray$2(rawRef)) {
    rawRef.forEach((r2, i3) => setRef(r2, oldRawRef && (isArray$2(oldRawRef) ? oldRawRef[i3] : oldRawRef), parentSuspense, vnode, isUnmount));
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref2 } = rawRef;
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  if (oldRef != null && oldRef !== ref2) {
    if (isString$1(oldRef)) {
      refs[oldRef] = null;
      if (hasOwn(setupState, oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isFunction$1(ref2)) {
    callWithErrorHandling(ref2, owner, 12, [value, refs]);
  } else {
    const _isString = isString$1(ref2);
    const _isRef = isRef(ref2);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? hasOwn(setupState, ref2) ? setupState[ref2] : refs[ref2] : ref2.value;
          if (isUnmount) {
            isArray$2(existing) && remove(existing, refValue);
          } else {
            if (!isArray$2(existing)) {
              if (_isString) {
                refs[ref2] = [refValue];
                if (hasOwn(setupState, ref2)) {
                  setupState[ref2] = refs[ref2];
                }
              } else {
                ref2.value = [refValue];
                if (rawRef.k)
                  refs[rawRef.k] = ref2.value;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref2] = value;
          if (hasOwn(setupState, ref2)) {
            setupState[ref2] = value;
          }
        } else if (_isRef) {
          ref2.value = value;
          if (rawRef.k)
            refs[rawRef.k] = value;
        } else
          ;
      };
      if (value) {
        doSet.id = -1;
        queuePostRenderEffect(doSet, parentSuspense);
      } else {
        doSet();
      }
    }
  }
}
const queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(options) {
  return baseCreateRenderer(options);
}
function baseCreateRenderer(options, createHydrationFns) {
  const target = getGlobalThis();
  target.__VUE__ = true;
  const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId = NOOP, insertStaticContent: hostInsertStaticContent } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref: ref2, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, isSVG);
        }
        break;
      case Fragment:
        processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        break;
      default:
        if (shapeFlag & 1) {
          processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (shapeFlag & 6) {
          processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (shapeFlag & 64) {
          type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
        } else if (shapeFlag & 128) {
          type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
        } else
          ;
    }
    if (ref2 != null && parentComponent) {
      setRef(ref2, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, isSVG) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG, n2.el, n2.anchor);
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    isSVG = isSVG || n2.type === "svg";
    if (n1 == null) {
      mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      patchElement(n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { type, props, shapeFlag, transition, dirs } = vnode;
    el = vnode.el = hostCreateElement(vnode.type, isSVG, props && props.is, props);
    if (shapeFlag & 8) {
      hostSetElementText(el, vnode.children);
    } else if (shapeFlag & 16) {
      mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type !== "foreignObject", slotScopeIds, optimized);
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "created");
    }
    setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    if (props) {
      for (const key in props) {
        if (key !== "value" && !isReservedProp(key)) {
          hostPatchProp(el, key, null, props[key], isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
        }
      }
      if ("value" in props) {
        hostPatchProp(el, "value", null, props.value);
      }
      if (vnodeHook = props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i3 = 0; i3 < slotScopeIds.length; i3++) {
        hostSetScopeId(el, slotScopeIds[i3]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (vnode === subTree) {
        const parentVNode = parentComponent.vnode;
        setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start = 0) => {
    for (let i3 = start; i3 < children.length; i3++) {
      const child = children[i3] = optimized ? cloneIfMounted(children[i3]) : normalizeVNode(children[i3]);
      patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    const areChildrenSVG = isSVG && n2.type !== "foreignObject";
    if (dynamicChildren) {
      patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds);
    } else if (!optimized) {
      patchChildren(n1, n2, el, null, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds, false);
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, isSVG);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, isSVG);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i3 = 0; i3 < propsToUpdate.length; i3++) {
            const key = propsToUpdate[i3];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(el, key, prev, next, isSVG, n1.children, parentComponent, parentSuspense, unmountChildren);
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds) => {
    for (let i3 = 0; i3 < newChildren.length; i3++) {
      const oldVNode = oldChildren[i3];
      const newVNode = newChildren[i3];
      const container = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
        oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          fallbackContainer
        )
      );
      patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, true);
    }
  };
  const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
    if (oldProps !== newProps) {
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(el, key, oldProps[key], null, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
      }
      for (const key in newProps) {
        if (isReservedProp(key))
          continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(el, key, prev, next, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(n2.children, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
      // of renderSlot() with no valid children
      n1.dynamicChildren) {
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, isSVG, slotScopeIds);
        if (
          // #2080 if the stable fragment has a key, it's a <template v-for> that may
          //  get moved around. Make sure all root level vnodes inherit el.
          // #2134 or if it's a component root, it may also get moved around
          // as the component is being moved.
          n2.key != null || parentComponent && n2 === parentComponent.subTree
        ) {
          traverseStaticChildren(
            n1,
            n2,
            true
            /* shallow */
          );
        }
      } else {
        patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(n2, container, anchor, isSVG, optimized);
      } else {
        mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
    const instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      setupComponent(instance);
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
      }
      return;
    }
    setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized);
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        updateComponentPreRender(instance, n2, optimized);
        return;
      } else {
        instance.next = n2;
        invalidateJob(instance.update);
        instance.update();
      }
    } else {
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m: m2, parent } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        if (el && hydrateNode) {
          const hydrateSubTree = () => {
            instance.subTree = renderComponentRoot(instance);
            hydrateNode(el, instance.subTree, instance, parentSuspense, null);
          };
          if (isAsyncWrapperVNode) {
            initialVNode.type.__asyncLoader().then(
              // note: we are moving the render call into an async callback,
              // which means it won't track dependencies - but it's ok because
              // a server-rendered async wrapper is already in resolved state
              // and it will never need to change.
              () => !instance.isUnmounted && hydrateSubTree()
            );
          } else {
            hydrateSubTree();
          }
        } else {
          const subTree = instance.subTree = renderComponentRoot(instance);
          patch(null, subTree, container, anchor, instance, parentSuspense, isSVG);
          initialVNode.el = subTree.el;
        }
        if (m2) {
          queuePostRenderEffect(m2, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
        }
        if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u: u2, parent, vnode } = instance;
        let originNext = next;
        let vnodeHook;
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance, true);
        const nextTree = renderComponentRoot(instance);
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        patch(
          prevTree,
          nextTree,
          // parent may have changed if it's in a teleport
          hostParentNode(prevTree.el),
          // anchor may have changed if it's in a fragment
          getNextHostNode(prevTree),
          instance,
          parentSuspense,
          isSVG
        );
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u2) {
          queuePostRenderEffect(u2, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, next, vnode), parentSuspense);
        }
      }
    };
    const effect = instance.effect = new ReactiveEffect(
      componentUpdateFn,
      () => queueJob(update),
      instance.scope
      // track it in component's effect scope
    );
    const update = instance.update = () => effect.run();
    update.id = instance.uid;
    toggleRecurse(instance, true);
    update();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs();
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i3;
    for (i3 = 0; i3 < commonLength; i3++) {
      const nextChild = c2[i3] = optimized ? cloneIfMounted(c2[i3]) : normalizeVNode(c2[i3]);
      patch(c1[i3], nextChild, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
    if (oldLength > newLength) {
      unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
    } else {
      mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, commonLength);
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let i3 = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i3 <= e1 && i3 <= e2) {
      const n1 = c1[i3];
      const n2 = c2[i3] = optimized ? cloneIfMounted(c2[i3]) : normalizeVNode(c2[i3]);
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        break;
      }
      i3++;
    }
    while (i3 <= e1 && i3 <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i3 > e1) {
      if (i3 <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i3 <= e2) {
          patch(null, c2[i3] = optimized ? cloneIfMounted(c2[i3]) : normalizeVNode(c2[i3]), container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          i3++;
        }
      }
    } else if (i3 > e2) {
      while (i3 <= e1) {
        unmount(c1[i3], parentComponent, parentSuspense, true);
        i3++;
      }
    } else {
      const s1 = i3;
      const s22 = i3;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i3 = s22; i3 <= e2; i3++) {
        const nextChild = c2[i3] = optimized ? cloneIfMounted(c2[i3]) : normalizeVNode(c2[i3]);
        if (nextChild.key != null) {
          keyToNewIndexMap.set(nextChild.key, i3);
        }
      }
      let j2;
      let patched = 0;
      const toBePatched = e2 - s22 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i3 = 0; i3 < toBePatched; i3++)
        newIndexToOldIndexMap[i3] = 0;
      for (i3 = s1; i3 <= e1; i3++) {
        const prevChild = c1[i3];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j2 = s22; j2 <= e2; j2++) {
            if (newIndexToOldIndexMap[j2 - s22] === 0 && isSameVNodeType(prevChild, c2[j2])) {
              newIndex = j2;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s22] = i3 + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j2 = increasingNewIndexSequence.length - 1;
      for (i3 = toBePatched - 1; i3 >= 0; i3--) {
        const nextIndex = s22 + i3;
        const nextChild = c2[nextIndex];
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
        if (newIndexToOldIndexMap[i3] === 0) {
          patch(null, nextChild, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (moved) {
          if (j2 < 0 || i3 !== increasingNewIndexSequence[j2]) {
            move(
              nextChild,
              container,
              anchor,
              2
              /* MoveType.REORDER */
            );
          } else {
            j2--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment) {
      hostInsert(el, container, anchor);
      for (let i3 = 0; i3 < children.length; i3++) {
        move(children[i3], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove3 = () => hostInsert(el, container, anchor);
        const performLeave = () => {
          leave(el, () => {
            remove3();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove3, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const { type, props, ref: ref2, children, dynamicChildren, shapeFlag, patchFlag, dirs } = vnode;
    if (ref2 != null) {
      setRef(ref2, null, parentSuspense, vnode, true);
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(vnode, parentComponent, parentSuspense, optimized, internals, doRemove);
      } else if (dynamicChildren && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
      } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment) {
      {
        removeFragment(el, anchor);
      }
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    const { bum, scope, update, subTree, um } = instance;
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (update) {
      update.active = false;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
    if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
      parentSuspense.deps--;
      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i3 = start; i3 < children.length; i3++) {
      unmount(children[i3], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    return hostNextSibling(vnode.anchor || vnode.el);
  };
  const render = (vnode, container, isSVG) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(container._vnode || null, vnode, container, null, null, null, isSVG);
    }
    flushPreFlushCbs();
    flushPostFlushCbs();
    container._vnode = vnode;
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  let hydrateNode;
  if (createHydrationFns) {
    [hydrate, hydrateNode] = createHydrationFns(internals);
  }
  return {
    render,
    hydrate,
    createApp: createAppAPI(render, hydrate)
  };
}
function toggleRecurse({ effect, update }, allowed) {
  effect.allowRecurse = update.allowRecurse = allowed;
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray$2(ch1) && isArray$2(ch2)) {
    for (let i3 = 0; i3 < ch1.length; i3++) {
      const c1 = ch1[i3];
      let c2 = ch2[i3];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i3] = cloneIfMounted(ch2[i3]);
          c2.el = c1.el;
        }
        if (!shallow)
          traverseStaticChildren(c1, c2);
      }
      if (c2.type === Text) {
        c2.el = c1.el;
      }
    }
  }
}
function getSequence(arr) {
  const p2 = arr.slice();
  const result = [0];
  let i3, j2, u2, v2, c2;
  const len = arr.length;
  for (i3 = 0; i3 < len; i3++) {
    const arrI = arr[i3];
    if (arrI !== 0) {
      j2 = result[result.length - 1];
      if (arr[j2] < arrI) {
        p2[i3] = j2;
        result.push(i3);
        continue;
      }
      u2 = 0;
      v2 = result.length - 1;
      while (u2 < v2) {
        c2 = u2 + v2 >> 1;
        if (arr[result[c2]] < arrI) {
          u2 = c2 + 1;
        } else {
          v2 = c2;
        }
      }
      if (arrI < arr[result[u2]]) {
        if (u2 > 0) {
          p2[i3] = result[u2 - 1];
        }
        result[u2] = i3;
      }
    }
  }
  u2 = result.length;
  v2 = result[u2 - 1];
  while (u2-- > 0) {
    result[u2] = v2;
    v2 = p2[v2];
  }
  return result;
}
const isTeleport = (type) => type.__isTeleport;
const Fragment = Symbol(void 0);
const Text = Symbol(void 0);
const Comment = Symbol(void 0);
const Static = Symbol(void 0);
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(value) {
  isBlockTreeEnabled += value;
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(createBaseVNode(
    type,
    props,
    children,
    patchFlag,
    dynamicProps,
    shapeFlag,
    true
    /* isBlock */
  ));
}
function createBlock(type, props, children, patchFlag, dynamicProps) {
  return setupBlock(createVNode(
    type,
    props,
    children,
    patchFlag,
    dynamicProps,
    true
    /* isBlock: prevent a block from tracking itself */
  ));
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key;
}
const InternalObjectKey = `__vInternal`;
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({ ref: ref2, ref_key, ref_for }) => {
  return ref2 != null ? isString$1(ref2) || isRef(ref2) || isFunction$1(ref2) ? { i: currentRenderingInstance, r: ref2, k: ref_key, f: !!ref_for } : ref2 : null;
};
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString$1(children) ? 8 : 16;
  }
  if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
  !isBlockNode && // has current parent block
  currentBlock && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode = _createVNode;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    type = Comment;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(
      type,
      props,
      true
      /* mergeRef: true */
    );
    if (children) {
      normalizeChildren(cloned, children);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & 6) {
        currentBlock[currentBlock.indexOf(type)] = cloned;
      } else {
        currentBlock.push(cloned);
      }
    }
    cloned.patchFlag |= -2;
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !isString$1(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject$1(style)) {
      if (isProxy(style) && !isArray$2(style)) {
        style = extend$1({}, style);
      }
      props.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString$1(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject$1(type) ? 4 : isFunction$1(type) ? 2 : 0;
  return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
}
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? extend$1({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false) {
  const { props, ref: ref2, patchFlag, children } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      mergeRef && ref2 ? isArray$2(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps)
    ) : ref2,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children,
    target: vnode.target,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition: vnode.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor,
    ctx: vnode.ctx,
    ce: vnode.ce
  };
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function createStaticVNode(content, numberOfNodes) {
  const vnode = createVNode(Static, null, content);
  vnode.staticCount = numberOfNodes;
  return vnode;
}
function createCommentVNode(text = "", asBlock = false) {
  return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray$2(child)) {
    return createVNode(
      Fragment,
      null,
      // #3666, avoid reference pollution when reusing vnode
      child.slice()
    );
  } else if (typeof child === "object") {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray$2(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !(InternalObjectKey in children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction$1(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i3 = 0; i3 < args.length; i3++) {
    const toMerge = args[i3];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray$2(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}
const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = { _: instance };
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const setCurrentInstance = (instance) => {
  currentInstance = instance;
  instance.scope.on();
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  currentInstance = null;
};
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const { props, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isInSSRComponentSetup = false;
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component = instance.type;
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  const { setup: setup2 } = Component;
  if (setup2) {
    const setupContext = instance.setupContext = setup2.length > 1 ? createSetupContext(instance) : null;
    setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(setup2, instance, 0, [instance.props, setupContext]);
    resetTracking();
    unsetCurrentInstance();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult, isSSR);
        }).catch((e2) => {
          handleError(
            e2,
            instance,
            0
            /* ErrorCodes.SETUP_FUNCTION */
          );
        });
      } else {
        instance.asyncDep = setupResult;
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction$1(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject$1(setupResult)) {
    instance.setupState = proxyRefs(setupResult);
  } else
    ;
  finishComponentSetup(instance, isSSR);
}
let compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    if (!isSSR && compile && !Component.render) {
      const template = Component.template || resolveMergedOptions(instance).template;
      if (template) {
        const { isCustomElement: isCustomElement2, compilerOptions } = instance.appContext.config;
        const { delimiters, compilerOptions: componentCompilerOptions } = Component;
        const finalCompilerOptions = extend$1(extend$1({
          isCustomElement: isCustomElement2,
          delimiters
        }, compilerOptions), componentCompilerOptions);
        Component.render = compile(template, finalCompilerOptions);
      }
    }
    instance.render = Component.render || NOOP;
  }
  {
    setCurrentInstance(instance);
    pauseTracking();
    applyOptions(instance);
    resetTracking();
    unsetCurrentInstance();
  }
}
function createAttrsProxy(instance) {
  return new Proxy(instance.attrs, {
    get(target, key) {
      track(instance, "get", "$attrs");
      return target[key];
    }
  });
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    instance.exposed = exposed || {};
  };
  let attrs;
  {
    return {
      get attrs() {
        return attrs || (attrs = createAttrsProxy(instance));
      },
      slots: instance.slots,
      emit: instance.emit,
      expose
    };
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  }
}
function getComponentName(Component, includeInferred = true) {
  return isFunction$1(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function isClassComponent(value) {
  return isFunction$1(value) && "__vccOpts" in value;
}
const computed = (getterOrOptions, debugOptions) => {
  return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
function h$2(type, propsOrChildren, children) {
  const l2 = arguments.length;
  if (l2 === 2) {
    if (isObject$1(propsOrChildren) && !isArray$2(propsOrChildren)) {
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren]);
      }
      return createVNode(type, propsOrChildren);
    } else {
      return createVNode(type, null, propsOrChildren);
    }
  } else {
    if (l2 > 3) {
      children = Array.prototype.slice.call(arguments, 2);
    } else if (l2 === 3 && isVNode(children)) {
      children = [children];
    }
    return createVNode(type, propsOrChildren, children);
  }
}
const ssrContextKey = Symbol(``);
const useSSRContext = () => {
  {
    const ctx = inject(ssrContextKey);
    return ctx;
  }
};
const version = "3.2.47";
const svgNS = "http://www.w3.org/2000/svg";
const doc = typeof document !== "undefined" ? document : null;
const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, isSVG, is, props) => {
    const el = isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag, is ? { is } : void 0);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(content, parent, anchor, isSVG, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end || start.nextSibling)) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling))
          break;
      }
    } else {
      templateContainer.innerHTML = isSVG ? `<svg>${content}</svg>` : content;
      const template = templateContainer.content;
      if (isSVG) {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      // first
      before ? before.nextSibling : parent.firstChild,
      // last
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
function patchClass(el, value, isSVG) {
  const transitionClasses = el._vtc;
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString$1(next);
  if (next && !isCssString) {
    if (prev && !isString$1(prev)) {
      for (const key in prev) {
        if (next[key] == null) {
          setStyle(style, key, "");
        }
      }
    }
    for (const key in next) {
      setStyle(style, key, next[key]);
    }
  } else {
    const currentDisplay = style.display;
    if (isCssString) {
      if (prev !== next) {
        style.cssText = next;
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
    if ("_vod" in el) {
      style.display = currentDisplay;
    }
  }
}
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray$2(val)) {
    val.forEach((v2) => setStyle(style, name, v2));
  } else {
    if (val == null)
      val = "";
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i3 = 0; i3 < prefixes.length; i3++) {
    const prefixed = prefixes[i3] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    const isBoolean = isSpecialBooleanAttr(key);
    if (value == null || isBoolean && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, isBoolean ? "" : value);
    }
  }
}
function patchDOMProp(el, key, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
  if (key === "innerHTML" || key === "textContent") {
    if (prevChildren) {
      unmountChildren(prevChildren, parentComponent, parentSuspense);
    }
    el[key] = value == null ? "" : value;
    return;
  }
  if (key === "value" && el.tagName !== "PROGRESS" && // custom elements may use _value internally
  !el.tagName.includes("-")) {
    el._value = value;
    const newValue = value == null ? "" : value;
    if (el.value !== newValue || // #4956: always set for OPTION elements because its value falls back to
    // textContent if no value attribute is present. And setting .value for
    // OPTION has no side effect
    el.tagName === "OPTION") {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      value = includeBooleanAttr(value);
    } else if (value == null && type === "string") {
      value = "";
      needRemove = true;
    } else if (type === "number") {
      value = 0;
      needRemove = true;
    }
  }
  try {
    el[key] = value;
  } catch (e2) {
  }
  needRemove && el.removeAttribute(key);
}
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el._vei || (el._vei = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(nextValue, instance);
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m2;
    while (m2 = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m2[0].length);
      options[m2[0].toLowerCase()] = true;
    }
  }
  const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
  return [event, options];
}
let cachedNow = 0;
const p$1 = /* @__PURE__ */ Promise.resolve();
const getNow = () => cachedNow || (p$1.then(() => cachedNow = 0), cachedNow = Date.now());
function createInvoker(initialValue, instance) {
  const invoker = (e2) => {
    if (!e2._vts) {
      e2._vts = Date.now();
    } else if (e2._vts <= invoker.attached) {
      return;
    }
    callWithAsyncErrorHandling(patchStopImmediatePropagation(e2, invoker.value), instance, 5, [e2]);
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e2, value) {
  if (isArray$2(value)) {
    const originalStop = e2.stopImmediatePropagation;
    e2.stopImmediatePropagation = () => {
      originalStop.call(e2);
      e2._stopped = true;
    };
    return value.map((fn) => (e3) => !e3._stopped && fn && fn(e3));
  } else {
    return value;
  }
}
const nativeOnRE = /^on[a-z]/;
const patchProp = (el, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(el, key, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && nativeOnRE.test(key) && isFunction$1(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable" || key === "translate") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (nativeOnRE.test(key) && isString$1(value)) {
    return false;
  }
  return key in el;
}
/* @__PURE__ */ new WeakMap();
/* @__PURE__ */ new WeakMap();
const vShow = {
  beforeMount(el, { value }, { transition }) {
    el._vod = el.style.display === "none" ? "" : el.style.display;
    if (transition && value) {
      transition.beforeEnter(el);
    } else {
      setDisplay(el, value);
    }
  },
  mounted(el, { value }, { transition }) {
    if (transition && value) {
      transition.enter(el);
    }
  },
  updated(el, { value, oldValue }, { transition }) {
    if (!value === !oldValue)
      return;
    if (transition) {
      if (value) {
        transition.beforeEnter(el);
        setDisplay(el, true);
        transition.enter(el);
      } else {
        transition.leave(el, () => {
          setDisplay(el, false);
        });
      }
    } else {
      setDisplay(el, value);
    }
  },
  beforeUnmount(el, { value }) {
    setDisplay(el, value);
  }
};
function setDisplay(el, value) {
  el.style.display = value ? el._vod : "none";
}
const rendererOptions = /* @__PURE__ */ extend$1({ patchProp }, nodeOps);
let renderer;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
const createApp = (...args) => {
  const app2 = ensureRenderer().createApp(...args);
  const { mount } = app2;
  app2.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container)
      return;
    const component = app2._component;
    if (!isFunction$1(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    container.innerHTML = "";
    const proxy = mount(container, false, container instanceof SVGElement);
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app2;
};
function normalizeContainer(container) {
  if (isString$1(container)) {
    const res = document.querySelector(container);
    return res;
  }
  return container;
}
const _imports_0 = "" + new URL("icon-6960fafd.png", import.meta.url).href;
const _hoisted_1$r = /* @__PURE__ */ createStaticVNode('<header><h1>Welcome to To-Do</h1></header><main class="space-y-4 md:space-y-8"><div class="w-full mx-auto text-center font-black text-6xl flex flex-row items-center justify-center"><img class="w-1/3" src="' + _imports_0 + '" alt="To-Do"><span class="w-2/3 text-transparent bg-clip-text bg-gradient-to-br from-blue-300 to-blue-500"> To-Do </span></div><p>welcome! Add your goals and use our To-Do to easily complete your tasks!</p><p> We very much welcome everyone to help us on GitHub, give us suggestions or criticism. If you have time, you can visit our GitHub page <a class="text-blue-500" target="_blank" href="https://github.com/bre97-web/To-Do"> To-Do </a> . </p></main>', 2);
const _sfc_main$t = /* @__PURE__ */ defineComponent({
  __name: "FirstLaunch",
  setup(__props) {
    var isFirstLaunch;
    try {
      isFirstLaunch = ref(JSON.parse(localStorage.getItem("bre97-web-todo-firstLaunch")));
    } catch {
      console.log("Please check your Applications Local Storage, We have been delete your invaild local storage.");
      localStorage.clear();
      location.reload();
    }
    onBeforeMount(() => {
      if (isFirstLaunch.value === void 0 || isFirstLaunch.value === null) {
        isFirstLaunch.value = true;
      }
    });
    const submit = () => {
      isFirstLaunch.value = false;
      localStorage.setItem("bre97-web-todo-firstLaunch", JSON.stringify(isFirstLaunch.value));
    };
    const close = () => isFirstLaunch.value = false;
    return (_ctx, _cache) => {
      return unref(isFirstLaunch) ? (openBlock(), createElementBlock("div", {
        key: 0,
        ref: "dialog",
        class: normalizeClass(["fixed min-h-screen w-full z-50 backdrop-blur-sm bg-black bg-opacity-25", { "hidden ": !unref(isFirstLaunch) }])
      }, [
        createBaseVNode("div", { class: "space-y-4 md:space-y-8 lg:space-y-16 w-2/3 max-w-2xl mx-auto border mt-16 bg-white dark:bg-slate-900 rounded-md px-4 md:px-8 lg:px-16 py-2 md:py-4 lg:py-8" }, [
          _hoisted_1$r,
          createBaseVNode("footer", { class: "flex flex-row items-center justify-end gap-2" }, [
            createBaseVNode("md-text-button", { onClick: close }, "Hidden"),
            createBaseVNode("md-filled-button", { onClick: submit }, "Read")
          ])
        ])
      ], 2)) : createCommentVNode("", true);
    };
  }
});
const Loading_vue_vue_type_style_index_0_scoped_139b30df_lang = "";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$s = {};
const _withScopeId$2 = (n2) => (pushScopeId("data-v-139b30df"), n2 = n2(), popScopeId(), n2);
const _hoisted_1$q = { id: "loading" };
const _hoisted_2$l = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", null, [
  /* @__PURE__ */ createBaseVNode("img", {
    src: _imports_0,
    alt: "To-Do",
    class: "max-w-xs"
  }),
  /* @__PURE__ */ createBaseVNode("div", null, [
    /* @__PURE__ */ createBaseVNode("md-linear-progress", { indeterminate: "" }),
    /* @__PURE__ */ createBaseVNode("h1", null, "To-Do")
  ])
], -1));
const _hoisted_3$f = [
  _hoisted_2$l
];
function _sfc_render$1(_ctx, _cache) {
  return openBlock(), createElementBlock("div", _hoisted_1$q, _hoisted_3$f);
}
const Loading = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$1], ["__scopeId", "data-v-139b30df"]]);
const _hoisted_1$p = {
  key: 1,
  id: "root",
  class: "bg-base overflow-x-hidden"
};
const _hoisted_2$k = /* @__PURE__ */ createBaseVNode("footer", null, [
  /* @__PURE__ */ createBaseVNode("div", { class: "p-8 flex flex-col md:flex-row gap-2 flex-wrap" }, [
    /* @__PURE__ */ createBaseVNode("div", null, [
      /* @__PURE__ */ createBaseVNode("h1", null, "To-Do"),
      /* @__PURE__ */ createBaseVNode("h2", null, "bre97-web")
    ])
  ])
], -1);
const _sfc_main$r = /* @__PURE__ */ defineComponent({
  __name: "App",
  setup(__props) {
    const isLoaded = ref(false);
    window.addEventListener("load", () => {
      setTimeout(() => isLoaded.value = true, 1e3);
    });
    return (_ctx, _cache) => {
      const _component_router_view = resolveComponent("router-view");
      return !isLoaded.value ? (openBlock(), createBlock(Loading, {
        key: 0,
        message: "To-Do"
      })) : (openBlock(), createElementBlock("div", _hoisted_1$p, [
        createVNode(_sfc_main$t),
        createVNode(_component_router_view, null, {
          default: withCtx(({ Component }) => [
            (openBlock(), createBlock(resolveDynamicComponent(Component)))
          ]),
          _: 1
        }),
        _hoisted_2$k
      ]));
    };
  }
});
/*!
  * vue-router v4.1.6
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */
const isBrowser = typeof window !== "undefined";
function isESModule(obj) {
  return obj.__esModule || obj[Symbol.toStringTag] === "Module";
}
const assign = Object.assign;
function applyToParams(fn, params) {
  const newParams = {};
  for (const key in params) {
    const value = params[key];
    newParams[key] = isArray$1(value) ? value.map(fn) : fn(value);
  }
  return newParams;
}
const noop = () => {
};
const isArray$1 = Array.isArray;
const TRAILING_SLASH_RE = /\/$/;
const removeTrailingSlash = (path) => path.replace(TRAILING_SLASH_RE, "");
function parseURL(parseQuery2, location2, currentLocation = "/") {
  let path, query = {}, searchString = "", hash = "";
  const hashPos = location2.indexOf("#");
  let searchPos = location2.indexOf("?");
  if (hashPos < searchPos && hashPos >= 0) {
    searchPos = -1;
  }
  if (searchPos > -1) {
    path = location2.slice(0, searchPos);
    searchString = location2.slice(searchPos + 1, hashPos > -1 ? hashPos : location2.length);
    query = parseQuery2(searchString);
  }
  if (hashPos > -1) {
    path = path || location2.slice(0, hashPos);
    hash = location2.slice(hashPos, location2.length);
  }
  path = resolveRelativePath(path != null ? path : location2, currentLocation);
  return {
    fullPath: path + (searchString && "?") + searchString + hash,
    path,
    query,
    hash
  };
}
function stringifyURL(stringifyQuery2, location2) {
  const query = location2.query ? stringifyQuery2(location2.query) : "";
  return location2.path + (query && "?") + query + (location2.hash || "");
}
function stripBase(pathname, base) {
  if (!base || !pathname.toLowerCase().startsWith(base.toLowerCase()))
    return pathname;
  return pathname.slice(base.length) || "/";
}
function isSameRouteLocation(stringifyQuery2, a2, b) {
  const aLastIndex = a2.matched.length - 1;
  const bLastIndex = b.matched.length - 1;
  return aLastIndex > -1 && aLastIndex === bLastIndex && isSameRouteRecord(a2.matched[aLastIndex], b.matched[bLastIndex]) && isSameRouteLocationParams(a2.params, b.params) && stringifyQuery2(a2.query) === stringifyQuery2(b.query) && a2.hash === b.hash;
}
function isSameRouteRecord(a2, b) {
  return (a2.aliasOf || a2) === (b.aliasOf || b);
}
function isSameRouteLocationParams(a2, b) {
  if (Object.keys(a2).length !== Object.keys(b).length)
    return false;
  for (const key in a2) {
    if (!isSameRouteLocationParamsValue(a2[key], b[key]))
      return false;
  }
  return true;
}
function isSameRouteLocationParamsValue(a2, b) {
  return isArray$1(a2) ? isEquivalentArray(a2, b) : isArray$1(b) ? isEquivalentArray(b, a2) : a2 === b;
}
function isEquivalentArray(a2, b) {
  return isArray$1(b) ? a2.length === b.length && a2.every((value, i3) => value === b[i3]) : a2.length === 1 && a2[0] === b;
}
function resolveRelativePath(to2, from2) {
  if (to2.startsWith("/"))
    return to2;
  if (!to2)
    return from2;
  const fromSegments = from2.split("/");
  const toSegments = to2.split("/");
  let position = fromSegments.length - 1;
  let toPosition;
  let segment;
  for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
    segment = toSegments[toPosition];
    if (segment === ".")
      continue;
    if (segment === "..") {
      if (position > 1)
        position--;
    } else
      break;
  }
  return fromSegments.slice(0, position).join("/") + "/" + toSegments.slice(toPosition - (toPosition === toSegments.length ? 1 : 0)).join("/");
}
var NavigationType;
(function(NavigationType2) {
  NavigationType2["pop"] = "pop";
  NavigationType2["push"] = "push";
})(NavigationType || (NavigationType = {}));
var NavigationDirection;
(function(NavigationDirection2) {
  NavigationDirection2["back"] = "back";
  NavigationDirection2["forward"] = "forward";
  NavigationDirection2["unknown"] = "";
})(NavigationDirection || (NavigationDirection = {}));
function normalizeBase(base) {
  if (!base) {
    if (isBrowser) {
      const baseEl = document.querySelector("base");
      base = baseEl && baseEl.getAttribute("href") || "/";
      base = base.replace(/^\w+:\/\/[^\/]+/, "");
    } else {
      base = "/";
    }
  }
  if (base[0] !== "/" && base[0] !== "#")
    base = "/" + base;
  return removeTrailingSlash(base);
}
const BEFORE_HASH_RE = /^[^#]+#/;
function createHref(base, location2) {
  return base.replace(BEFORE_HASH_RE, "#") + location2;
}
function getElementPosition(el, offset2) {
  const docRect = document.documentElement.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  return {
    behavior: offset2.behavior,
    left: elRect.left - docRect.left - (offset2.left || 0),
    top: elRect.top - docRect.top - (offset2.top || 0)
  };
}
const computeScrollPosition = () => ({
  left: window.pageXOffset,
  top: window.pageYOffset
});
function scrollToPosition(position) {
  let scrollToOptions;
  if ("el" in position) {
    const positionEl = position.el;
    const isIdSelector = typeof positionEl === "string" && positionEl.startsWith("#");
    const el = typeof positionEl === "string" ? isIdSelector ? document.getElementById(positionEl.slice(1)) : document.querySelector(positionEl) : positionEl;
    if (!el) {
      return;
    }
    scrollToOptions = getElementPosition(el, position);
  } else {
    scrollToOptions = position;
  }
  if ("scrollBehavior" in document.documentElement.style)
    window.scrollTo(scrollToOptions);
  else {
    window.scrollTo(scrollToOptions.left != null ? scrollToOptions.left : window.pageXOffset, scrollToOptions.top != null ? scrollToOptions.top : window.pageYOffset);
  }
}
function getScrollKey(path, delta) {
  const position = history.state ? history.state.position - delta : -1;
  return position + path;
}
const scrollPositions = /* @__PURE__ */ new Map();
function saveScrollPosition(key, scrollPosition) {
  scrollPositions.set(key, scrollPosition);
}
function getSavedScrollPosition(key) {
  const scroll = scrollPositions.get(key);
  scrollPositions.delete(key);
  return scroll;
}
let createBaseLocation = () => location.protocol + "//" + location.host;
function createCurrentLocation(base, location2) {
  const { pathname, search, hash } = location2;
  const hashPos = base.indexOf("#");
  if (hashPos > -1) {
    let slicePos = hash.includes(base.slice(hashPos)) ? base.slice(hashPos).length : 1;
    let pathFromHash = hash.slice(slicePos);
    if (pathFromHash[0] !== "/")
      pathFromHash = "/" + pathFromHash;
    return stripBase(pathFromHash, "");
  }
  const path = stripBase(pathname, base);
  return path + search + hash;
}
function useHistoryListeners(base, historyState, currentLocation, replace) {
  let listeners = [];
  let teardowns = [];
  let pauseState = null;
  const popStateHandler = ({ state }) => {
    const to2 = createCurrentLocation(base, location);
    const from2 = currentLocation.value;
    const fromState = historyState.value;
    let delta = 0;
    if (state) {
      currentLocation.value = to2;
      historyState.value = state;
      if (pauseState && pauseState === from2) {
        pauseState = null;
        return;
      }
      delta = fromState ? state.position - fromState.position : 0;
    } else {
      replace(to2);
    }
    listeners.forEach((listener) => {
      listener(currentLocation.value, from2, {
        delta,
        type: NavigationType.pop,
        direction: delta ? delta > 0 ? NavigationDirection.forward : NavigationDirection.back : NavigationDirection.unknown
      });
    });
  };
  function pauseListeners() {
    pauseState = currentLocation.value;
  }
  function listen(callback) {
    listeners.push(callback);
    const teardown = () => {
      const index2 = listeners.indexOf(callback);
      if (index2 > -1)
        listeners.splice(index2, 1);
    };
    teardowns.push(teardown);
    return teardown;
  }
  function beforeUnloadListener() {
    const { history: history2 } = window;
    if (!history2.state)
      return;
    history2.replaceState(assign({}, history2.state, { scroll: computeScrollPosition() }), "");
  }
  function destroy() {
    for (const teardown of teardowns)
      teardown();
    teardowns = [];
    window.removeEventListener("popstate", popStateHandler);
    window.removeEventListener("beforeunload", beforeUnloadListener);
  }
  window.addEventListener("popstate", popStateHandler);
  window.addEventListener("beforeunload", beforeUnloadListener);
  return {
    pauseListeners,
    listen,
    destroy
  };
}
function buildState(back, current, forward, replaced = false, computeScroll = false) {
  return {
    back,
    current,
    forward,
    replaced,
    position: window.history.length,
    scroll: computeScroll ? computeScrollPosition() : null
  };
}
function useHistoryStateNavigation(base) {
  const { history: history2, location: location2 } = window;
  const currentLocation = {
    value: createCurrentLocation(base, location2)
  };
  const historyState = { value: history2.state };
  if (!historyState.value) {
    changeLocation(currentLocation.value, {
      back: null,
      current: currentLocation.value,
      forward: null,
      // the length is off by one, we need to decrease it
      position: history2.length - 1,
      replaced: true,
      // don't add a scroll as the user may have an anchor, and we want
      // scrollBehavior to be triggered without a saved position
      scroll: null
    }, true);
  }
  function changeLocation(to2, state, replace2) {
    const hashIndex = base.indexOf("#");
    const url = hashIndex > -1 ? (location2.host && document.querySelector("base") ? base : base.slice(hashIndex)) + to2 : createBaseLocation() + base + to2;
    try {
      history2[replace2 ? "replaceState" : "pushState"](state, "", url);
      historyState.value = state;
    } catch (err) {
      {
        console.error(err);
      }
      location2[replace2 ? "replace" : "assign"](url);
    }
  }
  function replace(to2, data) {
    const state = assign({}, history2.state, buildState(
      historyState.value.back,
      // keep back and forward entries but override current position
      to2,
      historyState.value.forward,
      true
    ), data, { position: historyState.value.position });
    changeLocation(to2, state, true);
    currentLocation.value = to2;
  }
  function push(to2, data) {
    const currentState = assign(
      {},
      // use current history state to gracefully handle a wrong call to
      // history.replaceState
      // https://github.com/vuejs/router/issues/366
      historyState.value,
      history2.state,
      {
        forward: to2,
        scroll: computeScrollPosition()
      }
    );
    changeLocation(currentState.current, currentState, true);
    const state = assign({}, buildState(currentLocation.value, to2, null), { position: currentState.position + 1 }, data);
    changeLocation(to2, state, false);
    currentLocation.value = to2;
  }
  return {
    location: currentLocation,
    state: historyState,
    push,
    replace
  };
}
function createWebHistory(base) {
  base = normalizeBase(base);
  const historyNavigation = useHistoryStateNavigation(base);
  const historyListeners = useHistoryListeners(base, historyNavigation.state, historyNavigation.location, historyNavigation.replace);
  function go(delta, triggerListeners = true) {
    if (!triggerListeners)
      historyListeners.pauseListeners();
    history.go(delta);
  }
  const routerHistory = assign({
    // it's overridden right after
    location: "",
    base,
    go,
    createHref: createHref.bind(null, base)
  }, historyNavigation, historyListeners);
  Object.defineProperty(routerHistory, "location", {
    enumerable: true,
    get: () => historyNavigation.location.value
  });
  Object.defineProperty(routerHistory, "state", {
    enumerable: true,
    get: () => historyNavigation.state.value
  });
  return routerHistory;
}
function createWebHashHistory(base) {
  base = location.host ? base || location.pathname + location.search : "";
  if (!base.includes("#"))
    base += "#";
  return createWebHistory(base);
}
function isRouteLocation(route) {
  return typeof route === "string" || route && typeof route === "object";
}
function isRouteName(name) {
  return typeof name === "string" || typeof name === "symbol";
}
const START_LOCATION_NORMALIZED = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
};
const NavigationFailureSymbol = Symbol("");
var NavigationFailureType;
(function(NavigationFailureType2) {
  NavigationFailureType2[NavigationFailureType2["aborted"] = 4] = "aborted";
  NavigationFailureType2[NavigationFailureType2["cancelled"] = 8] = "cancelled";
  NavigationFailureType2[NavigationFailureType2["duplicated"] = 16] = "duplicated";
})(NavigationFailureType || (NavigationFailureType = {}));
function createRouterError(type, params) {
  {
    return assign(new Error(), {
      type,
      [NavigationFailureSymbol]: true
    }, params);
  }
}
function isNavigationFailure(error, type) {
  return error instanceof Error && NavigationFailureSymbol in error && (type == null || !!(error.type & type));
}
const BASE_PARAM_PATTERN = "[^/]+?";
const BASE_PATH_PARSER_OPTIONS = {
  sensitive: false,
  strict: false,
  start: true,
  end: true
};
const REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
function tokensToParser(segments, extraOptions) {
  const options = assign({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
  const score = [];
  let pattern = options.start ? "^" : "";
  const keys2 = [];
  for (const segment of segments) {
    const segmentScores = segment.length ? [] : [
      90
      /* PathScore.Root */
    ];
    if (options.strict && !segment.length)
      pattern += "/";
    for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
      const token2 = segment[tokenIndex];
      let subSegmentScore = 40 + (options.sensitive ? 0.25 : 0);
      if (token2.type === 0) {
        if (!tokenIndex)
          pattern += "/";
        pattern += token2.value.replace(REGEX_CHARS_RE, "\\$&");
        subSegmentScore += 40;
      } else if (token2.type === 1) {
        const { value, repeatable, optional, regexp } = token2;
        keys2.push({
          name: value,
          repeatable,
          optional
        });
        const re2 = regexp ? regexp : BASE_PARAM_PATTERN;
        if (re2 !== BASE_PARAM_PATTERN) {
          subSegmentScore += 10;
          try {
            new RegExp(`(${re2})`);
          } catch (err) {
            throw new Error(`Invalid custom RegExp for param "${value}" (${re2}): ` + err.message);
          }
        }
        let subPattern = repeatable ? `((?:${re2})(?:/(?:${re2}))*)` : `(${re2})`;
        if (!tokenIndex)
          subPattern = // avoid an optional / if there are more segments e.g. /:p?-static
          // or /:p?-:p2
          optional && segment.length < 2 ? `(?:/${subPattern})` : "/" + subPattern;
        if (optional)
          subPattern += "?";
        pattern += subPattern;
        subSegmentScore += 20;
        if (optional)
          subSegmentScore += -8;
        if (repeatable)
          subSegmentScore += -20;
        if (re2 === ".*")
          subSegmentScore += -50;
      }
      segmentScores.push(subSegmentScore);
    }
    score.push(segmentScores);
  }
  if (options.strict && options.end) {
    const i3 = score.length - 1;
    score[i3][score[i3].length - 1] += 0.7000000000000001;
  }
  if (!options.strict)
    pattern += "/?";
  if (options.end)
    pattern += "$";
  else if (options.strict)
    pattern += "(?:/|$)";
  const re = new RegExp(pattern, options.sensitive ? "" : "i");
  function parse(path) {
    const match = path.match(re);
    const params = {};
    if (!match)
      return null;
    for (let i3 = 1; i3 < match.length; i3++) {
      const value = match[i3] || "";
      const key = keys2[i3 - 1];
      params[key.name] = value && key.repeatable ? value.split("/") : value;
    }
    return params;
  }
  function stringify(params) {
    let path = "";
    let avoidDuplicatedSlash = false;
    for (const segment of segments) {
      if (!avoidDuplicatedSlash || !path.endsWith("/"))
        path += "/";
      avoidDuplicatedSlash = false;
      for (const token2 of segment) {
        if (token2.type === 0) {
          path += token2.value;
        } else if (token2.type === 1) {
          const { value, repeatable, optional } = token2;
          const param = value in params ? params[value] : "";
          if (isArray$1(param) && !repeatable) {
            throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
          }
          const text = isArray$1(param) ? param.join("/") : param;
          if (!text) {
            if (optional) {
              if (segment.length < 2) {
                if (path.endsWith("/"))
                  path = path.slice(0, -1);
                else
                  avoidDuplicatedSlash = true;
              }
            } else
              throw new Error(`Missing required param "${value}"`);
          }
          path += text;
        }
      }
    }
    return path || "/";
  }
  return {
    re,
    score,
    keys: keys2,
    parse,
    stringify
  };
}
function compareScoreArray(a2, b) {
  let i3 = 0;
  while (i3 < a2.length && i3 < b.length) {
    const diff2 = b[i3] - a2[i3];
    if (diff2)
      return diff2;
    i3++;
  }
  if (a2.length < b.length) {
    return a2.length === 1 && a2[0] === 40 + 40 ? -1 : 1;
  } else if (a2.length > b.length) {
    return b.length === 1 && b[0] === 40 + 40 ? 1 : -1;
  }
  return 0;
}
function comparePathParserScore(a2, b) {
  let i3 = 0;
  const aScore = a2.score;
  const bScore = b.score;
  while (i3 < aScore.length && i3 < bScore.length) {
    const comp = compareScoreArray(aScore[i3], bScore[i3]);
    if (comp)
      return comp;
    i3++;
  }
  if (Math.abs(bScore.length - aScore.length) === 1) {
    if (isLastScoreNegative(aScore))
      return 1;
    if (isLastScoreNegative(bScore))
      return -1;
  }
  return bScore.length - aScore.length;
}
function isLastScoreNegative(score) {
  const last = score[score.length - 1];
  return score.length > 0 && last[last.length - 1] < 0;
}
const ROOT_TOKEN = {
  type: 0,
  value: ""
};
const VALID_PARAM_RE = /[a-zA-Z0-9_]/;
function tokenizePath(path) {
  if (!path)
    return [[]];
  if (path === "/")
    return [[ROOT_TOKEN]];
  if (!path.startsWith("/")) {
    throw new Error(`Invalid path "${path}"`);
  }
  function crash(message) {
    throw new Error(`ERR (${state})/"${buffer}": ${message}`);
  }
  let state = 0;
  let previousState = state;
  const tokens2 = [];
  let segment;
  function finalizeSegment() {
    if (segment)
      tokens2.push(segment);
    segment = [];
  }
  let i3 = 0;
  let char;
  let buffer = "";
  let customRe = "";
  function consumeBuffer() {
    if (!buffer)
      return;
    if (state === 0) {
      segment.push({
        type: 0,
        value: buffer
      });
    } else if (state === 1 || state === 2 || state === 3) {
      if (segment.length > 1 && (char === "*" || char === "+"))
        crash(`A repeatable param (${buffer}) must be alone in its segment. eg: '/:ids+.`);
      segment.push({
        type: 1,
        value: buffer,
        regexp: customRe,
        repeatable: char === "*" || char === "+",
        optional: char === "*" || char === "?"
      });
    } else {
      crash("Invalid state to consume buffer");
    }
    buffer = "";
  }
  function addCharToBuffer() {
    buffer += char;
  }
  while (i3 < path.length) {
    char = path[i3++];
    if (char === "\\" && state !== 2) {
      previousState = state;
      state = 4;
      continue;
    }
    switch (state) {
      case 0:
        if (char === "/") {
          if (buffer) {
            consumeBuffer();
          }
          finalizeSegment();
        } else if (char === ":") {
          consumeBuffer();
          state = 1;
        } else {
          addCharToBuffer();
        }
        break;
      case 4:
        addCharToBuffer();
        state = previousState;
        break;
      case 1:
        if (char === "(") {
          state = 2;
        } else if (VALID_PARAM_RE.test(char)) {
          addCharToBuffer();
        } else {
          consumeBuffer();
          state = 0;
          if (char !== "*" && char !== "?" && char !== "+")
            i3--;
        }
        break;
      case 2:
        if (char === ")") {
          if (customRe[customRe.length - 1] == "\\")
            customRe = customRe.slice(0, -1) + char;
          else
            state = 3;
        } else {
          customRe += char;
        }
        break;
      case 3:
        consumeBuffer();
        state = 0;
        if (char !== "*" && char !== "?" && char !== "+")
          i3--;
        customRe = "";
        break;
      default:
        crash("Unknown state");
        break;
    }
  }
  if (state === 2)
    crash(`Unfinished custom RegExp for param "${buffer}"`);
  consumeBuffer();
  finalizeSegment();
  return tokens2;
}
function createRouteRecordMatcher(record, parent, options) {
  const parser = tokensToParser(tokenizePath(record.path), options);
  const matcher = assign(parser, {
    record,
    parent,
    // these needs to be populated by the parent
    children: [],
    alias: []
  });
  if (parent) {
    if (!matcher.record.aliasOf === !parent.record.aliasOf)
      parent.children.push(matcher);
  }
  return matcher;
}
function createRouterMatcher(routes2, globalOptions) {
  const matchers = [];
  const matcherMap = /* @__PURE__ */ new Map();
  globalOptions = mergeOptions({ strict: false, end: true, sensitive: false }, globalOptions);
  function getRecordMatcher(name) {
    return matcherMap.get(name);
  }
  function addRoute(record, parent, originalRecord) {
    const isRootAdd = !originalRecord;
    const mainNormalizedRecord = normalizeRouteRecord(record);
    mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
    const options = mergeOptions(globalOptions, record);
    const normalizedRecords = [
      mainNormalizedRecord
    ];
    if ("alias" in record) {
      const aliases2 = typeof record.alias === "string" ? [record.alias] : record.alias;
      for (const alias of aliases2) {
        normalizedRecords.push(assign({}, mainNormalizedRecord, {
          // this allows us to hold a copy of the `components` option
          // so that async components cache is hold on the original record
          components: originalRecord ? originalRecord.record.components : mainNormalizedRecord.components,
          path: alias,
          // we might be the child of an alias
          aliasOf: originalRecord ? originalRecord.record : mainNormalizedRecord
          // the aliases are always of the same kind as the original since they
          // are defined on the same record
        }));
      }
    }
    let matcher;
    let originalMatcher;
    for (const normalizedRecord of normalizedRecords) {
      const { path } = normalizedRecord;
      if (parent && path[0] !== "/") {
        const parentPath = parent.record.path;
        const connectingSlash = parentPath[parentPath.length - 1] === "/" ? "" : "/";
        normalizedRecord.path = parent.record.path + (path && connectingSlash + path);
      }
      matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
      if (originalRecord) {
        originalRecord.alias.push(matcher);
      } else {
        originalMatcher = originalMatcher || matcher;
        if (originalMatcher !== matcher)
          originalMatcher.alias.push(matcher);
        if (isRootAdd && record.name && !isAliasRecord(matcher))
          removeRoute(record.name);
      }
      if (mainNormalizedRecord.children) {
        const children = mainNormalizedRecord.children;
        for (let i3 = 0; i3 < children.length; i3++) {
          addRoute(children[i3], matcher, originalRecord && originalRecord.children[i3]);
        }
      }
      originalRecord = originalRecord || matcher;
      if (matcher.record.components && Object.keys(matcher.record.components).length || matcher.record.name || matcher.record.redirect) {
        insertMatcher(matcher);
      }
    }
    return originalMatcher ? () => {
      removeRoute(originalMatcher);
    } : noop;
  }
  function removeRoute(matcherRef) {
    if (isRouteName(matcherRef)) {
      const matcher = matcherMap.get(matcherRef);
      if (matcher) {
        matcherMap.delete(matcherRef);
        matchers.splice(matchers.indexOf(matcher), 1);
        matcher.children.forEach(removeRoute);
        matcher.alias.forEach(removeRoute);
      }
    } else {
      const index2 = matchers.indexOf(matcherRef);
      if (index2 > -1) {
        matchers.splice(index2, 1);
        if (matcherRef.record.name)
          matcherMap.delete(matcherRef.record.name);
        matcherRef.children.forEach(removeRoute);
        matcherRef.alias.forEach(removeRoute);
      }
    }
  }
  function getRoutes() {
    return matchers;
  }
  function insertMatcher(matcher) {
    let i3 = 0;
    while (i3 < matchers.length && comparePathParserScore(matcher, matchers[i3]) >= 0 && // Adding children with empty path should still appear before the parent
    // https://github.com/vuejs/router/issues/1124
    (matcher.record.path !== matchers[i3].record.path || !isRecordChildOf(matcher, matchers[i3])))
      i3++;
    matchers.splice(i3, 0, matcher);
    if (matcher.record.name && !isAliasRecord(matcher))
      matcherMap.set(matcher.record.name, matcher);
  }
  function resolve2(location2, currentLocation) {
    let matcher;
    let params = {};
    let path;
    let name;
    if ("name" in location2 && location2.name) {
      matcher = matcherMap.get(location2.name);
      if (!matcher)
        throw createRouterError(1, {
          location: location2
        });
      name = matcher.record.name;
      params = assign(
        // paramsFromLocation is a new object
        paramsFromLocation(
          currentLocation.params,
          // only keep params that exist in the resolved location
          // TODO: only keep optional params coming from a parent record
          matcher.keys.filter((k2) => !k2.optional).map((k2) => k2.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        location2.params && paramsFromLocation(location2.params, matcher.keys.map((k2) => k2.name))
      );
      path = matcher.stringify(params);
    } else if ("path" in location2) {
      path = location2.path;
      matcher = matchers.find((m2) => m2.re.test(path));
      if (matcher) {
        params = matcher.parse(path);
        name = matcher.record.name;
      }
    } else {
      matcher = currentLocation.name ? matcherMap.get(currentLocation.name) : matchers.find((m2) => m2.re.test(currentLocation.path));
      if (!matcher)
        throw createRouterError(1, {
          location: location2,
          currentLocation
        });
      name = matcher.record.name;
      params = assign({}, currentLocation.params, location2.params);
      path = matcher.stringify(params);
    }
    const matched = [];
    let parentMatcher = matcher;
    while (parentMatcher) {
      matched.unshift(parentMatcher.record);
      parentMatcher = parentMatcher.parent;
    }
    return {
      name,
      path,
      params,
      matched,
      meta: mergeMetaFields(matched)
    };
  }
  routes2.forEach((route) => addRoute(route));
  return { addRoute, resolve: resolve2, removeRoute, getRoutes, getRecordMatcher };
}
function paramsFromLocation(params, keys2) {
  const newParams = {};
  for (const key of keys2) {
    if (key in params)
      newParams[key] = params[key];
  }
  return newParams;
}
function normalizeRouteRecord(record) {
  return {
    path: record.path,
    redirect: record.redirect,
    name: record.name,
    meta: record.meta || {},
    aliasOf: void 0,
    beforeEnter: record.beforeEnter,
    props: normalizeRecordProps(record),
    children: record.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in record ? record.components || null : record.component && { default: record.component }
  };
}
function normalizeRecordProps(record) {
  const propsObject = {};
  const props = record.props || false;
  if ("component" in record) {
    propsObject.default = props;
  } else {
    for (const name in record.components)
      propsObject[name] = typeof props === "boolean" ? props : props[name];
  }
  return propsObject;
}
function isAliasRecord(record) {
  while (record) {
    if (record.record.aliasOf)
      return true;
    record = record.parent;
  }
  return false;
}
function mergeMetaFields(matched) {
  return matched.reduce((meta, record) => assign(meta, record.meta), {});
}
function mergeOptions(defaults2, partialOptions) {
  const options = {};
  for (const key in defaults2) {
    options[key] = key in partialOptions ? partialOptions[key] : defaults2[key];
  }
  return options;
}
function isRecordChildOf(record, parent) {
  return parent.children.some((child) => child === record || isRecordChildOf(record, child));
}
const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_BRACKET_OPEN_RE = /%5B/g;
const ENC_BRACKET_CLOSE_RE = /%5D/g;
const ENC_CARET_RE = /%5E/g;
const ENC_BACKTICK_RE = /%60/g;
const ENC_CURLY_OPEN_RE = /%7B/g;
const ENC_PIPE_RE = /%7C/g;
const ENC_CURLY_CLOSE_RE = /%7D/g;
const ENC_SPACE_RE = /%20/g;
function commonEncode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]");
}
function encodeHash(text) {
  return commonEncode(text).replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryValue(text) {
  return commonEncode(text).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
  return commonEncode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F");
}
function encodeParam(text) {
  return text == null ? "" : encodePath(text).replace(SLASH_RE, "%2F");
}
function decode(text) {
  try {
    return decodeURIComponent("" + text);
  } catch (err) {
  }
  return "" + text;
}
function parseQuery(search) {
  const query = {};
  if (search === "" || search === "?")
    return query;
  const hasLeadingIM = search[0] === "?";
  const searchParams = (hasLeadingIM ? search.slice(1) : search).split("&");
  for (let i3 = 0; i3 < searchParams.length; ++i3) {
    const searchParam = searchParams[i3].replace(PLUS_RE, " ");
    const eqPos = searchParam.indexOf("=");
    const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
    const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
    if (key in query) {
      let currentValue = query[key];
      if (!isArray$1(currentValue)) {
        currentValue = query[key] = [currentValue];
      }
      currentValue.push(value);
    } else {
      query[key] = value;
    }
  }
  return query;
}
function stringifyQuery(query) {
  let search = "";
  for (let key in query) {
    const value = query[key];
    key = encodeQueryKey(key);
    if (value == null) {
      if (value !== void 0) {
        search += (search.length ? "&" : "") + key;
      }
      continue;
    }
    const values = isArray$1(value) ? value.map((v2) => v2 && encodeQueryValue(v2)) : [value && encodeQueryValue(value)];
    values.forEach((value2) => {
      if (value2 !== void 0) {
        search += (search.length ? "&" : "") + key;
        if (value2 != null)
          search += "=" + value2;
      }
    });
  }
  return search;
}
function normalizeQuery(query) {
  const normalizedQuery = {};
  for (const key in query) {
    const value = query[key];
    if (value !== void 0) {
      normalizedQuery[key] = isArray$1(value) ? value.map((v2) => v2 == null ? null : "" + v2) : value == null ? value : "" + value;
    }
  }
  return normalizedQuery;
}
const matchedRouteKey = Symbol("");
const viewDepthKey = Symbol("");
const routerKey = Symbol("");
const routeLocationKey = Symbol("");
const routerViewLocationKey = Symbol("");
function useCallbacks() {
  let handlers = [];
  function add2(handler) {
    handlers.push(handler);
    return () => {
      const i3 = handlers.indexOf(handler);
      if (i3 > -1)
        handlers.splice(i3, 1);
    };
  }
  function reset() {
    handlers = [];
  }
  return {
    add: add2,
    list: () => handlers,
    reset
  };
}
function guardToPromiseFn(guard, to2, from2, record, name) {
  const enterCallbackArray = record && // name is defined if record is because of the function overload
  (record.enterCallbacks[name] = record.enterCallbacks[name] || []);
  return () => new Promise((resolve2, reject) => {
    const next = (valid) => {
      if (valid === false) {
        reject(createRouterError(4, {
          from: from2,
          to: to2
        }));
      } else if (valid instanceof Error) {
        reject(valid);
      } else if (isRouteLocation(valid)) {
        reject(createRouterError(2, {
          from: to2,
          to: valid
        }));
      } else {
        if (enterCallbackArray && // since enterCallbackArray is truthy, both record and name also are
        record.enterCallbacks[name] === enterCallbackArray && typeof valid === "function") {
          enterCallbackArray.push(valid);
        }
        resolve2();
      }
    };
    const guardReturn = guard.call(record && record.instances[name], to2, from2, next);
    let guardCall = Promise.resolve(guardReturn);
    if (guard.length < 3)
      guardCall = guardCall.then(next);
    guardCall.catch((err) => reject(err));
  });
}
function extractComponentsGuards(matched, guardType, to2, from2) {
  const guards = [];
  for (const record of matched) {
    for (const name in record.components) {
      let rawComponent = record.components[name];
      if (guardType !== "beforeRouteEnter" && !record.instances[name])
        continue;
      if (isRouteComponent(rawComponent)) {
        const options = rawComponent.__vccOpts || rawComponent;
        const guard = options[guardType];
        guard && guards.push(guardToPromiseFn(guard, to2, from2, record, name));
      } else {
        let componentPromise = rawComponent();
        guards.push(() => componentPromise.then((resolved) => {
          if (!resolved)
            return Promise.reject(new Error(`Couldn't resolve component "${name}" at "${record.path}"`));
          const resolvedComponent = isESModule(resolved) ? resolved.default : resolved;
          record.components[name] = resolvedComponent;
          const options = resolvedComponent.__vccOpts || resolvedComponent;
          const guard = options[guardType];
          return guard && guardToPromiseFn(guard, to2, from2, record, name)();
        }));
      }
    }
  }
  return guards;
}
function isRouteComponent(component) {
  return typeof component === "object" || "displayName" in component || "props" in component || "__vccOpts" in component;
}
function useLink(props) {
  const router = inject(routerKey);
  const currentRoute = inject(routeLocationKey);
  const route = computed(() => router.resolve(unref(props.to)));
  const activeRecordIndex = computed(() => {
    const { matched } = route.value;
    const { length } = matched;
    const routeMatched = matched[length - 1];
    const currentMatched = currentRoute.matched;
    if (!routeMatched || !currentMatched.length)
      return -1;
    const index2 = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
    if (index2 > -1)
      return index2;
    const parentRecordPath = getOriginalPath(matched[length - 2]);
    return (
      // we are dealing with nested routes
      length > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      getOriginalPath(routeMatched) === parentRecordPath && // avoid comparing the child with its parent
      currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index2
    );
  });
  const isActive = computed(() => activeRecordIndex.value > -1 && includesParams(currentRoute.params, route.value.params));
  const isExactActive = computed(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.value.params));
  function navigate(e2 = {}) {
    if (guardEvent(e2)) {
      return router[unref(props.replace) ? "replace" : "push"](
        unref(props.to)
        // avoid uncaught errors are they are logged anyway
      ).catch(noop);
    }
    return Promise.resolve();
  }
  return {
    route,
    href: computed(() => route.value.href),
    isActive,
    isExactActive,
    navigate
  };
}
const RouterLinkImpl = /* @__PURE__ */ defineComponent({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: true
    },
    replace: Boolean,
    activeClass: String,
    // inactiveClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    }
  },
  useLink,
  setup(props, { slots }) {
    const link = reactive(useLink(props));
    const { options } = inject(routerKey);
    const elClass = computed(() => ({
      [getLinkClass(props.activeClass, options.linkActiveClass, "router-link-active")]: link.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [getLinkClass(props.exactActiveClass, options.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive
    }));
    return () => {
      const children = slots.default && slots.default(link);
      return props.custom ? children : h$2("a", {
        "aria-current": link.isExactActive ? props.ariaCurrentValue : null,
        href: link.href,
        // this would override user added attrs but Vue will still add
        // the listener, so we end up triggering both
        onClick: link.navigate,
        class: elClass.value
      }, children);
    };
  }
});
const RouterLink = RouterLinkImpl;
function guardEvent(e2) {
  if (e2.metaKey || e2.altKey || e2.ctrlKey || e2.shiftKey)
    return;
  if (e2.defaultPrevented)
    return;
  if (e2.button !== void 0 && e2.button !== 0)
    return;
  if (e2.currentTarget && e2.currentTarget.getAttribute) {
    const target = e2.currentTarget.getAttribute("target");
    if (/\b_blank\b/i.test(target))
      return;
  }
  if (e2.preventDefault)
    e2.preventDefault();
  return true;
}
function includesParams(outer, inner) {
  for (const key in inner) {
    const innerValue = inner[key];
    const outerValue = outer[key];
    if (typeof innerValue === "string") {
      if (innerValue !== outerValue)
        return false;
    } else {
      if (!isArray$1(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i3) => value !== outerValue[i3]))
        return false;
    }
  }
  return true;
}
function getOriginalPath(record) {
  return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
const getLinkClass = (propClass, globalClass, defaultClass) => propClass != null ? propClass : globalClass != null ? globalClass : defaultClass;
const RouterViewImpl = /* @__PURE__ */ defineComponent({
  name: "RouterView",
  // #674 we manually inherit them
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  // Better compat for @vue/compat users
  // https://github.com/vuejs/router/issues/1315
  compatConfig: { MODE: 3 },
  setup(props, { attrs, slots }) {
    const injectedRoute = inject(routerViewLocationKey);
    const routeToDisplay = computed(() => props.route || injectedRoute.value);
    const injectedDepth = inject(viewDepthKey, 0);
    const depth = computed(() => {
      let initialDepth = unref(injectedDepth);
      const { matched } = routeToDisplay.value;
      let matchedRoute;
      while ((matchedRoute = matched[initialDepth]) && !matchedRoute.components) {
        initialDepth++;
      }
      return initialDepth;
    });
    const matchedRouteRef = computed(() => routeToDisplay.value.matched[depth.value]);
    provide(viewDepthKey, computed(() => depth.value + 1));
    provide(matchedRouteKey, matchedRouteRef);
    provide(routerViewLocationKey, routeToDisplay);
    const viewRef = ref();
    watch(() => [viewRef.value, matchedRouteRef.value, props.name], ([instance, to2, name], [oldInstance, from2, oldName]) => {
      if (to2) {
        to2.instances[name] = instance;
        if (from2 && from2 !== to2 && instance && instance === oldInstance) {
          if (!to2.leaveGuards.size) {
            to2.leaveGuards = from2.leaveGuards;
          }
          if (!to2.updateGuards.size) {
            to2.updateGuards = from2.updateGuards;
          }
        }
      }
      if (instance && to2 && // if there is no instance but to and from are the same this might be
      // the first visit
      (!from2 || !isSameRouteRecord(to2, from2) || !oldInstance)) {
        (to2.enterCallbacks[name] || []).forEach((callback) => callback(instance));
      }
    }, { flush: "post" });
    return () => {
      const route = routeToDisplay.value;
      const currentName = props.name;
      const matchedRoute = matchedRouteRef.value;
      const ViewComponent = matchedRoute && matchedRoute.components[currentName];
      if (!ViewComponent) {
        return normalizeSlot(slots.default, { Component: ViewComponent, route });
      }
      const routePropsOption = matchedRoute.props[currentName];
      const routeProps = routePropsOption ? routePropsOption === true ? route.params : typeof routePropsOption === "function" ? routePropsOption(route) : routePropsOption : null;
      const onVnodeUnmounted = (vnode) => {
        if (vnode.component.isUnmounted) {
          matchedRoute.instances[currentName] = null;
        }
      };
      const component = h$2(ViewComponent, assign({}, routeProps, attrs, {
        onVnodeUnmounted,
        ref: viewRef
      }));
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        normalizeSlot(slots.default, { Component: component, route }) || component
      );
    };
  }
});
function normalizeSlot(slot, data) {
  if (!slot)
    return null;
  const slotContent = slot(data);
  return slotContent.length === 1 ? slotContent[0] : slotContent;
}
const RouterView = RouterViewImpl;
function createRouter(options) {
  const matcher = createRouterMatcher(options.routes, options);
  const parseQuery$1 = options.parseQuery || parseQuery;
  const stringifyQuery$1 = options.stringifyQuery || stringifyQuery;
  const routerHistory = options.history;
  const beforeGuards = useCallbacks();
  const beforeResolveGuards = useCallbacks();
  const afterGuards = useCallbacks();
  const currentRoute = shallowRef(START_LOCATION_NORMALIZED);
  let pendingLocation = START_LOCATION_NORMALIZED;
  if (isBrowser && options.scrollBehavior && "scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  const normalizeParams = applyToParams.bind(null, (paramValue) => "" + paramValue);
  const encodeParams = applyToParams.bind(null, encodeParam);
  const decodeParams = (
    // @ts-expect-error: intentionally avoid the type check
    applyToParams.bind(null, decode)
  );
  function addRoute(parentOrRoute, route) {
    let parent;
    let record;
    if (isRouteName(parentOrRoute)) {
      parent = matcher.getRecordMatcher(parentOrRoute);
      record = route;
    } else {
      record = parentOrRoute;
    }
    return matcher.addRoute(record, parent);
  }
  function removeRoute(name) {
    const recordMatcher = matcher.getRecordMatcher(name);
    if (recordMatcher) {
      matcher.removeRoute(recordMatcher);
    }
  }
  function getRoutes() {
    return matcher.getRoutes().map((routeMatcher) => routeMatcher.record);
  }
  function hasRoute(name) {
    return !!matcher.getRecordMatcher(name);
  }
  function resolve2(rawLocation, currentLocation) {
    currentLocation = assign({}, currentLocation || currentRoute.value);
    if (typeof rawLocation === "string") {
      const locationNormalized = parseURL(parseQuery$1, rawLocation, currentLocation.path);
      const matchedRoute2 = matcher.resolve({ path: locationNormalized.path }, currentLocation);
      const href2 = routerHistory.createHref(locationNormalized.fullPath);
      return assign(locationNormalized, matchedRoute2, {
        params: decodeParams(matchedRoute2.params),
        hash: decode(locationNormalized.hash),
        redirectedFrom: void 0,
        href: href2
      });
    }
    let matcherLocation;
    if ("path" in rawLocation) {
      matcherLocation = assign({}, rawLocation, {
        path: parseURL(parseQuery$1, rawLocation.path, currentLocation.path).path
      });
    } else {
      const targetParams = assign({}, rawLocation.params);
      for (const key in targetParams) {
        if (targetParams[key] == null) {
          delete targetParams[key];
        }
      }
      matcherLocation = assign({}, rawLocation, {
        params: encodeParams(rawLocation.params)
      });
      currentLocation.params = encodeParams(currentLocation.params);
    }
    const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
    const hash = rawLocation.hash || "";
    matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
    const fullPath = stringifyURL(stringifyQuery$1, assign({}, rawLocation, {
      hash: encodeHash(hash),
      path: matchedRoute.path
    }));
    const href = routerHistory.createHref(fullPath);
    return assign({
      fullPath,
      // keep the hash encoded so fullPath is effectively path + encodedQuery +
      // hash
      hash,
      query: (
        // if the user is using a custom query lib like qs, we might have
        // nested objects, so we keep the query as is, meaning it can contain
        // numbers at `$route.query`, but at the point, the user will have to
        // use their own type anyway.
        // https://github.com/vuejs/router/issues/328#issuecomment-649481567
        stringifyQuery$1 === stringifyQuery ? normalizeQuery(rawLocation.query) : rawLocation.query || {}
      )
    }, matchedRoute, {
      redirectedFrom: void 0,
      href
    });
  }
  function locationAsObject(to2) {
    return typeof to2 === "string" ? parseURL(parseQuery$1, to2, currentRoute.value.path) : assign({}, to2);
  }
  function checkCanceledNavigation(to2, from2) {
    if (pendingLocation !== to2) {
      return createRouterError(8, {
        from: from2,
        to: to2
      });
    }
  }
  function push(to2) {
    return pushWithRedirect(to2);
  }
  function replace(to2) {
    return push(assign(locationAsObject(to2), { replace: true }));
  }
  function handleRedirectRecord(to2) {
    const lastMatched = to2.matched[to2.matched.length - 1];
    if (lastMatched && lastMatched.redirect) {
      const { redirect } = lastMatched;
      let newTargetLocation = typeof redirect === "function" ? redirect(to2) : redirect;
      if (typeof newTargetLocation === "string") {
        newTargetLocation = newTargetLocation.includes("?") || newTargetLocation.includes("#") ? newTargetLocation = locationAsObject(newTargetLocation) : (
          // force empty params
          { path: newTargetLocation }
        );
        newTargetLocation.params = {};
      }
      return assign({
        query: to2.query,
        hash: to2.hash,
        // avoid transferring params if the redirect has a path
        params: "path" in newTargetLocation ? {} : to2.params
      }, newTargetLocation);
    }
  }
  function pushWithRedirect(to2, redirectedFrom) {
    const targetLocation = pendingLocation = resolve2(to2);
    const from2 = currentRoute.value;
    const data = to2.state;
    const force = to2.force;
    const replace2 = to2.replace === true;
    const shouldRedirect = handleRedirectRecord(targetLocation);
    if (shouldRedirect)
      return pushWithRedirect(
        assign(locationAsObject(shouldRedirect), {
          state: typeof shouldRedirect === "object" ? assign({}, data, shouldRedirect.state) : data,
          force,
          replace: replace2
        }),
        // keep original redirectedFrom if it exists
        redirectedFrom || targetLocation
      );
    const toLocation = targetLocation;
    toLocation.redirectedFrom = redirectedFrom;
    let failure;
    if (!force && isSameRouteLocation(stringifyQuery$1, from2, targetLocation)) {
      failure = createRouterError(16, { to: toLocation, from: from2 });
      handleScroll(
        from2,
        from2,
        // this is a push, the only way for it to be triggered from a
        // history.listen is with a redirect, which makes it become a push
        true,
        // This cannot be the first navigation because the initial location
        // cannot be manually navigated to
        false
      );
    }
    return (failure ? Promise.resolve(failure) : navigate(toLocation, from2)).catch((error) => isNavigationFailure(error) ? (
      // navigation redirects still mark the router as ready
      isNavigationFailure(
        error,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? error : markAsReady(error)
    ) : (
      // reject any unknown error
      triggerError(error, toLocation, from2)
    )).then((failure2) => {
      if (failure2) {
        if (isNavigationFailure(
          failure2,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        )) {
          return pushWithRedirect(
            // keep options
            assign({
              // preserve an existing replacement but allow the redirect to override it
              replace: replace2
            }, locationAsObject(failure2.to), {
              state: typeof failure2.to === "object" ? assign({}, data, failure2.to.state) : data,
              force
            }),
            // preserve the original redirectedFrom if any
            redirectedFrom || toLocation
          );
        }
      } else {
        failure2 = finalizeNavigation(toLocation, from2, true, replace2, data);
      }
      triggerAfterEach(toLocation, from2, failure2);
      return failure2;
    });
  }
  function checkCanceledNavigationAndReject(to2, from2) {
    const error = checkCanceledNavigation(to2, from2);
    return error ? Promise.reject(error) : Promise.resolve();
  }
  function navigate(to2, from2) {
    let guards;
    const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to2, from2);
    guards = extractComponentsGuards(leavingRecords.reverse(), "beforeRouteLeave", to2, from2);
    for (const record of leavingRecords) {
      record.leaveGuards.forEach((guard) => {
        guards.push(guardToPromiseFn(guard, to2, from2));
      });
    }
    const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to2, from2);
    guards.push(canceledNavigationCheck);
    return runGuardQueue(guards).then(() => {
      guards = [];
      for (const guard of beforeGuards.list()) {
        guards.push(guardToPromiseFn(guard, to2, from2));
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = extractComponentsGuards(updatingRecords, "beforeRouteUpdate", to2, from2);
      for (const record of updatingRecords) {
        record.updateGuards.forEach((guard) => {
          guards.push(guardToPromiseFn(guard, to2, from2));
        });
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const record of to2.matched) {
        if (record.beforeEnter && !from2.matched.includes(record)) {
          if (isArray$1(record.beforeEnter)) {
            for (const beforeEnter of record.beforeEnter)
              guards.push(guardToPromiseFn(beforeEnter, to2, from2));
          } else {
            guards.push(guardToPromiseFn(record.beforeEnter, to2, from2));
          }
        }
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      to2.matched.forEach((record) => record.enterCallbacks = {});
      guards = extractComponentsGuards(enteringRecords, "beforeRouteEnter", to2, from2);
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const guard of beforeResolveGuards.list()) {
        guards.push(guardToPromiseFn(guard, to2, from2));
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).catch((err) => isNavigationFailure(
      err,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? err : Promise.reject(err));
  }
  function triggerAfterEach(to2, from2, failure) {
    for (const guard of afterGuards.list())
      guard(to2, from2, failure);
  }
  function finalizeNavigation(toLocation, from2, isPush, replace2, data) {
    const error = checkCanceledNavigation(toLocation, from2);
    if (error)
      return error;
    const isFirstNavigation = from2 === START_LOCATION_NORMALIZED;
    const state = !isBrowser ? {} : history.state;
    if (isPush) {
      if (replace2 || isFirstNavigation)
        routerHistory.replace(toLocation.fullPath, assign({
          scroll: isFirstNavigation && state && state.scroll
        }, data));
      else
        routerHistory.push(toLocation.fullPath, data);
    }
    currentRoute.value = toLocation;
    handleScroll(toLocation, from2, isPush, isFirstNavigation);
    markAsReady();
  }
  let removeHistoryListener;
  function setupListeners() {
    if (removeHistoryListener)
      return;
    removeHistoryListener = routerHistory.listen((to2, _from, info) => {
      if (!router.listening)
        return;
      const toLocation = resolve2(to2);
      const shouldRedirect = handleRedirectRecord(toLocation);
      if (shouldRedirect) {
        pushWithRedirect(assign(shouldRedirect, { replace: true }), toLocation).catch(noop);
        return;
      }
      pendingLocation = toLocation;
      const from2 = currentRoute.value;
      if (isBrowser) {
        saveScrollPosition(getScrollKey(from2.fullPath, info.delta), computeScrollPosition());
      }
      navigate(toLocation, from2).catch((error) => {
        if (isNavigationFailure(
          error,
          4 | 8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        )) {
          return error;
        }
        if (isNavigationFailure(
          error,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        )) {
          pushWithRedirect(
            error.to,
            toLocation
            // avoid an uncaught rejection, let push call triggerError
          ).then((failure) => {
            if (isNavigationFailure(
              failure,
              4 | 16
              /* ErrorTypes.NAVIGATION_DUPLICATED */
            ) && !info.delta && info.type === NavigationType.pop) {
              routerHistory.go(-1, false);
            }
          }).catch(noop);
          return Promise.reject();
        }
        if (info.delta) {
          routerHistory.go(-info.delta, false);
        }
        return triggerError(error, toLocation, from2);
      }).then((failure) => {
        failure = failure || finalizeNavigation(
          // after navigation, all matched components are resolved
          toLocation,
          from2,
          false
        );
        if (failure) {
          if (info.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
          // entry while a different route is displayed
          !isNavigationFailure(
            failure,
            8
            /* ErrorTypes.NAVIGATION_CANCELLED */
          )) {
            routerHistory.go(-info.delta, false);
          } else if (info.type === NavigationType.pop && isNavigationFailure(
            failure,
            4 | 16
            /* ErrorTypes.NAVIGATION_DUPLICATED */
          )) {
            routerHistory.go(-1, false);
          }
        }
        triggerAfterEach(toLocation, from2, failure);
      }).catch(noop);
    });
  }
  let readyHandlers = useCallbacks();
  let errorHandlers = useCallbacks();
  let ready;
  function triggerError(error, to2, from2) {
    markAsReady(error);
    const list = errorHandlers.list();
    if (list.length) {
      list.forEach((handler) => handler(error, to2, from2));
    } else {
      console.error(error);
    }
    return Promise.reject(error);
  }
  function isReady() {
    if (ready && currentRoute.value !== START_LOCATION_NORMALIZED)
      return Promise.resolve();
    return new Promise((resolve3, reject) => {
      readyHandlers.add([resolve3, reject]);
    });
  }
  function markAsReady(err) {
    if (!ready) {
      ready = !err;
      setupListeners();
      readyHandlers.list().forEach(([resolve3, reject]) => err ? reject(err) : resolve3());
      readyHandlers.reset();
    }
    return err;
  }
  function handleScroll(to2, from2, isPush, isFirstNavigation) {
    const { scrollBehavior } = options;
    if (!isBrowser || !scrollBehavior)
      return Promise.resolve();
    const scrollPosition = !isPush && getSavedScrollPosition(getScrollKey(to2.fullPath, 0)) || (isFirstNavigation || !isPush) && history.state && history.state.scroll || null;
    return nextTick().then(() => scrollBehavior(to2, from2, scrollPosition)).then((position) => position && scrollToPosition(position)).catch((err) => triggerError(err, to2, from2));
  }
  const go = (delta) => routerHistory.go(delta);
  let started;
  const installedApps = /* @__PURE__ */ new Set();
  const router = {
    currentRoute,
    listening: true,
    addRoute,
    removeRoute,
    hasRoute,
    getRoutes,
    resolve: resolve2,
    options,
    push,
    replace,
    go,
    back: () => go(-1),
    forward: () => go(1),
    beforeEach: beforeGuards.add,
    beforeResolve: beforeResolveGuards.add,
    afterEach: afterGuards.add,
    onError: errorHandlers.add,
    isReady,
    install(app2) {
      const router2 = this;
      app2.component("RouterLink", RouterLink);
      app2.component("RouterView", RouterView);
      app2.config.globalProperties.$router = router2;
      Object.defineProperty(app2.config.globalProperties, "$route", {
        enumerable: true,
        get: () => unref(currentRoute)
      });
      if (isBrowser && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !started && currentRoute.value === START_LOCATION_NORMALIZED) {
        started = true;
        push(routerHistory.location).catch((err) => {
        });
      }
      const reactiveRoute = {};
      for (const key in START_LOCATION_NORMALIZED) {
        reactiveRoute[key] = computed(() => currentRoute.value[key]);
      }
      app2.provide(routerKey, router2);
      app2.provide(routeLocationKey, reactive(reactiveRoute));
      app2.provide(routerViewLocationKey, currentRoute);
      const unmountApp = app2.unmount;
      installedApps.add(app2);
      app2.unmount = function() {
        installedApps.delete(app2);
        if (installedApps.size < 1) {
          pendingLocation = START_LOCATION_NORMALIZED;
          removeHistoryListener && removeHistoryListener();
          removeHistoryListener = null;
          currentRoute.value = START_LOCATION_NORMALIZED;
          started = false;
          ready = false;
        }
        unmountApp();
      };
    }
  };
  return router;
}
function runGuardQueue(guards) {
  return guards.reduce((promise, guard) => promise.then(() => guard()), Promise.resolve());
}
function extractChangingRecords(to2, from2) {
  const leavingRecords = [];
  const updatingRecords = [];
  const enteringRecords = [];
  const len = Math.max(from2.matched.length, to2.matched.length);
  for (let i3 = 0; i3 < len; i3++) {
    const recordFrom = from2.matched[i3];
    if (recordFrom) {
      if (to2.matched.find((record) => isSameRouteRecord(record, recordFrom)))
        updatingRecords.push(recordFrom);
      else
        leavingRecords.push(recordFrom);
    }
    const recordTo = to2.matched[i3];
    if (recordTo) {
      if (!from2.matched.find((record) => isSameRouteRecord(record, recordTo))) {
        enteringRecords.push(recordTo);
      }
    }
  }
  return [leavingRecords, updatingRecords, enteringRecords];
}
function useRouter() {
  return inject(routerKey);
}
//! moment.js
//! version : 2.29.4
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
var hookCallback;
function hooks() {
  return hookCallback.apply(null, arguments);
}
function setHookCallback(callback) {
  hookCallback = callback;
}
function isArray(input) {
  return input instanceof Array || Object.prototype.toString.call(input) === "[object Array]";
}
function isObject(input) {
  return input != null && Object.prototype.toString.call(input) === "[object Object]";
}
function hasOwnProp(a2, b) {
  return Object.prototype.hasOwnProperty.call(a2, b);
}
function isObjectEmpty(obj) {
  if (Object.getOwnPropertyNames) {
    return Object.getOwnPropertyNames(obj).length === 0;
  } else {
    var k2;
    for (k2 in obj) {
      if (hasOwnProp(obj, k2)) {
        return false;
      }
    }
    return true;
  }
}
function isUndefined(input) {
  return input === void 0;
}
function isNumber(input) {
  return typeof input === "number" || Object.prototype.toString.call(input) === "[object Number]";
}
function isDate(input) {
  return input instanceof Date || Object.prototype.toString.call(input) === "[object Date]";
}
function map(arr, fn) {
  var res = [], i3, arrLen = arr.length;
  for (i3 = 0; i3 < arrLen; ++i3) {
    res.push(fn(arr[i3], i3));
  }
  return res;
}
function extend(a2, b) {
  for (var i3 in b) {
    if (hasOwnProp(b, i3)) {
      a2[i3] = b[i3];
    }
  }
  if (hasOwnProp(b, "toString")) {
    a2.toString = b.toString;
  }
  if (hasOwnProp(b, "valueOf")) {
    a2.valueOf = b.valueOf;
  }
  return a2;
}
function createUTC(input, format2, locale2, strict) {
  return createLocalOrUTC(input, format2, locale2, strict, true).utc();
}
function defaultParsingFlags() {
  return {
    empty: false,
    unusedTokens: [],
    unusedInput: [],
    overflow: -2,
    charsLeftOver: 0,
    nullInput: false,
    invalidEra: null,
    invalidMonth: null,
    invalidFormat: false,
    userInvalidated: false,
    iso: false,
    parsedDateParts: [],
    era: null,
    meridiem: null,
    rfc2822: false,
    weekdayMismatch: false
  };
}
function getParsingFlags(m2) {
  if (m2._pf == null) {
    m2._pf = defaultParsingFlags();
  }
  return m2._pf;
}
var some;
if (Array.prototype.some) {
  some = Array.prototype.some;
} else {
  some = function(fun) {
    var t2 = Object(this), len = t2.length >>> 0, i3;
    for (i3 = 0; i3 < len; i3++) {
      if (i3 in t2 && fun.call(this, t2[i3], i3, t2)) {
        return true;
      }
    }
    return false;
  };
}
function isValid(m2) {
  if (m2._isValid == null) {
    var flags = getParsingFlags(m2), parsedParts = some.call(flags.parsedDateParts, function(i3) {
      return i3 != null;
    }), isNowValid = !isNaN(m2._d.getTime()) && flags.overflow < 0 && !flags.empty && !flags.invalidEra && !flags.invalidMonth && !flags.invalidWeekday && !flags.weekdayMismatch && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || flags.meridiem && parsedParts);
    if (m2._strict) {
      isNowValid = isNowValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === void 0;
    }
    if (Object.isFrozen == null || !Object.isFrozen(m2)) {
      m2._isValid = isNowValid;
    } else {
      return isNowValid;
    }
  }
  return m2._isValid;
}
function createInvalid(flags) {
  var m2 = createUTC(NaN);
  if (flags != null) {
    extend(getParsingFlags(m2), flags);
  } else {
    getParsingFlags(m2).userInvalidated = true;
  }
  return m2;
}
var momentProperties = hooks.momentProperties = [], updateInProgress = false;
function copyConfig(to2, from2) {
  var i3, prop, val, momentPropertiesLen = momentProperties.length;
  if (!isUndefined(from2._isAMomentObject)) {
    to2._isAMomentObject = from2._isAMomentObject;
  }
  if (!isUndefined(from2._i)) {
    to2._i = from2._i;
  }
  if (!isUndefined(from2._f)) {
    to2._f = from2._f;
  }
  if (!isUndefined(from2._l)) {
    to2._l = from2._l;
  }
  if (!isUndefined(from2._strict)) {
    to2._strict = from2._strict;
  }
  if (!isUndefined(from2._tzm)) {
    to2._tzm = from2._tzm;
  }
  if (!isUndefined(from2._isUTC)) {
    to2._isUTC = from2._isUTC;
  }
  if (!isUndefined(from2._offset)) {
    to2._offset = from2._offset;
  }
  if (!isUndefined(from2._pf)) {
    to2._pf = getParsingFlags(from2);
  }
  if (!isUndefined(from2._locale)) {
    to2._locale = from2._locale;
  }
  if (momentPropertiesLen > 0) {
    for (i3 = 0; i3 < momentPropertiesLen; i3++) {
      prop = momentProperties[i3];
      val = from2[prop];
      if (!isUndefined(val)) {
        to2[prop] = val;
      }
    }
  }
  return to2;
}
function Moment(config) {
  copyConfig(this, config);
  this._d = new Date(config._d != null ? config._d.getTime() : NaN);
  if (!this.isValid()) {
    this._d = /* @__PURE__ */ new Date(NaN);
  }
  if (updateInProgress === false) {
    updateInProgress = true;
    hooks.updateOffset(this);
    updateInProgress = false;
  }
}
function isMoment(obj) {
  return obj instanceof Moment || obj != null && obj._isAMomentObject != null;
}
function warn(msg) {
  if (hooks.suppressDeprecationWarnings === false && typeof console !== "undefined" && console.warn) {
    console.warn("Deprecation warning: " + msg);
  }
}
function deprecate(msg, fn) {
  var firstTime = true;
  return extend(function() {
    if (hooks.deprecationHandler != null) {
      hooks.deprecationHandler(null, msg);
    }
    if (firstTime) {
      var args = [], arg, i3, key, argLen = arguments.length;
      for (i3 = 0; i3 < argLen; i3++) {
        arg = "";
        if (typeof arguments[i3] === "object") {
          arg += "\n[" + i3 + "] ";
          for (key in arguments[0]) {
            if (hasOwnProp(arguments[0], key)) {
              arg += key + ": " + arguments[0][key] + ", ";
            }
          }
          arg = arg.slice(0, -2);
        } else {
          arg = arguments[i3];
        }
        args.push(arg);
      }
      warn(
        msg + "\nArguments: " + Array.prototype.slice.call(args).join("") + "\n" + new Error().stack
      );
      firstTime = false;
    }
    return fn.apply(this, arguments);
  }, fn);
}
var deprecations = {};
function deprecateSimple(name, msg) {
  if (hooks.deprecationHandler != null) {
    hooks.deprecationHandler(name, msg);
  }
  if (!deprecations[name]) {
    warn(msg);
    deprecations[name] = true;
  }
}
hooks.suppressDeprecationWarnings = false;
hooks.deprecationHandler = null;
function isFunction(input) {
  return typeof Function !== "undefined" && input instanceof Function || Object.prototype.toString.call(input) === "[object Function]";
}
function set(config) {
  var prop, i3;
  for (i3 in config) {
    if (hasOwnProp(config, i3)) {
      prop = config[i3];
      if (isFunction(prop)) {
        this[i3] = prop;
      } else {
        this["_" + i3] = prop;
      }
    }
  }
  this._config = config;
  this._dayOfMonthOrdinalParseLenient = new RegExp(
    (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source
  );
}
function mergeConfigs(parentConfig, childConfig) {
  var res = extend({}, parentConfig), prop;
  for (prop in childConfig) {
    if (hasOwnProp(childConfig, prop)) {
      if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
        res[prop] = {};
        extend(res[prop], parentConfig[prop]);
        extend(res[prop], childConfig[prop]);
      } else if (childConfig[prop] != null) {
        res[prop] = childConfig[prop];
      } else {
        delete res[prop];
      }
    }
  }
  for (prop in parentConfig) {
    if (hasOwnProp(parentConfig, prop) && !hasOwnProp(childConfig, prop) && isObject(parentConfig[prop])) {
      res[prop] = extend({}, res[prop]);
    }
  }
  return res;
}
function Locale(config) {
  if (config != null) {
    this.set(config);
  }
}
var keys;
if (Object.keys) {
  keys = Object.keys;
} else {
  keys = function(obj) {
    var i3, res = [];
    for (i3 in obj) {
      if (hasOwnProp(obj, i3)) {
        res.push(i3);
      }
    }
    return res;
  };
}
var defaultCalendar = {
  sameDay: "[Today at] LT",
  nextDay: "[Tomorrow at] LT",
  nextWeek: "dddd [at] LT",
  lastDay: "[Yesterday at] LT",
  lastWeek: "[Last] dddd [at] LT",
  sameElse: "L"
};
function calendar(key, mom, now2) {
  var output = this._calendar[key] || this._calendar["sameElse"];
  return isFunction(output) ? output.call(mom, now2) : output;
}
function zeroFill(number, targetLength, forceSign) {
  var absNumber = "" + Math.abs(number), zerosToFill = targetLength - absNumber.length, sign2 = number >= 0;
  return (sign2 ? forceSign ? "+" : "" : "-") + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
}
var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, formatFunctions = {}, formatTokenFunctions = {};
function addFormatToken(token2, padded, ordinal2, callback) {
  var func = callback;
  if (typeof callback === "string") {
    func = function() {
      return this[callback]();
    };
  }
  if (token2) {
    formatTokenFunctions[token2] = func;
  }
  if (padded) {
    formatTokenFunctions[padded[0]] = function() {
      return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
    };
  }
  if (ordinal2) {
    formatTokenFunctions[ordinal2] = function() {
      return this.localeData().ordinal(
        func.apply(this, arguments),
        token2
      );
    };
  }
}
function removeFormattingTokens(input) {
  if (input.match(/\[[\s\S]/)) {
    return input.replace(/^\[|\]$/g, "");
  }
  return input.replace(/\\/g, "");
}
function makeFormatFunction(format2) {
  var array = format2.match(formattingTokens), i3, length;
  for (i3 = 0, length = array.length; i3 < length; i3++) {
    if (formatTokenFunctions[array[i3]]) {
      array[i3] = formatTokenFunctions[array[i3]];
    } else {
      array[i3] = removeFormattingTokens(array[i3]);
    }
  }
  return function(mom) {
    var output = "", i4;
    for (i4 = 0; i4 < length; i4++) {
      output += isFunction(array[i4]) ? array[i4].call(mom, format2) : array[i4];
    }
    return output;
  };
}
function formatMoment(m2, format2) {
  if (!m2.isValid()) {
    return m2.localeData().invalidDate();
  }
  format2 = expandFormat(format2, m2.localeData());
  formatFunctions[format2] = formatFunctions[format2] || makeFormatFunction(format2);
  return formatFunctions[format2](m2);
}
function expandFormat(format2, locale2) {
  var i3 = 5;
  function replaceLongDateFormatTokens(input) {
    return locale2.longDateFormat(input) || input;
  }
  localFormattingTokens.lastIndex = 0;
  while (i3 >= 0 && localFormattingTokens.test(format2)) {
    format2 = format2.replace(
      localFormattingTokens,
      replaceLongDateFormatTokens
    );
    localFormattingTokens.lastIndex = 0;
    i3 -= 1;
  }
  return format2;
}
var defaultLongDateFormat = {
  LTS: "h:mm:ss A",
  LT: "h:mm A",
  L: "MM/DD/YYYY",
  LL: "MMMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A"
};
function longDateFormat(key) {
  var format2 = this._longDateFormat[key], formatUpper = this._longDateFormat[key.toUpperCase()];
  if (format2 || !formatUpper) {
    return format2;
  }
  this._longDateFormat[key] = formatUpper.match(formattingTokens).map(function(tok) {
    if (tok === "MMMM" || tok === "MM" || tok === "DD" || tok === "dddd") {
      return tok.slice(1);
    }
    return tok;
  }).join("");
  return this._longDateFormat[key];
}
var defaultInvalidDate = "Invalid date";
function invalidDate() {
  return this._invalidDate;
}
var defaultOrdinal = "%d", defaultDayOfMonthOrdinalParse = /\d{1,2}/;
function ordinal(number) {
  return this._ordinal.replace("%d", number);
}
var defaultRelativeTime = {
  future: "in %s",
  past: "%s ago",
  s: "a few seconds",
  ss: "%d seconds",
  m: "a minute",
  mm: "%d minutes",
  h: "an hour",
  hh: "%d hours",
  d: "a day",
  dd: "%d days",
  w: "a week",
  ww: "%d weeks",
  M: "a month",
  MM: "%d months",
  y: "a year",
  yy: "%d years"
};
function relativeTime(number, withoutSuffix, string, isFuture) {
  var output = this._relativeTime[string];
  return isFunction(output) ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
}
function pastFuture(diff2, output) {
  var format2 = this._relativeTime[diff2 > 0 ? "future" : "past"];
  return isFunction(format2) ? format2(output) : format2.replace(/%s/i, output);
}
var aliases = {};
function addUnitAlias(unit, shorthand) {
  var lowerCase = unit.toLowerCase();
  aliases[lowerCase] = aliases[lowerCase + "s"] = aliases[shorthand] = unit;
}
function normalizeUnits(units) {
  return typeof units === "string" ? aliases[units] || aliases[units.toLowerCase()] : void 0;
}
function normalizeObjectUnits(inputObject) {
  var normalizedInput = {}, normalizedProp, prop;
  for (prop in inputObject) {
    if (hasOwnProp(inputObject, prop)) {
      normalizedProp = normalizeUnits(prop);
      if (normalizedProp) {
        normalizedInput[normalizedProp] = inputObject[prop];
      }
    }
  }
  return normalizedInput;
}
var priorities = {};
function addUnitPriority(unit, priority) {
  priorities[unit] = priority;
}
function getPrioritizedUnits(unitsObj) {
  var units = [], u2;
  for (u2 in unitsObj) {
    if (hasOwnProp(unitsObj, u2)) {
      units.push({ unit: u2, priority: priorities[u2] });
    }
  }
  units.sort(function(a2, b) {
    return a2.priority - b.priority;
  });
  return units;
}
function isLeapYear(year) {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
function absFloor(number) {
  if (number < 0) {
    return Math.ceil(number) || 0;
  } else {
    return Math.floor(number);
  }
}
function toInt(argumentForCoercion) {
  var coercedNumber = +argumentForCoercion, value = 0;
  if (coercedNumber !== 0 && isFinite(coercedNumber)) {
    value = absFloor(coercedNumber);
  }
  return value;
}
function makeGetSet(unit, keepTime) {
  return function(value) {
    if (value != null) {
      set$1(this, unit, value);
      hooks.updateOffset(this, keepTime);
      return this;
    } else {
      return get(this, unit);
    }
  };
}
function get(mom, unit) {
  return mom.isValid() ? mom._d["get" + (mom._isUTC ? "UTC" : "") + unit]() : NaN;
}
function set$1(mom, unit, value) {
  if (mom.isValid() && !isNaN(value)) {
    if (unit === "FullYear" && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
      value = toInt(value);
      mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](
        value,
        mom.month(),
        daysInMonth(value, mom.month())
      );
    } else {
      mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](value);
    }
  }
}
function stringGet(units) {
  units = normalizeUnits(units);
  if (isFunction(this[units])) {
    return this[units]();
  }
  return this;
}
function stringSet(units, value) {
  if (typeof units === "object") {
    units = normalizeObjectUnits(units);
    var prioritized = getPrioritizedUnits(units), i3, prioritizedLen = prioritized.length;
    for (i3 = 0; i3 < prioritizedLen; i3++) {
      this[prioritized[i3].unit](units[prioritized[i3].unit]);
    }
  } else {
    units = normalizeUnits(units);
    if (isFunction(this[units])) {
      return this[units](value);
    }
  }
  return this;
}
var match1 = /\d/, match2 = /\d\d/, match3 = /\d{3}/, match4 = /\d{4}/, match6 = /[+-]?\d{6}/, match1to2 = /\d\d?/, match3to4 = /\d\d\d\d?/, match5to6 = /\d\d\d\d\d\d?/, match1to3 = /\d{1,3}/, match1to4 = /\d{1,4}/, match1to6 = /[+-]?\d{1,6}/, matchUnsigned = /\d+/, matchSigned = /[+-]?\d+/, matchOffset = /Z|[+-]\d\d:?\d\d/gi, matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, regexes;
regexes = {};
function addRegexToken(token2, regex, strictRegex) {
  regexes[token2] = isFunction(regex) ? regex : function(isStrict, localeData2) {
    return isStrict && strictRegex ? strictRegex : regex;
  };
}
function getParseRegexForToken(token2, config) {
  if (!hasOwnProp(regexes, token2)) {
    return new RegExp(unescapeFormat(token2));
  }
  return regexes[token2](config._strict, config._locale);
}
function unescapeFormat(s3) {
  return regexEscape(
    s3.replace("\\", "").replace(
      /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
      function(matched, p1, p2, p3, p4) {
        return p1 || p2 || p3 || p4;
      }
    )
  );
}
function regexEscape(s3) {
  return s3.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
var tokens = {};
function addParseToken(token2, callback) {
  var i3, func = callback, tokenLen;
  if (typeof token2 === "string") {
    token2 = [token2];
  }
  if (isNumber(callback)) {
    func = function(input, array) {
      array[callback] = toInt(input);
    };
  }
  tokenLen = token2.length;
  for (i3 = 0; i3 < tokenLen; i3++) {
    tokens[token2[i3]] = func;
  }
}
function addWeekParseToken(token2, callback) {
  addParseToken(token2, function(input, array, config, token3) {
    config._w = config._w || {};
    callback(input, config._w, config, token3);
  });
}
function addTimeToArrayFromToken(token2, input, config) {
  if (input != null && hasOwnProp(tokens, token2)) {
    tokens[token2](input, config._a, config, token2);
  }
}
var YEAR = 0, MONTH = 1, DATE = 2, HOUR = 3, MINUTE = 4, SECOND = 5, MILLISECOND = 6, WEEK = 7, WEEKDAY = 8;
function mod(n2, x2) {
  return (n2 % x2 + x2) % x2;
}
var indexOf;
if (Array.prototype.indexOf) {
  indexOf = Array.prototype.indexOf;
} else {
  indexOf = function(o3) {
    var i3;
    for (i3 = 0; i3 < this.length; ++i3) {
      if (this[i3] === o3) {
        return i3;
      }
    }
    return -1;
  };
}
function daysInMonth(year, month) {
  if (isNaN(year) || isNaN(month)) {
    return NaN;
  }
  var modMonth = mod(month, 12);
  year += (month - modMonth) / 12;
  return modMonth === 1 ? isLeapYear(year) ? 29 : 28 : 31 - modMonth % 7 % 2;
}
addFormatToken("M", ["MM", 2], "Mo", function() {
  return this.month() + 1;
});
addFormatToken("MMM", 0, 0, function(format2) {
  return this.localeData().monthsShort(this, format2);
});
addFormatToken("MMMM", 0, 0, function(format2) {
  return this.localeData().months(this, format2);
});
addUnitAlias("month", "M");
addUnitPriority("month", 8);
addRegexToken("M", match1to2);
addRegexToken("MM", match1to2, match2);
addRegexToken("MMM", function(isStrict, locale2) {
  return locale2.monthsShortRegex(isStrict);
});
addRegexToken("MMMM", function(isStrict, locale2) {
  return locale2.monthsRegex(isStrict);
});
addParseToken(["M", "MM"], function(input, array) {
  array[MONTH] = toInt(input) - 1;
});
addParseToken(["MMM", "MMMM"], function(input, array, config, token2) {
  var month = config._locale.monthsParse(input, token2, config._strict);
  if (month != null) {
    array[MONTH] = month;
  } else {
    getParsingFlags(config).invalidMonth = input;
  }
});
var defaultLocaleMonths = "January_February_March_April_May_June_July_August_September_October_November_December".split(
  "_"
), defaultLocaleMonthsShort = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, defaultMonthsShortRegex = matchWord, defaultMonthsRegex = matchWord;
function localeMonths(m2, format2) {
  if (!m2) {
    return isArray(this._months) ? this._months : this._months["standalone"];
  }
  return isArray(this._months) ? this._months[m2.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format2) ? "format" : "standalone"][m2.month()];
}
function localeMonthsShort(m2, format2) {
  if (!m2) {
    return isArray(this._monthsShort) ? this._monthsShort : this._monthsShort["standalone"];
  }
  return isArray(this._monthsShort) ? this._monthsShort[m2.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format2) ? "format" : "standalone"][m2.month()];
}
function handleStrictParse(monthName, format2, strict) {
  var i3, ii, mom, llc = monthName.toLocaleLowerCase();
  if (!this._monthsParse) {
    this._monthsParse = [];
    this._longMonthsParse = [];
    this._shortMonthsParse = [];
    for (i3 = 0; i3 < 12; ++i3) {
      mom = createUTC([2e3, i3]);
      this._shortMonthsParse[i3] = this.monthsShort(
        mom,
        ""
      ).toLocaleLowerCase();
      this._longMonthsParse[i3] = this.months(mom, "").toLocaleLowerCase();
    }
  }
  if (strict) {
    if (format2 === "MMM") {
      ii = indexOf.call(this._shortMonthsParse, llc);
      return ii !== -1 ? ii : null;
    } else {
      ii = indexOf.call(this._longMonthsParse, llc);
      return ii !== -1 ? ii : null;
    }
  } else {
    if (format2 === "MMM") {
      ii = indexOf.call(this._shortMonthsParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._longMonthsParse, llc);
      return ii !== -1 ? ii : null;
    } else {
      ii = indexOf.call(this._longMonthsParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._shortMonthsParse, llc);
      return ii !== -1 ? ii : null;
    }
  }
}
function localeMonthsParse(monthName, format2, strict) {
  var i3, mom, regex;
  if (this._monthsParseExact) {
    return handleStrictParse.call(this, monthName, format2, strict);
  }
  if (!this._monthsParse) {
    this._monthsParse = [];
    this._longMonthsParse = [];
    this._shortMonthsParse = [];
  }
  for (i3 = 0; i3 < 12; i3++) {
    mom = createUTC([2e3, i3]);
    if (strict && !this._longMonthsParse[i3]) {
      this._longMonthsParse[i3] = new RegExp(
        "^" + this.months(mom, "").replace(".", "") + "$",
        "i"
      );
      this._shortMonthsParse[i3] = new RegExp(
        "^" + this.monthsShort(mom, "").replace(".", "") + "$",
        "i"
      );
    }
    if (!strict && !this._monthsParse[i3]) {
      regex = "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, "");
      this._monthsParse[i3] = new RegExp(regex.replace(".", ""), "i");
    }
    if (strict && format2 === "MMMM" && this._longMonthsParse[i3].test(monthName)) {
      return i3;
    } else if (strict && format2 === "MMM" && this._shortMonthsParse[i3].test(monthName)) {
      return i3;
    } else if (!strict && this._monthsParse[i3].test(monthName)) {
      return i3;
    }
  }
}
function setMonth(mom, value) {
  var dayOfMonth;
  if (!mom.isValid()) {
    return mom;
  }
  if (typeof value === "string") {
    if (/^\d+$/.test(value)) {
      value = toInt(value);
    } else {
      value = mom.localeData().monthsParse(value);
      if (!isNumber(value)) {
        return mom;
      }
    }
  }
  dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
  mom._d["set" + (mom._isUTC ? "UTC" : "") + "Month"](value, dayOfMonth);
  return mom;
}
function getSetMonth(value) {
  if (value != null) {
    setMonth(this, value);
    hooks.updateOffset(this, true);
    return this;
  } else {
    return get(this, "Month");
  }
}
function getDaysInMonth() {
  return daysInMonth(this.year(), this.month());
}
function monthsShortRegex(isStrict) {
  if (this._monthsParseExact) {
    if (!hasOwnProp(this, "_monthsRegex")) {
      computeMonthsParse.call(this);
    }
    if (isStrict) {
      return this._monthsShortStrictRegex;
    } else {
      return this._monthsShortRegex;
    }
  } else {
    if (!hasOwnProp(this, "_monthsShortRegex")) {
      this._monthsShortRegex = defaultMonthsShortRegex;
    }
    return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
  }
}
function monthsRegex(isStrict) {
  if (this._monthsParseExact) {
    if (!hasOwnProp(this, "_monthsRegex")) {
      computeMonthsParse.call(this);
    }
    if (isStrict) {
      return this._monthsStrictRegex;
    } else {
      return this._monthsRegex;
    }
  } else {
    if (!hasOwnProp(this, "_monthsRegex")) {
      this._monthsRegex = defaultMonthsRegex;
    }
    return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
  }
}
function computeMonthsParse() {
  function cmpLenRev(a2, b) {
    return b.length - a2.length;
  }
  var shortPieces = [], longPieces = [], mixedPieces = [], i3, mom;
  for (i3 = 0; i3 < 12; i3++) {
    mom = createUTC([2e3, i3]);
    shortPieces.push(this.monthsShort(mom, ""));
    longPieces.push(this.months(mom, ""));
    mixedPieces.push(this.months(mom, ""));
    mixedPieces.push(this.monthsShort(mom, ""));
  }
  shortPieces.sort(cmpLenRev);
  longPieces.sort(cmpLenRev);
  mixedPieces.sort(cmpLenRev);
  for (i3 = 0; i3 < 12; i3++) {
    shortPieces[i3] = regexEscape(shortPieces[i3]);
    longPieces[i3] = regexEscape(longPieces[i3]);
  }
  for (i3 = 0; i3 < 24; i3++) {
    mixedPieces[i3] = regexEscape(mixedPieces[i3]);
  }
  this._monthsRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
  this._monthsShortRegex = this._monthsRegex;
  this._monthsStrictRegex = new RegExp(
    "^(" + longPieces.join("|") + ")",
    "i"
  );
  this._monthsShortStrictRegex = new RegExp(
    "^(" + shortPieces.join("|") + ")",
    "i"
  );
}
addFormatToken("Y", 0, 0, function() {
  var y2 = this.year();
  return y2 <= 9999 ? zeroFill(y2, 4) : "+" + y2;
});
addFormatToken(0, ["YY", 2], 0, function() {
  return this.year() % 100;
});
addFormatToken(0, ["YYYY", 4], 0, "year");
addFormatToken(0, ["YYYYY", 5], 0, "year");
addFormatToken(0, ["YYYYYY", 6, true], 0, "year");
addUnitAlias("year", "y");
addUnitPriority("year", 1);
addRegexToken("Y", matchSigned);
addRegexToken("YY", match1to2, match2);
addRegexToken("YYYY", match1to4, match4);
addRegexToken("YYYYY", match1to6, match6);
addRegexToken("YYYYYY", match1to6, match6);
addParseToken(["YYYYY", "YYYYYY"], YEAR);
addParseToken("YYYY", function(input, array) {
  array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
});
addParseToken("YY", function(input, array) {
  array[YEAR] = hooks.parseTwoDigitYear(input);
});
addParseToken("Y", function(input, array) {
  array[YEAR] = parseInt(input, 10);
});
function daysInYear(year) {
  return isLeapYear(year) ? 366 : 365;
}
hooks.parseTwoDigitYear = function(input) {
  return toInt(input) + (toInt(input) > 68 ? 1900 : 2e3);
};
var getSetYear = makeGetSet("FullYear", true);
function getIsLeapYear() {
  return isLeapYear(this.year());
}
function createDate$1(y2, m2, d3, h2, M2, s3, ms) {
  var date;
  if (y2 < 100 && y2 >= 0) {
    date = new Date(y2 + 400, m2, d3, h2, M2, s3, ms);
    if (isFinite(date.getFullYear())) {
      date.setFullYear(y2);
    }
  } else {
    date = new Date(y2, m2, d3, h2, M2, s3, ms);
  }
  return date;
}
function createUTCDate(y2) {
  var date, args;
  if (y2 < 100 && y2 >= 0) {
    args = Array.prototype.slice.call(arguments);
    args[0] = y2 + 400;
    date = new Date(Date.UTC.apply(null, args));
    if (isFinite(date.getUTCFullYear())) {
      date.setUTCFullYear(y2);
    }
  } else {
    date = new Date(Date.UTC.apply(null, arguments));
  }
  return date;
}
function firstWeekOffset(year, dow, doy) {
  var fwd = 7 + dow - doy, fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
  return -fwdlw + fwd - 1;
}
function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
  var localWeekday = (7 + weekday - dow) % 7, weekOffset = firstWeekOffset(year, dow, doy), dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset, resYear, resDayOfYear;
  if (dayOfYear <= 0) {
    resYear = year - 1;
    resDayOfYear = daysInYear(resYear) + dayOfYear;
  } else if (dayOfYear > daysInYear(year)) {
    resYear = year + 1;
    resDayOfYear = dayOfYear - daysInYear(year);
  } else {
    resYear = year;
    resDayOfYear = dayOfYear;
  }
  return {
    year: resYear,
    dayOfYear: resDayOfYear
  };
}
function weekOfYear(mom, dow, doy) {
  var weekOffset = firstWeekOffset(mom.year(), dow, doy), week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1, resWeek, resYear;
  if (week < 1) {
    resYear = mom.year() - 1;
    resWeek = week + weeksInYear(resYear, dow, doy);
  } else if (week > weeksInYear(mom.year(), dow, doy)) {
    resWeek = week - weeksInYear(mom.year(), dow, doy);
    resYear = mom.year() + 1;
  } else {
    resYear = mom.year();
    resWeek = week;
  }
  return {
    week: resWeek,
    year: resYear
  };
}
function weeksInYear(year, dow, doy) {
  var weekOffset = firstWeekOffset(year, dow, doy), weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
  return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
}
addFormatToken("w", ["ww", 2], "wo", "week");
addFormatToken("W", ["WW", 2], "Wo", "isoWeek");
addUnitAlias("week", "w");
addUnitAlias("isoWeek", "W");
addUnitPriority("week", 5);
addUnitPriority("isoWeek", 5);
addRegexToken("w", match1to2);
addRegexToken("ww", match1to2, match2);
addRegexToken("W", match1to2);
addRegexToken("WW", match1to2, match2);
addWeekParseToken(
  ["w", "ww", "W", "WW"],
  function(input, week, config, token2) {
    week[token2.substr(0, 1)] = toInt(input);
  }
);
function localeWeek(mom) {
  return weekOfYear(mom, this._week.dow, this._week.doy).week;
}
var defaultLocaleWeek = {
  dow: 0,
  // Sunday is the first day of the week.
  doy: 6
  // The week that contains Jan 6th is the first week of the year.
};
function localeFirstDayOfWeek() {
  return this._week.dow;
}
function localeFirstDayOfYear() {
  return this._week.doy;
}
function getSetWeek(input) {
  var week = this.localeData().week(this);
  return input == null ? week : this.add((input - week) * 7, "d");
}
function getSetISOWeek(input) {
  var week = weekOfYear(this, 1, 4).week;
  return input == null ? week : this.add((input - week) * 7, "d");
}
addFormatToken("d", 0, "do", "day");
addFormatToken("dd", 0, 0, function(format2) {
  return this.localeData().weekdaysMin(this, format2);
});
addFormatToken("ddd", 0, 0, function(format2) {
  return this.localeData().weekdaysShort(this, format2);
});
addFormatToken("dddd", 0, 0, function(format2) {
  return this.localeData().weekdays(this, format2);
});
addFormatToken("e", 0, 0, "weekday");
addFormatToken("E", 0, 0, "isoWeekday");
addUnitAlias("day", "d");
addUnitAlias("weekday", "e");
addUnitAlias("isoWeekday", "E");
addUnitPriority("day", 11);
addUnitPriority("weekday", 11);
addUnitPriority("isoWeekday", 11);
addRegexToken("d", match1to2);
addRegexToken("e", match1to2);
addRegexToken("E", match1to2);
addRegexToken("dd", function(isStrict, locale2) {
  return locale2.weekdaysMinRegex(isStrict);
});
addRegexToken("ddd", function(isStrict, locale2) {
  return locale2.weekdaysShortRegex(isStrict);
});
addRegexToken("dddd", function(isStrict, locale2) {
  return locale2.weekdaysRegex(isStrict);
});
addWeekParseToken(["dd", "ddd", "dddd"], function(input, week, config, token2) {
  var weekday = config._locale.weekdaysParse(input, token2, config._strict);
  if (weekday != null) {
    week.d = weekday;
  } else {
    getParsingFlags(config).invalidWeekday = input;
  }
});
addWeekParseToken(["d", "e", "E"], function(input, week, config, token2) {
  week[token2] = toInt(input);
});
function parseWeekday(input, locale2) {
  if (typeof input !== "string") {
    return input;
  }
  if (!isNaN(input)) {
    return parseInt(input, 10);
  }
  input = locale2.weekdaysParse(input);
  if (typeof input === "number") {
    return input;
  }
  return null;
}
function parseIsoWeekday(input, locale2) {
  if (typeof input === "string") {
    return locale2.weekdaysParse(input) % 7 || 7;
  }
  return isNaN(input) ? null : input;
}
function shiftWeekdays(ws, n2) {
  return ws.slice(n2, 7).concat(ws.slice(0, n2));
}
var defaultLocaleWeekdays = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), defaultLocaleWeekdaysMin = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), defaultWeekdaysRegex = matchWord, defaultWeekdaysShortRegex = matchWord, defaultWeekdaysMinRegex = matchWord;
function localeWeekdays(m2, format2) {
  var weekdays = isArray(this._weekdays) ? this._weekdays : this._weekdays[m2 && m2 !== true && this._weekdays.isFormat.test(format2) ? "format" : "standalone"];
  return m2 === true ? shiftWeekdays(weekdays, this._week.dow) : m2 ? weekdays[m2.day()] : weekdays;
}
function localeWeekdaysShort(m2) {
  return m2 === true ? shiftWeekdays(this._weekdaysShort, this._week.dow) : m2 ? this._weekdaysShort[m2.day()] : this._weekdaysShort;
}
function localeWeekdaysMin(m2) {
  return m2 === true ? shiftWeekdays(this._weekdaysMin, this._week.dow) : m2 ? this._weekdaysMin[m2.day()] : this._weekdaysMin;
}
function handleStrictParse$1(weekdayName, format2, strict) {
  var i3, ii, mom, llc = weekdayName.toLocaleLowerCase();
  if (!this._weekdaysParse) {
    this._weekdaysParse = [];
    this._shortWeekdaysParse = [];
    this._minWeekdaysParse = [];
    for (i3 = 0; i3 < 7; ++i3) {
      mom = createUTC([2e3, 1]).day(i3);
      this._minWeekdaysParse[i3] = this.weekdaysMin(
        mom,
        ""
      ).toLocaleLowerCase();
      this._shortWeekdaysParse[i3] = this.weekdaysShort(
        mom,
        ""
      ).toLocaleLowerCase();
      this._weekdaysParse[i3] = this.weekdays(mom, "").toLocaleLowerCase();
    }
  }
  if (strict) {
    if (format2 === "dddd") {
      ii = indexOf.call(this._weekdaysParse, llc);
      return ii !== -1 ? ii : null;
    } else if (format2 === "ddd") {
      ii = indexOf.call(this._shortWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    } else {
      ii = indexOf.call(this._minWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    }
  } else {
    if (format2 === "dddd") {
      ii = indexOf.call(this._weekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._shortWeekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._minWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    } else if (format2 === "ddd") {
      ii = indexOf.call(this._shortWeekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._weekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._minWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    } else {
      ii = indexOf.call(this._minWeekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._weekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._shortWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    }
  }
}
function localeWeekdaysParse(weekdayName, format2, strict) {
  var i3, mom, regex;
  if (this._weekdaysParseExact) {
    return handleStrictParse$1.call(this, weekdayName, format2, strict);
  }
  if (!this._weekdaysParse) {
    this._weekdaysParse = [];
    this._minWeekdaysParse = [];
    this._shortWeekdaysParse = [];
    this._fullWeekdaysParse = [];
  }
  for (i3 = 0; i3 < 7; i3++) {
    mom = createUTC([2e3, 1]).day(i3);
    if (strict && !this._fullWeekdaysParse[i3]) {
      this._fullWeekdaysParse[i3] = new RegExp(
        "^" + this.weekdays(mom, "").replace(".", "\\.?") + "$",
        "i"
      );
      this._shortWeekdaysParse[i3] = new RegExp(
        "^" + this.weekdaysShort(mom, "").replace(".", "\\.?") + "$",
        "i"
      );
      this._minWeekdaysParse[i3] = new RegExp(
        "^" + this.weekdaysMin(mom, "").replace(".", "\\.?") + "$",
        "i"
      );
    }
    if (!this._weekdaysParse[i3]) {
      regex = "^" + this.weekdays(mom, "") + "|^" + this.weekdaysShort(mom, "") + "|^" + this.weekdaysMin(mom, "");
      this._weekdaysParse[i3] = new RegExp(regex.replace(".", ""), "i");
    }
    if (strict && format2 === "dddd" && this._fullWeekdaysParse[i3].test(weekdayName)) {
      return i3;
    } else if (strict && format2 === "ddd" && this._shortWeekdaysParse[i3].test(weekdayName)) {
      return i3;
    } else if (strict && format2 === "dd" && this._minWeekdaysParse[i3].test(weekdayName)) {
      return i3;
    } else if (!strict && this._weekdaysParse[i3].test(weekdayName)) {
      return i3;
    }
  }
}
function getSetDayOfWeek(input) {
  if (!this.isValid()) {
    return input != null ? this : NaN;
  }
  var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
  if (input != null) {
    input = parseWeekday(input, this.localeData());
    return this.add(input - day, "d");
  } else {
    return day;
  }
}
function getSetLocaleDayOfWeek(input) {
  if (!this.isValid()) {
    return input != null ? this : NaN;
  }
  var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
  return input == null ? weekday : this.add(input - weekday, "d");
}
function getSetISODayOfWeek(input) {
  if (!this.isValid()) {
    return input != null ? this : NaN;
  }
  if (input != null) {
    var weekday = parseIsoWeekday(input, this.localeData());
    return this.day(this.day() % 7 ? weekday : weekday - 7);
  } else {
    return this.day() || 7;
  }
}
function weekdaysRegex(isStrict) {
  if (this._weekdaysParseExact) {
    if (!hasOwnProp(this, "_weekdaysRegex")) {
      computeWeekdaysParse.call(this);
    }
    if (isStrict) {
      return this._weekdaysStrictRegex;
    } else {
      return this._weekdaysRegex;
    }
  } else {
    if (!hasOwnProp(this, "_weekdaysRegex")) {
      this._weekdaysRegex = defaultWeekdaysRegex;
    }
    return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
  }
}
function weekdaysShortRegex(isStrict) {
  if (this._weekdaysParseExact) {
    if (!hasOwnProp(this, "_weekdaysRegex")) {
      computeWeekdaysParse.call(this);
    }
    if (isStrict) {
      return this._weekdaysShortStrictRegex;
    } else {
      return this._weekdaysShortRegex;
    }
  } else {
    if (!hasOwnProp(this, "_weekdaysShortRegex")) {
      this._weekdaysShortRegex = defaultWeekdaysShortRegex;
    }
    return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
  }
}
function weekdaysMinRegex(isStrict) {
  if (this._weekdaysParseExact) {
    if (!hasOwnProp(this, "_weekdaysRegex")) {
      computeWeekdaysParse.call(this);
    }
    if (isStrict) {
      return this._weekdaysMinStrictRegex;
    } else {
      return this._weekdaysMinRegex;
    }
  } else {
    if (!hasOwnProp(this, "_weekdaysMinRegex")) {
      this._weekdaysMinRegex = defaultWeekdaysMinRegex;
    }
    return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
  }
}
function computeWeekdaysParse() {
  function cmpLenRev(a2, b) {
    return b.length - a2.length;
  }
  var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [], i3, mom, minp, shortp, longp;
  for (i3 = 0; i3 < 7; i3++) {
    mom = createUTC([2e3, 1]).day(i3);
    minp = regexEscape(this.weekdaysMin(mom, ""));
    shortp = regexEscape(this.weekdaysShort(mom, ""));
    longp = regexEscape(this.weekdays(mom, ""));
    minPieces.push(minp);
    shortPieces.push(shortp);
    longPieces.push(longp);
    mixedPieces.push(minp);
    mixedPieces.push(shortp);
    mixedPieces.push(longp);
  }
  minPieces.sort(cmpLenRev);
  shortPieces.sort(cmpLenRev);
  longPieces.sort(cmpLenRev);
  mixedPieces.sort(cmpLenRev);
  this._weekdaysRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
  this._weekdaysShortRegex = this._weekdaysRegex;
  this._weekdaysMinRegex = this._weekdaysRegex;
  this._weekdaysStrictRegex = new RegExp(
    "^(" + longPieces.join("|") + ")",
    "i"
  );
  this._weekdaysShortStrictRegex = new RegExp(
    "^(" + shortPieces.join("|") + ")",
    "i"
  );
  this._weekdaysMinStrictRegex = new RegExp(
    "^(" + minPieces.join("|") + ")",
    "i"
  );
}
function hFormat() {
  return this.hours() % 12 || 12;
}
function kFormat() {
  return this.hours() || 24;
}
addFormatToken("H", ["HH", 2], 0, "hour");
addFormatToken("h", ["hh", 2], 0, hFormat);
addFormatToken("k", ["kk", 2], 0, kFormat);
addFormatToken("hmm", 0, 0, function() {
  return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2);
});
addFormatToken("hmmss", 0, 0, function() {
  return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
});
addFormatToken("Hmm", 0, 0, function() {
  return "" + this.hours() + zeroFill(this.minutes(), 2);
});
addFormatToken("Hmmss", 0, 0, function() {
  return "" + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
});
function meridiem(token2, lowercase) {
  addFormatToken(token2, 0, 0, function() {
    return this.localeData().meridiem(
      this.hours(),
      this.minutes(),
      lowercase
    );
  });
}
meridiem("a", true);
meridiem("A", false);
addUnitAlias("hour", "h");
addUnitPriority("hour", 13);
function matchMeridiem(isStrict, locale2) {
  return locale2._meridiemParse;
}
addRegexToken("a", matchMeridiem);
addRegexToken("A", matchMeridiem);
addRegexToken("H", match1to2);
addRegexToken("h", match1to2);
addRegexToken("k", match1to2);
addRegexToken("HH", match1to2, match2);
addRegexToken("hh", match1to2, match2);
addRegexToken("kk", match1to2, match2);
addRegexToken("hmm", match3to4);
addRegexToken("hmmss", match5to6);
addRegexToken("Hmm", match3to4);
addRegexToken("Hmmss", match5to6);
addParseToken(["H", "HH"], HOUR);
addParseToken(["k", "kk"], function(input, array, config) {
  var kInput = toInt(input);
  array[HOUR] = kInput === 24 ? 0 : kInput;
});
addParseToken(["a", "A"], function(input, array, config) {
  config._isPm = config._locale.isPM(input);
  config._meridiem = input;
});
addParseToken(["h", "hh"], function(input, array, config) {
  array[HOUR] = toInt(input);
  getParsingFlags(config).bigHour = true;
});
addParseToken("hmm", function(input, array, config) {
  var pos = input.length - 2;
  array[HOUR] = toInt(input.substr(0, pos));
  array[MINUTE] = toInt(input.substr(pos));
  getParsingFlags(config).bigHour = true;
});
addParseToken("hmmss", function(input, array, config) {
  var pos1 = input.length - 4, pos2 = input.length - 2;
  array[HOUR] = toInt(input.substr(0, pos1));
  array[MINUTE] = toInt(input.substr(pos1, 2));
  array[SECOND] = toInt(input.substr(pos2));
  getParsingFlags(config).bigHour = true;
});
addParseToken("Hmm", function(input, array, config) {
  var pos = input.length - 2;
  array[HOUR] = toInt(input.substr(0, pos));
  array[MINUTE] = toInt(input.substr(pos));
});
addParseToken("Hmmss", function(input, array, config) {
  var pos1 = input.length - 4, pos2 = input.length - 2;
  array[HOUR] = toInt(input.substr(0, pos1));
  array[MINUTE] = toInt(input.substr(pos1, 2));
  array[SECOND] = toInt(input.substr(pos2));
});
function localeIsPM(input) {
  return (input + "").toLowerCase().charAt(0) === "p";
}
var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i, getSetHour = makeGetSet("Hours", true);
function localeMeridiem(hours2, minutes2, isLower) {
  if (hours2 > 11) {
    return isLower ? "pm" : "PM";
  } else {
    return isLower ? "am" : "AM";
  }
}
var baseConfig = {
  calendar: defaultCalendar,
  longDateFormat: defaultLongDateFormat,
  invalidDate: defaultInvalidDate,
  ordinal: defaultOrdinal,
  dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
  relativeTime: defaultRelativeTime,
  months: defaultLocaleMonths,
  monthsShort: defaultLocaleMonthsShort,
  week: defaultLocaleWeek,
  weekdays: defaultLocaleWeekdays,
  weekdaysMin: defaultLocaleWeekdaysMin,
  weekdaysShort: defaultLocaleWeekdaysShort,
  meridiemParse: defaultLocaleMeridiemParse
};
var locales = {}, localeFamilies = {}, globalLocale;
function commonPrefix(arr1, arr2) {
  var i3, minl = Math.min(arr1.length, arr2.length);
  for (i3 = 0; i3 < minl; i3 += 1) {
    if (arr1[i3] !== arr2[i3]) {
      return i3;
    }
  }
  return minl;
}
function normalizeLocale(key) {
  return key ? key.toLowerCase().replace("_", "-") : key;
}
function chooseLocale(names) {
  var i3 = 0, j2, next, locale2, split;
  while (i3 < names.length) {
    split = normalizeLocale(names[i3]).split("-");
    j2 = split.length;
    next = normalizeLocale(names[i3 + 1]);
    next = next ? next.split("-") : null;
    while (j2 > 0) {
      locale2 = loadLocale(split.slice(0, j2).join("-"));
      if (locale2) {
        return locale2;
      }
      if (next && next.length >= j2 && commonPrefix(split, next) >= j2 - 1) {
        break;
      }
      j2--;
    }
    i3++;
  }
  return globalLocale;
}
function isLocaleNameSane(name) {
  return name.match("^[^/\\\\]*$") != null;
}
function loadLocale(name) {
  var oldLocale = null, aliasedRequire;
  if (locales[name] === void 0 && typeof module !== "undefined" && module && module.exports && isLocaleNameSane(name)) {
    try {
      oldLocale = globalLocale._abbr;
      aliasedRequire = require;
      aliasedRequire("./locale/" + name);
      getSetGlobalLocale(oldLocale);
    } catch (e2) {
      locales[name] = null;
    }
  }
  return locales[name];
}
function getSetGlobalLocale(key, values) {
  var data;
  if (key) {
    if (isUndefined(values)) {
      data = getLocale(key);
    } else {
      data = defineLocale(key, values);
    }
    if (data) {
      globalLocale = data;
    } else {
      if (typeof console !== "undefined" && console.warn) {
        console.warn(
          "Locale " + key + " not found. Did you forget to load it?"
        );
      }
    }
  }
  return globalLocale._abbr;
}
function defineLocale(name, config) {
  if (config !== null) {
    var locale2, parentConfig = baseConfig;
    config.abbr = name;
    if (locales[name] != null) {
      deprecateSimple(
        "defineLocaleOverride",
        "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
      );
      parentConfig = locales[name]._config;
    } else if (config.parentLocale != null) {
      if (locales[config.parentLocale] != null) {
        parentConfig = locales[config.parentLocale]._config;
      } else {
        locale2 = loadLocale(config.parentLocale);
        if (locale2 != null) {
          parentConfig = locale2._config;
        } else {
          if (!localeFamilies[config.parentLocale]) {
            localeFamilies[config.parentLocale] = [];
          }
          localeFamilies[config.parentLocale].push({
            name,
            config
          });
          return null;
        }
      }
    }
    locales[name] = new Locale(mergeConfigs(parentConfig, config));
    if (localeFamilies[name]) {
      localeFamilies[name].forEach(function(x2) {
        defineLocale(x2.name, x2.config);
      });
    }
    getSetGlobalLocale(name);
    return locales[name];
  } else {
    delete locales[name];
    return null;
  }
}
function updateLocale(name, config) {
  if (config != null) {
    var locale2, tmpLocale, parentConfig = baseConfig;
    if (locales[name] != null && locales[name].parentLocale != null) {
      locales[name].set(mergeConfigs(locales[name]._config, config));
    } else {
      tmpLocale = loadLocale(name);
      if (tmpLocale != null) {
        parentConfig = tmpLocale._config;
      }
      config = mergeConfigs(parentConfig, config);
      if (tmpLocale == null) {
        config.abbr = name;
      }
      locale2 = new Locale(config);
      locale2.parentLocale = locales[name];
      locales[name] = locale2;
    }
    getSetGlobalLocale(name);
  } else {
    if (locales[name] != null) {
      if (locales[name].parentLocale != null) {
        locales[name] = locales[name].parentLocale;
        if (name === getSetGlobalLocale()) {
          getSetGlobalLocale(name);
        }
      } else if (locales[name] != null) {
        delete locales[name];
      }
    }
  }
  return locales[name];
}
function getLocale(key) {
  var locale2;
  if (key && key._locale && key._locale._abbr) {
    key = key._locale._abbr;
  }
  if (!key) {
    return globalLocale;
  }
  if (!isArray(key)) {
    locale2 = loadLocale(key);
    if (locale2) {
      return locale2;
    }
    key = [key];
  }
  return chooseLocale(key);
}
function listLocales() {
  return keys(locales);
}
function checkOverflow(m2) {
  var overflow, a2 = m2._a;
  if (a2 && getParsingFlags(m2).overflow === -2) {
    overflow = a2[MONTH] < 0 || a2[MONTH] > 11 ? MONTH : a2[DATE] < 1 || a2[DATE] > daysInMonth(a2[YEAR], a2[MONTH]) ? DATE : a2[HOUR] < 0 || a2[HOUR] > 24 || a2[HOUR] === 24 && (a2[MINUTE] !== 0 || a2[SECOND] !== 0 || a2[MILLISECOND] !== 0) ? HOUR : a2[MINUTE] < 0 || a2[MINUTE] > 59 ? MINUTE : a2[SECOND] < 0 || a2[SECOND] > 59 ? SECOND : a2[MILLISECOND] < 0 || a2[MILLISECOND] > 999 ? MILLISECOND : -1;
    if (getParsingFlags(m2)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
      overflow = DATE;
    }
    if (getParsingFlags(m2)._overflowWeeks && overflow === -1) {
      overflow = WEEK;
    }
    if (getParsingFlags(m2)._overflowWeekday && overflow === -1) {
      overflow = WEEKDAY;
    }
    getParsingFlags(m2).overflow = overflow;
  }
  return m2;
}
var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, tzRegex = /Z|[+-]\d\d(?::?\d\d)?/, isoDates = [
  ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
  ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
  ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
  ["GGGG-[W]WW", /\d{4}-W\d\d/, false],
  ["YYYY-DDD", /\d{4}-\d{3}/],
  ["YYYY-MM", /\d{4}-\d\d/, false],
  ["YYYYYYMMDD", /[+-]\d{10}/],
  ["YYYYMMDD", /\d{8}/],
  ["GGGG[W]WWE", /\d{4}W\d{3}/],
  ["GGGG[W]WW", /\d{4}W\d{2}/, false],
  ["YYYYDDD", /\d{7}/],
  ["YYYYMM", /\d{6}/, false],
  ["YYYY", /\d{4}/, false]
], isoTimes = [
  ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
  ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
  ["HH:mm:ss", /\d\d:\d\d:\d\d/],
  ["HH:mm", /\d\d:\d\d/],
  ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
  ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
  ["HHmmss", /\d\d\d\d\d\d/],
  ["HHmm", /\d\d\d\d/],
  ["HH", /\d\d/]
], aspNetJsonRegex = /^\/?Date\((-?\d+)/i, rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, obsOffsets = {
  UT: 0,
  GMT: 0,
  EDT: -4 * 60,
  EST: -5 * 60,
  CDT: -5 * 60,
  CST: -6 * 60,
  MDT: -6 * 60,
  MST: -7 * 60,
  PDT: -7 * 60,
  PST: -8 * 60
};
function configFromISO(config) {
  var i3, l2, string = config._i, match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string), allowTime, dateFormat, timeFormat, tzFormat, isoDatesLen = isoDates.length, isoTimesLen = isoTimes.length;
  if (match) {
    getParsingFlags(config).iso = true;
    for (i3 = 0, l2 = isoDatesLen; i3 < l2; i3++) {
      if (isoDates[i3][1].exec(match[1])) {
        dateFormat = isoDates[i3][0];
        allowTime = isoDates[i3][2] !== false;
        break;
      }
    }
    if (dateFormat == null) {
      config._isValid = false;
      return;
    }
    if (match[3]) {
      for (i3 = 0, l2 = isoTimesLen; i3 < l2; i3++) {
        if (isoTimes[i3][1].exec(match[3])) {
          timeFormat = (match[2] || " ") + isoTimes[i3][0];
          break;
        }
      }
      if (timeFormat == null) {
        config._isValid = false;
        return;
      }
    }
    if (!allowTime && timeFormat != null) {
      config._isValid = false;
      return;
    }
    if (match[4]) {
      if (tzRegex.exec(match[4])) {
        tzFormat = "Z";
      } else {
        config._isValid = false;
        return;
      }
    }
    config._f = dateFormat + (timeFormat || "") + (tzFormat || "");
    configFromStringAndFormat(config);
  } else {
    config._isValid = false;
  }
}
function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
  var result = [
    untruncateYear(yearStr),
    defaultLocaleMonthsShort.indexOf(monthStr),
    parseInt(dayStr, 10),
    parseInt(hourStr, 10),
    parseInt(minuteStr, 10)
  ];
  if (secondStr) {
    result.push(parseInt(secondStr, 10));
  }
  return result;
}
function untruncateYear(yearStr) {
  var year = parseInt(yearStr, 10);
  if (year <= 49) {
    return 2e3 + year;
  } else if (year <= 999) {
    return 1900 + year;
  }
  return year;
}
function preprocessRFC2822(s3) {
  return s3.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}
function checkWeekday(weekdayStr, parsedInput, config) {
  if (weekdayStr) {
    var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr), weekdayActual = new Date(
      parsedInput[0],
      parsedInput[1],
      parsedInput[2]
    ).getDay();
    if (weekdayProvided !== weekdayActual) {
      getParsingFlags(config).weekdayMismatch = true;
      config._isValid = false;
      return false;
    }
  }
  return true;
}
function calculateOffset(obsOffset, militaryOffset, numOffset) {
  if (obsOffset) {
    return obsOffsets[obsOffset];
  } else if (militaryOffset) {
    return 0;
  } else {
    var hm = parseInt(numOffset, 10), m2 = hm % 100, h2 = (hm - m2) / 100;
    return h2 * 60 + m2;
  }
}
function configFromRFC2822(config) {
  var match = rfc2822.exec(preprocessRFC2822(config._i)), parsedArray;
  if (match) {
    parsedArray = extractFromRFC2822Strings(
      match[4],
      match[3],
      match[2],
      match[5],
      match[6],
      match[7]
    );
    if (!checkWeekday(match[1], parsedArray, config)) {
      return;
    }
    config._a = parsedArray;
    config._tzm = calculateOffset(match[8], match[9], match[10]);
    config._d = createUTCDate.apply(null, config._a);
    config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
    getParsingFlags(config).rfc2822 = true;
  } else {
    config._isValid = false;
  }
}
function configFromString(config) {
  var matched = aspNetJsonRegex.exec(config._i);
  if (matched !== null) {
    config._d = /* @__PURE__ */ new Date(+matched[1]);
    return;
  }
  configFromISO(config);
  if (config._isValid === false) {
    delete config._isValid;
  } else {
    return;
  }
  configFromRFC2822(config);
  if (config._isValid === false) {
    delete config._isValid;
  } else {
    return;
  }
  if (config._strict) {
    config._isValid = false;
  } else {
    hooks.createFromInputFallback(config);
  }
}
hooks.createFromInputFallback = deprecate(
  "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
  function(config) {
    config._d = /* @__PURE__ */ new Date(config._i + (config._useUTC ? " UTC" : ""));
  }
);
function defaults(a2, b, c2) {
  if (a2 != null) {
    return a2;
  }
  if (b != null) {
    return b;
  }
  return c2;
}
function currentDateArray(config) {
  var nowValue = new Date(hooks.now());
  if (config._useUTC) {
    return [
      nowValue.getUTCFullYear(),
      nowValue.getUTCMonth(),
      nowValue.getUTCDate()
    ];
  }
  return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
}
function configFromArray(config) {
  var i3, date, input = [], currentDate, expectedWeekday, yearToUse;
  if (config._d) {
    return;
  }
  currentDate = currentDateArray(config);
  if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
    dayOfYearFromWeekInfo(config);
  }
  if (config._dayOfYear != null) {
    yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);
    if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
      getParsingFlags(config)._overflowDayOfYear = true;
    }
    date = createUTCDate(yearToUse, 0, config._dayOfYear);
    config._a[MONTH] = date.getUTCMonth();
    config._a[DATE] = date.getUTCDate();
  }
  for (i3 = 0; i3 < 3 && config._a[i3] == null; ++i3) {
    config._a[i3] = input[i3] = currentDate[i3];
  }
  for (; i3 < 7; i3++) {
    config._a[i3] = input[i3] = config._a[i3] == null ? i3 === 2 ? 1 : 0 : config._a[i3];
  }
  if (config._a[HOUR] === 24 && config._a[MINUTE] === 0 && config._a[SECOND] === 0 && config._a[MILLISECOND] === 0) {
    config._nextDay = true;
    config._a[HOUR] = 0;
  }
  config._d = (config._useUTC ? createUTCDate : createDate$1).apply(
    null,
    input
  );
  expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();
  if (config._tzm != null) {
    config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
  }
  if (config._nextDay) {
    config._a[HOUR] = 24;
  }
  if (config._w && typeof config._w.d !== "undefined" && config._w.d !== expectedWeekday) {
    getParsingFlags(config).weekdayMismatch = true;
  }
}
function dayOfYearFromWeekInfo(config) {
  var w2, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;
  w2 = config._w;
  if (w2.GG != null || w2.W != null || w2.E != null) {
    dow = 1;
    doy = 4;
    weekYear = defaults(
      w2.GG,
      config._a[YEAR],
      weekOfYear(createLocal(), 1, 4).year
    );
    week = defaults(w2.W, 1);
    weekday = defaults(w2.E, 1);
    if (weekday < 1 || weekday > 7) {
      weekdayOverflow = true;
    }
  } else {
    dow = config._locale._week.dow;
    doy = config._locale._week.doy;
    curWeek = weekOfYear(createLocal(), dow, doy);
    weekYear = defaults(w2.gg, config._a[YEAR], curWeek.year);
    week = defaults(w2.w, curWeek.week);
    if (w2.d != null) {
      weekday = w2.d;
      if (weekday < 0 || weekday > 6) {
        weekdayOverflow = true;
      }
    } else if (w2.e != null) {
      weekday = w2.e + dow;
      if (w2.e < 0 || w2.e > 6) {
        weekdayOverflow = true;
      }
    } else {
      weekday = dow;
    }
  }
  if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
    getParsingFlags(config)._overflowWeeks = true;
  } else if (weekdayOverflow != null) {
    getParsingFlags(config)._overflowWeekday = true;
  } else {
    temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
    config._a[YEAR] = temp.year;
    config._dayOfYear = temp.dayOfYear;
  }
}
hooks.ISO_8601 = function() {
};
hooks.RFC_2822 = function() {
};
function configFromStringAndFormat(config) {
  if (config._f === hooks.ISO_8601) {
    configFromISO(config);
    return;
  }
  if (config._f === hooks.RFC_2822) {
    configFromRFC2822(config);
    return;
  }
  config._a = [];
  getParsingFlags(config).empty = true;
  var string = "" + config._i, i3, parsedInput, tokens2, token2, skipped, stringLength = string.length, totalParsedInputLength = 0, era, tokenLen;
  tokens2 = expandFormat(config._f, config._locale).match(formattingTokens) || [];
  tokenLen = tokens2.length;
  for (i3 = 0; i3 < tokenLen; i3++) {
    token2 = tokens2[i3];
    parsedInput = (string.match(getParseRegexForToken(token2, config)) || [])[0];
    if (parsedInput) {
      skipped = string.substr(0, string.indexOf(parsedInput));
      if (skipped.length > 0) {
        getParsingFlags(config).unusedInput.push(skipped);
      }
      string = string.slice(
        string.indexOf(parsedInput) + parsedInput.length
      );
      totalParsedInputLength += parsedInput.length;
    }
    if (formatTokenFunctions[token2]) {
      if (parsedInput) {
        getParsingFlags(config).empty = false;
      } else {
        getParsingFlags(config).unusedTokens.push(token2);
      }
      addTimeToArrayFromToken(token2, parsedInput, config);
    } else if (config._strict && !parsedInput) {
      getParsingFlags(config).unusedTokens.push(token2);
    }
  }
  getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
  if (string.length > 0) {
    getParsingFlags(config).unusedInput.push(string);
  }
  if (config._a[HOUR] <= 12 && getParsingFlags(config).bigHour === true && config._a[HOUR] > 0) {
    getParsingFlags(config).bigHour = void 0;
  }
  getParsingFlags(config).parsedDateParts = config._a.slice(0);
  getParsingFlags(config).meridiem = config._meridiem;
  config._a[HOUR] = meridiemFixWrap(
    config._locale,
    config._a[HOUR],
    config._meridiem
  );
  era = getParsingFlags(config).era;
  if (era !== null) {
    config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR]);
  }
  configFromArray(config);
  checkOverflow(config);
}
function meridiemFixWrap(locale2, hour, meridiem2) {
  var isPm;
  if (meridiem2 == null) {
    return hour;
  }
  if (locale2.meridiemHour != null) {
    return locale2.meridiemHour(hour, meridiem2);
  } else if (locale2.isPM != null) {
    isPm = locale2.isPM(meridiem2);
    if (isPm && hour < 12) {
      hour += 12;
    }
    if (!isPm && hour === 12) {
      hour = 0;
    }
    return hour;
  } else {
    return hour;
  }
}
function configFromStringAndArray(config) {
  var tempConfig, bestMoment, scoreToBeat, i3, currentScore, validFormatFound, bestFormatIsValid = false, configfLen = config._f.length;
  if (configfLen === 0) {
    getParsingFlags(config).invalidFormat = true;
    config._d = /* @__PURE__ */ new Date(NaN);
    return;
  }
  for (i3 = 0; i3 < configfLen; i3++) {
    currentScore = 0;
    validFormatFound = false;
    tempConfig = copyConfig({}, config);
    if (config._useUTC != null) {
      tempConfig._useUTC = config._useUTC;
    }
    tempConfig._f = config._f[i3];
    configFromStringAndFormat(tempConfig);
    if (isValid(tempConfig)) {
      validFormatFound = true;
    }
    currentScore += getParsingFlags(tempConfig).charsLeftOver;
    currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
    getParsingFlags(tempConfig).score = currentScore;
    if (!bestFormatIsValid) {
      if (scoreToBeat == null || currentScore < scoreToBeat || validFormatFound) {
        scoreToBeat = currentScore;
        bestMoment = tempConfig;
        if (validFormatFound) {
          bestFormatIsValid = true;
        }
      }
    } else {
      if (currentScore < scoreToBeat) {
        scoreToBeat = currentScore;
        bestMoment = tempConfig;
      }
    }
  }
  extend(config, bestMoment || tempConfig);
}
function configFromObject(config) {
  if (config._d) {
    return;
  }
  var i3 = normalizeObjectUnits(config._i), dayOrDate = i3.day === void 0 ? i3.date : i3.day;
  config._a = map(
    [i3.year, i3.month, dayOrDate, i3.hour, i3.minute, i3.second, i3.millisecond],
    function(obj) {
      return obj && parseInt(obj, 10);
    }
  );
  configFromArray(config);
}
function createFromConfig(config) {
  var res = new Moment(checkOverflow(prepareConfig(config)));
  if (res._nextDay) {
    res.add(1, "d");
    res._nextDay = void 0;
  }
  return res;
}
function prepareConfig(config) {
  var input = config._i, format2 = config._f;
  config._locale = config._locale || getLocale(config._l);
  if (input === null || format2 === void 0 && input === "") {
    return createInvalid({ nullInput: true });
  }
  if (typeof input === "string") {
    config._i = input = config._locale.preparse(input);
  }
  if (isMoment(input)) {
    return new Moment(checkOverflow(input));
  } else if (isDate(input)) {
    config._d = input;
  } else if (isArray(format2)) {
    configFromStringAndArray(config);
  } else if (format2) {
    configFromStringAndFormat(config);
  } else {
    configFromInput(config);
  }
  if (!isValid(config)) {
    config._d = null;
  }
  return config;
}
function configFromInput(config) {
  var input = config._i;
  if (isUndefined(input)) {
    config._d = new Date(hooks.now());
  } else if (isDate(input)) {
    config._d = new Date(input.valueOf());
  } else if (typeof input === "string") {
    configFromString(config);
  } else if (isArray(input)) {
    config._a = map(input.slice(0), function(obj) {
      return parseInt(obj, 10);
    });
    configFromArray(config);
  } else if (isObject(input)) {
    configFromObject(config);
  } else if (isNumber(input)) {
    config._d = new Date(input);
  } else {
    hooks.createFromInputFallback(config);
  }
}
function createLocalOrUTC(input, format2, locale2, strict, isUTC) {
  var c2 = {};
  if (format2 === true || format2 === false) {
    strict = format2;
    format2 = void 0;
  }
  if (locale2 === true || locale2 === false) {
    strict = locale2;
    locale2 = void 0;
  }
  if (isObject(input) && isObjectEmpty(input) || isArray(input) && input.length === 0) {
    input = void 0;
  }
  c2._isAMomentObject = true;
  c2._useUTC = c2._isUTC = isUTC;
  c2._l = locale2;
  c2._i = input;
  c2._f = format2;
  c2._strict = strict;
  return createFromConfig(c2);
}
function createLocal(input, format2, locale2, strict) {
  return createLocalOrUTC(input, format2, locale2, strict, false);
}
var prototypeMin = deprecate(
  "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var other = createLocal.apply(null, arguments);
    if (this.isValid() && other.isValid()) {
      return other < this ? this : other;
    } else {
      return createInvalid();
    }
  }
), prototypeMax = deprecate(
  "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var other = createLocal.apply(null, arguments);
    if (this.isValid() && other.isValid()) {
      return other > this ? this : other;
    } else {
      return createInvalid();
    }
  }
);
function pickBy(fn, moments) {
  var res, i3;
  if (moments.length === 1 && isArray(moments[0])) {
    moments = moments[0];
  }
  if (!moments.length) {
    return createLocal();
  }
  res = moments[0];
  for (i3 = 1; i3 < moments.length; ++i3) {
    if (!moments[i3].isValid() || moments[i3][fn](res)) {
      res = moments[i3];
    }
  }
  return res;
}
function min() {
  var args = [].slice.call(arguments, 0);
  return pickBy("isBefore", args);
}
function max() {
  var args = [].slice.call(arguments, 0);
  return pickBy("isAfter", args);
}
var now = function() {
  return Date.now ? Date.now() : +/* @__PURE__ */ new Date();
};
var ordering = [
  "year",
  "quarter",
  "month",
  "week",
  "day",
  "hour",
  "minute",
  "second",
  "millisecond"
];
function isDurationValid(m2) {
  var key, unitHasDecimal = false, i3, orderLen = ordering.length;
  for (key in m2) {
    if (hasOwnProp(m2, key) && !(indexOf.call(ordering, key) !== -1 && (m2[key] == null || !isNaN(m2[key])))) {
      return false;
    }
  }
  for (i3 = 0; i3 < orderLen; ++i3) {
    if (m2[ordering[i3]]) {
      if (unitHasDecimal) {
        return false;
      }
      if (parseFloat(m2[ordering[i3]]) !== toInt(m2[ordering[i3]])) {
        unitHasDecimal = true;
      }
    }
  }
  return true;
}
function isValid$1() {
  return this._isValid;
}
function createInvalid$1() {
  return createDuration(NaN);
}
function Duration(duration) {
  var normalizedInput = normalizeObjectUnits(duration), years2 = normalizedInput.year || 0, quarters = normalizedInput.quarter || 0, months2 = normalizedInput.month || 0, weeks2 = normalizedInput.week || normalizedInput.isoWeek || 0, days2 = normalizedInput.day || 0, hours2 = normalizedInput.hour || 0, minutes2 = normalizedInput.minute || 0, seconds2 = normalizedInput.second || 0, milliseconds2 = normalizedInput.millisecond || 0;
  this._isValid = isDurationValid(normalizedInput);
  this._milliseconds = +milliseconds2 + seconds2 * 1e3 + // 1000
  minutes2 * 6e4 + // 1000 * 60
  hours2 * 1e3 * 60 * 60;
  this._days = +days2 + weeks2 * 7;
  this._months = +months2 + quarters * 3 + years2 * 12;
  this._data = {};
  this._locale = getLocale();
  this._bubble();
}
function isDuration(obj) {
  return obj instanceof Duration;
}
function absRound(number) {
  if (number < 0) {
    return Math.round(-1 * number) * -1;
  } else {
    return Math.round(number);
  }
}
function compareArrays(array1, array2, dontConvert) {
  var len = Math.min(array1.length, array2.length), lengthDiff = Math.abs(array1.length - array2.length), diffs = 0, i3;
  for (i3 = 0; i3 < len; i3++) {
    if (dontConvert && array1[i3] !== array2[i3] || !dontConvert && toInt(array1[i3]) !== toInt(array2[i3])) {
      diffs++;
    }
  }
  return diffs + lengthDiff;
}
function offset(token2, separator) {
  addFormatToken(token2, 0, 0, function() {
    var offset2 = this.utcOffset(), sign2 = "+";
    if (offset2 < 0) {
      offset2 = -offset2;
      sign2 = "-";
    }
    return sign2 + zeroFill(~~(offset2 / 60), 2) + separator + zeroFill(~~offset2 % 60, 2);
  });
}
offset("Z", ":");
offset("ZZ", "");
addRegexToken("Z", matchShortOffset);
addRegexToken("ZZ", matchShortOffset);
addParseToken(["Z", "ZZ"], function(input, array, config) {
  config._useUTC = true;
  config._tzm = offsetFromString(matchShortOffset, input);
});
var chunkOffset = /([\+\-]|\d\d)/gi;
function offsetFromString(matcher, string) {
  var matches = (string || "").match(matcher), chunk, parts, minutes2;
  if (matches === null) {
    return null;
  }
  chunk = matches[matches.length - 1] || [];
  parts = (chunk + "").match(chunkOffset) || ["-", 0, 0];
  minutes2 = +(parts[1] * 60) + toInt(parts[2]);
  return minutes2 === 0 ? 0 : parts[0] === "+" ? minutes2 : -minutes2;
}
function cloneWithOffset(input, model) {
  var res, diff2;
  if (model._isUTC) {
    res = model.clone();
    diff2 = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
    res._d.setTime(res._d.valueOf() + diff2);
    hooks.updateOffset(res, false);
    return res;
  } else {
    return createLocal(input).local();
  }
}
function getDateOffset(m2) {
  return -Math.round(m2._d.getTimezoneOffset());
}
hooks.updateOffset = function() {
};
function getSetOffset(input, keepLocalTime, keepMinutes) {
  var offset2 = this._offset || 0, localAdjust;
  if (!this.isValid()) {
    return input != null ? this : NaN;
  }
  if (input != null) {
    if (typeof input === "string") {
      input = offsetFromString(matchShortOffset, input);
      if (input === null) {
        return this;
      }
    } else if (Math.abs(input) < 16 && !keepMinutes) {
      input = input * 60;
    }
    if (!this._isUTC && keepLocalTime) {
      localAdjust = getDateOffset(this);
    }
    this._offset = input;
    this._isUTC = true;
    if (localAdjust != null) {
      this.add(localAdjust, "m");
    }
    if (offset2 !== input) {
      if (!keepLocalTime || this._changeInProgress) {
        addSubtract(
          this,
          createDuration(input - offset2, "m"),
          1,
          false
        );
      } else if (!this._changeInProgress) {
        this._changeInProgress = true;
        hooks.updateOffset(this, true);
        this._changeInProgress = null;
      }
    }
    return this;
  } else {
    return this._isUTC ? offset2 : getDateOffset(this);
  }
}
function getSetZone(input, keepLocalTime) {
  if (input != null) {
    if (typeof input !== "string") {
      input = -input;
    }
    this.utcOffset(input, keepLocalTime);
    return this;
  } else {
    return -this.utcOffset();
  }
}
function setOffsetToUTC(keepLocalTime) {
  return this.utcOffset(0, keepLocalTime);
}
function setOffsetToLocal(keepLocalTime) {
  if (this._isUTC) {
    this.utcOffset(0, keepLocalTime);
    this._isUTC = false;
    if (keepLocalTime) {
      this.subtract(getDateOffset(this), "m");
    }
  }
  return this;
}
function setOffsetToParsedOffset() {
  if (this._tzm != null) {
    this.utcOffset(this._tzm, false, true);
  } else if (typeof this._i === "string") {
    var tZone = offsetFromString(matchOffset, this._i);
    if (tZone != null) {
      this.utcOffset(tZone);
    } else {
      this.utcOffset(0, true);
    }
  }
  return this;
}
function hasAlignedHourOffset(input) {
  if (!this.isValid()) {
    return false;
  }
  input = input ? createLocal(input).utcOffset() : 0;
  return (this.utcOffset() - input) % 60 === 0;
}
function isDaylightSavingTime() {
  return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
}
function isDaylightSavingTimeShifted() {
  if (!isUndefined(this._isDSTShifted)) {
    return this._isDSTShifted;
  }
  var c2 = {}, other;
  copyConfig(c2, this);
  c2 = prepareConfig(c2);
  if (c2._a) {
    other = c2._isUTC ? createUTC(c2._a) : createLocal(c2._a);
    this._isDSTShifted = this.isValid() && compareArrays(c2._a, other.toArray()) > 0;
  } else {
    this._isDSTShifted = false;
  }
  return this._isDSTShifted;
}
function isLocal() {
  return this.isValid() ? !this._isUTC : false;
}
function isUtcOffset() {
  return this.isValid() ? this._isUTC : false;
}
function isUtc() {
  return this.isValid() ? this._isUTC && this._offset === 0 : false;
}
var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
function createDuration(input, key) {
  var duration = input, match = null, sign2, ret, diffRes;
  if (isDuration(input)) {
    duration = {
      ms: input._milliseconds,
      d: input._days,
      M: input._months
    };
  } else if (isNumber(input) || !isNaN(+input)) {
    duration = {};
    if (key) {
      duration[key] = +input;
    } else {
      duration.milliseconds = +input;
    }
  } else if (match = aspNetRegex.exec(input)) {
    sign2 = match[1] === "-" ? -1 : 1;
    duration = {
      y: 0,
      d: toInt(match[DATE]) * sign2,
      h: toInt(match[HOUR]) * sign2,
      m: toInt(match[MINUTE]) * sign2,
      s: toInt(match[SECOND]) * sign2,
      ms: toInt(absRound(match[MILLISECOND] * 1e3)) * sign2
      // the millisecond decimal point is included in the match
    };
  } else if (match = isoRegex.exec(input)) {
    sign2 = match[1] === "-" ? -1 : 1;
    duration = {
      y: parseIso(match[2], sign2),
      M: parseIso(match[3], sign2),
      w: parseIso(match[4], sign2),
      d: parseIso(match[5], sign2),
      h: parseIso(match[6], sign2),
      m: parseIso(match[7], sign2),
      s: parseIso(match[8], sign2)
    };
  } else if (duration == null) {
    duration = {};
  } else if (typeof duration === "object" && ("from" in duration || "to" in duration)) {
    diffRes = momentsDifference(
      createLocal(duration.from),
      createLocal(duration.to)
    );
    duration = {};
    duration.ms = diffRes.milliseconds;
    duration.M = diffRes.months;
  }
  ret = new Duration(duration);
  if (isDuration(input) && hasOwnProp(input, "_locale")) {
    ret._locale = input._locale;
  }
  if (isDuration(input) && hasOwnProp(input, "_isValid")) {
    ret._isValid = input._isValid;
  }
  return ret;
}
createDuration.fn = Duration.prototype;
createDuration.invalid = createInvalid$1;
function parseIso(inp, sign2) {
  var res = inp && parseFloat(inp.replace(",", "."));
  return (isNaN(res) ? 0 : res) * sign2;
}
function positiveMomentsDifference(base, other) {
  var res = {};
  res.months = other.month() - base.month() + (other.year() - base.year()) * 12;
  if (base.clone().add(res.months, "M").isAfter(other)) {
    --res.months;
  }
  res.milliseconds = +other - +base.clone().add(res.months, "M");
  return res;
}
function momentsDifference(base, other) {
  var res;
  if (!(base.isValid() && other.isValid())) {
    return { milliseconds: 0, months: 0 };
  }
  other = cloneWithOffset(other, base);
  if (base.isBefore(other)) {
    res = positiveMomentsDifference(base, other);
  } else {
    res = positiveMomentsDifference(other, base);
    res.milliseconds = -res.milliseconds;
    res.months = -res.months;
  }
  return res;
}
function createAdder(direction, name) {
  return function(val, period) {
    var dur, tmp;
    if (period !== null && !isNaN(+period)) {
      deprecateSimple(
        name,
        "moment()." + name + "(period, number) is deprecated. Please use moment()." + name + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
      );
      tmp = val;
      val = period;
      period = tmp;
    }
    dur = createDuration(val, period);
    addSubtract(this, dur, direction);
    return this;
  };
}
function addSubtract(mom, duration, isAdding, updateOffset) {
  var milliseconds2 = duration._milliseconds, days2 = absRound(duration._days), months2 = absRound(duration._months);
  if (!mom.isValid()) {
    return;
  }
  updateOffset = updateOffset == null ? true : updateOffset;
  if (months2) {
    setMonth(mom, get(mom, "Month") + months2 * isAdding);
  }
  if (days2) {
    set$1(mom, "Date", get(mom, "Date") + days2 * isAdding);
  }
  if (milliseconds2) {
    mom._d.setTime(mom._d.valueOf() + milliseconds2 * isAdding);
  }
  if (updateOffset) {
    hooks.updateOffset(mom, days2 || months2);
  }
}
var add = createAdder(1, "add"), subtract = createAdder(-1, "subtract");
function isString(input) {
  return typeof input === "string" || input instanceof String;
}
function isMomentInput(input) {
  return isMoment(input) || isDate(input) || isString(input) || isNumber(input) || isNumberOrStringArray(input) || isMomentInputObject(input) || input === null || input === void 0;
}
function isMomentInputObject(input) {
  var objectTest = isObject(input) && !isObjectEmpty(input), propertyTest = false, properties = [
    "years",
    "year",
    "y",
    "months",
    "month",
    "M",
    "days",
    "day",
    "d",
    "dates",
    "date",
    "D",
    "hours",
    "hour",
    "h",
    "minutes",
    "minute",
    "m",
    "seconds",
    "second",
    "s",
    "milliseconds",
    "millisecond",
    "ms"
  ], i3, property, propertyLen = properties.length;
  for (i3 = 0; i3 < propertyLen; i3 += 1) {
    property = properties[i3];
    propertyTest = propertyTest || hasOwnProp(input, property);
  }
  return objectTest && propertyTest;
}
function isNumberOrStringArray(input) {
  var arrayTest = isArray(input), dataTypeTest = false;
  if (arrayTest) {
    dataTypeTest = input.filter(function(item) {
      return !isNumber(item) && isString(input);
    }).length === 0;
  }
  return arrayTest && dataTypeTest;
}
function isCalendarSpec(input) {
  var objectTest = isObject(input) && !isObjectEmpty(input), propertyTest = false, properties = [
    "sameDay",
    "nextDay",
    "lastDay",
    "nextWeek",
    "lastWeek",
    "sameElse"
  ], i3, property;
  for (i3 = 0; i3 < properties.length; i3 += 1) {
    property = properties[i3];
    propertyTest = propertyTest || hasOwnProp(input, property);
  }
  return objectTest && propertyTest;
}
function getCalendarFormat(myMoment, now2) {
  var diff2 = myMoment.diff(now2, "days", true);
  return diff2 < -6 ? "sameElse" : diff2 < -1 ? "lastWeek" : diff2 < 0 ? "lastDay" : diff2 < 1 ? "sameDay" : diff2 < 2 ? "nextDay" : diff2 < 7 ? "nextWeek" : "sameElse";
}
function calendar$1(time, formats) {
  if (arguments.length === 1) {
    if (!arguments[0]) {
      time = void 0;
      formats = void 0;
    } else if (isMomentInput(arguments[0])) {
      time = arguments[0];
      formats = void 0;
    } else if (isCalendarSpec(arguments[0])) {
      formats = arguments[0];
      time = void 0;
    }
  }
  var now2 = time || createLocal(), sod = cloneWithOffset(now2, this).startOf("day"), format2 = hooks.calendarFormat(this, sod) || "sameElse", output = formats && (isFunction(formats[format2]) ? formats[format2].call(this, now2) : formats[format2]);
  return this.format(
    output || this.localeData().calendar(format2, this, createLocal(now2))
  );
}
function clone() {
  return new Moment(this);
}
function isAfter(input, units) {
  var localInput = isMoment(input) ? input : createLocal(input);
  if (!(this.isValid() && localInput.isValid())) {
    return false;
  }
  units = normalizeUnits(units) || "millisecond";
  if (units === "millisecond") {
    return this.valueOf() > localInput.valueOf();
  } else {
    return localInput.valueOf() < this.clone().startOf(units).valueOf();
  }
}
function isBefore(input, units) {
  var localInput = isMoment(input) ? input : createLocal(input);
  if (!(this.isValid() && localInput.isValid())) {
    return false;
  }
  units = normalizeUnits(units) || "millisecond";
  if (units === "millisecond") {
    return this.valueOf() < localInput.valueOf();
  } else {
    return this.clone().endOf(units).valueOf() < localInput.valueOf();
  }
}
function isBetween(from2, to2, units, inclusivity) {
  var localFrom = isMoment(from2) ? from2 : createLocal(from2), localTo = isMoment(to2) ? to2 : createLocal(to2);
  if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
    return false;
  }
  inclusivity = inclusivity || "()";
  return (inclusivity[0] === "(" ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) && (inclusivity[1] === ")" ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
}
function isSame(input, units) {
  var localInput = isMoment(input) ? input : createLocal(input), inputMs;
  if (!(this.isValid() && localInput.isValid())) {
    return false;
  }
  units = normalizeUnits(units) || "millisecond";
  if (units === "millisecond") {
    return this.valueOf() === localInput.valueOf();
  } else {
    inputMs = localInput.valueOf();
    return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
  }
}
function isSameOrAfter(input, units) {
  return this.isSame(input, units) || this.isAfter(input, units);
}
function isSameOrBefore(input, units) {
  return this.isSame(input, units) || this.isBefore(input, units);
}
function diff(input, units, asFloat) {
  var that, zoneDelta, output;
  if (!this.isValid()) {
    return NaN;
  }
  that = cloneWithOffset(input, this);
  if (!that.isValid()) {
    return NaN;
  }
  zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
  units = normalizeUnits(units);
  switch (units) {
    case "year":
      output = monthDiff(this, that) / 12;
      break;
    case "month":
      output = monthDiff(this, that);
      break;
    case "quarter":
      output = monthDiff(this, that) / 3;
      break;
    case "second":
      output = (this - that) / 1e3;
      break;
    case "minute":
      output = (this - that) / 6e4;
      break;
    case "hour":
      output = (this - that) / 36e5;
      break;
    case "day":
      output = (this - that - zoneDelta) / 864e5;
      break;
    case "week":
      output = (this - that - zoneDelta) / 6048e5;
      break;
    default:
      output = this - that;
  }
  return asFloat ? output : absFloor(output);
}
function monthDiff(a2, b) {
  if (a2.date() < b.date()) {
    return -monthDiff(b, a2);
  }
  var wholeMonthDiff = (b.year() - a2.year()) * 12 + (b.month() - a2.month()), anchor = a2.clone().add(wholeMonthDiff, "months"), anchor2, adjust;
  if (b - anchor < 0) {
    anchor2 = a2.clone().add(wholeMonthDiff - 1, "months");
    adjust = (b - anchor) / (anchor - anchor2);
  } else {
    anchor2 = a2.clone().add(wholeMonthDiff + 1, "months");
    adjust = (b - anchor) / (anchor2 - anchor);
  }
  return -(wholeMonthDiff + adjust) || 0;
}
hooks.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
hooks.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
function toString() {
  return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}
function toISOString(keepOffset) {
  if (!this.isValid()) {
    return null;
  }
  var utc = keepOffset !== true, m2 = utc ? this.clone().utc() : this;
  if (m2.year() < 0 || m2.year() > 9999) {
    return formatMoment(
      m2,
      utc ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
    );
  }
  if (isFunction(Date.prototype.toISOString)) {
    if (utc) {
      return this.toDate().toISOString();
    } else {
      return new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", formatMoment(m2, "Z"));
    }
  }
  return formatMoment(
    m2,
    utc ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
  );
}
function inspect() {
  if (!this.isValid()) {
    return "moment.invalid(/* " + this._i + " */)";
  }
  var func = "moment", zone = "", prefix, year, datetime, suffix;
  if (!this.isLocal()) {
    func = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone";
    zone = "Z";
  }
  prefix = "[" + func + '("]';
  year = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY";
  datetime = "-MM-DD[T]HH:mm:ss.SSS";
  suffix = zone + '[")]';
  return this.format(prefix + year + datetime + suffix);
}
function format(inputString) {
  if (!inputString) {
    inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
  }
  var output = formatMoment(this, inputString);
  return this.localeData().postformat(output);
}
function from(time, withoutSuffix) {
  if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
    return createDuration({ to: this, from: time }).locale(this.locale()).humanize(!withoutSuffix);
  } else {
    return this.localeData().invalidDate();
  }
}
function fromNow(withoutSuffix) {
  return this.from(createLocal(), withoutSuffix);
}
function to(time, withoutSuffix) {
  if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
    return createDuration({ from: this, to: time }).locale(this.locale()).humanize(!withoutSuffix);
  } else {
    return this.localeData().invalidDate();
  }
}
function toNow(withoutSuffix) {
  return this.to(createLocal(), withoutSuffix);
}
function locale(key) {
  var newLocaleData;
  if (key === void 0) {
    return this._locale._abbr;
  } else {
    newLocaleData = getLocale(key);
    if (newLocaleData != null) {
      this._locale = newLocaleData;
    }
    return this;
  }
}
var lang = deprecate(
  "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
  function(key) {
    if (key === void 0) {
      return this.localeData();
    } else {
      return this.locale(key);
    }
  }
);
function localeData() {
  return this._locale;
}
var MS_PER_SECOND = 1e3, MS_PER_MINUTE = 60 * MS_PER_SECOND, MS_PER_HOUR = 60 * MS_PER_MINUTE, MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;
function mod$1(dividend, divisor) {
  return (dividend % divisor + divisor) % divisor;
}
function localStartOfDate(y2, m2, d3) {
  if (y2 < 100 && y2 >= 0) {
    return new Date(y2 + 400, m2, d3) - MS_PER_400_YEARS;
  } else {
    return new Date(y2, m2, d3).valueOf();
  }
}
function utcStartOfDate(y2, m2, d3) {
  if (y2 < 100 && y2 >= 0) {
    return Date.UTC(y2 + 400, m2, d3) - MS_PER_400_YEARS;
  } else {
    return Date.UTC(y2, m2, d3);
  }
}
function startOf(units) {
  var time, startOfDate;
  units = normalizeUnits(units);
  if (units === void 0 || units === "millisecond" || !this.isValid()) {
    return this;
  }
  startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
  switch (units) {
    case "year":
      time = startOfDate(this.year(), 0, 1);
      break;
    case "quarter":
      time = startOfDate(
        this.year(),
        this.month() - this.month() % 3,
        1
      );
      break;
    case "month":
      time = startOfDate(this.year(), this.month(), 1);
      break;
    case "week":
      time = startOfDate(
        this.year(),
        this.month(),
        this.date() - this.weekday()
      );
      break;
    case "isoWeek":
      time = startOfDate(
        this.year(),
        this.month(),
        this.date() - (this.isoWeekday() - 1)
      );
      break;
    case "day":
    case "date":
      time = startOfDate(this.year(), this.month(), this.date());
      break;
    case "hour":
      time = this._d.valueOf();
      time -= mod$1(
        time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
        MS_PER_HOUR
      );
      break;
    case "minute":
      time = this._d.valueOf();
      time -= mod$1(time, MS_PER_MINUTE);
      break;
    case "second":
      time = this._d.valueOf();
      time -= mod$1(time, MS_PER_SECOND);
      break;
  }
  this._d.setTime(time);
  hooks.updateOffset(this, true);
  return this;
}
function endOf(units) {
  var time, startOfDate;
  units = normalizeUnits(units);
  if (units === void 0 || units === "millisecond" || !this.isValid()) {
    return this;
  }
  startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
  switch (units) {
    case "year":
      time = startOfDate(this.year() + 1, 0, 1) - 1;
      break;
    case "quarter":
      time = startOfDate(
        this.year(),
        this.month() - this.month() % 3 + 3,
        1
      ) - 1;
      break;
    case "month":
      time = startOfDate(this.year(), this.month() + 1, 1) - 1;
      break;
    case "week":
      time = startOfDate(
        this.year(),
        this.month(),
        this.date() - this.weekday() + 7
      ) - 1;
      break;
    case "isoWeek":
      time = startOfDate(
        this.year(),
        this.month(),
        this.date() - (this.isoWeekday() - 1) + 7
      ) - 1;
      break;
    case "day":
    case "date":
      time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
      break;
    case "hour":
      time = this._d.valueOf();
      time += MS_PER_HOUR - mod$1(
        time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
        MS_PER_HOUR
      ) - 1;
      break;
    case "minute":
      time = this._d.valueOf();
      time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
      break;
    case "second":
      time = this._d.valueOf();
      time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
      break;
  }
  this._d.setTime(time);
  hooks.updateOffset(this, true);
  return this;
}
function valueOf() {
  return this._d.valueOf() - (this._offset || 0) * 6e4;
}
function unix() {
  return Math.floor(this.valueOf() / 1e3);
}
function toDate() {
  return new Date(this.valueOf());
}
function toArray() {
  var m2 = this;
  return [
    m2.year(),
    m2.month(),
    m2.date(),
    m2.hour(),
    m2.minute(),
    m2.second(),
    m2.millisecond()
  ];
}
function toObject() {
  var m2 = this;
  return {
    years: m2.year(),
    months: m2.month(),
    date: m2.date(),
    hours: m2.hours(),
    minutes: m2.minutes(),
    seconds: m2.seconds(),
    milliseconds: m2.milliseconds()
  };
}
function toJSON() {
  return this.isValid() ? this.toISOString() : null;
}
function isValid$2() {
  return isValid(this);
}
function parsingFlags() {
  return extend({}, getParsingFlags(this));
}
function invalidAt() {
  return getParsingFlags(this).overflow;
}
function creationData() {
  return {
    input: this._i,
    format: this._f,
    locale: this._locale,
    isUTC: this._isUTC,
    strict: this._strict
  };
}
addFormatToken("N", 0, 0, "eraAbbr");
addFormatToken("NN", 0, 0, "eraAbbr");
addFormatToken("NNN", 0, 0, "eraAbbr");
addFormatToken("NNNN", 0, 0, "eraName");
addFormatToken("NNNNN", 0, 0, "eraNarrow");
addFormatToken("y", ["y", 1], "yo", "eraYear");
addFormatToken("y", ["yy", 2], 0, "eraYear");
addFormatToken("y", ["yyy", 3], 0, "eraYear");
addFormatToken("y", ["yyyy", 4], 0, "eraYear");
addRegexToken("N", matchEraAbbr);
addRegexToken("NN", matchEraAbbr);
addRegexToken("NNN", matchEraAbbr);
addRegexToken("NNNN", matchEraName);
addRegexToken("NNNNN", matchEraNarrow);
addParseToken(
  ["N", "NN", "NNN", "NNNN", "NNNNN"],
  function(input, array, config, token2) {
    var era = config._locale.erasParse(input, token2, config._strict);
    if (era) {
      getParsingFlags(config).era = era;
    } else {
      getParsingFlags(config).invalidEra = input;
    }
  }
);
addRegexToken("y", matchUnsigned);
addRegexToken("yy", matchUnsigned);
addRegexToken("yyy", matchUnsigned);
addRegexToken("yyyy", matchUnsigned);
addRegexToken("yo", matchEraYearOrdinal);
addParseToken(["y", "yy", "yyy", "yyyy"], YEAR);
addParseToken(["yo"], function(input, array, config, token2) {
  var match;
  if (config._locale._eraYearOrdinalRegex) {
    match = input.match(config._locale._eraYearOrdinalRegex);
  }
  if (config._locale.eraYearOrdinalParse) {
    array[YEAR] = config._locale.eraYearOrdinalParse(input, match);
  } else {
    array[YEAR] = parseInt(input, 10);
  }
});
function localeEras(m2, format2) {
  var i3, l2, date, eras = this._eras || getLocale("en")._eras;
  for (i3 = 0, l2 = eras.length; i3 < l2; ++i3) {
    switch (typeof eras[i3].since) {
      case "string":
        date = hooks(eras[i3].since).startOf("day");
        eras[i3].since = date.valueOf();
        break;
    }
    switch (typeof eras[i3].until) {
      case "undefined":
        eras[i3].until = Infinity;
        break;
      case "string":
        date = hooks(eras[i3].until).startOf("day").valueOf();
        eras[i3].until = date.valueOf();
        break;
    }
  }
  return eras;
}
function localeErasParse(eraName, format2, strict) {
  var i3, l2, eras = this.eras(), name, abbr, narrow;
  eraName = eraName.toUpperCase();
  for (i3 = 0, l2 = eras.length; i3 < l2; ++i3) {
    name = eras[i3].name.toUpperCase();
    abbr = eras[i3].abbr.toUpperCase();
    narrow = eras[i3].narrow.toUpperCase();
    if (strict) {
      switch (format2) {
        case "N":
        case "NN":
        case "NNN":
          if (abbr === eraName) {
            return eras[i3];
          }
          break;
        case "NNNN":
          if (name === eraName) {
            return eras[i3];
          }
          break;
        case "NNNNN":
          if (narrow === eraName) {
            return eras[i3];
          }
          break;
      }
    } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
      return eras[i3];
    }
  }
}
function localeErasConvertYear(era, year) {
  var dir = era.since <= era.until ? 1 : -1;
  if (year === void 0) {
    return hooks(era.since).year();
  } else {
    return hooks(era.since).year() + (year - era.offset) * dir;
  }
}
function getEraName() {
  var i3, l2, val, eras = this.localeData().eras();
  for (i3 = 0, l2 = eras.length; i3 < l2; ++i3) {
    val = this.clone().startOf("day").valueOf();
    if (eras[i3].since <= val && val <= eras[i3].until) {
      return eras[i3].name;
    }
    if (eras[i3].until <= val && val <= eras[i3].since) {
      return eras[i3].name;
    }
  }
  return "";
}
function getEraNarrow() {
  var i3, l2, val, eras = this.localeData().eras();
  for (i3 = 0, l2 = eras.length; i3 < l2; ++i3) {
    val = this.clone().startOf("day").valueOf();
    if (eras[i3].since <= val && val <= eras[i3].until) {
      return eras[i3].narrow;
    }
    if (eras[i3].until <= val && val <= eras[i3].since) {
      return eras[i3].narrow;
    }
  }
  return "";
}
function getEraAbbr() {
  var i3, l2, val, eras = this.localeData().eras();
  for (i3 = 0, l2 = eras.length; i3 < l2; ++i3) {
    val = this.clone().startOf("day").valueOf();
    if (eras[i3].since <= val && val <= eras[i3].until) {
      return eras[i3].abbr;
    }
    if (eras[i3].until <= val && val <= eras[i3].since) {
      return eras[i3].abbr;
    }
  }
  return "";
}
function getEraYear() {
  var i3, l2, dir, val, eras = this.localeData().eras();
  for (i3 = 0, l2 = eras.length; i3 < l2; ++i3) {
    dir = eras[i3].since <= eras[i3].until ? 1 : -1;
    val = this.clone().startOf("day").valueOf();
    if (eras[i3].since <= val && val <= eras[i3].until || eras[i3].until <= val && val <= eras[i3].since) {
      return (this.year() - hooks(eras[i3].since).year()) * dir + eras[i3].offset;
    }
  }
  return this.year();
}
function erasNameRegex(isStrict) {
  if (!hasOwnProp(this, "_erasNameRegex")) {
    computeErasParse.call(this);
  }
  return isStrict ? this._erasNameRegex : this._erasRegex;
}
function erasAbbrRegex(isStrict) {
  if (!hasOwnProp(this, "_erasAbbrRegex")) {
    computeErasParse.call(this);
  }
  return isStrict ? this._erasAbbrRegex : this._erasRegex;
}
function erasNarrowRegex(isStrict) {
  if (!hasOwnProp(this, "_erasNarrowRegex")) {
    computeErasParse.call(this);
  }
  return isStrict ? this._erasNarrowRegex : this._erasRegex;
}
function matchEraAbbr(isStrict, locale2) {
  return locale2.erasAbbrRegex(isStrict);
}
function matchEraName(isStrict, locale2) {
  return locale2.erasNameRegex(isStrict);
}
function matchEraNarrow(isStrict, locale2) {
  return locale2.erasNarrowRegex(isStrict);
}
function matchEraYearOrdinal(isStrict, locale2) {
  return locale2._eraYearOrdinalRegex || matchUnsigned;
}
function computeErasParse() {
  var abbrPieces = [], namePieces = [], narrowPieces = [], mixedPieces = [], i3, l2, eras = this.eras();
  for (i3 = 0, l2 = eras.length; i3 < l2; ++i3) {
    namePieces.push(regexEscape(eras[i3].name));
    abbrPieces.push(regexEscape(eras[i3].abbr));
    narrowPieces.push(regexEscape(eras[i3].narrow));
    mixedPieces.push(regexEscape(eras[i3].name));
    mixedPieces.push(regexEscape(eras[i3].abbr));
    mixedPieces.push(regexEscape(eras[i3].narrow));
  }
  this._erasRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
  this._erasNameRegex = new RegExp("^(" + namePieces.join("|") + ")", "i");
  this._erasAbbrRegex = new RegExp("^(" + abbrPieces.join("|") + ")", "i");
  this._erasNarrowRegex = new RegExp(
    "^(" + narrowPieces.join("|") + ")",
    "i"
  );
}
addFormatToken(0, ["gg", 2], 0, function() {
  return this.weekYear() % 100;
});
addFormatToken(0, ["GG", 2], 0, function() {
  return this.isoWeekYear() % 100;
});
function addWeekYearFormatToken(token2, getter) {
  addFormatToken(0, [token2, token2.length], 0, getter);
}
addWeekYearFormatToken("gggg", "weekYear");
addWeekYearFormatToken("ggggg", "weekYear");
addWeekYearFormatToken("GGGG", "isoWeekYear");
addWeekYearFormatToken("GGGGG", "isoWeekYear");
addUnitAlias("weekYear", "gg");
addUnitAlias("isoWeekYear", "GG");
addUnitPriority("weekYear", 1);
addUnitPriority("isoWeekYear", 1);
addRegexToken("G", matchSigned);
addRegexToken("g", matchSigned);
addRegexToken("GG", match1to2, match2);
addRegexToken("gg", match1to2, match2);
addRegexToken("GGGG", match1to4, match4);
addRegexToken("gggg", match1to4, match4);
addRegexToken("GGGGG", match1to6, match6);
addRegexToken("ggggg", match1to6, match6);
addWeekParseToken(
  ["gggg", "ggggg", "GGGG", "GGGGG"],
  function(input, week, config, token2) {
    week[token2.substr(0, 2)] = toInt(input);
  }
);
addWeekParseToken(["gg", "GG"], function(input, week, config, token2) {
  week[token2] = hooks.parseTwoDigitYear(input);
});
function getSetWeekYear(input) {
  return getSetWeekYearHelper.call(
    this,
    input,
    this.week(),
    this.weekday(),
    this.localeData()._week.dow,
    this.localeData()._week.doy
  );
}
function getSetISOWeekYear(input) {
  return getSetWeekYearHelper.call(
    this,
    input,
    this.isoWeek(),
    this.isoWeekday(),
    1,
    4
  );
}
function getISOWeeksInYear() {
  return weeksInYear(this.year(), 1, 4);
}
function getISOWeeksInISOWeekYear() {
  return weeksInYear(this.isoWeekYear(), 1, 4);
}
function getWeeksInYear() {
  var weekInfo = this.localeData()._week;
  return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
}
function getWeeksInWeekYear() {
  var weekInfo = this.localeData()._week;
  return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
}
function getSetWeekYearHelper(input, week, weekday, dow, doy) {
  var weeksTarget;
  if (input == null) {
    return weekOfYear(this, dow, doy).year;
  } else {
    weeksTarget = weeksInYear(input, dow, doy);
    if (week > weeksTarget) {
      week = weeksTarget;
    }
    return setWeekAll.call(this, input, week, weekday, dow, doy);
  }
}
function setWeekAll(weekYear, week, weekday, dow, doy) {
  var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy), date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
  this.year(date.getUTCFullYear());
  this.month(date.getUTCMonth());
  this.date(date.getUTCDate());
  return this;
}
addFormatToken("Q", 0, "Qo", "quarter");
addUnitAlias("quarter", "Q");
addUnitPriority("quarter", 7);
addRegexToken("Q", match1);
addParseToken("Q", function(input, array) {
  array[MONTH] = (toInt(input) - 1) * 3;
});
function getSetQuarter(input) {
  return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
}
addFormatToken("D", ["DD", 2], "Do", "date");
addUnitAlias("date", "D");
addUnitPriority("date", 9);
addRegexToken("D", match1to2);
addRegexToken("DD", match1to2, match2);
addRegexToken("Do", function(isStrict, locale2) {
  return isStrict ? locale2._dayOfMonthOrdinalParse || locale2._ordinalParse : locale2._dayOfMonthOrdinalParseLenient;
});
addParseToken(["D", "DD"], DATE);
addParseToken("Do", function(input, array) {
  array[DATE] = toInt(input.match(match1to2)[0]);
});
var getSetDayOfMonth = makeGetSet("Date", true);
addFormatToken("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
addUnitAlias("dayOfYear", "DDD");
addUnitPriority("dayOfYear", 4);
addRegexToken("DDD", match1to3);
addRegexToken("DDDD", match3);
addParseToken(["DDD", "DDDD"], function(input, array, config) {
  config._dayOfYear = toInt(input);
});
function getSetDayOfYear(input) {
  var dayOfYear = Math.round(
    (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
  ) + 1;
  return input == null ? dayOfYear : this.add(input - dayOfYear, "d");
}
addFormatToken("m", ["mm", 2], 0, "minute");
addUnitAlias("minute", "m");
addUnitPriority("minute", 14);
addRegexToken("m", match1to2);
addRegexToken("mm", match1to2, match2);
addParseToken(["m", "mm"], MINUTE);
var getSetMinute = makeGetSet("Minutes", false);
addFormatToken("s", ["ss", 2], 0, "second");
addUnitAlias("second", "s");
addUnitPriority("second", 15);
addRegexToken("s", match1to2);
addRegexToken("ss", match1to2, match2);
addParseToken(["s", "ss"], SECOND);
var getSetSecond = makeGetSet("Seconds", false);
addFormatToken("S", 0, 0, function() {
  return ~~(this.millisecond() / 100);
});
addFormatToken(0, ["SS", 2], 0, function() {
  return ~~(this.millisecond() / 10);
});
addFormatToken(0, ["SSS", 3], 0, "millisecond");
addFormatToken(0, ["SSSS", 4], 0, function() {
  return this.millisecond() * 10;
});
addFormatToken(0, ["SSSSS", 5], 0, function() {
  return this.millisecond() * 100;
});
addFormatToken(0, ["SSSSSS", 6], 0, function() {
  return this.millisecond() * 1e3;
});
addFormatToken(0, ["SSSSSSS", 7], 0, function() {
  return this.millisecond() * 1e4;
});
addFormatToken(0, ["SSSSSSSS", 8], 0, function() {
  return this.millisecond() * 1e5;
});
addFormatToken(0, ["SSSSSSSSS", 9], 0, function() {
  return this.millisecond() * 1e6;
});
addUnitAlias("millisecond", "ms");
addUnitPriority("millisecond", 16);
addRegexToken("S", match1to3, match1);
addRegexToken("SS", match1to3, match2);
addRegexToken("SSS", match1to3, match3);
var token, getSetMillisecond;
for (token = "SSSS"; token.length <= 9; token += "S") {
  addRegexToken(token, matchUnsigned);
}
function parseMs(input, array) {
  array[MILLISECOND] = toInt(("0." + input) * 1e3);
}
for (token = "S"; token.length <= 9; token += "S") {
  addParseToken(token, parseMs);
}
getSetMillisecond = makeGetSet("Milliseconds", false);
addFormatToken("z", 0, 0, "zoneAbbr");
addFormatToken("zz", 0, 0, "zoneName");
function getZoneAbbr() {
  return this._isUTC ? "UTC" : "";
}
function getZoneName() {
  return this._isUTC ? "Coordinated Universal Time" : "";
}
var proto = Moment.prototype;
proto.add = add;
proto.calendar = calendar$1;
proto.clone = clone;
proto.diff = diff;
proto.endOf = endOf;
proto.format = format;
proto.from = from;
proto.fromNow = fromNow;
proto.to = to;
proto.toNow = toNow;
proto.get = stringGet;
proto.invalidAt = invalidAt;
proto.isAfter = isAfter;
proto.isBefore = isBefore;
proto.isBetween = isBetween;
proto.isSame = isSame;
proto.isSameOrAfter = isSameOrAfter;
proto.isSameOrBefore = isSameOrBefore;
proto.isValid = isValid$2;
proto.lang = lang;
proto.locale = locale;
proto.localeData = localeData;
proto.max = prototypeMax;
proto.min = prototypeMin;
proto.parsingFlags = parsingFlags;
proto.set = stringSet;
proto.startOf = startOf;
proto.subtract = subtract;
proto.toArray = toArray;
proto.toObject = toObject;
proto.toDate = toDate;
proto.toISOString = toISOString;
proto.inspect = inspect;
if (typeof Symbol !== "undefined" && Symbol.for != null) {
  proto[Symbol.for("nodejs.util.inspect.custom")] = function() {
    return "Moment<" + this.format() + ">";
  };
}
proto.toJSON = toJSON;
proto.toString = toString;
proto.unix = unix;
proto.valueOf = valueOf;
proto.creationData = creationData;
proto.eraName = getEraName;
proto.eraNarrow = getEraNarrow;
proto.eraAbbr = getEraAbbr;
proto.eraYear = getEraYear;
proto.year = getSetYear;
proto.isLeapYear = getIsLeapYear;
proto.weekYear = getSetWeekYear;
proto.isoWeekYear = getSetISOWeekYear;
proto.quarter = proto.quarters = getSetQuarter;
proto.month = getSetMonth;
proto.daysInMonth = getDaysInMonth;
proto.week = proto.weeks = getSetWeek;
proto.isoWeek = proto.isoWeeks = getSetISOWeek;
proto.weeksInYear = getWeeksInYear;
proto.weeksInWeekYear = getWeeksInWeekYear;
proto.isoWeeksInYear = getISOWeeksInYear;
proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
proto.date = getSetDayOfMonth;
proto.day = proto.days = getSetDayOfWeek;
proto.weekday = getSetLocaleDayOfWeek;
proto.isoWeekday = getSetISODayOfWeek;
proto.dayOfYear = getSetDayOfYear;
proto.hour = proto.hours = getSetHour;
proto.minute = proto.minutes = getSetMinute;
proto.second = proto.seconds = getSetSecond;
proto.millisecond = proto.milliseconds = getSetMillisecond;
proto.utcOffset = getSetOffset;
proto.utc = setOffsetToUTC;
proto.local = setOffsetToLocal;
proto.parseZone = setOffsetToParsedOffset;
proto.hasAlignedHourOffset = hasAlignedHourOffset;
proto.isDST = isDaylightSavingTime;
proto.isLocal = isLocal;
proto.isUtcOffset = isUtcOffset;
proto.isUtc = isUtc;
proto.isUTC = isUtc;
proto.zoneAbbr = getZoneAbbr;
proto.zoneName = getZoneName;
proto.dates = deprecate(
  "dates accessor is deprecated. Use date instead.",
  getSetDayOfMonth
);
proto.months = deprecate(
  "months accessor is deprecated. Use month instead",
  getSetMonth
);
proto.years = deprecate(
  "years accessor is deprecated. Use year instead",
  getSetYear
);
proto.zone = deprecate(
  "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
  getSetZone
);
proto.isDSTShifted = deprecate(
  "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
  isDaylightSavingTimeShifted
);
function createUnix(input) {
  return createLocal(input * 1e3);
}
function createInZone() {
  return createLocal.apply(null, arguments).parseZone();
}
function preParsePostFormat(string) {
  return string;
}
var proto$1 = Locale.prototype;
proto$1.calendar = calendar;
proto$1.longDateFormat = longDateFormat;
proto$1.invalidDate = invalidDate;
proto$1.ordinal = ordinal;
proto$1.preparse = preParsePostFormat;
proto$1.postformat = preParsePostFormat;
proto$1.relativeTime = relativeTime;
proto$1.pastFuture = pastFuture;
proto$1.set = set;
proto$1.eras = localeEras;
proto$1.erasParse = localeErasParse;
proto$1.erasConvertYear = localeErasConvertYear;
proto$1.erasAbbrRegex = erasAbbrRegex;
proto$1.erasNameRegex = erasNameRegex;
proto$1.erasNarrowRegex = erasNarrowRegex;
proto$1.months = localeMonths;
proto$1.monthsShort = localeMonthsShort;
proto$1.monthsParse = localeMonthsParse;
proto$1.monthsRegex = monthsRegex;
proto$1.monthsShortRegex = monthsShortRegex;
proto$1.week = localeWeek;
proto$1.firstDayOfYear = localeFirstDayOfYear;
proto$1.firstDayOfWeek = localeFirstDayOfWeek;
proto$1.weekdays = localeWeekdays;
proto$1.weekdaysMin = localeWeekdaysMin;
proto$1.weekdaysShort = localeWeekdaysShort;
proto$1.weekdaysParse = localeWeekdaysParse;
proto$1.weekdaysRegex = weekdaysRegex;
proto$1.weekdaysShortRegex = weekdaysShortRegex;
proto$1.weekdaysMinRegex = weekdaysMinRegex;
proto$1.isPM = localeIsPM;
proto$1.meridiem = localeMeridiem;
function get$1(format2, index2, field, setter) {
  var locale2 = getLocale(), utc = createUTC().set(setter, index2);
  return locale2[field](utc, format2);
}
function listMonthsImpl(format2, index2, field) {
  if (isNumber(format2)) {
    index2 = format2;
    format2 = void 0;
  }
  format2 = format2 || "";
  if (index2 != null) {
    return get$1(format2, index2, field, "month");
  }
  var i3, out = [];
  for (i3 = 0; i3 < 12; i3++) {
    out[i3] = get$1(format2, i3, field, "month");
  }
  return out;
}
function listWeekdaysImpl(localeSorted, format2, index2, field) {
  if (typeof localeSorted === "boolean") {
    if (isNumber(format2)) {
      index2 = format2;
      format2 = void 0;
    }
    format2 = format2 || "";
  } else {
    format2 = localeSorted;
    index2 = format2;
    localeSorted = false;
    if (isNumber(format2)) {
      index2 = format2;
      format2 = void 0;
    }
    format2 = format2 || "";
  }
  var locale2 = getLocale(), shift = localeSorted ? locale2._week.dow : 0, i3, out = [];
  if (index2 != null) {
    return get$1(format2, (index2 + shift) % 7, field, "day");
  }
  for (i3 = 0; i3 < 7; i3++) {
    out[i3] = get$1(format2, (i3 + shift) % 7, field, "day");
  }
  return out;
}
function listMonths(format2, index2) {
  return listMonthsImpl(format2, index2, "months");
}
function listMonthsShort(format2, index2) {
  return listMonthsImpl(format2, index2, "monthsShort");
}
function listWeekdays(localeSorted, format2, index2) {
  return listWeekdaysImpl(localeSorted, format2, index2, "weekdays");
}
function listWeekdaysShort(localeSorted, format2, index2) {
  return listWeekdaysImpl(localeSorted, format2, index2, "weekdaysShort");
}
function listWeekdaysMin(localeSorted, format2, index2) {
  return listWeekdaysImpl(localeSorted, format2, index2, "weekdaysMin");
}
getSetGlobalLocale("en", {
  eras: [
    {
      since: "0001-01-01",
      until: Infinity,
      offset: 1,
      name: "Anno Domini",
      narrow: "AD",
      abbr: "AD"
    },
    {
      since: "0000-12-31",
      until: -Infinity,
      offset: 1,
      name: "Before Christ",
      narrow: "BC",
      abbr: "BC"
    }
  ],
  dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
  ordinal: function(number) {
    var b = number % 10, output = toInt(number % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
    return number + output;
  }
});
hooks.lang = deprecate(
  "moment.lang is deprecated. Use moment.locale instead.",
  getSetGlobalLocale
);
hooks.langData = deprecate(
  "moment.langData is deprecated. Use moment.localeData instead.",
  getLocale
);
var mathAbs = Math.abs;
function abs() {
  var data = this._data;
  this._milliseconds = mathAbs(this._milliseconds);
  this._days = mathAbs(this._days);
  this._months = mathAbs(this._months);
  data.milliseconds = mathAbs(data.milliseconds);
  data.seconds = mathAbs(data.seconds);
  data.minutes = mathAbs(data.minutes);
  data.hours = mathAbs(data.hours);
  data.months = mathAbs(data.months);
  data.years = mathAbs(data.years);
  return this;
}
function addSubtract$1(duration, input, value, direction) {
  var other = createDuration(input, value);
  duration._milliseconds += direction * other._milliseconds;
  duration._days += direction * other._days;
  duration._months += direction * other._months;
  return duration._bubble();
}
function add$1(input, value) {
  return addSubtract$1(this, input, value, 1);
}
function subtract$1(input, value) {
  return addSubtract$1(this, input, value, -1);
}
function absCeil(number) {
  if (number < 0) {
    return Math.floor(number);
  } else {
    return Math.ceil(number);
  }
}
function bubble() {
  var milliseconds2 = this._milliseconds, days2 = this._days, months2 = this._months, data = this._data, seconds2, minutes2, hours2, years2, monthsFromDays;
  if (!(milliseconds2 >= 0 && days2 >= 0 && months2 >= 0 || milliseconds2 <= 0 && days2 <= 0 && months2 <= 0)) {
    milliseconds2 += absCeil(monthsToDays(months2) + days2) * 864e5;
    days2 = 0;
    months2 = 0;
  }
  data.milliseconds = milliseconds2 % 1e3;
  seconds2 = absFloor(milliseconds2 / 1e3);
  data.seconds = seconds2 % 60;
  minutes2 = absFloor(seconds2 / 60);
  data.minutes = minutes2 % 60;
  hours2 = absFloor(minutes2 / 60);
  data.hours = hours2 % 24;
  days2 += absFloor(hours2 / 24);
  monthsFromDays = absFloor(daysToMonths(days2));
  months2 += monthsFromDays;
  days2 -= absCeil(monthsToDays(monthsFromDays));
  years2 = absFloor(months2 / 12);
  months2 %= 12;
  data.days = days2;
  data.months = months2;
  data.years = years2;
  return this;
}
function daysToMonths(days2) {
  return days2 * 4800 / 146097;
}
function monthsToDays(months2) {
  return months2 * 146097 / 4800;
}
function as(units) {
  if (!this.isValid()) {
    return NaN;
  }
  var days2, months2, milliseconds2 = this._milliseconds;
  units = normalizeUnits(units);
  if (units === "month" || units === "quarter" || units === "year") {
    days2 = this._days + milliseconds2 / 864e5;
    months2 = this._months + daysToMonths(days2);
    switch (units) {
      case "month":
        return months2;
      case "quarter":
        return months2 / 3;
      case "year":
        return months2 / 12;
    }
  } else {
    days2 = this._days + Math.round(monthsToDays(this._months));
    switch (units) {
      case "week":
        return days2 / 7 + milliseconds2 / 6048e5;
      case "day":
        return days2 + milliseconds2 / 864e5;
      case "hour":
        return days2 * 24 + milliseconds2 / 36e5;
      case "minute":
        return days2 * 1440 + milliseconds2 / 6e4;
      case "second":
        return days2 * 86400 + milliseconds2 / 1e3;
      case "millisecond":
        return Math.floor(days2 * 864e5) + milliseconds2;
      default:
        throw new Error("Unknown unit " + units);
    }
  }
}
function valueOf$1() {
  if (!this.isValid()) {
    return NaN;
  }
  return this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + toInt(this._months / 12) * 31536e6;
}
function makeAs(alias) {
  return function() {
    return this.as(alias);
  };
}
var asMilliseconds = makeAs("ms"), asSeconds = makeAs("s"), asMinutes = makeAs("m"), asHours = makeAs("h"), asDays = makeAs("d"), asWeeks = makeAs("w"), asMonths = makeAs("M"), asQuarters = makeAs("Q"), asYears = makeAs("y");
function clone$1() {
  return createDuration(this);
}
function get$2(units) {
  units = normalizeUnits(units);
  return this.isValid() ? this[units + "s"]() : NaN;
}
function makeGetter(name) {
  return function() {
    return this.isValid() ? this._data[name] : NaN;
  };
}
var milliseconds = makeGetter("milliseconds"), seconds = makeGetter("seconds"), minutes = makeGetter("minutes"), hours = makeGetter("hours"), days = makeGetter("days"), months = makeGetter("months"), years = makeGetter("years");
function weeks() {
  return absFloor(this.days() / 7);
}
var round = Math.round, thresholds = {
  ss: 44,
  // a few seconds to seconds
  s: 45,
  // seconds to minute
  m: 45,
  // minutes to hour
  h: 22,
  // hours to day
  d: 26,
  // days to month/week
  w: null,
  // weeks to month
  M: 11
  // months to year
};
function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale2) {
  return locale2.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
}
function relativeTime$1(posNegDuration, withoutSuffix, thresholds2, locale2) {
  var duration = createDuration(posNegDuration).abs(), seconds2 = round(duration.as("s")), minutes2 = round(duration.as("m")), hours2 = round(duration.as("h")), days2 = round(duration.as("d")), months2 = round(duration.as("M")), weeks2 = round(duration.as("w")), years2 = round(duration.as("y")), a2 = seconds2 <= thresholds2.ss && ["s", seconds2] || seconds2 < thresholds2.s && ["ss", seconds2] || minutes2 <= 1 && ["m"] || minutes2 < thresholds2.m && ["mm", minutes2] || hours2 <= 1 && ["h"] || hours2 < thresholds2.h && ["hh", hours2] || days2 <= 1 && ["d"] || days2 < thresholds2.d && ["dd", days2];
  if (thresholds2.w != null) {
    a2 = a2 || weeks2 <= 1 && ["w"] || weeks2 < thresholds2.w && ["ww", weeks2];
  }
  a2 = a2 || months2 <= 1 && ["M"] || months2 < thresholds2.M && ["MM", months2] || years2 <= 1 && ["y"] || ["yy", years2];
  a2[2] = withoutSuffix;
  a2[3] = +posNegDuration > 0;
  a2[4] = locale2;
  return substituteTimeAgo.apply(null, a2);
}
function getSetRelativeTimeRounding(roundingFunction) {
  if (roundingFunction === void 0) {
    return round;
  }
  if (typeof roundingFunction === "function") {
    round = roundingFunction;
    return true;
  }
  return false;
}
function getSetRelativeTimeThreshold(threshold, limit) {
  if (thresholds[threshold] === void 0) {
    return false;
  }
  if (limit === void 0) {
    return thresholds[threshold];
  }
  thresholds[threshold] = limit;
  if (threshold === "s") {
    thresholds.ss = limit - 1;
  }
  return true;
}
function humanize(argWithSuffix, argThresholds) {
  if (!this.isValid()) {
    return this.localeData().invalidDate();
  }
  var withSuffix = false, th = thresholds, locale2, output;
  if (typeof argWithSuffix === "object") {
    argThresholds = argWithSuffix;
    argWithSuffix = false;
  }
  if (typeof argWithSuffix === "boolean") {
    withSuffix = argWithSuffix;
  }
  if (typeof argThresholds === "object") {
    th = Object.assign({}, thresholds, argThresholds);
    if (argThresholds.s != null && argThresholds.ss == null) {
      th.ss = argThresholds.s - 1;
    }
  }
  locale2 = this.localeData();
  output = relativeTime$1(this, !withSuffix, th, locale2);
  if (withSuffix) {
    output = locale2.pastFuture(+this, output);
  }
  return locale2.postformat(output);
}
var abs$1 = Math.abs;
function sign(x2) {
  return (x2 > 0) - (x2 < 0) || +x2;
}
function toISOString$1() {
  if (!this.isValid()) {
    return this.localeData().invalidDate();
  }
  var seconds2 = abs$1(this._milliseconds) / 1e3, days2 = abs$1(this._days), months2 = abs$1(this._months), minutes2, hours2, years2, s3, total = this.asSeconds(), totalSign, ymSign, daysSign, hmsSign;
  if (!total) {
    return "P0D";
  }
  minutes2 = absFloor(seconds2 / 60);
  hours2 = absFloor(minutes2 / 60);
  seconds2 %= 60;
  minutes2 %= 60;
  years2 = absFloor(months2 / 12);
  months2 %= 12;
  s3 = seconds2 ? seconds2.toFixed(3).replace(/\.?0+$/, "") : "";
  totalSign = total < 0 ? "-" : "";
  ymSign = sign(this._months) !== sign(total) ? "-" : "";
  daysSign = sign(this._days) !== sign(total) ? "-" : "";
  hmsSign = sign(this._milliseconds) !== sign(total) ? "-" : "";
  return totalSign + "P" + (years2 ? ymSign + years2 + "Y" : "") + (months2 ? ymSign + months2 + "M" : "") + (days2 ? daysSign + days2 + "D" : "") + (hours2 || minutes2 || seconds2 ? "T" : "") + (hours2 ? hmsSign + hours2 + "H" : "") + (minutes2 ? hmsSign + minutes2 + "M" : "") + (seconds2 ? hmsSign + s3 + "S" : "");
}
var proto$2 = Duration.prototype;
proto$2.isValid = isValid$1;
proto$2.abs = abs;
proto$2.add = add$1;
proto$2.subtract = subtract$1;
proto$2.as = as;
proto$2.asMilliseconds = asMilliseconds;
proto$2.asSeconds = asSeconds;
proto$2.asMinutes = asMinutes;
proto$2.asHours = asHours;
proto$2.asDays = asDays;
proto$2.asWeeks = asWeeks;
proto$2.asMonths = asMonths;
proto$2.asQuarters = asQuarters;
proto$2.asYears = asYears;
proto$2.valueOf = valueOf$1;
proto$2._bubble = bubble;
proto$2.clone = clone$1;
proto$2.get = get$2;
proto$2.milliseconds = milliseconds;
proto$2.seconds = seconds;
proto$2.minutes = minutes;
proto$2.hours = hours;
proto$2.days = days;
proto$2.weeks = weeks;
proto$2.months = months;
proto$2.years = years;
proto$2.humanize = humanize;
proto$2.toISOString = toISOString$1;
proto$2.toString = toISOString$1;
proto$2.toJSON = toISOString$1;
proto$2.locale = locale;
proto$2.localeData = localeData;
proto$2.toIsoString = deprecate(
  "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
  toISOString$1
);
proto$2.lang = lang;
addFormatToken("X", 0, 0, "unix");
addFormatToken("x", 0, 0, "valueOf");
addRegexToken("x", matchSigned);
addRegexToken("X", matchTimestamp);
addParseToken("X", function(input, array, config) {
  config._d = new Date(parseFloat(input) * 1e3);
});
addParseToken("x", function(input, array, config) {
  config._d = new Date(toInt(input));
});
//! moment.js
hooks.version = "2.29.4";
setHookCallback(createLocal);
hooks.fn = proto;
hooks.min = min;
hooks.max = max;
hooks.now = now;
hooks.utc = createUTC;
hooks.unix = createUnix;
hooks.months = listMonths;
hooks.isDate = isDate;
hooks.locale = getSetGlobalLocale;
hooks.invalid = createInvalid;
hooks.duration = createDuration;
hooks.isMoment = isMoment;
hooks.weekdays = listWeekdays;
hooks.parseZone = createInZone;
hooks.localeData = getLocale;
hooks.isDuration = isDuration;
hooks.monthsShort = listMonthsShort;
hooks.weekdaysMin = listWeekdaysMin;
hooks.defineLocale = defineLocale;
hooks.updateLocale = updateLocale;
hooks.locales = listLocales;
hooks.weekdaysShort = listWeekdaysShort;
hooks.normalizeUnits = normalizeUnits;
hooks.relativeTimeRounding = getSetRelativeTimeRounding;
hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
hooks.calendarFormat = getCalendarFormat;
hooks.prototype = proto;
hooks.HTML5_FMT = {
  DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
  // <input type="datetime-local" />
  DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
  // <input type="datetime-local" step="1" />
  DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
  // <input type="datetime-local" step="0.001" />
  DATE: "YYYY-MM-DD",
  // <input type="date" />
  TIME: "HH:mm",
  // <input type="time" />
  TIME_SECONDS: "HH:mm:ss",
  // <input type="time" step="1" />
  TIME_MS: "HH:mm:ss.SSS",
  // <input type="time" step="0.001" />
  WEEK: "GGGG-[W]WW",
  // <input type="week" />
  MONTH: "YYYY-MM"
  // <input type="month" />
};
const createIndex = () => parseInt(hooks().format("x"));
const createDate = () => hooks().format("YYYY-MM-DD");
function useList(localStorageName) {
  var tasks = reactive(JSON.parse(localStorage.getItem(localStorageName)) || { value: [] });
  tasks.value.forEach((element) => {
    if (!element["tags"]) {
      element["tags"] = [""];
    }
    if (!element["note"]) {
      element["note"] = "";
    }
    if (!element["steps"]) {
      element["steps"] = [{
        text: "",
        done: false
      }];
    }
  });
  watch(tasks, () => {
    console.log("changed");
    localStorage.setItem(localStorageName, JSON.stringify(tasks));
  });
  const get2 = () => tasks.value;
  const length = () => tasks.value.length;
  const push = (e2) => {
    if (tasks.value.indexOf(e2) !== -1) {
      return false;
    }
    tasks.value.push({
      ...e2,
      date: e2["date"] === void 0 ? createDate() : e2.date,
      index: e2["index"] === void 0 ? createIndex() : e2.index
    });
    return true;
  };
  const remove2 = (e2) => tasks.value = tasks.value.filter((el) => e2.index !== el.index);
  const edit = (from2, to2) => {
    for (let e2 = 0; e2 < tasks.value.length; e2++) {
      if (tasks.value[e2].index === from2.index) {
        tasks.value[e2] = {
          ...to2
        };
      }
    }
  };
  return {
    get: get2,
    length,
    push,
    remove: remove2,
    edit
  };
}
try {
  var taskList = useList("bre97-web-todo-tasks");
  var binList = useList("bre97-web-todo-bin");
  var focusList = useList("bre97-web-todo-focus");
} catch {
  console.log("Please check your Applications Local Storage, We have been delete your invaild local storage.");
  localStorage.clear();
  location.reload();
}
function useTasks() {
  const get2 = () => ({
    taskList,
    binList,
    focusList
  });
  const moveTo = (e2, from2, to2) => {
    from2.remove(e2);
    to2.push(e2);
  };
  const removeFrom = (e2, from2) => {
    from2.remove(e2);
  };
  return {
    get: get2,
    moveTo,
    removeFrom
  };
}
const _hoisted_1$o = ["open"];
const _hoisted_2$j = /* @__PURE__ */ createBaseVNode("div", { slot: "header" }, [
  /* @__PURE__ */ createBaseVNode("h1", null, "Create a task")
], -1);
const _hoisted_3$e = { class: "flex flex-col gap-2" };
const _hoisted_4$a = ["value"];
const _hoisted_5$8 = ["value"];
const _hoisted_6$8 = ["value"];
const _hoisted_7$8 = ["value"];
const _sfc_main$q = /* @__PURE__ */ defineComponent({
  __name: "Creator",
  props: ["dialog", "closeDialog"],
  setup(__props) {
    const props = __props;
    const task = reactive({
      title: "",
      subtitle: "",
      tags: [],
      note: "",
      steps: [{
        text: "",
        done: false
      }]
    });
    const submit = () => {
      useTasks().get().taskList.push(task);
      clear2();
      props.closeDialog();
    };
    const cancel = () => {
      clear2();
      props.closeDialog();
    };
    const clear2 = () => {
      task.title = "";
      task.subtitle = "";
      task.tags = [""];
      task.note = "";
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("md-dialog", {
        open: props.dialog.open
      }, [
        _hoisted_2$j,
        createBaseVNode("div", _hoisted_3$e, [
          createBaseVNode("md-filled-text-field", {
            value: task.title,
            label: "Title",
            onInput: _cache[0] || (_cache[0] = ($event) => task.title = $event.target.value)
          }, null, 40, _hoisted_4$a),
          createBaseVNode("md-filled-text-field", {
            value: task.subtitle,
            label: "Subtitle",
            onInput: _cache[1] || (_cache[1] = ($event) => task.subtitle = $event.target.value)
          }, null, 40, _hoisted_5$8),
          createBaseVNode("md-filled-text-field", {
            value: task.tags.toString(),
            label: "Tag",
            onInput: _cache[2] || (_cache[2] = ($event) => task.tags = $event.target.value.split(","))
          }, null, 40, _hoisted_6$8),
          createBaseVNode("md-filled-text-field", {
            value: task.note,
            label: "Note",
            onInput: _cache[3] || (_cache[3] = ($event) => task.note = $event.target.value)
          }, null, 40, _hoisted_7$8)
        ]),
        createBaseVNode("md-text-button", {
          onClick: cancel,
          slot: "footer"
        }, "Cancel"),
        createBaseVNode("md-filled-button", {
          onClick: submit,
          slot: "footer"
        }, "Apply")
      ], 8, _hoisted_1$o);
    };
  }
});
const _sfc_main$p = {};
const _hoisted_1$n = { class: "flex flex-col flex-none" };
const _hoisted_2$i = /* @__PURE__ */ createBaseVNode("h1", { class: "text-base" }, "To-Do", -1);
const _hoisted_3$d = /* @__PURE__ */ createBaseVNode("p", { class: "text-xs" }, "Preview", -1);
const _hoisted_4$9 = [
  _hoisted_2$i,
  _hoisted_3$d
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("div", _hoisted_1$n, _hoisted_4$9);
}
const Title = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render]]);
const _hoisted_1$m = { class: "relative w-full flex items-center justify-center" };
const _hoisted_2$h = /* @__PURE__ */ createBaseVNode("md-icon", { class: "material-icons relative left-10 text-base" }, "search", -1);
const _hoisted_3$c = ["value:"];
const _sfc_main$o = /* @__PURE__ */ defineComponent({
  __name: "SearchInput",
  props: {
    input: { default: () => "" }
  },
  emits: ["setInput"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const inputRef = ref();
    const onInput = (e2) => {
      emits("setInput", e2.target.value);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$m, [
        _hoisted_2$h,
        createBaseVNode("input", {
          ref_key: "inputRef",
          ref: inputRef,
          "value:": props.input,
          type: "text",
          placeholder: "Search",
          onInput: _cache[0] || (_cache[0] = (payload) => onInput(payload))
        }, null, 40, _hoisted_3$c)
      ]);
    };
  }
});
const THEME = reactive({
  /**
   * color是允许使用的所有主题色，不包括深色模式
   */
  color: ["default", "green", "red", "blue"],
  /**
   * current是当前主题的配置信息
   */
  current: JSON.parse(localStorage.getItem("theme-current")) || {
    isDark: false,
    /**
     * 当前使用的主题色
     */
    color: "default"
  }
});
watch(() => THEME.current.isDark, () => {
  if (THEME.current.isDark) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}, { immediate: true });
watch(() => THEME.current.color, () => {
  THEME.color.forEach((element) => {
    document.body.classList.remove(element);
  });
  document.body.classList.add(THEME.current.color);
}, { immediate: true });
watch(() => THEME.current, () => localStorage.setItem("theme-current", JSON.stringify(THEME.current)));
function useDark() {
  const get2 = () => THEME;
  const getCurrent = () => THEME.current;
  const getThemeColor = () => THEME.color;
  const set2 = (current) => {
    THEME.current = {
      ...THEME.current,
      ...current
    };
  };
  return {
    get: get2,
    getCurrent,
    getThemeColor,
    set: set2
  };
}
const _hoisted_1$l = { class: "flex flex-col gap-2" };
const _hoisted_2$g = ["onClick"];
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  __name: "Theme",
  setup(__props) {
    const theme = useDark();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("ul", _hoisted_1$l, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(theme).getThemeColor(), (e2, index2) => {
          return openBlock(), createElementBlock("li", {
            key: index2,
            class: "flex items-center justify-start"
          }, [
            createBaseVNode("label", null, [
              createBaseVNode("p", null, toDisplayString(e2), 1),
              createBaseVNode("md-radio", {
                name: "theme",
                class: "absolute right-0",
                onClick: ($event) => unref(theme).set({
                  color: e2
                })
              }, null, 8, _hoisted_2$g)
            ])
          ]);
        }), 128))
      ]);
    };
  }
});
const _hoisted_1$k = /* @__PURE__ */ createBaseVNode("p", null, "Dark", -1);
const _hoisted_2$f = ["selected"];
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "Dark",
  setup(__props) {
    const theme = useDark();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("label", null, [
        _hoisted_1$k,
        createBaseVNode("md-switch", {
          selected: unref(theme).get().current.isDark,
          onClick: _cache[0] || (_cache[0] = ($event) => unref(theme).set({
            isDark: !unref(theme).getCurrent().isDark
          }))
        }, null, 8, _hoisted_2$f)
      ]);
    };
  }
});
const _hoisted_1$j = { class: "setting" };
const _hoisted_2$e = /* @__PURE__ */ createBaseVNode("md-text-button", null, "Settings", -1);
const _hoisted_3$b = { class: "item p-4 rounded-md border dark:border-none shadow-md bg-white dark:bg-slate-700 absolute top-5 right-5 flex flex-col space-y-2" };
const _hoisted_4$8 = { class: "space-y-2" };
const _hoisted_5$7 = /* @__PURE__ */ createBaseVNode("h1", null, "Dark", -1);
const _hoisted_6$7 = /* @__PURE__ */ createBaseVNode("md-divider", null, null, -1);
const _hoisted_7$7 = { class: "space-y-2" };
const _hoisted_8$6 = /* @__PURE__ */ createBaseVNode("h1", null, "Theme", -1);
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "Setting",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$j, [
        _hoisted_2$e,
        createBaseVNode("ul", _hoisted_3$b, [
          createBaseVNode("li", _hoisted_4$8, [
            _hoisted_5$7,
            createVNode(_sfc_main$m)
          ]),
          _hoisted_6$7,
          createBaseVNode("li", _hoisted_7$7, [
            _hoisted_8$6,
            createVNode(_sfc_main$n)
          ])
        ])
      ]);
    };
  }
});
const _hoisted_1$i = { class: "flex-none rounded-full overflow-clip border w-10 h-10 flex items-center justify-center bg-off-base" };
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "Avatar",
  setup(__props) {
    const info = reactive(
      JSON.parse(localStorage.getItem("bre97-web-todo-personal-info")) || {
        name: "Click me to edit your info"
      }
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$i, [
        createBaseVNode("h1", null, toDisplayString(info.name[0]), 1)
      ]);
    };
  }
});
const _hoisted_1$h = { class: "topBar" };
const _hoisted_2$d = { class: "px-4 py-2 flex flex-row items-center justify-between w-full gap-2" };
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "Header",
  props: {
    input: { default: () => "" }
  },
  emits: ["setInput"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const setInput = (value) => emits("setInput", value);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("header", _hoisted_1$h, [
        createBaseVNode("div", _hoisted_2$d, [
          createVNode(Title),
          createVNode(_sfc_main$o, {
            input: props.input,
            onSetInput: setInput
          }, null, 8, ["input"]),
          createVNode(_sfc_main$l),
          createVNode(_sfc_main$k)
        ])
      ]);
    };
  }
});
const GLOBAL_OBJECT = {
  value: ""
};
function Search() {
  const get2 = () => GLOBAL_OBJECT;
  const set2 = (value) => GLOBAL_OBJECT.value = value;
  return {
    get: get2,
    set: set2
  };
}
const _hoisted_1$g = { class: "main" };
const _hoisted_2$c = { class: "fab" };
const _hoisted_3$a = /* @__PURE__ */ createBaseVNode("md-icon", {
  slot: "icon",
  class: "material-icons"
}, "create", -1);
const _hoisted_4$7 = [
  _hoisted_3$a
];
const _hoisted_5$6 = { class: "navigation" };
const _hoisted_6$6 = ["activeIndex"];
const _hoisted_7$6 = /* @__PURE__ */ createBaseVNode("md-icon", {
  slot: "icon",
  class: "material-icons"
}, "home", -1);
const _hoisted_8$5 = [
  _hoisted_7$6
];
const _hoisted_9$4 = /* @__PURE__ */ createBaseVNode("md-icon", {
  slot: "icon",
  class: "material-icons"
}, "home", -1);
const _hoisted_10$3 = [
  _hoisted_9$4
];
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "Home",
  setup(__props) {
    const searchInput = Search();
    const input = reactive(searchInput.get());
    const setInput = (value) => input.value = value;
    watch(input, () => searchInput.set(input.value));
    const router = useRouter();
    const push = (path) => router.push({
      path
    });
    const activeIndex = ref(0);
    const dialog = reactive({
      open: false
    });
    const closeDialog = () => dialog.open = false;
    return (_ctx, _cache) => {
      const _component_router_view = resolveComponent("router-view");
      return openBlock(), createElementBlock("div", null, [
        createVNode(_sfc_main$j, {
          input: input.value,
          onSetInput: setInput
        }, null, 8, ["input"]),
        createBaseVNode("main", _hoisted_1$g, [
          createVNode(_component_router_view, { name: "MainBoardView" }, {
            default: withCtx(({ Component }) => [
              (openBlock(), createBlock(resolveDynamicComponent(Component)))
            ]),
            _: 1
          })
        ]),
        createBaseVNode("nav", null, [
          createBaseVNode("div", _hoisted_2$c, [
            createBaseVNode("md-branded-fab", {
              label: "Create",
              class: normalizeClass({ "opacity-0": activeIndex.value != 0 }),
              onClick: _cache[0] || (_cache[0] = ($event) => dialog.open = true)
            }, _hoisted_4$7, 2),
            createVNode(_sfc_main$q, {
              dialog,
              closeDialog
            }, null, 8, ["dialog"])
          ]),
          createBaseVNode("div", _hoisted_5$6, [
            createBaseVNode("div", null, [
              createBaseVNode("md-navigation-bar", {
                activeIndex: activeIndex.value,
                class: "lg:max-w-lg flex mx-auto"
              }, [
                createBaseVNode("md-navigation-tab", {
                  label: "Home",
                  onClick: _cache[1] || (_cache[1] = () => {
                    activeIndex.value = 0;
                    push("/home");
                  })
                }, _hoisted_8$5),
                createBaseVNode("md-navigation-tab", {
                  label: "Me",
                  onClick: _cache[2] || (_cache[2] = () => {
                    activeIndex.value = 1;
                    push("/me");
                  })
                }, _hoisted_10$3)
              ], 8, _hoisted_6$6)
            ])
          ])
        ])
      ]);
    };
  }
});
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "Task",
  props: {
    title: { default: () => "" },
    subtitle: { default: () => "" }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createBaseVNode("header", null, [
          createBaseVNode("h1", null, toDisplayString(props.title), 1),
          createBaseVNode("p", null, toDisplayString(props.subtitle), 1)
        ]),
        createBaseVNode("main", null, [
          renderSlot(_ctx.$slots, "default")
        ])
      ]);
    };
  }
});
const _hoisted_1$f = { class: "flex flex-col" };
const _hoisted_2$b = ["headline", "supportingText"];
const _hoisted_3$9 = ["onClick"];
const _hoisted_4$6 = {
  class: "buttonGroup",
  slot: "end"
};
const _hoisted_5$5 = ["onClick"];
const _hoisted_6$5 = /* @__PURE__ */ createBaseVNode("md-icon", { class: "material-icons" }, "favorite", -1);
const _hoisted_7$5 = [
  _hoisted_6$5
];
const _hoisted_8$4 = {
  key: 0,
  class: "relative bottom-0 px-4 py-2"
};
const _hoisted_9$3 = /* @__PURE__ */ createBaseVNode("md-divider", null, null, -1);
const _hoisted_10$2 = ["headline", "supportingText"];
const _hoisted_11$2 = ["onClick"];
const _hoisted_12$1 = { slot: "end" };
const _hoisted_13$1 = ["onClick"];
const _hoisted_14$1 = /* @__PURE__ */ createBaseVNode("md-icon", { class: "material-icons" }, "favorite_outlined", -1);
const _hoisted_15 = [
  _hoisted_14$1
];
const _hoisted_16 = ["onClick"];
const _hoisted_17 = /* @__PURE__ */ createBaseVNode("md-icon", { class: "material-icons" }, "edit", -1);
const _hoisted_18 = [
  _hoisted_17
];
const _hoisted_19 = ["onClick"];
const _hoisted_20 = /* @__PURE__ */ createBaseVNode("md-icon", { class: "material-icons" }, "more", -1);
const _hoisted_21 = [
  _hoisted_20
];
const _hoisted_22 = {
  key: 0,
  class: "relative bottom-0 px-4 py-2"
};
const _hoisted_23 = /* @__PURE__ */ createBaseVNode("md-divider", null, null, -1);
const _hoisted_24 = ["headline", "supportingText"];
const _hoisted_25 = ["onClick"];
const _hoisted_26 = { slot: "end" };
const _hoisted_27 = ["onClick"];
const _hoisted_28 = /* @__PURE__ */ createBaseVNode("md-icon", { class: "material-icons" }, "delete_forever", -1);
const _hoisted_29 = [
  _hoisted_28
];
const _hoisted_30 = /* @__PURE__ */ createBaseVNode("md-divider", null, null, -1);
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "Tasks",
  setup(__props) {
    const router = useRouter();
    const push = (path, e2) => {
      router.push({
        path,
        query: {
          task: JSON.stringify(e2)
        }
      });
    };
    const tasks = useTasks();
    var tasksStyle = reactive({
      focusList: {
        "opacity-0": true,
        hidden: true
      }
    });
    watch(() => tasks.get().focusList.get().length, (v2) => {
      if (v2 === 0) {
        tasksStyle.focusList["opacity-0"] = true;
        setTimeout(() => {
          tasksStyle.focusList["hidden"] = true;
        }, 500);
      } else {
        tasksStyle.focusList["hidden"] = false;
        setTimeout(() => {
          tasksStyle.focusList["opacity-0"] = false;
        }, 300);
      }
    }, {
      immediate: true
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$f, [
        createVNode(_sfc_main$h, {
          class: normalizeClass(unref(tasksStyle).focusList),
          title: "Focus",
          subtitle: "使用固定按钮将任务钉至此处"
        }, {
          default: withCtx(() => [
            createBaseVNode("md-list", null, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(tasks).get().focusList.get(), (e2) => {
                return openBlock(), createElementBlock("div", {
                  key: e2["index"],
                  class: "relative"
                }, [
                  createBaseVNode("md-list-item", {
                    headline: e2.title,
                    supportingText: e2.subtitle
                  }, [
                    createBaseVNode("md-checkbox", {
                      onClick: ($event) => unref(tasks).moveTo(e2, unref(tasks).get().focusList, unref(tasks).get().binList),
                      slot: "start"
                    }, null, 8, _hoisted_3$9),
                    createBaseVNode("div", _hoisted_4$6, [
                      createBaseVNode("md-standard-icon-button", {
                        onClick: ($event) => unref(tasks).moveTo(e2, unref(tasks).get().focusList, unref(tasks).get().taskList)
                      }, _hoisted_7$5, 8, _hoisted_5$5)
                    ])
                  ], 8, _hoisted_2$b),
                  e2.tags && e2.tags.length !== 0 && e2.tags[0] !== "" ? (openBlock(), createElementBlock("ul", _hoisted_8$4, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(e2.tags, (tag, index2) => {
                      return openBlock(), createElementBlock("li", { key: index2 }, [
                        createBaseVNode("p", null, toDisplayString(tag), 1)
                      ]);
                    }), 128))
                  ])) : createCommentVNode("", true),
                  _hoisted_9$3
                ]);
              }), 128))
            ])
          ]),
          _: 1
        }, 8, ["class"]),
        createVNode(_sfc_main$h, {
          class: normalizeClass({ "opacity-25": unref(tasks).get().taskList.get().length === 0 }),
          title: "Today's tasks",
          subtitle: "需要完成的任务清单"
        }, {
          default: withCtx(() => [
            createBaseVNode("md-list", null, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(tasks).get().taskList.get(), (e2) => {
                return openBlock(), createElementBlock("div", {
                  key: e2["index"],
                  class: "relative"
                }, [
                  createBaseVNode("md-list-item", {
                    headline: e2.title,
                    supportingText: e2.subtitle
                  }, [
                    createBaseVNode("md-checkbox", {
                      onClick: ($event) => unref(tasks).moveTo(e2, unref(tasks).get().taskList, unref(tasks).get().binList),
                      slot: "start"
                    }, null, 8, _hoisted_11$2),
                    createBaseVNode("div", _hoisted_12$1, [
                      createBaseVNode("md-standard-icon-button", {
                        onClick: ($event) => unref(tasks).moveTo(e2, unref(tasks).get().taskList, unref(tasks).get().focusList)
                      }, _hoisted_15, 8, _hoisted_13$1),
                      createBaseVNode("md-standard-icon-button", {
                        onClick: ($event) => push("/Edit", e2)
                      }, _hoisted_18, 8, _hoisted_16),
                      createBaseVNode("md-standard-icon-button", {
                        onClick: ($event) => push("/info", e2)
                      }, _hoisted_21, 8, _hoisted_19)
                    ])
                  ], 8, _hoisted_10$2),
                  e2.tags && e2.tags.length !== 0 && e2.tags[0] !== "" ? (openBlock(), createElementBlock("ul", _hoisted_22, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(e2.tags, (tag, index2) => {
                      return openBlock(), createElementBlock("li", { key: index2 }, [
                        createBaseVNode("p", null, toDisplayString(tag), 1)
                      ]);
                    }), 128))
                  ])) : createCommentVNode("", true),
                  _hoisted_23
                ]);
              }), 128))
            ])
          ]),
          _: 1
        }, 8, ["class"]),
        createVNode(_sfc_main$h, {
          style: { "grid-row": "3" },
          class: normalizeClass({ "opacity-25": unref(tasks).get().binList.get().length === 0 }),
          title: "Recycle Bin",
          subtitle: "完成的任务会在这里"
        }, {
          default: withCtx(() => [
            createBaseVNode("md-list", null, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(tasks).get().binList.get(), (e2) => {
                return openBlock(), createElementBlock("div", {
                  key: e2["index"],
                  class: "relative"
                }, [
                  createBaseVNode("md-list-item", {
                    class: "line-through italic",
                    headline: e2.title,
                    supportingText: e2.subtitle
                  }, [
                    createBaseVNode("md-checkbox", {
                      checked: "",
                      onClick: ($event) => unref(tasks).moveTo(e2, unref(tasks).get().binList, unref(tasks).get().taskList),
                      slot: "start"
                    }, null, 8, _hoisted_25),
                    createBaseVNode("div", _hoisted_26, [
                      createBaseVNode("md-standard-icon-button", {
                        onClick: ($event) => unref(tasks).removeFrom(e2, unref(tasks).get().binList)
                      }, _hoisted_29, 8, _hoisted_27)
                    ])
                  ], 8, _hoisted_24),
                  _hoisted_30
                ]);
              }), 128))
            ])
          ]),
          _: 1
        }, 8, ["class"])
      ]);
    };
  }
});
const _hoisted_1$e = { class: "flex flex-row items-end justify-start gap-2" };
const _hoisted_2$a = /* @__PURE__ */ createBaseVNode("h1", null, "Search", -1);
const _hoisted_3$8 = { class: "underline underline-offset-1" };
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "Header",
  props: {
    input: null
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createBaseVNode("header", _hoisted_1$e, [
          _hoisted_2$a,
          createBaseVNode("h1", _hoisted_3$8, [
            createBaseVNode("mark", null, toDisplayString(props.input), 1)
          ])
        ])
      ]);
    };
  }
});
const _hoisted_1$d = { class: "text-right text-gray-500 dark:text-gray-300" };
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "Footer",
  props: {
    get: null
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("footer", null, [
        createBaseVNode("p", _hoisted_1$d, " Accumulate " + toDisplayString(props.get.length) + " results ", 1)
      ]);
    };
  }
});
const _hoisted_1$c = { class: "text-right" };
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "CreatorInSearch",
  props: {
    input: null
  },
  setup(__props) {
    const props = __props;
    const tasks = useTasks();
    const add2 = () => {
      console.log(props.input);
      tasks.get().taskList.push({
        title: props.input,
        subtitle: "",
        tags: [],
        note: "",
        steps: [{
          text: "",
          done: false
        }]
      });
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createBaseVNode("header", _hoisted_1$c, [
          createBaseVNode("h1", null, toDisplayString(props.input) + " is not found", 1)
        ]),
        createBaseVNode("main", { class: "flex justify-end" }, [
          createBaseVNode("div", { class: "flex items-center gap-2" }, [
            createBaseVNode("md-tonal-button", { onClick: add2 }, "Create")
          ])
        ])
      ]);
    };
  }
});
const _hoisted_1$b = { class: "border dark:border-none bg-transparent dark:bg-slate-800 rounded-md px-4 py-2 my-4" };
const _hoisted_2$9 = { class: "tasks" };
const _hoisted_3$7 = ["headline", "supporttingText"];
const _hoisted_4$5 = { slot: "end" };
const _hoisted_5$4 = ["onClick"];
const _hoisted_6$4 = /* @__PURE__ */ createBaseVNode("md-icon", { class: "material-icons" }, "edit", -1);
const _hoisted_7$4 = [
  _hoisted_6$4
];
const _hoisted_8$3 = /* @__PURE__ */ createBaseVNode("md-divider", null, null, -1);
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "Search",
  setup(__props) {
    var searchInput = Search();
    const input = reactive(searchInput.get());
    const tasks = useTasks();
    var get2 = computed(() => {
      var results = new Array();
      var lists = Array.from([
        ...tasks.get().taskList.get(),
        ...tasks.get().focusList.get(),
        ...tasks.get().binList.get()
      ]);
      lists.forEach((e2) => {
        if (e2.title.toLowerCase().indexOf(input.value.toLowerCase()) !== -1) {
          results.push(e2);
        }
      });
      return results;
    });
    const router = useRouter();
    const push = (path, e2) => router.push({
      path,
      query: {
        task: JSON.stringify(e2)
      }
    });
    return (_ctx, _cache) => {
      return withDirectives((openBlock(), createElementBlock("div", _hoisted_1$b, [
        createVNode(_sfc_main$f, {
          input: input.value
        }, null, 8, ["input"]),
        createBaseVNode("main", null, [
          createVNode(_sfc_main$h, {
            title: "",
            subtitle: ""
          }, {
            default: withCtx(() => [
              createBaseVNode("md-list", _hoisted_2$9, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(get2), (e2) => {
                  return openBlock(), createElementBlock("div", {
                    key: e2.index
                  }, [
                    createBaseVNode("md-list-item", {
                      headline: e2.title,
                      supporttingText: e2.subtitle
                    }, [
                      createBaseVNode("div", _hoisted_4$5, [
                        createBaseVNode("md-standard-icon-button", {
                          onClick: ($event) => push("/Edit", e2)
                        }, _hoisted_7$4, 8, _hoisted_5$4)
                      ])
                    ], 8, _hoisted_3$7),
                    _hoisted_8$3
                  ]);
                }), 128))
              ])
            ]),
            _: 1
          }),
          unref(get2).length === 0 ? (openBlock(), createBlock(_sfc_main$d, {
            key: 0,
            input: input.value
          }, null, 8, ["input"])) : createCommentVNode("", true)
        ]),
        createVNode(_sfc_main$e, { get: unref(get2) }, null, 8, ["get"])
      ], 512)), [
        [vShow, input.value.length != 0]
      ]);
    };
  }
});
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "HomePage",
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_router_view = resolveComponent("router-view");
      return openBlock(), createElementBlock("div", null, [
        createVNode(_sfc_main$c),
        createVNode(_sfc_main$g),
        createVNode(_component_router_view, { name: "HomePageInnerBoardView" }, {
          default: withCtx(({ Component }) => [
            (openBlock(), createBlock(resolveDynamicComponent(Component)))
          ]),
          _: 1
        })
      ]);
    };
  }
});
const _hoisted_1$a = /* @__PURE__ */ createBaseVNode("header", null, [
  /* @__PURE__ */ createBaseVNode("h1", null, "Note")
], -1);
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "Note",
  props: {
    note: { default: () => "" }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        _hoisted_1$a,
        createBaseVNode("main", null, [
          createBaseVNode("p", null, toDisplayString(props.note), 1)
        ])
      ]);
    };
  }
});
const _hoisted_1$9 = /* @__PURE__ */ createBaseVNode("header", null, [
  /* @__PURE__ */ createBaseVNode("h1", null, "Date")
], -1);
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "Date",
  props: {
    date: { default: () => "" }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        _hoisted_1$9,
        createBaseVNode("main", null, [
          createBaseVNode("p", null, toDisplayString(props.date), 1)
        ])
      ]);
    };
  }
});
const _hoisted_1$8 = /* @__PURE__ */ createBaseVNode("header", null, [
  /* @__PURE__ */ createBaseVNode("h1", null, "Tags")
], -1);
const _hoisted_2$8 = { class: "flex items-center justify-start gap-2 flex-wrap" };
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "Tag",
  props: {
    tag: { default: () => [""] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        _hoisted_1$8,
        createBaseVNode("main", null, [
          createBaseVNode("ul", _hoisted_2$8, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(props.tag, (e2, index2) => {
              return openBlock(), createElementBlock("li", { key: index2 }, [
                createBaseVNode("p", null, toDisplayString(e2), 1)
              ]);
            }), 128))
          ])
        ])
      ]);
    };
  }
});
const _hoisted_1$7 = /* @__PURE__ */ createBaseVNode("h1", null, "Steps", -1);
const _hoisted_2$7 = { class: "flex items-center justify-start" };
const _hoisted_3$6 = ["value"];
const _hoisted_4$4 = /* @__PURE__ */ createBaseVNode("md-icon", { class: "material-icons" }, "add", -1);
const _hoisted_5$3 = [
  _hoisted_4$4
];
const _hoisted_6$3 = ["headline"];
const _hoisted_7$3 = ["checked", "onClick"];
const _hoisted_8$2 = ["onClick"];
const _hoisted_9$2 = /* @__PURE__ */ createBaseVNode("md-icon", { class: "material-icons" }, "delete_outlined", -1);
const _hoisted_10$1 = [
  _hoisted_9$2
];
const _hoisted_11$1 = /* @__PURE__ */ createBaseVNode("md-divider", null, null, -1);
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "Step",
  props: {
    task: null
  },
  setup(__props) {
    const props = __props;
    const copyRef = reactive(props.task.steps);
    const input = ref("");
    const create = () => {
      copyRef.push({
        text: input.value,
        done: false
      });
    };
    watch(copyRef, () => {
      useTasks().get().taskList.edit(props.task, {
        ...props.task,
        steps: copyRef
      });
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createBaseVNode("header", null, [
          _hoisted_1$7,
          createBaseVNode("div", _hoisted_2$7, [
            createBaseVNode("md-outlined-text-field", {
              label: "Step",
              value: input.value,
              onInput: _cache[0] || (_cache[0] = ($event) => input.value = $event.target.value)
            }, null, 40, _hoisted_3$6),
            createBaseVNode("md-standard-icon-button", { onClick: create }, _hoisted_5$3)
          ])
        ]),
        createBaseVNode("main", null, [
          createBaseVNode("md-list", null, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(copyRef, (e2, index2) => {
              return openBlock(), createElementBlock("div", { key: index2 }, [
                createBaseVNode("md-list-item", {
                  headline: e2.text
                }, [
                  createBaseVNode("md-checkbox", {
                    checked: e2.done,
                    slot: "start",
                    onClick: () => e2.done = !e2.done
                  }, null, 8, _hoisted_7$3),
                  createBaseVNode("md-standard-icon-button", {
                    slot: "end",
                    onClick: () => copyRef.splice(index2, 1)
                  }, _hoisted_10$1, 8, _hoisted_8$2)
                ], 8, _hoisted_6$3),
                _hoisted_11$1
              ]);
            }), 128))
          ])
        ])
      ]);
    };
  }
});
const _hoisted_1$6 = { class: "fixedWindow fullScreen" };
const _hoisted_2$6 = { class: "space-y-4" };
const _hoisted_3$5 = { class: "space-y-2" };
const _hoisted_4$3 = { class: "backButton" };
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "MoreInformation",
  setup(__props) {
    const router = useRouter();
    const task = ref(JSON.parse(router.currentRoute.value.query.task));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$6, [
        createBaseVNode("div", _hoisted_2$6, [
          createBaseVNode("header", null, [
            createBaseVNode("h1", null, toDisplayString(task.value.title), 1),
            createBaseVNode("p", null, toDisplayString(task.value.subtitle), 1)
          ]),
          createBaseVNode("main", _hoisted_3$5, [
            createVNode(_sfc_main$a, {
              note: task.value.note
            }, null, 8, ["note"]),
            createVNode(_sfc_main$9, {
              date: task.value.date
            }, null, 8, ["date"]),
            createVNode(_sfc_main$8, {
              tag: task.value.tags
            }, null, 8, ["tag"]),
            createVNode(_sfc_main$7, { task: task.value }, null, 8, ["task"])
          ]),
          createBaseVNode("nav", _hoisted_4$3, [
            createBaseVNode("md-text-button", {
              onClick: _cache[0] || (_cache[0] = () => {
                unref(router).push("/home");
              })
            }, "Back")
          ])
        ])
      ]);
    };
  }
});
const _hoisted_1$5 = { class: "flex flex-row gap-2" };
const _hoisted_2$5 = {
  key: 0,
  class: "rounded-full border w-20 h-20 flex items-center justify-center bg-off-base"
};
const _hoisted_3$4 = { class: "text-4xl" };
const _hoisted_4$2 = { class: "flex flex-col" };
const _hoisted_5$2 = /* @__PURE__ */ createBaseVNode("p", null, "Hello", -1);
const _hoisted_6$2 = ["open"];
const _hoisted_7$2 = /* @__PURE__ */ createBaseVNode("div", { slot: "header" }, [
  /* @__PURE__ */ createBaseVNode("h1", null, "Your Info")
], -1);
const _hoisted_8$1 = { class: "flex flex-col gap-2" };
const _hoisted_9$1 = ["value"];
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "Profile",
  setup(__props) {
    var dialogOpen = ref(false);
    const info = reactive(
      JSON.parse(localStorage.getItem("bre97-web-todo-personal-info")) || {
        name: "Click me to edit your info"
      }
    );
    const submit = () => {
      close();
      localStorage.setItem("bre97-web-todo-personal-info", JSON.stringify(info));
    };
    const cancel = () => {
      close();
      info.name = JSON.parse(localStorage.getItem("bre97-web-todo-personal-info")).name;
    };
    const open = () => dialogOpen.value = true;
    const close = () => dialogOpen.value = false;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$5, [
        info.name.length !== 0 ? (openBlock(), createElementBlock("header", _hoisted_2$5, [
          createBaseVNode("h1", _hoisted_3$4, toDisplayString(info.name[0]), 1)
        ])) : createCommentVNode("", true),
        createBaseVNode("main", _hoisted_4$2, [
          _hoisted_5$2,
          createBaseVNode("h1", {
            class: "underline underline-offset-1 hover:underline-offset-4",
            onClick: open
          }, toDisplayString(info.name), 1)
        ]),
        createBaseVNode("md-dialog", { open: unref(dialogOpen) }, [
          _hoisted_7$2,
          createBaseVNode("div", _hoisted_8$1, [
            createBaseVNode("md-filled-text-field", {
              label: "Name",
              type: "text",
              value: info.name,
              onInput: _cache[0] || (_cache[0] = ($event) => info.name = $event.target.value)
            }, null, 40, _hoisted_9$1)
          ]),
          createBaseVNode("md-text-button", {
            slot: "footer",
            onClick: cancel
          }, "Cancel"),
          createBaseVNode("md-filled-button", {
            slot: "footer",
            onClick: submit
          }, "Apply")
        ], 8, _hoisted_6$2)
      ]);
    };
  }
});
function useTags(list) {
  const tags = /* @__PURE__ */ new Map();
  list.forEach((element) => {
    element["tags"].forEach((e2) => {
      if (e2 !== "") {
        if (!tags.has(e2)) {
          tags.set(e2, [element]);
        } else {
          tags.set(e2, [...tags.get(e2) || [], element]);
        }
      }
    });
  });
  return tags;
}
const _hoisted_1$4 = { class: "list" };
const _hoisted_2$4 = { class: "list-inner-page tasks" };
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Tag",
  setup(__props) {
    const tags = useTags(useTasks().get().taskList.get());
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createBaseVNode("ul", null, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(tags), (e2) => {
            return openBlock(), createElementBlock("li", _hoisted_1$4, [
              createBaseVNode("h1", null, toDisplayString(e2[0]), 1),
              createBaseVNode("ul", _hoisted_2$4, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(e2[1], (el) => {
                  return openBlock(), createElementBlock("li", null, toDisplayString(el.title), 1);
                }), 256))
              ])
            ]);
          }), 256))
        ])
      ]);
    };
  }
});
const Tag_vue_vue_type_style_index_0_scoped_f146478e_lang = "";
const Tag = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-f146478e"]]);
const _withScopeId$1 = (n2) => (pushScopeId("data-v-c3975d4a"), n2 = n2(), popScopeId(), n2);
const _hoisted_1$3 = { class: "mt-12 relative" };
const _hoisted_2$3 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("header", null, [
  /* @__PURE__ */ createBaseVNode("h1", null, "Tasks")
], -1));
const _hoisted_3$3 = { class: "py-2" };
const _hoisted_4$1 = { class: "list" };
const _hoisted_5$1 = {
  key: 0,
  class: "list-inner-page tasks"
};
const _hoisted_6$1 = { class: "list" };
const _hoisted_7$1 = {
  key: 0,
  class: "list-inner-page tasks"
};
const _hoisted_8 = { class: "list" };
const _hoisted_9 = {
  key: 0,
  class: "list-inner-page tasks"
};
const _hoisted_10 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("header", null, [
  /* @__PURE__ */ createBaseVNode("h1", null, "Tag")
], -1));
const _hoisted_11 = { class: "py-2" };
const _hoisted_12 = { class: "mt-12 mb-2" };
const _hoisted_13 = { class: "group" };
const _hoisted_14 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("h1", null, "Helper", -1));
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Me",
  setup(__props) {
    const tasks = useTasks();
    const router = useRouter();
    return (_ctx, _cache) => {
      const _component_router_view = resolveComponent("router-view");
      return openBlock(), createElementBlock("div", null, [
        createVNode(_sfc_main$5),
        createBaseVNode("main", _hoisted_1$3, [
          createBaseVNode("div", null, [
            _hoisted_2$3,
            createBaseVNode("main", _hoisted_3$3, [
              createBaseVNode("ul", null, [
                createBaseVNode("li", _hoisted_4$1, [
                  createBaseVNode("h1", null, "待办 " + toDisplayString(unref(tasks).get().taskList.get().length), 1),
                  unref(tasks).get().taskList.get().length != 0 ? (openBlock(), createElementBlock("ul", _hoisted_5$1, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(tasks).get().taskList.get(), (e2) => {
                      return openBlock(), createElementBlock("li", {
                        key: e2.index
                      }, toDisplayString(e2.title), 1);
                    }), 128))
                  ])) : createCommentVNode("", true)
                ]),
                createBaseVNode("li", _hoisted_6$1, [
                  createBaseVNode("h1", null, "已完成 " + toDisplayString(unref(tasks).get().binList.get().length), 1),
                  unref(tasks).get().binList.get().length != 0 ? (openBlock(), createElementBlock("ul", _hoisted_7$1, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(tasks).get().binList.get(), (e2) => {
                      return openBlock(), createElementBlock("li", {
                        key: e2.index
                      }, toDisplayString(e2.title), 1);
                    }), 128))
                  ])) : createCommentVNode("", true)
                ]),
                createBaseVNode("li", _hoisted_8, [
                  createBaseVNode("h1", null, "固定 " + toDisplayString(unref(tasks).get().focusList.get().length), 1),
                  unref(tasks).get().focusList.get().length != 0 ? (openBlock(), createElementBlock("ul", _hoisted_9, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(tasks).get().focusList.get(), (e2) => {
                      return openBlock(), createElementBlock("li", {
                        key: e2.index
                      }, toDisplayString(e2.title), 1);
                    }), 128))
                  ])) : createCommentVNode("", true)
                ])
              ])
            ])
          ]),
          createBaseVNode("div", null, [
            _hoisted_10,
            createBaseVNode("main", _hoisted_11, [
              createVNode(Tag)
            ])
          ]),
          createBaseVNode("div", _hoisted_12, [
            createBaseVNode("ul", _hoisted_13, [
              createBaseVNode("li", null, [
                _hoisted_14,
                createBaseVNode("md-text-button", {
                  onClick: _cache[0] || (_cache[0] = ($event) => unref(router).push("/helper"))
                }, "Look")
              ])
            ])
          ]),
          createVNode(_component_router_view, { name: "MeInnerBoard" }, {
            default: withCtx(({ Component }) => [
              (openBlock(), createBlock(resolveDynamicComponent(Component)))
            ]),
            _: 1
          })
        ])
      ]);
    };
  }
});
const Me_vue_vue_type_style_index_0_scoped_c3975d4a_lang = "";
const Me = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-c3975d4a"]]);
const _hoisted_1$2 = { class: "relative border rounded-md px-4 py-2" };
const _hoisted_2$2 = { class: "absolute right-1 top-1" };
const _hoisted_3$2 = /* @__PURE__ */ createStaticVNode('<header data-v-88adb667><h1 data-v-88adb667>Help</h1><p data-v-88adb667>你将从这里学习到使用本网页的技能！</p></header><main data-v-88adb667><ol class="list-decimal" data-v-88adb667><li data-v-88adb667><h1 data-v-88adb667>创建一个任务</h1></li><p data-v-88adb667>注意页面顶部的输入框，在输入框中键入Created a task（或者键入你想要的字符），键入完毕后按下输入框旁的添加按钮（或者按下键盘的Enter键）以创建一个任务。</p><li data-v-88adb667><h1 data-v-88adb667>完成一个任务</h1></li><p data-v-88adb667>你会发现此栏目新增了一个Created a task任务。</p><p data-v-88adb667>点击任务旁的方形按钮以完成此任务。当任务完成时它将出现Bin栏目，此栏目中会出现你刚才完成的任务。如果你需要取消任务的完成状态请点击Undo按钮。</p><li data-v-88adb667><h1 data-v-88adb667>删除一个任务</h1></li><p data-v-88adb667>当你点击在任务旁的Remove按钮后，任务将立即被永久删除且无法还原。</p><li data-v-88adb667><h1 data-v-88adb667>置顶一个任务</h1></li><p data-v-88adb667>注意任务旁的爱心形状的按钮，点击后任务将会出现在Focus栏目中置顶，当再次点击爱心形状的按钮后取消置顶。</p></ol></main>', 2);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Helper",
  setup(__props) {
    const router = useRouter();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        createBaseVNode("nav", _hoisted_2$2, [
          createBaseVNode("md-text-button", {
            onClick: _cache[0] || (_cache[0] = ($event) => unref(router).back())
          }, "Hidden")
        ]),
        _hoisted_3$2
      ]);
    };
  }
});
const Helper_vue_vue_type_style_index_0_scoped_88adb667_lang = "";
const Helper = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-88adb667"]]);
const _hoisted_1$1 = ["open"];
const _hoisted_2$1 = /* @__PURE__ */ createBaseVNode("div", { slot: "header" }, [
  /* @__PURE__ */ createBaseVNode("h1", null, "Edit a task")
], -1);
const _hoisted_3$1 = { class: "flex flex-col gap-2" };
const _hoisted_4 = ["value"];
const _hoisted_5 = ["value"];
const _hoisted_6 = ["value"];
const _hoisted_7 = ["value"];
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Editor",
  setup(__props) {
    const router = useRouter();
    const task = reactive({
      ...JSON.parse(router.currentRoute.value.query.task)
    });
    var isOpen = ref(false);
    onMounted(() => {
      isOpen.value = true;
    });
    const submit = () => {
      useTasks().get().taskList.edit(task, task);
      close();
    };
    const cancel = () => {
      close();
    };
    const close = () => {
      isOpen.value = false;
      setTimeout(() => router.push("/"), 250);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("md-dialog", { open: unref(isOpen) }, [
        _hoisted_2$1,
        createBaseVNode("div", _hoisted_3$1, [
          createBaseVNode("md-filled-text-field", {
            value: task.title,
            label: "Title",
            onInput: _cache[0] || (_cache[0] = ($event) => task.title = $event.target.value)
          }, null, 40, _hoisted_4),
          createBaseVNode("md-filled-text-field", {
            value: task.subtitle,
            label: "Subtitle",
            onInput: _cache[1] || (_cache[1] = ($event) => task.subtitle = $event.target.value)
          }, null, 40, _hoisted_5),
          createBaseVNode("md-filled-text-field", {
            value: task.tags.toString(),
            label: "Tag",
            onInput: _cache[2] || (_cache[2] = ($event) => task.tags = $event.target.value.split(","))
          }, null, 40, _hoisted_6),
          createBaseVNode("md-outlined-text-field", {
            type: "date",
            value: task.date,
            label: "Created Date",
            onInput: _cache[3] || (_cache[3] = ($event) => task.date = $event.target.value)
          }, null, 40, _hoisted_7)
        ]),
        createBaseVNode("md-text-button", {
          onClick: cancel,
          slot: "footer"
        }, "Cancel"),
        createBaseVNode("md-filled-button", {
          onClick: submit,
          slot: "footer"
        }, "Apply")
      ], 8, _hoisted_1$1);
    };
  }
});
const _withScopeId = (n2) => (pushScopeId("data-v-153bb4a0"), n2 = n2(), popScopeId(), n2);
const _hoisted_1 = { id: "testDiv" };
const _hoisted_2 = { class: "controller relative" };
const _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "contenter" }, [
  /* @__PURE__ */ createBaseVNode("h1", null, "Material Web Components Test Page"),
  /* @__PURE__ */ createBaseVNode("div", null, [
    /* @__PURE__ */ createBaseVNode("md-filled-button", null, "Test"),
    /* @__PURE__ */ createBaseVNode("md-outlined-button", null, "Test"),
    /* @__PURE__ */ createBaseVNode("md-elevated-button", null, "Test"),
    /* @__PURE__ */ createBaseVNode("md-text-button", null, "Test"),
    /* @__PURE__ */ createBaseVNode("md-tonal-button", null, "Test")
  ]),
  /* @__PURE__ */ createBaseVNode("div", null, [
    /* @__PURE__ */ createBaseVNode("md-fab", null, [
      /* @__PURE__ */ createBaseVNode("i", {
        slot: "icon",
        class: "material-icons"
      }, "group")
    ]),
    /* @__PURE__ */ createBaseVNode("md-fab", { lowered: "" }, [
      /* @__PURE__ */ createBaseVNode("i", {
        slot: "icon",
        class: "material-icons"
      }, "group")
    ]),
    /* @__PURE__ */ createBaseVNode("md-branded-fab", { label: "Test" }, [
      /* @__PURE__ */ createBaseVNode("i", {
        slot: "icon",
        class: "material-icons"
      }, "group")
    ]),
    /* @__PURE__ */ createBaseVNode("md-branded-fab", {
      label: "Test",
      lowered: ""
    }, [
      /* @__PURE__ */ createBaseVNode("i", {
        slot: "icon",
        class: "material-icons"
      }, "group")
    ])
  ]),
  /* @__PURE__ */ createBaseVNode("div", null, [
    /* @__PURE__ */ createBaseVNode("md-filled-text-field", { label: "Test" }),
    /* @__PURE__ */ createBaseVNode("md-outlined-text-field", { label: "Test" })
  ]),
  /* @__PURE__ */ createBaseVNode("div", null, [
    /* @__PURE__ */ createBaseVNode("md-navigation-bar"),
    /* @__PURE__ */ createBaseVNode("md-navigation-bar", null, [
      /* @__PURE__ */ createBaseVNode("md-navigation-tab", { label: "Test" }),
      /* @__PURE__ */ createBaseVNode("md-navigation-tab", { label: "Test" })
    ])
  ]),
  /* @__PURE__ */ createBaseVNode("div", null, [
    /* @__PURE__ */ createBaseVNode("md-switch"),
    /* @__PURE__ */ createBaseVNode("md-checkbox"),
    /* @__PURE__ */ createBaseVNode("md-radio")
  ]),
  /* @__PURE__ */ createBaseVNode("div", null, [
    /* @__PURE__ */ createBaseVNode("md-list", null, [
      /* @__PURE__ */ createBaseVNode("md-list-item", { headline: "Test" }),
      /* @__PURE__ */ createBaseVNode("md-divider"),
      /* @__PURE__ */ createBaseVNode("md-list-item", { headline: "Test" }, [
        /* @__PURE__ */ createBaseVNode("md-icon", {
          "data-variant": "icon",
          class: "material-icons",
          slot: "start"
        }, "group")
      ]),
      /* @__PURE__ */ createBaseVNode("md-divider"),
      /* @__PURE__ */ createBaseVNode("md-list-item", { headline: "Test" }, [
        /* @__PURE__ */ createBaseVNode("md-icon", {
          "data-variant": "icon",
          class: "material-icons",
          slot: "start"
        }, "group"),
        /* @__PURE__ */ createBaseVNode("md-icon", {
          "data-variant": "icon",
          class: "material-icons",
          slot: "end"
        }, "group")
      ]),
      /* @__PURE__ */ createBaseVNode("md-divider")
    ])
  ]),
  /* @__PURE__ */ createBaseVNode("div", null, [
    /* @__PURE__ */ createBaseVNode("md-linear-progress", { progress: "75" }),
    /* @__PURE__ */ createBaseVNode("md-linear-progress", { indeterminate: "" }),
    /* @__PURE__ */ createBaseVNode("md-linear-progress", {
      indeterminate: "",
      fourColors: ""
    }),
    /* @__PURE__ */ createBaseVNode("md-circular-progress", { progress: "0.75" }),
    /* @__PURE__ */ createBaseVNode("md-circular-progress", { indeterminate: "" }),
    /* @__PURE__ */ createBaseVNode("md-circular-progress", {
      indeterminate: "",
      fourColor: ""
    })
  ]),
  /* @__PURE__ */ createBaseVNode("div", null, [
    /* @__PURE__ */ createBaseVNode("md-menu", null, [
      /* @__PURE__ */ createBaseVNode("md-menu-item", { header: "Test" })
    ])
  ])
], -1));
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TestPage",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createVNode(_sfc_main$m),
          createVNode(_sfc_main$n)
        ]),
        _hoisted_3
      ]);
    };
  }
});
const TestPage_vue_vue_type_style_index_0_scoped_153bb4a0_lang = "";
const TestPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-153bb4a0"]]);
const routes = [
  /**
   * 在App组件中显示主面板（Home组件）
   */
  {
    name: "Home",
    path: "/",
    component: _sfc_main$i,
    redirect: "/home",
    children: [
      {
        name: _sfc_main$b,
        path: "/home",
        components: {
          MainBoardView: _sfc_main$b
        },
        children: [
          {
            path: "/Edit",
            name: _sfc_main$1,
            components: {
              HomePageInnerBoardView: _sfc_main$1
            }
          },
          {
            path: "/info",
            name: _sfc_main$6,
            components: {
              HomePageInnerBoardView: _sfc_main$6
            }
          }
        ]
      },
      {
        name: "Me",
        path: "/me",
        components: {
          MainBoardView: Me
        },
        children: [
          {
            name: "Helper",
            path: "/helper",
            components: {
              MeInnerBoard: Helper
            }
          }
        ]
      }
    ]
  },
  {
    name: "Test",
    path: "/test",
    component: TestPage
  }
];
const Router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkExactActiveClass: "active"
});
const index = "";
const materialIcons = "";
const materialWebStyle = "";
function __decorate(decorators, target, key, desc) {
  var c2 = arguments.length, r2 = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r2 = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i3 = decorators.length - 1; i3 >= 0; i3--)
      if (d3 = decorators[i3])
        r2 = (c2 < 3 ? d3(r2) : c2 > 3 ? d3(target, key, r2) : d3(target, key)) || r2;
  return c2 > 3 && r2 && Object.defineProperty(target, key, r2), r2;
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$a = (e2) => (n2) => "function" == typeof n2 ? ((e3, n3) => (customElements.define(e3, n3), n3))(e2, n2) : ((e3, n3) => {
  const { kind: t2, elements: s3 } = n3;
  return { kind: t2, elements: s3, finisher(n4) {
    customElements.define(e3, n4);
  } };
})(e2, n2);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i$6 = (i3, e2) => "method" === e2.kind && e2.descriptor && !("value" in e2.descriptor) ? { ...e2, finisher(n2) {
  n2.createProperty(e2.key, i3);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e2.key, initializer() {
  "function" == typeof e2.initializer && (this[e2.key] = e2.initializer.call(this));
}, finisher(n2) {
  n2.createProperty(e2.key, i3);
} };
function e$9(e2) {
  return (n2, t2) => void 0 !== t2 ? ((i3, e3, n3) => {
    e3.constructor.createProperty(n3, i3);
  })(e2, n2, t2) : i$6(e2, n2);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function t$3(t2) {
  return e$9({ ...t2, state: true });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o$6 = ({ finisher: e2, descriptor: t2 }) => (o3, n2) => {
  var r2;
  if (void 0 === n2) {
    const n3 = null !== (r2 = o3.originalKey) && void 0 !== r2 ? r2 : o3.key, i3 = null != t2 ? { kind: "method", placement: "prototype", key: n3, descriptor: t2(o3.key) } : { ...o3, key: n3 };
    return null != e2 && (i3.finisher = function(t3) {
      e2(t3, n3);
    }), i3;
  }
  {
    const r3 = o3.constructor;
    void 0 !== t2 && Object.defineProperty(o3, n2, t2(n2)), null == e2 || e2(r3, n2);
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function e$8(e2) {
  return o$6({ finisher: (r2, t2) => {
    Object.assign(r2.prototype[t2], e2);
  } });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function i$5(i3, n2) {
  return o$6({ descriptor: (o3) => {
    const t2 = { get() {
      var o4, n3;
      return null !== (n3 = null === (o4 = this.renderRoot) || void 0 === o4 ? void 0 : o4.querySelector(i3)) && void 0 !== n3 ? n3 : null;
    }, enumerable: true, configurable: true };
    if (n2) {
      const n3 = "symbol" == typeof o3 ? Symbol() : "__" + o3;
      t2.get = function() {
        var o4, t3;
        return void 0 === this[n3] && (this[n3] = null !== (t3 = null === (o4 = this.renderRoot) || void 0 === o4 ? void 0 : o4.querySelector(i3)) && void 0 !== t3 ? t3 : null), this[n3];
      };
    }
    return t2;
  } });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function e$7(e2) {
  return o$6({ descriptor: (r2) => ({ async get() {
    var r3;
    return await this.updateComplete, null === (r3 = this.renderRoot) || void 0 === r3 ? void 0 : r3.querySelector(e2);
  }, enumerable: true, configurable: true }) });
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var n$7;
const e$6 = null != (null === (n$7 = window.HTMLSlotElement) || void 0 === n$7 ? void 0 : n$7.prototype.assignedElements) ? (o3, n2) => o3.assignedElements(n2) : (o3, n2) => o3.assignedNodes(n2).filter((o4) => o4.nodeType === Node.ELEMENT_NODE);
function l$5(n2) {
  const { slot: l2, selector: t2 } = null != n2 ? n2 : {};
  return o$6({ descriptor: (o3) => ({ get() {
    var o4;
    const r2 = "slot" + (l2 ? `[name=${l2}]` : ":not([name])"), i3 = null === (o4 = this.renderRoot) || void 0 === o4 ? void 0 : o4.querySelector(r2), s3 = null != i3 ? e$6(i3, n2) : [];
    return t2 ? s3.filter((o5) => o5.matches(t2)) : s3;
  }, enumerable: true, configurable: true }) });
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2 = window, e$5 = t$2.ShadowRoot && (void 0 === t$2.ShadyCSS || t$2.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s$5 = Symbol(), n$6 = /* @__PURE__ */ new WeakMap();
let o$5 = class o {
  constructor(t2, e2, n2) {
    if (this._$cssResult$ = true, n2 !== s$5)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e2;
  }
  get styleSheet() {
    let t2 = this.o;
    const s3 = this.t;
    if (e$5 && void 0 === t2) {
      const e2 = void 0 !== s3 && 1 === s3.length;
      e2 && (t2 = n$6.get(s3)), void 0 === t2 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), e2 && n$6.set(s3, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
};
const r$2 = (t2) => new o$5("string" == typeof t2 ? t2 : t2 + "", void 0, s$5), i$4 = (t2, ...e2) => {
  const n2 = 1 === t2.length ? t2[0] : e2.reduce((e3, s3, n3) => e3 + ((t3) => {
    if (true === t3._$cssResult$)
      return t3.cssText;
    if ("number" == typeof t3)
      return t3;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s3) + t2[n3 + 1], t2[0]);
  return new o$5(n2, t2, s$5);
}, S$1 = (s3, n2) => {
  e$5 ? s3.adoptedStyleSheets = n2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet) : n2.forEach((e2) => {
    const n3 = document.createElement("style"), o3 = t$2.litNonce;
    void 0 !== o3 && n3.setAttribute("nonce", o3), n3.textContent = e2.cssText, s3.appendChild(n3);
  });
}, c$1 = e$5 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const s3 of t3.cssRules)
    e2 += s3.cssText;
  return r$2(e2);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var s$4;
const e$4 = window, r$1 = e$4.trustedTypes, h$1 = r$1 ? r$1.emptyScript : "", o$4 = e$4.reactiveElementPolyfillSupport, n$5 = { toAttribute(t2, i3) {
  switch (i3) {
    case Boolean:
      t2 = t2 ? h$1 : null;
      break;
    case Object:
    case Array:
      t2 = null == t2 ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, i3) {
  let s3 = t2;
  switch (i3) {
    case Boolean:
      s3 = null !== t2;
      break;
    case Number:
      s3 = null === t2 ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        s3 = JSON.parse(t2);
      } catch (t3) {
        s3 = null;
      }
  }
  return s3;
} }, a$2 = (t2, i3) => i3 !== t2 && (i3 == i3 || t2 == t2), l$4 = { attribute: true, type: String, converter: n$5, reflect: false, hasChanged: a$2 };
let d$1 = class d extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this.u();
  }
  static addInitializer(t2) {
    var i3;
    this.finalize(), (null !== (i3 = this.h) && void 0 !== i3 ? i3 : this.h = []).push(t2);
  }
  static get observedAttributes() {
    this.finalize();
    const t2 = [];
    return this.elementProperties.forEach((i3, s3) => {
      const e2 = this._$Ep(s3, i3);
      void 0 !== e2 && (this._$Ev.set(e2, s3), t2.push(e2));
    }), t2;
  }
  static createProperty(t2, i3 = l$4) {
    if (i3.state && (i3.attribute = false), this.finalize(), this.elementProperties.set(t2, i3), !i3.noAccessor && !this.prototype.hasOwnProperty(t2)) {
      const s3 = "symbol" == typeof t2 ? Symbol() : "__" + t2, e2 = this.getPropertyDescriptor(t2, s3, i3);
      void 0 !== e2 && Object.defineProperty(this.prototype, t2, e2);
    }
  }
  static getPropertyDescriptor(t2, i3, s3) {
    return { get() {
      return this[i3];
    }, set(e2) {
      const r2 = this[t2];
      this[i3] = e2, this.requestUpdate(t2, r2, s3);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) || l$4;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return false;
    this.finalized = true;
    const t2 = Object.getPrototypeOf(this);
    if (t2.finalize(), void 0 !== t2.h && (this.h = [...t2.h]), this.elementProperties = new Map(t2.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t3 = this.properties, i3 = [...Object.getOwnPropertyNames(t3), ...Object.getOwnPropertySymbols(t3)];
      for (const s3 of i3)
        this.createProperty(s3, t3[s3]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i3) {
    const s3 = [];
    if (Array.isArray(i3)) {
      const e2 = new Set(i3.flat(1 / 0).reverse());
      for (const i4 of e2)
        s3.unshift(c$1(i4));
    } else
      void 0 !== i3 && s3.push(c$1(i3));
    return s3;
  }
  static _$Ep(t2, i3) {
    const s3 = i3.attribute;
    return false === s3 ? void 0 : "string" == typeof s3 ? s3 : "string" == typeof t2 ? t2.toLowerCase() : void 0;
  }
  u() {
    var t2;
    this._$E_ = new Promise((t3) => this.enableUpdating = t3), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), null === (t2 = this.constructor.h) || void 0 === t2 || t2.forEach((t3) => t3(this));
  }
  addController(t2) {
    var i3, s3;
    (null !== (i3 = this._$ES) && void 0 !== i3 ? i3 : this._$ES = []).push(t2), void 0 !== this.renderRoot && this.isConnected && (null === (s3 = t2.hostConnected) || void 0 === s3 || s3.call(t2));
  }
  removeController(t2) {
    var i3;
    null === (i3 = this._$ES) || void 0 === i3 || i3.splice(this._$ES.indexOf(t2) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t2, i3) => {
      this.hasOwnProperty(i3) && (this._$Ei.set(i3, this[i3]), delete this[i3]);
    });
  }
  createRenderRoot() {
    var t2;
    const s3 = null !== (t2 = this.shadowRoot) && void 0 !== t2 ? t2 : this.attachShadow(this.constructor.shadowRootOptions);
    return S$1(s3, this.constructor.elementStyles), s3;
  }
  connectedCallback() {
    var t2;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), null === (t2 = this._$ES) || void 0 === t2 || t2.forEach((t3) => {
      var i3;
      return null === (i3 = t3.hostConnected) || void 0 === i3 ? void 0 : i3.call(t3);
    });
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    var t2;
    null === (t2 = this._$ES) || void 0 === t2 || t2.forEach((t3) => {
      var i3;
      return null === (i3 = t3.hostDisconnected) || void 0 === i3 ? void 0 : i3.call(t3);
    });
  }
  attributeChangedCallback(t2, i3, s3) {
    this._$AK(t2, s3);
  }
  _$EO(t2, i3, s3 = l$4) {
    var e2;
    const r2 = this.constructor._$Ep(t2, s3);
    if (void 0 !== r2 && true === s3.reflect) {
      const h2 = (void 0 !== (null === (e2 = s3.converter) || void 0 === e2 ? void 0 : e2.toAttribute) ? s3.converter : n$5).toAttribute(i3, s3.type);
      this._$El = t2, null == h2 ? this.removeAttribute(r2) : this.setAttribute(r2, h2), this._$El = null;
    }
  }
  _$AK(t2, i3) {
    var s3;
    const e2 = this.constructor, r2 = e2._$Ev.get(t2);
    if (void 0 !== r2 && this._$El !== r2) {
      const t3 = e2.getPropertyOptions(r2), h2 = "function" == typeof t3.converter ? { fromAttribute: t3.converter } : void 0 !== (null === (s3 = t3.converter) || void 0 === s3 ? void 0 : s3.fromAttribute) ? t3.converter : n$5;
      this._$El = r2, this[r2] = h2.fromAttribute(i3, t3.type), this._$El = null;
    }
  }
  requestUpdate(t2, i3, s3) {
    let e2 = true;
    void 0 !== t2 && (((s3 = s3 || this.constructor.getPropertyOptions(t2)).hasChanged || a$2)(this[t2], i3) ? (this._$AL.has(t2) || this._$AL.set(t2, i3), true === s3.reflect && this._$El !== t2 && (void 0 === this._$EC && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t2, s3))) : e2 = false), !this.isUpdatePending && e2 && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = true;
    try {
      await this._$E_;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return null != t2 && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t2;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((t3, i4) => this[i4] = t3), this._$Ei = void 0);
    let i3 = false;
    const s3 = this._$AL;
    try {
      i3 = this.shouldUpdate(s3), i3 ? (this.willUpdate(s3), null === (t2 = this._$ES) || void 0 === t2 || t2.forEach((t3) => {
        var i4;
        return null === (i4 = t3.hostUpdate) || void 0 === i4 ? void 0 : i4.call(t3);
      }), this.update(s3)) : this._$Ek();
    } catch (t3) {
      throw i3 = false, this._$Ek(), t3;
    }
    i3 && this._$AE(s3);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    var i3;
    null === (i3 = this._$ES) || void 0 === i3 || i3.forEach((t3) => {
      var i4;
      return null === (i4 = t3.hostUpdated) || void 0 === i4 ? void 0 : i4.call(t3);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    void 0 !== this._$EC && (this._$EC.forEach((t3, i3) => this._$EO(i3, this[i3], t3)), this._$EC = void 0), this._$Ek();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
};
d$1.finalized = true, d$1.elementProperties = /* @__PURE__ */ new Map(), d$1.elementStyles = [], d$1.shadowRootOptions = { mode: "open" }, null == o$4 || o$4({ ReactiveElement: d$1 }), (null !== (s$4 = e$4.reactiveElementVersions) && void 0 !== s$4 ? s$4 : e$4.reactiveElementVersions = []).push("1.6.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$1;
const i$3 = window, s$3 = i$3.trustedTypes, e$3 = s$3 ? s$3.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, o$3 = "$lit$", n$4 = `lit$${(Math.random() + "").slice(9)}$`, l$3 = "?" + n$4, h = `<${l$3}>`, r = document, d2 = () => r.createComment(""), u = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2, c = Array.isArray, v = (t2) => c(t2) || "function" == typeof (null == t2 ? void 0 : t2[Symbol.iterator]), a$1 = "[ 	\n\f\r]", f$1 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _ = /-->/g, m = />/g, p = RegExp(`>|${a$1}(?:([^\\s"'>=/]+)(${a$1}*=${a$1}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), g = /'/g, $ = /"/g, y = /^(?:script|style|textarea|title)$/i, w = (t2) => (i3, ...s3) => ({ _$litType$: t2, strings: i3, values: s3 }), x = w(1), T = Symbol.for("lit-noChange"), A = Symbol.for("lit-nothing"), E = /* @__PURE__ */ new WeakMap(), C = r.createTreeWalker(r, 129, null, false), P = (t2, i3) => {
  const s3 = t2.length - 1, l2 = [];
  let r2, d3 = 2 === i3 ? "<svg>" : "", u2 = f$1;
  for (let i4 = 0; i4 < s3; i4++) {
    const s4 = t2[i4];
    let e2, c3, v2 = -1, a2 = 0;
    for (; a2 < s4.length && (u2.lastIndex = a2, c3 = u2.exec(s4), null !== c3); )
      a2 = u2.lastIndex, u2 === f$1 ? "!--" === c3[1] ? u2 = _ : void 0 !== c3[1] ? u2 = m : void 0 !== c3[2] ? (y.test(c3[2]) && (r2 = RegExp("</" + c3[2], "g")), u2 = p) : void 0 !== c3[3] && (u2 = p) : u2 === p ? ">" === c3[0] ? (u2 = null != r2 ? r2 : f$1, v2 = -1) : void 0 === c3[1] ? v2 = -2 : (v2 = u2.lastIndex - c3[2].length, e2 = c3[1], u2 = void 0 === c3[3] ? p : '"' === c3[3] ? $ : g) : u2 === $ || u2 === g ? u2 = p : u2 === _ || u2 === m ? u2 = f$1 : (u2 = p, r2 = void 0);
    const w2 = u2 === p && t2[i4 + 1].startsWith("/>") ? " " : "";
    d3 += u2 === f$1 ? s4 + h : v2 >= 0 ? (l2.push(e2), s4.slice(0, v2) + o$3 + s4.slice(v2) + n$4 + w2) : s4 + n$4 + (-2 === v2 ? (l2.push(void 0), i4) : w2);
  }
  const c2 = d3 + (t2[s3] || "<?>") + (2 === i3 ? "</svg>" : "");
  if (!Array.isArray(t2) || !t2.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [void 0 !== e$3 ? e$3.createHTML(c2) : c2, l2];
};
class V {
  constructor({ strings: t2, _$litType$: i3 }, e2) {
    let h2;
    this.parts = [];
    let r2 = 0, u2 = 0;
    const c2 = t2.length - 1, v2 = this.parts, [a2, f2] = P(t2, i3);
    if (this.el = V.createElement(a2, e2), C.currentNode = this.el.content, 2 === i3) {
      const t3 = this.el.content, i4 = t3.firstChild;
      i4.remove(), t3.append(...i4.childNodes);
    }
    for (; null !== (h2 = C.nextNode()) && v2.length < c2; ) {
      if (1 === h2.nodeType) {
        if (h2.hasAttributes()) {
          const t3 = [];
          for (const i4 of h2.getAttributeNames())
            if (i4.endsWith(o$3) || i4.startsWith(n$4)) {
              const s3 = f2[u2++];
              if (t3.push(i4), void 0 !== s3) {
                const t4 = h2.getAttribute(s3.toLowerCase() + o$3).split(n$4), i5 = /([.?@])?(.*)/.exec(s3);
                v2.push({ type: 1, index: r2, name: i5[2], strings: t4, ctor: "." === i5[1] ? k : "?" === i5[1] ? I : "@" === i5[1] ? L : R });
              } else
                v2.push({ type: 6, index: r2 });
            }
          for (const i4 of t3)
            h2.removeAttribute(i4);
        }
        if (y.test(h2.tagName)) {
          const t3 = h2.textContent.split(n$4), i4 = t3.length - 1;
          if (i4 > 0) {
            h2.textContent = s$3 ? s$3.emptyScript : "";
            for (let s3 = 0; s3 < i4; s3++)
              h2.append(t3[s3], d2()), C.nextNode(), v2.push({ type: 2, index: ++r2 });
            h2.append(t3[i4], d2());
          }
        }
      } else if (8 === h2.nodeType)
        if (h2.data === l$3)
          v2.push({ type: 2, index: r2 });
        else {
          let t3 = -1;
          for (; -1 !== (t3 = h2.data.indexOf(n$4, t3 + 1)); )
            v2.push({ type: 7, index: r2 }), t3 += n$4.length - 1;
        }
      r2++;
    }
  }
  static createElement(t2, i3) {
    const s3 = r.createElement("template");
    return s3.innerHTML = t2, s3;
  }
}
function N(t2, i3, s3 = t2, e2) {
  var o3, n2, l2, h2;
  if (i3 === T)
    return i3;
  let r2 = void 0 !== e2 ? null === (o3 = s3._$Co) || void 0 === o3 ? void 0 : o3[e2] : s3._$Cl;
  const d3 = u(i3) ? void 0 : i3._$litDirective$;
  return (null == r2 ? void 0 : r2.constructor) !== d3 && (null === (n2 = null == r2 ? void 0 : r2._$AO) || void 0 === n2 || n2.call(r2, false), void 0 === d3 ? r2 = void 0 : (r2 = new d3(t2), r2._$AT(t2, s3, e2)), void 0 !== e2 ? (null !== (l2 = (h2 = s3)._$Co) && void 0 !== l2 ? l2 : h2._$Co = [])[e2] = r2 : s3._$Cl = r2), void 0 !== r2 && (i3 = N(t2, r2._$AS(t2, i3.values), r2, e2)), i3;
}
class S {
  constructor(t2, i3) {
    this._$AV = [], this._$AN = void 0, this._$AD = t2, this._$AM = i3;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t2) {
    var i3;
    const { el: { content: s3 }, parts: e2 } = this._$AD, o3 = (null !== (i3 = null == t2 ? void 0 : t2.creationScope) && void 0 !== i3 ? i3 : r).importNode(s3, true);
    C.currentNode = o3;
    let n2 = C.nextNode(), l2 = 0, h2 = 0, d3 = e2[0];
    for (; void 0 !== d3; ) {
      if (l2 === d3.index) {
        let i4;
        2 === d3.type ? i4 = new M(n2, n2.nextSibling, this, t2) : 1 === d3.type ? i4 = new d3.ctor(n2, d3.name, d3.strings, this, t2) : 6 === d3.type && (i4 = new z(n2, this, t2)), this._$AV.push(i4), d3 = e2[++h2];
      }
      l2 !== (null == d3 ? void 0 : d3.index) && (n2 = C.nextNode(), l2++);
    }
    return o3;
  }
  v(t2) {
    let i3 = 0;
    for (const s3 of this._$AV)
      void 0 !== s3 && (void 0 !== s3.strings ? (s3._$AI(t2, s3, i3), i3 += s3.strings.length - 2) : s3._$AI(t2[i3])), i3++;
  }
}
class M {
  constructor(t2, i3, s3, e2) {
    var o3;
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t2, this._$AB = i3, this._$AM = s3, this.options = e2, this._$Cp = null === (o3 = null == e2 ? void 0 : e2.isConnected) || void 0 === o3 || o3;
  }
  get _$AU() {
    var t2, i3;
    return null !== (i3 = null === (t2 = this._$AM) || void 0 === t2 ? void 0 : t2._$AU) && void 0 !== i3 ? i3 : this._$Cp;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i3 = this._$AM;
    return void 0 !== i3 && 11 === (null == t2 ? void 0 : t2.nodeType) && (t2 = i3.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i3 = this) {
    t2 = N(this, t2, i3), u(t2) ? t2 === A || null == t2 || "" === t2 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t2 !== this._$AH && t2 !== T && this._(t2) : void 0 !== t2._$litType$ ? this.g(t2) : void 0 !== t2.nodeType ? this.$(t2) : v(t2) ? this.T(t2) : this._(t2);
  }
  k(t2) {
    return this._$AA.parentNode.insertBefore(t2, this._$AB);
  }
  $(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.k(t2));
  }
  _(t2) {
    this._$AH !== A && u(this._$AH) ? this._$AA.nextSibling.data = t2 : this.$(r.createTextNode(t2)), this._$AH = t2;
  }
  g(t2) {
    var i3;
    const { values: s3, _$litType$: e2 } = t2, o3 = "number" == typeof e2 ? this._$AC(t2) : (void 0 === e2.el && (e2.el = V.createElement(e2.h, this.options)), e2);
    if ((null === (i3 = this._$AH) || void 0 === i3 ? void 0 : i3._$AD) === o3)
      this._$AH.v(s3);
    else {
      const t3 = new S(o3, this), i4 = t3.u(this.options);
      t3.v(s3), this.$(i4), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i3 = E.get(t2.strings);
    return void 0 === i3 && E.set(t2.strings, i3 = new V(t2)), i3;
  }
  T(t2) {
    c(this._$AH) || (this._$AH = [], this._$AR());
    const i3 = this._$AH;
    let s3, e2 = 0;
    for (const o3 of t2)
      e2 === i3.length ? i3.push(s3 = new M(this.k(d2()), this.k(d2()), this, this.options)) : s3 = i3[e2], s3._$AI(o3), e2++;
    e2 < i3.length && (this._$AR(s3 && s3._$AB.nextSibling, e2), i3.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, i3) {
    var s3;
    for (null === (s3 = this._$AP) || void 0 === s3 || s3.call(this, false, true, i3); t2 && t2 !== this._$AB; ) {
      const i4 = t2.nextSibling;
      t2.remove(), t2 = i4;
    }
  }
  setConnected(t2) {
    var i3;
    void 0 === this._$AM && (this._$Cp = t2, null === (i3 = this._$AP) || void 0 === i3 || i3.call(this, t2));
  }
}
class R {
  constructor(t2, i3, s3, e2, o3) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t2, this.name = i3, this._$AM = e2, this.options = o3, s3.length > 2 || "" !== s3[0] || "" !== s3[1] ? (this._$AH = Array(s3.length - 1).fill(new String()), this.strings = s3) : this._$AH = A;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2, i3 = this, s3, e2) {
    const o3 = this.strings;
    let n2 = false;
    if (void 0 === o3)
      t2 = N(this, t2, i3, 0), n2 = !u(t2) || t2 !== this._$AH && t2 !== T, n2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let l2, h2;
      for (t2 = o3[0], l2 = 0; l2 < o3.length - 1; l2++)
        h2 = N(this, e3[s3 + l2], i3, l2), h2 === T && (h2 = this._$AH[l2]), n2 || (n2 = !u(h2) || h2 !== this._$AH[l2]), h2 === A ? t2 = A : t2 !== A && (t2 += (null != h2 ? h2 : "") + o3[l2 + 1]), this._$AH[l2] = h2;
    }
    n2 && !e2 && this.j(t2);
  }
  j(t2) {
    t2 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t2 ? t2 : "");
  }
}
class k extends R {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t2) {
    this.element[this.name] = t2 === A ? void 0 : t2;
  }
}
const H = s$3 ? s$3.emptyScript : "";
class I extends R {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t2) {
    t2 && t2 !== A ? this.element.setAttribute(this.name, H) : this.element.removeAttribute(this.name);
  }
}
class L extends R {
  constructor(t2, i3, s3, e2, o3) {
    super(t2, i3, s3, e2, o3), this.type = 5;
  }
  _$AI(t2, i3 = this) {
    var s3;
    if ((t2 = null !== (s3 = N(this, t2, i3, 0)) && void 0 !== s3 ? s3 : A) === T)
      return;
    const e2 = this._$AH, o3 = t2 === A && e2 !== A || t2.capture !== e2.capture || t2.once !== e2.once || t2.passive !== e2.passive, n2 = t2 !== A && (e2 === A || o3);
    o3 && this.element.removeEventListener(this.name, this, e2), n2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    var i3, s3;
    "function" == typeof this._$AH ? this._$AH.call(null !== (s3 = null === (i3 = this.options) || void 0 === i3 ? void 0 : i3.host) && void 0 !== s3 ? s3 : this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class z {
  constructor(t2, i3, s3) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i3, this.options = s3;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    N(this, t2);
  }
}
const j = i$3.litHtmlPolyfillSupport;
null == j || j(V, M), (null !== (t$1 = i$3.litHtmlVersions) && void 0 !== t$1 ? t$1 : i$3.litHtmlVersions = []).push("2.7.3");
const B = (t2, i3, s3) => {
  var e2, o3;
  const n2 = null !== (e2 = null == s3 ? void 0 : s3.renderBefore) && void 0 !== e2 ? e2 : i3;
  let l2 = n2._$litPart$;
  if (void 0 === l2) {
    const t3 = null !== (o3 = null == s3 ? void 0 : s3.renderBefore) && void 0 !== o3 ? o3 : null;
    n2._$litPart$ = l2 = new M(i3.insertBefore(d2(), t3), t3, void 0, null != s3 ? s3 : {});
  }
  return l2._$AI(t2), l2;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var l$2, o$2;
let s$2 = class s extends d$1 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t2, e2;
    const i3 = super.createRenderRoot();
    return null !== (t2 = (e2 = this.renderOptions).renderBefore) && void 0 !== t2 || (e2.renderBefore = i3.firstChild), i3;
  }
  update(t2) {
    const i3 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Do = B(i3, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t2;
    super.connectedCallback(), null === (t2 = this._$Do) || void 0 === t2 || t2.setConnected(true);
  }
  disconnectedCallback() {
    var t2;
    super.disconnectedCallback(), null === (t2 = this._$Do) || void 0 === t2 || t2.setConnected(false);
  }
  render() {
    return T;
  }
};
s$2.finalized = true, s$2._$litElement$ = true, null === (l$2 = globalThis.litElementHydrateSupport) || void 0 === l$2 || l$2.call(globalThis, { LitElement: s$2 });
const n$3 = globalThis.litElementPolyfillSupport;
null == n$3 || n$3({ LitElement: s$2 });
(null !== (o$2 = globalThis.litElementVersions) && void 0 !== o$2 ? o$2 : globalThis.litElementVersions = []).push("3.3.2");
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class Elevation extends s$2 {
  render() {
    return x`<span class="shadow"></span>`;
  }
}
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$N = i$4`:host{--_level: var(--md-elevation-level, 0);--_shadow-color: var(--md-elevation-shadow-color, var(--md-sys-color-shadow, #000));display:flex;pointer-events:none}:host,.shadow,.shadow::before,.shadow::after{border-radius:inherit;inset:0;position:absolute;transition-duration:inherit;transition-timing-function:inherit}.shadow::before,.shadow::after{content:"";transition-property:box-shadow,opacity}.shadow::before{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 3,1) + 2*clamp(0,var(--_level) - 4,1))) calc(1px*(2*clamp(0,var(--_level),1) + clamp(0,var(--_level) - 2,1) + clamp(0,var(--_level) - 4,1))) 0px var(--_shadow-color);opacity:.3}.shadow::after{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 1,1) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(3*clamp(0,var(--_level),2) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(clamp(0,var(--_level),4) + 2*clamp(0,var(--_level) - 4,1))) var(--_shadow-color);opacity:.15}/*# sourceMappingURL=elevation-styles.css.map */
`;
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let MdElevation = class MdElevation2 extends Elevation {
};
MdElevation.styles = [styles$N];
MdElevation = __decorate([
  e$a("md-elevation")
], MdElevation);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class FocusRing extends s$2 {
  constructor() {
    super(...arguments);
    this.visible = false;
  }
}
__decorate([
  e$9({ type: Boolean, reflect: true })
], FocusRing.prototype, "visible", void 0);
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$M = i$4`:host{--_shape-start-start: var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, 9999px));--_shape-start-end: var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, 9999px));--_shape-end-end: var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, 9999px));--_shape-end-start: var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, 9999px));--_offset: var(--md-focus-ring-offset, 2px);--_width: var(--md-focus-ring-width, 3px);--_animation-width: var(--md-focus-ring-animation-width, 8px);--_animation-duration: var(--md-focus-ring-animation-duration, 600ms);--_easing: var(--md-focus-ring-easing, cubic-bezier(0.2, 0, 0, 1));--_color: var(--md-focus-ring-color, var(--md-sys-color-secondary, #625b71));display:none;position:absolute;box-sizing:border-box;pointer-events:none;border-start-start-radius:calc(var(--_offset) + var(--_shape-start-start));border-start-end-radius:calc(var(--_offset) + var(--_shape-start-end));border-end-start-radius:calc(var(--_offset) + var(--_shape-end-start));border-end-end-radius:calc(var(--_offset) + var(--_shape-end-end));box-shadow:inset 0 0 0 0 var(--_color);outline:var(--_width) solid var(--_color);outline-offset:-1px;inset:calc(-1*(var(--_offset) + 1px))}:host([visible]){display:flex;animation-name:focus-ring;animation-duration:var(--_animation-duration);animation-timing-function:var(--_easing)}@keyframes focus-ring{from{outline-width:0px}25%{box-shadow:inset 0 0 0 calc(var(--_animation-width)/2) var(--_color);outline-width:calc(var(--_animation-width)/2)}}@media(prefers-reduced-motion){:host([visible]){animation:none}}/*# sourceMappingURL=focus-ring-styles.css.map */
`;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let MdFocusRing = class MdFocusRing2 extends FocusRing {
};
MdFocusRing.styles = [styles$M];
MdFocusRing = __decorate([
  e$a("md-focus-ring")
], MdFocusRing);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, e$2 = (t2) => (...e2) => ({ _$litDirective$: t2, values: e2 });
let i$2 = class i {
  constructor(t2) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t2, e2, i3) {
    this._$Ct = t2, this._$AM = e2, this._$Ci = i3;
  }
  _$AS(t2, e2) {
    return this.update(t2, e2);
  }
  update(t2, e2) {
    return this.render(...e2);
  }
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o$1 = e$2(class extends i$2 {
  constructor(t$12) {
    var i3;
    if (super(t$12), t$12.type !== t.ATTRIBUTE || "class" !== t$12.name || (null === (i3 = t$12.strings) || void 0 === i3 ? void 0 : i3.length) > 2)
      throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t2) {
    return " " + Object.keys(t2).filter((i3) => t2[i3]).join(" ") + " ";
  }
  update(i3, [s3]) {
    var r2, o3;
    if (void 0 === this.it) {
      this.it = /* @__PURE__ */ new Set(), void 0 !== i3.strings && (this.nt = new Set(i3.strings.join(" ").split(/\s/).filter((t2) => "" !== t2)));
      for (const t2 in s3)
        s3[t2] && !(null === (r2 = this.nt) || void 0 === r2 ? void 0 : r2.has(t2)) && this.it.add(t2);
      return this.render(s3);
    }
    const e2 = i3.element.classList;
    this.it.forEach((t2) => {
      t2 in s3 || (e2.remove(t2), this.it.delete(t2));
    });
    for (const t2 in s3) {
      const i4 = !!s3[t2];
      i4 === this.it.has(t2) || (null === (o3 = this.nt) || void 0 === o3 ? void 0 : o3.has(t2)) || (i4 ? (e2.add(t2), this.it.add(t2)) : (e2.remove(t2), this.it.delete(t2)));
    }
    return T;
  }
});
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const EASING = {
  STANDARD: "cubic-bezier(0.2, 0, 0, 1)",
  STANDARD_ACCELERATE: "cubic-bezier(.3,0,1,1)",
  STANDARD_DECELERATE: "cubic-bezier(0,0,0,1)",
  EMPHASIZED: "cubic-bezier(.3,0,0,1)",
  EMPHASIZED_ACCELERATE: "cubic-bezier(.3,0,.8,.15)",
  EMPHASIZED_DECELERATE: "cubic-bezier(.05,.7,.1,1)"
};
function createAnimationSignal() {
  let animationAbortController = null;
  return {
    start() {
      animationAbortController?.abort();
      animationAbortController = new AbortController();
      return animationAbortController.signal;
    },
    finish() {
      animationAbortController = null;
    }
  };
}
function createThrottle() {
  const stack = /* @__PURE__ */ new Set();
  return async (key = "", cb, timeout = async () => {
    await new Promise(requestAnimationFrame);
  }) => {
    if (!stack.has(key)) {
      stack.add(key);
      await timeout();
      if (stack.has(key)) {
        stack.delete(key);
        cb();
      }
    }
  };
}
function msFromTimeCSSValue(value) {
  const match = value.trim().match(/([\d.]+)(\s*s$)?/);
  const time = match?.[1];
  const seconds2 = match?.[2];
  return Number(time ?? 0) * (seconds2 ? 1e3 : 1);
}
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const PRESS_GROW_MS = 450;
const MINIMUM_PRESS_MS = 225;
const INITIAL_ORIGIN_SCALE = 0.2;
const PADDING = 10;
const SOFT_EDGE_MINIMUM_SIZE = 75;
const SOFT_EDGE_CONTAINER_RATIO = 0.35;
const PRESS_PSEUDO = "::after";
const ANIMATION_FILL = "forwards";
var State;
(function(State2) {
  State2[State2["INACTIVE"] = 0] = "INACTIVE";
  State2[State2["TOUCH_DELAY"] = 1] = "TOUCH_DELAY";
  State2[State2["HOLDING"] = 2] = "HOLDING";
  State2[State2["WAITING_FOR_CLICK"] = 3] = "WAITING_FOR_CLICK";
})(State || (State = {}));
const TOUCH_DELAY_MS = 150;
class Ripple extends s$2 {
  constructor() {
    super(...arguments);
    this.unbounded = false;
    this.disabled = false;
    this.hovered = false;
    this.focused = false;
    this.pressed = false;
    this.rippleSize = "";
    this.rippleScale = "";
    this.initialSize = 0;
    this.state = State.INACTIVE;
    this.checkBoundsAfterContextMenu = false;
  }
  handlePointerenter(event) {
    if (!this.shouldReactToEvent(event)) {
      return;
    }
    this.hovered = true;
  }
  handlePointerleave(event) {
    if (!this.shouldReactToEvent(event)) {
      return;
    }
    this.hovered = false;
    if (this.state !== State.INACTIVE) {
      this.endPressAnimation();
    }
  }
  handleFocusin() {
    this.focused = true;
  }
  handleFocusout() {
    this.focused = false;
  }
  handlePointerup(event) {
    if (!this.shouldReactToEvent(event)) {
      return;
    }
    if (this.state === State.HOLDING) {
      this.state = State.WAITING_FOR_CLICK;
      return;
    }
    if (this.state === State.TOUCH_DELAY) {
      this.state = State.WAITING_FOR_CLICK;
      this.startPressAnimation(this.rippleStartEvent);
      return;
    }
  }
  async handlePointerdown(event) {
    if (!this.shouldReactToEvent(event)) {
      return;
    }
    this.rippleStartEvent = event;
    if (!this.isTouch(event)) {
      this.state = State.WAITING_FOR_CLICK;
      this.startPressAnimation(event);
      return;
    }
    if (this.checkBoundsAfterContextMenu && !this.inBounds(event)) {
      return;
    }
    this.checkBoundsAfterContextMenu = false;
    this.state = State.TOUCH_DELAY;
    await new Promise((resolve2) => {
      setTimeout(resolve2, TOUCH_DELAY_MS);
    });
    if (this.state !== State.TOUCH_DELAY) {
      return;
    }
    this.state = State.HOLDING;
    this.startPressAnimation(event);
  }
  handleClick() {
    if (this.disabled) {
      return;
    }
    if (this.state === State.WAITING_FOR_CLICK) {
      this.endPressAnimation();
      return;
    }
    if (this.state === State.INACTIVE) {
      this.startPressAnimation();
      this.endPressAnimation();
    }
  }
  handlePointercancel(event) {
    if (!this.shouldReactToEvent(event)) {
      return;
    }
    this.endPressAnimation();
  }
  handleContextmenu() {
    if (this.disabled) {
      return;
    }
    this.checkBoundsAfterContextMenu = true;
    this.endPressAnimation();
  }
  render() {
    const classes = {
      "hovered": this.hovered,
      "focused": this.focused,
      "pressed": this.pressed,
      "unbounded": this.unbounded
    };
    return x`<div class="surface ${o$1(classes)}"></div>`;
  }
  update(changedProps) {
    if (changedProps.has("disabled") && this.disabled) {
      this.hovered = false;
      this.focused = false;
      this.pressed = false;
    }
    super.update(changedProps);
  }
  getDimensions() {
    return (this.parentElement ?? this).getBoundingClientRect();
  }
  determineRippleSize() {
    const { height, width } = this.getDimensions();
    const maxDim = Math.max(height, width);
    const softEdgeSize = Math.max(SOFT_EDGE_CONTAINER_RATIO * maxDim, SOFT_EDGE_MINIMUM_SIZE);
    let maxRadius = maxDim;
    let initialSize = Math.floor(maxDim * INITIAL_ORIGIN_SCALE);
    const hypotenuse = Math.sqrt(width ** 2 + height ** 2);
    maxRadius = hypotenuse + PADDING;
    if (this.unbounded) {
      initialSize = initialSize - initialSize % 2;
    }
    this.initialSize = initialSize;
    this.rippleScale = `${(maxRadius + softEdgeSize) / initialSize}`;
    this.rippleSize = `${this.initialSize}px`;
  }
  getNormalizedPointerEventCoords(pointerEvent) {
    const { scrollX, scrollY } = window;
    const { left, top } = this.getDimensions();
    const documentX = scrollX + left;
    const documentY = scrollY + top;
    const { pageX, pageY } = pointerEvent;
    return { x: pageX - documentX, y: pageY - documentY };
  }
  getTranslationCoordinates(positionEvent) {
    const { height, width } = this.getDimensions();
    const endPoint = {
      x: (width - this.initialSize) / 2,
      y: (height - this.initialSize) / 2
    };
    let startPoint;
    if (positionEvent instanceof PointerEvent) {
      startPoint = this.getNormalizedPointerEventCoords(positionEvent);
    } else {
      startPoint = {
        x: width / 2,
        y: height / 2
      };
    }
    startPoint = {
      x: startPoint.x - this.initialSize / 2,
      y: startPoint.y - this.initialSize / 2
    };
    return { startPoint, endPoint };
  }
  startPressAnimation(positionEvent) {
    this.pressed = true;
    this.growAnimation?.cancel();
    this.determineRippleSize();
    const { startPoint, endPoint } = this.getTranslationCoordinates(positionEvent);
    const translateStart = `${startPoint.x}px, ${startPoint.y}px`;
    const translateEnd = `${endPoint.x}px, ${endPoint.y}px`;
    this.growAnimation = this.mdRoot.animate({
      top: [0, 0],
      left: [0, 0],
      height: [this.rippleSize, this.rippleSize],
      width: [this.rippleSize, this.rippleSize],
      transform: [
        `translate(${translateStart}) scale(1)`,
        `translate(${translateEnd}) scale(${this.rippleScale})`
      ]
    }, {
      pseudoElement: PRESS_PSEUDO,
      duration: PRESS_GROW_MS,
      easing: EASING.STANDARD,
      fill: ANIMATION_FILL
    });
  }
  async endPressAnimation() {
    const animation = this.growAnimation;
    const pressAnimationPlayState = animation?.currentTime ?? Infinity;
    if (pressAnimationPlayState >= MINIMUM_PRESS_MS) {
      this.pressed = false;
      return;
    }
    await new Promise((resolve2) => {
      setTimeout(resolve2, MINIMUM_PRESS_MS - pressAnimationPlayState);
    });
    if (this.growAnimation !== animation) {
      return;
    }
    this.pressed = false;
  }
  /**
   * Returns `true` if
   *  - the ripple element is enabled
   *  - the pointer is primary for the input type
   *  - the pointer is the pointer that started the interaction, or will start
   * the interaction
   *  - the pointer is a touch, or the pointer state has the primary button
   * held, or the pointer is hovering
   */
  shouldReactToEvent(event) {
    if (this.disabled || !event.isPrimary) {
      return false;
    }
    if (this.rippleStartEvent && this.rippleStartEvent.pointerId !== event.pointerId) {
      return false;
    }
    if (event.type === "pointerenter" || event.type === "pointerleave") {
      return !this.isTouch(event);
    }
    const isPrimaryButton = event.buttons === 1;
    return this.isTouch(event) || isPrimaryButton;
  }
  /**
   * Check if the event is within the bounds of the element.
   *
   * This is only needed for the "stuck" contextmenu longpress on Chrome.
   */
  inBounds({ x: x2, y: y2 }) {
    const { top, left, bottom, right } = this.getBoundingClientRect();
    return x2 >= left && x2 <= right && y2 >= top && y2 <= bottom;
  }
  isTouch({ pointerType }) {
    return pointerType === "touch";
  }
}
__decorate([
  e$9({ type: Boolean, reflect: true })
], Ripple.prototype, "unbounded", void 0);
__decorate([
  e$9({ type: Boolean, reflect: true })
], Ripple.prototype, "disabled", void 0);
__decorate([
  t$3()
], Ripple.prototype, "hovered", void 0);
__decorate([
  t$3()
], Ripple.prototype, "focused", void 0);
__decorate([
  t$3()
], Ripple.prototype, "pressed", void 0);
__decorate([
  i$5(".surface")
], Ripple.prototype, "mdRoot", void 0);
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$L = i$4`:host{--_focus-color: var(--md-ripple-focus-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-opacity: var(--md-ripple-focus-opacity, 0.12);--_hover-color: var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-opacity: var(--md-ripple-hover-opacity, 0.08);--_pressed-color: var(--md-ripple-pressed-color, var(--md-sys-color-on-surface, #1d1b20));--_pressed-opacity: var(--md-ripple-pressed-opacity, 0.12);--_shape: var(--md-ripple-shape, 0px)}:host{display:flex}:host([disabled]){opacity:0}:host,.surface{position:absolute;inset:0;pointer-events:none;overflow:hidden}.surface{will-change:transform;border-radius:var(--_shape);outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.surface::before,.surface::after{position:absolute;opacity:0;pointer-events:none;content:""}.surface::before{background-color:var(--_hover-color);transition:opacity 15ms linear,background-color 15ms linear;inset:0}.surface::after{background:radial-gradient(closest-side, var(--_pressed-color) max(100% - 70px, 65%), transparent 100%);transition:opacity 375ms linear;transform-origin:center center}.hovered::before{background-color:var(--_hover-color);opacity:var(--_hover-opacity)}.focused::before{background-color:var(--_focus-color);opacity:var(--_focus-opacity);transition-duration:75ms}.pressed::after{opacity:var(--_pressed-opacity);transition-duration:105ms}.unbounded{--_shape: var(--md-ripple-shape, 9999px)}@media screen and (forced-colors: active){:host{display:none}}/*# sourceMappingURL=ripple-styles.css.map */
`;
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let MdRipple = class MdRipple2 extends Ripple {
};
MdRipple.styles = [styles$L];
MdRipple = __decorate([
  e$a("md-ripple")
], MdRipple);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function n$2(n2, o3, r2) {
  return n2 ? o3() : null == r2 ? void 0 : r2();
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$1 = Symbol.for(""), l$1 = (t2) => {
  if ((null == t2 ? void 0 : t2.r) === e$1)
    return null == t2 ? void 0 : t2._$litStatic$;
}, i$1 = (t2, ...r2) => ({ _$litStatic$: r2.reduce((r3, e2, l2) => r3 + ((t3) => {
  if (void 0 !== t3._$litStatic$)
    return t3._$litStatic$;
  throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t3}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`);
})(e2) + t2[l2 + 1], t2[0]), r: e$1 }), s$1 = /* @__PURE__ */ new Map(), a = (t2) => (r2, ...e2) => {
  const o3 = e2.length;
  let i3, a2;
  const n2 = [], u2 = [];
  let c2, $2 = 0, f2 = false;
  for (; $2 < o3; ) {
    for (c2 = r2[$2]; $2 < o3 && void 0 !== (a2 = e2[$2], i3 = l$1(a2)); )
      c2 += i3 + r2[++$2], f2 = true;
    $2 !== o3 && u2.push(a2), n2.push(c2), $2++;
  }
  if ($2 === o3 && n2.push(r2[o3]), f2) {
    const t3 = n2.join("$$lit$$");
    void 0 === (r2 = s$1.get(t3)) && (n2.raw = n2, s$1.set(t3, r2 = n2)), e2 = u2;
  }
  return t2(r2, ...e2);
}, n$1 = a(x);
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const ARIA_PROPERTIES = [
  "ariaAtomic",
  "ariaAutoComplete",
  "ariaBusy",
  "ariaChecked",
  "ariaColCount",
  "ariaColIndex",
  "ariaColIndexText",
  "ariaColSpan",
  "ariaCurrent",
  "ariaDisabled",
  "ariaExpanded",
  "ariaHasPopup",
  "ariaHidden",
  "ariaInvalid",
  "ariaKeyShortcuts",
  "ariaLabel",
  "ariaLevel",
  "ariaLive",
  "ariaModal",
  "ariaMultiLine",
  "ariaMultiSelectable",
  "ariaOrientation",
  "ariaPlaceholder",
  "ariaPosInSet",
  "ariaPressed",
  "ariaReadOnly",
  "ariaRequired",
  "ariaRoleDescription",
  "ariaRowCount",
  "ariaRowIndex",
  "ariaRowIndexText",
  "ariaRowSpan",
  "ariaSelected",
  "ariaSetSize",
  "ariaSort",
  "ariaValueMax",
  "ariaValueMin",
  "ariaValueNow",
  "ariaValueText"
];
ARIA_PROPERTIES.map(ariaPropertyToAttribute);
function ariaPropertyToAttribute(property) {
  return property.replace("aria", "aria-").replace(/Elements?/g, "").toLowerCase();
}
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
function requestUpdateOnAriaChange(ctor) {
  for (const ariaProperty of ARIA_PROPERTIES) {
    ctor.createProperty(ariaProperty, {
      attribute: ariaPropertyToAttribute(ariaProperty),
      reflect: true
    });
  }
  ctor.addInitializer((element) => {
    const controller = {
      hostConnected() {
        element.setAttribute("role", "presentation");
      }
    };
    element.addController(controller);
  });
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
function redispatchEvent(element, event) {
  if (event.bubbles && (!element.shadowRoot || event.composed)) {
    event.stopPropagation();
  }
  const copy = Reflect.construct(event.constructor, [event.type, event]);
  const dispatched = element.dispatchEvent(copy);
  if (!dispatched) {
    event.preventDefault();
  }
  return dispatched;
}
function dispatchActivationClick(element) {
  const event = new MouseEvent("click", { bubbles: true });
  element.dispatchEvent(event);
  return event;
}
function isActivationClick(event) {
  if (event.currentTarget !== event.target) {
    return false;
  }
  if (event.composedPath()[0] !== event.target) {
    return false;
  }
  if (event.target.disabled) {
    return false;
  }
  return !squelchEvent(event);
}
function squelchEvent(event) {
  const squelched = isSquelchingEvents;
  if (squelched) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }
  squelchEventsForMicrotask();
  return squelched;
}
let isSquelchingEvents = false;
async function squelchEventsForMicrotask() {
  isSquelchingEvents = true;
  await null;
  isSquelchingEvents = false;
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class FocusGlobal {
  constructor() {
    this.visible = false;
  }
  setVisible(visible) {
    this.visible = visible;
  }
}
let focusObject = new FocusGlobal();
const KEYBOARD_NAVIGATION_KEYS = /* @__PURE__ */ new Set(["Tab", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]);
function keydownHandler(e2) {
  if (KEYBOARD_NAVIGATION_KEYS.has(e2.key)) {
    focusObject.setVisible(true);
  }
}
function setup(focusGlobal, enableKeydownHandler = false) {
  focusObject = focusGlobal;
  if (enableKeydownHandler) {
    window.addEventListener("keydown", keydownHandler);
  } else {
    window.removeEventListener("keydown", keydownHandler);
  }
}
function shouldShowStrongFocus() {
  return focusObject.visible;
}
function pointerPress() {
  focusObject.setVisible(false);
}
setup(focusObject, true);
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class RippleDirective extends i$2 {
  constructor(partInfo) {
    super(partInfo);
    this.rippleGetter = async () => null;
    if (partInfo.type !== t.ELEMENT) {
      throw new Error("The `ripple` directive must be used on an element");
    }
  }
  render(ripple2) {
    return T;
  }
  // Use EventListenerObject::handleEvent interface to handle events without
  // generating bound event handlers
  async handleEvent(event) {
    const ripple2 = await this.rippleGetter();
    if (!ripple2) {
      return;
    }
    switch (event.type) {
      case "click":
        ripple2.handleClick();
        break;
      case "contextmenu":
        ripple2.handleContextmenu();
        break;
      case "pointercancel":
        ripple2.handlePointercancel(event);
        break;
      case "pointerdown":
        await ripple2.handlePointerdown(event);
        break;
      case "pointerenter":
        ripple2.handlePointerenter(event);
        break;
      case "pointerleave":
        ripple2.handlePointerleave(event);
        break;
      case "pointerup":
        ripple2.handlePointerup(event);
        break;
    }
  }
  update(part, [ripple2]) {
    if (!this.element) {
      this.element = part.element;
      this.element.addEventListener("click", this);
      this.element.addEventListener("contextmenu", this);
      this.element.addEventListener("pointercancel", this);
      this.element.addEventListener("pointerdown", this);
      this.element.addEventListener("pointerenter", this);
      this.element.addEventListener("pointerleave", this);
      this.element.addEventListener("pointerup", this);
    }
    this.rippleGetter = typeof ripple2 === "function" ? ripple2 : () => ripple2;
    return T;
  }
}
const ripple = e$2(RippleDirective);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
var _a$f;
class Button extends s$2 {
  constructor() {
    super();
    this.disabled = false;
    this.trailingIcon = false;
    this.hasIcon = false;
    this.preventClickDefault = false;
    this.showFocusRing = false;
    this.showRipple = false;
    this.handleActivationClick = (event) => {
      if (!isActivationClick(event)) {
        return;
      }
      this.focus();
      dispatchActivationClick(this.buttonElement);
    };
    this.getRipple = () => {
      this.showRipple = true;
      return this.ripple;
    };
    this.renderRipple = () => {
      return x`<md-ripple class="md3-button__ripple" ?disabled="${this.disabled}"></md-ripple>`;
    };
    {
      this.addEventListener("click", this.handleActivationClick);
    }
  }
  focus() {
    this.buttonElement.focus();
  }
  blur() {
    this.buttonElement.blur();
  }
  render() {
    const isDisabled = this.disabled && !this.href;
    const button = this.href ? i$1`a` : i$1`button`;
    const { ariaLabel, ariaHasPopup, ariaExpanded } = this;
    return n$1`
      <${button}
        class="md3-button ${o$1(this.getRenderClasses())}"
        ?disabled=${isDisabled}
        aria-label="${ariaLabel || A}"
        aria-haspopup="${ariaHasPopup || A}"
        aria-expanded="${ariaExpanded || A}"
        href=${this.href || A}
        target=${this.target || A}
        @pointerdown="${this.handlePointerDown}"
        @focus="${this.handleFocus}"
        @blur="${this.handleBlur}"
        @click="${this.handleClick}"
        ${ripple(this.getRipple)}
      >
        ${this.renderFocusRing()}
        ${this.renderElevation()}
        ${n$2(this.showRipple, this.renderRipple)}
        ${this.renderOutline()}
        ${this.renderTouchTarget()}
        ${this.renderLeadingIcon()}
        ${this.renderLabel()}
        ${this.renderTrailingIcon()}
      </${button}>`;
  }
  getRenderClasses() {
    return {
      "md3-button--icon-leading": !this.trailingIcon && this.hasIcon,
      "md3-button--icon-trailing": this.trailingIcon && this.hasIcon
    };
  }
  renderTouchTarget() {
    return x`
      <span class="md3-button__touch"></span>
    `;
  }
  renderElevation() {
    return x``;
  }
  renderOutline() {
    return x``;
  }
  renderFocusRing() {
    return x`<md-focus-ring .visible="${this.showFocusRing}"></md-focus-ring>`;
  }
  renderLabel() {
    return x`<span class="md3-button__label"><slot></slot></span>`;
  }
  renderLeadingIcon() {
    return this.trailingIcon ? "" : this.renderIcon();
  }
  renderTrailingIcon() {
    return this.trailingIcon ? this.renderIcon() : "";
  }
  renderIcon() {
    return x`<slot name="icon" @slotchange="${this.handleSlotChange}"></slot>`;
  }
  handlePointerDown(e2) {
    pointerPress();
    this.showFocusRing = shouldShowStrongFocus();
  }
  handleClick(e2) {
    if (this.preventClickDefault) {
      e2.preventDefault();
    }
  }
  handleFocus() {
    this.showFocusRing = shouldShowStrongFocus();
  }
  handleBlur() {
    this.showFocusRing = false;
  }
  handleSlotChange() {
    this.hasIcon = this.assignedIcons.length > 0;
  }
}
_a$f = Button;
(() => {
  requestUpdateOnAriaChange(_a$f);
})();
Button.shadowRootOptions = { mode: "open", delegatesFocus: true };
__decorate([
  e$9({ type: Boolean, reflect: true })
], Button.prototype, "disabled", void 0);
__decorate([
  e$9()
], Button.prototype, "href", void 0);
__decorate([
  e$9()
], Button.prototype, "target", void 0);
__decorate([
  e$9({ type: Boolean, attribute: "trailingicon" })
], Button.prototype, "trailingIcon", void 0);
__decorate([
  e$9({ type: Boolean })
], Button.prototype, "hasIcon", void 0);
__decorate([
  e$9({ type: Boolean })
], Button.prototype, "preventClickDefault", void 0);
__decorate([
  i$5(".md3-button")
], Button.prototype, "buttonElement", void 0);
__decorate([
  e$7("md-ripple")
], Button.prototype, "ripple", void 0);
__decorate([
  t$3()
], Button.prototype, "showFocusRing", void 0);
__decorate([
  t$3()
], Button.prototype, "showRipple", void 0);
__decorate([
  l$5({ slot: "icon", flatten: true })
], Button.prototype, "assignedIcons", void 0);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class ElevatedButton extends Button {
  getRenderClasses() {
    return {
      ...super.getRenderClasses(),
      "md3-button--elevated": true
    };
  }
  renderElevation() {
    return x`<md-elevation></md-elevation>`;
  }
}
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$K = i$4`:host{--_container-shape-start-start: var(--md-elevated-button-container-shape-start-start, var(--md-elevated-button-container-shape, 9999px));--_container-shape-start-end: var(--md-elevated-button-container-shape-start-end, var(--md-elevated-button-container-shape, 9999px));--_container-shape-end-end: var(--md-elevated-button-container-shape-end-end, var(--md-elevated-button-container-shape, 9999px));--_container-shape-end-start: var(--md-elevated-button-container-shape-end-start, var(--md-elevated-button-container-shape, 9999px));--_container-color: var(--md-elevated-button-container-color, var(--md-sys-color-surface-container-low, #f7f2fa));--_container-elevation: var(--md-elevated-button-container-elevation, 1);--_container-height: var(--md-elevated-button-container-height, 40px);--_container-shadow-color: var(--md-elevated-button-container-shadow-color, var(--md-sys-color-shadow, #000));--_disabled-container-color: var(--md-elevated-button-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-elevation: var(--md-elevated-button-disabled-container-elevation, 0);--_disabled-container-opacity: var(--md-elevated-button-disabled-container-opacity, 0.12);--_disabled-label-text-color: var(--md-elevated-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-elevated-button-disabled-label-text-opacity, 0.38);--_focus-container-elevation: var(--md-elevated-button-focus-container-elevation, 1);--_focus-label-text-color: var(--md-elevated-button-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-state-layer-color: var(--md-elevated-button-focus-state-layer-color, var(--md-sys-color-primary, #6750a4));--_focus-state-layer-opacity: var(--md-elevated-button-focus-state-layer-opacity, 0.12);--_hover-container-elevation: var(--md-elevated-button-hover-container-elevation, 2);--_hover-label-text-color: var(--md-elevated-button-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color: var(--md-elevated-button-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-elevated-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-elevated-button-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-type: var(--md-elevated-button-label-text-type, var(--md-sys-typescale-label-large, 500 0.875rem / 1.25rem var(--md-ref-typeface-plain, Roboto)));--_pressed-container-elevation: var(--md-elevated-button-pressed-container-elevation, 1);--_pressed-label-text-color: var(--md-elevated-button-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-color: var(--md-elevated-button-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-elevated-button-pressed-state-layer-opacity, 0.12);--_with-icon-disabled-icon-color: var(--md-elevated-button-with-icon-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_with-icon-disabled-icon-opacity: var(--md-elevated-button-with-icon-disabled-icon-opacity, 0.38);--_with-icon-focus-icon-color: var(--md-elevated-button-with-icon-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_with-icon-hover-icon-color: var(--md-elevated-button-with-icon-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_with-icon-icon-color: var(--md-elevated-button-with-icon-icon-color, var(--md-sys-color-primary, #6750a4));--_with-icon-icon-size: var(--md-elevated-button-with-icon-icon-size, 18px);--_with-icon-pressed-icon-color: var(--md-elevated-button-with-icon-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_spacing-leading: var(--md-elevated-button-spacing-leading, 24px);--_spacing-trailing: var(--md-elevated-button-spacing-trailing, 24px);--_with-icon-spacing-leading: var(--md-elevated-button-with-icon-spacing-leading, 16px);--_with-icon-spacing-trailing: var(--md-elevated-button-with-icon-spacing-trailing, 24px);--_with-trailing-icon-spacing-leading: var(--md-elevated-button-with-trailing-icon-spacing-leading, 24px);--_with-trailing-icon-spacing-trailing: var(--md-elevated-button-with-trailing-icon-spacing-trailing, 16px)}/*# sourceMappingURL=elevated-styles.css.map */
`;
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$J = i$4`md-elevation{transition-duration:280ms}.md3-button{--md-elevation-level:var(--_container-elevation);--md-elevation-shadow-color:var(--_container-shadow-color)}.md3-button:focus{--md-elevation-level:var(--_focus-container-elevation)}.md3-button:hover{--md-elevation-level:var(--_hover-container-elevation)}.md3-button:active{--md-elevation-level:var(--_pressed-container-elevation)}.md3-button:disabled{--md-elevation-level:var(--_disabled-container-elevation)}/*# sourceMappingURL=shared-elevation-styles.css.map */
`;
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$I = i$4`:root{--md-filled-button-container-shape-start-start: 12px;--md-filled-button-container-shape: 8px}:host{display:inline-flex;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0);vertical-align:top;--md-ripple-hover-color:var(--_hover-state-layer-color);--md-ripple-focus-color:var(--_focus-state-layer-color);--md-ripple-pressed-color:var(--_pressed-state-layer-color);--md-ripple-hover-opacity:var(--_hover-state-layer-opacity);--md-ripple-focus-opacity:var(--_focus-state-layer-opacity);--md-ripple-pressed-opacity:var(--_pressed-state-layer-opacity);--md-focus-ring-shape-start-start:var(--md-focus-ring-shape, var(--_container-shape-start-start));--md-focus-ring-shape-start-end:var(--md-focus-ring-shape, var(--_container-shape-start-end));--md-focus-ring-shape-end-end:var(--md-focus-ring-shape, var(--_container-shape-end-end));--md-focus-ring-shape-end-start:var(--md-focus-ring-shape, var(--_container-shape-end-start))}:host([disabled]){cursor:default;pointer-events:none}.md3-button{display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;min-inline-size:64px;border:none;outline:none;user-select:none;-webkit-appearance:none;vertical-align:middle;background:rgba(0,0,0,0);text-decoration:none;inline-size:100%;position:relative;z-index:0;block-size:var(--_container-height);font:var(--_label-text-type);color:var(--_label-text-color);padding-inline-start:var(--_spacing-leading);padding-inline-end:var(--_spacing-trailing);gap:8px}.md3-button::before{background-color:var(--_container-color);border-radius:inherit;content:"";inset:0;position:absolute}.md3-button::-moz-focus-inner{padding:0;border:0}.md3-button:hover{color:var(--_hover-label-text-color);cursor:pointer}.md3-button:focus{color:var(--_focus-label-text-color)}.md3-button:active{color:var(--_pressed-label-text-color);outline:none}.md3-button:disabled .md3-button__label{color:var(--_disabled-label-text-color);opacity:var(--_disabled-label-text-opacity)}.md3-button:disabled::before{background-color:var(--_disabled-container-color);opacity:var(--_disabled-container-opacity)}@media(forced-colors: active){.md3-button::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none}}.md3-button,.md3-button__ripple{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}.md3-button::after,.md3-button::before,md-elevation,.md3-button__ripple{z-index:-1}.md3-button--icon-leading{padding-inline-start:var(--_with-icon-spacing-leading);padding-inline-end:var(--_with-icon-spacing-trailing)}.md3-button--icon-trailing{padding-inline-start:var(--_with-trailing-icon-spacing-leading);padding-inline-end:var(--_with-trailing-icon-spacing-trailing)}.md3-link-button-wrapper{inline-size:100%}.md3-button ::slotted([slot=icon]){display:inline-flex;position:relative;writing-mode:horizontal-tb;fill:currentColor;color:var(--_with-icon-icon-color);font-size:var(--_with-icon-icon-size);inline-size:var(--_with-icon-icon-size);block-size:var(--_with-icon-icon-size)}.md3-button:hover ::slotted([slot=icon]){color:var(--_with-icon-hover-icon-color)}.md3-button:focus ::slotted([slot=icon]){color:var(--_with-icon-focus-icon-color)}.md3-button:active ::slotted([slot=icon]){color:var(--_with-icon-pressed-icon-color)}.md3-button:disabled ::slotted([slot=icon]){color:var(--_with-icon-disabled-icon-color);opacity:var(--_with-icon-disabled-icon-opacity)}.md3-button__touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}/*# sourceMappingURL=shared-styles.css.map */
`;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let MdElevatedButton = class MdElevatedButton2 extends ElevatedButton {
};
MdElevatedButton.styles = [styles$I, styles$J, styles$K];
MdElevatedButton = __decorate([
  e$a("md-elevated-button")
], MdElevatedButton);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class FilledButton extends Button {
  getRenderClasses() {
    return {
      ...super.getRenderClasses(),
      "md3-button--filled": true
    };
  }
  renderElevation() {
    return x`<md-elevation></md-elevation>`;
  }
}
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$H = i$4`:host{--_container-shape-start-start: var(--md-filled-button-container-shape-start-start, var(--md-filled-button-container-shape, 9999px));--_container-shape-start-end: var(--md-filled-button-container-shape-start-end, var(--md-filled-button-container-shape, 9999px));--_container-shape-end-end: var(--md-filled-button-container-shape-end-end, var(--md-filled-button-container-shape, 9999px));--_container-shape-end-start: var(--md-filled-button-container-shape-end-start, var(--md-filled-button-container-shape, 9999px));--_container-color: var(--md-filled-button-container-color, var(--md-sys-color-primary, #6750a4));--_container-elevation: var(--md-filled-button-container-elevation, 0);--_container-height: var(--md-filled-button-container-height, 40px);--_container-shadow-color: var(--md-filled-button-container-shadow-color, var(--md-sys-color-shadow, #000));--_disabled-container-color: var(--md-filled-button-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-elevation: var(--md-filled-button-disabled-container-elevation, 0);--_disabled-container-opacity: var(--md-filled-button-disabled-container-opacity, 0.12);--_disabled-label-text-color: var(--md-filled-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filled-button-disabled-label-text-opacity, 0.38);--_focus-container-elevation: var(--md-filled-button-focus-container-elevation, 0);--_focus-label-text-color: var(--md-filled-button-focus-label-text-color, var(--md-sys-color-on-primary, #fff));--_focus-state-layer-color: var(--md-filled-button-focus-state-layer-color, var(--md-sys-color-on-primary, #fff));--_focus-state-layer-opacity: var(--md-filled-button-focus-state-layer-opacity, 0.12);--_hover-container-elevation: var(--md-filled-button-hover-container-elevation, 1);--_hover-label-text-color: var(--md-filled-button-hover-label-text-color, var(--md-sys-color-on-primary, #fff));--_hover-state-layer-color: var(--md-filled-button-hover-state-layer-color, var(--md-sys-color-on-primary, #fff));--_hover-state-layer-opacity: var(--md-filled-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-filled-button-label-text-color, var(--md-sys-color-on-primary, #fff));--_label-text-type: var(--md-filled-button-label-text-type, var(--md-sys-typescale-label-large, 500 0.875rem / 1.25rem var(--md-ref-typeface-plain, Roboto)));--_pressed-container-elevation: var(--md-filled-button-pressed-container-elevation, 0);--_pressed-label-text-color: var(--md-filled-button-pressed-label-text-color, var(--md-sys-color-on-primary, #fff));--_pressed-state-layer-color: var(--md-filled-button-pressed-state-layer-color, var(--md-sys-color-on-primary, #fff));--_pressed-state-layer-opacity: var(--md-filled-button-pressed-state-layer-opacity, 0.12);--_with-icon-disabled-icon-color: var(--md-filled-button-with-icon-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_with-icon-disabled-icon-opacity: var(--md-filled-button-with-icon-disabled-icon-opacity, 0.38);--_with-icon-focus-icon-color: var(--md-filled-button-with-icon-focus-icon-color, var(--md-sys-color-on-primary, #fff));--_with-icon-hover-icon-color: var(--md-filled-button-with-icon-hover-icon-color, var(--md-sys-color-on-primary, #fff));--_with-icon-icon-color: var(--md-filled-button-with-icon-icon-color, var(--md-sys-color-on-primary, #fff));--_with-icon-icon-size: var(--md-filled-button-with-icon-icon-size, 18px);--_with-icon-pressed-icon-color: var(--md-filled-button-with-icon-pressed-icon-color, var(--md-sys-color-on-primary, #fff));--_spacing-leading: var(--md-filled-button-spacing-leading, 24px);--_spacing-trailing: var(--md-filled-button-spacing-trailing, 24px);--_with-icon-spacing-leading: var(--md-filled-button-with-icon-spacing-leading, 16px);--_with-icon-spacing-trailing: var(--md-filled-button-with-icon-spacing-trailing, 24px);--_with-trailing-icon-spacing-leading: var(--md-filled-button-with-trailing-icon-spacing-leading, 24px);--_with-trailing-icon-spacing-trailing: var(--md-filled-button-with-trailing-icon-spacing-trailing, 16px)}/*# sourceMappingURL=filled-styles.css.map */
`;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let MdFilledButton = class MdFilledButton2 extends FilledButton {
};
MdFilledButton.styles = [styles$I, styles$J, styles$H];
MdFilledButton = __decorate([
  e$a("md-filled-button")
], MdFilledButton);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class OutlinedButton extends Button {
  getRenderClasses() {
    return {
      ...super.getRenderClasses(),
      "md3-button--outlined": true
    };
  }
  renderOutline() {
    return x`<span class="md3-button__outline"></span>`;
  }
}
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$G = i$4`:host{--_container-shape-start-start: var(--md-outlined-button-container-shape-start-start, var(--md-outlined-button-container-shape, 9999px));--_container-shape-start-end: var(--md-outlined-button-container-shape-start-end, var(--md-outlined-button-container-shape, 9999px));--_container-shape-end-end: var(--md-outlined-button-container-shape-end-end, var(--md-outlined-button-container-shape, 9999px));--_container-shape-end-start: var(--md-outlined-button-container-shape-end-start, var(--md-outlined-button-container-shape, 9999px));--_container-height: var(--md-outlined-button-container-height, 40px);--_disabled-label-text-color: var(--md-outlined-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-outlined-button-disabled-label-text-opacity, 0.38);--_disabled-outline-color: var(--md-outlined-button-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-outlined-button-disabled-outline-opacity, 0.12);--_focus-label-text-color: var(--md-outlined-button-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-outline-color: var(--md-outlined-button-focus-outline-color, var(--md-sys-color-primary, #6750a4));--_focus-state-layer-color: var(--md-outlined-button-focus-state-layer-color, var(--md-sys-color-primary, #6750a4));--_focus-state-layer-opacity: var(--md-outlined-button-focus-state-layer-opacity, 0.12);--_hover-label-text-color: var(--md-outlined-button-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-outline-color: var(--md-outlined-button-hover-outline-color, var(--md-sys-color-outline, #79747e));--_hover-state-layer-color: var(--md-outlined-button-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-outlined-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-outlined-button-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-type: var(--md-outlined-button-label-text-type, var(--md-sys-typescale-label-large, 500 0.875rem / 1.25rem var(--md-ref-typeface-plain, Roboto)));--_outline-color: var(--md-outlined-button-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width: var(--md-outlined-button-outline-width, 1px);--_pressed-label-text-color: var(--md-outlined-button-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_pressed-outline-color: var(--md-outlined-button-pressed-outline-color, var(--md-sys-color-outline, #79747e));--_pressed-state-layer-color: var(--md-outlined-button-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-outlined-button-pressed-state-layer-opacity, 0.12);--_with-icon-disabled-icon-color: var(--md-outlined-button-with-icon-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_with-icon-disabled-icon-opacity: var(--md-outlined-button-with-icon-disabled-icon-opacity, 0.38);--_with-icon-focus-icon-color: var(--md-outlined-button-with-icon-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_with-icon-hover-icon-color: var(--md-outlined-button-with-icon-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_with-icon-icon-color: var(--md-outlined-button-with-icon-icon-color, var(--md-sys-color-primary, #6750a4));--_with-icon-icon-size: var(--md-outlined-button-with-icon-icon-size, 18px);--_with-icon-pressed-icon-color: var(--md-outlined-button-with-icon-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_spacing-leading: var(--md-outlined-button-spacing-leading, 24px);--_spacing-trailing: var(--md-outlined-button-spacing-trailing, 24px);--_with-icon-spacing-leading: var(--md-outlined-button-with-icon-spacing-leading, 16px);--_with-icon-spacing-trailing: var(--md-outlined-button-with-icon-spacing-trailing, 24px);--_with-trailing-icon-spacing-leading: var(--md-outlined-button-with-trailing-icon-spacing-leading, 24px);--_with-trailing-icon-spacing-trailing: var(--md-outlined-button-with-trailing-icon-spacing-trailing, 16px)}.md3-button__outline{inset:0;border-style:solid;position:absolute;box-sizing:border-box;border-color:var(--_outline-color);border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}.md3-button:active .md3-button__outline{border-color:var(--_pressed-outline-color)}.md3-button:disabled .md3-button__outline{border-color:var(--_disabled-outline-color);opacity:var(--_disabled-outline-opacity)}.md3-button__outline,.md3-button__ripple{border-width:var(--_outline-width)}.md3-button__ripple{inline-size:calc(100% - 2*var(--_outline-width));block-size:calc(100% - 2*var(--_outline-width));border-style:solid;border-color:rgba(0,0,0,0)}/*# sourceMappingURL=outlined-styles.css.map */
`;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let MdOutlinedButton = class MdOutlinedButton2 extends OutlinedButton {
};
MdOutlinedButton.styles = [styles$I, styles$G];
MdOutlinedButton = __decorate([
  e$a("md-outlined-button")
], MdOutlinedButton);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class TextButton extends Button {
  getRenderClasses() {
    return {
      ...super.getRenderClasses(),
      "md3-button--text": true
    };
  }
}
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$F = i$4`:host{--_container-shape-start-start: var(--md-text-button-container-shape-start-start, var(--md-text-button-container-shape, 9999px));--_container-shape-start-end: var(--md-text-button-container-shape-start-end, var(--md-text-button-container-shape, 9999px));--_container-shape-end-end: var(--md-text-button-container-shape-end-end, var(--md-text-button-container-shape, 9999px));--_container-shape-end-start: var(--md-text-button-container-shape-end-start, var(--md-text-button-container-shape, 9999px));--_container-height: var(--md-text-button-container-height, 40px);--_disabled-label-text-color: var(--md-text-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-text-button-disabled-label-text-opacity, 0.38);--_focus-label-text-color: var(--md-text-button-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-state-layer-color: var(--md-text-button-focus-state-layer-color, var(--md-sys-color-primary, #6750a4));--_focus-state-layer-opacity: var(--md-text-button-focus-state-layer-opacity, 0.12);--_hover-label-text-color: var(--md-text-button-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color: var(--md-text-button-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-text-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-text-button-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-type: var(--md-text-button-label-text-type, var(--md-sys-typescale-label-large, 500 0.875rem / 1.25rem var(--md-ref-typeface-plain, Roboto)));--_pressed-label-text-color: var(--md-text-button-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-color: var(--md-text-button-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-text-button-pressed-state-layer-opacity, 0.12);--_with-icon-disabled-icon-color: var(--md-text-button-with-icon-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_with-icon-disabled-icon-opacity: var(--md-text-button-with-icon-disabled-icon-opacity, 0.38);--_with-icon-focus-icon-color: var(--md-text-button-with-icon-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_with-icon-hover-icon-color: var(--md-text-button-with-icon-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_with-icon-icon-color: var(--md-text-button-with-icon-icon-color, var(--md-sys-color-primary, #6750a4));--_with-icon-icon-size: var(--md-text-button-with-icon-icon-size, 18px);--_with-icon-pressed-icon-color: var(--md-text-button-with-icon-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_spacing-leading: var(--md-text-button-spacing-leading, 12px);--_spacing-trailing: var(--md-text-button-spacing-trailing, 12px);--_with-icon-spacing-leading: var(--md-text-button-with-icon-spacing-leading, 12px);--_with-icon-spacing-trailing: var(--md-text-button-with-icon-spacing-trailing, 16px);--_with-trailing-icon-spacing-leading: var(--md-text-button-with-trailing-icon-spacing-leading, 16px);--_with-trailing-icon-spacing-trailing: var(--md-text-button-with-trailing-icon-spacing-trailing, 12px);--_container-color: none;--_disabled-container-color: none;--_disabled-container-opacity: 0}/*# sourceMappingURL=text-styles.css.map */
`;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let MdTextButton = class MdTextButton2 extends TextButton {
};
MdTextButton.styles = [styles$I, styles$F];
MdTextButton = __decorate([
  e$a("md-text-button")
], MdTextButton);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class TonalButton extends Button {
  getRenderClasses() {
    return {
      ...super.getRenderClasses(),
      "md3-button--tonal": true
    };
  }
  renderElevation() {
    return x`<md-elevation></md-elevation>`;
  }
}
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$E = i$4`:host{--_container-shape-start-start: var(--md-tonal-button-container-shape-start-start, var(--md-tonal-button-container-shape, 9999px));--_container-shape-start-end: var(--md-tonal-button-container-shape-start-end, var(--md-tonal-button-container-shape, 9999px));--_container-shape-end-end: var(--md-tonal-button-container-shape-end-end, var(--md-tonal-button-container-shape, 9999px));--_container-shape-end-start: var(--md-tonal-button-container-shape-end-start, var(--md-tonal-button-container-shape, 9999px));--_container-color: var(--md-tonal-button-container-color, var(--md-sys-color-secondary-container, #e8def8));--_container-elevation: var(--md-tonal-button-container-elevation, 0);--_container-height: var(--md-tonal-button-container-height, 40px);--_container-shadow-color: var(--md-tonal-button-container-shadow-color, var(--md-sys-color-shadow, #000));--_disabled-container-color: var(--md-tonal-button-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-elevation: var(--md-tonal-button-disabled-container-elevation, 0);--_disabled-container-opacity: var(--md-tonal-button-disabled-container-opacity, 0.12);--_disabled-label-text-color: var(--md-tonal-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-tonal-button-disabled-label-text-opacity, 0.38);--_focus-container-elevation: var(--md-tonal-button-focus-container-elevation, 0);--_focus-label-text-color: var(--md-tonal-button-focus-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_focus-state-layer-color: var(--md-tonal-button-focus-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_focus-state-layer-opacity: var(--md-tonal-button-focus-state-layer-opacity, 0.12);--_hover-container-elevation: var(--md-tonal-button-hover-container-elevation, 1);--_hover-label-text-color: var(--md-tonal-button-hover-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_hover-state-layer-color: var(--md-tonal-button-hover-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_hover-state-layer-opacity: var(--md-tonal-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-tonal-button-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_label-text-type: var(--md-tonal-button-label-text-type, var(--md-sys-typescale-label-large, 500 0.875rem / 1.25rem var(--md-ref-typeface-plain, Roboto)));--_pressed-container-elevation: var(--md-tonal-button-pressed-container-elevation, 0);--_pressed-label-text-color: var(--md-tonal-button-pressed-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_pressed-state-layer-color: var(--md-tonal-button-pressed-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_pressed-state-layer-opacity: var(--md-tonal-button-pressed-state-layer-opacity, 0.12);--_with-icon-disabled-icon-color: var(--md-tonal-button-with-icon-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_with-icon-disabled-icon-opacity: var(--md-tonal-button-with-icon-disabled-icon-opacity, 0.38);--_with-icon-focus-icon-color: var(--md-tonal-button-with-icon-focus-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_with-icon-hover-icon-color: var(--md-tonal-button-with-icon-hover-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_with-icon-icon-color: var(--md-tonal-button-with-icon-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_with-icon-icon-size: var(--md-tonal-button-with-icon-icon-size, 18px);--_with-icon-pressed-icon-color: var(--md-tonal-button-with-icon-pressed-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_spacing-leading: var(--md-tonal-button-spacing-leading, 24px);--_spacing-trailing: var(--md-tonal-button-spacing-trailing, 24px);--_with-icon-spacing-leading: var(--md-tonal-button-with-icon-spacing-leading, 16px);--_with-icon-spacing-trailing: var(--md-tonal-button-with-icon-spacing-trailing, 24px);--_with-trailing-icon-spacing-leading: var(--md-tonal-button-with-trailing-icon-spacing-leading, 24px);--_with-trailing-icon-spacing-trailing: var(--md-tonal-button-with-trailing-icon-spacing-trailing, 16px)}/*# sourceMappingURL=tonal-styles.css.map */
`;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let MdTonalButton = class MdTonalButton2 extends TonalButton {
};
MdTonalButton.styles = [styles$I, styles$J, styles$E];
MdTonalButton = __decorate([
  e$a("md-tonal-button")
], MdTonalButton);
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$D = i$4`:host{--_container-shape-start-start: var(--md-filled-icon-button-container-shape-start-start, var(--md-filled-icon-button-container-shape, 9999px));--_container-shape-start-end: var(--md-filled-icon-button-container-shape-start-end, var(--md-filled-icon-button-container-shape, 9999px));--_container-shape-end-end: var(--md-filled-icon-button-container-shape-end-end, var(--md-filled-icon-button-container-shape, 9999px));--_container-shape-end-start: var(--md-filled-icon-button-container-shape-end-start, var(--md-filled-icon-button-container-shape, 9999px));--_container-color: var(--md-filled-icon-button-container-color, var(--md-sys-color-primary, #6750a4));--_container-size: var(--md-filled-icon-button-container-size, 40px);--_disabled-container-color: var(--md-filled-icon-button-disabled-container-color, rgb(var(--md-sys-color-on-surface-rgb, 29, 27, 32), 0.12));--_disabled-icon-color: var(--md-filled-icon-button-disabled-icon-color, rgb(var(--md-sys-color-on-surface-rgb, 29, 27, 32), 0.38));--_focus-icon-color: var(--md-filled-icon-button-focus-icon-color, var(--md-sys-color-on-primary, #fff));--_focus-state-layer-color: var(--md-filled-icon-button-focus-state-layer-color, var(--md-sys-color-on-primary, #fff));--_focus-state-layer-opacity: var(--md-filled-icon-button-focus-state-layer-opacity, 0.12);--_hover-icon-color: var(--md-filled-icon-button-hover-icon-color, var(--md-sys-color-on-primary, #fff));--_hover-state-layer-color: var(--md-filled-icon-button-hover-state-layer-color, var(--md-sys-color-on-primary, #fff));--_hover-state-layer-opacity: var(--md-filled-icon-button-hover-state-layer-opacity, 0.08);--_icon-color: var(--md-filled-icon-button-icon-color, var(--md-sys-color-on-primary, #fff));--_icon-size: var(--md-filled-icon-button-icon-size, 24px);--_pressed-icon-color: var(--md-filled-icon-button-pressed-icon-color, var(--md-sys-color-on-primary, #fff));--_pressed-state-layer-color: var(--md-filled-icon-button-pressed-state-layer-color, var(--md-sys-color-on-primary, #fff));--_pressed-state-layer-opacity: var(--md-filled-icon-button-pressed-state-layer-opacity, 0.12);--_selected-container-color: var(--md-filled-icon-button-selected-container-color, var(--md-sys-color-primary, #6750a4));--_toggle-selected-focus-icon-color: var(--md-filled-icon-button-toggle-selected-focus-icon-color, var(--md-sys-color-on-primary, #fff));--_toggle-selected-focus-state-layer-color: var(--md-filled-icon-button-toggle-selected-focus-state-layer-color, var(--md-sys-color-on-primary, #fff));--_toggle-selected-hover-icon-color: var(--md-filled-icon-button-toggle-selected-hover-icon-color, var(--md-sys-color-on-primary, #fff));--_toggle-selected-hover-state-layer-color: var(--md-filled-icon-button-toggle-selected-hover-state-layer-color, var(--md-sys-color-on-primary, #fff));--_toggle-selected-icon-color: var(--md-filled-icon-button-toggle-selected-icon-color, var(--md-sys-color-on-primary, #fff));--_toggle-selected-pressed-icon-color: var(--md-filled-icon-button-toggle-selected-pressed-icon-color, var(--md-sys-color-on-primary, #fff));--_toggle-selected-pressed-state-layer-color: var(--md-filled-icon-button-toggle-selected-pressed-state-layer-color, var(--md-sys-color-on-primary, #fff));--_toggle-unselected-focus-icon-color: var(--md-filled-icon-button-toggle-unselected-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_toggle-unselected-focus-state-layer-color: var(--md-filled-icon-button-toggle-unselected-focus-state-layer-color, var(--md-sys-color-primary, #6750a4));--_toggle-unselected-hover-icon-color: var(--md-filled-icon-button-toggle-unselected-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_toggle-unselected-hover-state-layer-color: var(--md-filled-icon-button-toggle-unselected-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_toggle-unselected-icon-color: var(--md-filled-icon-button-toggle-unselected-icon-color, var(--md-sys-color-primary, #6750a4));--_toggle-unselected-pressed-icon-color: var(--md-filled-icon-button-toggle-unselected-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_toggle-unselected-pressed-state-layer-color: var(--md-filled-icon-button-toggle-unselected-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_unselected-container-color: var(--md-filled-icon-button-unselected-container-color, var(--md-sys-color-surface-container-highest, #e6e0e9))}.md3-icon-button{background-color:var(--_container-color);color:var(--_icon-color);--md-ripple-focus-color:var(--_focus-state-layer-color);--md-ripple-focus-opacity:var(--_focus-state-layer-opacity);--md-ripple-hover-color:var(--_hover-state-layer-color);--md-ripple-hover-opacity:var(--_hover-state-layer-opacity);--md-ripple-pressed-color:var(--_pressed-state-layer-color);--md-ripple-pressed-opacity:var(--_pressed-state-layer-opacity)}.md3-icon-button:hover{color:var(--_hover-icon-color)}.md3-icon-button:focus{color:var(--_focus-icon-color)}.md3-icon-button:active{color:var(--_pressed-icon-color)}.md3-icon-button:disabled{background-color:var(--_disabled-container-color);color:var(--_disabled-icon-color)}.md3-icon-button--toggle-filled{--md-ripple-focus-color:var(--_toggle-unselected-focus-state-layer-color);--md-ripple-hover-color:var(--_toggle-unselected-hover-state-layer-color);--md-ripple-pressed-color:var(--_toggle-unselected-pressed-state-layer-color)}.md3-icon-button--toggle-filled:not(:disabled){background-color:var(--_unselected-container-color);color:var(--_toggle-unselected-icon-color)}.md3-icon-button--toggle-filled:not(:disabled):hover{color:var(--_toggle-unselected-hover-icon-color)}.md3-icon-button--toggle-filled:not(:disabled):focus{color:var(--_toggle-unselected-focus-icon-color)}.md3-icon-button--toggle-filled:not(:disabled):active{color:var(--_toggle-unselected-pressed-icon-color)}.md3-icon-button--selected{--md-ripple-focus-color:var(--_toggle-selected-focus-state-layer-color);--md-ripple-hover-color:var(--_toggle-selected-hover-state-layer-color);--md-ripple-pressed-color:var(--_toggle-selected-pressed-state-layer-color)}.md3-icon-button--selected:not(:disabled){background-color:var(--_selected-container-color);color:var(--_toggle-selected-icon-color)}.md3-icon-button--selected:not(:disabled):hover{color:var(--_toggle-selected-hover-icon-color)}.md3-icon-button--selected:not(:disabled):focus{color:var(--_toggle-selected-focus-icon-color)}.md3-icon-button--selected:not(:disabled):active{color:var(--_toggle-selected-pressed-icon-color)}/*# sourceMappingURL=filled-styles.css.map */
`;
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class Icon extends s$2 {
  render() {
    return x`<span><slot></slot></span>`;
  }
}
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$C = i$4`:host{--_color: var(--md-icon-color, inherit);--_font: var(--md-icon-font, "Material Symbols Outlined");--_font-variation-settings: var(--md-icon-font-variation-settings, inherit);--_size: var(--md-icon-size, 24px);--_weight: var(--md-icon-weight, 400);display:inline-flex;color:var(--_color);font-family:var(--_font);font-weight:var(--_weight);font-style:normal;font-size:var(--_size);font-variation-settings:var(--_font-variation-settings);line-height:1;overflow:hidden;letter-spacing:normal;text-transform:none;white-space:nowrap;word-wrap:normal;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale}span ::slotted(svg){fill:currentColor}span ::slotted(*){height:var(--_size);width:var(--_size)}/*# sourceMappingURL=icon-styles.css.map */
`;
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let MdIcon = class MdIcon2 extends Icon {
};
MdIcon.styles = [styles$C];
MdIcon = __decorate([
  e$a("md-icon")
], MdIcon);
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
function isRtl(el, shouldCheck = true) {
  return shouldCheck && getComputedStyle(el).getPropertyValue("direction").trim() === "rtl";
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
var _a$e;
class IconButton extends s$2 {
  constructor() {
    super(...arguments);
    this.disabled = false;
    this.flipIconInRtl = false;
    this.href = "";
    this.target = "";
    this.toggle = false;
    this.selected = false;
    this.showFocusRing = false;
    this.showRipple = false;
    this.flipIcon = isRtl(this, this.flipIconInRtl);
    this.getRipple = () => {
      this.showRipple = true;
      return this.ripple;
    };
    this.renderRipple = () => {
      return x`<md-ripple ?disabled="${!this.href && this.disabled}"></md-ripple>`;
    };
  }
  /**
   * Link buttons cannot be disabled.
   */
  willUpdate() {
    if (this.href) {
      this.disabled = false;
    }
  }
  render() {
    const tag = this.href ? i$1`div` : i$1`button`;
    const { ariaLabel, ariaHasPopup, ariaExpanded } = this;
    const hasToggledAriaLabel = ariaLabel && this.selectedAriaLabel;
    const ariaPressedValue = hasToggledAriaLabel ? A : this.selected;
    let ariaLabelValue = A;
    if (!this.href) {
      ariaLabelValue = hasToggledAriaLabel && this.selected ? this.selectedAriaLabel : ariaLabel;
    }
    return n$1`<${tag}
        class="md3-icon-button ${o$1(this.getRenderClasses())}"
        aria-label="${ariaLabelValue || A}"
        aria-haspopup="${!this.href && ariaHasPopup || A}"
        aria-expanded="${!this.href && ariaExpanded || A}"
        aria-pressed="${ariaPressedValue}"
        ?disabled="${!this.href && this.disabled}"
        @focus="${this.handleFocus}"
        @blur="${this.handleBlur}"
        @pointerdown="${this.handlePointerDown}"
        @click="${this.handleClick}"
        ${ripple(this.getRipple)}>
        ${this.renderFocusRing()}
        ${n$2(this.showRipple, this.renderRipple)}
        ${!this.selected ? this.renderIcon() : A}
        ${this.selected ? this.renderSelectedIcon() : A}
        ${this.renderTouchTarget()}
        ${this.href && this.renderLink()}
  </${tag}>`;
  }
  renderLink() {
    const { ariaLabel } = this;
    return x`<a class="md3-icon-button__link" href="${this.href}"
                  target="${this.target || A}"
                  @focus="${this.handleFocus}"
                  @blur="${this.handleBlur}"
                  aria-label="${ariaLabel || A}"></a>`;
  }
  getRenderClasses() {
    return {
      "md3-icon-button--flip-icon": this.flipIcon,
      "md3-icon-button--selected": this.toggle && this.selected
    };
  }
  renderIcon() {
    return x`<md-icon class="md3-icon-button__icon"><slot></slot></md-icon>`;
  }
  renderSelectedIcon() {
    return x`<md-icon class="md3-icon-button__icon md3-icon-button__icon--selected"><slot name="selectedIcon"><slot></slot></slot></md-icon>`;
  }
  renderTouchTarget() {
    return x`<span class="md3-icon-button__touch"></span>`;
  }
  renderFocusRing() {
    return x`<md-focus-ring .visible="${this.showFocusRing}"></md-focus-ring>`;
  }
  connectedCallback() {
    this.flipIcon = isRtl(this, this.flipIconInRtl);
    super.connectedCallback();
  }
  handlePointerDown() {
    pointerPress();
    this.showFocusRing = shouldShowStrongFocus();
  }
  handleFocus() {
    this.showFocusRing = shouldShowStrongFocus();
  }
  handleBlur() {
    this.showFocusRing = false;
  }
  handleClick() {
    if (!this.toggle || this.disabled) {
      return;
    }
    this.selected = !this.selected;
    this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
    this.dispatchEvent(new Event("change", { bubbles: true }));
  }
}
_a$e = IconButton;
(() => {
  requestUpdateOnAriaChange(_a$e);
})();
__decorate([
  e$9({ type: Boolean, reflect: true })
], IconButton.prototype, "disabled", void 0);
__decorate([
  e$9({ type: Boolean })
], IconButton.prototype, "flipIconInRtl", void 0);
__decorate([
  e$9()
], IconButton.prototype, "href", void 0);
__decorate([
  e$9()
], IconButton.prototype, "target", void 0);
__decorate([
  e$9({ attribute: "selected-aria-label", reflect: true })
], IconButton.prototype, "selectedAriaLabel", void 0);
__decorate([
  e$9({ type: Boolean })
], IconButton.prototype, "toggle", void 0);
__decorate([
  e$9({ type: Boolean, reflect: true })
], IconButton.prototype, "selected", void 0);
__decorate([
  i$5("button")
], IconButton.prototype, "buttonElement", void 0);
__decorate([
  e$7("md-ripple")
], IconButton.prototype, "ripple", void 0);
__decorate([
  t$3()
], IconButton.prototype, "showFocusRing", void 0);
__decorate([
  t$3()
], IconButton.prototype, "showRipple", void 0);
__decorate([
  t$3()
], IconButton.prototype, "flipIcon", void 0);
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$B = i$4`:host{display:inline-flex;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0);height:var(--_container-size);width:var(--_container-size);justify-content:center;--md-focus-ring-shape-start-start:var(--md-focus-ring-shape, var(--_container-shape-start-start));--md-focus-ring-shape-start-end:var(--md-focus-ring-shape, var(--_container-shape-start-end));--md-focus-ring-shape-end-end:var(--md-focus-ring-shape, var(--_container-shape-end-end));--md-focus-ring-shape-end-start:var(--md-focus-ring-shape, var(--_container-shape-end-start))}:host([disabled]){pointer-events:none}.md3-icon-button{align-items:center;border:none;box-sizing:border-box;cursor:pointer;display:flex;justify-content:center;outline:none;position:relative;text-decoration:none;user-select:none;z-index:0;flex:1;border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}.md3-icon-button__icon{--md-icon-size:var(--_icon-size);--md-icon-weight:inherit}md-ripple{z-index:-1;border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}.md3-icon-button--flip-icon .md3-icon-button__icon{transform:scaleX(-1)}.md3-icon-button__icon{display:inline-flex}.md3-icon-button__link{height:100%;outline:none;position:absolute;width:100%}.md3-icon-button__touch{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}/*# sourceMappingURL=shared-styles.css.map */
`;
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let MdFilledIconButton = class MdFilledIconButton2 extends IconButton {
  getRenderClasses() {
    return {
      ...super.getRenderClasses(),
      "md3-icon-button--filled": true,
      "md3-icon-button--toggle-filled": this.toggle
    };
  }
};
MdFilledIconButton.styles = [styles$B, styles$D];
MdFilledIconButton = __decorate([
  e$a("md-filled-icon-button")
], MdFilledIconButton);
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$A = i$4`:host{--_container-shape-start-start: var(--md-filled-tonal-icon-button-container-shape-start-start, var(--md-filled-tonal-icon-button-container-shape, 9999px));--_container-shape-start-end: var(--md-filled-tonal-icon-button-container-shape-start-end, var(--md-filled-tonal-icon-button-container-shape, 9999px));--_container-shape-end-end: var(--md-filled-tonal-icon-button-container-shape-end-end, var(--md-filled-tonal-icon-button-container-shape, 9999px));--_container-shape-end-start: var(--md-filled-tonal-icon-button-container-shape-end-start, var(--md-filled-tonal-icon-button-container-shape, 9999px));--_container-color: var(--md-filled-tonal-icon-button-container-color, var(--md-sys-color-secondary-container, #e8def8));--_container-size: var(--md-filled-tonal-icon-button-container-size, 40px);--_disabled-container-color: var(--md-filled-tonal-icon-button-disabled-container-color, rgb(var(--md-sys-color-on-surface-rgb, 29, 27, 32), 0.12));--_disabled-icon-color: var(--md-filled-tonal-icon-button-disabled-icon-color, rgb(var(--md-sys-color-on-surface-rgb, 29, 27, 32), 0.38));--_focus-icon-color: var(--md-filled-tonal-icon-button-focus-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_focus-state-layer-color: var(--md-filled-tonal-icon-button-focus-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_focus-state-layer-opacity: var(--md-filled-tonal-icon-button-focus-state-layer-opacity, 0.12);--_hover-icon-color: var(--md-filled-tonal-icon-button-hover-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_hover-state-layer-color: var(--md-filled-tonal-icon-button-hover-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_hover-state-layer-opacity: var(--md-filled-tonal-icon-button-hover-state-layer-opacity, 0.08);--_icon-color: var(--md-filled-tonal-icon-button-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_icon-size: var(--md-filled-tonal-icon-button-icon-size, 24px);--_pressed-icon-color: var(--md-filled-tonal-icon-button-pressed-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_pressed-state-layer-color: var(--md-filled-tonal-icon-button-pressed-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_pressed-state-layer-opacity: var(--md-filled-tonal-icon-button-pressed-state-layer-opacity, 0.12);--_selected-container-color: var(--md-filled-tonal-icon-button-selected-container-color, var(--md-sys-color-secondary-container, #e8def8));--_toggle-selected-focus-icon-color: var(--md-filled-tonal-icon-button-toggle-selected-focus-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_toggle-selected-focus-state-layer-color: var(--md-filled-tonal-icon-button-toggle-selected-focus-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_toggle-selected-hover-icon-color: var(--md-filled-tonal-icon-button-toggle-selected-hover-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_toggle-selected-hover-state-layer-color: var(--md-filled-tonal-icon-button-toggle-selected-hover-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_toggle-selected-icon-color: var(--md-filled-tonal-icon-button-toggle-selected-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_toggle-selected-pressed-icon-color: var(--md-filled-tonal-icon-button-toggle-selected-pressed-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_toggle-selected-pressed-state-layer-color: var(--md-filled-tonal-icon-button-toggle-selected-pressed-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_toggle-unselected-focus-icon-color: var(--md-filled-tonal-icon-button-toggle-unselected-focus-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_toggle-unselected-focus-state-layer-color: var(--md-filled-tonal-icon-button-toggle-unselected-focus-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_toggle-unselected-hover-icon-color: var(--md-filled-tonal-icon-button-toggle-unselected-hover-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_toggle-unselected-hover-state-layer-color: var(--md-filled-tonal-icon-button-toggle-unselected-hover-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_toggle-unselected-icon-color: var(--md-filled-tonal-icon-button-toggle-unselected-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_toggle-unselected-pressed-icon-color: var(--md-filled-tonal-icon-button-toggle-unselected-pressed-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_toggle-unselected-pressed-state-layer-color: var(--md-filled-tonal-icon-button-toggle-unselected-pressed-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_unselected-container-color: var(--md-filled-tonal-icon-button-unselected-container-color, var(--md-sys-color-surface-container-highest, #e6e0e9))}.md3-icon-button{background-color:var(--_container-color);color:var(--_icon-color);--md-ripple-focus-color:var(--_focus-state-layer-color);--md-ripple-focus-opacity:var(--_focus-state-layer-opacity);--md-ripple-hover-color:var(--_hover-state-layer-color);--md-ripple-hover-opacity:var(--_hover-state-layer-opacity);--md-ripple-pressed-color:var(--_pressed-state-layer-color);--md-ripple-pressed-opacity:var(--_pressed-state-layer-opacity)}.md3-icon-button:hover{color:var(--_hover-icon-color)}.md3-icon-button:focus{color:var(--_focus-icon-color)}.md3-icon-button:active{color:var(--_pressed-icon-color)}.md3-icon-button:disabled{background-color:var(--_disabled-container-color);color:var(--_disabled-icon-color)}.md3-icon-button--toggle-filled-tonal{--md-ripple-focus-color:var(--_toggle-unselected-focus-state-layer-color);--md-ripple-hover-color:var(--_toggle-unselected-hover-state-layer-color);--md-ripple-pressed-color:var(--_toggle-unselected-pressed-state-layer-color)}.md3-icon-button--toggle-filled-tonal:not(:disabled){background-color:var(--_unselected-container-color);color:var(--_toggle-unselected-icon-color)}.md3-icon-button--toggle-filled-tonal:not(:disabled):hover{color:var(--_toggle-unselected-hover-icon-color)}.md3-icon-button--toggle-filled-tonal:not(:disabled):focus{color:var(--_toggle-unselected-focus-icon-color)}.md3-icon-button--toggle-filled-tonal:not(:disabled):active{color:var(--_toggle-unselected-pressed-icon-color)}.md3-icon-button--selected{--md-ripple-focus-color:var(--_toggle-selected-focus-state-layer-color);--md-ripple-hover-color:var(--_toggle-selected-hover-state-layer-color);--md-ripple-pressed-color:var(--_toggle-selected-pressed-state-layer-color)}.md3-icon-button--selected:not(:disabled){background-color:var(--_selected-container-color);color:var(--_toggle-selected-icon-color)}.md3-icon-button--selected:not(:disabled):hover{color:var(--_toggle-selected-hover-icon-color)}.md3-icon-button--selected:not(:disabled):focus{color:var(--_toggle-selected-focus-icon-color)}.md3-icon-button--selected:not(:disabled):active{color:var(--_toggle-selected-pressed-icon-color)}/*# sourceMappingURL=filled-tonal-styles.css.map */
`;
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let MdFilledTonalIconButton = class MdFilledTonalIconButton2 extends IconButton {
  getRenderClasses() {
    return {
      ...super.getRenderClasses(),
      "md3-icon-button--filled-tonal": true,
      "md3-icon-button--toggle-filled-tonal": this.toggle
    };
  }
};
MdFilledTonalIconButton.styles = [styles$B, styles$A];
MdFilledTonalIconButton = __decorate([
  e$a("md-filled-tonal-icon-button")
], MdFilledTonalIconButton);
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$z = i$4`:host{--_container-shape-start-start: var(--md-outlined-icon-button-container-shape-start-start, var(--md-outlined-icon-button-container-shape, 9999px));--_container-shape-start-end: var(--md-outlined-icon-button-container-shape-start-end, var(--md-outlined-icon-button-container-shape, 9999px));--_container-shape-end-end: var(--md-outlined-icon-button-container-shape-end-end, var(--md-outlined-icon-button-container-shape, 9999px));--_container-shape-end-start: var(--md-outlined-icon-button-container-shape-end-start, var(--md-outlined-icon-button-container-shape, 9999px));--_container-size: var(--md-outlined-icon-button-container-size, 40px);--_disabled-icon-color: var(--md-outlined-icon-button-disabled-icon-color, rgb(var(--md-sys-color-on-surface-rgb, 29, 27, 32), 0.38));--_disabled-selected-container-color: var(--md-outlined-icon-button-disabled-selected-container-color, rgb(var(--md-sys-color-on-surface-rgb, 29, 27, 32), 0.12));--_disabled-unselected-outline-color: var(--md-outlined-icon-button-disabled-unselected-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-unselected-outline-opacity: var(--md-outlined-icon-button-disabled-unselected-outline-opacity, 0.12);--_focus-state-layer-opacity: var(--md-outlined-icon-button-focus-state-layer-opacity, 0.08);--_hover-state-layer-opacity: var(--md-outlined-icon-button-hover-state-layer-opacity, 0.08);--_icon-size: var(--md-outlined-icon-button-icon-size, 24px);--_pressed-state-layer-opacity: var(--md-outlined-icon-button-pressed-state-layer-opacity, 0.12);--_selected-container-color: var(--md-outlined-icon-button-selected-container-color, var(--md-sys-color-inverse-surface, #322f35));--_selected-focus-icon-color: var(--md-outlined-icon-button-selected-focus-icon-color, var(--md-sys-color-inverse-on-surface, #f5eff7));--_selected-focus-state-layer-color: var(--md-outlined-icon-button-selected-focus-state-layer-color, var(--md-sys-color-inverse-on-surface, #f5eff7));--_selected-hover-icon-color: var(--md-outlined-icon-button-selected-hover-icon-color, var(--md-sys-color-inverse-on-surface, #f5eff7));--_selected-hover-state-layer-color: var(--md-outlined-icon-button-selected-hover-state-layer-color, var(--md-sys-color-inverse-on-surface, #f5eff7));--_selected-icon-color: var(--md-outlined-icon-button-selected-icon-color, var(--md-sys-color-inverse-on-surface, #f5eff7));--_selected-pressed-icon-color: var(--md-outlined-icon-button-selected-pressed-icon-color, var(--md-sys-color-inverse-on-surface, #f5eff7));--_selected-pressed-state-layer-color: var(--md-outlined-icon-button-selected-pressed-state-layer-color, var(--md-sys-color-inverse-on-surface, #f5eff7));--_unselected-focus-icon-color: var(--md-outlined-icon-button-unselected-focus-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_unselected-focus-state-layer-color: var(--md-outlined-icon-button-unselected-focus-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_unselected-hover-icon-color: var(--md-outlined-icon-button-unselected-hover-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_unselected-hover-state-layer-color: var(--md-outlined-icon-button-unselected-hover-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_unselected-icon-color: var(--md-outlined-icon-button-unselected-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_unselected-outline-color: var(--md-outlined-icon-button-unselected-outline-color, var(--md-sys-color-outline, #79747e));--_unselected-outline-width: var(--md-outlined-icon-button-unselected-outline-width, 1px);--_unselected-pressed-icon-color: var(--md-outlined-icon-button-unselected-pressed-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_unselected-pressed-state-layer-color: var(--md-outlined-icon-button-unselected-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20))}.md3-icon-button--outlined{background-color:rgba(0,0,0,0);color:var(--_unselected-icon-color);--md-ripple-focus-color:var(--_unselected-focus-state-layer-color);--md-ripple-focus-opacity:var(--_focus-state-layer-opacity);--md-ripple-hover-color:var(--_unselected-hover-state-layer-color);--md-ripple-hover-opacity:var(--_hover-state-layer-opacity);--md-ripple-pressed-color:var(--_unselected-pressed-state-layer-color);--md-ripple-pressed-opacity:var(--_pressed-state-layer-opacity)}.md3-icon-button--outlined::before{border-color:var(--_unselected-outline-color);border-width:var(--_unselected-outline-width)}.md3-icon-button--outlined:hover{color:var(--_unselected-hover-icon-color)}.md3-icon-button--outlined:focus{color:var(--_unselected-focus-icon-color)}.md3-icon-button--outlined:active{color:var(--_unselected-pressed-icon-color)}.md3-icon-button--outlined:disabled{color:var(--_disabled-icon-color)}.md3-icon-button--outlined:disabled::before{border-color:var(--_disabled-unselected-outline-color);opacity:var(--_disabled-unselected-outline-opacity)}.md3-icon-button--outlined::before{block-size:100%;border-style:solid;border-radius:inherit;box-sizing:border-box;content:"";inline-size:100%;inset:0;pointer-events:none;position:absolute}.md3-icon-button--outlined.md3-icon-button--selected::before{border-width:0}.md3-icon-button--selected{--md-ripple-focus-color:var(--_selected-focus-state-layer-color);--md-ripple-focus-opacity:var(--_focus-state-layer-opacity);--md-ripple-hover-color:var(--_selected-hover-state-layer-color);--md-ripple-hover-opacity:var(--_hover-state-layer-opacity);--md-ripple-pressed-color:var(--_selected-pressed-state-layer-color);--md-ripple-pressed-opacity:var(--_pressed-state-layer-opacity)}.md3-icon-button--selected:not(:disabled){background-color:var(--_selected-container-color);color:var(--_selected-icon-color)}.md3-icon-button--selected:not(:disabled):hover{color:var(--_selected-hover-icon-color)}.md3-icon-button--selected:not(:disabled):focus{color:var(--_selected-focus-icon-color)}.md3-icon-button--selected:not(:disabled):active{color:var(--_selected-pressed-icon-color)}.md3-icon-button--selected:disabled{background-color:var(--_disabled-selected-container-color)}@media(forced-colors: active){.md3-icon-button--selected::before{border-color:var(--_unselected-outline-color);border-width:var(--_unselected-outline-width)}.md3-icon-button--selected:disabled::before{border-color:var(--_disabled-unselected-outline-color);opacity:var(--_disabled-unselected-outline-opacity)}}/*# sourceMappingURL=outlined-styles.css.map */
`;
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let MdOutlinedIconButton = class MdOutlinedIconButton2 extends IconButton {
  getRenderClasses() {
    return {
      ...super.getRenderClasses(),
      "md3-icon-button--outlined": true
    };
  }
};
MdOutlinedIconButton.styles = [styles$B, styles$z];
MdOutlinedIconButton = __decorate([
  e$a("md-outlined-icon-button")
], MdOutlinedIconButton);
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$y = i$4`:host{--_state-layer-shape-start-start: var(--md-icon-button-state-layer-shape-start-start, var(--md-icon-button-state-layer-shape, 9999px));--_state-layer-shape-start-end: var(--md-icon-button-state-layer-shape-start-end, var(--md-icon-button-state-layer-shape, 9999px));--_state-layer-shape-end-end: var(--md-icon-button-state-layer-shape-end-end, var(--md-icon-button-state-layer-shape, 9999px));--_state-layer-shape-end-start: var(--md-icon-button-state-layer-shape-end-start, var(--md-icon-button-state-layer-shape, 9999px));--_disabled-icon-color: var(--md-icon-button-disabled-icon-color, rgb(var(--md-sys-color-on-surface-rgb, 29, 27, 32), 0.38));--_icon-size: var(--md-icon-button-icon-size, 24px);--_selected-focus-icon-color: var(--md-icon-button-selected-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-focus-state-layer-color: var(--md-icon-button-selected-focus-state-layer-color, var(--md-sys-color-primary, #6750a4));--_selected-focus-state-layer-opacity: var(--md-icon-button-selected-focus-state-layer-opacity, 0.12);--_selected-hover-icon-color: var(--md-icon-button-selected-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-state-layer-color: var(--md-icon-button-selected-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-state-layer-opacity: var(--md-icon-button-selected-hover-state-layer-opacity, 0.08);--_selected-icon-color: var(--md-icon-button-selected-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-icon-color: var(--md-icon-button-selected-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-state-layer-color: var(--md-icon-button-selected-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-state-layer-opacity: var(--md-icon-button-selected-pressed-state-layer-opacity, 0.12);--_state-layer-size: var(--md-icon-button-state-layer-size, 40px);--_unselected-focus-icon-color: var(--md-icon-button-unselected-focus-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_unselected-focus-state-layer-color: var(--md-icon-button-unselected-focus-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_unselected-focus-state-layer-opacity: var(--md-icon-button-unselected-focus-state-layer-opacity, 0.12);--_unselected-hover-icon-color: var(--md-icon-button-unselected-hover-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_unselected-hover-state-layer-color: var(--md-icon-button-unselected-hover-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_unselected-hover-state-layer-opacity: var(--md-icon-button-unselected-hover-state-layer-opacity, 0.08);--_unselected-icon-color: var(--md-icon-button-unselected-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_unselected-pressed-icon-color: var(--md-icon-button-unselected-pressed-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_unselected-pressed-state-layer-color: var(--md-icon-button-unselected-pressed-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_unselected-pressed-state-layer-opacity: var(--md-icon-button-unselected-pressed-state-layer-opacity, 0.12);height:var(--_state-layer-size);width:var(--_state-layer-size);--md-focus-ring-shape-start-start:var(--md-focus-ring-shape, var(--_state-layer-shape-start-start));--md-focus-ring-shape-start-end:var(--md-focus-ring-shape, var(--_state-layer-shape-start-end));--md-focus-ring-shape-end-end:var(--md-focus-ring-shape, var(--_state-layer-shape-end-end));--md-focus-ring-shape-end-start:var(--md-focus-ring-shape, var(--_state-layer-shape-end-start))}.md3-icon-button--standard{background-color:rgba(0,0,0,0);color:var(--_unselected-icon-color);--md-ripple-focus-color:var(--_unselected-focus-state-layer-color);--md-ripple-focus-opacity:var(--_unselected-focus-state-layer-opacity);--md-ripple-hover-color:var(--_unselected-hover-state-layer-color);--md-ripple-hover-opacity:var(--_unselected-hover-state-layer-opacity);--md-ripple-pressed-color:var(--_unselected-pressed-state-layer-color);--md-ripple-pressed-opacity:var(--_unselected-pressed-state-layer-opacity);--md-ripple-shape:var(--_state-layer-shape-start-start) var(--_state-layer-shape-start-end) var(--_state-layer-shape-end-end) var(--_state-layer-shape-end-start)}.md3-icon-button--standard:hover{color:var(--_unselected-hover-icon-color)}.md3-icon-button--standard:focus{color:var(--_unselected-focus-icon-color)}.md3-icon-button--standard:active{color:var(--_unselected-pressed-icon-color)}.md3-icon-button--standard:disabled{color:var(--_disabled-icon-color)}.md3-icon-button--selected{--md-ripple-focus-color:var(--_selected-focus-state-layer-color);--md-ripple-focus-opacity:var(--_selected-focus-state-layer-opacity);--md-ripple-hover-color:var(--_selected-hover-state-layer-color);--md-ripple-hover-opacity:var(--_selected-hover-state-layer-opacity);--md-ripple-pressed-color:var(--_selected-pressed-state-layer-color);--md-ripple-pressed-opacity:var(--_selected-pressed-state-layer-opacity)}.md3-icon-button--selected:not(:disabled){color:var(--_selected-icon-color)}.md3-icon-button--selected:not(:disabled):hover{color:var(--_selected-hover-icon-color)}.md3-icon-button--selected:not(:disabled):focus{color:var(--_selected-focus-icon-color)}.md3-icon-button--selected:not(:disabled):active{color:var(--_selected-pressed-icon-color)}/*# sourceMappingURL=standard-styles.css.map */
`;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let MdStandardIconButton = class MdStandardIconButton2 extends IconButton {
  getRenderClasses() {
    return {
      ...super.getRenderClasses(),
      "md3-icon-button--standard": true
    };
  }
};
MdStandardIconButton.styles = [styles$B, styles$y];
MdStandardIconButton = __decorate([
  e$a("md-standard-icon-button")
], MdStandardIconButton);
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
var _a$d;
class SharedFab extends s$2 {
  constructor() {
    super(...arguments);
    this.size = "medium";
    this.label = "";
    this.lowered = false;
    this.reducedTouchTarget = false;
    this.showFocusRing = false;
    this.showRipple = false;
    this.getRipple = () => {
      this.showRipple = true;
      return this.ripple;
    };
    this.renderRipple = () => {
      return x`<md-ripple class="ripple"></md-ripple>`;
    };
  }
  render() {
    const { ariaLabel } = this;
    return x`
      <button
          class="fab ${o$1(this.getRenderClasses())}"
          aria-label=${ariaLabel || A}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
          @pointerdown=${this.handlePointerDown}
          ${ripple(this.getRipple)}>
        ${this.renderElevation()}
        ${this.renderFocusRing()}
        ${n$2(this.showRipple, this.renderRipple)}
        ${this.renderTouchTarget()}
        ${this.renderIcon()}
        ${this.renderLabel()}
      </button>`;
  }
  getRenderClasses() {
    const isExtended = !!this.label;
    return {
      "lowered": this.lowered,
      "small": this.size === "small" && !isExtended,
      "large": this.size === "large" && !isExtended,
      "extended": isExtended
    };
  }
  renderTouchTarget() {
    return this.reducedTouchTarget ? x`` : x`<div class="touch-target"></div>`;
  }
  renderLabel() {
    return this.label ? x`<span class="label">${this.label}</span>` : "";
  }
  renderIcon() {
    return x`<span class="icon">
        <slot name="icon"></slot>
      </span>`;
  }
  renderElevation() {
    return x`<md-elevation></md-elevation>`;
  }
  renderFocusRing() {
    return x`<md-focus-ring .visible="${this.showFocusRing}"></md-focus-ring>`;
  }
  handlePointerDown(e2) {
    pointerPress();
    this.showFocusRing = shouldShowStrongFocus();
  }
  handleFocus() {
    this.showFocusRing = shouldShowStrongFocus();
  }
  handleBlur() {
    this.showFocusRing = false;
  }
}
_a$d = SharedFab;
(() => {
  requestUpdateOnAriaChange(_a$d);
})();
SharedFab.shadowRootOptions = {
  mode: "open",
  delegatesFocus: true
};
__decorate([
  e$9()
], SharedFab.prototype, "size", void 0);
__decorate([
  e$9()
], SharedFab.prototype, "label", void 0);
__decorate([
  e$9({ type: Boolean })
], SharedFab.prototype, "lowered", void 0);
__decorate([
  e$9({ type: Boolean })
], SharedFab.prototype, "reducedTouchTarget", void 0);
__decorate([
  t$3()
], SharedFab.prototype, "showFocusRing", void 0);
__decorate([
  t$3()
], SharedFab.prototype, "showRipple", void 0);
__decorate([
  e$7("md-ripple")
], SharedFab.prototype, "ripple", void 0);
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class Fab extends SharedFab {
  constructor() {
    super(...arguments);
    this.variant = "surface";
  }
  getRenderClasses() {
    return {
      ...super.getRenderClasses(),
      "primary": this.variant === "primary",
      "secondary": this.variant === "secondary",
      "tertiary": this.variant === "tertiary"
    };
  }
}
__decorate([
  e$9()
], Fab.prototype, "variant", void 0);
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$x = i$4`:host{--_small-container-shape-start-start: var(--md-fab-small-container-shape-start-start, var(--md-fab-small-container-shape, 12px));--_small-container-shape-start-end: var(--md-fab-small-container-shape-start-end, var(--md-fab-small-container-shape, 12px));--_small-container-shape-end-end: var(--md-fab-small-container-shape-end-end, var(--md-fab-small-container-shape, 12px));--_small-container-shape-end-start: var(--md-fab-small-container-shape-end-start, var(--md-fab-small-container-shape, 12px));--_large-container-shape-start-start: var(--md-fab-large-container-shape-start-start, var(--md-fab-large-container-shape, 28px));--_large-container-shape-start-end: var(--md-fab-large-container-shape-start-end, var(--md-fab-large-container-shape, 28px));--_large-container-shape-end-end: var(--md-fab-large-container-shape-end-end, var(--md-fab-large-container-shape, 28px));--_large-container-shape-end-start: var(--md-fab-large-container-shape-end-start, var(--md-fab-large-container-shape, 28px));--_container-shape-start-start: var(--md-fab-container-shape-start-start, var(--md-fab-container-shape, 16px));--_container-shape-start-end: var(--md-fab-container-shape-start-end, var(--md-fab-container-shape, 16px));--_container-shape-end-end: var(--md-fab-container-shape-end-end, var(--md-fab-container-shape, 16px));--_container-shape-end-start: var(--md-fab-container-shape-end-start, var(--md-fab-container-shape, 16px));--_container-color: var(--md-fab-container-color, var(--md-sys-color-surface-container-high, #ece6f0));--_container-elevation: var(--md-fab-container-elevation, 3);--_container-height: var(--md-fab-container-height, 56px);--_container-shadow-color: var(--md-fab-container-shadow-color, var(--md-sys-color-shadow, #000));--_container-width: var(--md-fab-container-width, 56px);--_focus-container-elevation: var(--md-fab-focus-container-elevation, 3);--_focus-icon-color: var(--md-fab-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_focus-state-layer-color: var(--md-fab-focus-state-layer-color, var(--md-sys-color-primary, #6750a4));--_focus-state-layer-opacity: var(--md-fab-focus-state-layer-opacity, 0.12);--_hover-container-elevation: var(--md-fab-hover-container-elevation, 4);--_hover-icon-color: var(--md-fab-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color: var(--md-fab-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-fab-hover-state-layer-opacity, 0.08);--_icon-color: var(--md-fab-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-fab-icon-size, 24px);--_lowered-container-color: var(--md-fab-lowered-container-color, var(--md-sys-color-surface-container-low, #f7f2fa));--_lowered-container-elevation: var(--md-fab-lowered-container-elevation, 1);--_lowered-focus-container-elevation: var(--md-fab-lowered-focus-container-elevation, 1);--_lowered-hover-container-elevation: var(--md-fab-lowered-hover-container-elevation, 2);--_lowered-pressed-container-elevation: var(--md-fab-lowered-pressed-container-elevation, 1);--_pressed-container-elevation: var(--md-fab-pressed-container-elevation, 3);--_pressed-icon-color: var(--md-fab-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-color: var(--md-fab-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-fab-pressed-state-layer-opacity, 0.12);--_label-text-type: var(--md-fab-label-text-type, var(--md-sys-typescale-label-large, 500 0.875rem / 1.25rem var(--md-ref-typeface-plain, Roboto)));--_focus-label-text-color: var(--md-fab-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-label-text-color: var(--md-fab-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-color: var(--md-fab-label-text-color, var(--md-sys-color-primary, #6750a4));--_large-container-height: var(--md-fab-large-container-height, 96px);--_large-container-width: var(--md-fab-large-container-width, 96px);--_large-icon-size: var(--md-fab-large-icon-size, 36px);--_pressed-label-text-color: var(--md-fab-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_primary-container-color: var(--md-fab-primary-container-color, var(--md-sys-color-primary-container, #eaddff));--_primary-focus-icon-color: var(--md-fab-primary-focus-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-focus-label-text-color: var(--md-fab-primary-focus-label-text-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-focus-state-layer-color: var(--md-fab-primary-focus-state-layer-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-hover-icon-color: var(--md-fab-primary-hover-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-hover-label-text-color: var(--md-fab-primary-hover-label-text-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-hover-state-layer-color: var(--md-fab-primary-hover-state-layer-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-icon-color: var(--md-fab-primary-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-label-text-color: var(--md-fab-primary-label-text-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-pressed-icon-color: var(--md-fab-primary-pressed-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-pressed-label-text-color: var(--md-fab-primary-pressed-label-text-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-pressed-state-layer-color: var(--md-fab-primary-pressed-state-layer-color, var(--md-sys-color-on-primary-container, #21005d));--_secondary-container-color: var(--md-fab-secondary-container-color, var(--md-sys-color-secondary-container, #e8def8));--_secondary-focus-icon-color: var(--md-fab-secondary-focus-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-focus-label-text-color: var(--md-fab-secondary-focus-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-focus-state-layer-color: var(--md-fab-secondary-focus-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-hover-icon-color: var(--md-fab-secondary-hover-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-hover-label-text-color: var(--md-fab-secondary-hover-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-hover-state-layer-color: var(--md-fab-secondary-hover-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-icon-color: var(--md-fab-secondary-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-label-text-color: var(--md-fab-secondary-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-pressed-icon-color: var(--md-fab-secondary-pressed-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-pressed-label-text-color: var(--md-fab-secondary-pressed-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-pressed-state-layer-color: var(--md-fab-secondary-pressed-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_small-container-height: var(--md-fab-small-container-height, 40px);--_small-container-width: var(--md-fab-small-container-width, 40px);--_small-icon-size: var(--md-fab-small-icon-size, 24px);--_tertiary-container-color: var(--md-fab-tertiary-container-color, var(--md-sys-color-tertiary-container, #ffd8e4));--_tertiary-focus-icon-color: var(--md-fab-tertiary-focus-icon-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-focus-label-text-color: var(--md-fab-tertiary-focus-label-text-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-focus-state-layer-color: var(--md-fab-tertiary-focus-state-layer-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-hover-icon-color: var(--md-fab-tertiary-hover-icon-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-hover-label-text-color: var(--md-fab-tertiary-hover-label-text-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-hover-state-layer-color: var(--md-fab-tertiary-hover-state-layer-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-icon-color: var(--md-fab-tertiary-icon-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-label-text-color: var(--md-fab-tertiary-label-text-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-pressed-icon-color: var(--md-fab-tertiary-pressed-icon-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-pressed-label-text-color: var(--md-fab-tertiary-pressed-label-text-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-pressed-state-layer-color: var(--md-fab-tertiary-pressed-state-layer-color, var(--md-sys-color-on-tertiary-container, #31111d))}.fab .icon ::slotted(*){color:var(--_icon-color)}.fab:focus{color:var(--_focus-icon-color)}.fab:hover{color:var(--_hover-icon-color)}.fab:active{color:var(--_pressed-icon-color)}.fab.primary{background-color:var(--_primary-container-color);--md-ripple-hover-color:var(--_primary-hover-state-layer-color);--md-ripple-focus-color:var(--_primary-focus-state-layer-color);--md-ripple-pressed-color:var(--_primary-pressed-state-layer-color)}.fab.primary .icon ::slotted(*){color:var(--_primary-icon-color)}.fab.primary:focus{color:var(--_primary-focus-icon-color)}.fab.primary:hover{color:var(--_primary-hover-icon-color)}.fab.primary:active{color:var(--_primary-pressed-icon-color)}.fab.primary .label{color:var(--_primary-label-text-color)}.fab:hover .fab.primary .label{color:var(--_primary-hover-label-text-color)}.fab:focus .fab.primary .label{color:var(--_primary-focus-label-text-color)}.fab:active .fab.primary .label{color:var(--_primary-pressed-label-text-color)}.fab.secondary{background-color:var(--_secondary-container-color);--md-ripple-hover-color:var(--_secondary-hover-state-layer-color);--md-ripple-focus-color:var(--_secondary-focus-state-layer-color);--md-ripple-pressed-color:var(--_secondary-pressed-state-layer-color)}.fab.secondary .icon ::slotted(*){color:var(--_secondary-icon-color)}.fab.secondary:focus{color:var(--_secondary-focus-icon-color)}.fab.secondary:hover{color:var(--_secondary-hover-icon-color)}.fab.secondary:active{color:var(--_secondary-pressed-icon-color)}.fab.secondary .label{color:var(--_secondary-label-text-color)}.fab:hover .fab.secondary .label{color:var(--_secondary-hover-label-text-color)}.fab:focus .fab.secondary .label{color:var(--_secondary-focus-label-text-color)}.fab:active .fab.secondary .label{color:var(--_secondary-pressed-label-text-color)}.fab.tertiary{background-color:var(--_tertiary-container-color);--md-ripple-hover-color:var(--_tertiary-hover-state-layer-color);--md-ripple-focus-color:var(--_tertiary-focus-state-layer-color);--md-ripple-pressed-color:var(--_tertiary-pressed-state-layer-color)}.fab.tertiary .icon ::slotted(*){color:var(--_tertiary-icon-color)}.fab.tertiary:focus{color:var(--_tertiary-focus-icon-color)}.fab.tertiary:hover{color:var(--_tertiary-hover-icon-color)}.fab.tertiary:active{color:var(--_tertiary-pressed-icon-color)}.fab.tertiary .label{color:var(--_tertiary-label-text-color)}.fab:hover .fab.tertiary .label{color:var(--_tertiary-hover-label-text-color)}.fab:focus .fab.tertiary .label{color:var(--_tertiary-focus-label-text-color)}.fab:active .fab.tertiary .label{color:var(--_tertiary-pressed-label-text-color)}.fab.small{width:var(--_small-container-width);height:var(--_small-container-height)}.fab.small .icon ::slotted(*){width:var(--_small-icon-size);height:var(--_small-icon-size);font-size:var(--_small-icon-size)}.fab.small,.fab.small .ripple{border-start-start-radius:var(--_small-container-shape-start-start);border-start-end-radius:var(--_small-container-shape-start-end);border-end-start-radius:var(--_small-container-shape-end-start);border-end-end-radius:var(--_small-container-shape-end-end);--md-focus-ring-shape-start-start:var(--md-focus-ring-shape, var(--_small-container-shape-start-start));--md-focus-ring-shape-start-end:var(--md-focus-ring-shape, var(--_small-container-shape-start-end));--md-focus-ring-shape-end-end:var(--md-focus-ring-shape, var(--_small-container-shape-end-end));--md-focus-ring-shape-end-start:var(--md-focus-ring-shape, var(--_small-container-shape-end-start))}/*# sourceMappingURL=fab-styles.css.map */
`;
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$w = i$4`@media(forced-colors: active){.fab{--md-focus-ring-offset:3px;border:1px solid ButtonText}.fab.extended{padding-inline-start:15px;padding-inline-end:19px}}/*# sourceMappingURL=forced-colors-styles.css.map */
`;
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$v = i$4`:host{--md-ripple-hover-opacity:var(--_hover-state-layer-opacity);--md-ripple-focus-opacity:var(--_focus-state-layer-opacity);--md-ripple-pressed-opacity:var(--_pressed-state-layer-opacity);display:inline-flex}.fab,.icon,.icon ::slotted(*){display:flex}.fab{align-items:center;justify-content:center;vertical-align:middle;padding:0;position:relative;height:var(--_container-height);transition-property:background-color;border-width:0px;outline:none;z-index:0;--md-elevation-level:var(--_container-elevation);--md-elevation-shadow-color:var(--_container-shadow-color);background-color:var(--_container-color);--md-ripple-hover-color:var(--_hover-state-layer-color);--md-ripple-focus-color:var(--_focus-state-layer-color);--md-ripple-pressed-color:var(--_pressed-state-layer-color)}.fab.extended{width:inherit;box-sizing:border-box;padding-inline-start:16px;padding-inline-end:20px}.fab:not(.extended){width:var(--_container-width)}.fab.large{width:var(--_large-container-width);height:var(--_large-container-height)}.fab.large .icon ::slotted(*){width:var(--_large-icon-size);height:var(--_large-icon-size);font-size:var(--_large-icon-size)}.fab.large,.fab.large .ripple{border-start-start-radius:var(--_large-container-shape-start-start);border-start-end-radius:var(--_large-container-shape-start-end);border-end-start-radius:var(--_large-container-shape-end-start);border-end-end-radius:var(--_large-container-shape-end-end);--md-focus-ring-shape-start-start:var(--md-focus-ring-shape, var(--_large-container-shape-start-start));--md-focus-ring-shape-start-end:var(--md-focus-ring-shape, var(--_large-container-shape-start-end));--md-focus-ring-shape-end-end:var(--md-focus-ring-shape, var(--_large-container-shape-end-end));--md-focus-ring-shape-end-start:var(--md-focus-ring-shape, var(--_large-container-shape-end-start))}.fab:focus{--md-elevation-level:var(--_focus-container-elevation)}.fab:hover{--md-elevation-level:var(--_hover-container-elevation)}.fab:active{--md-elevation-level:var(--_pressed-container-elevation)}.fab.lowered{background-color:var(--_lowered-container-color);--md-elevation-level:var(--_lowered-container-elevation)}.fab.lowered:focus{--md-elevation-level:var(--_lowered-focus-container-elevation)}.fab.lowered:hover{--md-elevation-level:var(--_lowered-hover-container-elevation)}.fab.lowered:active{--md-elevation-level:var(--_lowered-pressed-container-elevation)}.fab .label{color:var(--_label-text-color)}.fab:hover .fab .label{color:var(--_hover-label-text-color)}.fab:focus .fab .label{color:var(--_focus-label-text-color)}.fab:active .fab .label{color:var(--_pressed-label-text-color)}.label{padding-inline-start:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font:var(--_label-text-type)}.ripple{overflow:hidden}.ripple,md-elevation{z-index:-1}.touch-target{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}md-elevation,.fab{transition-duration:280ms;transition-timing-function:cubic-bezier(0.2, 0, 0, 1)}.fab,.ripple{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end);--md-focus-ring-shape-start-start:var(--md-focus-ring-shape, var(--_container-shape-start-start));--md-focus-ring-shape-start-end:var(--md-focus-ring-shape, var(--_container-shape-start-end));--md-focus-ring-shape-end-end:var(--md-focus-ring-shape, var(--_container-shape-end-end));--md-focus-ring-shape-end-start:var(--md-focus-ring-shape, var(--_container-shape-end-start))}.icon ::slotted(*){width:var(--_icon-size);height:var(--_icon-size);font-size:var(--_icon-size)}/*# sourceMappingURL=shared-styles.css.map */
`;
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let MdFab = class MdFab2 extends Fab {
};
MdFab.styles = [styles$v, styles$x, styles$w];
MdFab = __decorate([
  e$a("md-fab")
], MdFab);
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$u = i$4`:host{--_large-container-shape-start-start: var(--md-fab-branded-large-container-shape-start-start, var(--md-fab-branded-large-container-shape, 28px));--_large-container-shape-start-end: var(--md-fab-branded-large-container-shape-start-end, var(--md-fab-branded-large-container-shape, 28px));--_large-container-shape-end-end: var(--md-fab-branded-large-container-shape-end-end, var(--md-fab-branded-large-container-shape, 28px));--_large-container-shape-end-start: var(--md-fab-branded-large-container-shape-end-start, var(--md-fab-branded-large-container-shape, 28px));--_container-shape-start-start: var(--md-fab-branded-container-shape-start-start, var(--md-fab-branded-container-shape, 16px));--_container-shape-start-end: var(--md-fab-branded-container-shape-start-end, var(--md-fab-branded-container-shape, 16px));--_container-shape-end-end: var(--md-fab-branded-container-shape-end-end, var(--md-fab-branded-container-shape, 16px));--_container-shape-end-start: var(--md-fab-branded-container-shape-end-start, var(--md-fab-branded-container-shape, 16px));--_container-color: var(--md-fab-branded-container-color, var(--md-sys-color-surface-container-high, #ece6f0));--_container-elevation: var(--md-fab-branded-container-elevation, 3);--_container-height: var(--md-fab-branded-container-height, 56px);--_container-shadow-color: var(--md-fab-branded-container-shadow-color, var(--md-sys-color-shadow, #000));--_container-width: var(--md-fab-branded-container-width, 56px);--_focus-container-elevation: var(--md-fab-branded-focus-container-elevation, 3);--_focus-state-layer-color: var(--md-fab-branded-focus-state-layer-color, var(--md-sys-color-primary, #6750a4));--_focus-state-layer-opacity: var(--md-fab-branded-focus-state-layer-opacity, 0.12);--_hover-container-elevation: var(--md-fab-branded-hover-container-elevation, 4);--_hover-state-layer-color: var(--md-fab-branded-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-fab-branded-hover-state-layer-opacity, 0.08);--_icon-size: var(--md-fab-branded-icon-size, 36px);--_lowered-container-color: var(--md-fab-branded-lowered-container-color, var(--md-sys-color-surface-container-low, #f7f2fa));--_lowered-container-elevation: var(--md-fab-branded-lowered-container-elevation, 1);--_lowered-focus-container-elevation: var(--md-fab-branded-lowered-focus-container-elevation, 1);--_lowered-hover-container-elevation: var(--md-fab-branded-lowered-hover-container-elevation, 2);--_lowered-pressed-container-elevation: var(--md-fab-branded-lowered-pressed-container-elevation, 1);--_pressed-container-elevation: var(--md-fab-branded-pressed-container-elevation, 3);--_pressed-state-layer-color: var(--md-fab-branded-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-fab-branded-pressed-state-layer-opacity, 0.12);--_focus-label-text-color: var(--md-fab-branded-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-label-text-color: var(--md-fab-branded-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-color: var(--md-fab-branded-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_label-text-type: var(--md-fab-branded-label-text-type, 500 0.875rem / 1.25rem var(--md-ref-typeface-plain, Roboto));--_large-container-height: var(--md-fab-branded-large-container-height, 96px);--_large-container-width: var(--md-fab-branded-large-container-width, 96px);--_large-icon-size: var(--md-fab-branded-large-icon-size, 48px);--_pressed-label-text-color: var(--md-fab-branded-pressed-label-text-color, var(--md-sys-color-primary, #6750a4))}/*# sourceMappingURL=fab-branded-styles.css.map */
`;
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let MdBrandedFab = class MdBrandedFab2 extends Fab {
  getRenderClasses() {
    return {
      ...super.getRenderClasses(),
      "primary": false,
      "secondary": false,
      "tertiary": false,
      "small": false
    };
  }
};
MdBrandedFab.styles = [styles$v, styles$u, styles$w];
MdBrandedFab = __decorate([
  e$a("md-branded-fab")
], MdBrandedFab);
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$t = i$4`@media(forced-colors: active){:host{--md-radio-disabled-selected-icon-color:GrayText;--md-radio-disabled-selected-icon-opacity:1;--md-radio-disabled-unselected-icon-color:GrayText;--md-radio-disabled-unselected-icon-opacity:1;--md-radio-selected-icon-color:CanvasText;--md-radio-selected-hover-icon-color:CanvasText;--md-radio-selected-focus-icon-color:CanvasText;--md-radio-selected-pressed-icon-color:CanvasText;--md-radio-unselected-icon-color:CanvasText;--md-radio-unselected-hover-icon-color:CanvasText;--md-radio-unselected-focus-icon-color:CanvasText;--md-radio-unselected-pressed-icon-color:CanvasText}}/*# sourceMappingURL=forced-colors-styles.css.map */
`;
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
function isFormAssociated(element) {
  return element.constructor.formAssociated;
}
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const SUPPORTS_FACE_LABEL = "labels" in (globalThis?.ElementInternals?.prototype ?? {});
function isCustomElement(element) {
  return element.localName.match("-");
}
const implicitLabelReactive = /* @__PURE__ */ new Set(["button", "input", "meter", "progress", "output", "select", "textarea"]);
function isLabelReactive(element) {
  return implicitLabelReactive.has(element.localName) || isFormAssociated(element);
}
function shimLabelSupport(root) {
  root.addEventListener("click", labelActivationListener);
}
function labelActivationListener(event) {
  const path = event.composedPath();
  const root = event.currentTarget;
  let label = void 0;
  for (let i3 = 0; i3 < path.length; i3++) {
    const target2 = path[i3];
    if (target2.nodeType !== Node.ELEMENT_NODE || target2.getRootNode() !== root) {
      continue;
    }
    if (isLabelReactive(target2)) {
      return;
    }
    if (target2.localName === "label") {
      label = target2;
    }
  }
  if (label === void 0) {
    return;
  }
  const forId = label.getAttribute("for");
  const target = forId ? root.getElementById(forId) : Array.from(label.querySelectorAll("*")).find((el) => isCustomElement(el) && isFormAssociated(el));
  if (target == null) {
    return;
  }
  const simulatedClick = new PointerEvent("click", { composed: true, bubbles: true });
  target.dispatchEvent(simulatedClick);
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const getFormValue = Symbol("getFormValue");
class FormController {
  /**
   * Creates a new `FormController` for the given element.
   *
   * @param element The element to add `<form>` support to.
   */
  constructor(element) {
    this.element = element;
    this.formDataListener = (event) => {
      if (this.element.disabled) {
        return;
      }
      const value = this.element[getFormValue]();
      if (value instanceof FormData) {
        for (const [key, dataValue] of value) {
          event.formData.append(key, dataValue);
        }
        return;
      }
      if (value === null || !this.element.name) {
        return;
      }
      event.formData.append(this.element.name, value);
    };
  }
  hostConnected() {
    if (!this.element.shadowRoot || window.ShadyDOM?.inUse) {
      return;
    }
    this.form = this.element.form;
    this.form?.addEventListener("formdata", this.formDataListener);
    if (isFormAssociated(this.element) && !SUPPORTS_FACE_LABEL) {
      shimLabelSupport(this.element.getRootNode());
    }
  }
  hostDisconnected() {
    this.form?.removeEventListener("formdata", this.formDataListener);
  }
}
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class SingleSelectionController {
  constructor(host) {
    this.host = host;
    this.focused = false;
    this.root = null;
    this.handleFocusIn = () => {
      this.focused = true;
      this.updateTabIndices();
    };
    this.handleFocusOut = () => {
      this.focused = false;
      this.updateTabIndices();
    };
    this.handleKeyDown = (event) => {
      const isDown = event.key === "ArrowDown";
      const isUp = event.key === "ArrowUp";
      const isLeft = event.key === "ArrowLeft";
      const isRight = event.key === "ArrowRight";
      if (!isLeft && !isRight && !isDown && !isUp) {
        return;
      }
      const siblings = this.getNamedSiblings();
      if (!siblings.length) {
        return;
      }
      event.preventDefault();
      const isRtl2 = getComputedStyle(this.host).direction === "rtl";
      const forwards = isRtl2 ? isLeft || isDown : isRight || isDown;
      const hostIndex = siblings.indexOf(this.host);
      let nextIndex = forwards ? hostIndex + 1 : hostIndex - 1;
      while (nextIndex !== hostIndex) {
        if (nextIndex >= siblings.length) {
          nextIndex = 0;
        } else if (nextIndex < 0) {
          nextIndex = siblings.length - 1;
        }
        const nextSibling = siblings[nextIndex];
        if (nextSibling.hasAttribute("disabled")) {
          if (forwards) {
            nextIndex++;
          } else {
            nextIndex--;
          }
          continue;
        }
        for (const sibling of siblings) {
          if (sibling !== nextSibling) {
            sibling.checked = false;
            sibling.tabIndex = -1;
          }
        }
        nextSibling.checked = true;
        nextSibling.removeAttribute("tabindex");
        nextSibling.focus();
        break;
      }
    };
  }
  hostConnected() {
    this.root = this.host.getRootNode();
    this.host.addEventListener("keydown", this.handleKeyDown);
    this.host.addEventListener("focusin", this.handleFocusIn);
    this.host.addEventListener("focusout", this.handleFocusOut);
    if (this.host.checked) {
      this.uncheckSiblings();
    }
    this.updateTabIndices();
  }
  hostDisconnected() {
    this.host.removeEventListener("keydown", this.handleKeyDown);
    this.host.removeEventListener("focusin", this.handleFocusIn);
    this.host.removeEventListener("focusout", this.handleFocusOut);
    this.updateTabIndices();
    this.root = null;
  }
  /**
   * Should be called whenever the host's `checked` property changes
   * synchronously.
   */
  handleCheckedChange() {
    if (!this.host.checked) {
      return;
    }
    this.uncheckSiblings();
    this.updateTabIndices();
  }
  uncheckSiblings() {
    for (const sibling of this.getNamedSiblings()) {
      if (sibling !== this.host) {
        sibling.checked = false;
      }
    }
  }
  /**
   * Updates the `tabindex` of the host and its siblings.
   */
  updateTabIndices() {
    const siblings = this.getNamedSiblings();
    const checkedSibling = siblings.find((sibling) => sibling.checked);
    if (checkedSibling || this.focused) {
      const focusable = checkedSibling || this.host;
      focusable.removeAttribute("tabindex");
      for (const sibling of siblings) {
        if (sibling !== focusable) {
          sibling.tabIndex = -1;
        }
      }
      return;
    }
    for (const sibling of siblings) {
      sibling.removeAttribute("tabindex");
    }
  }
  /**
   * Retrieves all siblings in the host element's root with the same `name`
   * attribute.
   */
  getNamedSiblings() {
    const name = this.host.getAttribute("name");
    if (!name || !this.root) {
      return [];
    }
    return Array.from(this.root.querySelectorAll(`[name="${name}"]`));
  }
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
var _a$c, _b;
const CHECKED = Symbol("checked");
class Radio extends s$2 {
  /**
   * Whether or not the radio is selected.
   */
  get checked() {
    return this[CHECKED];
  }
  set checked(checked) {
    const wasChecked = this.checked;
    if (wasChecked === checked) {
      return;
    }
    this[CHECKED] = checked;
    this.requestUpdate("checked", wasChecked);
    this.selectionController.handleCheckedChange();
  }
  /**
   * The associated form element with which this element's value will submit.
   */
  get form() {
    return this.closest("form");
  }
  constructor() {
    super();
    this[_b] = false;
    this.disabled = false;
    this.value = "on";
    this.name = "";
    this.selectionController = new SingleSelectionController(this);
    this.showFocusRing = false;
    this.showRipple = false;
    this.getRipple = () => {
      this.showRipple = true;
      return this.ripple;
    };
    this.renderRipple = () => {
      return x`<md-ripple unbounded ?disabled=${this.disabled}></md-ripple>`;
    };
    this.addController(new FormController(this));
    this.addController(this.selectionController);
    {
      this.addEventListener("click", (event) => {
        if (!isActivationClick(event)) {
          return;
        }
        this.focus();
        dispatchActivationClick(this.input);
      });
    }
  }
  [(_b = CHECKED, getFormValue)]() {
    return this.checked ? this.value : null;
  }
  focus() {
    this.input?.focus();
  }
  render() {
    const { ariaLabel } = this;
    return x`
      ${n$2(this.showRipple, this.renderRipple)}
      ${this.renderFocusRing()}
      <svg class="icon" viewBox="0 0 20 20">
        <mask id="cutout">
          <rect width="100%" height="100%" fill="white" />
          <circle cx="10" cy="10" r="8" fill="black" />
        </mask>
        <circle class="outer circle" cx="10" cy="10" r="10" mask="url(#cutout)" />
        <circle class="inner circle" cx="10" cy="10" r="5" />
      </svg>
      <input
        type="radio"
        name=${this.name}
        aria-label=${ariaLabel || A}
        .checked=${this.checked}
        .value=${this.value}
        ?disabled=${this.disabled}
        @change=${this.handleChange}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
        @pointerdown=${this.handlePointerDown}
        ${ripple(this.getRipple)}
      >
    `;
  }
  handleBlur() {
    this.showFocusRing = false;
  }
  handleFocus() {
    this.showFocusRing = shouldShowStrongFocus();
  }
  handleChange(event) {
    if (this.disabled) {
      return;
    }
    this.checked = true;
    redispatchEvent(this, event);
  }
  handlePointerDown() {
    pointerPress();
    this.showFocusRing = shouldShowStrongFocus();
  }
  renderFocusRing() {
    return x`<md-focus-ring .visible=${this.showFocusRing}></md-focus-ring>`;
  }
}
_a$c = Radio;
(() => {
  requestUpdateOnAriaChange(_a$c);
})();
Radio.shadowRootOptions = { ...s$2.shadowRootOptions, delegatesFocus: true };
Radio.formAssociated = true;
__decorate([
  e$9({ type: Boolean, reflect: true })
], Radio.prototype, "checked", null);
__decorate([
  e$9({ type: Boolean, reflect: true })
], Radio.prototype, "disabled", void 0);
__decorate([
  e$9()
], Radio.prototype, "value", void 0);
__decorate([
  e$9({ reflect: true })
], Radio.prototype, "name", void 0);
__decorate([
  i$5("input")
], Radio.prototype, "input", void 0);
__decorate([
  e$7("md-ripple")
], Radio.prototype, "ripple", void 0);
__decorate([
  t$3()
], Radio.prototype, "showFocusRing", void 0);
__decorate([
  t$3()
], Radio.prototype, "showRipple", void 0);
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$s = i$4`:host{--_disabled-selected-icon-color: var(--md-radio-disabled-selected-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-selected-icon-opacity: var(--md-radio-disabled-selected-icon-opacity, 0.38);--_disabled-unselected-icon-color: var(--md-radio-disabled-unselected-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-unselected-icon-opacity: var(--md-radio-disabled-unselected-icon-opacity, 0.38);--_icon-size: var(--md-radio-icon-size, 20px);--_selected-focus-icon-color: var(--md-radio-selected-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-focus-state-layer-color: var(--md-radio-selected-focus-state-layer-color, var(--md-sys-color-primary, #6750a4));--_selected-focus-state-layer-opacity: var(--md-radio-selected-focus-state-layer-opacity, 0.12);--_selected-hover-icon-color: var(--md-radio-selected-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-state-layer-color: var(--md-radio-selected-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-state-layer-opacity: var(--md-radio-selected-hover-state-layer-opacity, 0.08);--_selected-icon-color: var(--md-radio-selected-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-icon-color: var(--md-radio-selected-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-state-layer-color: var(--md-radio-selected-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_selected-pressed-state-layer-opacity: var(--md-radio-selected-pressed-state-layer-opacity, 0.12);--_state-layer-size: var(--md-radio-state-layer-size, 40px);--_unselected-focus-icon-color: var(--md-radio-unselected-focus-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_unselected-focus-state-layer-color: var(--md-radio-unselected-focus-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_unselected-focus-state-layer-opacity: var(--md-radio-unselected-focus-state-layer-opacity, 0.12);--_unselected-hover-icon-color: var(--md-radio-unselected-hover-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_unselected-hover-state-layer-color: var(--md-radio-unselected-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_unselected-hover-state-layer-opacity: var(--md-radio-unselected-hover-state-layer-opacity, 0.08);--_unselected-icon-color: var(--md-radio-unselected-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_unselected-pressed-icon-color: var(--md-radio-unselected-pressed-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_unselected-pressed-state-layer-color: var(--md-radio-unselected-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_unselected-pressed-state-layer-opacity: var(--md-radio-unselected-pressed-state-layer-opacity, 0.12);--md-ripple-focus-color:var(--_unselected-focus-state-layer-color);--md-ripple-focus-opacity:var(--_unselected-focus-state-layer-opacity);--md-ripple-hover-color:var(--_unselected-hover-state-layer-color);--md-ripple-hover-opacity:var(--_unselected-hover-state-layer-opacity);--md-ripple-pressed-color:var(--_unselected-pressed-state-layer-color);--md-ripple-pressed-opacity:var(--_unselected-pressed-state-layer-opacity);--md-focus-ring-offset:-2px;display:inline-flex;height:48px;position:relative;vertical-align:top;width:48px;-webkit-tap-highlight-color:rgba(0,0,0,0)}:host([checked]){--md-ripple-focus-color:var(--_selected-focus-state-layer-color);--md-ripple-focus-opacity:var(--_selected-focus-state-layer-opacity);--md-ripple-hover-color:var(--_selected-hover-state-layer-color);--md-ripple-hover-opacity:var(--_selected-hover-state-layer-opacity);--md-ripple-pressed-color:var(--_selected-pressed-state-layer-color);--md-ripple-pressed-opacity:var(--_selected-pressed-state-layer-opacity)}input,md-ripple,.icon{inset:0;margin:auto;position:absolute}input{appearance:none;outline:none}md-ripple{height:var(--_state-layer-size);width:var(--_state-layer-size)}.icon{fill:var(--_unselected-icon-color);height:var(--_icon-size);width:var(--_icon-size)}.outer.circle{transition:fill 50ms linear}.inner.circle{opacity:0;transform-origin:center;transition:opacity 50ms linear}:host([checked]) .icon{fill:var(--_selected-icon-color)}:host([checked]) .inner.circle{animation:inner-circle-grow 300ms cubic-bezier(0.05, 0.7, 0.1, 1);opacity:1}@keyframes inner-circle-grow{from{transform:scale(0)}to{transform:scale(1)}}:host([disabled]) .circle{animation-duration:0s;transition-duration:0s}:host(:hover) .icon{fill:var(--_unselected-hover-icon-color)}:host(:focus-within) .icon{fill:var(--_unselected-focus-icon-color)}:host(:active) .icon{fill:var(--_unselected-pressed-icon-color)}:host([disabled]) .icon{fill:var(--_disabled-unselected-icon-color);opacity:var(--_disabled-unselected-icon-opacity)}:host([checked]:hover) .icon{fill:var(--_selected-hover-icon-color)}:host([checked]:focus-within) .icon{fill:var(--_selected-focus-icon-color)}:host([checked]:active) .icon{fill:var(--_selected-pressed-icon-color)}:host([checked][disabled]) .icon{fill:var(--_disabled-selected-icon-color);opacity:var(--_disabled-selected-icon-opacity)}/*# sourceMappingURL=radio-styles.css.map */
`;
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let MdRadio = class MdRadio2 extends Radio {
};
MdRadio.styles = [styles$s, styles$t];
MdRadio = __decorate([
  e$a("md-radio")
], MdRadio);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
var _a$b;
class Switch extends s$2 {
  /**
   * The associated form element with which this element's value will submit.
   */
  get form() {
    return this.closest("form");
  }
  [getFormValue]() {
    return this.selected ? this.value : null;
  }
  constructor() {
    super();
    this.disabled = false;
    this.selected = false;
    this.icons = false;
    this.showOnlySelectedIcon = false;
    this.showFocusRing = false;
    this.showRipple = false;
    this.name = "";
    this.value = "on";
    this.renderRipple = () => {
      return x`
      <span class="md3-switch__ripple">
        <md-ripple
          ?disabled="${this.disabled}"
          unbounded>
        </md-ripple>
      </span>
    `;
    };
    this.getRipple = () => {
      this.showRipple = true;
      return this.ripple;
    };
    this.renderFocusRing = () => {
      return x`<md-focus-ring visible></md-focus-ring>`;
    };
    this.addController(new FormController(this));
    {
      this.addEventListener("click", (event) => {
        if (!isActivationClick(event)) {
          return;
        }
        this.button?.focus();
        if (this.button != null) {
          dispatchActivationClick(this.button);
        }
      });
    }
  }
  render() {
    return x`
      <button
        type="button"
        class="md3-switch ${o$1(this.getRenderClasses())}"
        role="switch"
        aria-checked="${this.selected}"
        aria-label=${this.ariaLabel || A}
        ?disabled=${this.disabled}
        @click=${this.handleClick}
        @focus="${this.handleFocus}"
        @blur="${this.handleBlur}"
        @pointerdown=${this.handlePointerDown}
        ${ripple(this.getRipple)}
      >
        ${n$2(this.showFocusRing, this.renderFocusRing)}
        <span class="md3-switch__track">
          ${this.renderHandle()}
        </span>
      </button>
    `;
  }
  getRenderClasses() {
    return {
      "md3-switch--selected": this.selected,
      "md3-switch--unselected": !this.selected
    };
  }
  renderHandle() {
    const classes = {
      "md3-switch__handle--big": this.icons && !this.showOnlySelectedIcon
    };
    return x`
      <span class="md3-switch__handle-container">
        ${n$2(this.showRipple, this.renderRipple)}
        <span class="md3-switch__handle ${o$1(classes)}">
          ${this.shouldShowIcons() ? this.renderIcons() : x``}
        </span>
        ${this.renderTouchTarget()}
      </span>
    `;
  }
  renderIcons() {
    return x`
      <div class="md3-switch__icons">
        ${this.renderOnIcon()}
        ${this.showOnlySelectedIcon ? x`` : this.renderOffIcon()}
      </div>
    `;
  }
  /**
   * https://fonts.google.com/icons?selected=Material%20Symbols%20Outlined%3Acheck%3AFILL%400%3Bwght%40500%3BGRAD%400%3Bopsz%4024
   */
  renderOnIcon() {
    return x`
      <svg class="md3-switch__icon md3-switch__icon--on" viewBox="0 0 24 24">
        <path d="M9.55 18.2 3.65 12.3 5.275 10.675 9.55 14.95 18.725 5.775 20.35 7.4Z"/>
      </svg>
    `;
  }
  /**
   * https://fonts.google.com/icons?selected=Material%20Symbols%20Outlined%3Aclose%3AFILL%400%3Bwght%40500%3BGRAD%400%3Bopsz%4024
   */
  renderOffIcon() {
    return x`
      <svg class="md3-switch__icon md3-switch__icon--off" viewBox="0 0 24 24">
        <path d="M6.4 19.2 4.8 17.6 10.4 12 4.8 6.4 6.4 4.8 12 10.4 17.6 4.8 19.2 6.4 13.6 12 19.2 17.6 17.6 19.2 12 13.6Z"/>
      </svg>
    `;
  }
  renderTouchTarget() {
    return x`<span class="md3-switch__touch"></span>`;
  }
  shouldShowIcons() {
    return this.icons || this.showOnlySelectedIcon;
  }
  handleClick() {
    if (this.disabled) {
      return;
    }
    this.selected = !this.selected;
    this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
    this.dispatchEvent(new Event("change", { bubbles: true }));
  }
  handleFocus() {
    this.showFocusRing = shouldShowStrongFocus();
  }
  handleBlur() {
    this.showFocusRing = false;
  }
  handlePointerDown() {
    pointerPress();
    this.showFocusRing = false;
  }
}
_a$b = Switch;
(() => {
  requestUpdateOnAriaChange(_a$b);
})();
Switch.shadowRootOptions = { mode: "open", delegatesFocus: true };
Switch.formAssociated = true;
__decorate([
  e$9({ type: Boolean, reflect: true })
], Switch.prototype, "disabled", void 0);
__decorate([
  e$9({ type: Boolean })
], Switch.prototype, "selected", void 0);
__decorate([
  e$9({ type: Boolean })
], Switch.prototype, "icons", void 0);
__decorate([
  e$9({ type: Boolean })
], Switch.prototype, "showOnlySelectedIcon", void 0);
__decorate([
  t$3()
], Switch.prototype, "showFocusRing", void 0);
__decorate([
  t$3()
], Switch.prototype, "showRipple", void 0);
__decorate([
  e$7("md-ripple")
], Switch.prototype, "ripple", void 0);
__decorate([
  i$5("button")
], Switch.prototype, "button", void 0);
__decorate([
  e$9({ reflect: true })
], Switch.prototype, "name", void 0);
__decorate([
  e$9()
], Switch.prototype, "value", void 0);
__decorate([
  e$8({ passive: true })
], Switch.prototype, "handlePointerDown", null);
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$r = i$4`:host{--_handle-shape-start-start: var(--md-switch-handle-shape-start-start, var(--md-switch-handle-shape, 9999px));--_handle-shape-start-end: var(--md-switch-handle-shape-start-end, var(--md-switch-handle-shape, 9999px));--_handle-shape-end-end: var(--md-switch-handle-shape-end-end, var(--md-switch-handle-shape, 9999px));--_handle-shape-end-start: var(--md-switch-handle-shape-end-start, var(--md-switch-handle-shape, 9999px));--_track-shape-start-start: var(--md-switch-track-shape-start-start, var(--md-switch-track-shape, 9999px));--_track-shape-start-end: var(--md-switch-track-shape-start-end, var(--md-switch-track-shape, 9999px));--_track-shape-end-end: var(--md-switch-track-shape-end-end, var(--md-switch-track-shape, 9999px));--_track-shape-end-start: var(--md-switch-track-shape-end-start, var(--md-switch-track-shape, 9999px));--_disabled-selected-handle-color: var(--md-switch-disabled-selected-handle-color, rgb(var(--md-sys-color-surface-rgb, 254, 247, 255), 1));--_disabled-selected-icon-color: var(--md-switch-disabled-selected-icon-color, rgb(var(--md-sys-color-on-surface-rgb, 29, 27, 32), 0.38));--_disabled-selected-track-color: var(--md-switch-disabled-selected-track-color, rgb(var(--md-sys-color-on-surface-rgb, 29, 27, 32), 0.12));--_disabled-unselected-handle-color: var(--md-switch-disabled-unselected-handle-color, rgb(var(--md-sys-color-on-surface-rgb, 29, 27, 32), 0.38));--_disabled-unselected-icon-color: var(--md-switch-disabled-unselected-icon-color, rgb(var(--md-sys-color-surface-container-highest-rgb, 230, 224, 233), 0.38));--_disabled-unselected-track-color: var(--md-switch-disabled-unselected-track-color, rgb(var(--md-sys-color-surface-container-highest-rgb, 230, 224, 233), 0.12));--_disabled-unselected-track-outline-color: var(--md-switch-disabled-unselected-track-outline-color, rgb(var(--md-sys-color-on-surface-rgb, 29, 27, 32), 0.12));--_pressed-handle-height: var(--md-switch-pressed-handle-height, 28px);--_pressed-handle-width: var(--md-switch-pressed-handle-width, 28px);--_selected-focus-handle-color: var(--md-switch-selected-focus-handle-color, var(--md-sys-color-primary-container, #eaddff));--_selected-focus-icon-color: var(--md-switch-selected-focus-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_selected-focus-state-layer-color: var(--md-switch-selected-focus-state-layer-color, var(--md-sys-color-primary, #6750a4));--_selected-focus-state-layer-opacity: var(--md-switch-selected-focus-state-layer-opacity, 0.12);--_selected-focus-track-color: var(--md-switch-selected-focus-track-color, var(--md-sys-color-primary, #6750a4));--_selected-handle-color: var(--md-switch-selected-handle-color, var(--md-sys-color-on-primary, #fff));--_selected-handle-height: var(--md-switch-selected-handle-height, 24px);--_selected-handle-width: var(--md-switch-selected-handle-width, 24px);--_selected-hover-handle-color: var(--md-switch-selected-hover-handle-color, var(--md-sys-color-primary-container, #eaddff));--_selected-hover-icon-color: var(--md-switch-selected-hover-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_selected-hover-state-layer-color: var(--md-switch-selected-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-state-layer-opacity: var(--md-switch-selected-hover-state-layer-opacity, 0.08);--_selected-hover-track-color: var(--md-switch-selected-hover-track-color, var(--md-sys-color-primary, #6750a4));--_selected-icon-color: var(--md-switch-selected-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_selected-icon-size: var(--md-switch-selected-icon-size, 16px);--_selected-pressed-handle-color: var(--md-switch-selected-pressed-handle-color, var(--md-sys-color-primary-container, #eaddff));--_selected-pressed-icon-color: var(--md-switch-selected-pressed-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_selected-pressed-state-layer-color: var(--md-switch-selected-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-state-layer-opacity: var(--md-switch-selected-pressed-state-layer-opacity, 0.12);--_selected-pressed-track-color: var(--md-switch-selected-pressed-track-color, var(--md-sys-color-primary, #6750a4));--_selected-track-color: var(--md-switch-selected-track-color, var(--md-sys-color-primary, #6750a4));--_state-layer-shape: var(--md-switch-state-layer-shape, 9999px);--_state-layer-size: var(--md-switch-state-layer-size, 40px);--_track-height: var(--md-switch-track-height, 32px);--_track-outline-width: var(--md-switch-track-outline-width, 2px);--_track-width: var(--md-switch-track-width, 52px);--_unselected-focus-handle-color: var(--md-switch-unselected-focus-handle-color, var(--md-sys-color-on-surface-variant, #49454f));--_unselected-focus-icon-color: var(--md-switch-unselected-focus-icon-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_unselected-focus-state-layer-color: var(--md-switch-unselected-focus-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_unselected-focus-state-layer-opacity: var(--md-switch-unselected-focus-state-layer-opacity, 0.12);--_unselected-focus-track-color: var(--md-switch-unselected-focus-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_unselected-focus-track-outline-color: var(--md-switch-unselected-focus-track-outline-color, var(--md-sys-color-outline, #79747e));--_unselected-handle-color: var(--md-switch-unselected-handle-color, var(--md-sys-color-outline, #79747e));--_unselected-handle-height: var(--md-switch-unselected-handle-height, 16px);--_unselected-handle-width: var(--md-switch-unselected-handle-width, 16px);--_unselected-hover-handle-color: var(--md-switch-unselected-hover-handle-color, var(--md-sys-color-on-surface-variant, #49454f));--_unselected-hover-icon-color: var(--md-switch-unselected-hover-icon-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_unselected-hover-state-layer-color: var(--md-switch-unselected-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_unselected-hover-state-layer-opacity: var(--md-switch-unselected-hover-state-layer-opacity, 0.08);--_unselected-hover-track-color: var(--md-switch-unselected-hover-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_unselected-hover-track-outline-color: var(--md-switch-unselected-hover-track-outline-color, var(--md-sys-color-outline, #79747e));--_unselected-icon-color: var(--md-switch-unselected-icon-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_unselected-icon-size: var(--md-switch-unselected-icon-size, 16px);--_unselected-pressed-handle-color: var(--md-switch-unselected-pressed-handle-color, var(--md-sys-color-on-surface-variant, #49454f));--_unselected-pressed-icon-color: var(--md-switch-unselected-pressed-icon-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_unselected-pressed-state-layer-color: var(--md-switch-unselected-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_unselected-pressed-state-layer-opacity: var(--md-switch-unselected-pressed-state-layer-opacity, 0.12);--_unselected-pressed-track-color: var(--md-switch-unselected-pressed-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_unselected-pressed-track-outline-color: var(--md-switch-unselected-pressed-track-outline-color, var(--md-sys-color-outline, #79747e));--_unselected-track-color: var(--md-switch-unselected-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_unselected-track-outline-color: var(--md-switch-unselected-track-outline-color, var(--md-sys-color-outline, #79747e));--_with-icon-handle-height: var(--md-switch-with-icon-handle-height, 24px);--_with-icon-handle-width: var(--md-switch-with-icon-handle-width, 24px);display:inline-flex;outline:none;vertical-align:top;-webkit-tap-highlight-color:rgba(0,0,0,0)}@media screen and (forced-colors: active){:host{--md-switch-disabled-selected-icon-color:GrayText;--md-switch-disabled-selected-track-color:GrayText;--md-switch-disabled-unselected-handle-color:GrayText;--md-switch-disabled-unselected-icon-color:Canvas;--md-switch-selected-focus-track-color:ButtonText;--md-switch-selected-hover-track-color:ButtonText;--md-switch-selected-icon-color:ButtonText;--md-switch-selected-pressed-track-color:ButtonText;--md-switch-selected-track-color:ButtonText;--md-switch-unselected-focus-handle-color:ButtonText;--md-switch-unselected-handle-color:ButtonText;--md-switch-unselected-hover-handle-color:ButtonText;--md-switch-unselected-icon-color:Canvas;--md-switch-unselected-pressed-handle-color:ButtonText}}md-focus-ring{--md-focus-ring-shape-start-start:var(--md-focus-ring-shape, var(--_track-shape-start-start));--md-focus-ring-shape-start-end:var(--md-focus-ring-shape, var(--_track-shape-start-end));--md-focus-ring-shape-end-end:var(--md-focus-ring-shape, var(--_track-shape-end-start));--md-focus-ring-shape-end-start:var(--md-focus-ring-shape, var(--_track-shape-end-end)))))}.md3-switch{align-items:center;background:none;border:none;cursor:pointer;display:inline-flex;flex-shrink:0;margin:0;outline:none;padding:0;position:relative;width:var(--_track-width);height:var(--_track-height);border-start-start-radius:var(--_track-shape-start-start);border-start-end-radius:var(--_track-shape-start-end);border-end-end-radius:var(--_track-shape-end-end);border-end-start-radius:var(--_track-shape-end-start)}.md3-switch__touch{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.md3-switch:disabled{cursor:default;pointer-events:none}.md3-switch:disabled .md3-switch__track{background-color:rgba(0,0,0,0);border-color:rgba(0,0,0,0)}.md3-switch:disabled .md3-switch__track::before{background-clip:content-box}.md3-switch--selected:disabled .md3-switch__track{background-clip:border-box}.md3-switch__track{position:absolute;width:100%;height:100%;box-sizing:border-box;border-radius:inherit;display:flex;justify-content:center;align-items:center;transition:background-color 67ms linear;background-color:var(--_selected-track-color)}.md3-switch:disabled .md3-switch__track{transition:none}.md3-switch--selected:hover .md3-switch__track{background-color:var(--_selected-hover-track-color)}.md3-switch--selected:focus-visible .md3-switch__track{background-color:var(--_selected-focus-track-color)}.md3-switch--selected:active .md3-switch__track{background-color:var(--_selected-pressed-track-color)}.md3-switch--selected:disabled .md3-switch__track{background-color:var(--_disabled-selected-track-color)}.md3-switch__track::before{content:"";display:flex;position:absolute;height:100%;width:100%;border-radius:inherit;box-sizing:border-box;border-style:solid;transition-property:opacity,background-color;transition-timing-function:linear;transition-duration:67ms;border-width:var(--_track-outline-width);background-color:var(--_unselected-track-color);border-color:var(--_unselected-track-outline-color)}.md3-switch:disabled .md3-switch__track::before{transition:none}.md3-switch--selected .md3-switch__track::before{opacity:0}.md3-switch--unselected:hover .md3-switch__track::before{background-color:var(--_unselected-hover-track-color);border-color:var(--_unselected-hover-track-outline-color)}.md3-switch--unselected:focus-visible .md3-switch__track::before{background-color:var(--_unselected-focus-track-color);border-color:var(--_unselected-focus-track-outline-color)}.md3-switch--unselected:active .md3-switch__track::before{background-color:var(--_unselected-pressed-track-color);border-color:var(--_unselected-pressed-track-outline-color)}.md3-switch--unselected:disabled .md3-switch__track::before{background-color:var(--_disabled-unselected-track-color);border-color:var(--_disabled-unselected-track-outline-color)}.md3-switch__handle-container{position:relative;transition:margin 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);display:flex}.md3-switch--selected .md3-switch__handle-container{margin-inline-start:calc(var(--_track-width) - var(--_track-height))}.md3-switch--unselected .md3-switch__handle-container{margin-inline-end:calc(var(--_track-width) - var(--_track-height))}.md3-switch:disabled .md3-switch__handle-container{transition:none}.md3-switch__handle{border-start-start-radius:var(--_handle-shape-start-start);border-start-end-radius:var(--_handle-shape-start-end);border-end-end-radius:var(--_handle-shape-end-end);border-end-start-radius:var(--_handle-shape-end-start);height:var(--_unselected-handle-height);width:var(--_unselected-handle-width);background-color:var(--_selected-handle-color);transform-origin:center;transition-property:height,width,background-color;transition-duration:250ms,250ms,67ms;transition-timing-function:cubic-bezier(0.2, 0, 0, 1),cubic-bezier(0.2, 0, 0, 1),linear;z-index:0}.md3-switch__handle::before{content:"";display:flex;position:absolute;height:100%;width:100%;border-radius:inherit;box-sizing:border-box;transition:opacity 67ms linear}.md3-switch--selected .md3-switch__handle::before{opacity:0}.md3-switch:disabled .md3-switch__handle::before{transition:none}.md3-switch:disabled .md3-switch__handle{transition:none}.md3-switch--selected .md3-switch__handle,.md3-switch--unselected .md3-switch__handle.md3-switch__handle--big{height:var(--_selected-handle-height);width:var(--_selected-handle-width)}.md3-switch--selected:enabled:active .md3-switch__handle,.md3-switch--unselected:enabled:active .md3-switch__handle{height:var(--_pressed-handle-height);width:var(--_pressed-handle-width);transition-timing-function:linear;transition-duration:100ms}.md3-switch--selected:hover .md3-switch__handle{background-color:var(--_selected-hover-handle-color)}.md3-switch--selected:focus-visible .md3-switch__handle{background-color:var(--_selected-focus-handle-color)}.md3-switch--selected:active .md3-switch__handle{background-color:var(--_selected-pressed-handle-color)}.md3-switch--selected:disabled .md3-switch__handle{background-color:var(--_disabled-selected-handle-color)}.md3-switch__handle::before{background-color:var(--_unselected-handle-color)}.md3-switch--unselected:hover .md3-switch__handle::before{background-color:var(--_unselected-hover-handle-color)}.md3-switch--unselected:focus-visible .md3-switch__handle::before{background-color:var(--_unselected-focus-handle-color)}.md3-switch--unselected:active .md3-switch__handle::before{background-color:var(--_unselected-pressed-handle-color)}.md3-switch--unselected:disabled .md3-switch__handle::before{background-color:var(--_disabled-unselected-handle-color)}.md3-switch__ripple{position:absolute;display:inline-flex;top:50%;left:50%;transform:translate(-50%, -50%);height:var(--_state-layer-size);width:var(--_state-layer-size)}.md3-switch--selected .md3-switch__ripple{--md-ripple-hover-color:var(--_selected-hover-state-layer-color);--md-ripple-focus-color:var(--_selected-focus-state-layer-color);--md-ripple-pressed-color:var(--_selected-pressed-state-layer-color);--md-ripple-hover-opacity:var(--_selected-hover-state-layer-opacity);--md-ripple-focus-opacity:var(--_selected-focus-state-layer-opacity);--md-ripple-pressed-opacity:var(--_selected-pressed-state-layer-opacity)}.md3-switch--unselected .md3-switch__ripple{--md-ripple-hover-color:var(--_unselected-hover-state-layer-color);--md-ripple-focus-color:var(--_unselected-focus-state-layer-color);--md-ripple-pressed-color:var(--_unselected-pressed-state-layer-color);--md-ripple-hover-opacity:var(--_unselected-hover-state-layer-opacity);--md-ripple-focus-opacity:var(--_unselected-focus-state-layer-opacity);--md-ripple-pressed-opacity:var(--_unselected-pressed-state-layer-opacity)}.md3-switch__icons{position:relative;height:100%;width:100%}.md3-switch__icon{position:absolute;inset:0;margin:auto;transition:fill 67ms linear,opacity 33ms linear,transform 167ms cubic-bezier(0.2, 0, 0, 1);opacity:0}.md3-switch:disabled .md3-switch__icon{transition:none}.md3-switch--selected .md3-switch__icon--on,.md3-switch--unselected .md3-switch__icon--off{opacity:1}.md3-switch--unselected .md3-switch__handle:not(.md3-switch__handle--big) .md3-switch__icon--on{transform:rotate(-45deg)}.md3-switch--selected .md3-switch__icon{width:var(--_selected-icon-size);height:var(--_selected-icon-size);fill:var(--_selected-icon-color)}.md3-switch--unselected .md3-switch__icon{width:var(--_unselected-icon-size);height:var(--_unselected-icon-size);fill:var(--_unselected-icon-color)}.md3-switch--selected:disabled .md3-switch__icon{fill:var(--_disabled-selected-icon-color)}.md3-switch--unselected:disabled .md3-switch__icon{fill:var(--_disabled-unselected-icon-color)}/*# sourceMappingURL=switch-styles.css.map */
`;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let MdSwitch = class MdSwitch2 extends Switch {
};
MdSwitch.styles = [styles$r];
MdSwitch = __decorate([
  e$a("md-switch")
], MdSwitch);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class Field extends s$2 {
  constructor() {
    super(...arguments);
    this.disabled = false;
    this.error = false;
    this.focused = false;
    this.populated = false;
    this.resizable = false;
    this.required = false;
    this.hasStart = false;
    this.hasEnd = false;
    this.isAnimating = false;
  }
  update(props) {
    if (this.disabled && this.focused) {
      props.set("focused", true);
      this.focused = false;
    }
    this.animateLabelIfNeeded({
      wasFocused: props.get("focused"),
      wasPopulated: props.get("populated")
    });
    super.update(props);
  }
  render() {
    const floatingLabel = this.renderLabel(
      /*isFloating*/
      true
    );
    const restingLabel = this.renderLabel(
      /*isFloating*/
      false
    );
    const outline = this.renderOutline?.(floatingLabel);
    const classes = {
      "disabled": this.disabled,
      "error": this.error && !this.disabled,
      "focused": this.focused,
      "with-start": this.hasStart,
      "with-end": this.hasEnd,
      "populated": this.populated,
      "resizable": this.resizable,
      "required": this.required,
      "no-label": !this.label
    };
    return x`
      <div class="field ${o$1(classes)}">
        <div class="container-overflow">
          ${outline}
          ${this.renderBackground?.()}
          ${this.renderIndicator?.()}
          <div class="container">
            <div class="start">
              <slot name="start"></slot>
            </div>
            <div class="middle">
              ${restingLabel}
              ${outline ? A : floatingLabel}
              <div class="content">
                <slot></slot>
              </div>
            </div>
            <div class="end">
              <slot name="end"></slot>
            </div>
          </div>
        </div>

        <div class="supporting-text">
          <div class="supporting-text-start">
            <slot name="supporting-text"></slot>
          </div>
          <div class="supporting-text-end">
            <slot name="supporting-text-end"></slot>
          </div>
        </div>
      </div>
    `;
  }
  renderLabel(isFloating) {
    let visible;
    if (isFloating) {
      visible = this.focused || this.populated || this.isAnimating;
    } else {
      visible = !this.focused && !this.populated && !this.isAnimating;
    }
    const classes = {
      "hidden": !visible,
      "floating": isFloating,
      "resting": !isFloating
    };
    let labelText = this.label ?? "";
    labelText += this.required && labelText ? "*" : "";
    return x`
      <span class="label ${o$1(classes)}"
        aria-hidden=${!visible}
      >${labelText}</span>
    `;
  }
  animateLabelIfNeeded({ wasFocused, wasPopulated }) {
    if (!this.label) {
      return;
    }
    wasFocused ?? (wasFocused = this.focused);
    wasPopulated ?? (wasPopulated = this.populated);
    const wasFloating = wasFocused || wasPopulated;
    const shouldBeFloating = this.focused || this.populated;
    if (wasFloating === shouldBeFloating) {
      return;
    }
    this.isAnimating = true;
    this.labelAnimation?.cancel();
    this.labelAnimation = this.floatingLabelEl?.animate(this.getLabelKeyframes(), { duration: 150, easing: EASING.STANDARD });
    this.labelAnimation?.addEventListener("finish", () => {
      this.isAnimating = false;
    });
  }
  getLabelKeyframes() {
    const { floatingLabelEl, restingLabelEl } = this;
    if (!floatingLabelEl || !restingLabelEl) {
      return [];
    }
    const { x: floatingX, y: floatingY, height: floatingHeight } = floatingLabelEl.getBoundingClientRect();
    const { x: restingX, y: restingY, height: restingHeight } = restingLabelEl.getBoundingClientRect();
    const floatingScrollWidth = floatingLabelEl.scrollWidth;
    const restingScrollWidth = restingLabelEl.scrollWidth;
    const scale = restingScrollWidth / floatingScrollWidth;
    const xDelta = restingX - floatingX;
    const yDelta = restingY - floatingY + Math.round((restingHeight - floatingHeight * scale) / 2);
    const restTransform = `translateX(${xDelta}px) translateY(${yDelta}px) scale(${scale})`;
    const floatTransform = `translateX(0) translateY(0) scale(1)`;
    const restingClientWidth = restingLabelEl.clientWidth;
    const isRestingClipped = restingScrollWidth > restingClientWidth;
    const width = isRestingClipped ? `${restingClientWidth / scale}px` : "";
    if (this.focused || this.populated) {
      return [
        { transform: restTransform, width },
        { transform: floatTransform, width }
      ];
    }
    return [
      { transform: floatTransform, width },
      { transform: restTransform, width }
    ];
  }
  getSurfacePositionClientRect() {
    return this.containerEl.getBoundingClientRect();
  }
}
__decorate([
  e$9({ type: Boolean })
], Field.prototype, "disabled", void 0);
__decorate([
  e$9({ type: Boolean })
], Field.prototype, "error", void 0);
__decorate([
  e$9({ type: Boolean })
], Field.prototype, "focused", void 0);
__decorate([
  e$9()
], Field.prototype, "label", void 0);
__decorate([
  e$9({ type: Boolean })
], Field.prototype, "populated", void 0);
__decorate([
  e$9({ type: Boolean })
], Field.prototype, "resizable", void 0);
__decorate([
  e$9({ type: Boolean })
], Field.prototype, "required", void 0);
__decorate([
  e$9({ type: Boolean })
], Field.prototype, "hasStart", void 0);
__decorate([
  e$9({ type: Boolean })
], Field.prototype, "hasEnd", void 0);
__decorate([
  t$3()
], Field.prototype, "isAnimating", void 0);
__decorate([
  i$5(".label.floating")
], Field.prototype, "floatingLabelEl", void 0);
__decorate([
  i$5(".label.resting")
], Field.prototype, "restingLabelEl", void 0);
__decorate([
  i$5(".container")
], Field.prototype, "containerEl", void 0);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class OutlinedField extends Field {
  renderOutline(floatingLabel) {
    return x`
      <div class="outline">
        <div class="outline-start"></div>
        <div class="outline-notch">
          <div class="outline-panel-inactive"></div>
          <div class="outline-panel-active"></div>
          <div class="outline-label">${floatingLabel}</div>
        </div>
        <div class="outline-end"></div>
      </div>
    `;
  }
}
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$q = i$4`:host{--_container-shape-start-start: var(--md-outlined-field-container-shape-start-start, var(--md-outlined-field-container-shape, 4px));--_container-shape-start-end: var(--md-outlined-field-container-shape-start-end, var(--md-outlined-field-container-shape, 4px));--_container-shape-end-end: var(--md-outlined-field-container-shape-end-end, var(--md-outlined-field-container-shape, 4px));--_container-shape-end-start: var(--md-outlined-field-container-shape-end-start, var(--md-outlined-field-container-shape, 4px));--_container-padding-horizontal: var(--md-outlined-field-container-padding-horizontal, 16px);--_container-padding-vertical: var(--md-outlined-field-container-padding-vertical, 16px);--_content-color: var(--md-outlined-field-content-color, var(--md-sys-color-on-surface, #1d1b20));--_content-type: var(--md-outlined-field-content-type, var(--md-sys-typescale-body-large, 400 1rem / 1.5rem var(--md-ref-typeface-plain, Roboto)));--_disabled-content-color: var(--md-outlined-field-disabled-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-content-opacity: var(--md-outlined-field-disabled-content-opacity, 0.38);--_disabled-label-text-color: var(--md-outlined-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-outlined-field-disabled-label-text-opacity, 0.38);--_disabled-leading-content-color: var(--md-outlined-field-disabled-leading-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-content-opacity: var(--md-outlined-field-disabled-leading-content-opacity, 0.38);--_disabled-outline-color: var(--md-outlined-field-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-outlined-field-disabled-outline-opacity, 0.12);--_disabled-outline-width: var(--md-outlined-field-disabled-outline-width, 1px);--_disabled-supporting-text-color: var(--md-outlined-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-outlined-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-content-color: var(--md-outlined-field-disabled-trailing-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-content-opacity: var(--md-outlined-field-disabled-trailing-content-opacity, 0.38);--_error-content-color: var(--md-outlined-field-error-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-content-color: var(--md-outlined-field-error-focus-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-label-text-color: var(--md-outlined-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-content-color: var(--md-outlined-field-error-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-outline-color: var(--md-outlined-field-error-focus-outline-color, var(--md-sys-color-error, #b3261e));--_error-focus-supporting-text-color: var(--md-outlined-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-content-color: var(--md-outlined-field-error-focus-trailing-content-color, var(--md-sys-color-error, #b3261e));--_error-hover-content-color: var(--md-outlined-field-error-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-outlined-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-content-color: var(--md-outlined-field-error-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-outline-color: var(--md-outlined-field-error-hover-outline-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-supporting-text-color: var(--md-outlined-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-content-color: var(--md-outlined-field-error-hover-trailing-content-color, var(--md-sys-color-on-error-container, #410e0b));--_error-label-text-color: var(--md-outlined-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-content-color: var(--md-outlined-field-error-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-outline-color: var(--md-outlined-field-error-outline-color, var(--md-sys-color-error, #b3261e));--_error-supporting-text-color: var(--md-outlined-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-content-color: var(--md-outlined-field-error-trailing-content-color, var(--md-sys-color-error, #b3261e));--_focus-content-color: var(--md-outlined-field-focus-content-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-outlined-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-content-color: var(--md-outlined-field-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-outline-color: var(--md-outlined-field-focus-outline-color, var(--md-sys-color-primary, #6750a4));--_focus-outline-width: var(--md-outlined-field-focus-outline-width, 2px);--_focus-supporting-text-color: var(--md-outlined-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-content-color: var(--md-outlined-field-focus-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-content-color: var(--md-outlined-field-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-outlined-field-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-leading-content-color: var(--md-outlined-field-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-outline-color: var(--md-outlined-field-hover-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-outline-width: var(--md-outlined-field-hover-outline-width, 1px);--_hover-supporting-text-color: var(--md-outlined-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-content-color: var(--md-outlined-field-hover-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-color: var(--md-outlined-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-padding-bottom: var(--md-outlined-field-label-text-padding-bottom, 8px);--_label-text-populated-line-height: var(--md-outlined-field-label-text-populated-line-height, 1rem);--_label-text-populated-size: var(--md-outlined-field-label-text-populated-size, 0.75rem);--_label-text-type: var(--md-outlined-field-label-text-type, var(--md-sys-typescale-body-large, 400 1rem / 1.5rem var(--md-ref-typeface-plain, Roboto)));--_leading-content-color: var(--md-outlined-field-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_outline-color: var(--md-outlined-field-outline-color, var(--md-sys-color-outline, #79747e));--_outline-label-padding: var(--md-outlined-field-outline-label-padding, 4px);--_outline-width: var(--md-outlined-field-outline-width, 1px);--_supporting-text-color: var(--md-outlined-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-padding: var(--md-outlined-field-supporting-text-padding, 16px);--_supporting-text-padding-top: var(--md-outlined-field-supporting-text-padding-top, 4px);--_supporting-text-type: var(--md-outlined-field-supporting-text-type, var(--md-sys-typescale-body-small, 400 0.75rem / 1rem var(--md-ref-typeface-plain, Roboto)));--_trailing-content-color: var(--md-outlined-field-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f))}.outline{border-color:var(--_outline-color);border-radius:inherit;color:var(--_outline-color);display:flex;pointer-events:none;height:100%;position:absolute;width:100%}.outline-start::before,.outline-start::after,.outline-panel-inactive::before,.outline-panel-inactive::after,.outline-panel-active::before,.outline-panel-active::after,.outline-end::before,.outline-end::after{border:inherit;content:"";inset:0;position:absolute}.outline-start,.outline-end{border:inherit;border-radius:inherit;box-sizing:border-box;position:relative}.outline-start::before,.outline-start::after,.outline-end::before,.outline-end::after{border-bottom-style:solid;border-top-style:solid}.outline-start::after,.outline-end::after{opacity:0;transition:opacity 150ms cubic-bezier(0.2, 0, 0, 1)}.focused .outline-start::after,.focused .outline-end::after{opacity:1}.outline-start::before,.outline-start::after{border-inline-start-style:solid;border-inline-end-style:none;border-start-start-radius:inherit;border-start-end-radius:0;border-end-start-radius:inherit;border-end-end-radius:0;margin-inline-end:var(--_outline-label-padding)}.outline-end{flex-grow:1;margin-inline-start:calc(-1*var(--_outline-label-padding))}.outline-end::before,.outline-end::after{border-inline-start-style:none;border-inline-end-style:solid;border-start-start-radius:0;border-start-end-radius:inherit;border-end-start-radius:0;border-end-end-radius:inherit}.outline-notch{align-items:flex-start;border:inherit;display:flex;margin-inline-start:calc(-1*var(--_outline-label-padding));margin-inline-end:var(--_outline-label-padding);max-width:calc(100% - 2*var(--_container-padding-horizontal));padding:0 var(--_outline-label-padding);position:relative}.no-label .outline-notch{display:none}.outline-panel-inactive,.outline-panel-active{border:inherit;border-bottom-style:solid;inset:0;position:absolute}.outline-panel-inactive::before,.outline-panel-inactive::after,.outline-panel-active::before,.outline-panel-active::after{border-top-style:solid;border-bottom:none;bottom:auto;transform:scaleX(1);transition:transform 150ms cubic-bezier(0.2, 0, 0, 1)}.outline-panel-inactive::before,.outline-panel-active::before{right:50%;transform-origin:top left}.outline-panel-inactive::after,.outline-panel-active::after{left:50%;transform-origin:top right}.populated .outline-panel-inactive::before,.populated .outline-panel-inactive::after,.populated .outline-panel-active::before,.populated .outline-panel-active::after,.focused .outline-panel-inactive::before,.focused .outline-panel-inactive::after,.focused .outline-panel-active::before,.focused .outline-panel-active::after{transform:scaleX(0)}.outline-panel-active{opacity:0;transition:opacity 150ms cubic-bezier(0.2, 0, 0, 1)}.focused .outline-panel-active{opacity:1}.outline-label{display:flex;max-width:100%;transform:translateY(calc(-100% + var(--_label-text-padding-bottom)))}.outline-start,.field:not(.with-start) .start{padding-inline-start:max(var(--_container-padding-horizontal),max(var(--_container-shape-start-start),var(--_container-shape-end-start)) + var(--_outline-label-padding))}.field:not(.with-end) .end{padding-inline-end:max(var(--_container-padding-horizontal),max(var(--_container-shape-start-end),var(--_container-shape-end-end)))}.outline-start::before,.outline-end::before,.outline-panel-inactive,.outline-panel-inactive::before,.outline-panel-inactive::after{border-width:var(--_outline-width)}:hover .outline{border-color:var(--_hover-outline-color);color:var(--_hover-outline-color)}:hover .outline-start::before,:hover .outline-end::before,:hover .outline-panel-inactive,:hover .outline-panel-inactive::before,:hover .outline-panel-inactive::after{border-width:var(--_hover-outline-width)}.focused .outline{border-color:var(--_focus-outline-color);color:var(--_focus-outline-color)}.outline-start::after,.outline-end::after,.outline-panel-active,.outline-panel-active::before,.outline-panel-active::after{border-width:var(--_focus-outline-width)}.disabled .outline{border-color:var(--_disabled-outline-color);color:var(--_disabled-outline-color)}.disabled .outline-start,.disabled .outline-end,.disabled .outline-panel-inactive{opacity:var(--_disabled-outline-opacity)}.disabled .outline-start::before,.disabled .outline-end::before,.disabled .outline-panel-inactive,.disabled .outline-panel-inactive::before,.disabled .outline-panel-inactive::after{border-width:var(--_disabled-outline-width)}.error .outline{border-color:var(--_error-outline-color);color:var(--_error-outline-color)}.error:hover .outline{border-color:var(--_error-hover-outline-color);color:var(--_error-hover-outline-color)}.error.focused .outline{border-color:var(--_error-focus-outline-color);color:var(--_error-focus-outline-color)}/*# sourceMappingURL=outlined-styles.css.map */
`;
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$p = i$4`:host{display:inline-flex}.field{display:flex;flex:1;flex-direction:column;writing-mode:horizontal-tb;max-width:100%}.container-overflow{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-end-radius:var(--_container-shape-end-end);border-end-start-radius:var(--_container-shape-end-start);display:flex;position:relative}.container{align-items:center;border-radius:inherit;display:flex;flex:1;min-width:min-content;overflow:hidden;padding-top:var(--_container-padding-vertical);padding-bottom:var(--_container-padding-vertical);position:relative}.resizable .container{resize:both}.disabled{pointer-events:none}.start,.middle,.end{display:flex;box-sizing:border-box;height:100%;position:relative}.start{color:var(--_leading-content-color)}.end{color:var(--_trailing-content-color)}.start,.end{align-items:center;justify-content:center}.with-start .start,.with-end .end{min-width:48px}.with-start .start{margin-inline-end:4px}.with-end .end{margin-inline-start:4px}.middle{align-items:stretch;align-self:baseline;flex:1}.content{color:var(--_content-color);display:flex;flex:1;font:var(--_content-type);opacity:0;transition:opacity 83ms cubic-bezier(0.2, 0, 0, 1)}.no-label .content,.focused .content,.populated .content{opacity:1;transition-delay:67ms}:hover .content{color:var(--_hover-content-color)}:hover .start{color:var(--_hover-leading-content-color)}:hover .end{color:var(--_hover-trailing-content-color)}.focused .content{color:var(--_focus-content-color)}.focused .start{color:var(--_focus-leading-content-color)}.focused .end{color:var(--_focus-trailing-content-color)}.disabled .content{color:var(--_disabled-content-color)}.disabled.no-label .content,.disabled.focused .content,.disabled.populated .content{opacity:var(--_disabled-content-opacity)}.disabled .start{color:var(--_disabled-leading-content-color);opacity:var(--_disabled-leading-content-opacity)}.disabled .end{color:var(--_disabled-trailing-content-color);opacity:var(--_disabled-trailing-content-opacity)}.error .content{color:var(--_error-content-color)}.error .start{color:var(--_error-leading-content-color)}.error .end{color:var(--_error-trailing-content-color)}.error:hover .content{color:var(--_error-hover-content-color)}.error:hover .start{color:var(--_error-hover-leading-content-color)}.error:hover .end{color:var(--_error-hover-trailing-content-color)}.error.focused .content{color:var(--_error-focus-content-color)}.error.focused .start{color:var(--_error-focus-leading-content-color)}.error.focused .end{color:var(--_error-focus-trailing-content-color)}.label{color:var(--_label-text-color);overflow:hidden;max-width:100%;pointer-events:none;text-overflow:ellipsis;white-space:nowrap;z-index:1;font:var(--_label-text-type)}.label.resting{position:absolute;top:50%;transform:translateY(-50%)}.label.floating{font-size:var(--_label-text-populated-size);line-height:var(--_label-text-populated-line-height);transform-origin:top left}.label.hidden{opacity:0}.no-label .label{display:none}:hover .label{color:var(--_hover-label-text-color)}.focused .label{color:var(--_focus-label-text-color)}.disabled .label{color:var(--_disabled-label-text-color)}.disabled .label:not(.hidden){opacity:var(--_disabled-label-text-opacity)}.error .label{color:var(--_error-label-text-color)}.error:hover .label{color:var(--_error-hover-label-text-color)}.error.focused .label{color:var(--_error-focus-label-text-color)}.supporting-text{color:var(--_supporting-text-color);display:flex;justify-content:space-between;padding:0 var(--_supporting-text-padding);font:var(--_supporting-text-type)}.supporting-text-start,.supporting-text-end{display:flex}.supporting-text-start ::slotted(:not(:empty)),.supporting-text-end ::slotted(:not(:empty)){padding-top:var(--_supporting-text-padding-top)}.supporting-text-end ::slotted(:not(:empty)){padding-inline-start:var(--_supporting-text-padding)}:hover .supporting-text{color:var(--_hover-supporting-text-color)}.focus .supporting-text{color:var(--_focus-supporting-text-color)}.disabled .supporting-text{color:var(--_disabled-supporting-text-color);opacity:var(--_disabled-supporting-text-opacity)}.error .supporting-text{color:var(--_error-supporting-text-color)}.error:hover .supporting-text{color:var(--_error-hover-supporting-text-color)}.error.focus .supporting-text{color:var(--_error-focus-supporting-text-color)}/*# sourceMappingURL=shared-styles.css.map */
`;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let MdOutlinedField = class MdOutlinedField2 extends OutlinedField {
};
MdOutlinedField.styles = [styles$p, styles$q];
MdOutlinedField = __decorate([
  e$a("md-outlined-field")
], MdOutlinedField);
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$o = i$4`@media(forced-colors: active){:host{--md-outlined-text-field-disabled-input-text-color:GrayText;--md-outlined-text-field-disabled-input-text-opacity:1;--md-outlined-text-field-disabled-label-text-color:GrayText;--md-outlined-text-field-disabled-label-text-opacity:1;--md-outlined-text-field-disabled-leading-icon-color:GrayText;--md-outlined-text-field-disabled-leading-icon-opacity:1;--md-outlined-text-field-disabled-outline-color:GrayText;--md-outlined-text-field-disabled-outline-opacity:1;--md-outlined-text-field-disabled-supporting-text-color:GrayText;--md-outlined-text-field-disabled-supporting-text-opacity:1;--md-outlined-text-field-disabled-trailing-icon-color:GrayText;--md-outlined-text-field-disabled-trailing-icon-opacity:1}}/*# sourceMappingURL=outlined-forced-colors-styles.css.map */
`;
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$n = i$4`:host{--_container-shape-start-start: var(--md-outlined-text-field-container-shape-start-start, var(--md-outlined-text-field-container-shape, 4px));--_container-shape-start-end: var(--md-outlined-text-field-container-shape-start-end, var(--md-outlined-text-field-container-shape, 4px));--_container-shape-end-end: var(--md-outlined-text-field-container-shape-end-end, var(--md-outlined-text-field-container-shape, 4px));--_container-shape-end-start: var(--md-outlined-text-field-container-shape-end-start, var(--md-outlined-text-field-container-shape, 4px));--_container-padding-horizontal: var(--md-outlined-text-field-container-padding-horizontal, 16px);--_container-padding-vertical: var(--md-outlined-text-field-container-padding-vertical, 16px);--_input-text-prefix-padding: var(--md-outlined-text-field-input-text-prefix-padding, 2px);--_input-text-suffix-padding: var(--md-outlined-text-field-input-text-suffix-padding, 2px);--_focus-caret-color: var(--md-outlined-text-field-focus-caret-color, var(--md-sys-color-primary, #6750a4));--_caret-color: var(--md-outlined-text-field-caret-color, var(--md-sys-color-primary, #6750a4));--_disabled-input-text-color: var(--md-outlined-text-field-disabled-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-input-text-opacity: var(--md-outlined-text-field-disabled-input-text-opacity, 0.38);--_disabled-label-text-color: var(--md-outlined-text-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-outlined-text-field-disabled-label-text-opacity, 0.38);--_disabled-leading-icon-color: var(--md-outlined-text-field-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-icon-opacity: var(--md-outlined-text-field-disabled-leading-icon-opacity, 0.38);--_disabled-outline-color: var(--md-outlined-text-field-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-outlined-text-field-disabled-outline-opacity, 0.12);--_disabled-outline-width: var(--md-outlined-text-field-disabled-outline-width, 1px);--_disabled-supporting-text-color: var(--md-outlined-text-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-outlined-text-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-icon-color: var(--md-outlined-text-field-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-icon-opacity: var(--md-outlined-text-field-disabled-trailing-icon-opacity, 0.38);--_error-focus-caret-color: var(--md-outlined-text-field-error-focus-caret-color, var(--md-sys-color-error, #b3261e));--_error-focus-input-text-color: var(--md-outlined-text-field-error-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-label-text-color: var(--md-outlined-text-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-icon-color: var(--md-outlined-text-field-error-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-outline-color: var(--md-outlined-text-field-error-focus-outline-color, var(--md-sys-color-error, #b3261e));--_error-focus-supporting-text-color: var(--md-outlined-text-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-icon-color: var(--md-outlined-text-field-error-focus-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_error-hover-input-text-color: var(--md-outlined-text-field-error-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-outlined-text-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-icon-color: var(--md-outlined-text-field-error-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-outline-color: var(--md-outlined-text-field-error-hover-outline-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-supporting-text-color: var(--md-outlined-text-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-icon-color: var(--md-outlined-text-field-error-hover-trailing-icon-color, var(--md-sys-color-on-error-container, #410e0b));--_error-input-text-color: var(--md-outlined-text-field-error-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-label-text-color: var(--md-outlined-text-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-icon-color: var(--md-outlined-text-field-error-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-outline-color: var(--md-outlined-text-field-error-outline-color, var(--md-sys-color-error, #b3261e));--_error-supporting-text-color: var(--md-outlined-text-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-icon-color: var(--md-outlined-text-field-error-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_focus-input-text-color: var(--md-outlined-text-field-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-outlined-text-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-icon-color: var(--md-outlined-text-field-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-outline-color: var(--md-outlined-text-field-focus-outline-color, var(--md-sys-color-primary, #6750a4));--_focus-outline-width: var(--md-outlined-text-field-focus-outline-width, 2px);--_focus-supporting-text-color: var(--md-outlined-text-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-icon-color: var(--md-outlined-text-field-focus-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-input-text-color: var(--md-outlined-text-field-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-outlined-text-field-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-leading-icon-color: var(--md-outlined-text-field-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-outline-color: var(--md-outlined-text-field-hover-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-outline-width: var(--md-outlined-text-field-hover-outline-width, 1px);--_hover-supporting-text-color: var(--md-outlined-text-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-icon-color: var(--md-outlined-text-field-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-color: var(--md-outlined-text-field-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_input-text-placeholder-color: var(--md-outlined-text-field-input-text-placeholder-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-prefix-color: var(--md-outlined-text-field-input-text-prefix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-suffix-color: var(--md-outlined-text-field-input-text-suffix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-type: var(--md-outlined-text-field-input-text-type, var(--md-sys-typescale-body-large, 400 1rem / 1.5rem var(--md-ref-typeface-plain, Roboto)));--_label-text-color: var(--md-outlined-text-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-populated-line-height: var(--md-outlined-text-field-label-text-populated-line-height, 1rem);--_label-text-populated-size: var(--md-outlined-text-field-label-text-populated-size, 0.75rem);--_label-text-type: var(--md-outlined-text-field-label-text-type, var(--md-sys-typescale-body-large, 400 1rem / 1.5rem var(--md-ref-typeface-plain, Roboto)));--_leading-icon-color: var(--md-outlined-text-field-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-icon-size: var(--md-outlined-text-field-leading-icon-size, 24px);--_outline-color: var(--md-outlined-text-field-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width: var(--md-outlined-text-field-outline-width, 1px);--_supporting-text-color: var(--md-outlined-text-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-type: var(--md-outlined-text-field-supporting-text-type, var(--md-sys-typescale-body-small, 400 0.75rem / 1rem var(--md-ref-typeface-plain, Roboto)));--_trailing-icon-color: var(--md-outlined-text-field-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-icon-size: var(--md-outlined-text-field-trailing-icon-size, 24px);--md-outlined-field-container-shape-start-start:var(--md-outlined-field-container-shape, var(--_container-shape-start-start));--md-outlined-field-container-shape-start-end:var(--md-outlined-field-container-shape, var(--_container-shape-start-end));--md-outlined-field-container-shape-end-end:var(--md-outlined-field-container-shape, var(--_container-shape-end-end));--md-outlined-field-container-shape-end-start:var(--md-outlined-field-container-shape, var(--_container-shape-end-start));--md-outlined-field-container-padding-horizontal:var(--_container-padding-horizontal);--md-outlined-field-container-padding-vertical:var(--_container-padding-vertical);--md-outlined-field-content-color:var(--_input-text-color);--md-outlined-field-content-type:var(--_input-text-type);--md-outlined-field-disabled-content-color:var(--_disabled-input-text-color);--md-outlined-field-disabled-content-opacity:var(--_disabled-input-text-opacity);--md-outlined-field-disabled-label-text-color:var(--_disabled-label-text-color);--md-outlined-field-disabled-label-text-opacity:var(--_disabled-label-text-opacity);--md-outlined-field-disabled-leading-content-color:var(--_disabled-leading-icon-color);--md-outlined-field-disabled-leading-content-opacity:var(--_disabled-leading-icon-opacity);--md-outlined-field-disabled-outline-color:var(--_disabled-outline-color);--md-outlined-field-disabled-outline-opacity:var(--_disabled-outline-opacity);--md-outlined-field-disabled-outline-width:var(--_disabled-outline-width);--md-outlined-field-disabled-supporting-text-color:var(--_disabled-supporting-text-color);--md-outlined-field-disabled-supporting-text-opacity:var(--_disabled-supporting-text-opacity);--md-outlined-field-disabled-trailing-content-color:var(--_disabled-trailing-icon-color);--md-outlined-field-disabled-trailing-content-opacity:var(--_disabled-trailing-icon-opacity);--md-outlined-field-error-content-color:var(--_error-input-text-color);--md-outlined-field-error-focus-content-color:var(--_error-focus-input-text-color);--md-outlined-field-error-focus-label-text-color:var(--_error-focus-label-text-color);--md-outlined-field-error-focus-leading-content-color:var(--_error-focus-leading-icon-color);--md-outlined-field-error-focus-outline-color:var(--_error-focus-outline-color);--md-outlined-field-error-focus-supporting-text-color:var(--_error-focus-supporting-text-color);--md-outlined-field-error-focus-trailing-content-color:var(--_error-focus-trailing-icon-color);--md-outlined-field-error-hover-content-color:var(--_error-hover-input-text-color);--md-outlined-field-error-hover-label-text-color:var(--_error-hover-label-text-color);--md-outlined-field-error-hover-leading-content-color:var(--_error-hover-leading-icon-color);--md-outlined-field-error-hover-outline-color:var(--_error-hover-outline-color);--md-outlined-field-error-hover-supporting-text-color:var(--_error-hover-supporting-text-color);--md-outlined-field-error-hover-trailing-content-color:var(--_error-hover-trailing-icon-color);--md-outlined-field-error-label-text-color:var(--_error-label-text-color);--md-outlined-field-error-leading-content-color:var(--_error-leading-icon-color);--md-outlined-field-error-outline-color:var(--_error-outline-color);--md-outlined-field-error-supporting-text-color:var(--_error-supporting-text-color);--md-outlined-field-error-trailing-content-color:var(--_error-trailing-icon-color);--md-outlined-field-focus-content-color:var(--_focus-input-text-color);--md-outlined-field-focus-label-text-color:var(--_focus-label-text-color);--md-outlined-field-focus-leading-content-color:var(--_focus-leading-icon-color);--md-outlined-field-focus-outline-color:var(--_focus-outline-color);--md-outlined-field-focus-outline-width:var(--_focus-outline-width);--md-outlined-field-focus-supporting-text-color:var(--_focus-supporting-text-color);--md-outlined-field-focus-trailing-content-color:var(--_focus-trailing-icon-color);--md-outlined-field-hover-content-color:var(--_hover-input-text-color);--md-outlined-field-hover-label-text-color:var(--_hover-label-text-color);--md-outlined-field-hover-leading-content-color:var(--_hover-leading-icon-color);--md-outlined-field-hover-outline-color:var(--_hover-outline-color);--md-outlined-field-hover-outline-width:var(--_hover-outline-width);--md-outlined-field-hover-supporting-text-color:var(--_hover-supporting-text-color);--md-outlined-field-hover-trailing-content-color:var(--_hover-trailing-icon-color);--md-outlined-field-label-text-color:var(--_label-text-color);--md-outlined-field-label-text-populated-line-height:var(--_label-text-populated-line-height);--md-outlined-field-label-text-populated-size:var(--_label-text-populated-size);--md-outlined-field-label-text-type:var(--_label-text-type);--md-outlined-field-leading-content-color:var(--_leading-icon-color);--md-outlined-field-outline-color:var(--_outline-color);--md-outlined-field-outline-width:var(--_outline-width);--md-outlined-field-supporting-text-color:var(--_supporting-text-color);--md-outlined-field-supporting-text-type:var(--_supporting-text-type);--md-outlined-field-trailing-content-color:var(--_trailing-icon-color)}/*# sourceMappingURL=outlined-styles.css.map */
`;
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e = (o3) => void 0 === o3.strings, f = {}, s2 = (o3, l2 = f) => o3._$AH = l2;
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const l = e$2(class extends i$2 {
  constructor(r2) {
    if (super(r2), r2.type !== t.PROPERTY && r2.type !== t.ATTRIBUTE && r2.type !== t.BOOLEAN_ATTRIBUTE)
      throw Error("The `live` directive is not allowed on child or event bindings");
    if (!e(r2))
      throw Error("`live` bindings can only contain a single expression");
  }
  render(r2) {
    return r2;
  }
  update(i3, [t$12]) {
    if (t$12 === T || t$12 === A)
      return t$12;
    const o3 = i3.element, l2 = i3.name;
    if (i3.type === t.PROPERTY) {
      if (t$12 === o3[l2])
        return T;
    } else if (i3.type === t.BOOLEAN_ATTRIBUTE) {
      if (!!t$12 === o3.hasAttribute(l2))
        return T;
    } else if (i3.type === t.ATTRIBUTE && o3.getAttribute(l2) === t$12 + "")
      return T;
    return s2(i3), t$12;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i2 = "important", n = " !" + i2, o2 = e$2(class extends i$2 {
  constructor(t$12) {
    var e2;
    if (super(t$12), t$12.type !== t.ATTRIBUTE || "style" !== t$12.name || (null === (e2 = t$12.strings) || void 0 === e2 ? void 0 : e2.length) > 2)
      throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t2) {
    return Object.keys(t2).reduce((e2, r2) => {
      const s3 = t2[r2];
      return null == s3 ? e2 : e2 + `${r2 = r2.includes("-") ? r2 : r2.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s3};`;
    }, "");
  }
  update(e2, [r2]) {
    const { style: s3 } = e2.element;
    if (void 0 === this.ut) {
      this.ut = /* @__PURE__ */ new Set();
      for (const t2 in r2)
        this.ut.add(t2);
      return this.render(r2);
    }
    this.ut.forEach((t2) => {
      null == r2[t2] && (this.ut.delete(t2), t2.includes("-") ? s3.removeProperty(t2) : s3[t2] = "");
    });
    for (const t2 in r2) {
      const e3 = r2[t2];
      if (null != e3) {
        this.ut.add(t2);
        const r3 = "string" == typeof e3 && e3.endsWith(n);
        t2.includes("-") || r3 ? s3.setProperty(t2, r3 ? e3.slice(0, -11) : e3, r3 ? i2 : "") : s3[t2] = e3;
      }
    }
    return T;
  }
});
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const stringConverter = {
  fromAttribute(value) {
    return value ?? "";
  },
  toAttribute(value) {
    return value || null;
  }
};
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
var _a$a;
class TextField extends s$2 {
  // FormElement
  get form() {
    return this.closest("form");
  }
  [getFormValue]() {
    return this.value;
  }
  /**
   * Gets or sets the direction in which selection occurred.
   */
  get selectionDirection() {
    return this.getInput().selectionDirection;
  }
  set selectionDirection(value) {
    this.getInput().selectionDirection = value;
  }
  /**
   * Gets or sets the end position or offset of a text selection.
   */
  get selectionEnd() {
    return this.getInput().selectionEnd;
  }
  set selectionEnd(value) {
    this.getInput().selectionEnd = value;
  }
  /**
   * Gets or sets the starting position or offset of a text selection.
   */
  get selectionStart() {
    return this.getInput().selectionStart;
  }
  set selectionStart(value) {
    this.getInput().selectionStart = value;
  }
  /**
   * Returns the native validation error message that would be displayed upon
   * calling `reportValidity()`.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/validationMessage
   */
  get validationMessage() {
    return this.getInput().validationMessage;
  }
  /**
   * Returns a ValidityState object that represents the validity states of the
   * text field.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/validity
   */
  get validity() {
    return this.getInput().validity;
  }
  /**
   * The text field's value as a number.
   */
  get valueAsNumber() {
    return this.getInput().valueAsNumber;
  }
  set valueAsNumber(value) {
    this.getInput().valueAsNumber = value;
    this.value = this.getInput().value;
  }
  /**
   * The text field's value as a Date.
   */
  get valueAsDate() {
    return this.getInput().valueAsDate;
  }
  set valueAsDate(value) {
    this.getInput().valueAsDate = value;
    this.value = this.getInput().value;
  }
  /**
   * Returns whether an element will successfully validate based on forms
   * validation rules and constraints.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/willValidate
   */
  get willValidate() {
    return this.getInput().willValidate;
  }
  get hasError() {
    return this.error || this.nativeError;
  }
  constructor() {
    super();
    this.disabled = false;
    this.error = false;
    this.errorText = "";
    this.required = false;
    this.value = "";
    this.defaultValue = "";
    this.prefixText = "";
    this.suffixText = "";
    this.hasLeadingIcon = false;
    this.hasTrailingIcon = false;
    this.supportingText = "";
    this.textDirection = "";
    this.name = "";
    this.max = "";
    this.maxLength = -1;
    this.min = "";
    this.minLength = -1;
    this.pattern = "";
    this.placeholder = "";
    this.readOnly = false;
    this.step = "";
    this.type = "text";
    this.dirty = false;
    this.focused = false;
    this.refreshErrorAlert = false;
    this.valueHasChanged = false;
    this.ignoreNextValueChange = false;
    this.nativeError = false;
    this.nativeErrorText = "";
    this.addController(new FormController(this));
    {
      this.addEventListener("click", this.focus);
      this.addEventListener("focusin", this.handleFocusin);
      this.addEventListener("focusout", this.handleFocusout);
    }
  }
  /**
   * Checks the text field's native validation and returns whether or not the
   * element is valid.
   *
   * If invalid, this method will dispatch the `invalid` event.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/checkValidity
   *
   * @return true if the text field is valid, or false if not.
   */
  checkValidity() {
    const { valid } = this.checkValidityAndDispatch();
    return valid;
  }
  /**
   * Focuses the text field's input text.
   */
  focus() {
    if (this.disabled || this.matches(":focus-within")) {
      return;
    }
    super.focus();
  }
  /**
   * Checks the text field's native validation and returns whether or not the
   * element is valid.
   *
   * If invalid, this method will dispatch the `invalid` event.
   *
   * This method will display or clear an error text message equal to the text
   * field's `validationMessage`, unless the invalid event is canceled.
   *
   * Use `setCustomValidity()` to customize the `validationMessage`.
   *
   * This method can also be used to re-announce error messages to screen
   * readers.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/reportValidity
   *
   * @return true if the text field is valid, or false if not.
   */
  reportValidity() {
    const { valid, canceled } = this.checkValidityAndDispatch();
    if (!canceled) {
      const prevMessage = this.getErrorText();
      this.nativeError = !valid;
      this.nativeErrorText = this.validationMessage;
      const needsRefresh = this.shouldErrorAnnounce() && prevMessage === this.getErrorText();
      if (needsRefresh) {
        this.refreshErrorAlert = true;
      }
    }
    return valid;
  }
  /**
   * Selects all the text in the text field.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select
   */
  select() {
    this.getInput().select();
  }
  /**
   * Sets the text field's native validation error message. This is used to
   * customize `validationMessage`.
   *
   * When the error is not an empty string, the text field is considered invalid
   * and `validity.customError` will be true.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setCustomValidity
   *
   * @param error The error message to display.
   */
  setCustomValidity(error) {
    this.getInput().setCustomValidity(error);
  }
  setRangeText(...args) {
    this.getInput().setRangeText(...args);
    this.value = this.getInput().value;
  }
  /**
   * Sets the start and end positions of a selection in the text field.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange
   *
   * @param start The offset into the text field for the start of the selection.
   * @param end The offset into the text field for the end of the selection.
   * @param direction The direction in which the selection is performed.
   */
  setSelectionRange(start, end, direction) {
    this.getInput().setSelectionRange(start, end, direction);
  }
  /**
   * Decrements the value of a numeric type text field by `step` or `n` `step`
   * number of times.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/stepDown
   *
   * @param stepDecrement The number of steps to decrement, defaults to 1.
   */
  stepDown(stepDecrement) {
    const input = this.getInput();
    input.stepDown(stepDecrement);
    this.value = input.value;
  }
  /**
   * Increments the value of a numeric type text field by `step` or `n` `step`
   * number of times.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/stepUp
   *
   * @param stepIncrement The number of steps to increment, defaults to 1.
   */
  stepUp(stepIncrement) {
    const input = this.getInput();
    input.stepUp(stepIncrement);
    this.value = input.value;
  }
  /**
   * Reset the text field to its default value.
   */
  reset() {
    this.dirty = false;
    this.valueHasChanged = false;
    this.ignoreNextValueChange = true;
    this.value = this.defaultValue;
    this.nativeError = false;
    this.nativeErrorText = "";
  }
  update(changedProperties) {
    const valueHasChanged = changedProperties.has("value") && changedProperties.get("value") !== void 0;
    if (valueHasChanged && !this.ignoreNextValueChange) {
      this.valueHasChanged = true;
    }
    if (this.ignoreNextValueChange) {
      this.ignoreNextValueChange = false;
    }
    super.update(changedProperties);
  }
  render() {
    const classes = {
      "disabled": this.disabled,
      "error": !this.disabled && this.hasError
    };
    return x`
       <span class="text-field ${o$1(classes)}">
         ${this.renderField()}
       </span>
     `;
  }
  updated(changedProperties) {
    const value = this.getInput().value;
    if (this.value !== value) {
      this.ignoreNextValueChange = true;
      this.value = value;
    }
    if (this.refreshErrorAlert) {
      requestAnimationFrame(() => {
        this.refreshErrorAlert = false;
      });
    }
  }
  renderField() {
    const prefix = this.renderPrefix();
    const suffix = this.renderSuffix();
    const input = this.renderInput();
    return n$1`<${this.fieldTag}
      class="field"
      ?disabled=${this.disabled}
      ?error=${this.hasError}
      ?focused=${this.focused}
      ?hasEnd=${this.hasTrailingIcon}
      ?hasStart=${this.hasLeadingIcon}
      .label=${this.label}
      ?populated=${!!this.getInputValue()}
      ?required=${this.required}
    >
      ${this.renderLeadingIcon()}
      ${prefix}${input}${suffix}
      ${this.renderTrailingIcon()}
      ${this.renderSupportingText()}
      ${this.renderCounter()}
    </${this.fieldTag}>`;
  }
  renderLeadingIcon() {
    return x`
       <span class="icon leading" slot="start">
         <slot name="leadingicon" @slotchange=${this.handleIconChange}></slot>
       </span>
     `;
  }
  renderTrailingIcon() {
    return x`
       <span class="icon trailing" slot="end">
         <slot name="trailingicon" @slotchange=${this.handleIconChange}></slot>
       </span>
     `;
  }
  renderInput() {
    const style = { direction: this.textDirection };
    return x`<input
       style=${o2(style)}
       aria-autocomplete=${this.ariaAutoComplete || A}
       aria-describedby=${this.getAriaDescribedBy() || A}
       aria-expanded=${this.ariaExpanded || A}
       aria-invalid=${this.hasError}
       aria-label=${this.ariaLabel || this.label || A}
       ?disabled=${this.disabled}
       max=${this.max || A}
       maxlength=${this.maxLength > -1 ? this.maxLength : A}
       min=${this.min || A}
       minlength=${this.minLength > -1 ? this.minLength : A}
       pattern=${this.pattern || A}
       placeholder=${this.placeholder || A}
       ?readonly=${this.readOnly}
       ?required=${this.required}
       step=${this.step || A}
       type=${this.type}
       .value=${l(this.getInputValue())}
       @change=${this.redispatchEvent}
       @input=${this.handleInput}
       @select=${this.redispatchEvent}
     >`;
  }
  getInputValue() {
    const alwaysShowValue = this.dirty || this.valueHasChanged;
    if (alwaysShowValue) {
      return this.value;
    }
    return this.defaultValue || this.value;
  }
  getAriaDescribedBy() {
    const ids = [];
    if (this.getSupportingText()) {
      ids.push("support");
    }
    if (this.getCounterText()) {
      ids.push("counter");
    }
    return ids.join(" ");
  }
  renderPrefix() {
    return this.renderAffix(
      this.prefixText,
      /* isSuffix */
      false
    );
  }
  renderSuffix() {
    return this.renderAffix(
      this.suffixText,
      /* isSuffix */
      true
    );
  }
  renderAffix(text, isSuffix) {
    if (!text) {
      return A;
    }
    const classes = {
      "suffix": isSuffix,
      "prefix": !isSuffix
    };
    return x`<span class="${o$1(classes)}">${text}</span>`;
  }
  renderSupportingText() {
    const text = this.getSupportingText();
    if (!text) {
      return A;
    }
    return x`<span id="support"
      slot="supporting-text"
      role=${this.shouldErrorAnnounce() ? "alert" : A}>${text}</span>`;
  }
  getSupportingText() {
    const errorText = this.getErrorText();
    return this.hasError && errorText ? errorText : this.supportingText;
  }
  getErrorText() {
    return this.error ? this.errorText : this.nativeErrorText;
  }
  shouldErrorAnnounce() {
    return this.hasError && !!this.getErrorText() && !this.refreshErrorAlert;
  }
  renderCounter() {
    const text = this.getCounterText();
    if (!text) {
      return A;
    }
    return x`<span id="counter"
       class="counter"
       slot="supporting-text-end">${text}</span>`;
  }
  getCounterText() {
    return this.maxLength > -1 ? `${this.value.length} / ${this.maxLength}` : "";
  }
  handleFocusin() {
    this.focused = true;
  }
  handleFocusout() {
    if (this.matches(":focus-within")) {
      return;
    }
    this.focused = false;
  }
  handleInput(event) {
    this.dirty = true;
    this.value = event.target.value;
    this.redispatchEvent(event);
  }
  redispatchEvent(event) {
    redispatchEvent(this, event);
  }
  getInput() {
    if (!this.input) {
      this.connectedCallback();
      this.scheduleUpdate();
    }
    if (this.isUpdatePending) {
      this.scheduleUpdate();
    }
    return this.input;
  }
  checkValidityAndDispatch() {
    const valid = this.getInput().checkValidity();
    let canceled = false;
    if (!valid) {
      canceled = !this.dispatchEvent(new Event("invalid", { cancelable: true }));
    }
    return { valid, canceled };
  }
  handleIconChange() {
    this.hasLeadingIcon = this.leadingIcons.length > 0;
    this.hasTrailingIcon = this.trailingIcons.length > 0;
  }
}
_a$a = TextField;
(() => {
  requestUpdateOnAriaChange(_a$a);
})();
TextField.shadowRootOptions = { ...s$2.shadowRootOptions, delegatesFocus: true };
__decorate([
  e$9({ type: Boolean, reflect: true })
], TextField.prototype, "disabled", void 0);
__decorate([
  e$9({ type: Boolean, reflect: true })
], TextField.prototype, "error", void 0);
__decorate([
  e$9()
], TextField.prototype, "errorText", void 0);
__decorate([
  e$9()
], TextField.prototype, "label", void 0);
__decorate([
  e$9({ type: Boolean, reflect: true })
], TextField.prototype, "required", void 0);
__decorate([
  e$9()
], TextField.prototype, "value", void 0);
__decorate([
  e$9()
], TextField.prototype, "defaultValue", void 0);
__decorate([
  e$9()
], TextField.prototype, "prefixText", void 0);
__decorate([
  e$9()
], TextField.prototype, "suffixText", void 0);
__decorate([
  e$9({ type: Boolean })
], TextField.prototype, "hasLeadingIcon", void 0);
__decorate([
  e$9({ type: Boolean })
], TextField.prototype, "hasTrailingIcon", void 0);
__decorate([
  e$9()
], TextField.prototype, "supportingText", void 0);
__decorate([
  e$9()
], TextField.prototype, "textDirection", void 0);
__decorate([
  e$9({ reflect: true, converter: stringConverter })
], TextField.prototype, "name", void 0);
__decorate([
  e$9()
], TextField.prototype, "max", void 0);
__decorate([
  e$9({ type: Number })
], TextField.prototype, "maxLength", void 0);
__decorate([
  e$9()
], TextField.prototype, "min", void 0);
__decorate([
  e$9({ type: Number })
], TextField.prototype, "minLength", void 0);
__decorate([
  e$9()
], TextField.prototype, "pattern", void 0);
__decorate([
  e$9({ reflect: true, converter: stringConverter })
], TextField.prototype, "placeholder", void 0);
__decorate([
  e$9({ type: Boolean, reflect: true })
], TextField.prototype, "readOnly", void 0);
__decorate([
  e$9()
], TextField.prototype, "step", void 0);
__decorate([
  e$9({ reflect: true })
], TextField.prototype, "type", void 0);
__decorate([
  t$3()
], TextField.prototype, "dirty", void 0);
__decorate([
  t$3()
], TextField.prototype, "focused", void 0);
__decorate([
  t$3()
], TextField.prototype, "refreshErrorAlert", void 0);
__decorate([
  t$3()
], TextField.prototype, "valueHasChanged", void 0);
__decorate([
  t$3()
], TextField.prototype, "nativeError", void 0);
__decorate([
  t$3()
], TextField.prototype, "nativeErrorText", void 0);
__decorate([
  i$5("input")
], TextField.prototype, "input", void 0);
__decorate([
  l$5({ slot: "leadingicon" })
], TextField.prototype, "leadingIcons", void 0);
__decorate([
  l$5({ slot: "trailingicon" })
], TextField.prototype, "trailingIcons", void 0);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class OutlinedTextField extends TextField {
  constructor() {
    super(...arguments);
    this.fieldTag = i$1`md-outlined-field`;
  }
}
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$m = i$4`:host{display:inline-flex;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.text-field{display:inline-flex;flex:1}.field{cursor:text;flex:1}.disabled .field{cursor:default}.counter{white-space:nowrap}.icon{color:currentColor;display:flex;fill:currentColor}.icon ::slotted(*){display:flex}[hasstart] .icon.leading{font-size:var(--_leading-icon-size);height:var(--_leading-icon-size);width:var(--_leading-icon-size)}[hasend] .icon.trailing{font-size:var(--_trailing-icon-size);height:var(--_trailing-icon-size);width:var(--_trailing-icon-size)}input{appearance:none;background:none;border:none;caret-color:var(--_caret-color);color:currentColor;font:inherit;outline:none;padding:0;text-align:inherit;width:100%}input::placeholder{color:currentColor;opacity:1}input::-webkit-calendar-picker-indicator{display:none}@media(forced-colors: active){input{background-color:Field}}:focus-within input{caret-color:var(--_focus-caret-color)}.error:focus-within input{caret-color:var(--_error-focus-caret-color)}.text-field:not(.disabled) .prefix{color:var(--_input-text-prefix-color)}.text-field:not(.disabled) .suffix{color:var(--_input-text-suffix-color)}.text-field:not(.disabled) input::placeholder{color:var(--_input-text-placeholder-color)}.prefix{padding-inline-end:var(--_input-text-prefix-padding)}.suffix{padding-inline-start:var(--_input-text-suffix-padding)}/*# sourceMappingURL=shared-styles.css.map */
`;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let MdOutlinedTextField = class MdOutlinedTextField2 extends OutlinedTextField {
  constructor() {
    super(...arguments);
    this.fieldTag = i$1`md-outlined-field`;
  }
};
MdOutlinedTextField.styles = [styles$m, styles$n, styles$o];
MdOutlinedTextField = __decorate([
  e$a("md-outlined-text-field")
], MdOutlinedTextField);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class FilledField extends Field {
  renderBackground() {
    return x`
      <div class="background"></div>
      <div class="state-layer"></div>
    `;
  }
  renderIndicator() {
    return x`<div class="active-indicator"></div>`;
  }
}
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$l = i$4`:host{--_container-shape-start-start: var(--md-filled-field-container-shape-start-start, var(--md-filled-field-container-shape, 4px));--_container-shape-start-end: var(--md-filled-field-container-shape-start-end, var(--md-filled-field-container-shape, 4px));--_container-shape-end-end: var(--md-filled-field-container-shape-end-end, var(--md-filled-field-container-shape, 0px));--_container-shape-end-start: var(--md-filled-field-container-shape-end-start, var(--md-filled-field-container-shape, 0px));--_active-indicator-color: var(--md-filled-field-active-indicator-color, var(--md-sys-color-on-surface-variant, #49454f));--_active-indicator-height: var(--md-filled-field-active-indicator-height, 1px);--_container-color: var(--md-filled-field-container-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_container-padding-horizontal: var(--md-filled-field-container-padding-horizontal, 16px);--_container-padding-vertical: var(--md-filled-field-container-padding-vertical, 16px);--_content-color: var(--md-filled-field-content-color, var(--md-sys-color-on-surface, #1d1b20));--_content-type: var(--md-filled-field-content-type, var(--md-sys-typescale-body-large, 400 1rem / 1.5rem var(--md-ref-typeface-plain, Roboto)));--_disabled-active-indicator-color: var(--md-filled-field-disabled-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-active-indicator-height: var(--md-filled-field-disabled-active-indicator-height, 1px);--_disabled-active-indicator-opacity: var(--md-filled-field-disabled-active-indicator-opacity, 0.38);--_disabled-container-color: var(--md-filled-field-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-opacity: var(--md-filled-field-disabled-container-opacity, 0.04);--_disabled-content-color: var(--md-filled-field-disabled-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-content-opacity: var(--md-filled-field-disabled-content-opacity, 0.38);--_disabled-label-text-color: var(--md-filled-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filled-field-disabled-label-text-opacity, 0.38);--_disabled-leading-content-color: var(--md-filled-field-disabled-leading-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-content-opacity: var(--md-filled-field-disabled-leading-content-opacity, 0.38);--_disabled-supporting-text-color: var(--md-filled-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-filled-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-content-color: var(--md-filled-field-disabled-trailing-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-content-opacity: var(--md-filled-field-disabled-trailing-content-opacity, 0.38);--_error-active-indicator-color: var(--md-filled-field-error-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-content-color: var(--md-filled-field-error-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-active-indicator-color: var(--md-filled-field-error-focus-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-focus-content-color: var(--md-filled-field-error-focus-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-label-text-color: var(--md-filled-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-content-color: var(--md-filled-field-error-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-supporting-text-color: var(--md-filled-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-content-color: var(--md-filled-field-error-focus-trailing-content-color, var(--md-sys-color-error, #b3261e));--_error-hover-active-indicator-color: var(--md-filled-field-error-hover-active-indicator-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-content-color: var(--md-filled-field-error-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-filled-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-content-color: var(--md-filled-field-error-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-state-layer-color: var(--md-filled-field-error-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-state-layer-opacity: var(--md-filled-field-error-hover-state-layer-opacity, 0.08);--_error-hover-supporting-text-color: var(--md-filled-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-content-color: var(--md-filled-field-error-hover-trailing-content-color, var(--md-sys-color-on-error-container, #410e0b));--_error-label-text-color: var(--md-filled-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-content-color: var(--md-filled-field-error-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-supporting-text-color: var(--md-filled-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-content-color: var(--md-filled-field-error-trailing-content-color, var(--md-sys-color-error, #b3261e));--_focus-active-indicator-color: var(--md-filled-field-focus-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_focus-active-indicator-height: var(--md-filled-field-focus-active-indicator-height, 2px);--_focus-content-color: var(--md-filled-field-focus-content-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-filled-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-content-color: var(--md-filled-field-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-supporting-text-color: var(--md-filled-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-content-color: var(--md-filled-field-focus-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-active-indicator-color: var(--md-filled-field-hover-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-active-indicator-height: var(--md-filled-field-hover-active-indicator-height, 1px);--_hover-content-color: var(--md-filled-field-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-filled-field-hover-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-leading-content-color: var(--md-filled-field-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-filled-field-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-filled-field-hover-state-layer-opacity, 0.08);--_hover-supporting-text-color: var(--md-filled-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-content-color: var(--md-filled-field-hover-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-color: var(--md-filled-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-populated-line-height: var(--md-filled-field-label-text-populated-line-height, 1rem);--_label-text-populated-size: var(--md-filled-field-label-text-populated-size, 0.75rem);--_label-text-type: var(--md-filled-field-label-text-type, var(--md-sys-typescale-body-large, 400 1rem / 1.5rem var(--md-ref-typeface-plain, Roboto)));--_leading-content-color: var(--md-filled-field-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-color: var(--md-filled-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-padding: var(--md-filled-field-supporting-text-padding, 16px);--_supporting-text-padding-top: var(--md-filled-field-supporting-text-padding-top, 4px);--_supporting-text-type: var(--md-filled-field-supporting-text-type, var(--md-sys-typescale-body-small, 400 0.75rem / 1rem var(--md-ref-typeface-plain, Roboto)));--_trailing-content-color: var(--md-filled-field-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_with-label-container-padding-vertical: var(--md-filled-field-with-label-container-padding-vertical, 8px)}.background,.state-layer{border-radius:inherit;inset:0;pointer-events:none;position:absolute}.background{background:var(--_container-color)}.state-layer{visibility:hidden}.field:not(.disabled):hover .state-layer{visibility:visible}.label.floating{position:absolute;top:0}.active-indicator{inset:auto 0 0 0;pointer-events:none;position:absolute;width:100%}.active-indicator::before,.active-indicator::after{border-bottom:var(--_active-indicator-height) solid var(--_active-indicator-color);inset:auto 0 0 0;content:"";position:absolute;width:100%}.active-indicator::after{opacity:0;transition:opacity 150ms cubic-bezier(0.2, 0, 0, 1)}.focused .active-indicator::after{opacity:1}.field:not(.with-start) .start{padding-inline-start:var(--_container-padding-horizontal)}.field:not(.with-end) .end{padding-inline-end:var(--_container-padding-horizontal)}.field:not(.no-label) .container{padding-bottom:var(--_with-label-container-padding-vertical);padding-top:var(--_with-label-container-padding-vertical)}.field:not(.no-label) .middle{padding-top:var(--_label-text-populated-line-height)}:hover .active-indicator::before{border-bottom-color:var(--_hover-active-indicator-color);border-bottom-width:var(--_hover-active-indicator-height)}.active-indicator::after{border-bottom-color:var(--_focus-active-indicator-color);border-bottom-width:var(--_focus-active-indicator-height)}:hover .state-layer{background:var(--_hover-state-layer-color);opacity:var(--_hover-state-layer-opacity)}.disabled .active-indicator::before{border-bottom-color:var(--_disabled-active-indicator-color);border-bottom-width:var(--_disabled-active-indicator-height);opacity:var(--_disabled-active-indicator-opacity)}.disabled .background{background:var(--_disabled-container-color);opacity:var(--_disabled-container-opacity)}.error .active-indicator::before{border-bottom-color:var(--_error-active-indicator-color)}.error:hover .active-indicator::before{border-bottom-color:var(--_error-hover-active-indicator-color)}.error:hover .state-layer{background:var(--_error-hover-state-layer-color);opacity:var(--_error-hover-state-layer-opacity)}.error .active-indicator::after{border-bottom-color:var(--_error-focus-active-indicator-color)}/*# sourceMappingURL=filled-styles.css.map */
`;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let MdFilledField = class MdFilledField2 extends FilledField {
};
MdFilledField.styles = [styles$p, styles$l];
MdFilledField = __decorate([
  e$a("md-filled-field")
], MdFilledField);
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$k = i$4`@media(forced-colors: active){:host{--md-filled-text-field-disabled-active-indicator-color:GrayText;--md-filled-text-field-disabled-active-indicator-opacity:1;--md-filled-text-field-disabled-input-text-color:GrayText;--md-filled-text-field-disabled-input-text-opacity:1;--md-filled-text-field-disabled-label-text-color:GrayText;--md-filled-text-field-disabled-label-text-opacity:1;--md-filled-text-field-disabled-leading-icon-color:GrayText;--md-filled-text-field-disabled-leading-icon-opacity:1;--md-filled-text-field-disabled-supporting-text-color:GrayText;--md-filled-text-field-disabled-supporting-text-opacity:1;--md-filled-text-field-disabled-trailing-icon-color:GrayText;--md-filled-text-field-disabled-trailing-icon-opacity:1}}/*# sourceMappingURL=filled-forced-colors-styles.css.map */
`;
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$j = i$4`:host{--_container-shape-start-start: var(--md-filled-text-field-container-shape-start-start, var(--md-filled-text-field-container-shape, 4px));--_container-shape-start-end: var(--md-filled-text-field-container-shape-start-end, var(--md-filled-text-field-container-shape, 4px));--_container-shape-end-end: var(--md-filled-text-field-container-shape-end-end, var(--md-filled-text-field-container-shape, 0px));--_container-shape-end-start: var(--md-filled-text-field-container-shape-end-start, var(--md-filled-text-field-container-shape, 0px));--_container-padding-horizontal: var(--md-filled-text-field-container-padding-horizontal, 16px);--_container-padding-vertical: var(--md-filled-text-field-container-padding-vertical, 16px);--_input-text-prefix-padding: var(--md-filled-text-field-input-text-prefix-padding, 2px);--_input-text-suffix-padding: var(--md-filled-text-field-input-text-suffix-padding, 2px);--_with-label-container-padding-vertical: var(--md-filled-text-field-with-label-container-padding-vertical, 8px);--_focus-caret-color: var(--md-filled-text-field-focus-caret-color, var(--md-sys-color-primary, #6750a4));--_active-indicator-color: var(--md-filled-text-field-active-indicator-color, var(--md-sys-color-on-surface-variant, #49454f));--_active-indicator-height: var(--md-filled-text-field-active-indicator-height, 1px);--_caret-color: var(--md-filled-text-field-caret-color, var(--md-sys-color-primary, #6750a4));--_container-color: var(--md-filled-text-field-container-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_disabled-active-indicator-color: var(--md-filled-text-field-disabled-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-active-indicator-height: var(--md-filled-text-field-disabled-active-indicator-height, 1px);--_disabled-active-indicator-opacity: var(--md-filled-text-field-disabled-active-indicator-opacity, 0.38);--_disabled-container-color: var(--md-filled-text-field-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-opacity: var(--md-filled-text-field-disabled-container-opacity, 0.04);--_disabled-input-text-color: var(--md-filled-text-field-disabled-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-input-text-opacity: var(--md-filled-text-field-disabled-input-text-opacity, 0.38);--_disabled-label-text-color: var(--md-filled-text-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filled-text-field-disabled-label-text-opacity, 0.38);--_disabled-leading-icon-color: var(--md-filled-text-field-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-icon-opacity: var(--md-filled-text-field-disabled-leading-icon-opacity, 0.38);--_disabled-supporting-text-color: var(--md-filled-text-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-filled-text-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-icon-color: var(--md-filled-text-field-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-icon-opacity: var(--md-filled-text-field-disabled-trailing-icon-opacity, 0.38);--_error-active-indicator-color: var(--md-filled-text-field-error-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-focus-active-indicator-color: var(--md-filled-text-field-error-focus-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-focus-caret-color: var(--md-filled-text-field-error-focus-caret-color, var(--md-sys-color-error, #b3261e));--_error-focus-input-text-color: var(--md-filled-text-field-error-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-label-text-color: var(--md-filled-text-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-icon-color: var(--md-filled-text-field-error-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-supporting-text-color: var(--md-filled-text-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-icon-color: var(--md-filled-text-field-error-focus-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_error-hover-active-indicator-color: var(--md-filled-text-field-error-hover-active-indicator-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-input-text-color: var(--md-filled-text-field-error-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-filled-text-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-icon-color: var(--md-filled-text-field-error-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-state-layer-color: var(--md-filled-text-field-error-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-state-layer-opacity: var(--md-filled-text-field-error-hover-state-layer-opacity, 0.08);--_error-hover-supporting-text-color: var(--md-filled-text-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-icon-color: var(--md-filled-text-field-error-hover-trailing-icon-color, var(--md-sys-color-on-error-container, #410e0b));--_error-input-text-color: var(--md-filled-text-field-error-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-label-text-color: var(--md-filled-text-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-icon-color: var(--md-filled-text-field-error-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-supporting-text-color: var(--md-filled-text-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-icon-color: var(--md-filled-text-field-error-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_focus-active-indicator-color: var(--md-filled-text-field-focus-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_focus-active-indicator-height: var(--md-filled-text-field-focus-active-indicator-height, 2px);--_focus-input-text-color: var(--md-filled-text-field-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-filled-text-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-icon-color: var(--md-filled-text-field-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-supporting-text-color: var(--md-filled-text-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-icon-color: var(--md-filled-text-field-focus-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-active-indicator-color: var(--md-filled-text-field-hover-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-active-indicator-height: var(--md-filled-text-field-hover-active-indicator-height, 1px);--_hover-input-text-color: var(--md-filled-text-field-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-filled-text-field-hover-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-leading-icon-color: var(--md-filled-text-field-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-filled-text-field-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-filled-text-field-hover-state-layer-opacity, 0.08);--_hover-supporting-text-color: var(--md-filled-text-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-icon-color: var(--md-filled-text-field-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-color: var(--md-filled-text-field-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_input-text-placeholder-color: var(--md-filled-text-field-input-text-placeholder-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-prefix-color: var(--md-filled-text-field-input-text-prefix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-suffix-color: var(--md-filled-text-field-input-text-suffix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-type: var(--md-filled-text-field-input-text-type, var(--md-sys-typescale-body-large, 400 1rem / 1.5rem var(--md-ref-typeface-plain, Roboto)));--_label-text-color: var(--md-filled-text-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-populated-line-height: var(--md-filled-text-field-label-text-populated-line-height, 1rem);--_label-text-populated-size: var(--md-filled-text-field-label-text-populated-size, 0.75rem);--_label-text-type: var(--md-filled-text-field-label-text-type, var(--md-sys-typescale-body-large, 400 1rem / 1.5rem var(--md-ref-typeface-plain, Roboto)));--_leading-icon-color: var(--md-filled-text-field-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-icon-size: var(--md-filled-text-field-leading-icon-size, 24px);--_supporting-text-color: var(--md-filled-text-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-type: var(--md-filled-text-field-supporting-text-type, var(--md-sys-typescale-body-small, 400 0.75rem / 1rem var(--md-ref-typeface-plain, Roboto)));--_trailing-icon-color: var(--md-filled-text-field-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-icon-size: var(--md-filled-text-field-trailing-icon-size, 24px);--md-filled-field-container-shape-start-start:var(--md-filled-field-container-shape, var(--_container-shape-start-start));--md-filled-field-container-shape-start-end:var(--md-filled-field-container-shape, var(--_container-shape-start-end));--md-filled-field-container-shape-end-end:var(--md-filled-field-container-shape, var(--_container-shape-end-end));--md-filled-field-container-shape-end-start:var(--md-filled-field-container-shape, var(--_container-shape-end-start));--md-filled-field-active-indicator-color:var(--_active-indicator-color);--md-filled-field-active-indicator-height:var(--_active-indicator-height);--md-filled-field-container-color:var(--_container-color);--md-filled-field-container-padding-horizontal:var(--_container-padding-horizontal);--md-filled-field-container-padding-vertical:var(--_container-padding-vertical);--md-filled-field-content-color:var(--_input-text-color);--md-filled-field-content-type:var(--_input-text-type);--md-filled-field-disabled-active-indicator-color:var(--_disabled-active-indicator-color);--md-filled-field-disabled-active-indicator-height:var(--_disabled-active-indicator-height);--md-filled-field-disabled-active-indicator-opacity:var(--_disabled-active-indicator-opacity);--md-filled-field-disabled-container-color:var(--_disabled-container-color);--md-filled-field-disabled-container-opacity:var(--_disabled-container-opacity);--md-filled-field-disabled-content-color:var(--_disabled-input-text-color);--md-filled-field-disabled-content-opacity:var(--_disabled-input-text-opacity);--md-filled-field-disabled-label-text-color:var(--_disabled-label-text-color);--md-filled-field-disabled-label-text-opacity:var(--_disabled-label-text-opacity);--md-filled-field-disabled-leading-content-color:var(--_disabled-leading-icon-color);--md-filled-field-disabled-leading-content-opacity:var(--_disabled-leading-icon-opacity);--md-filled-field-disabled-supporting-text-color:var(--_disabled-supporting-text-color);--md-filled-field-disabled-supporting-text-opacity:var(--_disabled-supporting-text-opacity);--md-filled-field-disabled-trailing-content-color:var(--_disabled-trailing-icon-color);--md-filled-field-disabled-trailing-content-opacity:var(--_disabled-trailing-icon-opacity);--md-filled-field-error-active-indicator-color:var(--_error-active-indicator-color);--md-filled-field-error-content-color:var(--_error-input-text-color);--md-filled-field-error-focus-active-indicator-color:var(--_error-focus-active-indicator-color);--md-filled-field-error-focus-content-color:var(--_error-focus-input-text-color);--md-filled-field-error-focus-label-text-color:var(--_error-focus-label-text-color);--md-filled-field-error-focus-leading-content-color:var(--_error-focus-leading-icon-color);--md-filled-field-error-focus-supporting-text-color:var(--_error-focus-supporting-text-color);--md-filled-field-error-focus-trailing-content-color:var(--_error-focus-trailing-icon-color);--md-filled-field-error-hover-active-indicator-color:var(--_error-hover-active-indicator-color);--md-filled-field-error-hover-content-color:var(--_error-hover-input-text-color);--md-filled-field-error-hover-label-text-color:var(--_error-hover-label-text-color);--md-filled-field-error-hover-leading-content-color:var(--_error-hover-leading-icon-color);--md-filled-field-error-hover-state-layer-color:var(--_error-hover-state-layer-color);--md-filled-field-error-hover-state-layer-opacity:var(--_error-hover-state-layer-opacity);--md-filled-field-error-hover-supporting-text-color:var(--_error-hover-supporting-text-color);--md-filled-field-error-hover-trailing-content-color:var(--_error-hover-trailing-icon-color);--md-filled-field-error-label-text-color:var(--_error-label-text-color);--md-filled-field-error-leading-content-color:var(--_error-leading-icon-color);--md-filled-field-error-supporting-text-color:var(--_error-supporting-text-color);--md-filled-field-error-trailing-content-color:var(--_error-trailing-icon-color);--md-filled-field-focus-active-indicator-color:var(--_focus-active-indicator-color);--md-filled-field-focus-active-indicator-height:var(--_focus-active-indicator-height);--md-filled-field-focus-content-color:var(--_focus-input-text-color);--md-filled-field-focus-label-text-color:var(--_focus-label-text-color);--md-filled-field-focus-leading-content-color:var(--_focus-leading-icon-color);--md-filled-field-focus-supporting-text-color:var(--_focus-supporting-text-color);--md-filled-field-focus-trailing-content-color:var(--_focus-trailing-icon-color);--md-filled-field-hover-active-indicator-color:var(--_hover-active-indicator-color);--md-filled-field-hover-active-indicator-height:var(--_hover-active-indicator-height);--md-filled-field-hover-content-color:var(--_hover-input-text-color);--md-filled-field-hover-label-text-color:var(--_hover-label-text-color);--md-filled-field-hover-leading-content-color:var(--_hover-leading-icon-color);--md-filled-field-hover-state-layer-color:var(--_hover-state-layer-color);--md-filled-field-hover-state-layer-opacity:var(--_hover-state-layer-opacity);--md-filled-field-hover-supporting-text-color:var(--_hover-supporting-text-color);--md-filled-field-hover-trailing-content-color:var(--_hover-trailing-icon-color);--md-filled-field-label-text-color:var(--_label-text-color);--md-filled-field-label-text-populated-line-height:var(--_label-text-populated-line-height);--md-filled-field-label-text-populated-size:var(--_label-text-populated-size);--md-filled-field-label-text-type:var(--_label-text-type);--md-filled-field-leading-content-color:var(--_leading-icon-color);--md-filled-field-supporting-text-color:var(--_supporting-text-color);--md-filled-field-supporting-text-type:var(--_supporting-text-type);--md-filled-field-trailing-content-color:var(--_trailing-icon-color);--md-filled-field-with-label-container-padding-vertical:var(--_with-label-container-padding-vertical)}/*# sourceMappingURL=filled-styles.css.map */
`;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class FilledTextField extends TextField {
  constructor() {
    super(...arguments);
    this.fieldTag = i$1`md-filled-field`;
  }
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let MdFilledTextField = class MdFilledTextField2 extends FilledTextField {
  constructor() {
    super(...arguments);
    this.fieldTag = i$1`md-filled-field`;
  }
};
MdFilledTextField.styles = [styles$m, styles$j, styles$k];
MdFilledTextField = __decorate([
  e$a("md-filled-text-field")
], MdFilledTextField);
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
var _a$9;
class NavigationBar extends s$2 {
  constructor() {
    super(...arguments);
    this.activeIndex = 0;
    this.hideInactiveLabels = false;
    this.tabs = [];
  }
  render() {
    const { ariaLabel } = this;
    return x`<div class="md3-navigation-bar"
            role="tablist"
            aria-label=${ariaLabel || A}
            @keydown="${this.handleKeydown}"
            @navigation-tab-interaction="${this.handleNavigationTabInteraction}"
            @navigation-tab-rendered=${this.handleNavigationTabConnected}
          ><md-elevation></md-elevation
          ><div class="md3-navigation-bar__tabs-slot-container"
        ><slot></slot></div></div>`;
  }
  updated(changedProperties) {
    if (changedProperties.has("activeIndex")) {
      this.onActiveIndexChange(this.activeIndex);
      this.dispatchEvent(new CustomEvent("navigation-bar-activated", {
        detail: { tab: this.tabs[this.activeIndex], activeIndex: this.activeIndex },
        bubbles: true,
        composed: true
      }));
    }
    if (changedProperties.has("hideInactiveLabels")) {
      this.onHideInactiveLabelsChange(this.hideInactiveLabels);
    }
    if (changedProperties.has("tabs")) {
      this.onHideInactiveLabelsChange(this.hideInactiveLabels);
      this.onActiveIndexChange(this.activeIndex);
    }
  }
  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    this.layout();
  }
  layout() {
    if (!this.tabsElement)
      return;
    const navTabs = [];
    for (const node of this.tabsElement) {
      navTabs.push(node);
    }
    this.tabs = navTabs;
  }
  handleNavigationTabConnected(event) {
    const target = event.target;
    if (this.tabs.indexOf(target) === -1) {
      this.layout();
    }
  }
  handleNavigationTabInteraction(event) {
    this.activeIndex = this.tabs.indexOf(event.detail.state);
  }
  handleKeydown(event) {
    const key = event.key;
    const focusedTabIndex = this.tabs.findIndex((tab) => {
      return tab.matches(":focus-within");
    });
    const isRTL = isRtl(this);
    const maxIndex = this.tabs.length - 1;
    if (key === "Enter" || key === " ") {
      this.activeIndex = focusedTabIndex;
      return;
    }
    if (key === "Home") {
      this.tabs[0].focus();
      return;
    }
    if (key === "End") {
      this.tabs[maxIndex].focus();
      return;
    }
    const toNextTab = key === "ArrowRight" && !isRTL || key === "ArrowLeft" && isRTL;
    if (toNextTab && focusedTabIndex === maxIndex) {
      this.tabs[0].focus();
      return;
    }
    if (toNextTab) {
      this.tabs[focusedTabIndex + 1].focus();
      return;
    }
    const toPreviousTab = key === "ArrowLeft" && !isRTL || key === "ArrowRight" && isRTL;
    if (toPreviousTab && focusedTabIndex === 0) {
      this.tabs[maxIndex].focus();
      return;
    }
    if (toPreviousTab) {
      this.tabs[focusedTabIndex - 1].focus();
      return;
    }
  }
  onActiveIndexChange(value) {
    if (!this.tabs[value]) {
      throw new Error("NavigationBar: activeIndex is out of bounds.");
    }
    for (let i3 = 0; i3 < this.tabs.length; i3++) {
      this.tabs[i3].active = i3 === value;
    }
  }
  onHideInactiveLabelsChange(value) {
    for (const tab of this.tabs) {
      tab.hideInactiveLabel = value;
    }
  }
}
_a$9 = NavigationBar;
(() => {
  requestUpdateOnAriaChange(_a$9);
})();
__decorate([
  e$9({ type: Number })
], NavigationBar.prototype, "activeIndex", void 0);
__decorate([
  e$9({ type: Boolean })
], NavigationBar.prototype, "hideInactiveLabels", void 0);
__decorate([
  l$5({ flatten: true })
], NavigationBar.prototype, "tabsElement", void 0);
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$i = i$4`:host{--_active-indicator-color: var(--md-navigation-bar-active-indicator-color, var(--md-sys-color-secondary-container, #e8def8));--_active-indicator-height: var(--md-navigation-bar-active-indicator-height, 32px);--_active-indicator-shape: var(--md-navigation-bar-active-indicator-shape, 9999px);--_active-indicator-width: var(--md-navigation-bar-active-indicator-width, 64px);--_active-focus-icon-color: var(--md-navigation-bar-active-focus-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_active-focus-label-text-color: var(--md-navigation-bar-active-focus-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_active-focus-state-layer-color: var(--md-navigation-bar-active-focus-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_active-hover-icon-color: var(--md-navigation-bar-active-hover-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_active-hover-label-text-color: var(--md-navigation-bar-active-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_active-hover-state-layer-color: var(--md-navigation-bar-active-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_active-icon-color: var(--md-navigation-bar-active-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_active-label-text-color: var(--md-navigation-bar-active-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_active-label-text-weight: var(--md-navigation-bar-active-label-text-weight, 700);--_active-pressed-icon-color: var(--md-navigation-bar-active-pressed-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_active-pressed-label-text-color: var(--md-navigation-bar-active-pressed-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_active-pressed-state-layer-color: var(--md-navigation-bar-active-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_container-color: var(--md-navigation-bar-container-color, var(--md-sys-color-surface-container, #f3edf7));--_container-elevation: var(--md-navigation-bar-container-elevation, 2);--_container-height: var(--md-navigation-bar-container-height, 80px);--_container-shape: var(--md-navigation-bar-container-shape, 0px);--_focus-state-layer-opacity: var(--md-navigation-bar-focus-state-layer-opacity, 0.12);--_hover-state-layer-opacity: var(--md-navigation-bar-hover-state-layer-opacity, 0.08);--_icon-size: var(--md-navigation-bar-icon-size, 24px);--_inactive-focus-icon-color: var(--md-navigation-bar-inactive-focus-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_inactive-focus-label-text-color: var(--md-navigation-bar-inactive-focus-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_inactive-focus-state-layer-color: var(--md-navigation-bar-inactive-focus-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_inactive-hover-icon-color: var(--md-navigation-bar-inactive-hover-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_inactive-hover-label-text-color: var(--md-navigation-bar-inactive-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_inactive-hover-state-layer-color: var(--md-navigation-bar-inactive-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_inactive-icon-color: var(--md-navigation-bar-inactive-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_inactive-label-text-color: var(--md-navigation-bar-inactive-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_inactive-pressed-icon-color: var(--md-navigation-bar-inactive-pressed-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_inactive-pressed-label-text-color: var(--md-navigation-bar-inactive-pressed-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_inactive-pressed-state-layer-color: var(--md-navigation-bar-inactive-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_label-text-font: var(--md-navigation-bar-label-text-font, var(--md-ref-typeface-plain, Roboto));--_label-text-line-height: var(--md-navigation-bar-label-text-line-height, 1rem);--_label-text-size: var(--md-navigation-bar-label-text-size, 0.75rem);--_label-text-tracking: var(--md-navigation-bar-label-text-tracking, 0.031rem);--_label-text-type: var(--md-navigation-bar-label-text-type, 500 0.75rem / 1rem var(--md-ref-typeface-plain, Roboto));--_label-text-weight: var(--md-navigation-bar-label-text-weight, 500);--_pressed-state-layer-opacity: var(--md-navigation-bar-pressed-state-layer-opacity, 0.12);--md-elevation-level:var(--_container-elevation);--md-elevation-shadow-color:var(--_container-shadow-color);width:100%}.md3-navigation-bar{display:flex;position:relative;width:100%;background-color:var(--_container-color);border-radius:var(--_container-shape);height:var(--_container-height)}.md3-navigation-bar .md3-navigation-bar__tabs-slot-container{display:inherit;width:inherit}md-elevation{transition-duration:280ms;z-index:0}/*# sourceMappingURL=navigation-bar-styles.css.map */
`;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let MdNavigationBar = class MdNavigationBar2 extends NavigationBar {
};
MdNavigationBar.styles = [styles$i];
MdNavigationBar = __decorate([
  e$a("md-navigation-bar")
], MdNavigationBar);
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class Badge extends s$2 {
  constructor() {
    super(...arguments);
    this.value = "";
  }
  render() {
    return x`<div class="md3-badge ${o$1(this.getRenderClasses())}"><p class="md3-badge__value">${this.value}</p></div>`;
  }
  getRenderClasses() {
    return {
      "md3-badge--large": this.value
    };
  }
}
__decorate([
  e$9()
], Badge.prototype, "value", void 0);
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$h = i$4`:host{--_color: var(--md-badge-color, var(--md-sys-color-error, #b3261e));--_large-color: var(--md-badge-large-color, var(--md-sys-color-error, #b3261e));--_large-label-text-color: var(--md-badge-large-label-text-color, var(--md-sys-color-on-error, #fff));--_large-label-text-type: var(--md-badge-large-label-text-type, var(--md-sys-typescale-label-small, 500 0.688rem / 1rem var(--md-ref-typeface-plain, Roboto)));--_large-shape: var(--md-badge-large-shape, 9999px);--_large-size: var(--md-badge-large-size, 16px);--_shape: var(--md-badge-shape, 9999px);--_size: var(--md-badge-size, 6px)}.md3-badge{inset-inline-start:50%;margin-inline-start:6px;margin-block-start:4px;position:absolute;inset-block-start:0px;background-color:var(--_color);border-radius:var(--_shape);height:var(--_size)}.md3-badge:not(.md3-badge--large){width:var(--_size)}.md3-badge.md3-badge--large{display:flex;flex-direction:column;justify-content:center;margin-inline-start:2px;margin-block-start:1px;background-color:var(--_large-color);border-radius:var(--_large-shape);height:var(--_large-size);min-width:var(--_large-size);color:var(--_large-label-text-color)}.md3-badge.md3-badge--large .md3-badge__value{padding:0px 4px}.md3-badge__value{font:var(--_large-label-text-type)}/*# sourceMappingURL=badge-styles.css.map */
`;
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let MdBadge = class MdBadge2 extends Badge {
};
MdBadge.styles = [styles$h];
MdBadge = __decorate([
  e$a("md-badge")
], MdBadge);
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
var _a$8;
class NavigationTab extends s$2 {
  constructor() {
    super(...arguments);
    this.disabled = false;
    this.active = false;
    this.hideInactiveLabel = false;
    this.badgeValue = "";
    this.showBadge = false;
    this.showFocusRing = false;
    this.showRipple = false;
    this.getRipple = () => {
      this.showRipple = true;
      return this.ripple;
    };
    this.renderRipple = () => {
      return x`<md-ripple ?disabled="${this.disabled}" class="md3-navigation-tab__ripple"></md-ripple>`;
    };
  }
  render() {
    const { ariaLabel } = this;
    return x`
      <button
        class="md3-navigation-tab ${o$1(this.getRenderClasses())}"
        role="tab"
        aria-selected="${this.active}"
        aria-label=${ariaLabel || A}
        tabindex="${this.active ? 0 : -1}"
        @focus="${this.handleFocus}"
        @blur="${this.handleBlur}"
        @pointerdown="${this.handlePointerDown}"
        @click="${this.handleClick}"
      ${ripple(this.getRipple)}>${this.renderFocusRing()}${n$2(this.showRipple, this.renderRipple)}
        <span aria-hidden="true" class="md3-navigation-tab__icon-content"
          ><span class="md3-navigation-tab__active-indicator"
            ></span><span class="md3-navigation-tab__icon"
          ><slot name="inactiveIcon"></slot
        ></span>
        <span class="md3-navigation-tab__icon md3-navigation-tab__icon--active"
          ><slot name="activeIcon"></slot
        ></span>${this.renderBadge()}</span
        >${this.renderLabel()}
      </button>`;
  }
  getRenderClasses() {
    return {
      "md3-navigation-tab--hide-inactive-label": this.hideInactiveLabel,
      "md3-navigation-tab--active": this.active
    };
  }
  renderFocusRing() {
    return x`<md-focus-ring .visible="${this.showFocusRing}"></md-focus-ring>`;
  }
  renderBadge() {
    return this.showBadge ? x`<md-badge .value="${this.badgeValue}"></md-badge>` : A;
  }
  renderLabel() {
    const { ariaLabel } = this;
    const ariaHidden = ariaLabel ? "true" : "false";
    return !this.label ? A : x`
        <span aria-hidden="${ariaHidden}" class="md3-navigation-tab__label-text">${this.label}</span>`;
  }
  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    const event = new Event("navigation-tab-rendered", { bubbles: true, composed: true });
    this.dispatchEvent(event);
  }
  focus() {
    const buttonElement = this.buttonElement;
    if (buttonElement) {
      buttonElement.focus();
    }
  }
  blur() {
    const buttonElement = this.buttonElement;
    if (buttonElement) {
      buttonElement.blur();
    }
  }
  handleClick() {
    this.dispatchEvent(new CustomEvent("navigation-tab-interaction", { detail: { state: this }, bubbles: true, composed: true }));
  }
  handlePointerDown(e2) {
    pointerPress();
    this.showFocusRing = shouldShowStrongFocus();
  }
  handleFocus() {
    this.showFocusRing = shouldShowStrongFocus();
  }
  handleBlur() {
    this.showFocusRing = false;
  }
}
_a$8 = NavigationTab;
(() => {
  requestUpdateOnAriaChange(_a$8);
})();
__decorate([
  e$9({ type: Boolean })
], NavigationTab.prototype, "disabled", void 0);
__decorate([
  e$9({ type: Boolean, reflect: true })
], NavigationTab.prototype, "active", void 0);
__decorate([
  e$9({ type: Boolean })
], NavigationTab.prototype, "hideInactiveLabel", void 0);
__decorate([
  e$9()
], NavigationTab.prototype, "label", void 0);
__decorate([
  e$9()
], NavigationTab.prototype, "badgeValue", void 0);
__decorate([
  e$9({ type: Boolean })
], NavigationTab.prototype, "showBadge", void 0);
__decorate([
  t$3()
], NavigationTab.prototype, "showFocusRing", void 0);
__decorate([
  t$3()
], NavigationTab.prototype, "showRipple", void 0);
__decorate([
  i$5("button")
], NavigationTab.prototype, "buttonElement", void 0);
__decorate([
  e$7("md-ripple")
], NavigationTab.prototype, "ripple", void 0);
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$g = i$4`:host{--_active-indicator-color: var(--md-navigation-bar-active-indicator-color, var(--md-sys-color-secondary-container, #e8def8));--_active-indicator-height: var(--md-navigation-bar-active-indicator-height, 32px);--_active-indicator-shape: var(--md-navigation-bar-active-indicator-shape, 9999px);--_active-indicator-width: var(--md-navigation-bar-active-indicator-width, 64px);--_active-focus-icon-color: var(--md-navigation-bar-active-focus-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_active-focus-label-text-color: var(--md-navigation-bar-active-focus-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_active-focus-state-layer-color: var(--md-navigation-bar-active-focus-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_active-hover-icon-color: var(--md-navigation-bar-active-hover-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_active-hover-label-text-color: var(--md-navigation-bar-active-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_active-hover-state-layer-color: var(--md-navigation-bar-active-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_active-icon-color: var(--md-navigation-bar-active-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_active-label-text-color: var(--md-navigation-bar-active-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_active-label-text-weight: var(--md-navigation-bar-active-label-text-weight, 700);--_active-pressed-icon-color: var(--md-navigation-bar-active-pressed-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_active-pressed-label-text-color: var(--md-navigation-bar-active-pressed-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_active-pressed-state-layer-color: var(--md-navigation-bar-active-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_container-color: var(--md-navigation-bar-container-color, var(--md-sys-color-surface-container, #f3edf7));--_container-elevation: var(--md-navigation-bar-container-elevation, 2);--_container-height: var(--md-navigation-bar-container-height, 80px);--_container-shape: var(--md-navigation-bar-container-shape, 0px);--_focus-state-layer-opacity: var(--md-navigation-bar-focus-state-layer-opacity, 0.12);--_hover-state-layer-opacity: var(--md-navigation-bar-hover-state-layer-opacity, 0.08);--_icon-size: var(--md-navigation-bar-icon-size, 24px);--_inactive-focus-icon-color: var(--md-navigation-bar-inactive-focus-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_inactive-focus-label-text-color: var(--md-navigation-bar-inactive-focus-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_inactive-focus-state-layer-color: var(--md-navigation-bar-inactive-focus-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_inactive-hover-icon-color: var(--md-navigation-bar-inactive-hover-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_inactive-hover-label-text-color: var(--md-navigation-bar-inactive-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_inactive-hover-state-layer-color: var(--md-navigation-bar-inactive-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_inactive-icon-color: var(--md-navigation-bar-inactive-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_inactive-label-text-color: var(--md-navigation-bar-inactive-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_inactive-pressed-icon-color: var(--md-navigation-bar-inactive-pressed-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_inactive-pressed-label-text-color: var(--md-navigation-bar-inactive-pressed-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_inactive-pressed-state-layer-color: var(--md-navigation-bar-inactive-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_label-text-font: var(--md-navigation-bar-label-text-font, var(--md-ref-typeface-plain, Roboto));--_label-text-line-height: var(--md-navigation-bar-label-text-line-height, 1rem);--_label-text-size: var(--md-navigation-bar-label-text-size, 0.75rem);--_label-text-tracking: var(--md-navigation-bar-label-text-tracking, 0.031rem);--_label-text-type: var(--md-navigation-bar-label-text-type, 500 0.75rem / 1rem var(--md-ref-typeface-plain, Roboto));--_label-text-weight: var(--md-navigation-bar-label-text-weight, 500);--_pressed-state-layer-opacity: var(--md-navigation-bar-pressed-state-layer-opacity, 0.12);--md-focus-ring-shape-start-start:var(--md-focus-ring-shape, 8px);--md-focus-ring-shape-start-end:var(--md-focus-ring-shape, 8px);--md-focus-ring-shape-end-end:var(--md-focus-ring-shape, 8px);--md-focus-ring-shape-end-start:var(--md-focus-ring-shape, 8px);--md-focus-ring-offset:-2px;display:flex;flex-grow:1}.md3-navigation-tab{align-items:center;appearance:none;background:none;border:none;box-sizing:border-box;cursor:pointer;display:flex;flex-direction:column;height:100%;justify-content:center;min-height:48px;min-width:48px;outline:none;padding:8px 0px 12px;position:relative;text-align:center;width:100%;font:var(--_label-text-type)}.md3-navigation-tab::-moz-focus-inner{border:0;padding:0}.md3-navigation-tab__icon-content{align-items:center;box-sizing:border-box;display:flex;justify-content:center;position:relative;z-index:1}.md3-navigation-tab__label-text{height:16px;margin-top:4px;opacity:1;transition:opacity 100ms cubic-bezier(0.4, 0, 0.2, 1),height 100ms cubic-bezier(0.4, 0, 0.2, 1);z-index:1}.md3-navigation-tab--hide-inactive-label:not(.md3-navigation-tab--active) .md3-navigation-tab__label-text{height:0;opacity:0}.md3-navigation-tab__active-indicator{display:flex;justify-content:center;opacity:0;position:absolute;transition:width 100ms cubic-bezier(0.4, 0, 0.2, 1),opacity 100ms cubic-bezier(0.4, 0, 0.2, 1);width:32px;background-color:var(--_active-indicator-color);border-radius:var(--_active-indicator-shape)}.md3-navigation-tab--active .md3-navigation-tab__active-indicator{opacity:1}.md3-navigation-tab__active-indicator,.md3-navigation-tab__icon-content{height:var(--_active-indicator-height)}.md3-navigation-tab--active .md3-navigation-tab__active-indicator,.md3-navigation-tab__icon-content{width:var(--_active-indicator-width)}.md3-navigation-tab__icon{fill:currentColor;align-self:center;display:inline-block;position:relative;width:var(--_icon-size);height:var(--_icon-size);font-size:var(--_icon-size)}.md3-navigation-tab__icon.md3-navigation-tab__icon--active{display:none}.md3-navigation-tab--active .md3-navigation-tab__icon{display:none}.md3-navigation-tab--active .md3-navigation-tab__icon.md3-navigation-tab__icon--active{display:inline-block}.md3-navigation-tab__ripple{z-index:0}.md3-navigation-tab--active{--md-ripple-hover-color:var(--_active-hover-state-layer-color);--md-ripple-focus-color:var(--_active-focus-state-layer-color);--md-ripple-pressed-color:var(--_active-pressed-state-layer-color);--md-ripple-hover-opacity:var(--_hover-state-layer-opacity);--md-ripple-focus-opacity:var(--_focus-state-layer-opacity);--md-ripple-pressed-opacity:var(--_pressed-state-layer-opacity)}.md3-navigation-tab--active .md3-navigation-tab__icon{color:var(--_active-icon-color)}.md3-navigation-tab--active .md3-navigation-tab__label-text{color:var(--_active-label-text-color)}.md3-navigation-tab--active:hover .md3-navigation-tab__icon{color:var(--_active-hover-icon-color)}.md3-navigation-tab--active:hover .md3-navigation-tab__label-text{color:var(--_active-hover-label-text-color)}.md3-navigation-tab--active:focus .md3-navigation-tab__icon{color:var(--_active-focus-icon-color)}.md3-navigation-tab--active:focus .md3-navigation-tab__label-text{color:var(--_active-focus-label-text-color)}.md3-navigation-tab--active:active .md3-navigation-tab__icon{color:var(--_active-pressed-icon-color)}.md3-navigation-tab--active:active .md3-navigation-tab__label-text{color:var(--_active-pressed-label-text-color)}.md3-navigation-tab:not(.md3-navigation-tab--active){--md-ripple-hover-color:var(--_inactive-hover-state-layer-color);--md-ripple-focus-color:var(--_inactive-focus-state-layer-color);--md-ripple-pressed-color:var(--_inactive-pressed-state-layer-color);--md-ripple-hover-opacity:var(--_hover-state-layer-opacity);--md-ripple-focus-opacity:var(--_focus-state-layer-opacity);--md-ripple-pressed-opacity:var(--_pressed-state-layer-opacity)}.md3-navigation-tab:not(.md3-navigation-tab--active) .md3-navigation-tab__icon{color:var(--_inactive-icon-color)}.md3-navigation-tab:not(.md3-navigation-tab--active) .md3-navigation-tab__label-text{color:var(--_inactive-label-text-color)}.md3-navigation-tab:not(.md3-navigation-tab--active):hover .md3-navigation-tab__icon{color:var(--_inactive-hover-icon-color)}.md3-navigation-tab:not(.md3-navigation-tab--active):hover .md3-navigation-tab__label-text{color:var(--_inactive-hover-label-text-color)}.md3-navigation-tab:not(.md3-navigation-tab--active):focus .md3-navigation-tab__icon{color:var(--_inactive-focus-icon-color)}.md3-navigation-tab:not(.md3-navigation-tab--active):focus .md3-navigation-tab__label-text{color:var(--_inactive-focus-label-text-color)}.md3-navigation-tab:not(.md3-navigation-tab--active):active .md3-navigation-tab__icon{color:var(--_inactive-pressed-icon-color)}.md3-navigation-tab:not(.md3-navigation-tab--active):active .md3-navigation-tab__label-text{color:var(--_inactive-pressed-label-text-color)}/*# sourceMappingURL=navigation-tab-styles.css.map */
`;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let MdNavigationTab = class MdNavigationTab2 extends NavigationTab {
};
MdNavigationTab.styles = [styles$g];
MdNavigationTab = __decorate([
  e$a("md-navigation-tab")
], MdNavigationTab);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
var _a$7;
class NavigationDrawer extends s$2 {
  constructor() {
    super(...arguments);
    this.opened = false;
    this.pivot = "end";
  }
  render() {
    const ariaExpanded = this.opened ? "true" : "false";
    const ariaHidden = !this.opened ? "true" : "false";
    const { ariaLabel, ariaModal } = this;
    return x`
      <div
        aria-expanded="${ariaExpanded}"
        aria-hidden="${ariaHidden}"
        aria-label=${ariaLabel || A}
        aria-modal="${ariaModal || A}"
        class="md3-navigation-drawer ${this.getRenderClasses()}"
        role="dialog">
        <md-elevation></md-elevation>
        <div class="md3-navigation-drawer__slot-content">
          <slot></slot>
        </div>
      </div>
    `;
  }
  getRenderClasses() {
    return o$1({
      "md3-navigation-drawer--opened": this.opened,
      "md3-navigation-drawer--pivot-at-start": this.pivot === "start"
    });
  }
  updated(changedProperties) {
    if (changedProperties.has("opened")) {
      setTimeout(() => {
        this.dispatchEvent(new CustomEvent("navigation-drawer-changed", { detail: { opened: this.opened }, bubbles: true, composed: true }));
      }, 250);
    }
  }
}
_a$7 = NavigationDrawer;
(() => {
  requestUpdateOnAriaChange(_a$7);
})();
__decorate([
  e$9({ type: Boolean })
], NavigationDrawer.prototype, "opened", void 0);
__decorate([
  e$9()
], NavigationDrawer.prototype, "pivot", void 0);
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$f = i$4`:host{--_container-shape-start-start: var(--md-navigation-drawer-container-shape-start-start, var(--md-navigation-drawer-container-shape, 0));--_container-shape-start-end: var(--md-navigation-drawer-container-shape-start-end, var(--md-navigation-drawer-container-shape, 16px));--_container-shape-end-end: var(--md-navigation-drawer-container-shape-end-end, var(--md-navigation-drawer-container-shape, 16px));--_container-shape-end-start: var(--md-navigation-drawer-container-shape-end-start, var(--md-navigation-drawer-container-shape, 0));--_container-color: var(--md-navigation-drawer-container-color, #fff);--_container-height: var(--md-navigation-drawer-container-height, 100%);--_container-width: var(--md-navigation-drawer-container-width, 360px);--_divider-color: var(--md-navigation-drawer-divider-color, #000);--_modal-container-elevation: var(--md-navigation-drawer-modal-container-elevation, 1);--_standard-container-elevation: var(--md-navigation-drawer-standard-container-elevation, 0);--md-elevation-level:var(--_standard-container-elevation);--md-elevation-shadow-color:var(--_divider-color)}:host{display:flex}.md3-navigation-drawer{inline-size:0;box-sizing:border-box;display:flex;justify-content:flex-end;overflow:hidden;overflow-y:auto;visibility:hidden;transition:inline-size .25s cubic-bezier(0.4, 0, 0.2, 1) 0s,visibility 0s cubic-bezier(0.4, 0, 0.2, 1) .25s}md-elevation{z-index:0}.md3-navigation-drawer--opened{visibility:visible;transition:inline-size .25s cubic-bezier(0.4, 0, 0.2, 1) 0s,visibility 0s cubic-bezier(0.4, 0, 0.2, 1) 0s}.md3-navigation-drawer--pivot-at-start{justify-content:flex-start}.md3-navigation-drawer__slot-content{display:flex;flex-direction:column;position:relative}/*# sourceMappingURL=navigation-drawer-styles.css.map */
`;
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$e = i$4`.md3-navigation-drawer-modal{background-color:var(--_container-color);border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-end-radius:var(--_container-shape-end-end);border-end-start-radius:var(--_container-shape-end-start);height:var(--_container-height)}.md3-navigation-drawer-modal.md3-navigation-drawer-modal--opened{inline-size:var(--_container-width)}.md3-navigation-drawer-modal .md3-navigation-drawer-modal__slot-content{min-inline-size:var(--_container-width);max-inline-size:var(--_container-width)}/*# sourceMappingURL=shared-styles.css.map */
`;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let MdNavigationDrawer = class MdNavigationDrawer2 extends NavigationDrawer {
};
MdNavigationDrawer.styles = [styles$e, styles$f];
MdNavigationDrawer = __decorate([
  e$a("md-navigation-drawer")
], MdNavigationDrawer);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
var _a$6;
class NavigationDrawerModal extends s$2 {
  constructor() {
    super(...arguments);
    this.opened = false;
    this.pivot = "end";
  }
  render() {
    const ariaExpanded = this.opened ? "true" : "false";
    const ariaHidden = !this.opened ? "true" : "false";
    const { ariaLabel, ariaModal } = this;
    return x`
      <div
        class="md3-navigation-drawer-modal__scrim ${this.getScrimClasses()}"
        @click="${this.handleScrimClick}">
      </div>
      <div
        aria-expanded=${ariaExpanded}
        aria-hidden=${ariaHidden}
        aria-label=${ariaLabel || A}
        aria-modal=${ariaModal || A}
        class="md3-navigation-drawer-modal ${this.getRenderClasses()}"
        @keydown="${this.handleKeyDown}"
        role="dialog"><div class="md3-elevation-overlay"
        ></div>
        <div class="md3-navigation-drawer-modal__slot-content">
          <slot></slot>
        </div>
      </div>
    `;
  }
  getScrimClasses() {
    return o$1({
      "md3-navigation-drawer-modal--scrim-visible": this.opened
    });
  }
  getRenderClasses() {
    return o$1({
      "md3-navigation-drawer-modal--opened": this.opened,
      "md3-navigation-drawer-modal--pivot-at-start": this.pivot === "start"
    });
  }
  updated(changedProperties) {
    if (changedProperties.has("opened")) {
      setTimeout(() => {
        this.dispatchEvent(new CustomEvent("navigation-drawer-changed", { detail: { opened: this.opened }, bubbles: true, composed: true }));
      }, 250);
    }
  }
  handleKeyDown(e2) {
    if (e2.code === "Escape") {
      this.opened = false;
    }
  }
  handleScrimClick() {
    this.opened = !this.opened;
  }
}
_a$6 = NavigationDrawerModal;
(() => {
  requestUpdateOnAriaChange(_a$6);
})();
__decorate([
  e$9({ type: Boolean })
], NavigationDrawerModal.prototype, "opened", void 0);
__decorate([
  e$9()
], NavigationDrawerModal.prototype, "pivot", void 0);
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$d = i$4`:host{--_container-shape-start-start: var(--md-navigation-drawer-modal-container-shape-start-start, var(--md-navigation-drawer-modal-container-shape, 0));--_container-shape-start-end: var(--md-navigation-drawer-modal-container-shape-start-end, var(--md-navigation-drawer-modal-container-shape, 16px));--_container-shape-end-end: var(--md-navigation-drawer-modal-container-shape-end-end, var(--md-navigation-drawer-modal-container-shape, 16px));--_container-shape-end-start: var(--md-navigation-drawer-modal-container-shape-end-start, var(--md-navigation-drawer-modal-container-shape, 0));--_container-color: var(--md-navigation-drawer-modal-container-color, #fff);--_container-height: var(--md-navigation-drawer-modal-container-height, 100%);--_container-width: var(--md-navigation-drawer-modal-container-width, 360px);--_divider-color: var(--md-navigation-drawer-modal-divider-color, #000);--_modal-container-elevation: var(--md-navigation-drawer-modal-modal-container-elevation, 1);--_scrim-color: ;--_scrim-opacity: var(--md-navigation-drawer-modal-scrim-opacity, 0.04);--_standard-container-elevation: var(--md-navigation-drawer-modal-standard-container-elevation, 0);--md-elevation-level:var(--_modal-container-elevation)}.md3-navigation-drawer-modal{bottom:0;box-sizing:border-box;display:flex;justify-content:flex-end;overflow:hidden;position:absolute;top:0;inline-size:0;transition:inline-size .25s cubic-bezier(0.4, 0, 0.2, 1) 0s,visibility 0s cubic-bezier(0.4, 0, 0.2, 1) .25s}.md3-navigation-drawer-modal--opened{transition:inline-size .25s cubic-bezier(0.4, 0, 0.2, 1) 0s,visibility 0s cubic-bezier(0.4, 0, 0.2, 1) 0s}.md3-navigation-drawer-modal--pivot-at-start{justify-content:flex-start}.md3-navigation-drawer-modal__slot-content{display:flex;flex-direction:column;position:relative}.md3-navigation-drawer-modal__scrim{inset:0;opacity:0;position:absolute;visibility:hidden;background-color:var(--_scrim-color);transition:opacity .25s cubic-bezier(0.4, 0, 0.2, 1) 0s,visibility 0s cubic-bezier(0.4, 0, 0.2, 1) .25s}.md3-navigation-drawer-modal--scrim-visible{visibility:visible;opacity:var(--_scrim-opacity);transition:opacity .25s cubic-bezier(0.4, 0, 0.2, 1) 0s,visibility 0s cubic-bezier(0.4, 0, 0.2, 1) 0s}/*# sourceMappingURL=navigation-drawer-modal-styles.css.map */
`;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let MdNavigationDrawerModal = class MdNavigationDrawerModal2 extends NavigationDrawerModal {
};
MdNavigationDrawerModal.styles = [styles$e, styles$d];
MdNavigationDrawerModal = __decorate([
  e$a("md-navigation-drawer-modal")
], MdNavigationDrawerModal);
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const CLOSE_ACTION = "close";
const OPENING_TRANSITION_PROP = "--_opening-transition-duration";
const CLOSING_TRANSITION_PROP = "--_closing-transition-duration";
class Dialog extends s$2 {
  constructor() {
    super(...arguments);
    this.open = false;
    this.fullscreen = false;
    this.fullscreenBreakpoint = "(max-width: 600px), (max-height: 400px)";
    this.footerHidden = false;
    this.stacked = false;
    this.defaultAction = CLOSE_ACTION;
    this.actionAttribute = "dialogAction";
    this.focusAttribute = "dialogFocus";
    this.scrimClickAction = CLOSE_ACTION;
    this.escapeKeyAction = CLOSE_ACTION;
    this.modeless = false;
    this.draggable = false;
    this.throttle = createThrottle();
    this.showingFullscreen = false;
    this.showingOpen = false;
    this.opening = false;
    this.closing = false;
    this.transition = "grow-down";
    this.dragging = false;
    this.dragMargin = 8;
    this.fullscreenQueryListener = void 0;
  }
  static setDocumentScrollingDisabled(disabled = false) {
    let { preventedScrollingCount, scrollbarTester } = Dialog;
    Dialog.preventedScrollingCount = preventedScrollingCount = Math.max(preventedScrollingCount + (Number(disabled) || -1), 0);
    const shouldPrevent = Boolean(preventedScrollingCount);
    const { style } = document.body;
    if (shouldPrevent && style.overflow === "hidden") {
      return;
    }
    if (scrollbarTester === void 0) {
      Dialog.scrollbarTester = scrollbarTester = document.createElement("div");
      scrollbarTester.style.cssText = `position: absolute; height: 0; width: 100%; visibility: hidden; pointer-events: none;`;
    }
    document.body.append(scrollbarTester);
    const { offsetWidth } = scrollbarTester;
    style.overflow = shouldPrevent ? "hidden" : "";
    const scrollbarWidth = scrollbarTester.offsetWidth - offsetWidth;
    scrollbarTester.remove();
    style.paddingInlineEnd = shouldPrevent ? `${scrollbarWidth}px` : "";
  }
  /**
   * Opens and shows the dialog. This is equivalent to setting the `open`
   * property to true.
   */
  show() {
    this.open = true;
  }
  /**
   * Closes the dialog. This is equivalent to setting the `open`
   * property to false.
   */
  close(action = "") {
    this.currentAction = action;
    this.open = false;
  }
  /**
   * Opens and shows the dialog if it is closed; otherwise closes it.
   */
  toggleShow() {
    if (this.open) {
      this.close(this.currentAction);
    } else {
      this.show();
    }
  }
  getContentScrollInfo() {
    if (!this.hasUpdated) {
      return { isScrollable: false, isAtScrollTop: true, isAtScrollBottom: true };
    }
    const { scrollTop, scrollHeight, offsetHeight, clientHeight } = this.contentElement;
    return {
      isScrollable: scrollHeight > offsetHeight,
      isAtScrollTop: scrollTop === 0,
      isAtScrollBottom: Math.abs(Math.round(scrollHeight - scrollTop) - clientHeight) <= 2
    };
  }
  render() {
    const { isScrollable, isAtScrollTop, isAtScrollBottom } = this.getContentScrollInfo();
    return x`
    <dialog
      @close=${this.handleDialogDismiss}
      @cancel=${this.handleDialogDismiss}
      @click=${this.handleDialogClick}
      class="dialog ${o$1({
      "stacked": this.stacked,
      "scrollable": isScrollable,
      "scroll-divider-header": !isAtScrollTop,
      "scroll-divider-footer": !isAtScrollBottom,
      "footerHidden": this.footerHidden
    })}"
      aria-labelledby="header"
      aria-describedby="content"
    >
      <div class="container ${o$1({
      "dragging": this.dragging
    })}"
        @pointermove=${this.handlePointerMove}
        @pointerup=${this.handleDragEnd}
      >
        <md-elevation></md-elevation>
        <header class="header">
          <slot name="header">
            <slot name="headline-prefix"></slot>
            <slot name="headline"></slot>
            <slot name="headline-suffix"></slot>
          </slot>
        </header>
        <section class="content" @scroll=${this.handleContentScroll}>
          <slot></slot>
        </section>
        <footer class="footer">
          <slot name="footer"></slot>
        </footer>
      </div>
    </dialog>`;
  }
  willUpdate(changed) {
    if (changed.has("open")) {
      this.opening = this.open;
      this.closing = !this.open && changed.get("open");
    }
    if (changed.has("fullscreen") || changed.has("fullscreenBreakpoint")) {
      this.updateFullscreen();
    }
  }
  firstUpdated() {
    new ResizeObserver(() => {
      if (this.showingOpen) {
        this.requestUpdate();
      }
    }).observe(this.contentElement);
  }
  updated(changed) {
    if (changed.get("draggable") && !this.draggable) {
      this.style.removeProperty("--_container-drag-inline-start");
      this.style.removeProperty("--_container-drag-block-start");
    }
    this.reflectStateProp(changed, "opening", this.opening);
    this.reflectStateProp(changed, "closing", this.closing);
    this.reflectStateProp(changed, "showingFullscreen", this.showingFullscreen, "showing-fullscreen");
    this.reflectStateProp(changed, "showingOpen", this.showingOpen, "showing-open");
    if (!changed.has("open")) {
      return;
    }
    if (!this.modeless && this.open) {
      Dialog.setDocumentScrollingDisabled(this.open);
    }
    if (this.open) {
      this.contentElement.scrollTop = 0;
      if (this.modeless) {
        this.dialogElement.show();
      } else {
        this.dialogElement.showModal();
      }
    }
    const shouldDispatchAction = changed.get("open") !== void 0;
    this.performTransition(shouldDispatchAction);
  }
  /**
   * Internal state is reflected here as attributes to effect styling. This
   * could be done via internal classes, but it's published on the host
   * to facilitate the (currently undocumented) possibility of customizing
   * styling of user content based on these states.
   * Note, in the future this could be done with `:state(...)` when browser
   * support improves.
   */
  reflectStateProp(changed, key, value, attribute) {
    attribute ?? (attribute = key);
    if (!changed.has(key)) {
      return;
    }
    if (value) {
      this.setAttribute(attribute, "");
    } else {
      this.removeAttribute(attribute);
    }
  }
  async performTransition(shouldDispatchAction) {
    await this.updateComplete;
    this.showingOpen = this.open;
    if (shouldDispatchAction) {
      this.dispatchActionEvent(this.open ? "opening" : "closing");
    }
    const duration = msFromTimeCSSValue(getComputedStyle(this).getPropertyValue(this.open ? OPENING_TRANSITION_PROP : CLOSING_TRANSITION_PROP));
    let promise = this.updateComplete;
    if (duration > 0) {
      promise = new Promise((r2) => {
        setTimeout(r2, duration);
      });
    }
    await promise;
    this.opening = false;
    this.closing = false;
    if (!this.open && this.dialogElement.open) {
      const closedPromise = new Promise((resolve2) => {
        this.dialogClosedResolver = resolve2;
      });
      this.dialogElement.close(this.currentAction || this.defaultAction);
      await closedPromise;
      if (!this.modeless) {
        Dialog.setDocumentScrollingDisabled(this.open);
      }
    }
    if (this.open) {
      this.focus();
    }
    if (shouldDispatchAction) {
      this.dispatchActionEvent(this.open ? "opened" : "closed");
    }
    this.currentAction = void 0;
  }
  dispatchActionEvent(type) {
    const detail = { action: this.open ? "none" : this.currentAction };
    this.dispatchEvent(new CustomEvent(type, { detail, bubbles: true }));
  }
  updateFullscreen() {
    if (this.fullscreenQuery !== void 0) {
      this.fullscreenQuery.removeEventListener("change", this.fullscreenQueryListener);
      this.fullscreenQuery = this.fullscreenQueryListener = void 0;
    }
    if (!this.fullscreen) {
      this.showingFullscreen = false;
      return;
    }
    this.fullscreenQuery = window.matchMedia(this.fullscreenBreakpoint);
    this.fullscreenQuery.addEventListener("change", this.fullscreenQueryListener = (event) => {
      this.showingFullscreen = event.matches;
    });
    this.showingFullscreen = this.fullscreenQuery.matches;
  }
  // handles native close/cancel events and we just ensure
  // internal state is in sync.
  handleDialogDismiss(e2) {
    if (e2.type === "cancel") {
      this.currentAction = this.escapeKeyAction;
    }
    this.dialogClosedResolver?.();
    this.dialogClosedResolver = void 0;
    this.open = false;
    this.opening = false;
    this.closing = false;
  }
  handleDialogClick(e2) {
    if (!this.open) {
      return;
    }
    this.currentAction = e2.target.getAttribute(this.actionAttribute) ?? (!this.modeless && !e2.composedPath().includes(this.containerElement) ? this.scrimClickAction : "");
    if (this.currentAction !== "") {
      this.close(this.currentAction);
    }
  }
  /* This allows the dividers to dynamically show based on scrolling. */
  handleContentScroll() {
    this.throttle("scroll", () => {
      this.requestUpdate();
    });
  }
  getFocusElement() {
    const selector = `[${this.focusAttribute}]`;
    const slotted = [this.footerSlot, this.contentSlot].flatMap((slot) => slot.assignedElements({ flatten: true }));
    for (const el of slotted) {
      const focusEl = el.matches(selector) ? el : el.querySelector(selector);
      if (focusEl) {
        return focusEl;
      }
    }
    return null;
  }
  focus() {
    this.getFocusElement()?.focus();
  }
  blur() {
    this.getFocusElement()?.blur();
  }
  canStartDrag(e2) {
    if (this.draggable === false || e2.defaultPrevented || !(e2.buttons & 1) || !e2.composedPath().includes(this.headerElement)) {
      return false;
    }
    return true;
  }
  handlePointerMove(e2) {
    if (!this.dragging && !this.canStartDrag(e2)) {
      return;
    }
    const { top, left, height, width } = this.containerElement.getBoundingClientRect();
    if (!this.dragging) {
      this.containerElement.setPointerCapture(e2.pointerId);
      this.dragging = true;
      const { x: x2, y: y2 } = e2;
      this.dragInfo = [x2, y2, top, left];
    }
    const [sx, sy, st, sl] = this.dragInfo ?? [0, 0, 0, 0];
    const dx = e2.x - sx;
    const dy = e2.y - sy;
    const ml = window.innerWidth - width - this.dragMargin;
    const mt = window.innerHeight - height - this.dragMargin;
    const l2 = Math.max(this.dragMargin, Math.min(ml, dx + sl));
    const t2 = Math.max(this.dragMargin, Math.min(mt, dy + st));
    this.style.setProperty("--_container-drag-inline-start", `${l2}px`);
    this.style.setProperty("--_container-drag-block-start", `${t2}px`);
  }
  handleDragEnd(e2) {
    if (!this.dragging) {
      return;
    }
    this.containerElement.releasePointerCapture(e2.pointerId);
    this.dragging = false;
    this.dragInfo = void 0;
  }
}
Dialog.preventedScrollingCount = 0;
__decorate([
  e$9({ type: Boolean })
], Dialog.prototype, "open", void 0);
__decorate([
  e$9({ type: Boolean })
], Dialog.prototype, "fullscreen", void 0);
__decorate([
  e$9()
], Dialog.prototype, "fullscreenBreakpoint", void 0);
__decorate([
  e$9({ type: Boolean })
], Dialog.prototype, "footerHidden", void 0);
__decorate([
  e$9({ type: Boolean })
], Dialog.prototype, "stacked", void 0);
__decorate([
  e$9()
], Dialog.prototype, "defaultAction", void 0);
__decorate([
  e$9()
], Dialog.prototype, "actionAttribute", void 0);
__decorate([
  e$9()
], Dialog.prototype, "focusAttribute", void 0);
__decorate([
  e$9()
], Dialog.prototype, "scrimClickAction", void 0);
__decorate([
  e$9()
], Dialog.prototype, "escapeKeyAction", void 0);
__decorate([
  e$9({ type: Boolean, reflect: true })
], Dialog.prototype, "modeless", void 0);
__decorate([
  e$9({ type: Boolean })
], Dialog.prototype, "draggable", void 0);
__decorate([
  i$5(".dialog", true)
], Dialog.prototype, "dialogElement", void 0);
__decorate([
  i$5("slot[name=footer]", true)
], Dialog.prototype, "footerSlot", void 0);
__decorate([
  i$5("slot:not([name])", true)
], Dialog.prototype, "contentSlot", void 0);
__decorate([
  i$5(`.content`, true)
], Dialog.prototype, "contentElement", void 0);
__decorate([
  i$5(`.container`, true)
], Dialog.prototype, "containerElement", void 0);
__decorate([
  i$5(`.header`, true)
], Dialog.prototype, "headerElement", void 0);
__decorate([
  t$3()
], Dialog.prototype, "showingFullscreen", void 0);
__decorate([
  t$3()
], Dialog.prototype, "showingOpen", void 0);
__decorate([
  t$3()
], Dialog.prototype, "opening", void 0);
__decorate([
  t$3()
], Dialog.prototype, "closing", void 0);
__decorate([
  e$9({ reflect: true })
], Dialog.prototype, "transition", void 0);
__decorate([
  t$3()
], Dialog.prototype, "dragging", void 0);
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$c = i$4`:host{--_container-color: var(--md-dialog-container-color, var(--md-sys-color-surface-container-high, #ece6f0));--_container-elevation: var(--md-dialog-container-elevation, 3);--_container-shape: var(--md-dialog-container-shape, 28px);--_headline-color: var(--md-dialog-headline-color, var(--md-sys-color-on-surface, #1d1b20));--_headline-type: var(--md-dialog-headline-type, var(--md-sys-typescale-headline-small, 400 1.5rem / 2rem var(--md-ref-typeface-brand, Roboto)));--_supporting-text-color: var(--md-dialog-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-type: var(--md-dialog-supporting-text-type, 400 0.875rem / 1.25rem var(--md-ref-typeface-plain, Roboto));--_with-icon-icon-color: var(--md-dialog-with-icon-icon-color, var(--md-sys-color-secondary, #625b71));--_with-icon-icon-size: var(--md-dialog-with-icon-icon-size, 24px);--_container-max-inline-size: var(--md-dialog-container-max-inline-size, min(560px, 100% - 48px));--_container-min-inline-size: var(--md-dialog-container-min-inline-size, 280px);--_container-max-block-size: var(--md-dialog-container-max-block-size, min(560px, 100% - 48px));--_container-min-block-size: var(--md-dialog-container-min-block-size, 140px);--_container-inset-inline-start: var(--md-dialog-container-inset-inline-start, auto);--_container-inset-inline-end: var(--md-dialog-container-inset-inline-end, auto);--_container-inset-block-start: var(--md-dialog-container-inset-block-start, auto);--_container-inset-block-end: var(--md-dialog-container-inset-block-end, auto);--_opening-transition-duration: var(--md-dialog-opening-transition-duration, 400ms);--_opening-transition-easing: var(--md-dialog-opening-transition-easing, cubic-bezier(0.05, 0.7, 0.1, 1));--_closing-transition-duration: var(--md-dialog-closing-transition-duration, 200ms);--_closing-transition-easing: var(--md-dialog-closing-transition-easing, cubic-bezier(0.3, 0, 0.8, 0.15));--_scrim-color: var(--md-dialog-scrim-color, rgba(0, 0, 0, 0.32));--_container-block-padding: var(--md-dialog-container-block-padding, 24px);--_container-inline-padding: var(--md-dialog-container-inline-padding, 24px);--_header-spacing: var(--md-dialog-header-spacing, 16px);--_action-spacing: var(--md-dialog-action-spacing, 8px);--_content-block-start-spacing: var(--md-dialog-content-block-start-spacing, 16px);--_content-block-end-spacing: var(--md-dialog-content-block-end-spacing, 24px);--_with-divider-divider-height: var(--md-dialog-with-divider-divider-height, 1px);--_with-divider-divider-color: var(--md-dialog-with-divider-divider-color, var(--md-sys-color-outline, #79747e));--_fullscreen-header-block-size: var(--md-dialog-fullscreen-header-block-size, 56px);--_fullscreen-footer-block-size: var(--md-dialog-fullscreen-footer-block-size, 56px);--_fullscreen-container-block-padding: var(--md-dialog-fullscreen-container-block-padding, 8px);--_container-drag-inline-start: initial;--_container-drag-block-start: initial}@media(prefers-reduced-motion: reduce){:host{--_opening-transition-duration: 0;--_closing-transition-duration: 0}}.dialog{position:fixed;align-items:center;justify-content:center;box-sizing:border-box;inset:0;block-size:100dvh;inline-size:100dvw;max-block-size:100dvh;max-inline-size:100dvw;border:none;background:rgba(0,0,0,0);padding:0;margin:0;overflow:clip}.dialog:not(:modal){z-index:10000;pointer-events:none}.dialog[open]{display:flex}.dialog::backdrop{background:none}.dialog::before{content:"";position:absolute;z-index:-1;inset:0;block-size:100dvh;inline-size:100dvw;pointer-events:none}:host([modeless]) .dialog:before{display:none}.container{position:absolute;inset-inline-start:var(--_container-drag-inline-start, var(--_container-inset-inline-start));inset-inline-end:var(--_container-inset-inline-end);inset-block-start:var(--_container-drag-block-start, var(--_container-inset-block-start));inset-block-end:var(--_container-inset-block-end);background-color:var(--_container-color);border-radius:var(--_container-shape);display:flex;flex-direction:column;box-sizing:border-box;pointer-events:auto;min-block-size:var(--_container-min-block-size);max-block-size:var(--_container-max-block-size);min-inline-size:var(--_container-min-inline-size);max-inline-size:var(--_container-max-inline-size);padding-block-start:var(--_container-block-padding);padding-block-end:var(--_container-block-padding)}md-elevation{--md-elevation-level:var(--_container-elevation)}.container>*{box-sizing:border-box;padding-inline-start:var(--_container-inline-padding);padding-inline-end:var(--_container-inline-padding)}.header{display:flex;flex-direction:column;align-items:center;gap:var(--_header-spacing);-webkit-font-smoothing:antialiased;color:var(--_headline-color);font:var(--_headline-type)}.content{flex:1;overflow:auto;margin-block-start:var(--_content-block-start-spacing);margin-block-end:var(--_content-block-end-spacing);-webkit-font-smoothing:antialiased;color:var(--_supporting-text-color);font:var(--_supporting-text-type)}.footer{display:flex;position:relative;flex-wrap:wrap;align-items:center;justify-content:flex-end;box-sizing:border-box;gap:var(--_action-spacing)}.footerHidden{--_content-block-end-spacing: 0px}.footerHidden .footer{display:none}.stacked .footer{flex-direction:column;align-items:flex-end}.scrollable .content{border-block-start:var(--_with-divider-divider-height) solid rgba(0,0,0,0);border-block-end:var(--_with-divider-divider-height) solid rgba(0,0,0,0)}.scroll-divider-header .content{border-block-start-color:var(--_with-divider-divider-color)}.scroll-divider-footer:not(.footerHidden) .content{border-block-end-color:var(--_with-divider-divider-color)}.dragging{user-select:none;cursor:move;touch-action:none}.container{will-change:transform,opacity;transition-property:transform;overflow:hidden}.container>*{transition-timing-function:inherit;transition-duration:inherit;transition-property:opacity,transform;will-change:transform,opacity;opacity:0}:host([transition][showing-open]) .container>*{opacity:1;transform:none}:host([transition][showing-open]) .container{opacity:1;transform:none}.dialog::before{transition:background-color linear;background-color:rgba(0,0,0,0)}:host([showing-open]) .dialog::before{background-color:var(--_scrim-color)}:host([opening]) .dialog::before{transition-duration:calc(var(--_opening-transition-duration)/2)}:host([closing]) .dialog::before{transition-duration:calc(var(--_closing-transition-duration)/2)}:host([opening]) .container{transition-duration:var(--_opening-transition-duration);transition-timing-function:var(--_opening-transition-easing)}:host([closing]) .container{transition-duration:var(--_closing-transition-duration);transition-timing-function:var(--_closing-transition-easing)}:host([trasition][closing]) .container>*{transform:none;opacity:0}:host([transition=grow-down]){--_opening-transform: scale(1, 0.1) translateY(-20%);--_closing-transform: scale(1, 0.9) translateY(-10%);--_origin: top;--_opening-content-transform: scale(1, 2);--_origin-footer: bottom}:host([transition=grow-up]){--_opening-transform: scale(1, 0.1) translateY(20%);--_closing-transform: scale(1, 0.9) translateY(10%);--_origin: bottom;--_opening-content-transform: scale(1, 2);--_origin-footer: bottom}:host([transition=grow-left]){--_opening-transform: scale(0.1, 1) translateX(20%);--_closing-transform: scale(0.9, 1) translateX(10%);--_origin: right;--_opening-content-transform: none;--_origin-footer: none}:host([transition=grow-right]){--_opening-transform: scale(0.1, 1) translateX(-20%);--_closing-transform: scale(0.9, 1) translateX(-10%);--_origin: left;--_opening-content-transform: none;--_origin-footer: none}:host([transition^=grow-]) .container{transform-origin:var(--_origin);transform:var(--_opening-transform)}:host([transition^=grow-]) .container>*{transform-origin:var(--_origin);transform:var(--_opening-content-transform)}:host([transition^=grow-]) .footer{transform-origin:var(--_origin-footer)}:host([transition^=grow-][closing]){transform:var(--_closing-transform)}:host([transition=shrink]) .container{transform:scale(1.2)}:host([transition=grow]) .container{transform:scale(0.8)}:host([transition=shrink][closing]) .container,:host([transition=grow][closing]) .container{transition-duration:0;transform:none}:host([showing-fullscreen]){--_container-max-block-size: none;--_container-max-inline-size: none}:host([showing-fullscreen]) .container{block-size:100dvh;inline-size:100dvw;border-radius:0px;padding-block-start:0;padding-block-end:0}:host([showing-fullscreen]) .header{justify-content:space-between;flex-direction:row;max-block-size:var(--_fullscreen-header-block-size);padding-block-start:var(--_fullscreen-container-block-padding);padding-inline:4px;--_header-spacing: 4px}:host([showing-fullscreen]) .content{margin-block-start:0;margin-block-end:0}:host([showing-fullscreen]) .footer{max-block-size:var(--_fullscreen-footer-block-size);padding-block-end:var(--_fullscreen-container-block-padding)}:host([showing-fullscreen]) .scroll-divider-footer .content{border-block-end-color:rgba(0,0,0,0)}@media screen and (forced-colors: active),(-ms-high-contrast: active){.container{outline:windowtext solid 2px}}[name=headline-prefix]::slotted(*),[name=headline-suffix]::slotted(*){color:var(--_with-icon-icon-color);font-size:var(--_with-icon-icon-size)}[name=header]::slotted(*){flex:1;align-self:stretch;display:flex;align-items:center}:host([showing-fullscreen]) [name=headline]::slotted(*){flex:1}/*# sourceMappingURL=dialog-styles.css.map */
`;
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let MdDialog = class MdDialog2 extends Dialog {
};
MdDialog.styles = [styles$c];
MdDialog = __decorate([
  e$a("md-dialog")
], MdDialog);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
var _a$5;
class Checkbox extends s$2 {
  /**
   * The associated form element with which this element's value will submit.
   */
  get form() {
    return this.closest("form");
  }
  constructor() {
    super();
    this.checked = false;
    this.disabled = false;
    this.error = false;
    this.indeterminate = false;
    this.value = "on";
    this.name = "";
    this.prevChecked = false;
    this.prevDisabled = false;
    this.prevIndeterminate = false;
    this.showFocusRing = false;
    this.showRipple = false;
    this.getRipple = () => {
      this.showRipple = true;
      return this.ripple;
    };
    this.renderRipple = () => {
      return x`<md-ripple ?disabled=${this.disabled} unbounded></md-ripple>`;
    };
    this.addController(new FormController(this));
    {
      this.addEventListener("click", (event) => {
        if (!isActivationClick(event)) {
          return;
        }
        this.focus();
        dispatchActivationClick(this.input);
      });
    }
  }
  focus() {
    this.input?.focus();
  }
  [getFormValue]() {
    return this.checked ? this.value : null;
  }
  update(changed) {
    if (changed.has("checked") || changed.has("disabled") || changed.has("indeterminate")) {
      this.prevChecked = changed.get("checked") ?? this.checked;
      this.prevDisabled = changed.get("disabled") ?? this.disabled;
      this.prevIndeterminate = changed.get("indeterminate") ?? this.indeterminate;
    }
    super.update(changed);
  }
  render() {
    const prevNone = !this.prevChecked && !this.prevIndeterminate;
    const prevChecked = this.prevChecked && !this.prevIndeterminate;
    const prevIndeterminate = this.prevIndeterminate;
    const isChecked = this.checked && !this.indeterminate;
    const isIndeterminate = this.indeterminate;
    const containerClasses = o$1({
      "selected": isChecked || isIndeterminate,
      "unselected": !isChecked && !isIndeterminate,
      "checked": isChecked,
      "indeterminate": isIndeterminate,
      "error": this.error && !this.disabled,
      "prev-unselected": prevNone,
      "prev-checked": prevChecked,
      "prev-indeterminate": prevIndeterminate,
      "prev-disabled": this.prevDisabled
    });
    const { ariaLabel } = this;
    return x`
      <div class="container ${containerClasses}">
        <div class="outline"></div>
        <div class="background"></div>
        <md-focus-ring .visible=${this.showFocusRing}></md-focus-ring>
        ${n$2(this.showRipple, this.renderRipple)}
        <svg class="icon" viewBox="0 0 18 18">
          <rect class="mark short" />
          <rect class="mark long" />
        </svg>
      </div>
      <input type="checkbox"
        aria-checked=${isIndeterminate ? "mixed" : A}
        aria-label=${ariaLabel || A}
        ?disabled=${this.disabled}
        .indeterminate=${this.indeterminate}
        .checked=${this.checked}
        @blur=${this.handleBlur}
        @change=${this.handleChange}
        @focus=${this.handleFocus}
        @pointerdown=${this.handlePointerDown}
        ${ripple(this.getRipple)}
      >
     `;
  }
  handleBlur() {
    this.showFocusRing = false;
  }
  handleChange(event) {
    const target = event.target;
    this.checked = target.checked;
    this.indeterminate = target.indeterminate;
    redispatchEvent(this, event);
  }
  handleFocus() {
    this.showFocusRing = shouldShowStrongFocus();
  }
  handlePointerDown() {
    pointerPress();
    this.showFocusRing = shouldShowStrongFocus();
  }
}
_a$5 = Checkbox;
(() => {
  requestUpdateOnAriaChange(_a$5);
})();
Checkbox.formAssociated = true;
__decorate([
  e$9({ type: Boolean, reflect: true })
], Checkbox.prototype, "checked", void 0);
__decorate([
  e$9({ type: Boolean, reflect: true })
], Checkbox.prototype, "disabled", void 0);
__decorate([
  e$9({ type: Boolean, reflect: true })
], Checkbox.prototype, "error", void 0);
__decorate([
  e$9({ type: Boolean, reflect: true })
], Checkbox.prototype, "indeterminate", void 0);
__decorate([
  e$9()
], Checkbox.prototype, "value", void 0);
__decorate([
  e$9({ reflect: true, converter: stringConverter })
], Checkbox.prototype, "name", void 0);
__decorate([
  t$3()
], Checkbox.prototype, "prevChecked", void 0);
__decorate([
  t$3()
], Checkbox.prototype, "prevDisabled", void 0);
__decorate([
  t$3()
], Checkbox.prototype, "prevIndeterminate", void 0);
__decorate([
  e$7("md-ripple")
], Checkbox.prototype, "ripple", void 0);
__decorate([
  i$5("input")
], Checkbox.prototype, "input", void 0);
__decorate([
  t$3()
], Checkbox.prototype, "showFocusRing", void 0);
__decorate([
  t$3()
], Checkbox.prototype, "showRipple", void 0);
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$b = i$4`:host{--_container-shape: var(--md-checkbox-container-shape, 2px);--_container-size: var(--md-checkbox-container-size, 18px);--_error-focus-state-layer-color: var(--md-checkbox-error-focus-state-layer-color, var(--md-sys-color-error, #b3261e));--_error-focus-state-layer-opacity: var(--md-checkbox-error-focus-state-layer-opacity, 0.12);--_error-hover-state-layer-color: var(--md-checkbox-error-hover-state-layer-color, var(--md-sys-color-error, #b3261e));--_error-hover-state-layer-opacity: var(--md-checkbox-error-hover-state-layer-opacity, 0.08);--_error-pressed-state-layer-color: var(--md-checkbox-error-pressed-state-layer-color, var(--md-sys-color-error, #b3261e));--_error-pressed-state-layer-opacity: var(--md-checkbox-error-pressed-state-layer-opacity, 0.12);--_icon-size: var(--md-checkbox-icon-size, 18px);--_selected-container-color: var(--md-checkbox-selected-container-color, var(--md-sys-color-primary, #6750a4));--_selected-disabled-container-color: var(--md-checkbox-selected-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_selected-disabled-container-opacity: var(--md-checkbox-selected-disabled-container-opacity, 0.38);--_selected-disabled-icon-color: var(--md-checkbox-selected-disabled-icon-color, var(--md-sys-color-surface, #fef7ff));--_selected-error-container-color: var(--md-checkbox-selected-error-container-color, var(--md-sys-color-error, #b3261e));--_selected-error-focus-container-color: var(--md-checkbox-selected-error-focus-container-color, var(--md-sys-color-error, #b3261e));--_selected-error-focus-icon-color: var(--md-checkbox-selected-error-focus-icon-color, var(--md-sys-color-on-error, #fff));--_selected-error-hover-container-color: var(--md-checkbox-selected-error-hover-container-color, var(--md-sys-color-error, #b3261e));--_selected-error-hover-icon-color: var(--md-checkbox-selected-error-hover-icon-color, var(--md-sys-color-on-error, #fff));--_selected-error-icon-color: var(--md-checkbox-selected-error-icon-color, var(--md-sys-color-on-error, #fff));--_selected-error-pressed-container-color: var(--md-checkbox-selected-error-pressed-container-color, var(--md-sys-color-error, #b3261e));--_selected-error-pressed-icon-color: var(--md-checkbox-selected-error-pressed-icon-color, var(--md-sys-color-on-error, #fff));--_selected-focus-container-color: var(--md-checkbox-selected-focus-container-color, var(--md-sys-color-primary, #6750a4));--_selected-focus-icon-color: var(--md-checkbox-selected-focus-icon-color, var(--md-sys-color-on-primary, #fff));--_selected-focus-state-layer-color: var(--md-checkbox-selected-focus-state-layer-color, var(--md-sys-color-primary, #6750a4));--_selected-focus-state-layer-opacity: var(--md-checkbox-selected-focus-state-layer-opacity, 0.12);--_selected-hover-container-color: var(--md-checkbox-selected-hover-container-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-icon-color: var(--md-checkbox-selected-hover-icon-color, var(--md-sys-color-on-primary, #fff));--_selected-hover-state-layer-color: var(--md-checkbox-selected-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-state-layer-opacity: var(--md-checkbox-selected-hover-state-layer-opacity, 0.08);--_selected-icon-color: var(--md-checkbox-selected-icon-color, var(--md-sys-color-on-primary, #fff));--_selected-pressed-container-color: var(--md-checkbox-selected-pressed-container-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-icon-color: var(--md-checkbox-selected-pressed-icon-color, var(--md-sys-color-on-primary, #fff));--_selected-pressed-state-layer-color: var(--md-checkbox-selected-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_selected-pressed-state-layer-opacity: var(--md-checkbox-selected-pressed-state-layer-opacity, 0.12);--_state-layer-shape: var(--md-checkbox-state-layer-shape, 9999px);--_state-layer-size: var(--md-checkbox-state-layer-size, 40px);--_unselected-disabled-container-opacity: var(--md-checkbox-unselected-disabled-container-opacity, 0.38);--_unselected-disabled-outline-color: var(--md-checkbox-unselected-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_unselected-disabled-outline-width: var(--md-checkbox-unselected-disabled-outline-width, 2px);--_unselected-error-focus-outline-color: var(--md-checkbox-unselected-error-focus-outline-color, var(--md-sys-color-error, #b3261e));--_unselected-error-hover-outline-color: var(--md-checkbox-unselected-error-hover-outline-color, var(--md-sys-color-error, #b3261e));--_unselected-error-outline-color: var(--md-checkbox-unselected-error-outline-color, var(--md-sys-color-error, #b3261e));--_unselected-error-pressed-outline-color: var(--md-checkbox-unselected-error-pressed-outline-color, var(--md-sys-color-error, #b3261e));--_unselected-focus-outline-color: var(--md-checkbox-unselected-focus-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_unselected-focus-outline-width: var(--md-checkbox-unselected-focus-outline-width, 2px);--_unselected-focus-state-layer-color: var(--md-checkbox-unselected-focus-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_unselected-focus-state-layer-opacity: var(--md-checkbox-unselected-focus-state-layer-opacity, 0.12);--_unselected-hover-outline-color: var(--md-checkbox-unselected-hover-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_unselected-hover-outline-width: var(--md-checkbox-unselected-hover-outline-width, 2px);--_unselected-hover-state-layer-color: var(--md-checkbox-unselected-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_unselected-hover-state-layer-opacity: var(--md-checkbox-unselected-hover-state-layer-opacity, 0.08);--_unselected-outline-color: var(--md-checkbox-unselected-outline-color, var(--md-sys-color-on-surface-variant, #49454f));--_unselected-outline-width: var(--md-checkbox-unselected-outline-width, 2px);--_unselected-pressed-outline-color: var(--md-checkbox-unselected-pressed-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_unselected-pressed-outline-width: var(--md-checkbox-unselected-pressed-outline-width, 2px);--_unselected-pressed-state-layer-color: var(--md-checkbox-unselected-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_unselected-pressed-state-layer-opacity: var(--md-checkbox-unselected-pressed-state-layer-opacity, 0.12);border-radius:var(--_container-shape);display:inline-flex;height:48px;position:relative;vertical-align:top;width:48px;-webkit-tap-highlight-color:rgba(0,0,0,0)}input{appearance:none;inset:0;margin:0;outline:none;position:absolute;opacity:0;block-size:100%;inline-size:100%}.container{border-radius:inherit;height:100%;position:relative;width:100%}.outline,.background,md-ripple,.icon{inset:0;margin:auto;position:absolute}.outline,.background{border-radius:inherit;height:var(--_container-size);width:var(--_container-size)}.outline{border-color:var(--_unselected-outline-color);border-style:solid;border-width:var(--_unselected-outline-width);box-sizing:border-box}.background{background-color:var(--_selected-container-color)}.background,.icon{opacity:0;transition-duration:150ms,50ms;transition-property:transform,opacity;transition-timing-function:cubic-bezier(0.3, 0, 0.8, 0.15),linear;transform:scale(0.6)}.selected .background,.selected .icon{opacity:1;transition-duration:350ms,50ms;transition-timing-function:cubic-bezier(0.05, 0.7, 0.1, 1),linear;transform:scale(1)}md-focus-ring{--md-focus-ring-shape-start-start:var(--md-focus-ring-shape, 9999px);--md-focus-ring-shape-start-end:var(--md-focus-ring-shape, 9999px);--md-focus-ring-shape-end-end:var(--md-focus-ring-shape, 9999px);--md-focus-ring-shape-end-start:var(--md-focus-ring-shape, 9999px);--md-focus-ring-offset:-2px}md-ripple{height:var(--_state-layer-size);width:var(--_state-layer-size);--md-ripple-focus-color:var(--_unselected-focus-state-layer-color);--md-ripple-focus-opacity:var(--_unselected-focus-state-layer-opacity);--md-ripple-hover-color:var(--_unselected-hover-state-layer-color);--md-ripple-hover-opacity:var(--_unselected-hover-state-layer-opacity);--md-ripple-pressed-color:var(--_unselected-pressed-state-layer-color);--md-ripple-pressed-opacity:var(--_unselected-pressed-state-layer-opacity);--md-ripple-shape:var(--_state-layer-shape)}.selected md-ripple{--md-ripple-focus-color:var(--_selected-focus-state-layer-color);--md-ripple-focus-opacity:var(--_selected-focus-state-layer-opacity);--md-ripple-hover-color:var(--_selected-hover-state-layer-color);--md-ripple-hover-opacity:var(--_selected-hover-state-layer-opacity);--md-ripple-pressed-color:var(--_selected-pressed-state-layer-color);--md-ripple-pressed-opacity:var(--_selected-pressed-state-layer-opacity)}.error md-ripple{--md-ripple-focus-color:var(--_error-focus-state-layer-color);--md-ripple-focus-opacity:var(--_error-focus-state-layer-opacity);--md-ripple-hover-color:var(--_error-hover-state-layer-color);--md-ripple-hover-opacity:var(--_error-hover-state-layer-opacity);--md-ripple-pressed-color:var(--_error-pressed-state-layer-color);--md-ripple-pressed-opacity:var(--_error-pressed-state-layer-opacity)}.icon{fill:var(--_selected-icon-color);height:var(--_icon-size);width:var(--_icon-size)}.mark.short{height:2px;transition-property:transform,height;width:2px}.mark.long{height:2px;transition-property:transform,width;width:10px}.mark{animation-duration:150ms;animation-timing-function:cubic-bezier(0.3, 0, 0.8, 0.15);transition-duration:150ms;transition-timing-function:cubic-bezier(0.3, 0, 0.8, 0.15)}.selected .mark{animation-duration:350ms;animation-timing-function:cubic-bezier(0.05, 0.7, 0.1, 1);transition-duration:350ms;transition-timing-function:cubic-bezier(0.05, 0.7, 0.1, 1)}.checked .mark,.prev-checked.unselected .mark{transform:scaleY(-1) translate(7px, -14px) rotate(45deg)}.checked .mark.short,.prev-checked.unselected .mark.short{height:5.6568542495px}.checked .mark.long,.prev-checked.unselected .mark.long{width:11.313708499px}.indeterminate .mark,.prev-indeterminate.unselected .mark{transform:scaleY(-1) translate(4px, -10px) rotate(0deg)}.prev-unselected .mark{transition-property:none}.prev-unselected.checked .mark.long{animation-name:prev-unselected-to-checked}@keyframes prev-unselected-to-checked{from{width:0}}.error .outline{border-color:var(--_unselected-error-outline-color)}.error .background{background:var(--_selected-error-container-color)}.error .icon{fill:var(--_selected-error-icon-color)}:host(:hover) .outline{border-color:var(--_unselected-hover-outline-color);border-width:var(--_unselected-hover-outline-width)}:host(:hover) .background{background:var(--_selected-hover-container-color)}:host(:hover) .icon{fill:var(--_selected-hover-icon-color)}:host(:hover) .error .outline{border-color:var(--_unselected-error-hover-outline-color)}:host(:hover) .error .background{background:var(--_selected-error-hover-container-color)}:host(:hover) .error .icon{fill:var(--_selected-error-hover-icon-color)}:host(:focus-within) .outline{border-color:var(--_unselected-focus-outline-color);border-width:var(--_unselected-focus-outline-width)}:host(:focus-within) .background{background:var(--_selected-focus-container-color)}:host(:focus-within) .icon{fill:var(--_selected-focus-icon-color)}:host(:focus-within) .error .outline{border-color:var(--_unselected-error-focus-outline-color)}:host(:focus-within) .error .background{background:var(--_selected-error-focus-container-color)}:host(:focus-within) .error .icon{fill:var(--_selected-error-focus-icon-color)}:host(:active) .outline{border-color:var(--_unselected-pressed-outline-color);border-width:var(--_unselected-pressed-outline-width)}:host(:active) .background{background:var(--_selected-pressed-container-color)}:host(:active) .icon{fill:var(--_selected-pressed-icon-color)}:host(:active) .error .outline{border-color:var(--_unselected-error-pressed-outline-color)}:host(:active) .error .background{background:var(--_selected-error-pressed-container-color)}:host(:active) .error .icon{fill:var(--_selected-error-pressed-icon-color)}:host([disabled]) .background,:host([disabled]) .icon,:host([disabled]) .mark,.prev-disabled .background,.prev-disabled .icon,.prev-disabled .mark{animation-duration:0s;transition-duration:0s}:host([disabled]) .outline{border-color:var(--_unselected-disabled-outline-color);border-width:var(--_unselected-disabled-outline-width);opacity:var(--_unselected-disabled-container-opacity)}:host([disabled]) .selected .outline{visibility:hidden}:host([disabled]) .selected .background{background:var(--_selected-disabled-container-color);opacity:var(--_selected-disabled-container-opacity)}:host([disabled]) .icon{fill:var(--_selected-disabled-icon-color)}/*# sourceMappingURL=checkbox-styles.css.map */
`;
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$a = i$4`@media(forced-colors: active){:host{--md-checkbox-selected-container-color:CanvasText;--md-checkbox-selected-disabled-container-color:GrayText;--md-checkbox-selected-disabled-container-opacity:1;--md-checkbox-selected-disabled-icon-color:Canvas;--md-checkbox-selected-error-container-color:CanvasText;--md-checkbox-selected-error-focus-container-color:CanvasText;--md-checkbox-selected-error-focus-icon-color:Canvas;--md-checkbox-selected-error-hover-container-color:CanvasText;--md-checkbox-selected-error-hover-icon-color:Canvas;--md-checkbox-selected-error-icon-color:Canvas;--md-checkbox-selected-error-pressed-container-color:CanvasText;--md-checkbox-selected-error-pressed-icon-color:Canvas;--md-checkbox-selected-focus-container-color:CanvasText;--md-checkbox-selected-focus-icon-color:Canvas;--md-checkbox-selected-hover-container-color:CanvasText;--md-checkbox-selected-hover-icon-color:Canvas;--md-checkbox-selected-icon-color:Canvas;--md-checkbox-selected-pressed-container-color:CanvasText;--md-checkbox-selected-pressed-icon-color:Canvas;--md-checkbox-unselected-disabled-container-opacity:1;--md-checkbox-unselected-disabled-outline-color:GrayText;--md-checkbox-unselected-error-focus-outline-color:CanvasText;--md-checkbox-unselected-error-hover-outline-color:CanvasText;--md-checkbox-unselected-error-outline-color:CanvasText;--md-checkbox-unselected-error-pressed-outline-color:CanvasText;--md-checkbox-unselected-focus-outline-color:CanvasText;--md-checkbox-unselected-hover-outline-color:CanvasText;--md-checkbox-unselected-outline-color:CanvasText;--md-checkbox-unselected-pressed-outline-color:CanvasText}}/*# sourceMappingURL=forced-colors-styles.css.map */
`;
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let MdCheckbox = class MdCheckbox2 extends Checkbox {
};
MdCheckbox.styles = [styles$b, styles$a];
MdCheckbox = __decorate([
  e$a("md-checkbox")
], MdCheckbox);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
var _a$4;
const NAVIGABLE_KEYS = {
  ArrowDown: "ArrowDown",
  ArrowUp: "ArrowUp",
  Home: "Home",
  End: "End"
};
const navigableKeySet = new Set(Object.values(NAVIGABLE_KEYS));
function isNavigableKey(key) {
  return navigableKeySet.has(key);
}
class List extends s$2 {
  constructor() {
    super(...arguments);
    this.type = "list";
    this.listTabIndex = 0;
  }
  render() {
    return this.renderList();
  }
  /**
   * Renders the main list element.
   */
  renderList() {
    const { ariaLabel } = this;
    return x`
    <ul class="md3-list ${o$1(this.getListClasses())}"
        aria-label=${ariaLabel || A}
        tabindex=${this.listTabIndex}
        role=${this.type || A}
        @keydown=${this.handleKeydown}
        >
      ${this.renderContent()}
    </ul>
  `;
  }
  /**
   * The classes to be applied to the underlying list.
   */
  getListClasses() {
    return {};
  }
  /**
   * The content to be slotted into the list.
   */
  renderContent() {
    return x`<span><slot @click=${(e2) => {
      e2.stopPropagation();
    }}></slot></span>`;
  }
  /**
   * Handles keyboard navigation in the list.
   *
   * @param event {KeyboardEvent} The keyboard event that triggers this handler.
   */
  handleKeydown(event) {
    const key = event.key;
    if (!isNavigableKey(key)) {
      return;
    }
    const items = this.items;
    if (!items.length) {
      return;
    }
    const activeItemRecord = List.getActiveItem(items);
    if (activeItemRecord) {
      activeItemRecord.item.active = false;
    }
    keydownHandler(event);
    event.preventDefault();
    switch (key) {
      case NAVIGABLE_KEYS.ArrowDown:
        if (activeItemRecord) {
          const next = List.getNextItem(items, activeItemRecord.index);
          if (next)
            next.active = true;
        } else {
          List.activateFirstItem(items);
        }
        break;
      case NAVIGABLE_KEYS.ArrowUp:
        if (activeItemRecord) {
          const prev = List.getPrevItem(items, activeItemRecord.index);
          if (prev)
            prev.active = true;
        } else {
          items[items.length - 1].active = true;
        }
        break;
      case NAVIGABLE_KEYS.Home:
        List.activateFirstItem(items);
        break;
      case NAVIGABLE_KEYS.End:
        List.activateLastItem(items);
        break;
    }
  }
  /**
   * Activates the first non-disabled item of a given array of items.
   *
   * @param items {Array<ListItem>} The items from which to activate the
   * first item.
   */
  static activateFirstItem(items) {
    const firstItem = List.getFirstActivatableItem(items);
    if (firstItem) {
      firstItem.active = true;
    }
  }
  /**
   * Activates the last non-disabled item of a given array of items.
   *
   * @param items {Array<ListItem>} The items from which to activate the
   * last item.
   */
  static activateLastItem(items) {
    const lastItem = List.getLastActivatableItem(items);
    if (lastItem) {
      lastItem.active = true;
    }
  }
  /**
   * Deactivates the currently active item of a given array of items.
   *
   * @param items {Array<ListItem>} The items from which to deactivate the
   * active item.
   * @returns A record of the deleselcted activated item including the item and
   * the index of the item or `null` if none are deactivated.
   */
  static deactivateActiveItem(items) {
    const activeItem = List.getActiveItem(items);
    if (activeItem) {
      activeItem.item.active = false;
    }
    return activeItem;
  }
  focus() {
    this.listRoot.focus();
  }
  /**
   * Retrieves the the first activated item of a given array of items.
   *
   * @param items {Array<ListItem>} The items to search.
   * @returns A record of the first activated item including the item and the
   * index of the item or `null` if none are activated.
   */
  static getActiveItem(items) {
    for (let i3 = 0; i3 < items.length; i3++) {
      const item = items[i3];
      if (item.active) {
        return {
          item,
          index: i3
        };
      }
    }
    return null;
  }
  /**
   * Retrieves the the first non-disabled item of a given array of items. This
   * the first item that is not disabled.
   *
   * @param items {Array<ListItem>} The items to search.
   * @returns The first activatable item or `null` if none are activatable.
   */
  static getFirstActivatableItem(items) {
    for (const item of items) {
      if (!item.disabled) {
        return item;
      }
    }
    return null;
  }
  /**
   * Retrieves the the last non-disabled item of a given array of items.
   *
   * @param items {Array<ListItem>} The items to search.
   * @returns The last activatable item or `null` if none are activatable.
   */
  static getLastActivatableItem(items) {
    for (let i3 = items.length - 1; i3 >= 0; i3--) {
      const item = items[i3];
      if (!item.disabled) {
        return item;
      }
    }
    return null;
  }
  /**
   * Retrieves the the next non-disabled item of a given array of items.
   *
   * @param items {Array<ListItem>} The items to search.
   * @param index {{index: number}} The index to search from.
   * @returns The next activatable item or `null` if none are activatable.
   */
  static getNextItem(items, index2) {
    for (let i3 = 1; i3 < items.length; i3++) {
      const nextIndex = (i3 + index2) % items.length;
      const item = items[nextIndex];
      if (!item.disabled) {
        return item;
      }
    }
    return null;
  }
  /**
   * Retrieves the the previous non-disabled item of a given array of items.
   *
   * @param items {Array<ListItem>} The items to search.
   * @param index {{index: number}} The index to search from.
   * @returns The previous activatable item or `null` if none are activatable.
   */
  static getPrevItem(items, index2) {
    for (let i3 = 1; i3 < items.length; i3++) {
      const prevIndex = (index2 - i3 + items.length) % items.length;
      const item = items[prevIndex];
      if (!item.disabled) {
        return item;
      }
    }
    return null;
  }
}
_a$4 = List;
(() => {
  requestUpdateOnAriaChange(_a$4);
})();
List.shadowRootOptions = { mode: "open", delegatesFocus: true };
__decorate([
  e$9()
], List.prototype, "type", void 0);
__decorate([
  e$9({ type: Number })
], List.prototype, "listTabIndex", void 0);
__decorate([
  i$5(".md3-list")
], List.prototype, "listRoot", void 0);
__decorate([
  l$5({ flatten: true, selector: "[md-list-item]" })
], List.prototype, "items", void 0);
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$9 = i$4`:host{--_container-color: var(--md-list-container-color, var(--md-sys-color-surface, #fef7ff));color:unset;min-width:300px}.md3-list{background-color:var(--_container-color);border-radius:inherit;display:block;list-style-type:none;margin:0;min-width:inherit;outline:none;padding:8px 0;position:relative}/*# sourceMappingURL=list-styles.css.map */
`;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let MdList = class MdList2 extends List {
};
MdList.styles = [styles$9];
MdList = __decorate([
  e$a("md-list")
], MdList);
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$8 = i$4`@media(forced-colors: active){:host{--md-list-item-list-item-disabled-label-text-color: GrayText;--md-list-item-list-item-disabled-label-text-opacity: 1;--md-list-item-list-item-disabled-leading-icon-color: GrayText;--md-list-item-list-item-disabled-leading-icon-opacity: 1;--md-list-item-list-item-disabled-trailing-icon-color: GrayText;--md-list-item-list-item-disabled-trailing-icon-opacity: 1}}/*# sourceMappingURL=forced-colors-styles.css.map */
`;
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
var _a$3;
class ListItemEl extends s$2 {
  constructor() {
    super(...arguments);
    this.headline = "";
    this.supportingText = "";
    this.multiLineSupportingText = false;
    this.trailingSupportingText = "";
    this.disabled = false;
    this.itemTabIndex = -1;
    this.active = false;
    this.isListItem = true;
    this.listItemRole = "listitem";
    this.showFocusRing = false;
    this.showRipple = false;
    this.focusOnActivation = true;
    this.getRipple = () => {
      this.showRipple = true;
      return this.ripple;
    };
    this.isFirstUpdate = true;
  }
  willUpdate(changed) {
    if (changed.has("active") && !this.disabled) {
      if (this.active) {
        this.itemTabIndex = 0;
        if (this.focusOnActivation) {
          this.showFocusRing = shouldShowStrongFocus();
        }
      } else if (!this.isFirstUpdate) {
        this.itemTabIndex = -1;
      }
    }
  }
  render() {
    return this.renderListItem(x`
      <div class="content-wrapper">
        ${this.renderStart()}
        ${this.renderBody()}
        ${this.renderEnd()}
        ${this.renderRipple()}
        ${this.renderFocusRing()}
      </div>`);
  }
  /**
   * Renders the root list item.
   *
   * @param content {unkown} the child content of the list item.
   */
  renderListItem(content) {
    return x`
      <li
          tabindex=${this.disabled ? -1 : this.itemTabIndex}
          role=${this.listItemRole}
          aria-selected=${this.ariaSelected || A}
          aria-checked=${this.ariaChecked || A}
          class="list-item ${o$1(this.getRenderClasses())}"
          @pointerdown=${this.onPointerdown}
          @focus=${this.onFocus}
          @blur=${this.onBlur}
          @click=${this.onClick}
          @pointerenter=${this.onPointerenter}
          @pointerleave=${this.onPointerleave}
          @keydown=${this.onKeydown}
          ${ripple(this.getRipple)}>${content}</li>`;
  }
  /**
   * Handles rendering of the ripple element.
   */
  renderRipple() {
    return this.showRipple ? x`<md-ripple ?disabled="${this.disabled}"></md-ripple>` : A;
  }
  /**
   * Handles rendering of the focus ring.
   */
  renderFocusRing() {
    return x`<md-focus-ring class="focus-ring" .visible="${this.showFocusRing}"></md-focus-ring>`;
  }
  /**
   * Classes applied to the list item root.
   */
  getRenderClasses() {
    return {
      "with-one-line": this.supportingText === "",
      "with-two-line": this.supportingText !== "" && !this.multiLineSupportingText,
      "with-three-line": this.supportingText !== "" && this.multiLineSupportingText,
      "disabled": this.disabled
    };
  }
  /**
   * The content rendered at the start of the list item.
   */
  renderStart() {
    return x`<div class="start"><slot name="start"></slot></div>`;
  }
  /**
   * Handles rendering the headline and supporting text.
   */
  renderBody() {
    const supportingText = this.supportingText !== "" ? this.renderSupportingText() : "";
    return x`<div class="body"
      ><span class="label-text">${this.headline}</span>${supportingText}</div>`;
  }
  /**
   * Renders the one-line supporting text.
   */
  renderSupportingText() {
    return x`<span
        class="supporting-text ${o$1(this.getSupportingTextClasses())}"
      >${this.supportingText}</span>`;
  }
  /**
   * Gets the classes for the supporting text node
   */
  getSupportingTextClasses() {
    return { "supporting-text--multi-line": this.multiLineSupportingText };
  }
  /**
   * The content rendered at the end of the list item.
   */
  renderEnd() {
    const supportingText = this.trailingSupportingText !== "" ? this.renderTrailingSupportingText() : "";
    return x`<div class="end"
      ><slot name="end">${supportingText}</slot></div>`;
  }
  /**
   * Renders the supporting text at the end of the list item.
   */
  renderTrailingSupportingText() {
    return x`<span class="trailing-supporting-text"
      >${this.trailingSupportingText}</span>`;
  }
  onPointerdown() {
    pointerPress();
    this.showFocusRing = shouldShowStrongFocus();
  }
  onFocus() {
    this.showFocusRing = shouldShowStrongFocus();
  }
  onBlur() {
    this.showFocusRing = false;
  }
  // For easier overriding in menu-item
  onClick(e2) {
  }
  onKeydown(e2) {
  }
  onPointerenter(e2) {
  }
  onPointerleave(e2) {
  }
  updated(changed) {
    super.updated(changed);
    if (changed.has("active") && !this.isFirstUpdate && this.active && this.focusOnActivation) {
      this.focus();
    }
    this.isFirstUpdate = false;
  }
  focus() {
    this.listItemRoot?.focus?.();
  }
}
_a$3 = ListItemEl;
(() => {
  requestUpdateOnAriaChange(_a$3);
})();
__decorate([
  e$9()
], ListItemEl.prototype, "headline", void 0);
__decorate([
  e$9()
], ListItemEl.prototype, "supportingText", void 0);
__decorate([
  e$9({ type: Boolean })
], ListItemEl.prototype, "multiLineSupportingText", void 0);
__decorate([
  e$9()
], ListItemEl.prototype, "trailingSupportingText", void 0);
__decorate([
  e$9({ type: Boolean })
], ListItemEl.prototype, "disabled", void 0);
__decorate([
  e$9({ type: Number })
], ListItemEl.prototype, "itemTabIndex", void 0);
__decorate([
  e$9({ type: Boolean, reflect: true })
], ListItemEl.prototype, "active", void 0);
__decorate([
  e$9({ type: Boolean, attribute: "md-list-item", reflect: true })
], ListItemEl.prototype, "isListItem", void 0);
__decorate([
  e$7("md-ripple")
], ListItemEl.prototype, "ripple", void 0);
__decorate([
  i$5(".list-item")
], ListItemEl.prototype, "listItemRoot", void 0);
__decorate([
  t$3()
], ListItemEl.prototype, "showFocusRing", void 0);
__decorate([
  t$3()
], ListItemEl.prototype, "showRipple", void 0);
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$7 = i$4`:host{--_list-item-container-color: var(--md-list-item-list-item-container-color, var(--md-sys-color-surface, #fef7ff));--_list-item-container-shape: var(--md-list-item-list-item-container-shape, 0px);--_list-item-disabled-label-text-color: var(--md-list-item-list-item-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_list-item-disabled-label-text-opacity: var(--md-list-item-list-item-disabled-label-text-opacity, 0.3);--_list-item-disabled-leading-icon-color: var(--md-list-item-list-item-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_list-item-disabled-leading-icon-opacity: var(--md-list-item-list-item-disabled-leading-icon-opacity, 0.38);--_list-item-disabled-trailing-icon-color: var(--md-list-item-list-item-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_list-item-disabled-trailing-icon-opacity: var(--md-list-item-list-item-disabled-trailing-icon-opacity, 0.38);--_list-item-focus-label-text-color: var(--md-list-item-list-item-focus-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_list-item-focus-leading-icon-icon-color: var(--md-list-item-list-item-focus-leading-icon-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_list-item-focus-state-layer-color: var(--md-list-item-list-item-focus-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_list-item-focus-state-layer-opacity: var(--md-list-item-list-item-focus-state-layer-opacity, 0.12);--_list-item-focus-trailing-icon-icon-color: var(--md-list-item-list-item-focus-trailing-icon-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_list-item-hover-label-text-color: var(--md-list-item-list-item-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_list-item-hover-leading-icon-icon-color: var(--md-list-item-list-item-hover-leading-icon-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_list-item-hover-state-layer-color: var(--md-list-item-list-item-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_list-item-hover-state-layer-opacity: var(--md-list-item-list-item-hover-state-layer-opacity, 0.08);--_list-item-hover-trailing-icon-icon-color: var(--md-list-item-list-item-hover-trailing-icon-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_list-item-label-text-color: var(--md-list-item-list-item-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_list-item-label-text-line-height: var(--md-list-item-list-item-label-text-line-height, 1.5rem);--_list-item-label-text-type: var(--md-list-item-list-item-label-text-type, var(--md-sys-typescale-body-large, 400 1rem / 1.5rem var(--md-ref-typeface-plain, Roboto)));--_list-item-large-leading-video-height: var(--md-list-item-list-item-large-leading-video-height, 69px);--_list-item-leading-avatar-label-color: var(--md-list-item-list-item-leading-avatar-label-color, var(--md-sys-color-on-primary-container, #21005d));--_list-item-leading-avatar-label-type: var(--md-list-item-list-item-leading-avatar-label-type, var(--md-sys-typescale-title-medium, 500 1rem / 1.5rem var(--md-ref-typeface-plain, Roboto)));--_list-item-leading-avatar-color: var(--md-list-item-list-item-leading-avatar-color, var(--md-sys-color-primary-container, #eaddff));--_list-item-leading-avatar-shape: var(--md-list-item-list-item-leading-avatar-shape, 9999px);--_list-item-leading-avatar-size: var(--md-list-item-list-item-leading-avatar-size, 40px);--_list-item-leading-icon-color: var(--md-list-item-list-item-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_list-item-leading-icon-size: var(--md-list-item-list-item-leading-icon-size, 18px);--_list-item-leading-image-height: var(--md-list-item-list-item-leading-image-height, 56px);--_list-item-leading-image-shape: var(--md-list-item-list-item-leading-image-shape, 0px);--_list-item-leading-image-width: var(--md-list-item-list-item-leading-image-width, 56px);--_list-item-leading-video-shape: var(--md-list-item-list-item-leading-video-shape, 0px);--_list-item-leading-video-width: var(--md-list-item-list-item-leading-video-width, 100px);--_list-item-one-line-container-height: var(--md-list-item-list-item-one-line-container-height, 56px);--_list-item-pressed-label-text-color: var(--md-list-item-list-item-pressed-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_list-item-pressed-leading-icon-icon-color: var(--md-list-item-list-item-pressed-leading-icon-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_list-item-pressed-state-layer-color: var(--md-list-item-list-item-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_list-item-pressed-state-layer-opacity: var(--md-list-item-list-item-pressed-state-layer-opacity, 0.12);--_list-item-pressed-trailing-icon-icon-color: var(--md-list-item-list-item-pressed-trailing-icon-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_list-item-small-leading-video-height: var(--md-list-item-list-item-small-leading-video-height, 56px);--_list-item-supporting-text-color: var(--md-list-item-list-item-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_list-item-supporting-text-type: var(--md-list-item-list-item-supporting-text-type, var(--md-sys-typescale-body-medium, 400 0.875rem / 1.25rem var(--md-ref-typeface-plain, Roboto)));--_list-item-three-line-container-height: var(--md-list-item-list-item-three-line-container-height, 88px);--_list-item-trailing-icon-color: var(--md-list-item-list-item-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_list-item-trailing-icon-size: var(--md-list-item-list-item-trailing-icon-size, 24px);--_list-item-trailing-supporting-text-color: var(--md-list-item-list-item-trailing-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_list-item-trailing-supporting-text-line-height: var(--md-list-item-list-item-trailing-supporting-text-line-height, 1rem);--_list-item-trailing-supporting-text-type: var(--md-list-item-list-item-trailing-supporting-text-type, var(--md-sys-typescale-label-small, 500 0.688rem / 1rem var(--md-ref-typeface-plain, Roboto)));--_list-item-two-line-container-height: var(--md-list-item-list-item-two-line-container-height, 72px);--_list-item-leading-element-leading-space: var(--md-list-item-list-item-leading-element-leading-space, 16px);--_list-item-leading-space: var(--md-list-item-list-item-leading-space, 16px);--_list-item-leading-video-leading-space: var(--md-list-item-list-item-leading-video-leading-space, 0px);--_list-item-trailing-element-headline-trailing-element-space: var(--md-list-item-list-item-trailing-element-headline-trailing-element-space, 16px);--_list-item-trailing-space: var(--md-list-item-list-item-trailing-space, 16px)}:host{color:unset;--md-focus-ring-shape-start-start:var(--md-focus-ring-shape, 4px);--md-focus-ring-shape-start-end:var(--md-focus-ring-shape, 4px);--md-focus-ring-shape-end-end:var(--md-focus-ring-shape, 4px);--md-focus-ring-shape-end-start:var(--md-focus-ring-shape, 4px);--md-focus-ring-offset:-3px;--md-ripple-hover-color:var(--_list-item-hover-state-layer-color);--md-ripple-hover-opacity:var(--_list-item-hover-state-layer-opacity);--md-ripple-pressed-color:var(--_list-item-pressed-state-layer-color);--md-ripple-pressed-opacity:var(--_list-item-pressed-state-layer-opacity);--md-ripple-focus-color:var(--_list-item-focus-state-layer-color);--md-ripple-focus-opacity:var(--_list-item-focus-state-layer-opacity)}.list-item{align-items:center;box-sizing:border-box;display:flex;outline:none;position:relative;width:100%;text-decoration:none;background-color:var(--_list-item-container-color);border-radius:var(--_list-item-container-shape)}.list-item:not(.disabled){cursor:pointer}.list-item.disabled{pointer-events:none}.content-wrapper{display:flex;width:100%;border-radius:inherit}md-ripple{border-radius:inherit}.with-one-line{min-height:var(--_list-item-one-line-container-height)}.with-two-line{min-height:var(--_list-item-two-line-container-height)}.with-three-line{min-height:var(--_list-item-three-line-container-height)}.start{display:inline-flex;flex-direction:column;justify-content:center;align-items:center;flex:0 0 auto;z-index:1}.with-three-line .start{justify-content:start}slot[name=start]::slotted([data-variant=icon]),slot[name=start]::slotted([data-variant=image]),slot[name=start]::slotted([data-variant=avatar]){margin-inline-start:var(--_list-item-leading-element-leading-space)}.body{display:inline-flex;justify-content:center;flex-direction:column;box-sizing:border-box;flex:1 0 0;padding-inline-start:var(--_list-item-leading-space);padding-inline-end:var(--_list-item-trailing-space);z-index:1}.end{display:inline-flex;flex-direction:column;justify-content:center;flex:0 0 auto;z-index:1}.with-three-line .end{justify-content:start}slot[name=end]::slotted(*),.trailing-supporting-text{margin-inline-end:var(--_list-item-trailing-element-headline-trailing-element-space)}.label-text{display:flex;color:var(--_list-item-label-text-color);font:var(--_list-item-label-text-type)}:hover .label-text{color:var(--_list-item-hover-label-text-color)}:focus .label-text{color:var(--_list-item-focus-label-text-color)}:active .label-text{color:var(--_list-item-pressed-label-text-color)}.disabled .label-text{color:var(--_list-item-disabled-label-text-color);opacity:var(--_list-item-disabled-label-text-opacity)}.supporting-text{text-overflow:ellipsis;white-space:normal;overflow:hidden;width:100%;color:var(--_list-item-supporting-text-color);font:var(--_list-item-supporting-text-type);-webkit-box-orient:vertical;-webkit-line-clamp:1;display:-webkit-box}.disabled .supporting-text{color:var(--_list-item-disabled-label-text-color);opacity:var(--_list-item-disabled-label-text-opacity)}.supporting-text--multi-line{-webkit-line-clamp:2}.trailing-supporting-text{padding-inline-start:16px;font:var(--_list-item-trailing-supporting-text-type)}.list-item:not(.disabled) .trailing-supporting-text{color:var(--_list-item-trailing-supporting-text-color)}.disabled .trailing-supporting-text{color:var(--_list-item-disabled-label-text-color);opacity:var(--_list-item-disabled-label-text-opacity)}.with-three-line .trailing-supporting-text{padding-block-start:calc((var(--_list-item-label-text-line-height) - var(--_list-item-trailing-supporting-text-line-height))/2)}.focus-ring{z-index:1}::slotted([data-variant=image]){display:inline-flex;height:var(--_list-item-leading-image-height);width:var(--_list-item-leading-image-width);border-radius:var(--_list-item-leading-image-shape);padding-block:calc((var(--_list-item-two-line-container-height) - var(--_list-item-leading-image-height))/2)}.with-three-line ::slotted([data-variant=image]){padding-block:0}slot[name=start]::slotted([data-variant=icon]){--md-icon-color:var(--_list-item-leading-icon-color);--md-icon-size:var(--_list-item-leading-icon-size)}.with-three-line slot[name=start]::slotted([data-variant=icon]){padding-block-start:calc((var(--_list-item-label-text-line-height) - var(--_list-item-leading-icon-size))/2)}slot[name=end]::slotted([data-variant=icon]){--md-icon-color:var(--_list-item-trailing-icon-color);--md-icon-size:var(--_list-item-trailing-icon-size)}.with-three-line slot[name=end]::slotted([data-variant=icon]){padding-block-start:calc((var(--_list-item-label-text-line-height) - var(--_list-item-trailing-icon-size))/2)}:hover slot[name=start]::slotted([data-variant=icon]){--md-icon-color:var(--_list-item-hover-leading-icon-icon-color)}:hover slot[name=end]::slotted([data-variant=icon]){--md-icon-color:var(--_list-item-hover-trailing-icon-icon-color)}:focus slot[name=start]::slotted([data-variant=icon]){--md-icon-color:var(--_list-item-focus-leading-icon-icon-color)}:focus slot[name=end]::slotted([data-variant=icon]){--md-icon-color:var(--_list-item-focus-trailing-icon-icon-color)}:active slot[name=start]::slotted([data-variant=icon]){--md-icon-color:var(--_list-item-pressed-leading-icon-icon-color)}:active slot[name=end]::slotted([data-variant=icon]){--md-icon-color:var(--_list-item-pressed-trailing-icon-icon-color)}.disabled slot[name=start]::slotted([data-variant=icon]){opacity:var(--_list-item-disabled-leading-icon-opacity);--md-icon-color:var(--_list-item-disabled-leading-icon-color)}.disabled slot[name=end]::slotted([data-variant=icon]){opacity:var(--_list-item-disabled-trailing-icon-opacity);--md-icon-color:var(--_list-item-disabled-trailing-icon-color)}::slotted([data-variant=avatar]){display:inline-flex;justify-content:center;align-items:center;background-color:var(--_list-item-leading-avatar-color);height:var(--_list-item-leading-avatar-size);width:var(--_list-item-leading-avatar-size);border-radius:var(--_list-item-leading-avatar-shape);color:var(--_list-item-leading-avatar-label-color);font:var(--_list-item-leading-avatar-label-type)}::slotted([data-variant=video]),::slotted([data-variant=video-large]){display:inline-flex;object-fit:cover;height:var(--_list-item-small-leading-video-height);width:var(--_list-item-leading-video-width);border-radius:var(--_list-item-leading-video-shape);margin-inline-start:var(--_list-item-leading-video-leading-space);padding-block:calc((var(--_list-item-three-line-container-height) - var(--_list-item-small-leading-video-height))/2)}.with-three-line ::slotted([data-variant=video]),.with-three-line ::slotted([data-variant=video-large]){padding-block:0}::slotted([data-variant=video-large]){padding-block:calc((var(--_list-item-three-line-container-height) - var(--_list-item-large-leading-video-height))/2);height:var(--_list-item-large-leading-video-height)}/*# sourceMappingURL=list-item-styles.css.map */
`;
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let MdListItem = class MdListItem2 extends ListItemEl {
};
MdListItem.styles = [styles$7, styles$8];
MdListItem = __decorate([
  e$a("md-list-item")
], MdListItem);
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class ListItemLink extends ListItemEl {
  renderListItem(content) {
    return x`
      <a
          tabindex=${this.disabled ? -1 : this.itemTabIndex}
          role=${this.listItemRole}
          aria-selected=${this.ariaSelected || A}
          aria-checked=${this.ariaChecked || A}
          class="list-item ${o$1(this.getRenderClasses())}"
          href=${this.href}
          target=${this.target || A}
          @pointerdown=${this.onPointerdown}
          @focus=${this.onFocus}
          @blur=${this.onBlur}
          @click=${this.onClick}
          @pointerenter=${this.onPointerenter}
          @pointerleave=${this.onPointerleave}
          @keydown=${this.onKeydown}
          ${ripple(this.getRipple)}>${content}</a>`;
  }
}
__decorate([
  e$9()
], ListItemLink.prototype, "href", void 0);
__decorate([
  e$9()
], ListItemLink.prototype, "target", void 0);
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let MdListItemLink = class MdListItemLink2 extends ListItemLink {
};
MdListItemLink.styles = [styles$7, styles$8];
MdListItemLink = __decorate([
  e$a("md-list-item-link")
], MdListItemLink);
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class Divider extends s$2 {
  constructor() {
    super(...arguments);
    this.inset = false;
    this.insetStart = false;
    this.insetEnd = false;
  }
}
__decorate([
  e$9({ type: Boolean, reflect: true })
], Divider.prototype, "inset", void 0);
__decorate([
  e$9({ type: Boolean, reflect: true, attribute: "inset-start" })
], Divider.prototype, "insetStart", void 0);
__decorate([
  e$9({ type: Boolean, reflect: true, attribute: "inset-end" })
], Divider.prototype, "insetEnd", void 0);
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$6 = i$4`:host{--_color: var(--md-divider-color, var(--md-sys-color-outline-variant, #cac4d0));--_thickness: var(--md-divider-thickness, 1px);box-sizing:border-box;color:var(--_color);display:flex;height:var(--_thickness);width:100%}:host([inset]),:host([inset-start]){padding-inline-start:16px}:host([inset]),:host([inset-end]){padding-inline-end:16px}:host::before{background:currentColor;content:"";height:100%;width:100%}@media(forced-colors: active){:host::before{background:CanvasText}}/*# sourceMappingURL=divider-styles.css.map */
`;
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let MdDivider = class MdDivider2 extends Divider {
};
MdDivider.styles = [styles$6];
MdDivider = __decorate([
  e$a("md-divider")
], MdDivider);
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$5 = i$4`@media(forced-colors: active){.menu{border-style:solid;border-color:CanvasText;border-width:1px}}/*# sourceMappingURL=forced-colors-styles.css.map */
`;
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class CloseMenuEvent extends Event {
  constructor(initiator, reason) {
    super("close-menu", { bubbles: true, composed: true });
    this.initiator = initiator;
    this.reason = reason;
    this.itemPath = [initiator];
  }
}
const DefaultCloseMenuEvent = CloseMenuEvent;
class DeactivateItemsEvent extends Event {
  constructor() {
    super("deactivate-items", { bubbles: true, composed: true });
  }
}
class DeactivateTypeaheadEvent extends Event {
  constructor() {
    super("deactivate-typeahead", { bubbles: true, composed: true });
  }
}
class ActivateTypeaheadEvent extends Event {
  constructor() {
    super("activate-typeahead", { bubbles: true, composed: true });
  }
}
const NAVIGABLE_KEY = {
  UP: "ArrowUp",
  DOWN: "ArrowDown",
  RIGHT: "ArrowRight",
  LEFT: "ArrowLeft"
};
const SELECTION_KEY = {
  SPACE: "Space",
  ENTER: "Enter"
};
const CLOSE_REASON = {
  CLICK_SELECTION: "CLICK_SELECTION",
  KEYDOWN: "KEYDOWN"
};
const KEYDOWN_CLOSE_KEYS = {
  ESCAPE: "Escape",
  SPACE: SELECTION_KEY.SPACE,
  ENTER: SELECTION_KEY.ENTER
};
function isClosableKey(code) {
  return Object.values(KEYDOWN_CLOSE_KEYS).some((value) => value === code);
}
function isElementInSubtree(target, container) {
  const focusEv = new Event("md-contains", { bubbles: true, composed: true });
  let composedPath = [];
  const listener = (ev) => {
    composedPath = ev.composedPath();
  };
  container.addEventListener("md-contains", listener);
  target.dispatchEvent(focusEv);
  container.removeEventListener("md-contains", listener);
  const isContained = composedPath.length > 0;
  return isContained;
}
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class SurfacePositionController {
  /**
   * @param host The host to connect the controller to.
   * @param getProperties A function that returns the properties for the
   * controller.
   */
  constructor(host, getProperties) {
    this.host = host;
    this.getProperties = getProperties;
    this.surfaceStylesInternal = {
      "display": "none"
    };
    this.lastValues = { isOpen: false };
    this.host.addController(this);
  }
  /**
   * The StyleInfo map to apply to the surface via Lit's stylemap
   */
  get surfaceStyles() {
    return this.surfaceStylesInternal;
  }
  /**
   * Calculates the surface's new position required so that the surface's
   * `surfaceCorner` aligns to the anchor's `anchorCorner` while keeping the
   * surface inside the window viewport. This positioning also respects RTL by
   * checking `getComputedStyle()` on the surface element.
   */
  async position() {
    const { surfaceEl, anchorEl, anchorCorner: anchorCornerRaw, surfaceCorner: surfaceCornerRaw, isTopLayer: topLayerRaw, xOffset, yOffset } = this.getProperties();
    const anchorCorner = anchorCornerRaw.toUpperCase().trim();
    const surfaceCorner = surfaceCornerRaw.toUpperCase().trim();
    if (!surfaceEl || !anchorEl) {
      return;
    }
    this.surfaceStylesInternal = {
      "display": "block",
      "opacity": "0"
    };
    this.host.requestUpdate();
    await this.host.updateComplete;
    const surfaceRect = surfaceEl.getSurfacePositionClientRect ? surfaceEl.getSurfacePositionClientRect() : surfaceEl.getBoundingClientRect();
    const anchorRect = anchorEl.getSurfacePositionClientRect ? anchorEl.getSurfacePositionClientRect() : anchorEl.getBoundingClientRect();
    const [surfaceBlock, surfaceInline] = surfaceCorner.split("_");
    const [anchorBlock, anchorInline] = anchorCorner.split("_");
    const isTopLayer = topLayerRaw ? 1 : 0;
    const isLTR = getComputedStyle(surfaceEl).direction === "ltr" ? 1 : 0;
    const isRTL = isLTR ? 0 : 1;
    const isSurfaceInlineStart = surfaceInline === "START" ? 1 : 0;
    const isSurfaceInlineEnd = surfaceInline === "END" ? 1 : 0;
    const isSurfaceBlockStart = surfaceBlock === "START" ? 1 : 0;
    const isSurfaceBlockEnd = surfaceBlock === "END" ? 1 : 0;
    const isOneInlineEnd = anchorInline !== surfaceInline ? 1 : 0;
    const isOneBlockEnd = anchorBlock !== surfaceBlock ? 1 : 0;
    const inlineAnchorOffset = isOneInlineEnd * anchorRect.width + xOffset;
    const inlineTopLayerOffsetLTR = isSurfaceInlineStart * anchorRect.left + isSurfaceInlineEnd * (window.innerWidth - anchorRect.right);
    const inlineTopLayerOffsetRTL = isSurfaceInlineStart * (window.innerWidth - anchorRect.right) + isSurfaceInlineEnd * anchorRect.left;
    const inlineTopLayerOffset = isLTR * inlineTopLayerOffsetLTR + isRTL * inlineTopLayerOffsetRTL;
    const inlineOutOfBoundsCorrection = Math.min(0, window.innerWidth - inlineTopLayerOffset - inlineAnchorOffset - surfaceRect.width);
    const inline = isTopLayer * inlineTopLayerOffset + inlineAnchorOffset + inlineOutOfBoundsCorrection;
    const blockAnchorOffset = isOneBlockEnd * anchorRect.height + yOffset;
    const blockTopLayerOffset = isSurfaceBlockStart * anchorRect.top + isSurfaceBlockEnd * (window.innerHeight - anchorRect.bottom);
    const blockOutOfBoundsCorrection = Math.min(0, window.innerHeight - blockTopLayerOffset - blockAnchorOffset - surfaceRect.height);
    const block = isTopLayer * blockTopLayerOffset + blockAnchorOffset + blockOutOfBoundsCorrection;
    const surfaceBlockProperty = surfaceBlock === "START" ? "inset-block-start" : "inset-block-end";
    const surfaceInlineProperty = surfaceInline === "START" ? "inset-inline-start" : "inset-inline-end";
    this.surfaceStylesInternal = {
      "display": "block",
      "opacity": "1",
      [surfaceBlockProperty]: `${block}px`,
      [surfaceInlineProperty]: `${inline}px`
    };
    this.host.requestUpdate();
  }
  hostUpdate() {
    this.onUpdate();
  }
  hostUpdated() {
    this.onUpdate();
  }
  /**
   * Checks whether the properties passed into the controller have changed since
   * the last positioning. If so, it will reposition if the surface is open or
   * close it if the surface should close.
   */
  async onUpdate() {
    const props = this.getProperties();
    let hasChanged2 = false;
    for (const [key, value] of Object.entries(props)) {
      hasChanged2 = hasChanged2 || value !== this.lastValues[key];
      if (hasChanged2)
        break;
    }
    const openChanged = this.lastValues.isOpen !== props.isOpen;
    const hasAnchor = !!props.anchorEl;
    const hasSurface = !!props.surfaceEl;
    if (hasChanged2 && hasAnchor && hasSurface) {
      this.lastValues.isOpen = props.isOpen;
      if (props.isOpen) {
        this.lastValues = props;
        await this.position();
        props.onOpen();
      } else if (openChanged) {
        await props.beforeClose();
        this.close();
        props.onClose();
      }
    }
  }
  /**
   * Hides the surface.
   */
  close() {
    this.surfaceStylesInternal = {
      "display": "none"
    };
    this.host.requestUpdate();
  }
}
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const TYPEAHEAD_RECORD = {
  INDEX: 0,
  ITEM: 1,
  TEXT: 2
};
class TypeaheadController {
  /**
   * @param getProperties A function that returns the options of the typeahead
   * controller:
   *
   * {
   *   getItems: A function that returns an array of menu items to be searched.
   *   typeaheadBufferTime: The maximum time between each keystroke to keep the
   *       current type buffer alive.
   * }
   */
  constructor(getProperties) {
    this.getProperties = getProperties;
    this.typeaheadRecords = [];
    this.typaheadBuffer = "";
    this.cancelTypeaheadTimeout = 0;
    this.isTypingAhead = false;
    this.lastActiveRecord = null;
    this.onKeydown = (e2) => {
      if (this.isTypingAhead) {
        this.typeahead(e2);
      } else {
        this.beginTypeahead(e2);
      }
    };
    this.endTypeahead = () => {
      this.isTypingAhead = false;
      this.typaheadBuffer = "";
      this.typeaheadRecords = [];
    };
  }
  get items() {
    return this.getProperties().getItems();
  }
  get active() {
    return this.getProperties().active;
  }
  /**
   * Sets up typingahead
   */
  beginTypeahead(e2) {
    if (!this.active) {
      return;
    }
    if (e2.code === "Space" || e2.code === "Enter" || e2.code.startsWith("Arrow") || e2.code === "Escape") {
      return;
    }
    this.isTypingAhead = true;
    this.typeaheadRecords = this.items.map((el, index2) => [index2, el, el.headline.trim().toLowerCase()]);
    this.lastActiveRecord = this.typeaheadRecords.find((record) => record[TYPEAHEAD_RECORD.ITEM].active) ?? null;
    if (this.lastActiveRecord) {
      this.lastActiveRecord[TYPEAHEAD_RECORD.ITEM].active = false;
    }
    this.typeahead(e2);
  }
  /**
   * Performs the typeahead. Based on the normalized items and the current text
   * buffer, finds the _next_ item with matching text and activates it.
   *
   * @example
   *
   * items: Apple, Banana, Olive, Orange, Cucumber
   * buffer: ''
   * user types: o
   *
   * activates Olive
   *
   * @example
   *
   * items: Apple, Banana, Olive (active), Orange, Cucumber
   * buffer: 'o'
   * user types: l
   *
   * activates Olive
   *
   * @example
   *
   * items: Apple, Banana, Olive (active), Orange, Cucumber
   * buffer: ''
   * user types: o
   *
   * activates Orange
   *
   * @example
   *
   * items: Apple, Banana, Olive, Orange (active), Cucumber
   * buffer: ''
   * user types: o
   *
   * activates Olive
   */
  typeahead(e2) {
    clearTimeout(this.cancelTypeaheadTimeout);
    if (e2.code === "Enter" || e2.code.startsWith("Arrow") || e2.code === "Escape") {
      this.endTypeahead();
      if (this.lastActiveRecord) {
        this.lastActiveRecord[TYPEAHEAD_RECORD.ITEM].active = false;
      }
      return;
    }
    if (e2.code === "Space") {
      e2.stopPropagation();
      e2.preventDefault();
    }
    this.cancelTypeaheadTimeout = setTimeout(this.endTypeahead, this.getProperties().typeaheadBufferTime);
    this.typaheadBuffer += e2.key.toLowerCase();
    const lastActiveIndex = this.lastActiveRecord ? this.lastActiveRecord[TYPEAHEAD_RECORD.INDEX] : -1;
    const numRecords = this.typeaheadRecords.length;
    const rebaseIndexOnActive = (record) => {
      return (record[TYPEAHEAD_RECORD.INDEX] + numRecords - lastActiveIndex) % numRecords;
    };
    const matchingRecords = this.typeaheadRecords.filter((record) => !record[TYPEAHEAD_RECORD.ITEM].disabled && record[TYPEAHEAD_RECORD.TEXT].startsWith(this.typaheadBuffer)).sort((a2, b) => rebaseIndexOnActive(a2) - rebaseIndexOnActive(b));
    if (matchingRecords.length === 0) {
      clearTimeout(this.cancelTypeaheadTimeout);
      if (this.lastActiveRecord) {
        this.lastActiveRecord[TYPEAHEAD_RECORD.ITEM].active = false;
      }
      this.endTypeahead();
      return;
    }
    const isNewQuery = this.typaheadBuffer.length === 1;
    let nextRecord;
    if (this.lastActiveRecord === matchingRecords[0] && isNewQuery) {
      nextRecord = matchingRecords[1] ?? matchingRecords[0];
    } else {
      nextRecord = matchingRecords[0];
    }
    if (this.lastActiveRecord) {
      this.lastActiveRecord[TYPEAHEAD_RECORD.ITEM].active = false;
    }
    this.lastActiveRecord = nextRecord;
    nextRecord[TYPEAHEAD_RECORD.ITEM].active = true;
    return;
  }
}
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
var _a$2;
const DEFAULT_TYPEAHEAD_BUFFER_TIME = 200;
function getFocusedElement(activeDoc = document) {
  const activeEl = activeDoc.activeElement;
  if (!activeEl) {
    return null;
  }
  if (activeEl.shadowRoot) {
    return getFocusedElement(activeEl.shadowRoot) ?? activeEl;
  }
  return activeEl;
}
class Menu extends s$2 {
  constructor() {
    super(...arguments);
    this.anchor = null;
    this.fixed = false;
    this.quick = false;
    this.hasOverflow = false;
    this.open = false;
    this.xOffset = 0;
    this.yOffset = 0;
    this.listTabIndex = 0;
    this.type = "menu";
    this.typeaheadBufferTime = DEFAULT_TYPEAHEAD_BUFFER_TIME;
    this.anchorCorner = "END_START";
    this.menuCorner = "START_START";
    this.stayOpenOnOutsideClick = false;
    this.stayOpenOnFocusout = false;
    this.skipRestoreFocus = false;
    this.defaultFocus = "LIST_ROOT";
    this.typeaheadActive = true;
    this.openCloseAnimationSignal = createAnimationSignal();
    this.lastFocusedElement = null;
    this.typeaheadController = new TypeaheadController(() => {
      return {
        getItems: () => this.items,
        typeaheadBufferTime: this.typeaheadBufferTime,
        active: this.typeaheadActive
      };
    });
    this.menuPositionController = new SurfacePositionController(this, () => {
      return {
        anchorCorner: this.anchorCorner,
        surfaceCorner: this.menuCorner,
        surfaceEl: this.surfaceEl,
        anchorEl: this.anchor,
        isTopLayer: this.fixed,
        isOpen: this.open,
        xOffset: this.xOffset,
        yOffset: this.yOffset,
        onOpen: this.onOpened,
        beforeClose: this.beforeClose,
        onClose: this.onClosed
      };
    });
    this.onOpened = () => {
      this.lastFocusedElement = getFocusedElement();
      if (!this.listElement)
        return;
      const items = this.listElement.items;
      const activeItemRecord = List.getActiveItem(items);
      if (activeItemRecord && this.defaultFocus !== "NONE") {
        activeItemRecord.item.active = false;
      }
      switch (this.defaultFocus) {
        case "FIRST_ITEM":
          const first = List.getFirstActivatableItem(items);
          if (first) {
            first.active = true;
          }
          break;
        case "LAST_ITEM":
          const last = List.getLastActivatableItem(items);
          if (last) {
            last.active = true;
          }
          break;
        case "LIST_ROOT":
          this.listElement?.focus();
          break;
        default:
        case "NONE":
          break;
      }
      if (this.quick) {
        this.dispatchEvent(new Event("opening"));
        this.dispatchEvent(new Event("opened"));
      } else {
        this.animateOpen();
      }
    };
    this.beforeClose = async () => {
      this.open = false;
      if (!this.skipRestoreFocus) {
        this.lastFocusedElement?.focus?.();
      }
      if (!this.quick) {
        await this.animateClose();
      }
    };
    this.onClosed = () => {
      if (this.quick) {
        this.dispatchEvent(new Event("closing"));
        this.dispatchEvent(new Event("closed"));
      }
    };
    this.onWindowClick = (e2) => {
      if (!this.stayOpenOnOutsideClick && !e2.composedPath().includes(this)) {
        this.open = false;
      }
    };
  }
  /**
   * Whether the menu is animating upwards or downwards when opening. This is
   * helpful for calculating some animation calculations.
   */
  get openDirection() {
    const menuCornerBlock = this.menuCorner.split("_")[0];
    return menuCornerBlock === "START" ? "DOWN" : "UP";
  }
  /**
   * The menu items associated with this menu. The items must be `MenuItem`s and
   * have both the `md-menu-item` and `md-list-item` attributes.
   */
  get items() {
    const listElement = this.listElement;
    if (listElement) {
      return listElement.items.filter((el) => el.hasAttribute("md-menu-item"));
    }
    return [];
  }
  render() {
    return this.renderSurface();
  }
  /**
   * Renders the positionable surface element and its contents.
   */
  renderSurface() {
    return x`
       <div
          class="menu ${o$1(this.getSurfaceClasses())}"
          style=${o2(this.menuPositionController.surfaceStyles)}
          @focusout=${this.handleFocusout}>
        ${this.renderElevation()}
        ${this.renderList()}
        ${this.renderFocusRing()}
       </div>
     `;
  }
  /**
   * Renders the List element and its items
   */
  renderList() {
    const { ariaLabel } = this;
    return x`
      <md-list
          aria-label=${ariaLabel || A}
          type=${this.type}
          listTabIndex=${this.listTabIndex}
          @focus=${this.handleListFocus}
          @blur=${this.handleListBlur}
          @click=${this.handleListClick}
          @keydown=${this.handleListKeydown}>
        ${this.renderMenuItems()}
      </md-list>`;
  }
  /**
   * Renders the menu items' slot
   */
  renderMenuItems() {
    return x`<slot
        @close-menu=${this.onCloseMenu}
        @deactivate-items=${this.onDeactivateItems}
        @deactivate-typeahead=${this.handleDeactivateTypeahead}
        @activate-typeahead=${this.handleActivateTypeahead}></slot>`;
  }
  /**
   * Renders the elevation component.
   */
  renderElevation() {
    return x`<md-elevation></md-elevation>`;
  }
  /**
   * Renders the focus ring component.
   */
  renderFocusRing() {
    return x`<md-focus-ring></md-focus-ring>`;
  }
  getSurfaceClasses() {
    return {
      open: this.open,
      fixed: this.fixed,
      "has-overflow": this.hasOverflow
    };
  }
  async handleFocusout(e2) {
    if (this.stayOpenOnFocusout) {
      return;
    }
    e2.stopPropagation();
    if (e2.relatedTarget) {
      if (isElementInSubtree(e2.relatedTarget, this)) {
        return;
      }
    }
    const oldRestoreFocus = this.skipRestoreFocus;
    this.skipRestoreFocus = true;
    this.close();
    await this.updateComplete;
    this.skipRestoreFocus = oldRestoreFocus;
  }
  handleListFocus() {
    this.focusRing.visible = shouldShowStrongFocus();
  }
  handleListClick() {
    pointerPress();
    this.focusRing.visible = shouldShowStrongFocus();
  }
  // Capture so that we can grab the event before it reaches the list item
  // istelf. Specifically useful for the case where typeahead encounters a space
  // and we don't want the menu item to close the menu.
  handleListKeydown(e2) {
    this.typeaheadController.onKeydown(e2);
  }
  handleListBlur() {
    this.focusRing.visible = false;
  }
  /**
   * Performs the opening animation:
   *
   * https://direct.googleplex.com/#/spec/295000003+271060003
   */
  animateOpen() {
    const surfaceEl = this.surfaceEl;
    const slotEl = this.slotEl;
    if (!surfaceEl || !slotEl)
      return;
    const openDirection = this.openDirection;
    this.dispatchEvent(new Event("opening"));
    surfaceEl.classList.toggle("animating", true);
    const signal = this.openCloseAnimationSignal.start();
    const height = surfaceEl.offsetHeight;
    const openingUpwards = openDirection === "UP";
    const children = this.items;
    const FULL_DURATION = 500;
    const SURFACE_OPACITY_DURATION = 50;
    const ITEM_OPACITY_DURATION = 250;
    const DELAY_BETWEEN_ITEMS = (FULL_DURATION - ITEM_OPACITY_DURATION) / children.length;
    const surfaceHeightAnimation = surfaceEl.animate([{ height: "0px" }, { height: `${height}px` }], {
      duration: FULL_DURATION,
      easing: EASING.EMPHASIZED
    });
    const upPositionCorrectionAnimation = slotEl.animate([
      { transform: openingUpwards ? `translateY(-${height}px)` : "" },
      { transform: "" }
    ], { duration: FULL_DURATION, easing: EASING.EMPHASIZED });
    const surfaceOpacityAnimation = surfaceEl.animate([{ opacity: 0 }, { opacity: 1 }], SURFACE_OPACITY_DURATION);
    const childrenAnimations = [];
    for (let i3 = 0; i3 < children.length; i3++) {
      const directionalIndex = openingUpwards ? children.length - 1 - i3 : i3;
      const child = children[directionalIndex];
      const animation = child.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: ITEM_OPACITY_DURATION,
        delay: DELAY_BETWEEN_ITEMS * i3
      });
      child.classList.toggle("hidden", true);
      animation.addEventListener("finish", () => {
        child.classList.toggle("hidden", false);
      });
      childrenAnimations.push([child, animation]);
    }
    signal.addEventListener("abort", () => {
      surfaceHeightAnimation.cancel();
      upPositionCorrectionAnimation.cancel();
      surfaceOpacityAnimation.cancel();
      childrenAnimations.forEach(([child, animation]) => {
        child.classList.toggle("hidden", false);
        animation.cancel();
      });
    });
    surfaceHeightAnimation.addEventListener("finish", () => {
      surfaceEl.classList.toggle("animating", false);
      this.openCloseAnimationSignal.finish();
      this.dispatchEvent(new Event("opened"));
    });
  }
  /**
   * Performs the closing animation:
   *
   * https://direct.googleplex.com/#/spec/295000003+271060003
   */
  animateClose() {
    let resolve2;
    let reject;
    const animationEnded = new Promise((res, rej) => {
      resolve2 = res;
      reject = rej;
    });
    const surfaceEl = this.surfaceEl;
    const slotEl = this.slotEl;
    if (!surfaceEl || !slotEl) {
      reject();
      return animationEnded;
    }
    const openDirection = this.openDirection;
    const closingDownwards = openDirection === "UP";
    this.dispatchEvent(new Event("closing"));
    surfaceEl.classList.toggle("animating", true);
    const signal = this.openCloseAnimationSignal.start();
    const height = surfaceEl.offsetHeight;
    const children = this.items;
    const FULL_DURATION = 150;
    const SURFACE_OPACITY_DURATION = 50;
    const SURFACE_OPACITY_DELAY = FULL_DURATION - SURFACE_OPACITY_DURATION;
    const ITEM_OPACITY_DURATION = 50;
    const ITEM_OPACITY_INITIAL_DELAY = 50;
    const END_HEIGHT_PRECENTAGE = 0.35;
    const DELAY_BETWEEN_ITEMS = (FULL_DURATION - ITEM_OPACITY_INITIAL_DELAY - ITEM_OPACITY_DURATION) / children.length;
    const surfaceHeightAnimation = surfaceEl.animate([
      { height: `${height}px` },
      { height: `${height * END_HEIGHT_PRECENTAGE}px` }
    ], {
      duration: FULL_DURATION,
      easing: EASING.EMPHASIZED_ACCELERATE
    });
    const downPositionCorrectionAnimation = slotEl.animate([
      { transform: "" },
      {
        transform: closingDownwards ? `translateY(-${height * (1 - END_HEIGHT_PRECENTAGE)}px)` : ""
      }
    ], { duration: FULL_DURATION, easing: EASING.EMPHASIZED_ACCELERATE });
    const surfaceOpacityAnimation = surfaceEl.animate([{ opacity: 1 }, { opacity: 0 }], { duration: SURFACE_OPACITY_DURATION, delay: SURFACE_OPACITY_DELAY });
    const childrenAnimations = [];
    for (let i3 = 0; i3 < children.length; i3++) {
      const directionalIndex = closingDownwards ? i3 : children.length - 1 - i3;
      const child = children[directionalIndex];
      const animation = child.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: ITEM_OPACITY_DURATION,
        delay: ITEM_OPACITY_INITIAL_DELAY + DELAY_BETWEEN_ITEMS * i3
      });
      animation.addEventListener("finish", () => {
        child.classList.toggle("hidden", true);
      });
      childrenAnimations.push([child, animation]);
    }
    signal.addEventListener("abort", () => {
      surfaceHeightAnimation.cancel();
      downPositionCorrectionAnimation.cancel();
      surfaceOpacityAnimation.cancel();
      childrenAnimations.forEach(([child, animation]) => {
        animation.cancel();
        child.classList.toggle("hidden", false);
      });
      reject();
    });
    surfaceHeightAnimation.addEventListener("finish", () => {
      surfaceEl.classList.toggle("animating", false);
      childrenAnimations.forEach(([child]) => {
        child.classList.toggle("hidden", false);
      });
      this.openCloseAnimationSignal.finish();
      this.dispatchEvent(new Event("closed"));
      resolve2(true);
    });
    return animationEnded;
  }
  connectedCallback() {
    super.connectedCallback();
    {
      window.addEventListener("click", this.onWindowClick, { capture: true });
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    {
      window.removeEventListener("click", this.onWindowClick, { capture: true });
    }
  }
  onCloseMenu(e2) {
    this.close();
  }
  onDeactivateItems(e2) {
    e2.stopPropagation();
    const items = this.items;
    for (const item of items) {
      item.active = false;
      item.selected = false;
    }
  }
  handleDeactivateTypeahead(e2) {
    e2.stopPropagation();
    this.typeaheadActive = false;
  }
  handleActivateTypeahead(e2) {
    e2.stopPropagation();
    this.typeaheadActive = true;
  }
  focus() {
    this.listElement?.focus();
  }
  close() {
    this.open = false;
    this.items.forEach((item) => {
      item.close?.();
    });
  }
  show() {
    this.open = true;
  }
}
_a$2 = Menu;
(() => {
  requestUpdateOnAriaChange(_a$2);
})();
__decorate([
  i$5("md-list")
], Menu.prototype, "listElement", void 0);
__decorate([
  i$5(".menu")
], Menu.prototype, "surfaceEl", void 0);
__decorate([
  i$5("slot")
], Menu.prototype, "slotEl", void 0);
__decorate([
  i$5("md-focus-ring")
], Menu.prototype, "focusRing", void 0);
__decorate([
  e$9({ attribute: false })
], Menu.prototype, "anchor", void 0);
__decorate([
  e$9({ type: Boolean })
], Menu.prototype, "fixed", void 0);
__decorate([
  e$9({ type: Boolean })
], Menu.prototype, "quick", void 0);
__decorate([
  e$9({ type: Boolean, attribute: "has-overflow" })
], Menu.prototype, "hasOverflow", void 0);
__decorate([
  e$9({ type: Boolean, reflect: true })
], Menu.prototype, "open", void 0);
__decorate([
  e$9({ type: Number, attribute: "x-offset" })
], Menu.prototype, "xOffset", void 0);
__decorate([
  e$9({ type: Number, attribute: "y-offset" })
], Menu.prototype, "yOffset", void 0);
__decorate([
  e$9({ type: Number, attribute: "list-tab-index" })
], Menu.prototype, "listTabIndex", void 0);
__decorate([
  e$9()
], Menu.prototype, "type", void 0);
__decorate([
  e$9({ type: Number, attribute: "typeahead-delay" })
], Menu.prototype, "typeaheadBufferTime", void 0);
__decorate([
  e$9({ attribute: "anchor-corner" })
], Menu.prototype, "anchorCorner", void 0);
__decorate([
  e$9({ attribute: "menu-corner" })
], Menu.prototype, "menuCorner", void 0);
__decorate([
  e$9({ type: Boolean, attribute: "stay-open-on-outside-click" })
], Menu.prototype, "stayOpenOnOutsideClick", void 0);
__decorate([
  e$9({ type: Boolean, attribute: "stay-open-on-focusout" })
], Menu.prototype, "stayOpenOnFocusout", void 0);
__decorate([
  e$9({ type: Boolean, attribute: "skip-restore-focus" })
], Menu.prototype, "skipRestoreFocus", void 0);
__decorate([
  e$9({ attribute: "default-focus" })
], Menu.prototype, "defaultFocus", void 0);
__decorate([
  t$3()
], Menu.prototype, "typeaheadActive", void 0);
__decorate([
  e$8({ capture: true })
], Menu.prototype, "handleListKeydown", null);
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$4 = i$4`:host{--_container-color: var(--md-menu-container-color, var(--md-sys-color-surface-container, #f3edf7));--_container-elevation: var(--md-menu-container-elevation, 2);--_container-shadow-color: var(--md-menu-container-shadow-color, var(--md-sys-color-shadow, #000));--_container-shape: var(--md-menu-container-shape, 4px);--md-list-container-color: var(--_container-color);--md-elevation-level:var(--_container-elevation);--md-elevation-shadow-color:var(--_container-shadow-color);--md-focus-ring-shape-start-start:var(--md-focus-ring-shape, var(--_container-shape));--md-focus-ring-shape-start-end:var(--md-focus-ring-shape, var(--_container-shape));--md-focus-ring-shape-end-end:var(--md-focus-ring-shape, var(--_container-shape));--md-focus-ring-shape-end-start:var(--md-focus-ring-shape, var(--_container-shape));min-width:300px}.menu{border-radius:var(--_container-shape);display:none;opacity:0;z-index:20;position:absolute;user-select:none;max-height:inherit;height:inherit;min-width:inherit}.menu.fixed{position:fixed}.menu md-list{height:inherit;max-height:inherit;display:block;overflow:auto;min-width:inherit;border-radius:inherit}.menu.has-overflow md-list{overflow:visible}.menu.animating md-list{pointer-events:none;overflow:hidden}.menu.animating ::slotted(.hidden){opacity:0}.menu slot{display:block;height:inherit;max-height:inherit}/*# sourceMappingURL=menu-styles.css.map */
`;
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let MdMenu = class MdMenu2 extends Menu {
};
MdMenu.styles = [styles$4, styles$5];
MdMenu = __decorate([
  e$a("md-menu")
], MdMenu);
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$3 = i$4`@media(forced-colors: active){.list-item{position:relative}:host([selected]) .list-item:not(:has(.focus-ring[visible]))::before{content:"";position:absolute;inset:0;box-sizing:border-box;border-radius:inherit;pointer-events:none;border:3px double CanvasText}}/*# sourceMappingURL=forced-colors-styles.css.map */
`;
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class MenuItemEl extends ListItemEl {
  constructor() {
    super(...arguments);
    this.isMenuItem = true;
    this.keepOpen = false;
    this.keepOpenOnClick = false;
    this.listItemRole = "menuitem";
  }
  onClick() {
    if (this.keepOpen || this.keepOpenOnClick)
      return;
    this.dispatchEvent(new DefaultCloseMenuEvent(this, { kind: CLOSE_REASON.CLICK_SELECTION }));
  }
  onKeydown(e2) {
    if (this.keepOpen)
      return;
    const keyCode = e2.code;
    if (!e2.defaultPrevented && isClosableKey(keyCode)) {
      e2.preventDefault();
      this.dispatchEvent(new DefaultCloseMenuEvent(this, { kind: CLOSE_REASON.KEYDOWN, key: keyCode }));
    }
  }
}
__decorate([
  e$9({ type: Boolean, attribute: "md-menu-item", reflect: true })
], MenuItemEl.prototype, "isMenuItem", void 0);
__decorate([
  e$9({ type: Boolean, attribute: "keep-open" })
], MenuItemEl.prototype, "keepOpen", void 0);
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$2 = i$4`:host{--_list-item-selected-container-color: var(--md-menu-item-list-item-selected-container-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_list-item-container-color: var(--md-menu-item-list-item-container-color, var(--md-sys-color-surface-container, #f3edf7));--md-list-item-list-item-container-color: var(--_list-item-container-color)}:host([selected]) .list-item{background-color:var(--_list-item-selected-container-color)}.list-item:has(.submenu:hover){--md-ripple-hover-opacity:0}/*# sourceMappingURL=menu-item-styles.css.map */
`;
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let MdMenuItem = class MdMenuItem2 extends MenuItemEl {
};
MdMenuItem.styles = [styles$7, styles$2, styles$8, styles$3];
MdMenuItem = __decorate([
  e$a("md-menu-item")
], MdMenuItem);
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class MenuItemLink extends ListItemLink {
  constructor() {
    super(...arguments);
    this.isMenuItem = true;
    this.keepOpen = false;
    this.keepOpenOnClick = false;
  }
  onClick() {
    if (this.keepOpen || this.keepOpenOnClick)
      return;
    this.dispatchEvent(new DefaultCloseMenuEvent(this, { kind: CLOSE_REASON.CLICK_SELECTION }));
  }
  onKeydown(e2) {
    if (this.keepOpen)
      return;
    const keyCode = e2.code;
    if (!e2.defaultPrevented && isClosableKey(keyCode) && keyCode !== SELECTION_KEY.ENTER) {
      e2.preventDefault();
      this.dispatchEvent(new DefaultCloseMenuEvent(this, { kind: CLOSE_REASON.KEYDOWN, key: keyCode }));
    }
  }
}
__decorate([
  e$9({ type: Boolean, attribute: "md-menu-item", reflect: true })
], MenuItemLink.prototype, "isMenuItem", void 0);
__decorate([
  e$9({ type: Boolean, attribute: "keep-open" })
], MenuItemLink.prototype, "keepOpen", void 0);
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let MdMenuItemLink = class MdMenuItemLink2 extends MenuItemLink {
};
MdMenuItemLink.styles = [styles$7, styles$2, styles$8, styles$3];
MdMenuItemLink = __decorate([
  e$a("md-menu-item-link")
], MdMenuItemLink);
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
function stopPropagation(e2) {
  e2.stopPropagation();
}
class SubMenuItem extends MenuItemEl {
  constructor() {
    super(...arguments);
    this.anchorCorner = "START_END";
    this.menuCorner = "START_START";
    this.hoverOpenDelay = 400;
    this.hoverCloseDelay = 400;
    this.selected = false;
    this.keepOpenOnClick = true;
    this.previousOpenTimeout = 0;
    this.previousCloseTimeout = 0;
    this.onPointerenter = () => {
      clearTimeout(this.previousOpenTimeout);
      clearTimeout(this.previousCloseTimeout);
      if (this.submenuEl?.open)
        return;
      if (!this.hoverOpenDelay) {
        this.show();
      } else {
        this.previousOpenTimeout = setTimeout(() => {
          this.show();
        }, this.hoverOpenDelay);
      }
    };
    this.onPointerleave = () => {
      clearTimeout(this.previousCloseTimeout);
      clearTimeout(this.previousOpenTimeout);
      if (!this.hoverCloseDelay) {
        this.close();
      } else {
        this.previousCloseTimeout = setTimeout(() => {
          this.close();
        }, this.hoverCloseDelay);
      }
    };
  }
  get submenuEl() {
    return this.menus[0];
  }
  onClick() {
    this.show();
  }
  /**
   * On item keydown handles opening the submenu.
   */
  onKeydown(e2) {
    const shouldOpenSubmenu = this.isSubmenuOpenKey(e2.code);
    if (e2.code === SELECTION_KEY.SPACE) {
      e2.preventDefault();
    }
    if (!shouldOpenSubmenu) {
      super.onKeydown(e2);
      return;
    }
    const submenu = this.submenuEl;
    if (!submenu)
      return;
    const submenuItems = submenu.items;
    const firstActivatableItem = List.getFirstActivatableItem(submenuItems);
    if (firstActivatableItem) {
      this.show(() => {
        firstActivatableItem.active = true;
      });
      return;
    }
  }
  /**
   * Render the submenu at the end
   */
  renderEnd() {
    return x`${super.renderEnd()}${this.renderSubMenu()}`;
  }
  /**
   * Renders the slot for the submenu.
   */
  renderSubMenu() {
    return x`<span class="submenu"><slot
        name="submenu"
        @pointerdown=${stopPropagation}
        @click=${stopPropagation}
        @keydown=${this.onSubMenuKeydown}
        @close-menu=${this.onCloseSubmenu}
    ></slot></span>`;
  }
  onCloseSubmenu(e2) {
    e2.itemPath.push(this);
    this.dispatchEvent(new ActivateTypeaheadEvent());
    if (e2.reason.kind === CLOSE_REASON.KEYDOWN && e2.reason.key === KEYDOWN_CLOSE_KEYS.ESCAPE) {
      e2.stopPropagation();
      this.active = true;
      this.selected = false;
      this.listItemRoot.focus();
      return;
    }
    this.active = false;
    this.selected = false;
  }
  async onSubMenuKeydown(e2) {
    e2.stopPropagation();
    const shouldClose = this.isSubmenuCloseKey(e2.code);
    if (!shouldClose)
      return;
    this.close(() => {
      List.deactivateActiveItem(this.submenuEl.items);
      this.listItemRoot.focus();
      this.active = true;
    });
  }
  /**
   * Shows the submenu.
   *
   * @param onOpened A function to call after the menu is opened.
   */
  show(onOpened = () => {
  }) {
    const menu = this.submenuEl;
    if (!menu)
      return;
    menu.quick = true;
    menu.hasOverflow = true;
    menu.anchorCorner = this.anchorCorner;
    menu.menuCorner = this.menuCorner;
    menu.anchor = this;
    menu.defaultFocus = "LIST_ROOT";
    menu.skipRestoreFocus = true;
    const menuAlreadyOpen = menu.open;
    menu.show();
    this.dispatchEvent(new DeactivateItemsEvent());
    this.dispatchEvent(new DeactivateTypeaheadEvent());
    this.selected = true;
    if (menuAlreadyOpen) {
      onOpened();
    } else {
      menu.addEventListener("opened", onOpened, { once: true });
    }
  }
  /**
   * Closes the submenu.
   *
   * @param onClosed A function to call after the menu is closed.
   */
  close(onClosed = () => {
  }) {
    const menu = this.submenuEl;
    if (!menu || !menu.open)
      return;
    this.dispatchEvent(new ActivateTypeaheadEvent());
    menu.quick = true;
    menu.close();
    this.active = false;
    this.selected = false;
    menu.addEventListener("closed", onClosed, { once: true });
  }
  /**
   * Determines whether the given KeyboardEvent code is one that should open
   * the submenu. This is RTL-aware. By default, left, right, space, or enter.
   *
   * @param code The native KeyboardEvent code.
   * @return Whether or not the key code should open the submenu.
   */
  isSubmenuOpenKey(code) {
    const isRtl2 = getComputedStyle(this).direction === "rtl";
    const arrowEnterKey = isRtl2 ? NAVIGABLE_KEY.LEFT : NAVIGABLE_KEY.RIGHT;
    switch (code) {
      case arrowEnterKey:
      case SELECTION_KEY.SPACE:
      case SELECTION_KEY.ENTER:
        return true;
      default:
        return false;
    }
  }
  /**
   * Determines whether the given KeyboardEvent code is one that should close
   * the submenu. This is RTL-aware. By default right, left, or escape.
   *
   * @param code The native KeyboardEvent code.
   * @return Whether or not the key code should close the submenu.
   */
  isSubmenuCloseKey(code) {
    const isRtl2 = getComputedStyle(this).direction === "rtl";
    const arrowEnterKey = isRtl2 ? NAVIGABLE_KEY.RIGHT : NAVIGABLE_KEY.LEFT;
    switch (code) {
      case arrowEnterKey:
      case KEYDOWN_CLOSE_KEYS.ESCAPE:
        return true;
      default:
        return false;
    }
  }
}
__decorate([
  e$9({ attribute: "anchor-corner" })
], SubMenuItem.prototype, "anchorCorner", void 0);
__decorate([
  e$9({ attribute: "menu-corner" })
], SubMenuItem.prototype, "menuCorner", void 0);
__decorate([
  e$9({ type: Number, attribute: "hover-open-delay" })
], SubMenuItem.prototype, "hoverOpenDelay", void 0);
__decorate([
  e$9({ type: Number, attribute: "hover-close-delay" })
], SubMenuItem.prototype, "hoverCloseDelay", void 0);
__decorate([
  e$9({ type: Boolean, reflect: true })
], SubMenuItem.prototype, "selected", void 0);
__decorate([
  l$5({ slot: "submenu", flatten: true })
], SubMenuItem.prototype, "menus", void 0);
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let MdSubMenuItem = class MdSubMenuItem2 extends SubMenuItem {
};
MdSubMenuItem.styles = [styles$7, styles$2, styles$8, styles$3];
MdSubMenuItem = __decorate([
  e$a("md-sub-menu-item")
], MdSubMenuItem);
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
var _a$1;
class LinearProgress extends s$2 {
  constructor() {
    super(...arguments);
    this.indeterminate = false;
    this.progress = 0;
    this.buffer = 1;
    this.fourColors = false;
    this.animationReady = true;
    this.resizeObserver = null;
  }
  // Note, the indeterminate animation is rendered with transform %'s
  // Previously, this was optimized to use px calculated with the resizeObserver
  // due to a now fixed Chrome bug: crbug.com/389359.
  render() {
    const rootClasses = {
      "indeterminate": this.indeterminate,
      "animation-ready": this.animationReady,
      "four-colors": this.fourColors
    };
    const progressStyles = {
      transform: `scaleX(${(this.indeterminate ? 1 : this.progress) * 100}%)`
    };
    const bufferStyles = {
      transform: `scaleX(${(this.indeterminate ? 1 : this.buffer) * 100}%)`
    };
    const { ariaLabel } = this;
    return x`
      <div
          role="progressbar"
          class="linear-progress ${o$1(rootClasses)}"
          aria-label="${ariaLabel || A}"
          aria-valuemin="0"
          aria-valuemax="1"
          aria-valuenow="${this.indeterminate ? A : this.progress}">
        <div class="track"></div>
        <div class="buffer-bar" style=${o2(bufferStyles)}></div>
        <div class="bar primary-bar" style=${o2(progressStyles)}>
          <div class="bar-inner"></div>
        </div>
        <div class="bar secondary-bar">
          <div class="bar-inner"></div>
        </div>
      </div>`;
  }
  async connectedCallback() {
    super.connectedCallback();
    await this.updateComplete;
    if (this.resizeObserver) {
      return;
    }
    this.resizeObserver = new ResizeObserver(() => {
      if (this.indeterminate) {
        this.restartAnimation();
      }
    });
    this.resizeObserver.observe(this.rootEl);
  }
  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    super.disconnectedCallback();
  }
  // When size changes, restart the animation
  // to avoid jank.
  async restartAnimation() {
    await this.updateComplete;
    this.animationReady = false;
    await new Promise(requestAnimationFrame);
    this.animationReady = true;
    await this.updateComplete;
  }
}
_a$1 = LinearProgress;
(() => {
  requestUpdateOnAriaChange(_a$1);
})();
__decorate([
  e$9({ type: Boolean })
], LinearProgress.prototype, "indeterminate", void 0);
__decorate([
  e$9({ type: Number })
], LinearProgress.prototype, "progress", void 0);
__decorate([
  e$9({ type: Number })
], LinearProgress.prototype, "buffer", void 0);
__decorate([
  e$9({ type: Boolean, attribute: "four-colors" })
], LinearProgress.prototype, "fourColors", void 0);
__decorate([
  i$5(".linear-progress")
], LinearProgress.prototype, "rootEl", void 0);
__decorate([
  t$3()
], LinearProgress.prototype, "animationReady", void 0);
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$1 = i$4`:host{--_active-indicator-color: var(--md-linear-progress-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_active-indicator-height: var(--md-linear-progress-active-indicator-height, 4px);--_four-color-active-indicator-four-color: var(--md-linear-progress-four-color-active-indicator-four-color, var(--md-sys-color-tertiary-container, #ffd8e4));--_four-color-active-indicator-one-color: var(--md-linear-progress-four-color-active-indicator-one-color, var(--md-sys-color-primary, #6750a4));--_four-color-active-indicator-three-color: var(--md-linear-progress-four-color-active-indicator-three-color, var(--md-sys-color-tertiary, #7d5260));--_four-color-active-indicator-two-color: var(--md-linear-progress-four-color-active-indicator-two-color, var(--md-sys-color-primary-container, #eaddff));--_track-color: var(--md-linear-progress-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_track-height: var(--md-linear-progress-track-height, 4px);--_track-shape: var(--md-linear-progress-track-shape, 0px);display:block;position:relative;min-inline-size:80px;block-size:var(--_track-height);content-visibility:auto;contain:strict}.linear-progress,.track,.buffer-bar,.bar,.bar-inner{position:absolute}.linear-progress{inset:0;outline:rgba(0,0,0,0) solid 1px;border-radius:var(--_track-shape);overflow:hidden;display:flex;align-items:center}.bar{animation:none;inline-size:100%;block-size:var(--_active-indicator-height);transform-origin:left center;will-change:transform;transition:transform 250ms cubic-bezier(0.4, 0, 0.6, 1)}.secondary-bar{display:none}.bar-inner{inset:0;animation:none;background:var(--_active-indicator-color)}.buffer-bar{background:var(--_track-color);inset:0;will-change:transform;transition:transform 250ms cubic-bezier(0.4, 0, 0.6, 1);transform-origin:left center}.track{inset:0;will-change:transform;animation:linear infinite 250ms;animation-name:buffering;background:0/calc(var(--_track-height) / 2 * 5) 100% radial-gradient(circle at calc(var(--_track-height) / 2 * 2), var(--_track-color) 0, var(--_track-color) calc(var(--_track-height) / 2), transparent calc(var(--_track-height) / 2))}.indeterminate .bar{transition:none}.indeterminate .primary-bar{inset-inline-start:-145.167%}.indeterminate .secondary-bar{inset-inline-start:-54.8889%;display:block}.indeterminate .track{display:none}.indeterminate.animation-ready .primary-bar{will-change:transform;animation:linear infinite 2s;animation-name:primary-indeterminate-translate}.indeterminate.animation-ready .primary-bar>.bar-inner{will-change:transform;animation:linear infinite 2s primary-indeterminate-scale}.indeterminate.animation-ready.four-colors .primary-bar>.bar-inner{animation-name:primary-indeterminate-scale,four-colors;animation-duration:2s,4s}.indeterminate.animation-ready .secondary-bar{will-change:transform;animation:linear infinite 2s;animation-name:secondary-indeterminate-translate}.indeterminate.animation-ready .secondary-bar>.bar-inner{will-change:transform;animation:linear infinite 2s secondary-indeterminate-scale}.indeterminate.animation-ready.four-colors .secondary-bar>.bar-inner{animation-name:secondary-indeterminate-scale,four-colors;animation-duration:2s,4s}:host-context([dir=rtl]) .linear-progress .bar{transform-origin:right center}:host-context([dir=rtl]) .linear-progress .buffer-bar{transform-origin:right center}:host-context([dir=rtl]) .linear-progress .track{animation-name:buffering-rtl}:host-context([dir=rtl]) .linear-progress.indeterminate.animation-ready .primary-bar{animation-name:primary-indeterminate-translate-rtl}:host-context([dir=rtl]) .linear-progress.indeterminate.animation-ready .secondary-bar{animation-name:secondary-indeterminate-translate-rtl}:host([dir=rtl]) .linear-progress .bar{transform-origin:right center}:host([dir=rtl]) .linear-progress .buffer-bar{transform-origin:right center}:host([dir=rtl]) .linear-progress .track{animation-name:buffering-rtl}:host([dir=rtl]) .linear-progress.indeterminate.animation-ready .primary-bar{animation-name:primary-indeterminate-translate-rtl}:host([dir=rtl]) .linear-progress.indeterminate.animation-ready .secondary-bar{animation-name:secondary-indeterminate-translate-rtl}.linear-progress:dir(rtl) .bar{transform-origin:right center}.linear-progress:dir(rtl) .buffer-bar{transform-origin:right center}.linear-progress:dir(rtl) .track{animation-name:buffering-rtl}.linear-progress:dir(rtl).indeterminate.animation-ready .primary-bar{animation-name:primary-indeterminate-translate-rtl}.linear-progress:dir(rtl).indeterminate.animation-ready .secondary-bar{animation-name:secondary-indeterminate-translate-rtl}@keyframes primary-indeterminate-scale{0%{transform:scaleX(0.08)}36.65%{animation-timing-function:cubic-bezier(0.334731, 0.12482, 0.785844, 1);transform:scaleX(0.08)}69.15%{animation-timing-function:cubic-bezier(0.06, 0.11, 0.6, 1);transform:scaleX(0.661479)}100%{transform:scaleX(0.08)}}@keyframes secondary-indeterminate-scale{0%{animation-timing-function:cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);transform:scaleX(0.08)}19.15%{animation-timing-function:cubic-bezier(0.152313, 0.196432, 0.648374, 1.00432);transform:scaleX(0.457104)}44.15%{animation-timing-function:cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);transform:scaleX(0.72796)}100%{transform:scaleX(0.08)}}@keyframes buffering{0%{transform:translateX(calc(1 * calc(var(--_track-height) / 2 * 5)))}}@keyframes primary-indeterminate-translate{0%{transform:translateX(0px)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0px)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(1 * 83.6714%))}100%{transform:translateX(calc(1 * 200.611%))}}@keyframes secondary-indeterminate-translate{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0px)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(calc(1 * 37.6519%))}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(calc(1 * 84.3862%))}100%{transform:translateX(calc(1 * 160.278%))}}@keyframes buffering-rtl{0%{transform:translateX(calc(-1 * calc(var(--_track-height) / 2 * 5)))}}@keyframes primary-indeterminate-translate-rtl{0%{transform:translateX(0px)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0px)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-1 * 83.6714%))}100%{transform:translateX(calc(-1 * 200.611%))}}@keyframes secondary-indeterminate-translate-rtl{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0px)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(calc(-1 * 37.6519%))}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(calc(-1 * 84.3862%))}100%{transform:translateX(calc(-1 * 160.278%))}}@keyframes four-colors{0%{background:var(--_four-color-active-indicator-one-color)}15%{background:var(--_four-color-active-indicator-one-color)}25%{background:var(--_four-color-active-indicator-two-color)}40%{background:var(--_four-color-active-indicator-two-color)}50%{background:var(--_four-color-active-indicator-three-color)}65%{background:var(--_four-color-active-indicator-three-color)}75%{background:var(--_four-color-active-indicator-four-color)}90%{background:var(--_four-color-active-indicator-four-color)}100%{background:var(--_four-color-active-indicator-one-color)}}@media screen and (forced-colors: active){.linear-progress{--_active-indicator-color: canvastext;--_track-color: graytext;border:1px solid canvastext}.indeterminate.linear-progress{--_track-color: canvas}}/*# sourceMappingURL=linear-progress-styles.css.map */
`;
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let MdLinearProgress = class MdLinearProgress2 extends LinearProgress {
};
MdLinearProgress.styles = [styles$1];
MdLinearProgress = __decorate([
  e$a("md-linear-progress")
], MdLinearProgress);
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
var _a;
class CircularProgress extends s$2 {
  constructor() {
    super(...arguments);
    this.progress = 0;
    this.indeterminate = false;
    this.fourColor = false;
  }
  render() {
    const classes = {
      "indeterminate": this.indeterminate,
      "four-color": this.fourColor
    };
    const { ariaLabel } = this;
    return x`
      <div
        class="circular-progress ${o$1(classes)}"
        role="progressbar"
        aria-label="${ariaLabel || A}"
        aria-valuemin="0"
        aria-valuemax="1"
        aria-valuenow="${this.indeterminate ? A : this.progress}">
        ${this.indeterminate ? this.renderIndeterminateContainer() : this.renderDeterminateContainer()}
      </div>
      <slot></slot>`;
  }
  // Determinate mode is rendered with an svg so the progress arc can be
  // easily animated via stroke-dashoffset.
  renderDeterminateContainer() {
    const dashOffset = (1 - this.progress) * 100;
    const pathLength = 100;
    return x`<svg viewBox="0 0 4800 4800">
      <circle class="track" pathLength="${pathLength}"></circle>
      <circle class="progress" pathLength="${pathLength}" stroke-dashoffset="${dashOffset}"></circle>
    </svg>`;
  }
  // Indeterminate mode rendered with 2 bordered-divs. The borders are
  // clipped into half circles by their containers. The divs are then carefully
  // animated to produce changes to the spinner arc size.
  // This approach has 4.5x the FPS of rendering via svg on Chrome 111.
  // See https://lit.dev/playground/#gist=febb773565272f75408ab06a0eb49746.
  renderIndeterminateContainer() {
    return x`
      <div class="spinner">
        <div class="left">
          <div class="circle"></div>
        </div>
        <div class="right">
          <div class="circle"></div>
        </div>
      </div>`;
  }
}
_a = CircularProgress;
(() => {
  requestUpdateOnAriaChange(_a);
})();
__decorate([
  e$9({ type: Number })
], CircularProgress.prototype, "progress", void 0);
__decorate([
  e$9({ type: Boolean })
], CircularProgress.prototype, "indeterminate", void 0);
__decorate([
  e$9({ type: Boolean, attribute: "four-color" })
], CircularProgress.prototype, "fourColor", void 0);
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles = i$4`:host{--_active-indicator-color: var(--md-circular-progress-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_active-indicator-width: var(--md-circular-progress-active-indicator-width, 8.33);--_four-color-active-indicator-four-color: var(--md-circular-progress-four-color-active-indicator-four-color, var(--md-sys-color-tertiary-container, #ffd8e4));--_four-color-active-indicator-one-color: var(--md-circular-progress-four-color-active-indicator-one-color, var(--md-sys-color-primary, #6750a4));--_four-color-active-indicator-three-color: var(--md-circular-progress-four-color-active-indicator-three-color, var(--md-sys-color-tertiary, #7d5260));--_four-color-active-indicator-two-color: var(--md-circular-progress-four-color-active-indicator-two-color, var(--md-sys-color-primary-container, #eaddff));--_size: var(--md-circular-progress-size, 48px);display:inline-flex;vertical-align:middle;min-block-size:var(--_size);min-inline-size:var(--_size);position:relative;align-items:center;justify-content:center;contain:strict;content-visibility:auto}.circular-progress{flex:1;align-self:stretch;margin:4px}.circular-progress,.spinner,.left,.right,.circle,svg,.track,.progress{position:absolute;inset:0}svg{transform:rotate(-90deg)}circle{cx:50%;cy:50%;r:calc(50%*(1 - var(--_active-indicator-width)/100));stroke-width:calc(var(--_active-indicator-width)*1%);stroke-dasharray:100;fill:rgba(0,0,0,0)}.progress{transition:stroke-dashoffset 500ms cubic-bezier(0, 0, 0.2, 1);stroke:var(--_active-indicator-color)}.track{stroke:rgba(0,0,0,0)}.circular-progress.indeterminate{will-change:transform;animation:linear infinite linear-rotate;animation-duration:1568.2352941176ms}.spinner{will-change:transform;animation:infinite both rotate-arc;animation-duration:5332ms;animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.left{overflow:hidden;inset:0 50% 0 0}.right{overflow:hidden;inset:0 0 0 50%}.circle{box-sizing:border-box;border-radius:50%;border:solid calc(var(--_active-indicator-width)/100*(var(--_size) - 8px));border-color:var(--_active-indicator-color) var(--_active-indicator-color) rgba(0,0,0,0) rgba(0,0,0,0);will-change:transform;animation:expand-arc;animation-iteration-count:infinite;animation-fill-mode:both;animation-duration:1333ms,5332ms;animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.four-color .circle{animation-name:expand-arc,four-color}.left .circle{rotate:135deg;inset:0 -100% 0 0}.right .circle{rotate:100deg;inset:0 0 0 -100%;animation-delay:-666.5ms,0ms}@media screen and (forced-colors: active){.progress{stroke:CanvasText}.circle{border-color:CanvasText CanvasText Canvas Canvas}}@keyframes expand-arc{0%{transform:rotate(265deg)}50%{transform:rotate(130deg)}100%{transform:rotate(265deg)}}@keyframes rotate-arc{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}}@keyframes linear-rotate{to{transform:rotate(360deg)}}@keyframes four-color{0%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}15%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}25%{border-top-color:var(--_four-color-active-indicator-two-color);border-right-color:var(--_four-color-active-indicator-two-color)}40%{border-top-color:var(--_four-color-active-indicator-two-color);border-right-color:var(--_four-color-active-indicator-two-color)}50%{border-top-color:var(--_four-color-active-indicator-three-color);border-right-color:var(--_four-color-active-indicator-three-color)}65%{border-top-color:var(--_four-color-active-indicator-three-color);border-right-color:var(--_four-color-active-indicator-three-color)}75%{border-top-color:var(--_four-color-active-indicator-four-color);border-right-color:var(--_four-color-active-indicator-four-color)}90%{border-top-color:var(--_four-color-active-indicator-four-color);border-right-color:var(--_four-color-active-indicator-four-color)}100%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}}/*# sourceMappingURL=circular-progress-styles.css.map */
`;
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let MdCircularProgress = class MdCircularProgress2 extends CircularProgress {
};
MdCircularProgress.styles = [styles];
MdCircularProgress = __decorate([
  e$a("md-circular-progress")
], MdCircularProgress);
const app = createApp(_sfc_main$r);
app.use(Router).mount("#app");