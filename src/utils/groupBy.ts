export function groupByKey(array: any, key: string): Array<any> {
  return array.reduce(
    (hash: { [x: string]: any }, obj: { [x: string]: string | number }) => {
      if (obj[key] === undefined) return hash;
      return Object.assign(hash, {
        [obj[key]]: (hash[obj[key]] || []).concat(obj),
      });
    },
    {}
  );
}
