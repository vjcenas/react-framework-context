---
inject: true
to: src/contexts/index.ts
skip_if: export { <%= h.changeCase.pascal(name) %>Provider }
append: true
---

export { <%= h.changeCase.pascal(name) %>Provider } from './<%= h.changeCase.paramCase(name) %>.context';
