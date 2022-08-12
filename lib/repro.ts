import { Context, Callback } from "aws-lambda";
import { Tracer } from "@aws-lambda-powertools/tracer";
import { LambdaInterface } from "@aws-lambda-powertools/commons";

const tracer = new Tracer({ serviceName: "serverlessAirline" });

class BugClass {
  constructor() {}

  private ok(): void {
    console.log("HELLO");
    return;
  }

  @tracer.captureMethod()
  async getFoo(): Promise<void> {
    return this.ok();
  }
}

class Lambda implements LambdaInterface {
  @tracer.captureMethod()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  public async dummyMethod(): Promise<string> {
    return `otherMethod:${this.otherMethod()}`;
  }

  @tracer.captureLambdaHandler()
  public async handler(_event: any, _context: any): Promise<string> {
    const bugClass = new BugClass();
    await bugClass.getFoo();

    return await this.dummyMethod();
  }

  public otherMethod(): string {
    return "otherMethod";
  }
}

export const myFunction = new Lambda();
export const handler = myFunction.handler;
