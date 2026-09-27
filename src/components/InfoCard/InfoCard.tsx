import styles from "./InfoCard.module.css"
import type { InfoCardProps } from "./types"


export default function InfoCard({ title, children, Icon }: InfoCardProps) {

    return (
        <div className={styles.box}>
            <span className={`${styles.arm} ${styles.armTop}`} />
            <span className={`${styles.arm} ${styles.armRight}`} />
            <span className={`${styles.arm} ${styles.armBottom}`} />
            <span className={`${styles.arm} ${styles.armLeft}`} />
            <div className={styles.title}>
                <Icon color={"var(--color-accent)"} />
                <h2 className={styles.titleText}>
                    {title}
                </h2>
            </div>
            <div className={styles.text}>
                {children}
            </div>
        </div>
    )
}