// decls/nativewind.d.ts
declare module "nativewind" {
  import type { ComponentType, PropsWithChildren } from "react";
  export const TailwindProvider: ComponentType<PropsWithChildren<any>>;
  export default { TailwindProvider: ComponentType<PropsWithChildren<any>> };
}
