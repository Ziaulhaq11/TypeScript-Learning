//Autobind Decorator
// function autobind(target: any, methodName: string, descriptor: PropertyDescriptor) {
//bc we're not using target and methodName getting errors. To solve this we can use _ variables which indicates typescript that we're not using these else. Or we can turn off useParameters in tsconfig.json
export function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true, //it means we can always change it
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}
