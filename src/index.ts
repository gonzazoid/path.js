export const Path = function<T>(constr: T, path?: string): T{

    const target: String = new (String as any)(path);

    return new Proxy(target, {
      get(target: any, prop: string) {
        return prop in target || typeof prop !== 'string' ? target[prop] :  Path(path ? `${path}.${prop}` : prop);
      },
      set(target: any, prop: string, value: any) {
        return false;
      }
    }) as T;
};
