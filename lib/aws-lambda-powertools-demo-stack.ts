import { Stack, StackProps, Duration } from "aws-cdk-lib";
import { Construct } from "constructs";
import { RetentionDays } from "aws-cdk-lib/aws-logs";
import { Runtime, Tracing } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

export class AwsLambdaPowertoolsDemoStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new NodejsFunction(this, "Lambda", {
      entry: "lib/repro.ts",
      handler: "handler",
      runtime: Runtime.NODEJS_16_X,
      tracing: Tracing.ACTIVE,
      timeout: Duration.seconds(30),
      logRetention: RetentionDays.ONE_DAY,
    });
  }
}
