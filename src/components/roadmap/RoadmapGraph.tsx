'use client';

import { useCallback, useMemo } from 'react';
import { ReactFlow, Background, Controls, useNodesState, useEdgesState, type NodeTypes, type Node, type NodeMouseHandler } from '@xyflow/react';
import { useRouter } from 'next/navigation';
import '@xyflow/react/dist/style.css';
import { roadmapNodes } from './nodes';
import { roadmapEdges } from './edges';
import { TopicNode } from './TopicNode';

export default function RoadmapGraph() {
  const router = useRouter();
  const [nodes] = useNodesState(roadmapNodes);
  const [edges] = useEdgesState(roadmapEdges);

  const nodeTypes: NodeTypes = useMemo(() => ({ topicNode: TopicNode }), []);
  const proOptions = useMemo(() => ({ hideAttribution: true }), []);

  const onNodeClick: NodeMouseHandler = useCallback((_event, node) => {
    const slug = node.data?.slug as string;
    if (slug) {
      router.push(`/topic/${slug}`);
    }
  }, [router]);

  return (
    <div className="h-[calc(100vh-72px)] w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={proOptions}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={false}
        panOnScroll
        zoomOnScroll
        minZoom={0.3}
        maxZoom={1.5}
      >
        <Background color="#1e1b4b" gap={20} size={1} />
        <Controls className="!bg-gray-800 !border-gray-700 !rounded-lg [&>button]:!bg-gray-800 [&>button]:!border-gray-700 [&>button]:!text-gray-300 [&>button:hover]:!bg-gray-700" />
      </ReactFlow>
    </div>
  );
}
