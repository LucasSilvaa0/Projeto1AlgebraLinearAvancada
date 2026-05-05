export function buildTransitionMatrix(nodes: any[], edges: any[]) {
  const n = nodes.length;
  const indexMap: any = {};

  nodes.forEach((node, i) => {
    indexMap[node.id] = i;
  });

  const matrix = Array.from({ length: n }, () =>
    Array(n).fill(0)
  );

  edges.forEach((edge) => {
    const from = indexMap[edge.source];
    const to = indexMap[edge.target];
    const weight = edge.data.weight;

    matrix[from][to] += weight;
  });

  // normalizar linhas
  for (let i = 0; i < n; i++) {
    let sum = 0;
    for (let j = 0; j < n; j++) sum += matrix[i][j];

    for (let j = 0; j < n; j++) {
      matrix[i][j] /= sum || 1;
    }
  }

  return matrix;
}

export function steadyState(matrix: number[][], iterations = 100) {
  const n = matrix.length;
  let pi = Array(n).fill(1 / n);

  for (let k = 0; k < iterations; k++) {
    const newPi = Array(n).fill(0);

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        newPi[i] += matrix[i][j] * pi[j];
      }
    }

    pi = newPi;
  }

  return pi;
}