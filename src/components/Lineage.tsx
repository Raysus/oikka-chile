import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Background,
  Controls,
  MarkerType,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
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

const FOCUS = new Set([
  'motobu',
  'miyagi',
  'kiyan',
  'taira',
  'shimabuku',
  'uezu',
  'chase',
  'alvear',
])

const QUICK = ['shimabuku', 'uezu', 'chase', 'alvear', 'kiyan', 'miyagi'] as const

const nodeTypes = { master: LineageMasterNode }

function displayName(name: string) {
  return name.replace(/^(Maestro|Hanshi|Kyoshi|Renshi|Sensei|Taishi)\s+/i, '')
}

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
        stroke: hot ? '#b89620' : '#d4c48a',
        strokeWidth: hot ? 2.8 : 1.8,
      },
      labelStyle: {
        fill: hot ? '#b89620' : '#8a7420',
        fontWeight: 700,
        fontSize: 12,
      },
      labelBgStyle: { fill: '#fff9e8', fillOpacity: 0.92 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: hot ? '#b89620' : '#d4c48a',
        width: 18,
        height: 18,
      },
    }
  })
}

function LineageCanvas({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const [activeId, setActiveId] = useState('shimabuku')
  const [nodes, setNodes, onNodesChange] = useNodesState(buildNodes(activeId))
  const [edges, setEdges, onEdgesChange] = useEdgesState(buildEdges(activeId))
  const { fitView, setCenter, getNode } = useReactFlow()

  const active: LineageNode =
    lineageNodes.find((n) => n.id === activeId) ?? lineageNodes[lineageNodes.length - 2]

  const select = useCallback(
    (id: string) => {
      setActiveId(id)
      setNodes(buildNodes(id))
      setEdges(buildEdges(id))
      const node = getNode(id)
      if (node) {
        const w = node.measured?.width ?? 260
        const h = node.measured?.height ?? 120
        void setCenter(node.position.x + w / 2, node.position.y + h / 2, {
          zoom: 0.95,
          duration: 480,
        })
      }
    },
    [getNode, setCenter, setEdges, setNodes],
  )

  useEffect(() => {
    const id = window.setTimeout(() => {
      void fitView({ padding: 0.12, duration: 400 })
    }, 80)
    return () => window.clearTimeout(id)
  }, [fitView])

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      select(node.id)
    },
    [select],
  )

  const bgColor = variant === 'dark' ? '#15120c' : '#faf6e8'
  const miniMask = variant === 'dark' ? '#2a2418' : '#efe6c4'
  const defaultViewport = useMemo(() => ({ x: 0, y: 0, zoom: 0.72 }), [])

  return (
    <div className={variant === 'dark' ? `${styles.layout} ${styles.layoutDark}` : styles.layout}>
      <div className={styles.quick} role="toolbar" aria-label="Maestros destacados">
        {QUICK.map((id) => {
          const master = lineageNodes.find((n) => n.id === id)
          if (!master) return null
          return (
            <button
              key={id}
              type="button"
              className={id === activeId ? styles.quickOn : styles.quickBtn}
              onClick={() => select(id)}
            >
              {displayName(master.name)}
            </button>
          )
        })}
      </div>

      <div className={styles.canvasWrap}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.12 }}
          minZoom={0.35}
          maxZoom={1.8}
          defaultViewport={defaultViewport}
          proOptions={{ hideAttribution: true }}
          nodesConnectable={false}
          edgesReconnectable={false}
        >
          <Background color={variant === 'dark' ? '#3a3220' : '#e2d7a8'} gap={28} size={1.2} />
          <Controls showInteractive={false} />
          <MiniMap
            pannable
            zoomable
            maskColor={miniMask}
            nodeColor={(n) => (n.id === activeId ? '#b89620' : '#f0d978')}
            style={{ background: bgColor }}
          />
        </ReactFlow>
        <p className={styles.hint}>Mapa a gran escala · arrastra · zoom · elige un maestro</p>

        <AnimatePresence mode="wait">
          <motion.aside
            key={active.id}
            className={styles.detail}
            aria-live="polite"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.28 }}
          >
            <p className={styles.detailLabel}>Maestro seleccionado</p>
            <div className={styles.detailTop}>
              {active.photo ? (
                <img className={styles.detailPhoto} src={active.photo} alt="" />
              ) : (
                <span className={styles.detailAvatar} aria-hidden>
                  {displayName(active.name)
                    .split(/\s+/)
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join('')
                    .toUpperCase()}
                </span>
              )}
              <div>
                <h3 className={styles.detailName}>{displayName(active.name)}</h3>
                {active.years ? <p className={styles.detailYears}>{active.years}</p> : null}
                {active.style ? <p className={styles.detailStyle}>{active.style}</p> : null}
              </div>
            </div>
            {active.note ? <p className={styles.detailNote}>{active.note}</p> : null}
            {active.yearLink ? (
              <p className={styles.detailHint}>Vínculo con Shimabuku: {active.yearLink}</p>
            ) : null}
          </motion.aside>
        </AnimatePresence>
      </div>
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
