import { useCallback, useMemo, useState } from 'react'
import {
  Background,
  Controls,
  MarkerType,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  type Edge,
  type Node,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { AnimatePresence, motion } from 'framer-motion'
import {
  lineageEdges,
  lineageIntro,
  lineageNodes,
  lineagePositions,
  type LineageNode,
} from '../content'
import { LineageMasterNode, type MasterFlowNode } from './LineageMasterNode'
import styles from './Lineage.module.css'

const FOCUS = new Set(['motobu', 'miyagi', 'kiyan', 'taira', 'shimabuku', 'uezu'])

const nodeTypes = { master: LineageMasterNode }

function buildNodes(activeId: string): MasterFlowNode[] {
  return lineageNodes.map((master) => ({
    id: master.id,
    type: 'master',
    position: lineagePositions[master.id] ?? { x: 0, y: 0 },
    data: {
      master,
      selected: master.id === activeId,
      highlight: FOCUS.has(master.id),
    },
    draggable: true,
  }))
}

function buildEdges(activeId: string): Edge[] {
  return lineageEdges.map((edge) => {
    const hot = edge.source === activeId || edge.target === activeId
    return {
      id: edge.id,
      source: edge.source,
      target: edge.target,
      label: edge.label,
      animated: hot,
      style: {
        stroke: hot ? '#9e1212' : '#d4c48a',
        strokeWidth: hot ? 2.4 : 1.5,
      },
      labelStyle: {
        fill: hot ? '#9e1212' : '#8a7420',
        fontWeight: 700,
        fontSize: 11,
      },
      labelBgStyle: { fill: '#fff9e8', fillOpacity: 0.92 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: hot ? '#9e1212' : '#d4c48a',
        width: 16,
        height: 16,
      },
    }
  })
}

function LineageCanvas({
  variant = 'light',
}: {
  variant?: 'light' | 'dark'
}) {
  const [activeId, setActiveId] = useState('shimabuku')
  const [nodes, setNodes, onNodesChange] = useNodesState(buildNodes(activeId))
  const [edges, setEdges, onEdgesChange] = useEdgesState(buildEdges(activeId))

  const active: LineageNode =
    lineageNodes.find((n) => n.id === activeId) ?? lineageNodes[lineageNodes.length - 2]

  const select = useCallback(
    (id: string) => {
      setActiveId(id)
      setNodes(buildNodes(id))
      setEdges(buildEdges(id))
    },
    [setEdges, setNodes],
  )

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      select(node.id)
    },
    [select],
  )

  const bgColor = variant === 'dark' ? '#15120c' : '#faf6e8'
  const miniMask = variant === 'dark' ? '#2a2418' : '#efe6c4'

  const defaultViewport = useMemo(() => ({ x: 40, y: 20, zoom: 0.82 }), [])

  return (
    <div className={variant === 'dark' ? `${styles.layout} ${styles.layoutDark}` : styles.layout}>
      <div className={styles.canvasWrap}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.18 }}
          minZoom={0.45}
          maxZoom={1.6}
          defaultViewport={defaultViewport}
          proOptions={{ hideAttribution: true }}
          nodesConnectable={false}
          edgesReconnectable={false}
        >
          <Background color={variant === 'dark' ? '#3a3220' : '#e2d7a8'} gap={22} size={1} />
          <Controls showInteractive={false} />
          <MiniMap
            pannable
            zoomable
            maskColor={miniMask}
            nodeColor={(n) => (n.id === activeId ? '#9e1212' : '#f0d978')}
            style={{ background: bgColor }}
          />
        </ReactFlow>
        <p className={styles.hint}>Arrastra · zoom · clic en un maestro</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.aside
          key={active.id}
          className={styles.detail}
          aria-live="polite"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.28 }}
        >
          <p className={styles.detailLabel}>Detalle</p>
          <h3 className={styles.detailName}>{active.name}</h3>
          {active.years ? <p className={styles.detailYears}>{active.years}</p> : null}
          {active.style ? <p className={styles.detailStyle}>{active.style}</p> : null}
          {active.note ? <p className={styles.detailNote}>{active.note}</p> : null}
          {active.yearLink ? (
            <p className={styles.detailHint}>Vínculo con Shimabuku: {active.yearLink}</p>
          ) : null}
        </motion.aside>
      </AnimatePresence>
    </div>
  )
}

export function LineageGraph({
  variant = 'light',
  showHeader = true,
}: {
  variant?: 'light' | 'dark'
  showHeader?: boolean
}) {
  return (
    <section
      id="linaje"
      className={variant === 'dark' ? `${styles.section} ${styles.sectionDark}` : styles.section}
      aria-labelledby="linaje-title"
    >
      <div className={styles.inner}>
        {showHeader ? (
          <header className={styles.header}>
            <p className={styles.eyebrow}>Isshin Ryu · OIKKA</p>
            <h2 id="linaje-title" className={styles.title}>
              Árbol del linaje
            </h2>
            <p className={styles.intro}>{lineageIntro}</p>
          </header>
        ) : null}

        <ReactFlowProvider>
          <LineageCanvas variant={variant} />
        </ReactFlowProvider>
      </div>
    </section>
  )
}

/** Alias para la landing principal */
export function Lineage() {
  return <LineageGraph variant="light" showHeader />
}
