declare namespace __AdaptedExports {
  /**
   * assembly/index/calc
   * @returns `i64`
   */
  export function calc(): bigint;
}
/** Instantiates the compiled WebAssembly module with the given imports. */
export declare function instantiate(module: WebAssembly.Module, imports: {
}): Promise<typeof __AdaptedExports>;
