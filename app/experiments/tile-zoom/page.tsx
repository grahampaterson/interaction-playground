'use client'

import { motion } from 'framer-motion'
import styles from './page.module.css'
import React from 'react';

export default function Page() {
    const [x, setX] = React.useState(0);

    function handleClick() {
        if (x == 0) {
            setX(100)
        } else {
            setX(0)
        }
    }

    return (
        <main className={styles.main}>
            <motion.div 
                onClick={handleClick}
                animate={{
                    x : x,
                }}
                className={styles.cardOuter}>
                Hello World
             </motion.div>
        </main>
    )
}