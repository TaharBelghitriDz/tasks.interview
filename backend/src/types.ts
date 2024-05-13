import { ZodObject, ZodRawShape } from "zod";

export interface ControllerResponse {
  status: number;
  json: Record<string, any>;
}

export type Controller<T> = (
  args: T
) => Promise<ControllerResponse> | ControllerResponse;

export type FunctionHandler = <T, Z extends ZodRawShape>(args: {
  zod: ZodObject<Z>;
  parameter: T | null;
  function: (args: T) => Promise<ControllerResponse> | ControllerResponse;
}) => Promise<ControllerResponse>;
