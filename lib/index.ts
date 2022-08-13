class DecoratorUtilClass {
  public decorate() {
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) {
      const originalMethod = descriptor.value;

      console.log(`Evaluation: Target name ${target.constructor.name}`);
      console.log(
        `Evaluation: ${JSON.stringify(
          Object.getOwnPropertyNames(target),
          null,
          2
        )}`
      );

      descriptor.value = function (...args: any[]) {
        console.log(`Call: ${this.constructor.name}`);
        console.log(
          `Evaluation: ${JSON.stringify(
            Object.getOwnPropertyNames(this),
            null,
            2
          )}`
        );

        // Do something before
        const result = originalMethod.call(this, args);
        // Do something after

        return result;
      };

      return descriptor;
    };
  }
}

const decoratorUtil = new DecoratorUtilClass();

class Lambda {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  @decoratorUtil.decorate()
  handler() {
    console.log(`Current Node version ${process.version}`);
    console.log(this.buildGreeting());
  }

  buildGreeting() {
    return "Hello, " + this.greeting;
  }
}

const lambda = new Lambda("world");
module.exports = lambda;
