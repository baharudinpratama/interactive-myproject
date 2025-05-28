import { Project } from "./project";

export type Workspace = {
    ws_id: number
    ws_name: string
    ws_created_by: number
    ws_is_public: number
    ws_have_duedate: number
    ws_shared_to: string | null
    ws_desc: string
    ws_views: string | null
    ws_inapps: string | null
    date_begin: string | null
    date_due: string | null
    date_created: string
    appid: string
    ws_uid: string | null
    ws_icon: string
    projects: Project[]
}
