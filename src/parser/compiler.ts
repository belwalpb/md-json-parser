/**
 * Final step in markdown parsing in unified.js
 * @param this The object, to which assign the compiler property
 */
export function compileHast(this: any): any {
  this.Compiler = (tree: any): any => {
    return tree;
  };
}