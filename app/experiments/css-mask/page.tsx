'use client'

import Image from 'next/image';
import styles from './page.module.css'
import React from 'react';

export default function Page() {

    return (
        <main 
            className={styles.main}
        >
                <Image
                    src="/misc/Asset.png"
                    width="375"
                    height="260"
                    alt="image"
                    className={styles.image}
                />
        </main>
    )
}