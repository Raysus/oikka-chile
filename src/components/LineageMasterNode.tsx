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

function initials(name: string) {
  const clean = name.replace(/^Maestro\s+|^Taishi\s+/i, '').trim()
  const parts = clean.split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

export function LineageMasterNode({ data }: NodeProps<MasterFlowNode>) {
  const { master, selected, highlight } = data
  const shortName = master.name.replace(/^Maestro\s+/, '')

  return (
    <motion.div
      className={[
        styles.node,
        highlight ? styles.highlight : '',
        selected ? styles.selected : '',
      ]
        .filter(Boolean)
        .join(' ')}
      initial={{ opacity: 0, scale: 0.88, y: 14 }}
      animate={{ opacity: 1, scale: selected ? 1.04 : 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      whileHover={{ scale: 1.05 }}
    >
      <Handle type="target" position={Position.Top} className={styles.handle} />

      <div className={styles.row}>
        {master.photo ? (
          <img className={styles.photo} src={master.photo} alt="" loading="lazy" />
        ) : (
          <span className={styles.avatar} aria-hidden>
            {initials(master.name)}
          </span>
        )}

        <div className={styles.body}>
          <div className={styles.meta}>
            <span className={styles.role}>Maestro</span>
            {master.yearLink ? <span className={styles.year}>{master.yearLink}</span> : null}
          </div>
          <span className={styles.name}>{shortName}</span>
          {master.years ? <span className={styles.years}>{master.years}</span> : null}
          {master.style ? <span className={styles.style}>{master.style}</span> : null}
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className={styles.handle} />
    </motion.div>
  )
}
