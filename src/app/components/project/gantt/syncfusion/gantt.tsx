"use client";

import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-calendars/styles/material.css";
import "@syncfusion/ej2-dropdowns/styles/material.css";
import "@syncfusion/ej2-grids/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-layouts/styles/material.css";
import "@syncfusion/ej2-lists/styles/material.css";
import "@syncfusion/ej2-navigations/styles/material.css";
import "@syncfusion/ej2-popups/styles/material.css";
import { Edit, Filter, GanttComponent, Inject, Sort } from "@syncfusion/ej2-react-gantt";
import "@syncfusion/ej2-react-gantt/styles/material.css";
import "@syncfusion/ej2-richtexteditor/styles/material.css";
import "@syncfusion/ej2-splitbuttons/styles/material.css";
import "@syncfusion/ej2-treegrid/styles/material.css";
import { data, projectResources } from "./datasource";

export default function GanttSyncfusion() {
  const taskFields: any = {
    id: "TaskID",
    name: "TaskName",
    startDate: "StartDate",
    duration: "Duration",
    progress: "Progress",
    child: "subtasks",
    dependency: "Predecessor",
    resourceInfo: "resources"
  };
  const labelSettings: any = {
    rightLabel: "resources"
  };
  const editSettings: any = {
    allowEditing: true,
    editMode: "Auto",
    allowTaskbarEditing: true
  };
  const resourceFields: any = {
    id: "resourceId",
    name: "resourceName",
  };
  return (
    <>
      <h2>Syncfusion React Gantt Component</h2>
      <GanttComponent dataSource={data} allowFiltering={true} allowSorting={true} taskFields={taskFields} editSettings={editSettings} labelSettings={labelSettings}
        resourceFields={resourceFields} resources={projectResources} height={"100%"} width={"100%"}>
        <Inject services={[Edit, Filter, Sort]} />
      </GanttComponent>
    </>
  )
}
