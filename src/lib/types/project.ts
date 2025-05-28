export type Project = {
  proj_id: number
  proj_name: string
  proj_desc: string
  proj_input_by: number
  proj_is_private: number
  progress_percentage: number
  date_created: string
  date_due: string | null
  date_completed: string | null
  appid: string
  p_uid: string | null
  ws_id: number
  proj_icon: string
}
