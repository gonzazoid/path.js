export const Path = function<T>(constr: T, path?: string): T{

    const target: String = new (String as any)(path ? path : '');

    return new Proxy(target, {
      get(target: any, prop: any) {
        return (constr as any)[prop] ? Path((constr as any)[prop], path ? `${path}.${prop}` : prop) : target[prop];
      },
      set(target: any, prop: string, value: any) {
        return false;
      }
    }) as T;
};
