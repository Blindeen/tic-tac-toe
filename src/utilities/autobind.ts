function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalFunction = descriptor.value;
  const newDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      return originalFunction.bind(this);
    },
  };
  return newDescriptor;
}

export { AutoBind };
