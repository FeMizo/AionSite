import type { Metadata } from 'next';
import { AdminShell } from '@/src/components/admin/AdminShell';
import Panel from './Panel';
import styles from './panel.module.css';
export const metadata:Metadata={title:'Operación Codex | AionSite',description:'Calendario privado, mediciones y solicitudes de horario de Codex.',robots:{index:false,follow:false}};
export default function Page(){if(process.env.NEXT_STATIC_EXPORT==="true")return null;return <div className={styles.surface}><AdminShell pathname="/admin/codex" title="Operación Codex" description="Calendario y mediciones personales. Integración local privada."><Panel/></AdminShell></div>;}


