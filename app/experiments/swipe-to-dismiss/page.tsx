'use client'

import { AnimatePresence, motion } from 'framer-motion'
import styles from './page.module.css'
import React from 'react';

let rd : rowData[]= []

interface rowData {
    index: number
}

for (let i = 0; i< 10; i++) {
    rd.push({
        index: i
    })
}

export default function Page() {
    const [rowData, setRowData] = React.useState(rd);
    const [openRow, setOpenRow] = React.useState(undefined);

    const rows = rowData.map(row => {
        return(<Row key={row.index} index={row.index} openRow={openRow} setOpenRow={setOpenRow} removeRow={removeRow}/>)
    })

    function removeRow(id :number) {
        let dataClone = [...rowData]
        let ind = dataClone.findIndex((entry : rowData) => entry.index == id)
        dataClone.splice(ind, 1)
        setRowData(dataClone)
    }

    return (
        <main className={styles.main}>
            <div className={styles.screenFrame}>
                <AnimatePresence>
                    { rows }
                </AnimatePresence>                
            </div>            
        </main>
    )
}

function Row({
    index,
    openRow,
    setOpenRow,
    removeRow
}) {
    const [offset, setOffset] = React.useState(0)
    const [dismissWidth, setDismissWidth] = React.useState(0)

    function handleDrag(event, info) {
        setDismissWidth(Math.abs(info.offset.x))
    }

    function handleDragEnd(event, info) {
        console.log(info.offset.x)
        // Deletes
        if (info.offset.x < (-200 + offset)) {
            console.log("deleted")
            removeRow(index)
            setDismissWidth(375)
            // setOffset(375)
            return
        } 
        // Opens
        if (info.offset.x < -30) {
            setOffset(100)
            setOpenRow(index)
            setDismissWidth(100)
            return
        } 
        // Closes
        if (info.offset.x > 20) {
            setOffset(0)
            setOpenRow(undefined)
            setDismissWidth(0)
            return
        } 
    }

    React.useEffect(() => {
        if (openRow != index) {
            setOffset(0)
        }
    }, [openRow])

    return (
        <motion.div 
            className={styles.rowOuter}
            exit={{
                height: 0
            }}>
            <motion.div 
                drag="x"
                dragSnapToOrigin
                dragConstraints={{ left: -375, right: 0 }}
                animate={{
                    marginLeft: -offset,
                }}
                exit={{
                    right: 375
                }}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                className={styles.rowContent}>
                <div className={styles.title}>
                    Title Text
                </div>
                <div className={styles.bodyText}>
                    Body text
                </div>
            </motion.div>
            <motion.div 
                className={styles.dismiss}
                onClick={() => removeRow(index)}
                >
                Dismiss
            </motion.div>
        </motion.div>
    )    
}