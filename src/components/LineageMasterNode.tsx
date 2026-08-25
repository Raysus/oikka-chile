import {
  Handle,
  Position,
  type Node,
  type NodeProps,
} from '@xyflow/react'
import { motion } from 'framer-motion'
import type { LineageNode } from '../content'
import styles from './LineageMasterNode.module.css'

export type MasterNodeData = {
  master: LineageNode
  selected: boolean
  highlight: boolean
}

export type MasterFlowNode = Node<MasterNodeData, 'master'>

export function LineageMasterNode({ data }: NodeProps<MasterFlowNode>) {
  const { master, selected, highlight } = data

  return (
    <motion.div
      className={[
        styles.node,
        highlight ? styles.highlight : '',
        selected ? styles.selected : '',
      ]
        .filter(Boolean)
        .join(' ')}
      initial={{ opacity: 0, scale: 0.85, y: 12 }}
      animate={{ opacity: 1, scale: selected ? 1.04 : 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      whileHover={{ scale: 1.06 }}
    >
      <Handle type="target" position={Position.Top} className={styles.handle} />
      {master.yearLink ? <span className={styles.year}>{master.yearLink}</span> : null}
      <span className={styles.name}>{master.name}</span>
      {master.style ? <span className={styles.style}>{master.style}</span> : null}
      <Handle type="source" position={Position.Bottom} className={styles.handle} />
    </motion.div>
  )
}
