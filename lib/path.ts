export const Path = function<T>(constr: T, path?: string): T{

    const target: string[] = typeof path === 'undefined' ? [] : (Array.isArray(path) ? path : [path]);

    return new Proxy(target, {
      get(target: any, prop: any) {
        return typeof constr === 'object'
        // (typeof prop === 'symbol' && (constr as any).getOwnPropertySymbols().includes(prop))
            && prop in (constr as any)
                ? Path((constr as any)[prop], target.concat([prop]))
                : target[prop];
      },
      set(target: any, prop: string, value: any) {
        return false;
      }
    }) as T;
};
