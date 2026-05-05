import React, { useCallback } from 'react';
import ReactFlow, {
  addEdge,
  Edge,
  Connection,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Node,
} from 'reactflow';
import { buildTransitionMatrix } from '../utils/markov';

import 'reactflow/dist/style.css';

const initialNodes: Node[] = [
  { id: '1', position: { x: 100, y: 100 }, data: { label: '1' } },
  { id: '2', position: { x: 300, y: 200 }, data: { label: '2' } },
];

const initialEdges: Edge[] = [];

export default function Graph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onEdgeClick = (event: any, edge: Edge) => {
    const newWeight = prompt('Digite o novo peso:', edge.data?.weight || '1');

    if (newWeight === null) return;

    const parsed = parseFloat(newWeight);

    if (isNaN(parsed) || parsed < 0) {
        alert('Peso inválido!');
        return;
    }

    setEdges((eds) =>
        eds.map((e) =>
        e.source === edge.source && e.target == edge.target
            ? {
                ...e,
                data: { ...e.data, weight: parsed },
                label: parsed.toString(),
            }
            : e
        )
    );
    
    setEdges((eds) =>
        eds.map((e) =>
        e.target === edge.source && e.source == edge.target
            ? {
                ...e,
                data: { ...e.data, weight: parsed },
                label: parsed.toString(),
            }
            : e
        )
    );

    console.log(buildTransitionMatrix(nodes, edges));
  };

  // 🔁 conectar nós (com aresta dupla automática)
  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => {
      const forward: Edge = {
        id: `${params.source}-${params.target}`,
        source: params.source!,
        target: params.target!,
        data: { weight: 1 },
        label: '1',
      };

      const backward: Edge = {
        id: `${params.target}-${params.source}`,
        source: params.target!,
        target: params.source!,
        data: { weight: 1 },
        label: '1',
      };

      return addEdge(backward, addEdge(forward, eds));
    });
  }, [setEdges]);

  // ➕ adicionar nó com laço automático
  const addNode = () => {
    const id = (nodes.length + 1).toString();

    const newNode: Node = {
      id,
      position: {
        x: Math.random() * 400,
        y: Math.random() * 400,
      },
      data: { label: id },
    };

    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <button
        onClick={addNode}
        style={{
          position: 'absolute',
          left: 10,
          top: 10,
          zIndex: 4,
        }}
      >
        Adicionar vértice
      </button>

      <button
        // onClick={handleCalculate}
        style={{
          position: 'absolute',
          right: 10,
          top: 10,
          zIndex: 4,
        }}
      >
        Calcular estado estacionário
      </button>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgeClick={onEdgeClick}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}