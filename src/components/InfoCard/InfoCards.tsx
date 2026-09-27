"use client";

import styles from "./InfoCard.module.css";
import { Hammer as HammerIcon, CalendarCheck2 as CalendarCheck2Icon, UserStar as UserStarIcon, MessageCircleCheck as MessageCircleCheckIcon, ArrowUpRight as ArrowUpRightIcon} from "lucide-react";
import Link from "next/link";
import InfoCard from "./InfoCard";
import { useBorderProgress } from "./useBorderProgress"
import { useRef } from "react";

export default function InfoCards() {
    const boxRef = useRef<HTMLDivElement>(null)
    useBorderProgress(boxRef)

    return (
        <div ref={boxRef} className={styles.infoBoxes}>
            <InfoCard title="Erfaren Snekker" Icon={HammerIcon}>
                Den rette erfaringen og kunnskapen for å løse ditt konkrete problem!
            </InfoCard>

            <InfoCard title="Fleksibel og Punktlig" Icon={CalendarCheck2Icon}>
                Gjennomtekte og godt fremstilte planer som passer DEG!
            </InfoCard>

            <InfoCard title="Fokus på kvalitet" Icon={UserStarIcon}>
                Sikrer ledende resultater gjennom høyeste kvalitetsfokus.
            </InfoCard>

            <Link href="/contact" className={styles.hoverArrow}>
                <InfoCard title="GRATIS og uforpliktende befaring" Icon={MessageCircleCheckIcon}>
                    <div className={styles.title}>
                        Vi tar imot enhver forspørsel!
                        <ArrowUpRightIcon className={styles.arrowIcon}/>
                    </div>
                </InfoCard>
            </Link>
      </div>
    )
}