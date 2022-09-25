export const difference = (newState: any[], oldState: any[]): any =>
  newState.filter(
    ({ block_hash: x }) => !oldState.some(({ block_hash: y }) => x === y)
  );

export const intersection = (newState: any[], oldState: any[]): any =>
  newState.filter(({ block_hash: x }) =>
    oldState.some(({ block_hash: y }) => x === y)
  );
